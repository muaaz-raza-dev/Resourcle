import React from 'react'

export default function ResourceCollectionMeta() {
  return (
      <section className="flex gap-2 justify-between flex-wrap">
      <div className="flex gap-2" >
      <p className='font-semibold text-muted-foreground text-[0.7rem] border rounded-md p-1 px-2'>10 resource links </p>
      <p className='font-semibold text-muted-foreground text-[0.7rem] border rounded-md p-1 px-2'>From 15 resources</p>
      </div>
          <p className='text-xs text-muted-foreground'>Last updated At 4 months ago</p>
          </section>
  )
}
