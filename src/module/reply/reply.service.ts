import AppError from "../../utils/appError";
import { Ticket } from "../ticket/ticket.model";
import { Reply } from "./reply.model";
import { UserRole } from "../user/user.interface";

const createReply = async (
  ticketId: string,
  message: string,
  user: any
) => {

  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new AppError(404, "Ticket not found");
  }

  // Customer sirf apne ticket par reply kar sakta hai
  if (
    user.role === UserRole.CUSTOMER &&
    ticket.customer.toString() !== user.userId
  ) {
    throw new AppError(
      403,
      "You are not allowed to reply to this ticket"
    );
  }

  // Agent sirf assigned ticket par reply kar sakta hai
  if (
    user.role === UserRole.AGENT &&
    ticket.assignedAgent?.toString() !== user.userId
  ) {
    throw new AppError(
      403,
      "This ticket is not assigned to you"
    );
  }

  const reply = await Reply.create({
    ticket: ticket._id,
    sender: user.userId,
    message,
  });

  return await reply.populate({
    path: "sender",
    select: "fullName email role",
  });
};

const getRepliesByTicket = async (
  ticketId: string,
  user: any
) => {
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new AppError(404, "Ticket not found");
  }


  if (
    user.role === UserRole.CUSTOMER &&
    ticket.customer.toString() !== user.userId
  ) {
    throw new AppError(
      403,
      "You are not authorized to view this ticket"
    );
  }


  if (
    user.role === UserRole.AGENT &&
    ticket.assignedAgent?.toString() !== user.userId
  ) {
    throw new AppError(
      403,
      "You are not authorized to view this ticket"
    );
  }

  const replies = await Reply.find({
    ticket: ticketId,
  })
    .populate("sender", "fullName email role")
    .sort({
      createdAt: 1,
    });

  return replies;
};

export const ReplyService = {
  createReply,
  getRepliesByTicket,
};