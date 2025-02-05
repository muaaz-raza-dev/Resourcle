import { Request, Response } from "express";
import {
  IresourceCollection,
  ResourceCollection,
} from "../../models/resource-collection.model.js";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler.js";
import { ResourceLink } from "../../models/link.model.js";
import { Types } from "mongoose";

interface IsaveResourceRequestBody {
  collections: (IresourceCollection & { isCollected: boolean })[];
  link_id: string;
}
export async function SaveResourceToCollection(

  req: Request<object, object, IsaveResourceRequestBody>,
  res: Response,
) {
  const { link_id, collections } = req.body;
  const Link = await ResourceLink.findById(link_id).populate({
    path: "resource",
    select: "isPublished publisher",
  });
  if (
    !Link ||
    !Link.resource ||
    typeof Link.resource === "string" ||
    (Link.resource.isPrivate &&
      Link.resource.publisher.toString() !== req.userid?.toString())
  ) {
    ErrorResponse(res, { message: "Invalid credentials", status: 401 });
    return;
  }
  for (const collection of collections) {
    const query = {
      [collection.isCollected ? "$addToSet" : "$pull"]: { links: link_id },
    };
    await ResourceCollection.findOneAndUpdate(
      { _id: collection._id, user: req.userid },
      query,
    );
  }
  SuccessResponse(res, { message: "Action completed with collection " });
}

export async function AddCustomLinkToCollection(req: Request,res: Response){
const { linkPayload:{title,description,url,tags},collectionId} = req.body;
let collectionIdVar = collectionId
try{
  if(!collectionIdVar){
    ErrorResponse(res,{message:"Invalid collection id ",status:401})
    return;
  }
  const SelectedCollection = await ResourceCollection.findById(collectionId).select("_id");
  if (!SelectedCollection) {
    const DefaultCollection = await ResourceCollection.findOne({ user: req.userid, name: "Default" }).select("_id");
    if (!DefaultCollection) {
      ErrorResponse(res, { message: "Invalid collection id ", status: 401 });
      return;
    }
    collectionIdVar = DefaultCollection._id;
  } 
  const Link = await ResourceLink.findOne({user:req.userid,isPublished:false,url});
  if(Link){
    if(Link.isDeleted){
      await ResourceLink.findByIdAndDelete(Link.id)
    }
    else{
      ErrorResponse(res,{message:"Link already exists",status:401})
      return;
    }
  }

  const NewLink = await ResourceLink.create({title, description, url, tags, resource: null, user: req.userid,isPublished:false});
  const collection = await ResourceCollection.findByIdAndUpdate(collectionIdVar, { $push: { links: NewLink._id } }, { new: true }).select("name");

  SuccessResponse(res,{payload:collection,message:"Link added to the collection"});
  return;
}
catch(err){
  console.log(err);
  ErrorResponse(res,{message:"Internal server error",status:501})
  return;
}

};

export async function RemoveLinkFromResourceCollection(
  req: Request,
  res: Response,
) {
  const { linkId, collectionId } = req.body;
  try {
    if (!collectionId || !Types.ObjectId.isValid(collectionId)) {
      ErrorResponse(res, { message: "Invalid credentials", status: 401 });
      return;
    }
    const Collection = await ResourceCollection.findOne({
      _id: collectionId,
      user: req.userid,
    });
    if (!linkId || !collectionId || !Collection) {
      ErrorResponse(res, { message: "Invalid credentials", status: 401 });
      return;
    }

    const link = await ResourceLink.findById(linkId)
    if(link &&(!link.resource&&!link.isPublished&&link.user.toString()==req.userid)){
      await ResourceLink.findByIdAndDelete(linkId)
    }

    await ResourceCollection.findByIdAndUpdate(collectionId, {
      $pull: { links: linkId },
    });
    SuccessResponse(res, { message: "Resource deleted " });
  } catch (err) {
    console.log(err);
    ErrorResponse(res, { message: "Internal server error", status: 501 });
  }
}

export async function GetUserResourceCollections(req: Request, res: Response) {
  const { id: resourceLinkId } = req.params;
  const collections = await ResourceCollection.find({ user: req.userid });
  if (!collections || !collections.length) {
    const collection = await ResourceCollection.create({ user: req.userid });
    SuccessResponse(res, {
      payload: [{ ...collection.toObject(), links: collection.links.length }],
    });
    return;
  } else {
    const payload = collections.map((collection) => ({
      ...collection.toObject(),
      links: collection.links.length,
      isCollected: collection.links.some((e) => e.toString() == resourceLinkId),
    }));
    SuccessResponse(res, { payload });
    return;
  }
}

