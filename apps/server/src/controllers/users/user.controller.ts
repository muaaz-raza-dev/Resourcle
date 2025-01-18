import { Request, Response } from "express";
import { Resource } from "../../models/resource.model.js";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler.js";
import redis from "../../redis-server.js";
interface ItopUser {
  upvotes: number;
  top_posts: number;
  user: { name: string; headline: string; _id: string; picture: string };
}
export default async function GetTopUsers(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    //? Top users  = publishers having most upvotes in their resource
    const ChachedUsers = await redis?.get("resourcle:users-feed")
    if (ChachedUsers) {
      SuccessResponse(res, { payload: JSON.parse(ChachedUsers) });
      return;
    }
    const users: ItopUser[] = await Resource.aggregate([
      { $sort: { upvotes: -1, createdAt: -1 } },
      { $limit: 50 },
      {
        $group: {
          _id: "$publisher",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $project: {
          "user.name": 1,
          "user._id": 1,
          "user.headline": 1,
          "user.picture": 1,
        },
      },
    ]);
    await redis?.set("resourcle:users-feed",JSON.stringify(users),"EX",3600*3) //12 hour
    SuccessResponse(res, { payload: users });
    return;
  } catch (err) {
    console.error("Error fetching top users:", err);
    ErrorResponse(res, { message: "An error occured" });
  }
}
