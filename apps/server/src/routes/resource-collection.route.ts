import express from "express";
import { Authenticate } from "../middlewares/Authenticate.js";
import {
  AddCustomLinkToCollection,
  CreateResourceCollection,
  GetCollectionMetaDetails,
  GetResourceCollectionLinks,
  GetUserCollectionsList,
  GetUserResourceCollections,
  RemoveLinkFromResourceCollection,
  SaveResourceToCollection,
  SearchResourceCollectionLinks,
} from "../controllers/Resource Collection/resource-collection.controller.js";

const router = express.Router();

router.post("/links", Authenticate, GetResourceCollectionLinks);
router.put("/save", Authenticate, SaveResourceToCollection);

router.put("/save/custom/link", Authenticate, AddCustomLinkToCollection);

router.put("/remove", Authenticate, RemoveLinkFromResourceCollection);
router.get("/collections/:id", Authenticate, GetUserResourceCollections);
router.get("/meta/:id", Authenticate, GetCollectionMetaDetails);
router.post("/search", Authenticate, SearchResourceCollectionLinks);
router.post("/create", Authenticate, CreateResourceCollection);
router.get("/", Authenticate, GetUserCollectionsList);
export default router;
