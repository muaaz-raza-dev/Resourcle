import { Request, Response } from "express";
import { Resource } from "../../models/resource.model";
import { SuccessResponse } from "../../utils/responsehandler";

export default async function ResourceSearchController(req:Request,res:Response){
const {search,sort="upvotes",count} :{search:string,sort:"upvotes"|"createdAt",count:number} = req.body ;
try{
if (!search) {
    res.status(400).json({message: "Search query is required."});
    return;
}
else {
    const totalResource = await Resource.countDocuments({$text:{$search:search}})
    const resources = await Resource.find({$text:{$search:search}}).sort({[sort]:-1}).select("title createdAt upvotes ").populate({path:"publisher",select:"name picture"}).limit(10).skip(count*10);
    SuccessResponse(res,{payload:{resources,total:totalResource}})
}
}
catch (error) {
     res.status(500).json({ message: "Server error. Please try again later." });
}

}
