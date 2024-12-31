import { Request } from "express";
import { SaveList } from "../models/savelist.model.js";
import { IResource } from "../models/resource.model.js";
import { Iupvote, Upvotes } from "../models/upvote.model.js";
import mongoose, { Types } from "mongoose";
import { IResourceLink } from "../models/link.model.js";
interface IResourceLinkType extends IResourceLink {
  isUpvoted: boolean;
}
interface IResourcePayload extends IResource {
  isSaved: boolean;
  _id: string;
  isUpvoted: boolean;
  content: Array<{
    _id: Types.ObjectId;
    label: string;
    links: IResourceLinkType[];
  }>;
}

export async function UpvoteAndSavedPopulator(
  req: Request,
  {
    resource,
    resourceRaw,
    isNestedUpvote,
  }: {
    resourceRaw: IResource;
    resource: IResourcePayload;
    isNestedUpvote?: boolean;
  },
) {
  resource.views = resourceRaw.views?.length;
  if (!req.userid) {
    resource.isSaved = false;
    resource.isUpvoted = false;
    return resource;
  }
  const userBookmarks =
    (await SaveList.findOne({ user: req.userid }).select("resource").lean())
      ?.resource || [];
  const upvotedUsersList = resourceRaw.upvotesDoc as Iupvote;
  resource.isSaved = userBookmarks.some(
    (rs) => rs.toString() == resource._id.toString(),
  );
  resource.isUpvoted = upvotedUsersList?.users.some(
    (user: Types.ObjectId) => user.toString() == req.userid?.toString(),
  );
  if (isNestedUpvote) {
    const content_upvotes = (await Upvotes.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(resourceRaw.upvotesDoc._id),
        },
      },
      { $unwind: { path: "$content_votes" } },
      {
        $match: {
          "content_votes.users": new mongoose.Types.ObjectId(req.userid),
        },
      },
      { $project: { link_id: "$content_votes.link_id" } },
    ])) as { link_id: string }[];
    resource.content.forEach((content, contentIndex) => {
      content.links.forEach((l, lIndex) => {
        resource.content[contentIndex].links[lIndex].isUpvoted =
          content_upvotes.length
            ? content_upvotes.some(
                (cv) => cv.link_id.toString() == l._id.toString(),
              )
            : false;
      });
    });
  }
  return resource;
}
