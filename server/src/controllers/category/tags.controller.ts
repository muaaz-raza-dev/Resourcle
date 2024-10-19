import { Request, Response } from "express";
import { Itags, Tags } from "../../models/tag.model";
import { SuccessResponse } from "../../utils/responsehandler";

export default async function SearchCategories(req:Request,res:Response) {
const {q} = req.body;
try {
    let tags:Itags[] = [];
    if(q==""||q.trim()==""){
        tags=[]
    }
    else {
        tags= await Tags.find({
            name: { $regex: new RegExp(q, 'i') }
        }).limit(20);
    }
    return SuccessResponse(res,{payload:tags});
}
catch(err){
    console.log(err)
    return SuccessResponse(res,{payload:[]});
}

}
