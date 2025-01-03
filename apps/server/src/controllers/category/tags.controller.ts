import { Request, Response } from "express";
import { Itags, Tags } from "../../models/tag.model.js";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler.js";
import { Resource } from "../../models/resource.model.js";

export default async function SearchTags(req: Request, res: Response) {
  const { q } = req.body;
  try {
    let tags: Itags[] = [];
    if (q == "" || q.trim() == "") {
      tags = [];
    } else {
      tags = await Tags.find({
        name: { $regex: new RegExp(q, "i") },
      }).limit(20);
    }
    SuccessResponse(res, { payload: tags });
    return;
  } catch (err) {
    SuccessResponse(res, { payload: [] });
    return;
  }
}

interface ItrendingTagPayload {
  name: string;
  _id: string;
  total: number;
}
export async function TrendingTags(req: Request, res: Response) {
  try {
    const resources: ItrendingTagPayload[] = await Resource.aggregate([
      {
        $unwind: {
          path: "$tags",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $project: {
          tags: 1,
        },
      },
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tags",
        },
      },

      {
        $group: {
          _id: "$tags",
          total: {
            $sum: 1,
          },
          name: { $first: "$tags.name" },
        },
      },
      {
        $unwind: {
          path: "$name",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);
    SuccessResponse(res, { payload: resources });
    return;
  } catch (err) {
    ErrorResponse(res, { message: "Internal server error" });
    return;
  }
}

export async function CreateTags(req:Request,res:Response){
  try{

    const {tags}= req.body;
    for (const tag of tags) {
      await Tags.create({name:tag});
    }
  SuccessResponse(res, { message: "Tags created successfully" });
  }
  catch(err){
    
    ErrorResponse(res,{message:"SOmething went wrong. You may repeat some of it",error:err})
  }
}