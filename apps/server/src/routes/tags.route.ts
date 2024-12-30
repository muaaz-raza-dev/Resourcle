import express, { RequestHandler } from "express";
import { Router } from "express";
import { Authenticate } from "../middlewares/Authenticate";
import SearchTags, {
  TrendingTags,
} from "../controllers/category/tags.controller";
const router: Router = express.Router();

router.post("/search", Authenticate, SearchTags);
router.get("/feed", TrendingTags);

export default router;
