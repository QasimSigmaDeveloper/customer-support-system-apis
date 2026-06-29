import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (
  req: Request,
  res: Response
) => {

  const result = await UserService.createUser(req.body);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: result,
  });
};

const getAllUsers = async (
  req: Request,
  res: Response
) => {

  const result = await UserService.getAllUsers();

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const UserController = {
  createUser,
  getAllUsers,
};