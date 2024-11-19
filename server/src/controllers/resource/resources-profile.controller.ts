import { Request, Response } from "express"
import { ValidateLogin } from "../../middlewares/Authenticate";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler";
import { Resource } from "../../models/resource.model";
import { Types } from "mongoose";
import { PopulateResources } from "../../functions/populate-resources";
import { SaveList } from "../../models/savelist.model";
export async function GetUserResource(req: Request, res: Response) {
    const { count, sort, isPrivate, userid } = req.body;
    if (isPrivate) {
        const isLogined = await ValidateLogin(req)
        if (!isLogined || req.userid?.toString() != userid) {
            ErrorResponse(res, { status: 403, message: "Unauthorized" })
            return
        }
        const totalResource = await Resource.countDocuments({ userId: userid, isPrivate })
        const resources = await PopulateResources(req, { query: [{ $match: { publisher: userid, isPrivate: true } }], sort, count, isLogined: true, allowPrivate: true })
        SuccessResponse(res, { payload: { total: totalResource, resources } })
        return
    }
    else {
        const totalResource = await Resource.countDocuments({ publisher: userid, isPrivate:false })
        const resources = await PopulateResources(req, { query: [{ $match: { publisher:new Types.ObjectId(userid)} }], sort, count,  })
        SuccessResponse(res, { payload: { total: totalResource, resources } })
        return
    }
}

export async function SavedResources(req: Request, res: Response) {
    const { count, sort,  userid } = req.body;
        let saved = await SaveList.findOne({user:userid})
        let totalResource = 0;
        let resource =  [];
        if(!saved){
            saved = await SaveList.create({user:userid,resource:[]})
        }
        else {
            totalResource = await Resource.countDocuments({ _id:{$in:saved} })
            resource = await PopulateResources(req, { query: [{ $match: { _id:{$in:saved} } }], sort, count, isLogined: true});
        }
        SuccessResponse(res, { payload: { total: totalResource, resource } });
        return;
}