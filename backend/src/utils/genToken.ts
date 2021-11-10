import jwt from "jsonwebtoken";

export const genAccessToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const genEmailVerificationToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const genForgotPasswordToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
