import useGetResource from '@/hooks/resource/useGetResource'
import { CardFooter } from '@/shadcn/components/ui/card'
import { Tooltip } from 'antd'
import Image from 'next/image'
import React from 'react'
import { FaFire } from 'react-icons/fa'

export default function ResourceMeta() {
    
  const {data} = useGetResource();

  return (
    <CardFooter className='flex justify-between'>
    <div className="flex gap-4">
      <div className="flex items-start gap-4 w-max  ">
        <div className="flex items-center gap-2 ">
            <Image
            src={data?.payload.publisher.photo||"/user.png"}
            alt={data?.payload.publisher.name||"Picture"}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className=''>
            <div className="flex gap-4">
            <h2 className="font-semibold">
           {data?.payload.publisher.name}
            </h2>
            <button className='text-sm text-primary '> Follow</button>
            </div>
            <p className="text-sm text-muted-foreground">1080 followers</p>
          </div>
        </div>
        
      </div>
      <div className="flex gap-4 justify-between items-center">
          <div className="flex items-center space-x-4">
            <Tooltip title="upvotes">
          <button  className="flex items-center gap-2 px-2 rounded">
            <FaFire   className="h-4 w-4 text-orange-500" />
            <b>24</b>
          </button>
          </Tooltip>
        </div>
      </div>
    </div>
   

        <div className="flex gap-2">
          {
              data?.payload.tags.map(e=><p className='border rounded-md p-1 px-2 hover:bg-muted text-sm' key={e._id}>#{e.name}</p>)
          }
        </div>
      </CardFooter>
  )
}
