import { Request, Response } from "express";
import moment from "moment"
import { User } from "../../models/user.model";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler";
import bcrypt from "bcryptjs"
import { nanoid } from "nanoid";
import { SendMail } from "../../utils/Mailer";
import jwt from "jsonwebtoken";
import { GenerateHTMLTemplate } from "../../templates/otp.mail";
const cookie_key = process.env.SESSION_COOKIE_KEY
const ForgotCookieKey = process.env.REQUESTED_OTP_COOKIE_KEY
const JWT_SECRET = process.env.JWT_SECRET
export async function RequestForgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    try {
        // Validate email exists
        if (!email) {
            ErrorResponse(res, { message: "Email is required", status: 400 })
            return;
        }

        const user = await User.findOne({ $or: [{ email }, { username: email }], isDeleted: false })
        if (!user || user.provider == "google") {
            ErrorResponse(res, { message: "Invalid credentials", status: 403 })
            return;
        }
        const receiver = { username: user.name, email: user.email }

        // Check JWT_SECRET exists
        if (!JWT_SECRET) {
            ErrorResponse(res, { message: "Server configuration error", status: 500 })
            return;
        }

        const OTP = nanoid(6);
        const encryptedOTP = await bcrypt.hash(OTP, 10)

        const authToken = jwt.sign(
            { userId: user._id,otp:OTP }, // Payload
            JWT_SECRET,  // Use constant instead of accessing env directly
            { expiresIn: '1h' ,}  // Use consistent time format
        );

        
        // Use consistent time format (3600000 = 1 hour in ms)
        const expirationTime = Date.now() + 3600000;
        
        await User.findByIdAndUpdate(user._id, { 
            reset_token: encryptedOTP, 
            reset_token_expiration: expirationTime,
            reset_verification: false // Reset verification status
        })

        await SendMail(receiver,GenerateHTMLTemplate(receiver, OTP, authToken))

        const forgotKeyToken = jwt.sign({ email: user.email }, JWT_SECRET)
        res.cookie(ForgotCookieKey, forgotKeyToken, { expires: new Date(expirationTime) }).json( { message: "Password reset link sent to your email" })
    }
    catch (err) {
        console.log(err)
        ErrorResponse(res, { message: "Internal server error ,Try again later !" })
        return;
    }
}

export async function VerifyOTP(req: Request, res: Response) {
    const { otp, email ,token} = req.body;
    if(token ){
        await VerifyOTPToken(req,res)
        return;
    }
    const user = await User.findOne({ email, isDeleted: false })
    if (!user || user.provider == "google") {
        ErrorResponse(res, { message: "Invalid Request", status: 403 })
        return;
    }
    if (!user.reset_token || moment().isAfter(moment(user.reset_token_expiration))) {
        await User.findByIdAndUpdate(user._id, { $unset: { reset_token: 1,} })
        ErrorResponse(res, { message: "Invalid Request", status: 403 })
        return;
    }

    // Send password reset link to user's email
    const isMatch = await bcrypt.compare(otp, user.reset_token)
    if (!isMatch) {
        ErrorResponse(res, { message: "Invalid OTP", status: 403 })
        return;
    }
    await User.findByIdAndUpdate(user._id, { $unset: { reset_token: 1,}, $set: { reset_verification: true } });
    const login_token = jwt.sign({ user_id: user._id }, JWT_SECRET || "", { expiresIn: "30d" })
    res.cookie(cookie_key, login_token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }).json({ token:login_token, message: "You're Logged in !" })
}

export async function VerifyOTPToken(req: Request, res: Response) {
    const { token } = req.body;
    try {
        const decodedToken = await jwt.verify(token, JWT_SECRET) as { userId: string ,otp:string }
        const user = await User.findOne({ _id: decodedToken?.userId }).select("reset_token reset_token_expiration")
        console.log(user)
        if (!user ||!user.reset_token) {
            ErrorResponse(res, { message: "Invalid Request", status: 403 })
            return;
        }
        const isMatch = await bcrypt.compare(decodedToken.otp,user.reset_token)
        if(!isMatch||moment(user.reset_token_expiration).isBefore(moment())){
            ErrorResponse(res, { message: "Invalid credentials", status: 401 })
            return;
        }
    
        await User.findByIdAndUpdate(user._id, { $unset: { reset_token: 1,}, $set: { reset_verification: true } });
        const login_token = jwt.sign({ user_id: user._id }, JWT_SECRET || "", { expiresIn: "30d" })
        res.cookie(cookie_key, login_token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }).json({ login_token, message: "You're Logged in !" })
    }
    catch (err) {
        ErrorResponse(res, { message: "Invalid Request", status: 403 })
        return;
    }

}


export async function DecodeRequestOTPToken(req: Request, res: Response) {
    const token = req.header("token_otp_requested");
    try {
        if (!token) {
            ErrorResponse(res, { message: "Token is required", status: 403 })
            return;
        }
        const decoded_token = await jwt.verify(token, JWT_SECRET)
        if (decoded_token) {
            SuccessResponse(res, { message: "Token decoded successfully", payload: decoded_token })
        }
        else {
            ErrorResponse(res, { message: "Invalid Request", status: 403 })
        }
    }
    catch (error) {
        ErrorResponse(res, { message: "Invalid Request", status: 403 })
        return;
    }

}


