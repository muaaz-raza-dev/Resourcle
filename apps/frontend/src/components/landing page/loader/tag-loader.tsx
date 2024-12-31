import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function TagsFeedLoader() {
  return (
    <section className='flex gap-4 max-md:flex-col'>
      <Skeleton width={300} height={50}/>
      <Skeleton width={200} height={50}/>
      <Skeleton width={300} height={50}/>
    </section>
  )
}
