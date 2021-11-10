import jwt from "jsonwebtoken";

export const genAccessToken = (userId: number) => {
  return jwt.sign({ userId }, "thisisprivatekey", { expiresIn: "7d" });
};

export const genEmailVerificationToken = (userId: number) => {
  return jwt.sign({ userId }, "thisisprivatekey", { expiresIn: "1h" });
};

export const genForgotPasswordToken = (userId: number) => {
  return jwt.sign({ userId }, "thisisprivatekey", { expiresIn: "1h" });
};
