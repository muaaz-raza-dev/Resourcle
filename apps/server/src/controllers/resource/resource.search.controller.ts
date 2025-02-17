import { Request, Response } from "express";
import { Resource } from "../../models/resource.model.js";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler.js";
import { ValidateLogin } from "../../middlewares/Authenticate.js";
import { PopulateResources } from "../../functions/populate-resources.js";
import { Tags } from "../../models/tag.model.js";
import { User } from "../../models/user.model.js";
import { ResourceLink } from "../../models/link.model.js";

export default async function ResourceSearchController(

  req: Request,
  res: Response,
) {
  const {
    search,
    sort = "upvotes",
    count = 0,
    categories
  }: {
    search: string;
    sort: "upvotes" | "updatedAt";
    count: number;
    categories:string[]
  } = req.body;
  try {
    if (!search) {
      res.status(400).json({ message: "Search query is required." });
      return;
    } else {  
      await ValidateLogin(req);

      const totalResource = await Resource.countDocuments({
        $text: { $search: search },
      });

      const resources = await PopulateResources(req, {
        query: [
          {
            $match: { $text: { $search: search }, ...(categories?.length ? { tags: { $in: categories } } : {}) },

          },
        ],
        sort,
        count,
      });

      SuccessResponse(res, { payload: { resources, total: totalResource } });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}


export  async function TagBasedResourceFeed(
  req: Request,
  res: Response,
) {
  const {  sort = "upvotes",count = 0,tagId}: { tagId:string,sort: "upvotes" | "createdAt";count: number;} = req.body;
  try {
    
    await ValidateLogin(req);
    const tag = await Tags.findOne({$or:[{_id:tagId},{name:tagId}]})
    if(!tag){
      ErrorResponse(res,{status:404, message:"No tag found"})
      return;
    }
      const totalResource = await Resource.countDocuments({
        tags: tag?._id,
      });

      const resources = await PopulateResources(req, {
        query: [
          {
            $match: {tags: tag?._id},
          },
        ],
        sort,
        count,
      });

      SuccessResponse(res, { payload: { resources, total: totalResource } });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}

export async function PartialAdvancedSearchController(req: Request, res: Response) {

  try {
    const { q } = req.body;

    // Input validation
    if (!q || typeof q !== "string") {
      res.status(400).json({ error: "Invalid search query" });
      return;
    }

    // Concurrently execute the queries
    const [resources, users] = await Promise.all([
      Resource.find({ $text: { $search: q }, isDeleted: false, isPrivate: false })
        .sort("-upvotes")
        .select("title upvotes views updatedAt createdAt")
        .limit(5).lean(),
     User.find({
        $or: [
          { name: { $regex: new RegExp(q, "i") } },
          { username: { $regex: new RegExp(q, "i") } },
        ],
        isDeleted: false
      })
        .select("name headline username picture")
        .limit(5),
    ]);

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
 
      {
        $sort: {
          updatedAt: -1,
        },
      },
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
        $limit: 5,
      },
      {
        $project: {
          "resource": "$resource._id",
          "title": 1,
          "url":1,
          "_id": 1,
          "clicks": 1,
          "upvotes": 1,
        },
      },
    ]);

    // Success response
    SuccessResponse(res, { payload: { resources: resources.map(e => ({ ...e, views: e.views.length })),  users, links: linkResults } });
    return;
  } catch (error) {
    // Error handling
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
}

