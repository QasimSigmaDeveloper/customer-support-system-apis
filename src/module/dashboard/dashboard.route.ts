import { Router } from "express";
import { DashboardController } from "./dashboard.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../user/user.interface";

const router = Router();

router.get(
  "/admin",
  auth(UserRole.ADMIN),
  DashboardController.getAdminDashboard
);

router.get(
  "/agent",
  auth(UserRole.AGENT),
  DashboardController.getAgentDashboard
);

export const DashboardRoutes = router;