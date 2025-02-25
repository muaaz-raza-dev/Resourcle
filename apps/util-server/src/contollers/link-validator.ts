import { FastifyReply, FastifyRequest } from "fastify";
import fetch from "node-fetch";
import { ErrorResponse, SuccessResponse } from "../utils/responseHandler.js";
import { isWhitelisted } from "../data/whitelist-urls.data.js";
export async function LinkValidator(request: FastifyRequest<{ Body: {link:string} }>, reply: FastifyReply,){
    try{
        const {link}=request.body;
        if(isWhitelisted(link)){
            SuccessResponse(reply,{message:"Link is valid",payload:{title:""}})        
            return;
        }
        const response = await fetch(link,{headers: { Range: "bytes=0-1024" }})
        if(!response.ok){
            ErrorResponse(reply,{message:"Link is not valid",status:404})
            return ;
        }
        const partialHtml = await response.text();
        const titleMatch = partialHtml.match(/<title>(.*?)<\/title>/i);
        SuccessResponse(reply,{message:"Link is valid",payload:{title:titleMatch?.[1]??""}})
    }
    catch(error){
        ErrorResponse(reply,{message:"Internal Server Error",status:500})
        return;
    }
}