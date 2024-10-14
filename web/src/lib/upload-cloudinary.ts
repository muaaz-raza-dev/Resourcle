import axios from "axios";
import toast from "react-hot-toast";

const Cloud_Name= process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
async function UploadImageCloudinary(images:File[]):Promise<string[]|null> {
    if(!images.length) return null
    try{
        const { data } = await axios.post('/api/cloudinary-sign');
        const { signature, timestamp } = data;
        const uploads = Array.from(images).map(image=>{
            const form = new FormData();
            form.append("file",image);
            form.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
            form.append('timestamp', timestamp);
            form.append('signature', signature);
            form.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
            form.append("cloud_name",Cloud_Name);
            return axios.post(`https://api.cloudinary.com/v1_1/${Cloud_Name}/upload`,form);
        })
        const response = await Promise.all(uploads);
        return response.map(e=>e.data.url);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch(_){
        toast.error("Error uploading image")
        return null
    }
}

export default UploadImageCloudinary