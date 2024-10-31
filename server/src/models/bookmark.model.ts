import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    resource: {
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'Resource',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Bookmark = mongoose.model('Bookmark', BookmarkSchema);