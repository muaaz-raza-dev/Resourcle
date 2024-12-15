"use client"
import React from 'react'
import ResourceMeta from './components/resource-meta';
import ResourceHeader from './components/resource-header';
import useGetResource from '@/hooks/resource/useGetResource';
import ResourceEachLinkGroup from './components/resource-each-link-group';
import ResourceLoader from './components/resource-loader';

export default function ResourcesPage() {
  const {data,isLoading,error} = useGetResource();
  if(isLoading) return <ResourceLoader/>
  if(error) return <>{error.status} {error?.response.data.message}</>
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col gap-2 container mx-auto px-8 py-6">
          <ResourceHeader />
          <ResourceMeta/>
        {  data?.payload.content.map(e=><ResourceEachLinkGroup key={e.label} data={e}/>)  }
      </main>
    </div>
  )
}

