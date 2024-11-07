import { Request } from "express";

import { Resource } from "../models/resource.model";
import { SaveList } from "../models/savelist.model";
import { ValidateLogin } from "../middlewares/Authenticate";
import { PipelineStage } from "mongoose";

export async function PopulateResources (req:Request,{query,count=0,sort,isLogined,allowPrivate}:{query:PipelineStage[],sort:"createdAt"|"upvotes",count:number,isLogined?:boolean,allowPrivate?:boolean}){
  if(!isLogined){
    await ValidateLogin(req)
  }

    const userBookmarks = await SaveList.findOne({ user: req.userid }).select("resource")
    
    const resources = await Resource.aggregate([
      ...(allowPrivate?[{$match:{isPrivate:false}}]:[]),
      ...query,
      {
        $sort: { [sort]: -1 }
      },
      {
        $addFields: {
          isSaved: { $in: ["$_id", userBookmarks?.resource || []] } // Check if the post ID is in user's bookmarks
        }
      },
      {
        $project: {
          title: 1,
          createdAt: 1,
          upvotes: 1,
          publisher: 1,
          linksLength: {
            $map: {
              input: "$content",
              as: "innerArray",
              in: { $size: "$$innerArray.links" }
            }
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "publisher",
          foreignField: "_id",
          as: "publisher"
        }
      },
      {
        $unwind: "$publisher",
      },
      {
        $unwind: "$linksLength",
      },
      {
        $project: {
          title: 1,
          createdAt: 1,
          upvotes: 1,
          linksLength: 1,
          "publisher.name": 1,
          "publisher.picture": 1
        }
      },
      { $skip: count * 10 },
      { $limit: 10 }
    ]);
    return resources
}