import { Request, Response } from "express";
import fetch from "node-fetch";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler";
export async function LinkValidator(req:Request,res:Response){
    try{

        // Validate the link using HEAD request to check if the resource exists and is accessible.
        const {link}=req.body;
        const response = await fetch(link,{method:"HEAD"})
        if(!response.ok){
            return ErrorResponse(res,{message: "Link not found",status:404})
        }
        SuccessResponse(res,{message:"link is valid"})
    }
    catch(error){
        return ErrorResponse(res,{message:"Failed to validate link",status:500,error})
    }
    
}