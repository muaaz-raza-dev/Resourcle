
import mongoose, {Schema} from "mongoose"
 const adminUserSchema = new Schema({
  name: {type: String, required: true,unique:true},
  password: {type: String, required: true},
  code:{type:Number,required:true}
});
export const Admins = mongoose.model("admins", adminUserSchema);

