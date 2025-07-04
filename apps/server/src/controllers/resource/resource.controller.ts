import { Request, Response } from "express";
import {
  IContentResource,
  IResource,
  Resource,
} from "../../models/resource.model.js";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler.js";
import { ValidateLogin } from "../../middlewares/Authenticate.js";
import { SaveList } from "../../models/savelist.model.js";
import mongoose, { Types } from "mongoose";
import { Upvotes } from "../../models/upvote.model.js";
import { IResourceLink, ResourceLink } from "../../models/link.model.js";
import { ObjectId } from "mongoose";
import { ResourceCollection } from "../../models/resource-collection.model.js";
import redis from "../../redis-server.js";

export default async function CreateResource(
  req: Request,
  res: Response,
): Promise<void> {
  const {payload}: { payload:Omit<IResource,"_id">&{_id?:string} } = req.body;
  let resourceId: null | Types.ObjectId = null;
  if(!req.details?.email_verified){
    res.status(401).json({ success: false, message: "Verify your email before creating resource" });
    return ;
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {

    // Validate required fields
    delete payload._id 
    if (!payload || !payload.title || !payload.content.length || !payload.content) {
      res.status(400).json({ success: false, message: "Content is missing" });
      return ;
    }

   
    if (!req.userid) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    payload.publisher = new Types.ObjectId(req.userid) ;

    // Create resource with initial empty content
    const resource = await Resource.create({
      ...payload,
      content: [],
      upvotes: 0,
    });

    resourceId = resource._id as Types.ObjectId;

    // Create upvotes document
    const upvotesDoc = await Upvotes.create({
      resource: resourceId,
      users: [],
      content_votes: [],
    });

    // Process content and create links
    const updatedContent = await Promise.all(
      payload.content.map(async (grp) => {
        const createdLinks = await Promise.all(
          grp.links.map(async (link) => {
            const linkPayload = { ...link } as any ;
            delete linkPayload._id;
            linkPayload.upvotes = 0;
            linkPayload.resource = resourceId;
            const newLink = await ResourceLink.create(linkPayload);
            return newLink._id;
          }),
        );
        return { label: grp.label, links: createdLinks };
      }),
    );

    // Update resource with content and upvotes doc
    await Resource.findByIdAndUpdate(resourceId, {
      content: updatedContent,
      upvotesDoc: upvotesDoc._id,
    });

    await session.commitTransaction();
    await redis?.del("resourcle:resource-feed")
    res.status(201).json({
      success: true,
      message: "Resource created successfully",
      resourceId,
    });
    return;
  } catch (err) {
    console.error("Error creating resource:", err);
    await session.abortTransaction();
    // Clean up any partially created resources
    if (resourceId) {
      await Promise.all([
        Resource.findByIdAndDelete(resourceId),
        ResourceLink.deleteMany({ resource: resourceId }),
        Upvotes.deleteMany({ resource: resourceId }),
      ]);
    }
    res.status(500).json({
      success: false,
      message: "Failed to create resource. Please try again.",
    });
  } finally {
    session.endSession();
  }
}


export async function GetResourceMetaDetails(
  req: Request,
  res: Response,
): Promise<void> {
  if (!req.params.id || !Types.ObjectId.isValid(req.params.id)) {
    ErrorResponse(res, { status: 404, message: "Invalid Id" });
    return;
  }
  const resource = await Resource.findOne({
    _id: req.params.id,
    isPrivate: false,
  }).select("_id title description banner keywords ");
  SuccessResponse(res, { payload: resource });
}

export async function GetFeedResources(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const isLogined = await ValidateLogin(req);
    const query: { tags?: { [key: string]: string[] } } = {};
    const saveList: { resource: Types.ObjectId[] } = { resource: [] };

    if (isLogined) {
      const IndivdualPlaylist = (await SaveList.findOne({ user: req.userid }).select("resource -_id").lean()) ;
        saveList.resource = IndivdualPlaylist?.resource||[];
    }

    const ChachedResources = await redis?.get("resourcle:resource-feed")
    let resources: IResource[] = []
    
    if(!ChachedResources){
      resources = await Resource.find({ ...query, isPrivate: false })
      .sort("-updatedAt")
      .sort("-upvotes")
      .limit(10)
      .populate({path:"upvotesDoc",select:"users _id"})
      .select("title upvotes updatedAt upvotesDoc")
      .lean();
      await redis?.set("resourcle:resource-feed",JSON.stringify(resources),"EX", 60 * 60 * 24); 
      
    }
    else{
      resources = JSON.parse(ChachedResources)
    }

    let payload = JSON.parse(JSON.stringify(resources));

    payload = resources.map((e) => {
      const {upvotesDoc,...elm} = e 
      return {
        ...elm,
        isSaved: isLogined ? saveList?.resource?.some((r) => r.toString() == elm._id.toString()): false,
        ...(isLogined ? upvotesDoc && "users" in upvotesDoc 
            ? {
                isUpvoted: upvotesDoc.users.some(
                  (id) => id.toString() == req.userid?.toString(),
                ),
              }
            : {}
          : { isUpvoted: false }),
      };
    });

    SuccessResponse(res, { payload });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
}

export async function DeleteResource(req: Request, res: Response) {
  const { id } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (!id || id.length != 24) {
      await session.abortTransaction();
      ErrorResponse(res, { message: "Invalid id", status: 403 });
      return;
    }
    const resource = await Resource.findOne({ _id: id, publisher: req.userid });
    if (!resource) {
      await session.abortTransaction();
      ErrorResponse(res, { message: "Invalid credentials", status: 403 });
      return;
    }
    await Resource.findByIdAndUpdate(id, { isDeleted: true });
    const resourceLinksIds = resource.content.flatMap((e) =>
      e.links.map((l) => l._id),
    );
    await ResourceLink.updateMany(
      { resource: resource?._id },
      { isDeleted: true },
    );
    await ResourceCollection.updateMany(
      { links: { $in: resourceLinksIds } },
      { $pullAll: { links: resourceLinksIds } },
    );
    await session.commitTransaction();

    if (!resource) {
      await session.abortTransaction();
      ErrorResponse(res, { message: "Not found", status: 404 });
      return;
    }
    SuccessResponse(res, {
      message: "The resource is no longer exist",
      payload: id,
    });
  } catch (err) {
    await session.abortTransaction();
    ErrorResponse(res, {
      message: "An error occured . Try again later",
      status: 404,
    });
  } finally {
    await session.endSession();
  }
}

