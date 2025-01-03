import express from "express";
import { Router } from "express";
import { Authenticate } from "../middlewares/Authenticate.js";
import SearchTags, {
  TrendingTags,
} from "../controllers/category/tags.controller.js";
const router: Router = express.Router();

router.post("/search", Authenticate, SearchTags);
router.get("/feed", TrendingTags);

export default router;
