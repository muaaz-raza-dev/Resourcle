import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler";

export async function GetProfileInfoController(req:Request,res:Response){
    try {
        const user_details = await User.findById(req.userid).select("-password -user_provider_id")
        if (!user_details) {return ErrorResponse(res, { message: "User not found", status: 404 });}
        return SuccessResponse(res,{payload:user_details});
    }
    catch (error) {
        console.log(error)
        return ErrorResponse(res, { message: "Internal Server Error", status: 500 });
    }
}


export async function UpdateProfileInfoController(req:Request,res:Response){
    try {
        const {name,links,about,headline,picture} =req.body
        const user_details = await User.findByIdAndUpdate(req.userid,{name,links,about,headline,picture},{new:true})
        .select("-password -user_provider_id ")
        if (!user_details) {return ErrorResponse(res, { message: "User not found", status: 404 });}
        return SuccessResponse(res,{payload:user_details});
    }
    catch (error) {
        console.log(error)
        return ErrorResponse(res, { message: "Internal Server Error", status: 500 });
    }
}