export async function UpvoteIndividualLink(req: Request, res: Response) {
  let isUpvoted = false;
  const { resource_id, link_id } = req.body;
  try {
    const resource = await Resource.findOne({
      _id: resource_id,
      "content.links": link_id,
    }).select("upvotesDoc");

    if (!resource) {
      ErrorResponse(res, { message: "Invalid Id" });
      return;
    }

    let upvoteDoc = await Upvotes.findById(resource.upvotesDoc);

    if (!upvoteDoc) {
      upvoteDoc = await Upvotes.create({
        resource: resource_id,
        content_votes: [
          {
            users: [new mongoose.Types.ObjectId(req.userid)],
            link_id: new mongoose.Types.ObjectId(link_id),
          },
        ],
      });
      await Resource.findByIdAndUpdate(resource_id, {
        upvotesDoc: upvoteDoc._id,
      });
    }

    const LinkUpvoteDoc =
      upvoteDoc?.content_votes.findIndex(
        (e) => e.link_id.toString() == link_id,
      ) ?? -1;

    isUpvoted =
      LinkUpvoteDoc != -1
        ? (upvoteDoc?.content_votes[LinkUpvoteDoc].users.some(
            (user) => user.toString() == req.userid?.toString(),
          ) ?? false)
        : false;
    const totalUpvotes = upvoteDoc?.content_votes[LinkUpvoteDoc]?.users?.length ?? 0;

    const query: Record<string, any> = {
      [!isUpvoted ? "$addToSet" : "$pull"]: {
        "content_votes.$.users": new mongoose.Types.ObjectId(req.userid),
      },
    };

    await ResourceLink.findByIdAndUpdate(link_id, {
      upvotes: totalUpvotes + (isUpvoted ? -1 : 1),
    },{timestamps:false});

    if (LinkUpvoteDoc == -1) {
      await Upvotes.findByIdAndUpdate(resource.upvotesDoc, {
        $addToSet: {
          content_votes: {
            users: [new mongoose.Types.ObjectId(req.userid)],
            link_id: new mongoose.Types.ObjectId(link_id),
          },
        },
      });
    } else if (upvoteDoc) {
      await Upvotes.findOneAndUpdate(
        {
          _id: upvoteDoc._id,
          "content_votes.link_id": new mongoose.Types.ObjectId(link_id),
        },
        query,
      );
    }

    SuccessResponse(res, { message: "Operation performed successfully" });
  } catch (err) {
    console.log(err);
    ErrorResponse(res, { message: "Internal server error", status: 500 });
  }
}

