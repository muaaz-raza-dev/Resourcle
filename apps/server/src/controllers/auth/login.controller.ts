import { Request, Response } from "express";
import { OAuth2Client } from 'google-auth-library';
import { User } from "../../models/user.model"
import { ErrorResponse } from "../../utils/responsehandler";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../../utils/tokens";
import { isValidPassword } from "../../utils/PasswordValidator";
import { nanoid } from "nanoid";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const cookie_key= process.env.SESSION_COOKIE_KEY
export async function GoogleLoginController(req: Request, res: Response) {
    const { id_token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        if (!payload?.sub) { 
            ErrorResponse(res, { message: "Invalid Credentials", status: 403 }) 
            return ;
        }
        let user = await User.findOne({ email: payload.email,isDeleted:false })

        if(user){
        if(user?.isDeleted) {
            ErrorResponse(res, { message: "Invalid Credentials", status: 403 })
            return ;
        }
        if(user?.provider=="local"){
            ErrorResponse(res, { message: "Invalid Credentials", status: 403 })
            return ;
        }
    }
        const payloadToStore = { name: payload?.name, email: payload?.email, email_verified: payload?.email_verified, picture: payload?.picture, user_provider_id: payload?.sub, provider: "google",username:nanoid(8) }
        if (!user) { user = await User.create(payloadToStore) }

        const token = jwt.sign({ user_id: user._id }, JWT_SECRET || "", { expiresIn: "30d" })
        res.cookie(cookie_key, token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) })
        .json({ token, message: "Logged in successfully!",payload:user })
        return ;

    }
    catch (error) {
        console.log(error);
        res.status(403).json({ message: 'Invalid token.' });
        return;
    }
}


export async function LocaleLoginController(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email,isDeleted:false })
        if (!user||!user.password) {
            ErrorResponse(res, { message: "Invalid Credentials", status: 404 })
            return  ;
        } 
            
        const isMatch = isValidPassword(password,user.password)
        if (!isMatch){
            ErrorResponse(res, { message: "Invalid Credentials", status: 404 })
            return;
        } 
        const token = jwt.sign({ user_id: user._id }, JWT_SECRET || "", { expiresIn: "30d" })
        res.cookie(cookie_key, token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }).json({ token, message: "Logged in successfully!" })
        return;

    }
    catch (error) {
        res.status(403).json({ message: 'Internal server error.' });
        
        return ;
    }
}


