import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function ResourceLoader() {
  return (
    <div className=" flex flex-col gap-4">
      <Skeleton className='w-full h-48 rounded-md'/>
      <Skeleton className='w-full h-20 rounded-md'/>
      <Skeleton className='w-full h-10 rounded-md'/>
      <ResourceLinkLoader/>
  </div>
)
}



export  function ResourceMetaLoader() {
  return (
    <div className=" flex flex-col gap-4">
      <Skeleton className='w-full h-48 rounded-md'/>
      <Skeleton className='w-full h-20 rounded-md'/>
      <Skeleton className='w-full h-10 rounded-md'/>
  </div>
)
}

export  function ResourceLinkLoader() {
  return (
    <div className='w-full flex flex-col gap-4'>
      <Skeleton height={120} />
      <Skeleton height={60} />
      <Skeleton height={80} />
    </div>
  )
}
