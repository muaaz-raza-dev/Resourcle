import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description:String,
    tags: {
        type: [mongoose.Types.ObjectId],
        ref:"Tags"
    },
    publisher:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
    upvotes:{
        type: Number,
        default: 0
    },
    banner:String,
    content:[
        {
            label:String,
            links:[{
                title:String,
                url:String,
                description:String,
                isPaid:Boolean,
                consumption_time:String,
                level_infomation:String,
                stars:Number
            }]
        }
    ]
}, { timestamps: true });


export interface IResource extends mongoose.Document {
    title: string;
    tags: mongoose.Types.ObjectId;
    publisher: string;
    upvotes: number;
    content: Array<{
        Heading: string;
        Link: {
            title: string;
            url: string;
            description: string;
            isPaid: boolean;
            consumption_time: string;
            skill_level: string;
            stars: number;
        };
    }>;
    createdAt: Date;
    updatedAt: Date;
}
export const Resource = mongoose.model<IResource>('resource', resourceSchema);
