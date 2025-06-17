import mongoose, { Types } from "mongoose";

const ResourceCollectionTags = new mongoose.Schema(
  {
    name: { type: String, default: "Default" },
    collection:{type :Types.ObjectId,ref:"ResourceCollection"},
    totalLinks:{type:Number,default:0},
    links:{types:[Types.ObjectId],ref:"ResourceLink"}
  },
  { timestamps: true },
);

 
export const CollectionTags = mongoose.model(
  "CollectionTags",
  ResourceCollectionTags,
);