export async function EditResource(req: Request, res: Response) {
  const {
    payload,
    resource_id,
  }: {
    payload: IResource & {
      content: { _id: ObjectId; label: string; links: IResourceLink[] };
    };
    resource_id: string;
  } = req.body;

  try {
    // Validate resource_id
    if (!mongoose.Types.ObjectId.isValid(resource_id)) {
      ErrorResponse(res, {
        message: "Invalid resource id format",
        status: 400,
      });
      return;
    }

    const resource = (await Resource.findById(resource_id).populate({
      path: "content",
      populate: {
        path: "links",
      },
    })) as
      | (IResource & {
          content: Array<{
            _id: string;
            label: string;
            links: IResourceLink[];
          }>;
        })
      | null;

    if (!resource) {
      ErrorResponse(res, { message: "Resource not found", status: 404 });
      return;
    }

    if (resource.publisher.toString() != req.userid?.toString()) {
      ErrorResponse(res, {
        message: "You don't have permission to edit this resource",
        status: 403,
      });
      return;
    }

    // Create a deep copy to avoid modifying the original payload
    const EditedResource = JSON.parse(JSON.stringify(payload));

    // Remove protected fields
    const fieldsToRemove = [
      "upvotesDoc",
      "upvotes",
      "views",
      "publisher",
      "isDeleted",
      "_id",
      "createdAt",
      "updatedAt",
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fieldsToRemove.forEach((field) => delete (EditedResource as any)[field]);

    // Remove upvotes from content links
    if (EditedResource.content) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      EditedResource.content.forEach((field: any, group_index: number) => {
        if (field.links) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          field.links.forEach((_: any, link_index: number) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (EditedResource as any).content[group_index].links[
              link_index
            ].upvotes;
          });
        }
      });
    }

    // Validate required fields
    if (!EditedResource.title) {
      ErrorResponse(res, { message: "Title is required", status: 400 });
      return;
    }
    const updatedContent: IContentResource = [];

    for (const c of payload.content) {
      const links = await Promise.all(
        c.links.map(async (link) => {
          const linkPayload: Partial<IResourceLink> = { ...link };
          delete linkPayload.upvotes;
          delete linkPayload.upvotesDoc;
          delete linkPayload.resource;

          if (link._id) {
            const updatedLink = await ResourceLink.findByIdAndUpdate(
              link._id,
              { ...linkPayload, resource: resource_id },
              { new: true },
            );
            return updatedLink;
          } else {
            const newLink = await ResourceLink.create({
              ...linkPayload,
              resource: resource_id,
            });
            return newLink;
          }
        }),
      );
      updatedContent.push({
        ...c,
        links: links.filter((link) => link != null),
      });
    }
    // Handle deleted links by marking them as isDeleted
    const deleted = [];
    
    for (const group of resource.content) {
      const payloadGroup = updatedContent.find(
        (c) => c._id.toString() == group._id.toString(),
      );
      for (const link of group.links) {
        if (
          !payloadGroup ||
          !payloadGroup.links.some(
            (pLink) => pLink._id.toString() == link._id.toString(),
          )
        ) {
          await ResourceLink.findByIdAndUpdate(link._id, { isDeleted: true });
          deleted.push(link._id);
        }
      }
    }
    //Also Delete from the resource collection
    await ResourceCollection.updateMany(
      { links: { $in: deleted } },
      { $pull: { links: { $in: deleted } } },
    );

    const updatedResource = await Resource.findByIdAndUpdate(
      resource_id,
      { ...payload, content: updatedContent },
      { new: true },
    );

    SuccessResponse(res, {
      message: "Resource updated successfully",
      payload: updatedResource,
    });
  } catch (err) {
    console.log(err);
    ErrorResponse(res, {
      message: "Internal server error. Please try again later!",
      status: 500,
    });
  }
}

export async function EditResourceFetchResource(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const resource = await Resource.findById(id)
      .select("-upvotes -upvotesDoc -views -isDeleted -createdAt -updatedAt")
      .populate({ path: "tags", select: "name" })
      .populate({
        path: "content",
        populate: {
          path: "links",
        },
      });

    if (!resource) {
      ErrorResponse(res, { message: "Resource not found", status: 404 });
      return;
    }

    if (resource.publisher.toString() !== req.userid?.toString()) {
      ErrorResponse(res, {
        message: "You don't have permission to edit this resource",
        status: 403,
      });
      return;
    }

    const payload = JSON.parse(JSON.stringify(resource));
    payload.tags = resource?.tags.map((t) => t._id);
    payload.tagObjects = resource?.tags;
    SuccessResponse(res, {
      message: "Resource fetched successfully",
      payload,
    });
  } catch (err) {
    console.log(err);
    ErrorResponse(res, {
      message: "Internal server error. Please try again later!",
      status: 500,
    });
  }
}


export async function TrackResourceLinkClicks(
  req: Request,
  res: Response,
) {
const {id}= req.params;
await ResourceLink.findByIdAndUpdate(id,{
$inc: { clicks: 1 },
},{timestamps:false})
SuccessResponse(res,{message:"You clicked the link"})
return;
}