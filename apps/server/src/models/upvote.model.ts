import mongoose, { ObjectId } from "mongoose";

const UpvoteSchema = new mongoose.Schema({
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resource",
    required: true,
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  content_votes: {
    type: Array<{
      link_id: { type: mongoose.Types.ObjectId; ref: "ResourceLink" };
      users: Array<{ type: mongoose.Types.ObjectId; ref: "User" }>;
    }>,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export interface Iupvote {
  _id: mongoose.Types.ObjectId;
  resource: mongoose.Types.ObjectId;
  users: mongoose.Types.ObjectId[];
  createdAt: Date;
  content_votes: { link_id: string; users: ObjectId[] }[];
}
export const Upvotes = mongoose.model<Iupvote>("Upvotes", UpvoteSchema);
