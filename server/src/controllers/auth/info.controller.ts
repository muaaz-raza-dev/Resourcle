import { Request, Response } from "express";
import { ErrorResponse,SuccessResponse } from "../../utils/responsehandler";
import { User } from "../../models/user.model";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../../utils/tokens";
export const getUserInfoController = async (req: Request, res: Response) => {
    try {
        const token = req.cookies[process.env.SESSION_COOKIE_KEY];
        if (!token) {
            ErrorResponse(res, { message: "Invalid Credentials", status: 401 });
            return;
        }
        const decodedToken = jwt.verify(token, JWT_SECRET) as { user_id: string };
        if (!decodedToken || !decodedToken.user_id) {
            ErrorResponse(res, { message: "Invalid Credentials", status: 401 });
            return ;
        }
        const user = await User.findById(decodedToken.user_id).select('-password');
        if (!user) {
            ErrorResponse(res, { message: "Invalid Credentials", status: 401 });
            return;
        }

        SuccessResponse(res,{payload:user,})
        return;
    } catch (err) {
        console.log(err)
        ErrorResponse(res, { message: "Internal server error", status: 500 });
        return;
    }
};
