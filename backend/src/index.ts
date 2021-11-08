import fastify from "fastify";
import { PrismaClient, User } from "@prisma/client";
import fastifyEnv, { fastifyEnvOpt } from "fastify-env";
import oauthPlugin, { OAuth2Namespace } from "fastify-oauth2";
import axios from "axios";
import { githubType } from "./utils/types";
import { genAccessToken } from "./utils/genToken";

export const prisma = new PrismaClient();

declare module "fastify" {
  interface FastifyInstance {
    githubOAuth2: OAuth2Namespace;
  }
}

const app = fastify({ logger: true });

const schema = {
  type: "object",
  required: ["PORT", "DATABASE_URL"],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
    DATABASE_URL: {
      type: "string",
    },
  },
};

const options: fastifyEnvOpt = {
  confKey: "config",
  schema: schema,
  dotenv: true,
};

app.register(fastifyEnv, options);

app.register(oauthPlugin, {
  name: "githubOAuth2",
  credentials: {
    client: {
      id: "id",
      secret: "secret",
    },
    auth: oauthPlugin.GITHUB_CONFIGURATION,
  },
  scope: ["email", "public_profile"],
  // register a fastify url to start the redirect flow
  startRedirectPath: "/login/github",
  // facebook redirect here after the user login
  callbackUri: "http://localhost:4000/login/github/callback",
});

app.get("/login/github/callback", async function (request, reply) {
  const token = await this.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(
    request
  );
  const res = await axios.get(`https://api.github.com/user`, {
    headers: { Authorization: `token ${token.access_token}` },
  });
  const userData: githubType = res.data;
  let user: User;
  //check if the user already exists in the database
  //if the user does not exists then create and send back the jwt token
  //if the user exists then simply send back the jwt token
  if (!userData.email) {
    //lets create a new user
    console.log("No email was found");
    user = await prisma.user.create({
      data: {
        name: userData.name,
        bio: userData.bio,
        provider: "github",
        imageUrl: userData.avatar_url,
      },
    });
  } else {
    // search for the user with the email
    console.log("we have the email");
    user = await prisma.user.findUnique({ where: { email: userData.email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: userData.name,
          bio: userData.bio,
          provider: "github",
          imageUrl: userData.avatar_url,
        },
      });
    }
  }

  console.log(user);

  const { password, ...rest } = user;

  reply.send({ token: genAccessToken(user.id), user: rest });
});

const main = async () => {
  try {
    await app.listen(process.env.PORT || 4000);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

main();
