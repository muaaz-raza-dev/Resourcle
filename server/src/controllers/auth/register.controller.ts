import { Request, Response } from "express";
import { ErrorResponse } from "../../utils/responsehandler";
import { User } from "../../models/user.model";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../../utils/tokens";
const cookie_key= process.env.SESSION_COOKIE_KEY
export const RegisterLocal = async(req:Request,res:Response)=>{
    const { name, email, password } = req.body;
    try {
        // Check if email is already registered
        let user = await User.findOne({ email });
        if (user) return ErrorResponse(res, { message: "Email already exists", status: 400 });

        const hashedPassword = await bcrypt.hash(password,10)
        user = await User.create({name,email,password:hashedPassword})
        const token = jwt.sign({ user_id: user._id }, JWT_SECRET || "", { expiresIn: "30d" })
        return res.cookie(cookie_key, token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) })
        .json({ token, message: "Registered and logined successful!" })
        
    }
    catch(err){
        return ErrorResponse(res, { message: "Internal server error", status: 500 });
    }
}


