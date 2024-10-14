import { Request, Response } from "express";
import { Tags } from "../../models/tag.model";
import { SuccessResponse } from "../../utils/responsehandler";

export default async function SearchCategories(req:Request,res:Response) {
const {q} = req.body;
try {
    const categories = await Tags.find({name: { $regex: new RegExp(q, 'i') }}).limit(20);
    return SuccessResponse(res,{payload:categories});
}
catch(err){
    return SuccessResponse(res,{payload:[]});
}

}
