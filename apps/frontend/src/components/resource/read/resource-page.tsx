"use client"
import React from 'react'
import ResourceMeta from './components/resource-meta';
import ResourceHeader from './components/resource-header';
import useGetResource from '@/hooks/resource/useGetResource';
import ResourceEachLinkGroup from './components/resource-each-link-group';
import ResourceLoader from './components/resource-loader';
import ResourceNotFoundPage from '@/app/resource/[id]/not-found';
import ResourceSearchbar from './components/resource-searchbar';
import { useRecoilValue } from 'recoil';
import { ResourceSearchBarAtom } from '@/state/resource-link-searchbar.atom';

export default function ResourcesPage() {
  const {isLoading,error} = useGetResource({hitApi:true});
  const {filtered} = useRecoilValue(ResourceSearchBarAtom)
  if(isLoading) return <ResourceLoader/>
  if(error) return <ResourceNotFoundPage/>
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col gap-2 container mx-auto md:px-8 max-md:px-2 py-6">
          <ResourceHeader />
          <ResourceMeta/>
          <section className='mt-4'>
          <ResourceSearchbar/>
          </section>
        {  filtered.map(e=><ResourceEachLinkGroup key={e.label} data={e}/>)  }
        {filtered.length === 0 && <p className="text-center text-gray-700 font-semibold">No resources found</p>}
      </main>
    </div>
  )
}

