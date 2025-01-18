import mongoose, { Query, Types } from "mongoose";
import { Iupvote } from "./upvote.model.js";
import { Iuser } from "./user.model.js";
import { Itags } from "./tag.model.js";
import { IResourceLink } from "./link.model.js";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: false,
      text: true,
    },
    views: { ref: "User", type: [{user:mongoose.Types.ObjectId,ip:String}] },
    description: String,
    tags: {
      type: [mongoose.Types.ObjectId],
      ref: "Tags",
    },
    publisher: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    upvotesDoc: { type: mongoose.Types.ObjectId, ref: "Upvotes" },
    banner: String,
    content: [
      {
        label: String,
        links: { type: [Types.ObjectId], ref: "ResourceLink" },
      },
    ],
    isDeleted: { type: Boolean, default: false },
    isPrivate: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export interface IResource extends mongoose.Document {
  views: {user:mongoose.Types.ObjectId,ip:string}[];
  title: string;
  tags: mongoose.Types.ObjectId[] | Itags[];
  publisher: mongoose.Types.ObjectId | Iuser;
  upvotes: number;
  description?:string;
  content: IContentResource;
  upvotesDoc: mongoose.Types.ObjectId | Iupvote;
  createdAt: Date;
  isDeleted: boolean;
  updatedAt: Date;
  isPrivate: boolean;
  _id:mongoose.Types.ObjectId
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
resourceSchema.pre(/^find/, function (this: Query<any, any>, next) {
  this.where({ isDeleted: false });
  next();
});
export type IContentResource = Array<{
  _id: Types.ObjectId;
  label: string;
  links: Types.ObjectId[] | IResourceLink[];
}>;

export const Resource = mongoose.model<IResource>("resource", resourceSchema);
