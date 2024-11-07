import mongoose from 'mongoose';
import { Iupvote } from './upvote.model';

const resourceSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        unique:false,
        text:true,
    },
    views:{ref:"User",type:[mongoose.Types.ObjectId]},
    description:String,
    tags: {
        type: [mongoose.Types.ObjectId],
        ref:"Tags"
    },
    publisher:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
    upvotes:{
        type: Number,
        default: 0
    },
    upvotesDoc:{type:mongoose.Types.ObjectId,ref:"Upvotes"},
    banner:String,
    content:[
        {
            label:String,
            links:[{
                title:String,
                url:String,
                description:String,
                isPaid:Boolean,
                consumption_time:String,
                level_infomation:String,
                stars:Number
            }]
        }
    ],
    isPrivate:{type:Boolean,default:false}
}, { timestamps: true });


export interface IResource extends mongoose.Document {
    title: string;
    tags: mongoose.Types.ObjectId;
    publisher: string;
    upvotes: number;
    content: Array<{
        Heading: string;
        Link: {
            title: string;
            url: string;
            description: string;
            isPaid: boolean;
            consumption_time: string;
            skill_level: string;
            stars: number;
        };
    }>;
    upvotesDoc:mongoose.Types.ObjectId | Iupvote,
    createdAt: Date;
    updatedAt: Date;
}
export const Resource = mongoose.model<IResource>('resource', resourceSchema);
