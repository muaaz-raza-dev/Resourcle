import express from 'express';
import { GetProfileInfoController, GetUserProfileInfoController, SaveResourceInfoController, UpdateProfileInfoController } from '../controllers/profile/profile.controller';

const router = express.Router();

router.get('/', GetProfileInfoController);
router.put('/update', UpdateProfileInfoController);
router.put('/save/resource', SaveResourceInfoController);
router.get("/user/:id",GetUserProfileInfoController)


export default router;
