import mongoose, { Query, Types } from "mongoose";


const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: false,
      text: true,
    },
    views: { ref: "User", type: [mongoose.Types.ObjectId] },
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


export const Resource = mongoose.model("resource", resourceSchema);
