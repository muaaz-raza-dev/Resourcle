"use client"
import React from 'react'
import ResourceCollectionLinks from './resource-collection-links'
import ResourceCollectionList from './resource-collection-list'
import ResourceCollectionHeader from './resource-collection-header'
import ResourceCollectionSearchBar from './resource-collection-searchBar'

export default function ResourceCollectionPage() {
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container  py-6 md:py-8 flex flex-col gap-4 max-w-6xl">
      <ResourceCollectionList/>
      
    <ResourceCollectionHeader/>
    <ResourceCollectionSearchBar />
    <ResourceCollectionLinks/>
     
    
    </div>
    </div>
  )
}
