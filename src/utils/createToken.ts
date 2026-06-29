import jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";

export const createToken = (
  payload: object,
  secret: string,
  expiresIn: SignOptions["expiresIn"],
) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};