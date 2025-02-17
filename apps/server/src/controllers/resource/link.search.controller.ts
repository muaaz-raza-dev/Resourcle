import { Request, Response } from "express";
import { ResourceLink } from "../../models/link.model.js";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler.js";
const searchLinkLimit = +(process.env.SEARCH_LINK_LIMIT ?? 10)
export async function SearchLinks(req:Request<{q:string,sort:"upvotes"|"updatedAt"|"clicks",count:number}>,res:Response){
const {q,sort,count=0} = req.body;

if(!q){
    ErrorResponse(res, { message: "Search query required", status: 400 });
    return;
}
const SortQuery:{[key:string]:-1|1   } = { };
if(sort == "upvotes" || sort == "updatedAt" || sort == "clicks") {
    SortQuery[sort] = -1
}
else{
    SortQuery["updatedAt"] = -1;
 }
 const UpvoteQueryStages =  req.userid? [{
   $lookup: {
     from: "upvotes",
     localField: "upvotesDoc",
     foreignField: "_id",
     as: "upvotesDoc",
   },
 },
 {
   $unwind: "$upvotesDoc", 
 },] :[]
 const query = [
  {
    $match: {
      isDeleted:{$ne:true},
      isPublished: { $ne: false }, // Ensure isPublished is true or undefined
      resource: { $exists: true },
      isBanned: { $ne: true }, // Ensure isBanned is false
      $text: { $search: q } , 
    },
  },
  {$sort:SortQuery},
  {
    $lookup: {
      from: "resources",
      localField: "resource",
      foreignField: "_id",
      as: "resource",
    },
  },
  {
    $unwind: "$resource", // Unwind the resource array to ensure proper matching
  },
  {
    $match: {
      "resource.isDeleted": false,
      "resource.isPrivate": false,
    },
  },
  ...UpvoteQueryStages,
  {
    $addFields: {
      isUpvoted: req.userid ? { $in: [req.userid, "$upvotesDoc"] } : false
    }
  }
,  
  {
    $project: {
      "resource": "$resource._id",
      "title": 1,
      "description":1,
      "_id": 1,
      "url":1,
      "clicks": 1,
      "upvotes": 1,
      "upvotesDoc": "$upvotesDoc._id",
      isUpvoted: 1
    },
  },
]
 const linkResults = await ResourceLink.aggregate([...query,{
   $skip : count*searchLinkLimit}
   ,{
   $limit: searchLinkLimit,
},]);
  if(count == 0 ){
  const totalLinks  = await ResourceLink.aggregate([...query,{$count:"total"}])
  SuccessResponse(res,{payload:{links:linkResults,total:totalLinks[0]?.total || 0}})
  return;
}
SuccessResponse(res,{payload:{links:linkResults}})
}
