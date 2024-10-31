
import express from 'express';
import CreateResource, {  GetFeedResources, GetResource } from '../controllers/resource/resource.controller';
import { Authenticate } from '../middlewares/Authenticate';

const router = express.Router();

router.post("/new",Authenticate,CreateResource);
router.get("/d/:id",Authenticate,GetResource);
router.get("/feed",GetFeedResources)

export default router