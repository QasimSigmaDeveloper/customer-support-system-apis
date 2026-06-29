import { Router } from "express";
import { TicketController } from "./ticket.controller";
import { auth } from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { createTicketValidationSchema,
         assignTicketValidationSchema,
         updateTicketStatusValidationSchema
         }  from "./ticket.validation";
import { UserRole } from "../user/user.interface";

const router = Router();

router.post(
  "/",
  auth(),
  validateRequest(createTicketValidationSchema),
  TicketController.createTicket
);

router.get(
  "/",
  auth(),
  TicketController.getAllTickets
);

router.patch(
  "/:id/assign",
  auth(UserRole.ADMIN),
  validateRequest(assignTicketValidationSchema),
  TicketController.assignTicket
);

router.patch(
  "/:id/status",
  auth(UserRole.ADMIN, UserRole.AGENT),
  validateRequest(updateTicketStatusValidationSchema),
  TicketController.updateTicketStatus
);

router.delete(
    "/:id",
    auth(UserRole.ADMIN),
    TicketController.deleteTicket
)

export const TicketRoutes = router;