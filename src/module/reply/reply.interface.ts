import { Types } from "mongoose";

export interface IReply {
  ticket: Types.ObjectId;
  sender: Types.ObjectId;
  message: string;
}