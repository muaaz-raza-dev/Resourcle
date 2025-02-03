import useGetResouceCollectionMeta from '@/hooks/resource-collection/useGetResourceCollectionMeta'
import moment from 'moment'
import React from 'react'
import { CollectionLoader } from '../landing page/loader/resource-loader';
import { FaPlus } from 'react-icons/fa';
import { Button } from '@/shadcn/components/ui/button';
import CustomLinkFormDialog from './custom-link-form-dialog';

export default function ResourceCollectionHeader() {
  const {data,isLoading} = useGetResouceCollectionMeta()
  if(isLoading) return  <CollectionLoader/>
  
  return (
    <header className=" flex justify-between py-2">
      <section className='flex flex-col gap-2'>
    <h1  className="text-4xl md:text-5xl font-bold tracking-tight ">{data?.payload.name}</h1>
     <p className='text-sm max-md:text-right max-md:w-full text-muted-foreground'>Last updated at {moment(data?.payload.updatedAt).calendar()}</p>
     <p className='font-semibold text-muted-foreground bg-white text-[0.7rem] border w-max rounded-md p-1 px-2'>{data?.payload.totalLinks} links </p>
      </section>
      <section className='flex flex-col gap-2'>
        <CustomLinkFormDialog>
      <Button className='flex gap-2 items-center text-secondary-foreground border shadow-none bg-secondary border-primary'> <FaPlus/> Add custom link </Button>
        </CustomLinkFormDialog>
      </section>
  </header>
  )
}
