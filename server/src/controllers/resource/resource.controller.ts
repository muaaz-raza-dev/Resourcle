import { Request, Response } from "express";
import { IResource, Resource } from "../../models/resource.model";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler";

export default async function CreateResource(req:Request,res:Response) {
    const {payload} :{payload:IResource} = req.body;
    try{
        payload.publisher = req.userid as string;
        await Resource.create(payload)
        return res.status(201).send({ message: "Resource created successfully" });
    }
    catch(err){
        return res.status(500).send({ message: "Internal server error" });
    }
    
}
export  async function GetResource(req:Request,res:Response) {
    
    try{
        if(!req.params.id|| req.params.id.length !=24) return ErrorResponse(res,{status:404,message:"Invalid Id"})
        const resource = await Resource.findById(req.params.id).populate("tags").populate({path:"publisher",select:"name photo"})
        if(!resource) return ErrorResponse(res,{status:404,message:"Not found"})
        return SuccessResponse(res,{payload:resource})
    }
    catch(err){
        console.log(err)
        return res.status(500).send({ message: "Internal server error" });
    }
    
}