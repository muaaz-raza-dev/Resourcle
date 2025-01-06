import axios from "axios";
import  { FastifyReply, FastifyRequest } from "fastify";
import { SuccessResponse } from "../responseHandler.js";
import { UserReport } from "../models/user-report.model.js";

export async function TrackUserVisits(req:FastifyRequest,res:FastifyReply){
    
let user = await UserReport.findOne({ip:req.ip}).select("_id")

if(!user){
    const response = await axios.get<{city:string;region:string;country_name:string;longitude:string;latitude:string}>(`https://ipapi.co/${req.ip}/json/`);
    const data = response.data;
    user = await UserReport.create({ip:req.ip,firstVisit:new Date(),lastVisit:new Date(),location:data,visits:1})
}

await UserReport.findByIdAndUpdate(user._id, {$set: {lastVisit: new Date()}, $inc: {visits: 1}})

SuccessResponse(res,{})
}


export async function TrackUserProfileVisits(req:FastifyRequest<{Params:{userid:string}}>,res:FastifyReply){
    const id = req.params.userid as string;
    let user = await UserReport.findOne({ip:req.ip}).select("_id profileVisits")
    if(!user){
        const response = await axios.get<{city:string;region:string;country_name:string;longitude:string;latitude:string}>(`https://ipapi.co/${req.ip}/json/`);
        const data = response.data;
        user = await UserReport.create({ip:req.ip,firstVisit:new Date(),lastVisit:new Date(),location:data,visits:1,profileVisits:[{user:id,count:1}]})
    }
    if(user.profileVisits.some(e=>e.user?.toString()==id)){
        await UserReport.findOneAndUpdate({_id:user._id,"profileVisits.user":id}, {
            $set: { lastVisit: new Date() },
            $inc: { "profileVisits.$.count": 1 }
        })
    }
    else {
        await UserReport.findByIdAndUpdate(user._id, {
            $set: { lastVisit: new Date() },
            $push: { profileVisits: { user: id, count: 1 } }
        })
    }
    SuccessResponse(res,{})
}

export async function TrackUserResourceVisit(req:FastifyRequest<{Params:{resourceid:string}}>,res:FastifyReply){
    const id = req.params.resourceid as string;
    let user = await UserReport.findOne({ip:req.ip}).select("_id resourceVisits")
    if(!user){
        const response = await axios.get<{city:string;region:string;country_name:string;longitude:string;latitude:string}>(`https://ipapi.co/${req.ip}/json/`);
        const data = response.data;
        user = await UserReport.create({ip:req.ip,firstVisit:new Date(),lastVisit:new Date(),location:data,visits:1,profileVisits:[{user:id,count:1}]})
    }
    if(user.resourceVisits.some(e=>e.resource?.toString()==id)){
        await UserReport.findOneAndUpdate({_id:user._id,"resourceVisits.resource":id}, {
            $set: { lastVisit: new Date() },
            $inc: { "resourceVisits.$.count": 1 },
            $push:{"resourceVisits.$.timestamps":new Date()}
        })
    }
    else {
        await UserReport.findByIdAndUpdate(user._id, {
            $set: { lastVisit: new Date() },

            $push: { resourceVisits: { resource: id, count: 1,timestamps:[new Date()] } }
        })
    }
    SuccessResponse(res,{})
}