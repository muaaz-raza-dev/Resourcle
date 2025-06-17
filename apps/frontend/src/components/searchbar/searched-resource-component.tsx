import { Button } from '@/shadcn/components/ui/button';
import { accurateFromNow } from '@/utils/accurate-time-from-now';
import Link from 'next/link';
import React from 'react'
import { FaEye } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';

export default function SearchedResourceComponent({resource,Close}:{resource:{title:string;updatedAt:string;createdAt:string;views:number;_id:string},Close:()=>void}) {
  return (
    <div className=" w-full flex gap-3  justify-between  items-center " >
          <div className="flex items-center gap-2 flex-wrap">
          <Link onClick={Close} href={`/resource/${resource._id}`} className="">
              <h2 className=" font-semibold text-sm whitespace-wrap text-wrap  whitespace-pre-line break-all leading-tight">{resource.title}</h2>
          <p className="text-muted-foreground text-xs">{accurateFromNow(resource.updatedAt)}</p>                  
          </Link>
          </div>
                <div >
                <div className="flex items-center gap-1   ">
                    
                    <div className="flex gap-1  p-2 rounded text-xs text-muted-foreground w-max whitespace-nowrap border items-center">
                   <FaEye className='text-muted-foreground !w-3 !h-3'    />  <p className=" font-semibold">{resource.views} views</p>
                    </div>
                    <div className="md:border-l md:px-1">
                    <Link href={`/resource/${resource._id}`} onClick={Close}>
                  <Button  className="bg-secondary-foreground hover:bg-secondary-foreground/90 transition-colors text-white flex text-sm items-center  shadow-none  gap-2  "> <p className="max-md:hidden ">Links</p> <FaArrowRight className='!w-3 !h-3' /> </Button>
                    </Link>
                      </div>
                </div>
                </div>
        </div>
  )
}
