
import express from 'express';
import CreateResource, {  DeleteResource, EditResource, GetFeedResources, GetResource, UpvoteIndividualLink,EditResourceFetchResource } from '../controllers/resource/resource.controller';
import { Authenticate } from '../middlewares/Authenticate';
import ResourceSearchController from '../controllers/resource/resource.search.controller';
import { GetUserResource, SavedResources, SwitchVisiblityResource } from '../controllers/resource/resources-profile.controller';

const router = express.Router();

router.post("/new",Authenticate,CreateResource);

router.route("/update/:id").put(Authenticate,EditResource).get(Authenticate,EditResourceFetchResource);

router.put("/remove",Authenticate,DeleteResource)

router.get("/d/:id",GetResource);

router.put("/switch/visiblity/",Authenticate,SwitchVisiblityResource)
router.put("/upvote/link",Authenticate,UpvoteIndividualLink)


router.get("/feed",GetFeedResources)
router.post("/search",ResourceSearchController)


router.post("/user/resources/",GetUserResource)
router.post("/user/resources/saved",SavedResources)

export default router