import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import fastifyEnv, { fastifyEnvOpt } from "fastify-env";
import { OAuth2Namespace } from "fastify-oauth2";

export const prisma = new PrismaClient();

declare module "fastify" {
  interface FastifyInstance {
    githubOAuth2: OAuth2Namespace;
    googleOAuth2: OAuth2Namespace;
    facebookOAuth2: OAuth2Namespace;
  }
}

const app = fastify({ logger: true });

const schema = {
  type: "object",
  required: [
    "DATABASE_URL",
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "FACEBOOK_CLIENT_ID",
    "FACEBOOK_CLIENT_SECRET",
    "SEND_GRID_API_KEY",
    "JWT_SECRET",
  ],
};

const options: fastifyEnvOpt = {
  confKey: "config",
  schema: schema,
  dotenv: true,
};

app.register(fastifyEnv, options);
app.register(import("./modules/auth/github"));
app.register(import("./modules/auth/google"));
app.register(import("./modules/auth/facebook"));
app.register(import("./modules/auth/local"));

export default app;
