import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
import { AuthRoutes } from "../module/auth/auth.route";
import { TicketRoutes } from "../module/ticket/ticket.route";
import { ReplyRoutes } from "../module/reply/reply.route";
import { DashboardRoutes } from "../module/dashboard/dashboard.route"

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/tickets", TicketRoutes);
router.use("/replies", ReplyRoutes);
router.use("/dashboard", DashboardRoutes);

export default router;