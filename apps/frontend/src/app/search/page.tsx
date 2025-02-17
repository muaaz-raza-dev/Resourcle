"use client"
import FilterbarSearched from '@/components/searched/filterbar-searched'
import SearchedLinks from '@/components/searched/searched-links'
import SearchedResources from '@/components/searched/searched-resources'
import useInitializeSearchState from '@/components/searched/utils/UseInitializeSearchState'
import { searchedAtom } from '@/state/search-resource.atom'
import React from 'react'
import {  useRecoilValue } from 'recoil'

export default function Page() {
  useInitializeSearchState()  
  const {isLoading} = useRecoilValue(searchedAtom)

return (
  <section className='max-w-6xl  mx-auto px-4 min-h-[80vh]'>
      <FilterbarSearched/>
      <SearchedResources isLoading={isLoading}/>
      <SearchedLinks  isLoading={isLoading}/>
    </section>
  )
}

