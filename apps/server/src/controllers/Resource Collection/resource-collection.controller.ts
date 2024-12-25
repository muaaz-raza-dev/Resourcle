import { Request, Response } from "express";
import { IresourceCollection, ResourceCollection } from "../../models/resource-collection.model";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler";
import { ResourceLink } from "../../models/link.model";
import {Types } from "mongoose"



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
    const {linkId,collectionId} = req.body;
    const Diary = await ResourceCollection.findById(collectionId)
    if(!linkId || !collectionId || !Diary || Diary.user.toString()!=req.userid?.toString()) {
        ErrorResponse(res,{message:"Invalid credentials",status:401})
        return;
    }
    await ResourceCollection.findByIdAndUpdate(
        {user:req.userid},
        {$pull:{links:linkId}},
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

export async function GetCollectionMetaDetails(req:Request,res:Response){
    const {id:collectionId} = req.params;
    const collection = await ResourceCollection.findOne({user:req.userid,_id:collectionId})
    if(!collection){
      ErrorResponse(res,{message:"Invalid credentials",status:401})
      return;
    }
    else{
        const collection = await ResourceCollection.findById(collectionId).select("name updatedAt")
        const collectionMeta = await ResourceCollection.aggregate([
            {
              $lookup: {
                from: "resourcelinks",
                localField: "links",
                foreignField: "_id",
                as: "links"
              }
            },
            {
              $unwind: {
                path: "$links",
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $group: {
                _id: "$links.resource", // Grouping by resource
                resourcesCount: { $sum: 1 }, // Count documents per resource
              }
            },
            {$group: {
              _id: null,
              totalResource: {
                $sum: 1
              },
              totalLinks:{
                $sum: "$resourcesCount"
              }
            
            }},
            {$project: {
              "_id":0
            }}
          ])
          SuccessResponse(res,{payload:{...collectionMeta[0],...collection?.toObject()}})
    }

}

export async function GetResourceCollectionLinks(req:Request,res:Response){
  // count > 0 
  const {id,count} = req.body;
  const limit = process.env.Collection_links_limit || 25
  const Collecion = await ResourceCollection.findById(id).populate({
    path: 'links',
    options: {
      sort: { updatedAt: -1 }, // Sort the links by updatedAt in descending order
      limit:  +limit , // Limit the number of links to be populated
      skip:(+count-1)*(+limit)
    },
    populate: { path: "resource", select: "publisher" ,populate:{path:"publisher",select:"name"} } 
  }).select("links user");
  
  if(!Collecion || Collecion.user.toString()!=req.userid?.toString()){
      ErrorResponse(res,{message:"Invalid credentails",status:401})
      return;
  }
  SuccessResponse(res,{payload:Collecion.links})
}



export async function SearchResourceCollectionLinks(req:Request,res:Response){
  const {query,collectionId} = req.body;
  if(!query ||!collectionId){
    ErrorResponse(res,{message:"Invalid credentials",status:401})
    return;
  }
  const isCollection = await ResourceCollection.exists({user: req.userid,_id: collectionId})
  if(!isCollection){
    ErrorResponse(res,{message:"Invalid credentials",status:401})
    return;
  }
  const Collection = await ResourceCollection.findById(collectionId).populate({
    path: 'links', // Populate the 'links' field
    match: {
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { url: { $regex: query, $options: 'i' } }
        ]
    },
    populate: {
        path: 'resource',
        select:"publisher",
        populate:{
          path:"publisher",
          select:"name"
        }
    }
})
if (!Collection) {
  ErrorResponse(res,{message:"No link found",status:404})
    return;
}
  SuccessResponse(res,{payload:Collection.links})
}


export async function CreateResourceCollection(req:Request,res:Response){
  const collectionLimit = parseInt(process.env.Collection_limit || '3', 10);
  const { payload } = req.body;
  const totalCollections = await ResourceCollection.countDocuments({ user: req.userid });
  if (totalCollections >= collectionLimit) {
    ErrorResponse(res, { message: "Limit exceeded", status: 403 });
    return;
  } else {
    await ResourceCollection.create({ ...payload, user: req.userid });
    SuccessResponse(res, { message: "Collection created successfully" });
  }
}

export async function GetUserCollectionsList(req:Request,res:Response){
  const resourceCollections = await ResourceCollection.find({user:req.userid}).select("links name");
  const resourceCollectionsWithLength = resourceCollections.map(collection => ({
      ...collection.toObject(),
      links: collection.links.length
  }));
  SuccessResponse(res,{payload:resourceCollectionsWithLength})

}