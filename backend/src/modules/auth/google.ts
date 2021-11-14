import { FastifyInstance } from "fastify";
import oauthPlugin from "fastify-oauth2";
import axios from "axios";
import { googleType } from "../../utils/types";
import { genAccessToken } from "../../utils/genToken";
import { prisma } from "../../prismaClient";

export default async function GoogleOAuth(app: FastifyInstance, opts) {
  app.register(oauthPlugin, {
    name: "googleOAuth2",
    credentials: {
      client: {
        id: process.env.GOOGLE_CLIENT_ID,
        secret: process.env.GOOGLE_CLIENT_SECRET,
      },
      auth: oauthPlugin.GOOGLE_CONFIGURATION,
    },
    scope: ["email", "profile"],
    startRedirectPath: "/login/google",
    callbackUri: String(process.env.GOOGLE_CALLBACK_URI),
  });

  app.get("/login/google/callback", async function (request, reply) {
    const token =
      await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }
    );

    const userData: googleType = res.data;

    let user = await prisma.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (user && user.provider != "google")
      throw new Error(
        `this account is not associated with your google account please login using your ${user.provider} credentials`
      );

    if (!user) {
      user = await createUserFromGoogleData(userData);
    }

    const { password, ...rest } = user;

    reply.send({ token: genAccessToken(user.id), user: rest });
  });
}

const createUserFromGoogleData = async (data: googleType) => {
  return prisma.user.create({
    data: {
      email: data.email,
      emailVerified: data.email_verified,
      name: data.name,
      provider: "google",
      googleId: data.sub,
      imageUrl: data.picture,
    },
  });
};
