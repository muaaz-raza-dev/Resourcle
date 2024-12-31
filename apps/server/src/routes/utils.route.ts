import express from "express";
import { Router } from "express";
import { Authenticate } from "../middlewares/Authenticate.js";
import { LinkValidator } from "../controllers/utils/utils.controller.js";
const router: Router = express.Router();

router.post("/validate/link", Authenticate, LinkValidator);

export default router;
