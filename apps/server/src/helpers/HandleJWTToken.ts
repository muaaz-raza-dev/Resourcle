import { Response } from "express";
import jwt, { JsonWebTokenError }  from "jsonwebtoken";
import { ErrorResponse } from "../utils/responsehandler";

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
           const error = err  as JsonWebTokenError
    if (error.name === 'TokenExpiredError') {
        response = ErrorResponse(res,{message:"Session Expired.",status:403})
    } else {
        response = ErrorResponse(res,{message:"Internal server error.",status:500})
    }
    decodedToken = null
    }
    return {decodedToken,response}
}
