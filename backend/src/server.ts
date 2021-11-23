import fastify, { FastifyInstance, FastifyError } from "fastify";
import fastifyEnv, { fastifyEnvOpt } from "fastify-env";
import jwt from "jsonwebtoken";
import fastifyCors from "fastify-cors";
import { OAuth2Namespace } from "fastify-oauth2";
import { prisma } from "./prismaClient";
import { JwtPayload } from "./utils/types";
import { User } from "../prisma";

declare module "fastify" {
  interface FastifyInstance {
    githubOAuth2: OAuth2Namespace;
    googleOAuth2: OAuth2Namespace;
    facebookOAuth2: OAuth2Namespace;
  }
  interface FastifyRequest {
    user?: User;
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
app.register(fastifyCors, {
  origin: "*",
});

//TODO: Use this only for the authenticated module todo
app.addHook("onRequest", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return;
  const accessToken = authHeader?.split(" ")[1];
  if (!accessToken) return;
  try {
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
    const userId = (payload as JwtPayload).userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return;
    req.user = user;
    return;
  } catch (error) {
    app.log.error(error);
  }
});

app.get("/ping", async (req, res) => {
  res.send("hello ");
});

app.register(import("./modules/auth/github"));
app.register(import("./modules/auth/google"));
app.register(import("./modules/auth/facebook"));
app.register(import("./modules/auth/local"));
app.setErrorHandler(function (err, request, reply) {
  this.log.error(err);
  reply.status(400);
  reply.send(err);
});

export default app;
