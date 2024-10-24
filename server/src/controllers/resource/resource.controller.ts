import { Request, Response } from "express";
import { IResource, Resource } from "../../models/resource.model";

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