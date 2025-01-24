import { Request, Response } from "express";
import { ErrorResponse } from "../../utils/responsehandler.js";
import { User } from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../utils/tokens.js";
import { nanoid } from "nanoid";
import passwordValidator from 'password-validator';
const cookie_key = process.env.SESSION_COOKIE_KEY;
const schema = new passwordValidator();
schema.is().min(8)                        // Minimum length 8
       .is().max(20)                      // Maximum length 20
       .has().uppercase()                 // Must have uppercase letters
       .has().lowercase()                 // Must have lowercase letters
       .has().digits()                    // Must have digits
       .has().not().spaces()              // Cannot contain spaces
       .has().symbols();
export const RegisterLocal = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    // Add rules
    // Check if email is already registered
    let user = await User.findOne({ email });
    if (user) {
      ErrorResponse(res, { message: "Email already exists", status: 400 });
      return;
    }
    const isValidPassword = schema.validate(password)
    if (!isValidPassword) {
      ErrorResponse(res, { message: "Password does not meet the requirements", status: 400 });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      username: nanoid(8),
      ips:[req.ip]
    });
    const token = jwt.sign({ user_id: user._id }, JWT_SECRET || "", {
      expiresIn: "30d",
      
    });
    res.cookie(cookie_key, token, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        domain:"resourcle.com",
        secure:true
      })
      .json({ token, message: "Registered and logined successful!",payload:user });
    return;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    ErrorResponse(res, { message: "Internal server error", status: 500 });
    return;
  }
};
