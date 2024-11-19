import { Request, Response } from "express";
import { IResource, Resource } from "../../models/resource.model";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler";
import { ValidateLogin } from "../../middlewares/Authenticate";
import { SaveList } from "../../models/savelist.model";
import { Types } from "mongoose";
import { Upvotes } from "../../models/upvote.model";
import { UpvoteAndSavedPopulator } from "../../functions/upvote-saved-populator-js";

export default async function CreateResource(req: Request, res: Response): Promise<void> {
    const { payload }: { payload: IResource } = req.body;
    try {
        delete payload._id






        
        payload.publisher = req.userid?.toString() as string;
        const resource = await Resource.create(payload)
        let upvotesDoc = await Upvotes.findOne({resource:resource._id})
            if(!upvotesDoc) {
                upvotesDoc = await Upvotes.create({ resource: resource._id })
            }
        resource.upvotesDoc = upvotesDoc._id;
        await Resource.findByIdAndUpdate(resource._id,{upvotesDoc:upvotesDoc._id});
        res.status(201).send({ message: "Resource created successfully" });
        return;
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "Internal server error" });
    }
}

export async function GetResource(req: Request, res: Response): Promise<void> {
    try {

        if (!req.params.id || req.params.id.length != 24) {
            ErrorResponse(res, { status: 404, message: "Invalid Id" })
            return;

        }
        
        const resourceRaw= await Resource.findById(req.params.id).populate("tags upvotesDoc").populate({ path: "publisher", select: "name photo headline" }).lean()
        
        if (!resourceRaw) {
            ErrorResponse(res, { status: 404, message: "Not found" })
            return;
        }
        const resource = JSON.parse(JSON.stringify(resourceRaw))
        resource.isUpvoted = false
        resource.isSaved = false

        const isLogined = await ValidateLogin(req)
        if (isLogined) {
            await Resource.findByIdAndUpdate(req.params.id, { $addToSet: { views: req.userid } })
        }

        if(resource.isPrivate){
            if(isLogined&& typeof resource.publisher != "string" &&req.userid?.toString()==resource.publisher._id.toString()){
                SuccessResponse(res, { payload: resource })    
                return;
            }
            else{
                ErrorResponse(res,{message:"Not found",status:404})
                return;
            }
        }
        else{
            await UpvoteAndSavedPopulator(req,{resourceRaw,resource})
            SuccessResponse(res, { payload: resource })
            return;
        }
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

        const resources = await Resource.find({...query,isPrivate:false}).sort("-upvotes -createdAt").populate("upvotesDoc")
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


export async function DeleteResource(req:Request,res:Response){
   const {id} =req.body;
   try{
    if(!id||id.length!=24) {
        ErrorResponse(res,{message:"Invalid id",status:403})
        return ;
    }
        const resource = await Resource.findByIdAndUpdate(id,{isDeleted:true});
        if(!resource){
            ErrorResponse(res,{message:"Not found",status:404})
            return ;
        }
        SuccessResponse(res,{message:"The resource is no longer exist",payload:id})

   }
   catch(err){

   } 
}