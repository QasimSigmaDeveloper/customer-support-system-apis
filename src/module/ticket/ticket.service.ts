import { ITicket } from "./ticket.interface";
import { Ticket } from "./ticket.model";
import { UserRole } from "../user/user.interface";
import { User } from "../user/user.model";
import AppError from "../../utils/appError";

const createTicket = async (
  payload: Partial<ITicket>,
  customerId: string
) => {

  payload.customer = customerId as any;

  const result = await Ticket.create(payload);

  return result;

};

const getAllTickets = async (
  user: any,
  query: Record<string, any>
) => {
  const filter: Record<string, any> = {};
  filter.isDeleted = false;
  
  if (user.role === UserRole.CUSTOMER) {
    filter.customer = user.userId;
  }

  if (user.role === UserRole.AGENT) {
    filter.assignedAgent = user.userId;
  }

  
  if (query.search) {
    filter.title = {
      $regex: query.search,
      $options: "i",
    };
  }

  
  if (query.status) {
    filter.status = query.status;
  }

 
  if (query.priority) {
    filter.priority = query.priority;
  }

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const tickets = await Ticket.find(filter)
    .populate("customer", "fullName email")
    .populate("assignedAgent", "fullName email")
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);

  const total = await Ticket.countDocuments(filter);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: tickets,
  };
};

const assignTicket = async (
  ticketId: string,
  agentId: string
) => {

 
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new AppError(404, "Ticket not found");
  }

 
  const agent = await User.findById(agentId);

  if (!agent) {
    throw new AppError(404, "Agent not found");
  }


  if (agent.role !== UserRole.AGENT) {
    throw new AppError(400, "Selected user is not an agent");
  }

  ticket.assignedAgent = agent._id;

  await ticket.save();

  return ticket.populate([
    {
      path: "customer",
      select: "fullName email",
    },
    {
      path: "assignedAgent",
      select: "fullName email",
    },
  ]);
};

const updateTicketStatus = async (
  ticketId: string,
  status: string,
  user: any
) => {

  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new AppError(404, "Ticket not found");
  }


  if (user.role === UserRole.CUSTOMER) {
    throw new AppError(403, "You are not authorized");
  }

  
  if (
    user.role === UserRole.AGENT &&
    ticket.assignedAgent?.toString() !== user.userId
  ) {
    throw new AppError(
      403,
      "This ticket is not assigned to you"
    );
  }

  ticket.status = status as any;

  await ticket.save();

  return await Ticket.findById(ticket._id)
    .populate("customer", "fullName email")
    .populate("assignedAgent", "fullName email");
};

const deleteTicket = async (
    id:string
)=>{

    const ticket = await Ticket.findById(id);

    if(!ticket){
        throw new AppError(404,"Ticket not found");
    }

    ticket.isDeleted=true;

    await ticket.save();

    return null;

}

export const TicketService = {

    createTicket,
    getAllTickets,
    assignTicket,
    updateTicketStatus,
    deleteTicket,

};