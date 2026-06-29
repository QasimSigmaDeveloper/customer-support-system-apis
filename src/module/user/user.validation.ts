import z from "zod";
import { UserRole } from "./user.interface";

export const createUserValidationSchema = z.object({
    body:z.object({
        fullName: z
      .string()
      .min(4, "Full name must be at least 4 characters"),

        email: z
    .string()
    .email("Invalid email"),

        password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

        contactNumber: z.string(),

        role: z.nativeEnum(UserRole).optional(),
    })
})