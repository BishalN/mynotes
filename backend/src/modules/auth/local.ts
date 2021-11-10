import { FastifyInstance } from "fastify";
import { User } from "@prisma/client";
import { prisma } from "../../index";
import {
  changepasswordRequestSchema,
  changepasswordSchema,
  emailVerificationRequestSchema,
  emailVerificationSchema,
  userLoginSchema,
  userRegisterSchema,
} from "../../utils/schema";
import { validationCompiler } from "../../utils/validationCompiler";
import bcrypt from "bcryptjs";
import {
  sendChangePasswordEmail,
  sendEmailVerification,
} from "../../utils/sendEmail";
import {
  genAccessToken,
  genEmailVerificationToken,
  genForgotPasswordToken,
} from "../../utils/genToken";
import jwt from "jsonwebtoken";
import {
  ChangePasswordInput,
  JwtPayload,
  UserRegisterInput,
  VerifyEmailInput,
} from "../../utils/types";

export default async function LocalAuth(app: FastifyInstance, opts) {
  app.post<{ Body: UserRegisterInput }>(
    "/register/local",
    {
      schema: userRegisterSchema,
      validatorCompiler: validationCompiler,
    },
    async function (request, reply) {
      const { email, password, name } = request.body;
      let user: User;
      user = await prisma.user.findUnique({ where: { email } });
      if (user) throw new Error("User with that email already exists");
      const hashedPassword = await bcrypt.hash(password, 12);
      user = await prisma.user.create({
        data: { email, name, password: hashedPassword, provider: "local" },
      });
      const token = genEmailVerificationToken(user.id);
      await sendEmailVerification(token, user.email);

      reply.send({
        message: "Please verify your email address before you can login",
      });
    }
  );

  app.post<{ Body: Omit<UserRegisterInput, "name"> }>(
    "/login/local",
    { schema: userLoginSchema, validatorCompiler: validationCompiler },
    async function (request, reply) {
      const { email, password } = request.body;
      let user: User;
      user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error("Invalid credentials");
      const isMatchingPassword = await bcrypt.compare(password, user.password);
      if (!isMatchingPassword) throw new Error("Invalid credentials");
      if (!user.emailVerified) throw new Error("Please verify your email");
      if (user.provider != "local") {
        throw new Error(
          `This account is associated with ${user.provider} Please login with your ${user.provider} account`
        );
      }
      const { password: _, ...rest } = user;
      const token = genAccessToken(user.id);
      reply.send({ token, rest });
    }
  );

  app.get<{ Querystring: Omit<UserRegisterInput, "name" | "password"> }>(
    "/verify/request",
    {
      schema: emailVerificationRequestSchema,
      validatorCompiler: validationCompiler,
    },
    async function (request, reply) {
      const { email } = request.query;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error("user not found");
      if (user.provider != "local")
        throw new Error(
          `This user is associated with ${user.provider} Please login with ${user.provider}`
        );
      if (user.emailVerified) throw new Error("Your Email is already verified");
      const token = genEmailVerificationToken(user.id);
      await sendEmailVerification(token, user.email);
      reply.send({
        message: "We've sent an confirmation email please check your mailbox",
      });
    }
  );

  app.get<{ Querystring: VerifyEmailInput }>(
    "/verify/email",
    {
      schema: emailVerificationSchema,
      validatorCompiler: validationCompiler,
    },
    async function (request, reply) {
      const { token } = request.query;
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      const user = await prisma.user.findUnique({
        where: { id: +(payload as JwtPayload).userId },
      });

      if (!user) throw new Error("user not found");
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: true },
      });

      reply.send({ message: "email successfully verified" });
    }
  );

  app.get<{ Querystring: Omit<UserRegisterInput, "name" | "password"> }>(
    "changepassword/request",
    {
      schema: changepasswordRequestSchema,
      validatorCompiler: validationCompiler,
    },
    async function (request, reply) {
      const { email } = request.query;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error("user not found");
      if (user.provider != "local")
        throw new Error(
          `this user is associate with ${user.provider} please change your ${user.provider} password`
        );
      const token = genForgotPasswordToken(user.id);
      await sendChangePasswordEmail(token, user.email);
      reply.send({
        message:
          "we've sent you an email to change your password. please check your mailbox",
      });
    }
  );

  app.post<{ Body: ChangePasswordInput }>(
    "changepassword",
    { schema: changepasswordSchema, validatorCompiler: validationCompiler },
    async function (request, reply) {
      const { password, token } = request.body;
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const userId = +(payload as JwtPayload).userId;
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error("User not found");
      const hashedPassword = await bcrypt.hash(password, 12);
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });
      reply.send({ message: "Password change successfull" });
    }
  );
}
