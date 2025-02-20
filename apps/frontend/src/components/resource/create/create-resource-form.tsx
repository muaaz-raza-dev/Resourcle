"use client";
import { defaultResource, IResource } from "@/types/Iresource";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ResourceFormFooter from "./components/resource-form-footer";
import UploadImageCloudinary from "@/lib/upload-cloudinary";
import useCreateResource from "@/hooks/resource/useCreateResource";
import useEditResource, { useFetchEditableResource } from "@/hooks/resource/useEditResource";
import ResourceLoader from "@/components/landing page/loader/resource-loader";
import NotFoundRenderer from "@/components/global/not-found-renderer";
import toast from "react-hot-toast";
import CreateResourceFormComponents from "./create-resource-form-components";


export default function CreateResourceForm({edit}:{edit?:boolean}) {
  const methods = useForm<IResource>({ defaultValues: defaultResource });
  const {isLoading:isFetching,isError,isSuccess} = useFetchEditableResource(edit||false,methods.reset)
  const { isLoading, mutateAsync: mutate } = useCreateResource();
  const {isLoading:isUpdating,mutateAsync:update} = useEditResource();
  const [uplaoding,setUploading] = useState(false) 
  async function Mutate(data:IResource){
    if(!edit){
      return await mutate(data)
    }
    else{
      return await update({payload:data})
    }
  }
  const onSubmit: SubmitHandler<IResource> = async (data) => {
    const isValid = data.content.length && data.content.every((content) => content.links.length);
    if(!isValid){ 
      toast.error("Atleast one link is required");
      return;
    }
    if (data.banner && typeof data.banner != "string") {
      setUploading(true);
      try{
        const urls = await UploadImageCloudinary([data.banner]);
        setUploading(false);
        if (urls) {
          methods.setValue("banner",urls[0])
          await Mutate({ ...data, banner: urls[0] });
        } else {
          await Mutate(data);
        }
      }
      catch(error){
        console.error(error)
        return;
      }
    } else {
      await Mutate(data);

    }
    if(!edit){
      methods.reset();
    }
  };
  if(edit && isFetching) return <ResourceLoader/>
  return (
    <NotFoundRenderer isLoading={edit?isFetching:false} isError={edit?isError:false}>
    <section className="max-w-5xl mx-auto m-4 p-4 relative">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CreateResourceFormComponents edit={edit}/>
          <ResourceFormFooter isSuccess={isSuccess} edit={edit} isLoading={uplaoding||isLoading||isUpdating} />
        </form>
      </FormProvider>
    </section>
    </NotFoundRenderer>
  );
}
