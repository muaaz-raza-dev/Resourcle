"use client"
import { Separator } from '@/shadcn/components/ui/separator'
import React from 'react'
import ResourceCollectionSearchBar from './resource-collection-searchBar'
import ResourceCollectionMeta from './resource-collection-meta'
import useGetResouceCollectionMeta from '@/hooks/resource-collection/useGetResourceCollectionMeta'
import ResourceLoader from '../landing page/loader/resource-loader'
import ResourceCollectionLinks from './resource-collection-links'
import ResourceCollectionList from './resource-collection-list'

export default function ResourceCollectionPage() {
  const {data,isLoading} = useGetResouceCollectionMeta()
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6 md:py-8 flex flex-col gap-4 max-w-6xl">
      <ResourceCollectionList/>
      {isLoading ?
       <ResourceLoader/>
      :
      <>
      <header className=" text-center py-4">
          <h1  className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{data?.payload.name}</h1>
          <p className="text-sm text-muted-foreground font-medium tracking-tight mb-2">Resource Collection</p>
          <p className="text-muted-foreground max-md:text-sm max-w-2xl mx-auto">
          A curated collection of your most valuable links, all in one place
          </p>
          <Separator className='my-2 w-[20%] max-md:w-[40%] mx-auto' />
        </header>
    <ResourceCollectionSearchBar />
    <ResourceCollectionMeta/>
    <ResourceCollectionLinks/>
      </>
      }
    
    </div>
    </div>
  )
}
