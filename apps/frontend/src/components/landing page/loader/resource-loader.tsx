import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
export default function ResourceLoader() {
  return (
    <div className="flex flex-col gap-4 justify-between max-w-5xl mx-auto m-4">
      <Skeleton  height={90} />
      <Skeleton  height={90} />
      <Skeleton  height={90} />
    </div>
  )
}

export function CollectionLoader() {
  return (
    <div className="flex flex-col flex-wrap gap-4  w-full ">
      <div className="center flex-col">
      <Skeleton  width={120} height={40} />
      <Skeleton  width={200} height={20} />
      </div>
      <Skeleton   count={6}/>
    </div>
  )
}