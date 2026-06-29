import { Schema, model } from "mongoose";
import { IUser, UserRole, UserModel } from "./user.interface";
import { string } from "zod";
import { env } from "../../config/env";
import bcrypt from "bcryptjs";

const userSchema = new Schema<IUser>(
    {
        fullName:{
            type:String,
            required:[true,"Full name is required"],
            trim:true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
    },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
            select: 0,
    },

        contactNumber: {
            type: String,
            required: [true, "Contact number is required"],
            trim: true,
    },

        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.CUSTOMER,
    },

        isDeleted: {
            type: Boolean,
            default: false,
    },
    },
    {
        timestamps:true,
    }
);




userSchema.pre("save", async function () {
  
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(
    this.password,
    10
  );
});

userSchema.statics.isUserExistsByEmail = async function (
  email: string
) {
  return await User.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched =
  async function (
    plainPassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(
      plainPassword,
      hashedPassword
    );
  };

export const User = model<IUser, UserModel>('User',userSchema);