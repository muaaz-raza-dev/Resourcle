import mongoose, { Types } from "mongoose";
import { IResource } from "./resource.model.js";
import { Iupvote } from "./upvote.model.js";

const resourceLinkSchema = new mongoose.Schema(
  {
    resource: { type: Types.ObjectId, ref: "resource" },
    user:{type:Types.ObjectId,ref:"User"}, // for private links in collection
    title: { type: String, required: true, text: true },
    url: { type: String, required: true, text: true },
    description: String,
    isDeleted: Boolean,
    upvotes: Number,
    clicks:{default:0,type:Number},
    upvotesDoc: { type: mongoose.Types.ObjectId, ref: "Upvotes" },
    isPublished:{type:Boolean,default:true}  // unpublished custom links
  ,isBanned:{type:Boolean,default:false},// for link restriction
  
  },
  { timestamps: true },
);

export interface IResourceLink extends mongoose.Document {
  resource: string | IResource;
  _id: Types.ObjectId;
  isDeleted: boolean;
  user:Types.ObjectId;
  isPublished:boolean,
  title: string;
  clicks:number,
  url: string;
  description: string;
  upvotes: number;
  upvotesDoc: Iupvote | string;
}

export const ResourceLink = mongoose.model<IResourceLink>(
  "ResourceLink",
  resourceLinkSchema,
);
