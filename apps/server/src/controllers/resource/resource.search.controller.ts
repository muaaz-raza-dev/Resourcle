import { Request, Response } from "express";
import { Resource } from "../../models/resource.model.js";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler.js";
import { ValidateLogin } from "../../middlewares/Authenticate.js";
import { PopulateResources } from "../../functions/populate-resources.js";
import { Tags } from "../../models/tag.model.js";
import { User } from "../../models/user.model.js";

export default async function ResourceSearchController(

  req: Request,
  res: Response,
) {
  const {
    search,
    sort = "upvotes",
    count = 0,
  }: {
    search: string;
    sort: "upvotes" | "createdAt";
    count: number;
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
            $match: { $text: { $search: search } },
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

export async function PartialAdvancedSearchController(req: Request,res: Response,){
    try {
      const { q } = req.body;
  
      // Input validation
      if (!q || typeof q !== "string") {
        res.status(400).json({ error: "Invalid search query" });
        return ;
      }
  
      // Concurrently execute the queries
      const [resources, tags, users] = await Promise.all([
        Resource.find({ $text: { $search: q } })
          .sort("-upvotes")
          .select("title upvotes views updatedAt createdAt")
          .limit(5).lean()
          ,
  
        Tags.find({ name: { $regex: new RegExp(q, "i") } }).limit(5),
        User.find({
          $or: [
            { name: { $regex: new RegExp(q, "i") } },
            { username: { $regex: new RegExp(q, "i") } },
          ],
        })
          .select("name headline username picture")
          .limit(5),
      ]);
  
      // Success response
      SuccessResponse(res, { payload: { resources:resources.map(e=>({...e,views:e.views.length})), tags, users } });
      return;
    } catch (error) {
      // Error handling
      console.log(error)
      res.status(500).json({ error: "Internal server error" });
      return ;
    }
  
}