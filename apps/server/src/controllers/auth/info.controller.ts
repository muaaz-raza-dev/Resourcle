import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler.js";
import { User } from "../../models/user.model.js";
import { HandleJWTToken } from "../../helpers/HandleJWTToken.js";
export const getUserInfoController = async (req: Request, res: Response) => {
  try {
    const token = req.cookies[process.env.SESSION_COOKIE_KEY] || req.headers["authorization"]?.split(" ")[1]
    if (!token) {
      ErrorResponse(res, { message: "Invalid Credentials", status: 401 });
      return;
    }
    const {decodedToken}:{decodedToken?:{user_id:string}} = HandleJWTToken(token,res) ;
    if (!decodedToken || !decodedToken.user_id) {
      //response is handled by JWTHandler
      return;
    }
    const user = await User.findById(decodedToken.user_id).select("picture name username email email_verified");
    if (!user) {
      ErrorResponse(res, { message: "Invalid Credentials", status: 401 });
      return;
    }

    SuccessResponse(res, { payload: user });
    return;
  } catch (err) {
    ErrorResponse(res, { message: "Internal server error", status: 500,error:err });
    return;
  }
};
