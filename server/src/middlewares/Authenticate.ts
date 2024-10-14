import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/responsehandler";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../utils/tokens";
import { User } from "../models/user.model";
export async function Authenticate(req:Request,res:Response,next:NextFunction){
    try {

        const token = req.cookies[process.env.SESSION_COOKIE_KEY];
        if (!token) {
            return ErrorResponse(res, { message: "Invalid Credentials", status: 401 });
        }
        const decodedToken = jwt.verify(token, JWT_SECRET) as { user_id: string };
        if (!decodedToken || !decodedToken.user_id) {
            return ErrorResponse(res, { message: "Invalid Credentials", status: 401 });
        }
        const user = await User.findById(decodedToken.user_id).select('name username email email_verified');
        if (!user) {
            return ErrorResponse(res, { message: "Invalid Credentials", status: 401 });
        }

        req.userid = decodedToken.user_id
        req.details = user
        next()
    }
    catch(err){
        return ErrorResponse(res, { message: "Internal server error", status: 401 });
    }

}