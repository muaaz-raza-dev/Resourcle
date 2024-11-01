import FilterbarSearched from '@/components/searched/filterbar-searched'
import SearchedResources from '@/components/searched/searched-resources'

import React from 'react'

export default function Page() {
  return (
    <section className='max-w-4xl mx-auto'>
      <FilterbarSearched/>
      <SearchedResources/>
    </section>
  )
}
