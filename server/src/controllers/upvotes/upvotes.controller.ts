import { Request, Response } from 'express';
import { ErrorResponse, SuccessResponse } from '../../utils/responsehandler';
import { Upvotes } from '../../models/upvote.model';
import { Resource } from '../../models/resource.model';

export default async function UpvoteResourceController(req: Request, res: Response) {
    const { id } = req.body;
    try {

        if (!id || id.length < 24 || !req.userid) {
            ErrorResponse(res, { message: "invlaid resource id" })
            return;
        }
        const resource = Resource.findById(id).select("upvote")
        if (!resource) {
            ErrorResponse(res, { message: "invlaid resource id" })
            return;
        }
        let action: "up" | "down" = "up"
        const upvoteDoc = await Upvotes.findOne({ resource: id })
        
        if (!upvoteDoc) {
            const upvoteDoc = await Upvotes.create({ resource: id, users: [req.userid] })
            await Resource.findByIdAndUpdate(id, { upvotesDoc: upvoteDoc._id })
        }
        else {
            const query: { [key: string]: { [key: string]: string } } = {}
            if (upvoteDoc.users.some(e => e.toString() == req?.userid?.toString())) {
                query.$pull = { users: req.userid }
                action = "down"
            }
            else query.$addToSet = { users: req.userid }
            await Upvotes.findByIdAndUpdate(upvoteDoc._id, query, { new: true })
        }
        await Resource.findByIdAndUpdate(id, { $inc: { upvotes: action == "up" ? 1 : -1 } })
        SuccessResponse(res, { message: "successfully completed" })
    }
    catch (err) {
        console.log(err)
        ErrorResponse(res, { message: "An error occured" })
    }
}

