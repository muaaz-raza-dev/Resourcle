import { Request } from "express";
import { Types } from "mongoose";
import { Resource } from "../models/resource.model.js";
import { SaveList } from "../models/savelist.model.js";
import { ValidateLogin } from "../middlewares/Authenticate.js";
import { PipelineStage } from "mongoose";
const resource_limit = process.env.NEXT_PUBLIC_RESOURCE_LIMIT || 10;
export async function PopulateResources(
  req: Request,
  {
    query,
    count = 0,
    sort,
    isLogined,
    allowPrivate,
  }: {
    query: PipelineStage[];
    sort: "createdAt" | "upvotes";
    count: number;
    isLogined?: boolean;
    allowPrivate?: boolean;
  },
) {
  if (!isLogined) {
    await ValidateLogin(req);
  }

  const userBookmarks = req.userid
    ? (await SaveList.findOne({ user: req.userid }).select("resource").lean())
        ?.resource || []
    : [];
  const resources = await Resource.aggregate([
    ...query,
    { $match: { isDeleted: false } },
    ...(!allowPrivate ? [{ $match: { isPrivate: false } }] : []),
    {
      $sort: { [sort]: -1 },
    },
    {
      $addFields: {
        isSaved: { $in: ["$_id", userBookmarks] },
        isOwned: {
          $cond: {
            if: { $eq: ["$publisher", new Types.ObjectId(req?.userid)] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        title: 1,
        createdAt: 1,
        upvotes: 1,
        banner: 1,
        isSaved: 1,
        publisher: 1,
        isOwned: 1,
        isPrivate: 1,
        upvotesDoc: 1,
        views: { $size: { $ifNull: ["$views", []] } },
        linksLength: {
          $sum: {
            $map: {
              input: "$content",
              as: "innerArray",
              in: { $size: "$$innerArray.links" },
            },
          },
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "publisher",
        foreignField: "_id",
        as: "publisher",
      },
    },
    {
      $unwind: "$publisher",
    },
    {
      $unwind: "$linksLength",
    },
    ...(req.userid
      ? [
          {
            $lookup: {
              from: "upvotes",
              localField: "upvotesDoc",
              foreignField: "_id",
              as: "upvotesDoc",
            },
          },
          {
            $unwind: "$upvotesDoc",
          },
          {
            $addFields: {
              isUpvoted: {
                $in: [new Types.ObjectId(req.userid), "$upvotesDoc.users"],
              },
            },
          },
        ]
      : [
          {
            $addFields: {
              isUpvoted: false,
            },
          },
        ]),
    {
      $project: {
        title: 1,
        createdAt: 1,
        upvotes: 1,
        banner: 1,
        isSaved: 1,
        isUpvoted: 1,
        views: 1,
        isOwned: 1,
        upvotesDoc: 1,
        linksLength: 1,
        isPrivate: 1,
        "publisher.name": 1,
        "publisher.picture": 1,
      },
    },
    { $skip: count * +resource_limit },
    { $limit: +resource_limit },
  ]);
  return resources;
}
