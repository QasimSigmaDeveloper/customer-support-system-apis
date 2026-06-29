import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TicketService } from "./ticket.service";
import { Request, Response } from "express";

const createTicket = catchAsync(async (
    req: any,
    res
)=>{

    const result = await TicketService.createTicket(
        req.body,
        req.user.userId

    );

    sendResponse(res,{
        statusCode:201,
        success:true,
        message:"Ticket created successfully",
        data:result

    })

});

const getAllTickets = catchAsync(async (req, res) => {

  const user = (req as any).user;

  const result = await TicketService.getAllTickets(
    user,
    req.query
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tickets retrieved successfully",
    data: result,
  });

});

const assignTicket = catchAsync(async (req, res) => {

  const result = await TicketService.assignTicket(
    req.params.id as string,
    req.body.assignedAgent
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ticket assigned successfully",
    data: result,
  });

});

const updateTicketStatus = catchAsync(async (req, res) => {

  const user = (req as any).user;

  const result = await TicketService.updateTicketStatus(
    req.params.id as string,
    req.body.status,
    user
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ticket status updated successfully",
    data: result,
  });

});

const deleteTicket = catchAsync(async(req,res)=>{

    await TicketService.deleteTicket(req.params.id as string);

    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Ticket deleted successfully"
    })

})

export const TicketController = {
createTicket,
getAllTickets,
assignTicket,
updateTicketStatus,
deleteTicket,
}