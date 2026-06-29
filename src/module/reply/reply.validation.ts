import { z } from "zod";

export const createReplyValidationSchema = z.object({
  body: z.object({
    message: z
      .string()
      .min(2, "Message is required"),
  }),
});