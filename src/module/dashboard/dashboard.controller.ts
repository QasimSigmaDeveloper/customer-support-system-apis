import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { DashboardService } from "./dashboard.service";

const getAdminDashboard = catchAsync(async (req, res) => {

  const result = await DashboardService.getAdminDashboard();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Dashboard retrieved successfully",
    data: result,
  });

});

const getAgentDashboard = catchAsync(async (req, res) => {

  const user = (req as any).user;

  const result = await DashboardService.getAgentDashboard(
    user.userId
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Agent dashboard retrieved successfully",
    data: result,
  });

});

export const DashboardController = {
  getAdminDashboard,
  getAgentDashboard,
};