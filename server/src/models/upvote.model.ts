import mongoose from 'mongoose';

const UpvoteSchema = new mongoose.Schema({
    resource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource',
        required: true
    },
    users: {
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Bookmark = mongoose.model('Upvotes', UpvoteSchema);
