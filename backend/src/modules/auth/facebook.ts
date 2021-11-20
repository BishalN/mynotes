import { FastifyInstance } from "fastify";
import oauthPlugin from "fastify-oauth2";
import axios from "axios";
import { facebookType } from "../../utils/types";
import { genAccessToken } from "../../utils/genToken";
import { User } from "../../../prisma/index";

import { prisma } from "../../prismaClient";
import { isProd } from "../../utils/isProd";
import { DEV_FRONTEND_URL, PROD_FRONTEND_URl } from "../../utils/contants";

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
    callbackUri: String(process.env.FACEBOOK_CALLBACK_URI),
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
        facebookId: userData.id,
      },
    });

    if (user && user.provider != "github")
      throw new Error(
        `this account is not associated with your facebook account please login using your ${user.provider} credentials`
      );

    if (!user) {
      user = await createUserFromFacebookData(userData);
    }

    reply.redirect(
      200,
      isProd
        ? `${PROD_FRONTEND_URl}/oauth?token=${genAccessToken(user.id)}`
        : `${DEV_FRONTEND_URL}/oauth?token=${genAccessToken(user.id)}`
    );
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
