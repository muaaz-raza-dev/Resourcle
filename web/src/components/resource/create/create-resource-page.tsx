"use client";
import { defaultResource, IResource } from "@/types/Iresource";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TitleDescriptionResournceForm from "./components/title-description-resource-form";
import BannerResourceForm from "./components/banner-resource-form";
import ToolboxSelectResourceForm from "./components/toolbox-select-resource-form";
import ContentResourceForm from "./components/content-resource-form";
import ResourceFormFooter from "./components/resource-form-footer";
import UploadImageCloudinary from "@/lib/upload-cloudinary";
import useCreateResource from "@/hooks/resource/useCreateResource";

export default function CreateResourcePage() {
  const methods = useForm<IResource>({ defaultValues: defaultResource });
  const { isLoading, mutateAsync: mutate } = useCreateResource();
  const [uplaoding,setUploading] = useState(false) 
  const onSubmit: SubmitHandler<IResource> = async (data) => {
    if (data.banner && typeof data.banner != "string") {
      setUploading(true);
      try{
        const urls = await UploadImageCloudinary([data.banner]);
        setUploading(false);
        if (urls) {
          methods.setValue("banner",urls[0])
          await mutate({ ...data, banner: urls[0] });
        } else {
          await mutate(data);
        }
      }
      catch(error){
        console.error(error)
        return;
      }
    } else {
      await mutate(data);

    }
    methods.reset();

  };

  return (
    <section className="max-w-5xl mx-auto m-4 ">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className=""
        >
          <section className="flex flex-col gap-2 mb-24">
          <BannerResourceForm />
          <TitleDescriptionResournceForm />
          <ContentResourceForm />
          <ToolboxSelectResourceForm />
          </section>
          <ResourceFormFooter isLoading={uplaoding||isLoading} />
        </form>
      </FormProvider>
    </section>
  );
}
