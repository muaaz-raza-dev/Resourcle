import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/components/ui/avatar";
import { useFormContext } from "react-hook-form";
import { IuserProfile } from "@/types/IuserProfile";
import { Button } from "@/shadcn/components/ui/button";
import { useDropzone } from "react-dropzone";
import UploadImageCloudinary from "@/lib/upload-cloudinary";
import RequestLoader from "../loader/request-loading";
import useUpdateProfileInfo from "@/hooks/profile/useUpdateProfileInfo";
export default function ProfilePhoto() {
  const methods = useFormContext<IuserProfile>();
  const picture = methods.watch("picture");
  const [sample, setsample] = useState(picture);
  const [isLoading, setIsLoading] = useState(false);
  const {mutate,isLoading:isUpdating} = useUpdateProfileInfo(methods.reset)
  const [file,setFile] = useState<null|File>(null)
  useEffect(() => {
    setsample(picture);
  }, [picture]);
  const { getRootProps, getInputProps } = useDropzone({
    maxSize: 1024 ** 3 * 5,
    multiple: false,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    onDrop(acceptedFiles) {
      if (acceptedFiles.length) {
        const sample = URL.createObjectURL(acceptedFiles[0]);
        setFile(acceptedFiles[0]);
        setsample(sample);
      }
    },
 });

 async function HandleUpload(){
    if(file){
    setIsLoading(true)
    const url  = await UploadImageCloudinary([file])
    if(url){
        mutate({...methods.getValues(),picture:url[0]})
        methods.setValue("picture",url[0]) 
    }
    setIsLoading(false)
    setFile(null);
 }
}

  return (
    <div className="flex items-center space-x-4">
        <button type="button" {...getRootProps()}>
      <Avatar className="w-24 h-24" >
        <AvatarImage src={sample || "/logo.png"} alt="Profile picture" />
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
        </button>
      <div>
        <Button disabled={file===null} type="button" onClick={HandleUpload}>
           {isLoading || isUpdating ?  <RequestLoader size="18"/> : "Upload"}
       </Button>
        <input
          {...getInputProps()}
          id="avatar-upload"
          type="file"
          hidden
        />
        <p className="text-sm text-gray-500 mt-2">
          Recommended size: 400x400px
        </p>
      </div>
    </div>
  );
}
