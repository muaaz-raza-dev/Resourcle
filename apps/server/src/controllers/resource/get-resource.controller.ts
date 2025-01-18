import { Request, Response } from "express";
import {
  Resource,
} from "../../models/resource.model.js";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler.js";
import { ValidateLogin } from "../../middlewares/Authenticate.js";
import { Types } from "mongoose";
import { IResourceContentPayload, NestedUpvotePopulator, UpvoteAndSavedPopulator } from "../../functions/upvote-saved-populator-js.js";
import { Iupvote } from "../../models/upvote.model.js";

export async function GetResourceNonContentDetails(req: Request, res: Response): Promise<void> {
    try {
      if (!req.params.id || req.params.id.length != 24) {
        ErrorResponse(res, { status: 404, message: "Invalid Id" });
        return;
      }
  
      
      const resourceRaw = await Resource.findById(req.params.id)
      .select("banner createdAt updatedAt _id tags description upvotesDoc publisher createdAt updatedAt upvotes title views")
      .populate({path:"publisher",select:"_id name username headline picture"}).populate("tags upvotesDoc");

      if (!resourceRaw) {
        ErrorResponse(res, { status: 404, message: "Resource not found" });
        return;
      }
      const resource = JSON.parse(JSON.stringify(resourceRaw));
      resource.isUpvoted = false;
      resource.isSaved = false;
  
      const isLogined = await ValidateLogin(req);

      const isViewedCollected = await Resource.updateOne({ _id: req.params.id, "views.ip": req.ip },{ $set: { "views.$.user": isLogined ? req.userid : '-' } });

      if(isViewedCollected.matchedCount === 0){
        await Resource.findByIdAndUpdate(
          req.params.id , 
          { 
            $addToSet: { views: { user: isLogined ? req.userid : '-', ip: req.ip } } 
          }
        );
      }
  
      if (resource.isPrivate) {
        if ( isLogined && typeof resource.publisher != "string" && req.userid?.toString() == resource.publisher._id.toString()) {
          SuccessResponse(res, { payload: resource });
          return;
        } else {
          ErrorResponse(res, { message: "Not found", status: 404 });
          return;
        }
      }

      await UpvoteAndSavedPopulator(req, {resourceRaw,resource,});
      SuccessResponse(res, { payload: resource });
      return;
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
      return;
    }
  }

  export interface IGetResourceContentPayload{
    content:IResourceContentPayload;
    upvotesDoc:Iupvote
  }
  export async function GetResourceContent(req: Request, res: Response): Promise<void> {
    
    const {sort}=req.params;
    const Sort = sort === "recent" ? "recent" : sort === "top rated" ? "top rated" : "recent";
    try {
        if (!req.params.id || req.params.id.length != 24) {
          ErrorResponse(res, { status: 404, message: "Invalid Id" });
          return;
        }  
        const resource = await Resource.findById(req.params.id).select("isPrivate publisher");
        if (!resource) {
            ErrorResponse(res, { status: 404, message: "Resource not found" });
            return;
        }
        if(resource.isPrivate){
            const isLogined = await ValidateLogin(req);
            if(!isLogined||req.userid?.toString()!=resource.publisher.toString()){
                ErrorResponse(res, { message: "Not found", status: 404 });
                return;
            }
        }

        const query = [
          { $match: { _id: new Types.ObjectId(req.params.id) } },
          {$project:{content:1,_id:1,upvotesDoc:1}},
          {
            $lookup: {
              from: "upvotes",
              localField: "upvotesDoc",
              foreignField: "_id",
              as: "upvotesDoc",
            },
          },
          { $unwind: "$upvotesDoc" },
          {
            $unwind: {
              path: "$content",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $addFields: {
              "content.links": {
                $ifNull: ["$content.links", []],
              },
            },
          },
          {
            $lookup: {
              from: "resourcelinks",
              localField: "content.links",
              foreignField: "_id",
              as: "content.links",
            },
          },
          {
            $addFields: {
              "content.links": {
                $cond: {
                  if: { $not: ["$content.links"] },
                  then: [],
                  else: { $sortArray: { input: "$content.links", sortBy: (Sort=="top rated"?{ upvotes: -1 }:{updatedAt:1}) } },
                },
              },
            },
          },
          {
            $group: {
              _id: "$_id",
              content: { $addToSet: "$content" },
              upvotesDoc:{$first:"$upvotesDoc"}
            }}
          
        ]
        const populatedResourceContent = await Resource.aggregate(query);
        const ResourcePayload = populatedResourceContent[0] ;
        const payload = await NestedUpvotePopulator(req,{resource:ResourcePayload})
        SuccessResponse(res,{payload})

        

      } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
            return;
          }
  }