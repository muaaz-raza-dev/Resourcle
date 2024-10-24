
import express from 'express';
import CreateResource from '../controllers/resource/resource.controller';

const router = express.Router();

router.post("/new",CreateResource)

export default router