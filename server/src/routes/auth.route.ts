import express, { RequestHandler } from 'express';
import { Router } from 'express';
import {  GoogleLoginController, LocaleLoginController } from '../controllers/auth/login.controller';
import { RegisterLocal } from '../controllers/auth/register.controller';
import { getUserInfoController } from '../controllers/auth/info.controller';
const router: Router = express.Router();



router.post('/login/google', GoogleLoginController);
router.post('/login/locale', LocaleLoginController);

router.post('/signup/locale', RegisterLocal);
router.get("/",getUserInfoController)


export default router;
