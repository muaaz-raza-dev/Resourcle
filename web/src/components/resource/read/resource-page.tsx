"use client"

import React from 'react'
import { Card} from "@/shadcn/components/ui/card";
import ResourceMeta from './components/resource-meta';
import ResourceHeader from './components/resource-header';
import useGetResource from '@/hooks/resource/useGetResource';
import ResourceEachLinkGroup from './components/resource-each-link-group';
import ResourceLoader from './components/resource-loader';

export default function ResourcesPage() {
  const {data,isLoading} = useGetResource();
  if(isLoading) return <ResourceLoader/>

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="mb-8">
          <ResourceHeader />
           <ResourceMeta/>
        </Card>
        {  data?.payload.content.map(e=><ResourceEachLinkGroup key={e.label} data={e}/>)  }
      </main>
    </div>
  )
}