export async function GetCollectionMetaDetails(req: Request, res: Response) {
  const { id: collectionId } = req.params;
  const collection = await ResourceCollection.findOne({
    user: req.userid,
    _id: collectionId,
  });
  if (!collection) {
    ErrorResponse(res, { message: "Invalid credentials", status: 401 });
    return;
  } else {
    const collection =await ResourceCollection.findById(collectionId).select("name updatedAt links");
    
    const totalLinks = collection?.links.length||0;
    SuccessResponse(res, {
      payload: { ...collection?.toObject(), totalLinks },
    });
   
    
  }
}

export async function GetResourceCollectionLinks(req: Request, res: Response) {
  // count > 0
  const { id, count } = req.body;
  const limit = process.env.Collection_links_limit || 25;
  const Collecion = await ResourceCollection.findById(id)
    .populate({
      path: "links",
      options: {
        sort: { updatedAt: -1 }, // Sort the links by updatedAt in descending order
        limit: +limit, // Limit the number of links to be populated
        skip: (+count - 1) * +limit,
      },
      populate: {
        path: "resource",
        select: "publisher",
        populate: { path: "publisher", select: "name" },
      },
    })
    .select("links user");

  if (!Collecion || Collecion.user.toString() != req.userid?.toString()) {
    ErrorResponse(res, { message: "Invalid credentails", status: 401 });
    return;
  }
  SuccessResponse(res, { payload: Collecion.links });
}

export async function SearchResourceCollectionLinks(
  req: Request,
  res: Response,
) {
  const { query, collectionId } = req.body;
  if (!query || !collectionId) {
    ErrorResponse(res, { message: "Invalid credentials", status: 401 });
    return;
  }
  const isCollection = await ResourceCollection.exists({
    user: req.userid,
    _id: collectionId,
  });
  if (!isCollection) {
    ErrorResponse(res, { message: "Invalid credentials", status: 401 });
    return;
  }
  const Collection = await ResourceCollection.findById(collectionId).populate({
    path: "links", // Populate the 'links' field
    match: {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { url: { $regex: query, $options: "i" } },
      ],
    },
    populate: {
      path: "resource",
      select: "publisher",
      populate: {
        path: "publisher",
        select: "name",
      },
    },
  });
  if (!Collection) {
    ErrorResponse(res, { message: "No link found", status: 404 });
    return;
  }
  SuccessResponse(res, { payload: Collection.links });
}

export async function CreateResourceCollection(req: Request, res: Response) {
  const collectionLimit = parseInt(process.env.Collection_limit || "3", 10);
  const { payload } = req.body;
  const totalCollections = await ResourceCollection.countDocuments({
    user: req.userid,
  });
  if (totalCollections >= collectionLimit) {
    ErrorResponse(res, { message: "Limit exceeded", status: 403 });
    return;
  } else {
    await ResourceCollection.create({ ...payload, user: req.userid });
    SuccessResponse(res, { message: "Collection created successfully" });
  }
}

export async function GetUserCollectionsList(req: Request, res: Response) {
  const resourceCollections = await ResourceCollection.find({
    user: req.userid,
  }).select("links name");
  if(resourceCollections&&!resourceCollections.length){
    const new_resource = await ResourceCollection.create({user:req.userid})
    SuccessResponse(res, { payload: [{...new_resource.toObject(), links:0 }] })
    return;
  }
  const resourceCollectionsWithLength = resourceCollections.map(
    (collection) => ({
      ...collection.toObject(),
      links: collection.links.length,
    }),
  );
  SuccessResponse(res, { payload: resourceCollectionsWithLength });
}

export async function MinimalCollectionList(req:Request,res:Response){
  try {

    let collections = await ResourceCollection.find({user:req.userid}).select("name _id");
    if(!collections.length ){
      const NewCollection= await ResourceCollection.create({user:req.userid,name:"Default"})
      collections = [NewCollection]
    }
    SuccessResponse(res, {payload:collections})
  }
  catch(err){
    console.log(err)
    ErrorResponse(res,{message:"Internal server error",status:501})
  }
}
