"use client"
import FilterbarSearched from '@/components/searched/filterbar-searched'
import SearchedResources from '@/components/searched/searched-resources'
import useSearchResource from '@/hooks/resource/useSearchResource'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Page() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const {mutate,isLoading} = useSearchResource()
  useEffect(() => {
  if(search) mutate(undefined)
  }, [])
return (
  <section className='max-w-4xl px-4 mx-auto'>
      <FilterbarSearched/>
      <SearchedResources isLoading={isLoading}/>
    </section>
  )
}
