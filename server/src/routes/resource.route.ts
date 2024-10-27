
import express from 'express';
import CreateResource, { GetResource } from '../controllers/resource/resource.controller';

const router = express.Router();

router.post("/new",CreateResource)
router.get("/:id",GetResource)

export default router