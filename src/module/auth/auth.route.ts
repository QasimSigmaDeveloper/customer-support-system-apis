import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "./auth.validation";

const router = Router();

router.post(
    "/register",
     validateRequest(registerValidationSchema),
     AuthController.registerUser,
    );
router.post(
  "/login",
  validateRequest(loginValidationSchema),
  AuthController.loginUser,
);

export const AuthRoutes = router;