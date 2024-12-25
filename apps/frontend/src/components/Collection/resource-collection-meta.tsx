"use client";
import useGetResouceCollectionMeta from '@/hooks/resource-collection/useGetResourceCollectionMeta'
import moment from 'moment'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function ResourceCollectionMeta() {
  const {data,isLoading} = useGetResouceCollectionMeta()
  if(isLoading) return <div className='flex gap-2 justify-between'>
  <Skeleton width={40} height={10}/>
  <Skeleton width={40} height={10}/>
  </div>
  return (
      <section className="flex gap-2 justify-between  flex-wrap">
          <p className='text-xs max-md:text-right max-md:w-full text-muted-foreground'>Last updated {moment(data?.payload.updatedAt).calendar()}</p>
      <div className="flex gap-2" >
      <p className='font-semibold text-muted-foreground bg-white text-[0.7rem] border rounded-md p-1 px-2'>{data?.payload.totalLinks} resource links </p>
      <p className='font-semibold text-muted-foreground bg-white text-[0.7rem] border rounded-md p-1 px-2'>Collected from {data?.payload.totalResource} resources</p>
      </div>
          </section>
  )
}
