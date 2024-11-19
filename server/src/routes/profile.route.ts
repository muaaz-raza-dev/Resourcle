import express from 'express';
import { AttachGoogleLogin, ChangePassword, DeleteAccount, DetachHybridLoginProvider, GetProfileInfoController, GetSecurityInfo, GetUserProfileInfoController, SaveResourceInfoController,  UpdateProfileInfoController, ValidateUsername } from '../controllers/profile/profile.controller';
import { Authenticate } from '../middlewares/Authenticate';

const router = express.Router();

router.get('/', Authenticate,GetProfileInfoController);
router.put('/update', Authenticate,UpdateProfileInfoController);
router.put('/save/resource',Authenticate, SaveResourceInfoController);
router.get("/user/:id",GetUserProfileInfoController)
router.post("/validate/username/",ValidateUsername)

router.put("/delete/account",Authenticate,DeleteAccount)
router.get("/security/info",Authenticate,GetSecurityInfo)
router.put("/change/password",Authenticate,ChangePassword) // setup + change
router.put("/attach/google/login",Authenticate,AttachGoogleLogin)
router.put("/dettach/hybrid/login",Authenticate,DetachHybridLoginProvider)




export default router;

