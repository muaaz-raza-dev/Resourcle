import { FastifyReply, FastifyRequest } from "fastify";
import { Admins } from "../models/user.model";
import { ErrorResponse, SuccessResponse } from "../responseHandler";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const jwt_secret = process.env.JWT_SECRET as string;
export async function LoginAdmin(req: FastifyRequest<{ Body: {password:string;name:string;code:string} }>, res: FastifyReply){
    const {password,name,code} = req.body;
    const admin = await Admins.findOne({name,code})
    if(!admin){
        ErrorResponse(res,{message:"Invalid credentials"})
        return;
    }
    const isAuthenticated = await bcrypt.compare(password,admin.password)
    if(!isAuthenticated){
        ErrorResponse(res,{message:"Invalid credentials"})
        return;
    }
    const token = await jwt.sign({id:admin._id},jwt_secret,{expiresIn:"1h"})
    SuccessResponse(res,{message:"You are in ", payload:token})
}