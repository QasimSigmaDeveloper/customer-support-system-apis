import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { createToken } from "../../utils/createToken";
import { env } from "../../config/env";
import { SignOptions } from "jsonwebtoken";
import bcrypt from "bcryptjs";

const registerUser = async (payload: IUser) => {

  const isUserExists = await User.isUserExistsByEmail(payload.email);

  if (isUserExists) {
    throw new Error("User already exists");
  }


  const user = await User.create(payload);


  const accessToken = createToken(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    env.JWT_MY_Secret,
    env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"]
  );

  return {
    accessToken,
    user,
  };
};

const loginUser = async (payload: {
  email: string;
  password: string;
}) => {


  const isUserExists = await User.isUserExistsByEmail(
    payload.email
  );

  if (!isUserExists) {
    throw new Error("User does not exist");
  }


  const isPasswordMatched =
    await User.isPasswordMatched(
      payload.password,
      isUserExists.password
    );

  if (!isPasswordMatched) {
    throw new Error("Invalid credentials");
  }


  const accessToken = createToken(
    {
      userId: isUserExists._id,
      email: isUserExists.email,
      role: isUserExists.role,
    },
    env.JWT_MY_Secret,
    env.JWT_ACCESS_EXPIRES_IN as SignOptions['expiresIn']
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  registerUser,
  loginUser,
};