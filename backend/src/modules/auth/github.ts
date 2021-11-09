import { FastifyInstance } from "fastify";
import oauthPlugin from "fastify-oauth2";
import axios from "axios";
import { githubType } from "../../utils/types";
import { genAccessToken } from "../../utils/genToken";
import { User } from "@prisma/client";
import { prisma } from "../../index";

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
    callbackUri: "http://localhost:4000/login/github/callback",
  });

  app.get("/login/github/callback", async function (request, reply) {
    const token =
      await this.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
    const res = await axios.get(`https://api.github.com/user`, {
      headers: { Authorization: `token ${token.access_token}` },
    });

    const userData: githubType = res.data;
    let user: User;

    user = await prisma.user.findFirst({
      where: {
        OR: [{ email: userData?.email, githubId: String(userData.id) }],
      },
    });

    if (!user) {
      user = await createUserFromGithubData(userData);
    }

    const { password, ...rest } = user;

    reply.send({ token: genAccessToken(user.id), user: rest });
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
