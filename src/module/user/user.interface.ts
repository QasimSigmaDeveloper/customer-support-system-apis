import { Model } from "mongoose";
import { Document } from "mongoose";

export enum UserRole {
    CUSTOMER = "customer",
    AGENT = "agent",
    ADMIN = "admin",
}

export interface IUser extends Document{
    fullName:string;
    email:string;
    password:string;
    contactNumber?:string;
    role:UserRole;
    isDeleted:boolean;

    createdAt?:Date;
    updatedAt?:Date;
}

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser | null>;

  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}