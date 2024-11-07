import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export default function SkeletonResources() {
  return (
    <section className='w-full'>
    <Skeleton height={90}  />
    <Skeleton height={90}  />
    <Skeleton height={90}  />
    </section>
  )
}
