import express from 'express';
import { GetProfileInfoController, SaveResourceInfoController, UpdateProfileInfoController } from '../controllers/profile/profile.controller';

const router = express.Router();

router.get('/', GetProfileInfoController);
router.put('/update', UpdateProfileInfoController);
router.put('/save/resource', SaveResourceInfoController);

export default router;
