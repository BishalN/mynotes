import app from "../../../server";
import { prisma } from "../../../prismaClient";

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
});
