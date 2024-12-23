"use client"
import { Separator } from '@/shadcn/components/ui/separator'
import React from 'react'
import ResourceCollectionSearchBar from './resource-collection-searchBar'
import ResoureCollectionResourceCard from './resoure-collection-resource-card'
import ResourceCollectionMeta from './resource-collection-meta'
import useGetResouceCollectionMeta from '@/hooks/resource-collection/useGetResourceCollectionMeta'
import ResourceLoader from '../landing page/loader/resource-loader'

export default function ResourceCollectionPage() {
  const {data,isLoading} = useGetResouceCollectionMeta()
  if(isLoading) return <ResourceLoader/>
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6 md:py-8 flex flex-col gap-4 max-w-6xl">
      <header className=" text-center py-4">
          <h1  className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{data?.payload.name}</h1>
          <p className="text-sm text-muted-foreground font-medium tracking-tight mb-2">Resource Collection</p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
          A curated collection of your most valuable links, all in one place
          </p>
          <Separator className='my-2 w-[20%] mx-auto' />
        </header>
    <ResourceCollectionMeta/>
    <ResourceCollectionSearchBar />
    <section className='flex flex-wrap gap-4  mx-auto w-full h-max'>
        <ResoureCollectionResourceCard/>
        <ResoureCollectionResourceCard/>
        <ResoureCollectionResourceCard/>
        <ResoureCollectionResourceCard/>
    </section>
    </div>
    </div>
  )
}
