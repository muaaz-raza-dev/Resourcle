"use client"
import FilterbarSearched from '@/components/searched/filterbar-searched'
import SearchedResources from '@/components/searched/searched-resources'
import useSearchResource from '@/hooks/resource/useSearchResource'
import { searchedResourcesAtom } from '@/state/search-resource.atom'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

export default function Page() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const {mutate} = useSearchResource()
  const {isLoading} = useRecoilValue(searchedResourcesAtom)
  useEffect(() => {
  if(!isLoading&&search) mutate(undefined)
  }, [])
return (
  <section className='max-w-4xl px-4 mx-auto'>
      <FilterbarSearched/>
      <SearchedResources isLoading={isLoading}/>
    </section>
  )
}
