import { Request, Response } from "express";
import { Itags, Tags } from "../../models/tag.model.js";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler.js";
import { Resource } from "../../models/resource.model.js";
import redis from "../../redis-server.js";

export default async function SearchTags(req: Request, res: Response) {
  const { q } = req.body;
  try {
    let tags: Itags[] = [];
    if (q == "" || q.trim() == "") {
      tags =  await Tags.find().limit(20)
    } else {
      tags = await Tags.find({
        name: { $regex: new RegExp(q, "i") },
      }).limit(20);
    }
    SuccessResponse(res, { payload: tags });
    return;
  } catch (err) {
    console.log(err)
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
    const ChachedTrendingTags = await redis?.get("resourcle:tags-feed")
    if (ChachedTrendingTags) {
      SuccessResponse(res, { payload: JSON.parse(ChachedTrendingTags) });
      return;
    }
    const tags: ItrendingTagPayload[] = await Resource.aggregate([
      {
        $sort: {upvotes:-1},
      },
      {
        $limit: 10,
      },
      {$project:{"tags":1}},
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tags",
        },
      },
      {
        $unwind: {
          path: "$tags",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $group: {
          _id: "$tags._id",
          total: {
            $sum: 1,
          },
          name: { $first: "$tags.name" },
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
    await redis?.set("resourcle:tags-feed",JSON.stringify(tags),"EX",3600*24*10) //12 hour
    SuccessResponse(res, { payload: tags });
    return;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    console.log(err)
    ErrorResponse(res, { message: "Internal server error" });
    return;
  }
}
