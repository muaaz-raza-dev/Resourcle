import { Request, Response } from "express";
import fetch from "node-fetch";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler";
export async function LinkValidator(req:Request,res:Response){
    try{
        const {link}=req.body;
        const response = await fetch(link,{method:"HEAD"})
        if(!response.ok){
            ErrorResponse(res,{message: "Link not found",status:404})
            return ;
        }
        SuccessResponse(res,{message:"link is valid"})
    }
    catch(error){
        ErrorResponse(res,{message:"Failed to validate link",status:500,error})
        return;
    }
    
}