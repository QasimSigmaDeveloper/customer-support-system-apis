import { z } from "zod";

export const registerValidationSchema = z.object({
  body: z.object({
    fullName: z.string().min(3),

    email: z.string().email(),

    password: z.string().min(6),

    contactNumber: z.string(),
  }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),

    password: z.string(),
  }),
});