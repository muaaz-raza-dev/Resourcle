import { Request, Response } from "express";
import { ResourceLink } from "../../models/link.model.js";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler";
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
 const linkResults = await ResourceLink.aggregate([
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
    {
      $limit: searchLinkLimit,
      $skip : count*searchLinkLimit
    },
    {
      $project: {
        "resource": "$resource._id",
        "title": 1,
        "_id": 1,
        "clicks": 1,
        "upvotes": 1,
      },
    },
  ]);
  if(count == 0 ){
  const totalLinks  = await ResourceLink.countDocuments({
    isDeleted:{$ne:true},
    isPublished: { $ne: false }, 
    resource: { $exists: true },
    isBanned: { $ne: true }, 
    $text: { $search: q } , 
  })
  SuccessResponse(res,{payload:{links:linkResults,total:totalLinks}})
  return;
}
SuccessResponse(res,{payload:{links:linkResults}})
}
