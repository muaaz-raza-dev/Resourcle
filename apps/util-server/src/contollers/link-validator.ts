import { FastifyReply, FastifyRequest } from "fastify";
import fetch from "node-fetch";
import { ErrorResponse, SuccessResponse } from "../utils/responseHandler.js";
export async function LinkValidator(request: FastifyRequest<{ Body: {link:string} }>, reply: FastifyReply,){
    try{
        const {link}=request.body;
        const response = await fetch(link,{headers: { Range: "bytes=0-720" }})
        const partialHtml = await response.text();
        const titleMatch = partialHtml.match(/<title>(.*?)<\/title>/i);
        if(!response.ok){
            ErrorResponse(reply,{message:"Link is not valid",status:404})
            return ;
        }
        SuccessResponse(reply,{message:"Link is valid",payload:{title:titleMatch?.[1]??""}})
    }
    catch(error){
        ErrorResponse(reply,{message:"Internal Server Error",status:500})
        return;
    }
}