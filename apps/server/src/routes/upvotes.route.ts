import express from "express";
import { Router } from "express";
import { Authenticate } from "../middlewares/Authenticate.js";
import UpvoteResourceController from "../controllers/upvotes/upvotes.controller.js";
const router: Router = express.Router();

router.put("/upvote", Authenticate, UpvoteResourceController);

export default router;
