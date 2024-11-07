import { Request, Response } from "express";
import { IResource, Resource } from "../../models/resource.model";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler";
import { ValidateLogin } from "../../middlewares/Authenticate";
import { SaveList } from "../../models/savelist.model";
import { Types } from "mongoose";
import { Upvotes } from "../../models/upvote.model";

export default async function CreateResource(req: Request, res: Response): Promise<void> {
    const { payload }: { payload: IResource } = req.body;
    try {
        payload.publisher = req.userid as string;
        const resource = await Resource.create(payload)
        const upvotesDoc = await Upvotes.create({ resource: resource._id })
        resource.upvotesDoc = upvotesDoc._id;
        await resource.save();
        res.status(201).send({ message: "Resource created successfully" });
        return;
    }
    catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }

}
export async function GetResource(req: Request, res: Response): Promise<void> {
    try {

        if (!req.params.id || req.params.id.length != 24) {
            ErrorResponse(res, { status: 404, message: "Invalid Id" })
            return;

        }
        const resource = await Resource.findById(req.params.id).populate("tags").populate({ path: "publisher", select: "name photo" })

        if (!resource) {
            ErrorResponse(res, { status: 404, message: "Not found" })
            return;
        }
        const isLogined = await ValidateLogin(req)
        if (isLogined) {
            await Resource.findByIdAndUpdate(req.params.id, { $addToSet: { views: req.userid } })
        }
        SuccessResponse(res, { payload: resource })
        return;
    }
    catch (err) {

        res.status(500).send({ message: "Internal server error" });
        return;
    }

}

export async function GetFeedResources(req: Request, res: Response): Promise<void> {
    try {
        const isLogined = await ValidateLogin(req)
        const query: { tags?: { [key: string]: string[] } } = {}
        let saveList: { resource: Types.ObjectId[] } = { resource: [] }

        if (isLogined) {
            if (req.details.interest?.length) { query.tags = { $in: req.details.interest } }
            const IndivdualPlaylist = await SaveList.findOne({ user: req.userid }).select("resource -_id").lean() || null
            if (IndivdualPlaylist) {
                saveList.resource = IndivdualPlaylist.resource
            }

        }

        const resources = await Resource.find(query).sort("-upvotes -createdAt").populate("upvotesDoc")
            .select("title upvotes upvotesDoc").limit(18).lean();

        let payload = JSON.parse(JSON.stringify(resources))

        payload = resources.map((elm) => {
            return {
                ...elm,
                isSaved: isLogined ? saveList?.resource?.some((r) => r.toString() == elm._id.toString()) : false,
                ...(isLogined ?
                     (elm.upvotesDoc && "users" in elm.upvotesDoc ?
                        { isUpvoted: elm.upvotesDoc.users.some(id => id.toString() == req.userid?.toString()) } : {}) : 
                        { isUpvoted: false })
            }
        })
        SuccessResponse(res, { payload });
        return;
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "Internal server error" });
    }
}


