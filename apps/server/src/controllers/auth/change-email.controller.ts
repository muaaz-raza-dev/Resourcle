import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler.js";
import bcrypt from "bcryptjs";
import { SendMail } from "../../utils/Mailer.js";
import { User } from "../../models/user.model.js";
import { GenerateVerificationEmailTemplate } from "../../templates/verify-email.mail.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
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

    const user = await User.findById(req.userid).select("name ");
    if (!user) {
      ErrorResponse(res, { message: "User not found", status: 404 });
      return;
    }
    if (req.details.provider != "google") {
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
      { email: user.email, uniqueIdentifier, new_email: new_email },
      JWT_SECRET,
    );
    await User.findByIdAndUpdate(req.userid, {
      change_email_token: uniqueIdentifier,
    });
    const verificationLink = `${process.env.APP_URL}/auth/verify-email?token=${AccessToken}`;
    await SendMail(
      receiver,
      GenerateVerificationEmailTemplate(receiver, verificationLink),
      "Verify your email address",
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
    const decodeToken = (await jwt.verify(
      token,
      JWT_SECRET,
    )) as ChangeEmailToken;
    if (!decodeToken || decodeToken.email == req.details.email) {
      ErrorResponse(res, { message: "Invalid request", status: 403 });
      return;
    }
    const user = await User.findById(req.userid).select("change_email_token");
    if (!user || !user.change_email_token) {
      ErrorResponse(res, { message: "Invalid request", status: 403 });
      return;
    }

    if (decodeToken.uniqueIdentifier != user.change_email_token) {
      ErrorResponse(res, { message: "Invalid request", status: 403 });
      return;
    } else {
      await User.findByIdAndUpdate(req.userid, {
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
    }
  } catch (err) {
    console.log(err);
    ErrorResponse(res, { message: "Internal server error, try again later" });
    return;
  }
}
