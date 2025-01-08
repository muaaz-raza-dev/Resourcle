import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/responsehandler.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/tokens.js";
import { User } from "../models/user.model.js";
export async function Authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const token = req.cookies[process.env.SESSION_COOKIE_KEY] || req.headers["authorization"]?.split(" ")[1]
    if (!token) {
        ErrorResponse(res, { message: "Invalid Credentials", status: 401 });
        return;
    }
    const decodedToken = jwt.verify(token, JWT_SECRET) as { user_id: string };
    if (!decodedToken || !decodedToken.user_id) {
      ErrorResponse(res, { message: "Invalid Credentials", status: 401 });
      return;
    }
    const user = await User.findById(decodedToken.user_id).select(
      "name username email email_verified password provider",
    );
    if (!user) {
      ErrorResponse(res, { message: "Invalid Credentials", status: 401 });
      return;
    }

    req.userid = decodedToken.user_id;
    req.details = user;
    next();
  } catch (err) {
    ErrorResponse(res, { message: "Server is not responding try again later", status: 401 });
    return;
  }
}

export async function ValidateLogin(req: Request) {
  try {
    const token = req.cookies[process.env.SESSION_COOKIE_KEY] || req.headers["authorization"]?.split(" ")[1]
    if (!token) {
      return false;
    }
    const decodedToken = jwt.verify(token, JWT_SECRET) as { user_id: string };
    if (!decodedToken || !decodedToken.user_id) {
      return false;
    }
    const user = await User.findById(decodedToken.user_id).select(
      "name interests",
    );
    if (!user) {
      return false;
    }

    req.userid = decodedToken.user_id;
    req.details = user;
    return true;
  } catch (err) {
    return false;
  }
}
