import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export default function UserProfileResourceLoader() {
  return (
   <div className="flex flex-col gap-4 justify-between max-w-5xl mx-auto m-4">
      <Skeleton  height={90} />
      <Skeleton  height={90} />
      <Skeleton  height={90} />
    </div>
  )
}
