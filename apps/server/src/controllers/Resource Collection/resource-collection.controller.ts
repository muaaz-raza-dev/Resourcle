import { Request, Response } from "express";
import { IresourceCollection, ResourceCollection } from "../../models/resource-collection.model";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler";
import { ResourceLink } from "../../models/link.model";

export async function GetResourceCollection(req:Request,res:Response){
    const {id} = req.params;
    const Diary = await ResourceCollection.findById(id).populate("links");
    if(!Diary || Diary.user.toString()!=req.userid?.toString()){
        ErrorResponse(res,{message:"Invalid credentails",status:401})
        return;
    }
    SuccessResponse(res,{payload:Diary})
}
interface IsaveResourceRequestBody{
    collections:(IresourceCollection&{isCollected:boolean})[];
    link_id:string
}
export async function SaveResourceToCollection(req:Request<{},{},IsaveResourceRequestBody>,res:Response){
    const {link_id, collections} = req.body;
    const Link = await ResourceLink.findById(link_id).populate({path:"resource",select:"isPrivate publisher"});
    if(!Link || !Link.resource || typeof Link.resource === 'string' || (Link.resource.isPrivate && Link.resource.publisher.toString() !== req.userid?.toString())) {
        ErrorResponse(res, {message:"Invalid credentials", status: 401});
        return;
    }
    for (const collection of collections) {
        const query = {[collection.isCollected ? "$addToSet" : "$pull"]: {links: link_id}};
        await ResourceCollection.findOneAndUpdate({_id: collection._id, user: req.userid}, query);
    }
    SuccessResponse(res, {message:"Action completed with collection "});
}

export async function RemoveLinkFromResourceCollection(req:Request,res:Response){
    const {ResourceLinkId,collectionId} = req.body;
    const Diary = await ResourceCollection.findById(collectionId)
    if(!ResourceLinkId || !collectionId || !Diary || Diary.user.toString()!=req.userid?.toString()) {
        ErrorResponse(res,{message:"Invalid credentials",status:401})
        return;
    }
    await ResourceCollection.findByIdAndUpdate(
        {user:req.userid},
        {$pull:{links:ResourceLinkId}},
    )
    SuccessResponse(res,{message:"Resource deleted to diary"})
}



export async function GetUserResourceCollections(req:Request,res:Response){
const {id:resourceLinkId} = req.params;
const collections = await ResourceCollection.find({user:req.userid})
if(!collections||!collections.length){
  const collection = await ResourceCollection.create({user:req.userid});
  SuccessResponse(res,{payload:[{...collection.toObject(),links:collection.links.length}]})
  return;
}
else{
    const payload = collections.map(collection => ({
        ...collection.toObject(),
        links: collection.links.length,
        isCollected:collection.links.some(e=>e.toString()==resourceLinkId)
    }))
    SuccessResponse(res,{payload})
    return ;
}

}