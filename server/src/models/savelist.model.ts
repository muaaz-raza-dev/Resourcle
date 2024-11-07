import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
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

export const SaveList = mongoose.model('SaveList', BookmarkSchema);