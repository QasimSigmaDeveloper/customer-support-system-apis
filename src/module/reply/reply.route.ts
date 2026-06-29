import { Router } from "express";
import { ReplyController } from "./reply.controller";
import { auth } from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { createReplyValidationSchema } from "./reply.validation";
import { UserRole } from "../user/user.interface";

const router = Router();

router.post(
  "/:ticketId",
  auth(UserRole.CUSTOMER, UserRole.AGENT),
  validateRequest(createReplyValidationSchema),
  ReplyController.createReply
);

router.get(
  "/:ticketId",
  auth(UserRole.CUSTOMER, UserRole.AGENT),
  ReplyController.getRepliesByTicket
);



export const ReplyRoutes = router;