import mongoose, { Types } from "mongoose";
import { IResource } from "./resource.model.js";
import { Iupvote } from "./upvote.model.js";

const resourceLinkSchema = new mongoose.Schema(
  {
    resource: { type: Types.ObjectId, ref: "resource" },
    user:{type:Types.ObjectId,ref:"User"}, // for private links in collection
    title: String,
    url: String,
    description: String,
    isDeleted: Boolean,
    upvotes: Number,
    clicks:{default:0,type:Number},
    tags: [String],
    upvotesDoc: { type: mongoose.Types.ObjectId, ref: "Upvotes" },
    isPrivate:{type:Boolean,default:false}  // Private custom links
  },
  { timestamps: true },
);

export interface IResourceLink extends mongoose.Document {
  resource: string | IResource;
  _id: Types.ObjectId;
  isDeleted: boolean;
  title: string;
  tags: string[];
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
