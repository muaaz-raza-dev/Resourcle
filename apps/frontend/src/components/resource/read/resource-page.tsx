"use client";
import React from 'react'
import ResourceMeta from './components/resource-meta';
import ResourceHeader from './components/resource-header';
import useGetResource from '@/hooks/resource/useGetResource';
import ResourceLoader from './components/resource-loader';
import ResourceNotFoundPage from '@/app/resource/[id]/not-found';
import ResourceSearchbar from './components/resource-searchbar';
import ResourceLinkGroups from './components/resource-link-groups';

export default function ResourcesPage() {
  const {isLoading,error} = useGetResource({hitApi:true});
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
          </section>
          <ResourceLinkGroups/>
      </main>
    </div>
  </>
  )
}

