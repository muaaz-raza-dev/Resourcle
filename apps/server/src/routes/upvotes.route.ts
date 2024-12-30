import express from "express";
import { Router } from "express";
import { Authenticate } from "../middlewares/Authenticate";
import UpvoteResourceController from "../controllers/upvotes/upvotes.controller";
const router: Router = express.Router();

router.put("/upvote", Authenticate, UpvoteResourceController);

export default router;
