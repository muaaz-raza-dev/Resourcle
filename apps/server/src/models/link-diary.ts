 import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    links: {
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'ResourceLink',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const SaveList = mongoose.model('LinkDiary', BookmarkSchema);