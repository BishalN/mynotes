import app from "../server";
import { prisma } from "../prismaClient";
import { JsonWebTokenError } from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

jest.mock("../utils/sendEmail.ts");

let mongo: any;
beforeAll(async () => {
  //   process.env.JWT_KEY = "asdfasdf";
  //   process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  //   start the server make connection to db and other things
  await prisma.user.deleteMany();
  await prisma.note.deleteMany();
});

beforeEach(async () => {});

afterAll(async () => {
  //   await mongo.stop();
  //   await mongoose.connection.close();
  await prisma.user.deleteMany();
  await prisma.note.deleteMany();
});

global.signin = async () => {
  //   const email = "test@test.com";
  //   const password = "password";
  //   const response = await request(app)
  //     .post("/api/users/signup")
  //     .send({
  //       email,
  //       password,
  //     })
  //     .expect(201);
  //   const cookie = response.get("Set-Cookie");
  //   return cookie;
};
