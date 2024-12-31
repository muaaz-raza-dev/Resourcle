import mongoose, { Types } from "mongoose";
import { IResourceLink } from "./link.model.js";
import { Iuser } from "./user.model.js";

const ResourceDiarySchema = new mongoose.Schema(
  {
    name: { type: String, default: "Default" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    links: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "ResourceLink",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export interface IresourceCollection {
  createdAt: string;
  _id: Types.ObjectId;
  links: Types.ObjectId[] | IResourceLink[];
  user: Types.ObjectId | Iuser;
}

export const ResourceCollection = mongoose.model(
  "ResourceCollection",
  ResourceDiarySchema,
);
