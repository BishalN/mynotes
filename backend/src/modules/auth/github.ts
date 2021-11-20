import { FastifyInstance } from "fastify";
import oauthPlugin from "fastify-oauth2";
import axios from "axios";
import { githubType } from "../../utils/types";
import { genAccessToken } from "../../utils/genToken";

import { prisma } from "../../prismaClient";
import { isProd } from "../../utils/isProd";
import { DEV_FRONTEND_URL, PROD_FRONTEND_URl } from "../../utils/contants";

export default async function GithubAuth(app: FastifyInstance, opts) {
  app.register(oauthPlugin, {
    name: "githubOAuth2",
    credentials: {
      client: {
        id: process.env.GITHUB_CLIENT_ID,
        secret: process.env.GITHUB_CLIENT_SECRET,
      },
      auth: oauthPlugin.GITHUB_CONFIGURATION,
    },
    scope: ["email", "public_profile"],
    startRedirectPath: "/login/github",
    callbackUri: String(process.env.GITHUB_CALLBACK_URL),
  });

  app.get("/login/github/callback", async function (request, reply) {
    const token =
      await this.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
    const res = await axios.get(`https://api.github.com/user`, {
      headers: { Authorization: `token ${token.access_token}` },
    });

    const userData: githubType = res.data;

    let user = await prisma.user.findFirst({
      where: {
        githubId: String(userData.id),
      },
    });

    if (user && user.provider != "github")
      throw new Error(
        `this account is not associated with your github account please login using your ${user.provider} credentials`
      );

    if (!user) {
      user = await createUserFromGithubData(userData);
    }

    reply.redirect(
      isProd
        ? `${PROD_FRONTEND_URl}/oauth?token=${genAccessToken(user.id)}`
        : `${DEV_FRONTEND_URL}/oauth?token=${genAccessToken(user.id)}`
    );
  });
}

const createUserFromGithubData = async (data: githubType) => {
  return prisma.user.create({
    data: {
      name: data.name,
      bio: data.bio,
      provider: "github",
      githubId: String(data.id),
      imageUrl: data.avatar_url,
    },
  });
};
