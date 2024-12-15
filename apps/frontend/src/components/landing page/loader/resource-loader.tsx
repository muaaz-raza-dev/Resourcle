import React from 'react'
import Skeleton from 'react-loading-skeleton';
export default function ResourceLoader() {
  return (
    <div className="flex justify-between w-full">
      <Skeleton className='w-[32%]' height={40} />
      <Skeleton className='w-[32%]' height={40} />
      <Skeleton className='w-[32%]' height={40} />
    </div>
  )
}