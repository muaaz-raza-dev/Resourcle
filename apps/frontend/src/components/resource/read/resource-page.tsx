"use client";
import React from 'react'
import ResourceMeta from './components/resource-meta';
import ResourceHeader from './components/resource-header';
import useGetResource from '@/hooks/resource/useGetResource';
import ResourceLoader from './components/resource-loader';
import ResourceNotFoundPage from '@/app/resource/[id]/not-found';
import ResourceSearchbar from './components/resource-searchbar';
import ResourceLinkGroups from './components/resource-link-groups';
import moment from 'moment';

export default function ResourcesPage() {
  const {data,isLoading,error} = useGetResource({hitApi:true});
  if(isLoading) return <ResourceLoader/>
  if(error) return <ResourceNotFoundPage/>
  return (
  <>
     
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col gap-2 container mx-auto md:px-8 max-md:px-2 py-6">
          <ResourceHeader />
          <ResourceMeta/>
          <section className='mt-4'>
          <ResourceSearchbar/>
      
          <div className="flex gap-2 items-center text-muted-foreground text-xs my-2">
                      <p className="border-r pr-2">Last updated at </p>
                      <p className="">{moment(data?.payload.updatedAt).format("hh:mma  DD-MM-Y ")}</p>
      </div>
          </section>
          <ResourceLinkGroups/>
      </main>
    </div>
  </>
  )
}

