import jwt from "jsonwebtoken";

//encode the userId in the token and have the expire time of 7d
export const genAccessToken = (userId: number) => {
  return jwt.sign({ userId }, "thisisprivatekey", { expiresIn: "7d" });
};
