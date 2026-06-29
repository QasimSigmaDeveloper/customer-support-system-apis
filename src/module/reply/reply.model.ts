import { Schema, model } from "mongoose";
import { IReply } from "./reply.interface";

const replySchema = new Schema<IReply>(
  {
    ticket: {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Reply = model<IReply>("Reply", replySchema);