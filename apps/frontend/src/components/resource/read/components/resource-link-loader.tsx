import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function ResourceLinkLoader() {
  return (
    <div className='w-full flex flex-col gap-4'>
      <Skeleton height={120} />
      <Skeleton height={60} />
      <Skeleton height={80} />
    </div>
  )
}
