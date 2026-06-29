import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { success } from "zod";


export const auth = (...roles: string[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    const token = authorization.split(" ")[1];
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Invalid Token"
        })
    }

    try { 

      const decoded = jwt.verify(
        token,
        env.JWT_MY_Secret as string
      ) as {
        userId:string,
        email:string,
        role:string,
      };

      (req as any).user = {userId:decoded.userId, email:decoded.email, role:decoded.role};

            if (
        roles.length &&
        !roles.includes(decoded.role)
      ) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      next();

    } catch {

      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });

    }
  };
};