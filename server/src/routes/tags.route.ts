import express, { RequestHandler } from 'express';
import { Router } from 'express';
import { Authenticate } from '../middlewares/Authenticate';
import SearchCategories from '../controllers/category/tags.controller';
const router: Router = express.Router();



router.post("/search", Authenticate,SearchCategories)

export default router;
