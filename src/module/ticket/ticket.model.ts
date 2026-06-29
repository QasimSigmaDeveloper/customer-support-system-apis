import { Schema, model } from "mongoose";
import { ITicket, TicketStatus, TicketPriority, TicketModel } from "./ticket.interface";

const ticketSchema = new Schema<ITicket>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedAgent: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: Object.values(TicketStatus),
      default: TicketStatus.OPEN,
    },

    priority: {
      type: String,
      enum: Object.values(TicketPriority),
      default: TicketPriority.MEDIUM,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Ticket = model<ITicket, TicketModel>(
  "Ticket",
  ticketSchema
);