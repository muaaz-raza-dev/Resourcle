import { Response } from "express";
import jwt  from "jsonwebtoken";
import { ErrorResponse } from "../utils/responsehandler.js";

const  secretKey =process.env.JWT_SECRET
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HandleJWTToken (token:string,res:Response,secret=secretKey):{decodedToken:any;response:Response|null}{
    let response = null
    let decodedToken ;
    try {
         decodedToken = jwt.verify(token, secret)
        if(!decodedToken) { 
            response= ErrorResponse(res,{message:"Invalid Credentials",status:403})
            decodedToken = null
        }
        } catch (err) {
    response = ErrorResponse(res,{message:"Session Expired.",status:403})
    decodedToken = null
    }
    return {decodedToken,response}
}
