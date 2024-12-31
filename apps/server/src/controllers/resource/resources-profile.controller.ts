import { Request, Response } from "express";
import { ValidateLogin } from "../../middlewares/Authenticate.js";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler.js";
import { Resource } from "../../models/resource.model.js";
import { Types } from "mongoose";
import { PopulateResources } from "../../functions/populate-resources.js";
import { SaveList } from "../../models/savelist.model.js";
import { ResourceCollection } from "../../models/resource-collection.model.js";
import GetQueryObjectUsernameOrId from "../../functions/query-username-or-id.js";
import { User } from "../../models/user.model.js";
export async function GetUserResource(req: Request, res: Response) {
  const { count, sort, isPrivate, userid } = req.body;
  try {
    const query = GetQueryObjectUsernameOrId(userid);
    const user = await User.findOne({ ...query, isDeleted: false }).select(
      "_id",
    );
    const publisherId = user?._id;
    if (!publisherId) {
      ErrorResponse(res, { status: 404, message: "User not found" });
      return;
    }
    if (isPrivate) {
      const isLogined = await ValidateLogin(req);
      if (!isLogined || req.userid?.toString() != publisherId) {
        ErrorResponse(res, { status: 403, message: "Unauthorized" });
        return;
      }
      const totalResource = await Resource.countDocuments({
        publisher: publisherId,
        isPrivate: true,
      });
      const resources = await PopulateResources(req, {
        query: [
          {
            $match: {
              publisher: new Types.ObjectId(publisherId),
              isPrivate: true,
            },
          },
        ],
        sort,
        count,
        isLogined: true,
        allowPrivate: true,
      });
      SuccessResponse(res, { payload: { total: totalResource, resources } });
      return;
    } else {
      const totalResource = await Resource.countDocuments({
        publisher: publisherId,
        isPrivate: false,
      });
      const resources = await PopulateResources(req, {
        query: [{ $match: { publisher: new Types.ObjectId(publisherId) } }],
        sort,
        count,
      });
      SuccessResponse(res, { payload: { total: totalResource, resources } });
      return;
    }
  } catch (err) {
    console.log(err);
    ErrorResponse(res, { message: "Internal server error" });
    return;
  }
}

export async function SavedResources(req: Request, res: Response) {
  const { count, sort, userid } = req.body;
  const query = GetQueryObjectUsernameOrId(userid);
  const user = await User.findOne({ ...query, isDeleted: false }).select("_id");
  const FilteredUserId = user?._id;
  if (!FilteredUserId) {
    ErrorResponse(res, { status: 404, message: "User not found" });
    return;
  }
  let saved = await SaveList.findOne({ user: FilteredUserId });
  let totalResource = 0;
  let resources = [];
  if (!saved) {
    saved = await SaveList.create({ user: FilteredUserId, resource: [] });
  } else {
    totalResource = await Resource.countDocuments({
      _id: { $in: saved.resource },
    });
    resources = await PopulateResources(req, {
      query: [{ $match: { _id: { $in: saved.resource } } }],
      sort,
      count,
    });
  }
  SuccessResponse(res, { payload: { total: totalResource, resources } });
  return;
}

export async function SwitchVisiblityResource(req: Request, res: Response) {
  const { id } = req.body;
  try {
    const resource = await Resource.findById(id).select(
      "_id publisher isPrivate content",
    );
    if (!resource || resource.publisher.toString() != req.userid?.toString()) {
      ErrorResponse(res, { message: "Invalid Id", status: 403 });
      return;
    }
    await Resource.findByIdAndUpdate(id, { isPrivate: !resource.isPrivate });

    //Also Delete from the resource collection
    const links = resource.content.flatMap((e) =>
      e.links.map((link) => link.toString()),
    );
    await ResourceCollection.updateMany(
      { links: { $in: links } },
      { $pull: { links: { $in: links } } },
    );

    SuccessResponse(res, { payload: { isPrivate: !resource.isPrivate } });

    return;
  } catch (err) {
    console.log(err);
    ErrorResponse(res, { message: "Internal server error", status: 501 });
  }
}
