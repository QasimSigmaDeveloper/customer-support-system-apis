import { z } from "zod";
import { TicketPriority, TicketStatus } from "./ticket.interface";

export const createTicketValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, "Title must be at least 5 characters"),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),

    priority: z.nativeEnum(TicketPriority).optional(),
  }),
});

export const assignTicketValidationSchema = z.object({
  body: z.object({
    assignedAgent: z.string().min(1, {
      message: "Agent ID is required",
    }),
  }),
});

export const updateTicketStatusValidationSchema = z.object({
  body: z.object({
    status: z.nativeEnum(TicketStatus),
  }),
});