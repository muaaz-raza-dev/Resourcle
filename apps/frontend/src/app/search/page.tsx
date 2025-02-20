"use client"
import FilterbarSearched from '@/components/searched/filterbar-searched'
import SearchedLinks from '@/components/searched/searched-links'
import SearchedResources from '@/components/searched/searched-resources'
import useInitializeSearchState from '@/components/searched/utils/UseInitializeSearchState'
import React from 'react'

export default function Page() {
  useInitializeSearchState()  
  

return (
  <section className='max-w-6xl  mx-auto px-4 min-h-[80vh]'>
      <FilterbarSearched/>
      <SearchedResources />
      <SearchedLinks  />
    </section>
  )
}

