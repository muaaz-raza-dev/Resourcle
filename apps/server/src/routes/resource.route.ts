import express from "express";
import CreateResource, {
  DeleteResource,
  EditResource,
  GetFeedResources,
  UpvoteIndividualLink,
  EditResourceFetchResource,
  GetResourceMetaDetails,
  TrackResourceLinkClicks,
} from "../controllers/resource/resource.controller.js";
import { Authenticate } from "../middlewares/Authenticate.js";
import ResourceSearchController from "../controllers/resource/resource.search.controller.js";
import {
  GetUserResource,
  SavedResources,
  SwitchVisiblityResource,
} from "../controllers/resource/resources-profile.controller.js";
import {  CollectResourceView, GetResourceContent, GetResourceNonContentDetails } from "../controllers/resource/get-resource.controller.js";

const router = express.Router();

router.post("/new", Authenticate, CreateResource);

router
  .route("/update/:id")
  .put(Authenticate, EditResource)
  .get(Authenticate, EditResourceFetchResource);

router.put("/remove", Authenticate, DeleteResource);

router.get("/d/:id", GetResourceNonContentDetails);
router.get("/d/link/:id/:sort", GetResourceContent);
router.get("/d/meta/:id", GetResourceMetaDetails);
router.get("/d/collect/view/:id", CollectResourceView);

router.put("/switch/visiblity/", Authenticate, SwitchVisiblityResource);
router.put("/upvote/link", Authenticate, UpvoteIndividualLink);

router.get("/feed", GetFeedResources);
router.post("/search", ResourceSearchController);

router.post("/track/clicks/link/:id",TrackResourceLinkClicks);

router.post("/user/resources/", GetUserResource);
router.post("/user/resources/saved", SavedResources);

export default router;
