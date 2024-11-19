import { Request } from "express"
import { SaveList } from "../models/savelist.model"
import { IResource } from "../models/resource.model"
import { Iupvote } from "../models/upvote.model"
import { Types } from "mongoose"

export async function UpvoteAndSavedPopulator(req:Request,{resource,resourceRaw}:{resourceRaw:IResource,resource:any}){
    resource.views=resourceRaw.views.length
    if(!req.userid){
        resource.isSaved = false
        resource.isUpvoted =false
        return resource
    }
    const userBookmarks =(await SaveList.findOne({ user: req.userid }).select("resource").lean())?.resource||[]
    const upvotedUsersList = resourceRaw.upvotesDoc as Iupvote
    resource.isSaved = userBookmarks.some(rs=>rs.toString()==resource._id.toString())
    resource.isUpvoted = upvotedUsersList.users.some((user:Types.ObjectId)=>user.toString()==req.userid?.toString())
    return resource
}