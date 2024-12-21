import mongoose, { Types } from 'mongoose';
import { IResource } from './resource.model';
import { Iupvote } from './upvote.model';


const resourceLinkSchema = new mongoose.Schema({
                resource:{type:Types.ObjectId,ref:"resource"},
                title:String,
                url:String,
                description:String,
                isPaid:Boolean,
                consumption_time:String,
                level_infomation:String,
                upvotes:Number,
                upvotesDoc:{type:mongoose.Types.ObjectId,ref:"Upvotes"},
}, { timestamps: true });



export interface IResourceLink extends mongoose.Document {
            resource:string|IResource;
            _id:string
            title: string;
            url: string;
            description: string;
            isPaid: boolean;
            consumption_time: string;
            level_infomation: string;
            upvotes: number;
            upvotesDoc:Iupvote|string;
}

  
export const ResourceLink = mongoose.model<IResourceLink>('ResourceLink', resourceLinkSchema);
