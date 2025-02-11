import express from "express";
import { Router } from "express";
import {
  GoogleLoginController,
  LocaleLoginController,
  LogOut,
} from "../controllers/auth/login.controller.js";
import { RegisterLocal } from "../controllers/auth/register.controller.js";
import { getUserInfoController } from "../controllers/auth/info.controller.js";
import {
  DecodeRequestOTPToken,
  RequestForgotPassword,
  VerifyOTP,
  VerifyOTPToken,
} from "../controllers/auth/forgot-password.controller.js";
import {
  RequestChangeEmailController,
  RequestCurrentEmailConfirmation,
  VerifyChangeEmailToken,
  VerifyCurrentEmailAddress,
} from "../controllers/auth/change-email.controller.js";
import { Authenticate } from "../middlewares/Authenticate.js";
const router: Router = express.Router();

router.post("/login/google", GoogleLoginController);
router.post("/login/locale", LocaleLoginController);

router.post("/signup/locale", RegisterLocal);
router.get("/", getUserInfoController);

router.post("/request/forgot-password", RequestForgotPassword);
router.get("/decode/request-otp/token", DecodeRequestOTPToken);
router.post("/verify/otp", VerifyOTP);
router.post("/verify/otp/token", VerifyOTPToken);

router.post(
  "/request/change/email",
  Authenticate,
  RequestChangeEmailController,
);
router.post("/change/email",  VerifyChangeEmailToken);

router.post("/logout",  LogOut);
//Current Email verification
router.post("/request/verify/email", Authenticate, RequestCurrentEmailConfirmation);
router.post("/verify/email", VerifyCurrentEmailAddress);

export default router;
