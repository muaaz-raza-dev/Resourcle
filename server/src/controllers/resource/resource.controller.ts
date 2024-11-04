import { Request, Response } from "express";
import { IResource, Resource } from "../../models/resource.model";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler";
import { ValidateLogin } from "../../middlewares/Authenticate";

export default async function CreateResource(req: Request, res: Response):Promise<void> {
    const { payload }: { payload: IResource } = req.body;
    try {
        payload.publisher = req.userid as string;
        await Resource.create(payload)
        res.status(201).send({ message: "Resource created successfully" });
        return ;
    }
    catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }

}
export async function GetResource(req: Request, res: Response):Promise<void> {
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
        if(isLogined){
           await Resource.findByIdAndUpdate(req.params.id,{$addToSet:{views:req.userid}}) 
        }
        SuccessResponse(res, { payload: resource })
        return;
    }
    catch (err) {

        res.status(500).send({ message: "Internal server error" });
        return;
    }

}

export async function GetFeedResources(req: Request, res: Response):Promise<void> {
    try {
        const isLogined = await ValidateLogin(req)
        const query: { tags?: { [key: string]: string[] } } = {}
        if (isLogined && req.details.interest?.length) {
            query.tags = { $in: req.details.interest }
        }
        const resources = await Resource.find(query).sort("-upvotes -createdAt").select("title upvotes").limit(18);
        SuccessResponse(res, { payload: resources });
        return;
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "Internal server error" });
    }
}


