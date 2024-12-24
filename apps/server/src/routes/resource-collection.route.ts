import express from 'express';
import { Authenticate } from '../middlewares/Authenticate';
import { GetCollectionMetaDetails, GetResourceCollectionLinks, GetUserResourceCollections,RemoveLinkFromResourceCollection, SaveResourceToCollection, SearchResourceCollectionLinks } from '../controllers/Resource Collection/resource-collection.controller';

const router = express.Router();

router.post('/links',Authenticate,GetResourceCollectionLinks); 
router.put('/save',Authenticate,SaveResourceToCollection);
router.put('/remove',Authenticate,RemoveLinkFromResourceCollection);
router.get("/collections/:id",Authenticate,GetUserResourceCollections)
router.get("/meta/:id",Authenticate,GetCollectionMetaDetails)
router.post("/search",Authenticate,SearchResourceCollectionLinks)
export default router;


