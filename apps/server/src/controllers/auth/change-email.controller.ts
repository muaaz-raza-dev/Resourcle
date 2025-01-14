import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler.js";
import bcrypt from "bcryptjs";
import { SendMail } from "../../utils/Mailer.js";
import { User } from "../../models/user.model.js";
import { GenerateVerificationEmailTemplate } from "../../templates/verify-email.mail.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import moment from "moment";
import { HandleJWTToken } from "../../helpers/HandleJWTToken.js";
const JWT_SECRET = process.env.JWT_SECRET;

// Add this intetry{rface above the function
interface ChangeEmailToken {
  email: string;
  new_email: string;
  uniqueIdentifier: string;
}

export async function RequestChangeEmailController(
  req: Request,
  res: Response,
) {
  const { new_email, password }: { new_email: string; password: string } =
    req.body;
  try {
    const is_email_existed = await User.findOne({
      email: new_email,
      isDeleted: false,
    });
    if (is_email_existed) {
      ErrorResponse(res, { message: "Email already exists", status: 409 });
      return;
    }

    const user = await User.findById(req.userid).select("name provider email");
    if (!user) {
      ErrorResponse(res, { message: "User not found", status: 404 });
      return;
    }
    if(req.details.provider == "google"){
      ErrorResponse(res, { message: "Setup your password first.", status: 401 });
      return;
    }
    if (req.details.provider == "local") {
      const isValid = await bcrypt.compare(password, req.details.password);
      if (!isValid) {
        ErrorResponse(res, { message: "Invalid credentials", status: 401 });
        return;
      }
    }

    if (new_email === req.details.email) {
      ErrorResponse(res, { message: "You're already using this email" });
      return;
    }
    const receiver = { username: user.name, email: new_email };
    const uniqueIdentifier = nanoid(8);
    const AccessToken = await jwt.sign(
      { email: user.email, uniqueIdentifier, new_email: new_email, },
      JWT_SECRET,
    );
    await User.findByIdAndUpdate(req.userid, {
      change_email_token: uniqueIdentifier,
    });
    const verificationLink = `${process.env.APP_URL}/auth/change-email?token=${AccessToken}`;
    await SendMail(
      receiver,
      GenerateVerificationEmailTemplate(receiver, verificationLink),
      "You requested to change your email address",
    );
    SuccessResponse(res, { message: "Verification link sent to your email" });
  } catch (error) {
    console.log(error);
    ErrorResponse(res, { message: "Internal server error, try again later" });
    return;
  }
}

export async function VerifyChangeEmailToken(req: Request, res: Response) {
  const { token } = req.body;
  try {
    const decodeToken =  jwt.verify(token,JWT_SECRET) as ChangeEmailToken;
    if (!decodeToken || decodeToken.email == decodeToken.new_email) {
      ErrorResponse(res, { message: "Invalid request", status: 403 });
      return;
    }
    const user = await User.findOne({email:decodeToken.email}).select("change_email_token");
    if (!user || !user.change_email_token) {
      ErrorResponse(res, { message: "Session Expired", status: 403 });
      return;
    }

    if (decodeToken.uniqueIdentifier != user.change_email_token) {
      ErrorResponse(res, { message: "Invalid request", status: 403 });
      return;
    } 
      await User.findByIdAndUpdate(user._id, {
        email: decodeToken.new_email,
        email_verified: true,
        provider: "local",
        $unset: {
          user_provider_id: 1,
          change_email_token: 1,
        },
      });
      SuccessResponse(res, {
        message: "Email verified successfully, you can now use this new email",
      });
  } catch (err) {
    console.log(err);
    ErrorResponse(res, { message: "Internal server error, try again later" });
    return;
  }
}

interface IverificationEmailPayload{
  _id:string; //userid
  code:string; //uniqueIdentifier
}
export async function RequestCurrentEmailConfirmation(req: Request, res: Response) {
  try {
    const user = await User.findById(req.userid).select("email_verification email name")
    if(!user){
      ErrorResponse(res,{message:"UnAuthorized",status:401})
      return;
    }
    const random_code = nanoid(10)
    // 3 emails attempt in a day and each email will 
    const isSameDay = user.email_verification ? moment().date() == moment(user.email_verification.last_attempt).date() : false;
    if(user.email_verification && isSameDay   && user.email_verification.attempts_today >= 3){
      ErrorResponse(res,{message:"You have exceed the limit . Try again tomorrow"})
      return;
    }

    const token_payload ={_id:req.userid,code:random_code};
    const token = jwt.sign(token_payload, JWT_SECRET, { expiresIn: "24hr" });
    const verificationLink = `${process.env.APP_URL}/auth/verify-email?token=${token}`;
    const reciever  = {username:user.name,email:user.email}
    //fetching and reseting attempts
    const previous_attempts = isSameDay ? (user.email_verification?.attempts_today?? 0 ) : 0
    await User.findByIdAndUpdate(req.userid,{email_verification:{code:random_code,last_attempt:new Date(),attempts_today:previous_attempts+1}})

    await SendMail(
      reciever,
      GenerateVerificationEmailTemplate(reciever, verificationLink),
      "Verify your email address",
    );
    SuccessResponse(res, { message: "Verification link sent to your email address." });
    
  } catch (err) {
    console.log(err);
    ErrorResponse(res, { message: "Internal server error, try again later" });
    return;
  }
}

export async function VerifyCurrentEmailAddress(req: Request, res: Response) {
  try {
    const {token} = req.body
    const {decodedToken}:{decodedToken:IverificationEmailPayload} = HandleJWTToken(token,res) ;
    if (!decodedToken) {
      //response is tackled by handleJWTToken
      return;
    }
    const user = await User.findById(decodedToken._id).select("email_verification");
    if (!user || !user.email_verification ) {
      ErrorResponse(res, { message: "Invalid request", status: 403 });
      return;
    }
    if (decodedToken.code!=user.email_verification.code) {
      ErrorResponse(res, { message: "Invalid token. Re-verify your email address", status: 403 });
      return;
    }
    await User.findByIdAndUpdate(req.userid, {$unset: {email_verification: ""}, email_verified: true})
    
    SuccessResponse(res, { message: "Your email is verfied successfuly !" });
  } catch (err) {
    console.log(err);
    ErrorResponse(res, { message: "Internal server error, try again later" });
    return;
  }
}