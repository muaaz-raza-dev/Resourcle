import express from 'express';
import { Authenticate } from '../middlewares/Authenticate';
import { GetCollectionMetaDetails, GetResourceCollection,GetUserResourceCollections,RemoveLinkFromResourceCollection, SaveResourceToCollection } from '../controllers/Resource Collection/resource-collection.controller';

const router = express.Router();

router.get('/:id',Authenticate,GetResourceCollection); 
router.put('/save',Authenticate,SaveResourceToCollection);
router.put('/remove',Authenticate,RemoveLinkFromResourceCollection);
router.get("/collections/:id",Authenticate,GetUserResourceCollections)
router.get("/meta/:id",Authenticate,GetCollectionMetaDetails)
export default router;


