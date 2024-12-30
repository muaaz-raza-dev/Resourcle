import mongoose, { Types } from "mongoose";
import { IResource } from "./resource.model";
import { Iupvote } from "./upvote.model";

const resourceLinkSchema = new mongoose.Schema(
  {
    resource: { type: Types.ObjectId, ref: "resource" },
    title: String,
    url: String,
    description: String,
    isDeleted: Boolean,
    upvotes: Number,
    tags: [String],
    upvotesDoc: { type: mongoose.Types.ObjectId, ref: "Upvotes" },
  },
  { timestamps: true },
);

export interface IResourceLink extends mongoose.Document {
  resource: string | IResource;
  _id: Types.ObjectId;
  isDeleted: boolean;
  title: string;
  tags: string[];
  url: string;
  description: string;
  upvotes: number;
  upvotesDoc: Iupvote | string;
}

export const ResourceLink = mongoose.model<IResourceLink>(
  "ResourceLink",
  resourceLinkSchema,
);
