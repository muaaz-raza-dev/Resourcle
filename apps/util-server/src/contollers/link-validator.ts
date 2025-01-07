import { FastifyReply, FastifyRequest } from "fastify";
import fetch from "node-fetch";
import { ErrorResponse, SuccessResponse } from "../utils/responseHandler.js";
export async function LinkValidator(request: FastifyRequest<{ Body: {link:string} }>, reply: FastifyReply,){
    try{
        const {link}=request.body;
        const response = await fetch(link,{method:"HEAD"})
        console.log(response)
        if(!response.ok){
            ErrorResponse(reply,{message:"Link is not valid",status:404})
            return ;
        }
        SuccessResponse(reply,{message:"Link is valid"})
    }
    catch(error){
        ErrorResponse(reply,{message:"Internal Server Error",status:500})
        return;
    }
}