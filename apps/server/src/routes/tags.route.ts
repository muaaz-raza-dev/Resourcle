import express from "express";
import { Router } from "express";
import SearchTags, {
  TrendingTags,
} from "../controllers/category/tags.controller.js";
const router: Router = express.Router();

router.post("/search", SearchTags);
router.get("/feed", TrendingTags);

export default router;
