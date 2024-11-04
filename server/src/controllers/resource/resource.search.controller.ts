import { Request, Response } from "express";
import { Resource } from "../../models/resource.model";
import { SuccessResponse } from "../../utils/responsehandler";
import { Bookmark } from "../../models/bookmark.model";

export default async function ResourceSearchController(req:Request,res:Response){
const {search,sort="upvotes",count=0} :{search:string,sort:"upvotes"|"createdAt",count:number} = req.body ;
try{
if (!search) {
    res.status(400).json({message: "Search query is required."});
    return;
}
else {
    const userBookmarks = await Bookmark.findOne({user:req.userid}).select("resource")
    const totalResource = await Resource.countDocuments({$text:{$search:search}})
    const resources = await Resource.aggregate([
        {
          $match: { $text: { $search: search } }
        },
        {
          $sort: { [sort]: -1 }
        },
        {
            $addFields: {
              isSaved: { $in: ["$_id", userBookmarks||[]] } // Check if the post ID is in user's bookmarks
            }
          },
        {
          $project: {
            title: 1,
            createdAt: 1,
            upvotes: 1,
            publisher:1,
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
    SuccessResponse(res,{payload:{resources,total:totalResource}})
}
}
catch (error) {
  console.log(error)
     res.status(500).json({ message: "Server error. Please try again later." });
}

}
