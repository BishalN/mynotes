import app from "../../../server";
import { prisma } from "../../../prismaClient";
import { User } from "../../../../prisma/index";
import bcrypt from "bcryptjs";
import {
  genEmailVerificationToken,
  genForgotPasswordToken,
} from "../../../utils/genToken";

describe("Local Authentication", () => {
  const user = {
    email: "neupanebishassl07@gmail.com",
    name: "bishal",
    password: "thisisgood",
  };
  it("should register the user", async () => {
    const res = await app.inject({
      url: "/register/local",
      method: "POST",
      payload: user,
    });

    expect(JSON.parse(res.body).message).toBe(
      "Please verify your email address before you can login"
    );
  });

  it("should have created the user in database", async () => {
    const foundUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    expect(foundUser.email).toEqual(user.email);
  });

  it("should through an error if required fields not added", async () => {
    const res = await app.inject({
      url: "/register/local",
      method: "post",
      payload: {},
    });

    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.body).message).toBeDefined();
  });

  it("should not login the unverified user", async () => {
    const res = await app.inject({
      url: "/login/local",
      method: "post",
      payload: { email: user.email, password: user.password },
    });

    expect(JSON.parse(res.body).message).toBe("Please verify your email");

    console.log(res.body);
  });

  it("should return the access token and user data for email verified user login", async () => {
    await prisma.user.update({
      where: { email: user.email },
      data: { emailVerified: true },
    });

    const res = await app.inject({
      url: "/login/local",
      method: "post",
      payload: { email: user.email, password: user.password },
    });

    const body = JSON.parse(res.body);
    expect(res.statusCode).toBe(200);
    expect(body.token).toBeDefined();
    expect(body.user).toBeDefined();
  });

  it("should through an error if invalid password", async () => {
    const res = await app.inject({
      url: "/login/local",
      method: "post",
      payload: { email: user.email, password: "randompass" },
    });

    expect(JSON.parse(res.body).message).toEqual("Invalid credentials");
  });

  it("should not login the user if user account is not local", async () => {
    const password = "hellowordl!!!";
    const hashedPassword = await bcrypt.hash(password, 12);
    const userData: Omit<User, "id"> = {
      bio: "",
      email: "sth@sth.com",
      emailVerified: true,
      facebookId: "",
      githubId: "",
      googleId: "",
      imageUrl: "",
      name: "",
      phoneNumber: 2849028340820,
      phoneNumberVerified: false,
      provider: "github",
      password: hashedPassword,
    };

    await prisma.user.create({ data: userData });
    const res = await app.inject({
      url: "/login/local",
      method: "post",
      payload: { email: userData.email, password },
    });

    const errMsg: string = JSON.parse(res.body).message;
    expect(errMsg).toContain(userData.provider);
  });

  it("should send the verification email", async () => {
    const userRegisterData = {
      email: "temp@email.com",
      name: "nobodya",
      password: "idon'tlikethis",
    };
    await app.inject({
      url: "/register/local",
      method: "post",
      payload: userRegisterData,
    });

    const res = await app.inject({
      url: "/emailverify/request",
      method: "GET",
      query: { email: userRegisterData.email },
    });

    expect(JSON.parse(res.body).message).toContain("email");
  });

  it("should verify email with proper token", async () => {
    const userData: Omit<User, "id"> = {
      email: "nn@nn.com",
      phoneNumber: 8374823,
      password: "stringsss",
      name: "nobody",
      imageUrl: "nobody",
      bio: "nobody",
      emailVerified: false,
      phoneNumberVerified: false,
      provider: "local",
      githubId: "nobody",
      facebookId: "nobody",
      googleId: "nobody",
    };

    const user = await prisma.user.create({ data: userData });

    const token = genEmailVerificationToken(user.id);

    const res = await app.inject({
      url: "/verifyemail",
      method: "GET",
      query: { token },
    });

    expect(JSON.parse(res.body).message).toContain("email success");
  });

  it("should be able to change the password with valid token", async () => {
    const password = "foshfsdjf";
    const hashedPassword = await bcrypt.hash(password, 12);
    const userData: Omit<User, "id"> = {
      email: "nnklsjflk@nn.com",
      phoneNumber: 83234274823,
      password: hashedPassword,
      name: "nobodkjlkjy",
      imageUrl: "nobody",
      bio: "nobolkjlkdy",
      emailVerified: true,
      phoneNumberVerified: false,
      provider: "local",
      githubId: "nobody",
      facebookId: "nobody",
      googleId: "nobody",
    };

    const user = await prisma.user.create({ data: userData });

    const token = genForgotPasswordToken(user.id);

    const res = await app.inject({
      url: "/changepassword",
      method: "POST",
      payload: { password: "mynewpassword", token: token },
    });

    expect(JSON.parse(res.body).message).toContain(
      "Password change successfull"
    );

    const loginres = await app.inject({
      url: "/login/local",
      method: "post",
      payload: { email: userData.email, password: "mynewpassword" },
    });

    const body = JSON.parse(loginres.body);

    expect(body.token).toBeDefined();
    expect(body.user).toBeDefined();
  });
});
