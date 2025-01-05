import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorResponse } from "../responseHandler";
import jwt from "jsonwebtoken";
import { Admins } from "../models/user.model";
const jwt_secret = process.env.JWT_SECRET as string;
async function Authenticate(req: FastifyRequest, res: FastifyReply,   next: () => void) {
    const token = req.headers['token'] as string;
    if (!token) {
        ErrorResponse(res,{message:"Invalid credentials"})
        return;
    }
    const encoded_token = await jwt.verify(token,jwt_secret) as {id:string}
    if(!encoded_token){
        ErrorResponse(res,{message:"Invalid credentials"})
        return;
    }
    const admin = await Admins.findById(encoded_token.id).select("_id")
    if(!admin){
        ErrorResponse(res,{message:"Invalid credentials"})
        return;
    }
    req.userid = admin._id.toString()
    next();
}