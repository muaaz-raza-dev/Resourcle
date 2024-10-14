import express from 'express';
import { GetProfileInfoController, UpdateProfileInfoController } from '../controllers/profile/profile.controller';

const router = express.Router();

router.get('/', GetProfileInfoController);
router.put('/update', UpdateProfileInfoController);

export default router;
