import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export interface Itags {
    _id:string;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export const Tags = mongoose.model<Itags>('Tags', categorySchema);
