import { ErrorRequestHandler } from "express";
import AppError from "../utils/appError";

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let message = "Something went wrong";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;