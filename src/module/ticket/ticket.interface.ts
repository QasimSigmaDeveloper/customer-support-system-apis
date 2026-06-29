import { Types, Model } from "mongoose";

export enum TicketStatus {
    OPEN = "open",
    IN_PROGRESS = "in_progress",
    RESOLVED = "resolved",
    CLOSED = "closed",
}

export enum TicketPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent",
}

export interface ITicket {
  title: string;
  description: string;

  customer: Types.ObjectId;

  assignedAgent?: Types.ObjectId;

  status: TicketStatus;

  priority: TicketPriority;

  isDeleted: boolean;
}

export interface TicketModel extends Model<ITicket>{}