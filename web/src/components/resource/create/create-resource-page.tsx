"use client";
import { defaultResource, IResource } from '@/types/Iresource';
import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import TitleDescriptionResournceForm from './components/title-description-resource-form';
import BannerResourceForm from './components/banner-resource-form';
import ToolboxSelectResourceForm from './components/toolbox-select-resource-form';
import ContentResourceForm from './components/content-resource-form';


export default function CreateResourcePage() {
    const methods = useForm<IResource>({defaultValues:defaultResource})
    const onSubmit:SubmitHandler<IResource> =(data)=> {
        console.log(data)
  }
  return (
    <section className='max-w-5xl mx-auto m-4'>
      <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-2 ">
    <BannerResourceForm/>   
    <TitleDescriptionResournceForm/>
    <ContentResourceForm/>
    <ToolboxSelectResourceForm/>
      </form>
      </FormProvider>
    </section>
  )
}
