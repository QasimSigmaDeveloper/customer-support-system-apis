import { Ticket } from "../ticket/ticket.model";
import { User } from "../user/user.model";
import { TicketStatus } from "../ticket/ticket.interface";
import { UserRole } from "../user/user.interface";

const getAdminDashboard = async () => {

  const totalTickets = await Ticket.countDocuments();

  const openTickets = await Ticket.countDocuments({
    status: TicketStatus.OPEN,
  });

  const inProgressTickets = await Ticket.countDocuments({
    status: TicketStatus.IN_PROGRESS,
  });

  const resolvedTickets = await Ticket.countDocuments({
    status: TicketStatus.RESOLVED,
  });

  const closedTickets = await Ticket.countDocuments({
    status: TicketStatus.CLOSED,
  });

  const totalCustomers = await User.countDocuments({
    role: UserRole.CUSTOMER,
  });

  const totalAgents = await User.countDocuments({
    role: UserRole.AGENT,
  });

  return {
    totalTickets,
    openTickets,
    inProgressTickets,
    resolvedTickets,
    closedTickets,
    totalCustomers,
    totalAgents,
  };
};

const getAgentDashboard = async (agentId: string) => {

  const assignedTickets = await Ticket.countDocuments({
    assignedAgent: agentId,
  });

  const openTickets = await Ticket.countDocuments({
    assignedAgent: agentId,
    status: TicketStatus.OPEN,
  });

  const inProgressTickets = await Ticket.countDocuments({
    assignedAgent: agentId,
    status: TicketStatus.IN_PROGRESS,
  });

  const resolvedTickets = await Ticket.countDocuments({
    assignedAgent: agentId,
    status: TicketStatus.RESOLVED,
  });

  return {
    assignedTickets,
    openTickets,
    inProgressTickets,
    resolvedTickets,
  };
};

export const DashboardService = {
  getAdminDashboard,
  getAgentDashboard,
};