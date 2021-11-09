import { FastifyInstance } from "fastify";
import oauthPlugin from "fastify-oauth2";
import axios from "axios";
import { facebookType } from "../../utils/types";
import { genAccessToken } from "../../utils/genToken";
import { User } from "@prisma/client";
import { prisma } from "../../index";

export default async function FacebookOAuth(app: FastifyInstance, opts) {
  app.register(oauthPlugin, {
    name: "facebookOAuth2",
    credentials: {
      client: {
        id: process.env.FACEBOOK_CLIENT_ID,
        secret: process.env.FACEBOOK_CLIENT_SECRET,
      },
      auth: oauthPlugin.FACEBOOK_CONFIGURATION,
    },
    scope: [],
    startRedirectPath: "/login/facebook",
    callbackUri: "http://localhost:4000/login/facebook/callback",
  });

  app.get("/login/facebook/callback", async function (request, reply) {
    const token =
      await this.facebookOAuth2.getAccessTokenFromAuthorizationCodeFlow(
        request
      );
    const res = await axios.get(
      `https://graph.facebook.com/v12.0/me?fields=id,name,email,picture&access_token=${token.access_token}`
    );

    const userData: facebookType = res.data;
    let user: User;

    user = await prisma.user.findFirst({
      where: {
        OR: [{ email: userData?.email, facebookId: userData.id }],
      },
    });

    if (!user) {
      user = await createUserFromFacebookData(userData);
    }

    const { password, ...rest } = user;

    reply.send({ token: genAccessToken(user.id), user: rest });
  });
}

const createUserFromFacebookData = async (data: facebookType) => {
  return prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      provider: "facebook",
      facebookId: data.id,
      imageUrl: data.picture.data.url,
    },
  });
};
