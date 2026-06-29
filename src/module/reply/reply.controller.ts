import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReplyService } from "./reply.service";

const createReply = catchAsync(
  async (req: Request, res: Response) => {

    const user = (req as any).user;

    const result =
      await ReplyService.createReply(
        req.params.ticketId as string,
        req.body.message,
        user
      );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Reply added successfully",
      data: result,
    });

  }
);

const getRepliesByTicket = catchAsync(
  async (req, res) => {

    const user = (req as any).user;

    const result =
      await ReplyService.getRepliesByTicket(
        req.params.ticketId as string,
        user
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Replies retrieved successfully",
      data: result,
    });

  }
);

export const ReplyController = {
  createReply,
  getRepliesByTicket,
};