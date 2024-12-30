import express from "express";
import { Router } from "express";
import { Authenticate } from "../middlewares/Authenticate";
import { LinkValidator } from "../controllers/utils/utils.controller";
const router: Router = express.Router();

router.post("/validate/link", Authenticate, LinkValidator);

export default router;
