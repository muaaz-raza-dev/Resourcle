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
      .select("banner createdAt updatedAt _id tags description upvotesDoc publisher isGroupLinks createdAt updatedAt upvotes title views")
      .populate({path:"publisher",select:"_id name username headline picture"}).populate("tags upvotesDoc");

      if (!resourceRaw) {
        ErrorResponse(res, { status: 404, message: "Resource not found" });
        return;
      }
      const resource = JSON.parse(JSON.stringify(resourceRaw));
      resource.isUpvoted = false;
      resource.isSaved = false;
  
      
      
      
      const isLogined = await ValidateLogin(req);
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
export async function CollectResourceView(req:Request,res:Response){
    
  const isLogined = await ValidateLogin(req);

  // Fetch resource views
  const resource = await Resource.findOne({ _id: req.params.id }).select("views");
  
  if (!resource) {
    ErrorResponse(res, { message: "Invalid resource ID", status: 401 });
    return;
  }
  
  // Check if a view already exists for the current IP
  const ipBasedView = resource?.views?.filter(v => v.ip == req.ip)||[];
  
  if (isLogined) {
    const existingViewByUser = ipBasedView.find((v) => v.user?.toString() === req.userid);
    const existingAnonymousView = ipBasedView.find((v) => !v.user);
    // Case 1: No existing view for this IP
    if (!ipBasedView.length) {
      await Resource.findByIdAndUpdate(req.params.id, {
        $addToSet: { views: { user: req.userid, ip: req.ip } }
      },
      { timestamps: false } );
    }
    else if (existingAnonymousView) {
      await Resource.updateOne(
        { _id: req.params.id, "views.ip": req.ip, "views.user": { $exists: false } },
        { $set: { "views.$.user": req.userid } },
        { timestamps: false } 
      );
    }
    // Case 2: Logged-in user with a different account for the same IP
    else if (!existingViewByUser) {
      await Resource.findByIdAndUpdate(req.params.id, {
        $addToSet: { views: { user: req.userid, ip: req.ip } }
      },
      { timestamps: false } 
    );
    }
  
     
  
    SuccessResponse(res, { message: "View collected" });
    return;
  } else {
    // Unlogged-in user: Add view if it doesn't already exist
    if (!ipBasedView.length) {
      await Resource.findByIdAndUpdate(req.params.id, {
        $addToSet: { views: { ip: req.ip } }
      },
      { timestamps: false } );
    }
  
    SuccessResponse(res, { message: "View collected" });
    return;
  }
  
  
 
}
  export interface IGetResourceContentPayload{
    content:IResourceContentPayload;
    upvotesDoc:Iupvote
  }
  export async function GetResourceContent(req: Request, res: Response): Promise<void> {
    
    const {sort}=req.params;
    const Sort = sort === "recent" ? "recent" : sort === "top-rated" ? "top rated" : "recent";
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
        const isLogined = await ValidateLogin(req);
        if(resource.isPrivate){
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
                  else: { $sortArray: { input: "$content.links", sortBy: Sort=="recent"?{updatedAt:-1}:{upvotes:-1} } },
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