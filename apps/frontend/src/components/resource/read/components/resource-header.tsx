/* eslint-disable react/no-unescaped-entities */
            
import useGetResource from '@/hooks/resource/useGetResource';
import { Separator } from '@/shadcn/components/ui/separator';
import Image from 'next/image'
import React, { useMemo } from 'react'

export default function ResourceHeader() {
  const {data} = useGetResource();
  const totalResources = useMemo(()=>data?.payload.content.reduce((acc,elm)=>acc+elm.links.length,0),[data?.payload.content])
  return (
    <header>
      {data?.payload.banner&&
      <Image
      src={"/banner.png"}
      alt="Resource Library Banner"
      width={800}
      height={200}
      className="w-full h-40 object-cover rounded-t-lg"
      />
    }
    <h1 className="text-5xl font-black text-center" >
      {data?.payload.title}
   </h1>
    <p className="text-muted-foreground text-center pt-2">
    {data?.payload.description}
    </p>
    <Separator className='my-2 w-[40%] mx-auto' />

    <div className="flex gap-2 justify-between flex-wrap">
      <div className="flex gap-2" >
      <p className='font-semibold text-muted-foreground text-[0.7rem] border rounded-md p-1 px-2'>{data?.payload.content.length} resource bundles</p>
      <p className='font-semibold text-muted-foreground text-[0.7rem] border rounded-md p-1 px-2'>{totalResources} resources</p>
      </div>
          {
            data?.payload.tags.map(e=><div  className='border rounded-md transition-transform p-1 px-2 hover:bg-muted text-xs font-semibold !bg-white text-primary ' key={e._id}># {e.name}</div>)
          }
          </div>

  </header>
  )
}
