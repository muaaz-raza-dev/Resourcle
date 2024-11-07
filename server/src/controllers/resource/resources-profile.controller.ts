import { Request, Response } from "express"
import { ValidateLogin } from "../../middlewares/Authenticate";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler";
import { Resource } from "../../models/resource.model";
import { PopulateResources } from "../../functions/populate-resources";
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
        const totalResource = await Resource.countDocuments({ userId: userid, isPrivate:false })
        const resources = await PopulateResources(req, { query: [{ $match: { publisher: userid} }], sort, count,  })
        SuccessResponse(res, { payload: { total: totalResource, resources } })
        return
    }
}