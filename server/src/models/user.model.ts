
import  mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,  // Ensure email is unique across all users
      lowercase: true,
      trim: true,
    },
    email_verified:{
      type: Boolean,
      default: false,  // User has not verified their email yet
    },
    picture: {
      type: String,
      default: '',  // Profile image (optional)
    },
    provider: {
      type: String,
      enum: ['local', 'google', 'hybrid'],  // Add more as needed
      default: 'local',
    },
    user_provider_id: {
      type: String,  // OAuth provider's unique user ID
    },
    password: {
      type: String,  // Store hashed passwords for local authentication
    },
    headline:String,
    links:{type:[{label:String,url:String}]},
    isDeleted:{type:Boolean,default:false},
    about:String,
    username:{unique:true,type:String},
    interest:{type:mongoose.Types.ObjectId,ref:"Tags"},
    reset_token:String,
    reset_token_expiration:Date,
    reset_verification:{type:Boolean,default:false}, // For password reset verification
    change_email_token:String
  },{timestamps:true});

  export interface Iuser {
    _id:string
    name: string;
    email: string;
    email_verified: boolean;
    picture: string;
    provider: 'local' | 'google' | 'hybrid';
    user_provider_id?: string;
    password?: string;
    headline?: string;
    isDeleted:boolean;
    links?: Array<{
      label: string;
      url: string;
    }>;
    about?: string;
    createdAt: Date;
    updatedAt: Date;
    reset_token_expiration?:Date;
    reset_token?:string
    reset_verification?:boolean;
    change_email_token?:string
  }
export const User = mongoose.model<Iuser>('User', userSchema);

