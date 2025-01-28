import { accurateFromNow } from '@/utils/accurate-time-from-now';
import Link from 'next/link';
import React from 'react'
import { AiFillFire } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';

export default function SearchedResourceComponent({resource,Close}:{resource:{title:string;upvotes:number;updatedAt:string;createdAt:string;views:number;_id:string},Close:()=>void}) {
  return (
    <div className=" w-full flex gap-3  justify-between  items-center " >
          <div className="flex items-center gap-2 ">
            <div className="">
          <Link onClick={Close} href={`/resource/${resource._id}`} className="">
              <h2 className=" font-semibold whitespace-wrap leading-tight">{resource.title}</h2>
          </Link>


            <div className="flex gap-4 items-center  ">
          <p className="text-muted-foreground text-xs">{accurateFromNow(resource.updatedAt)}</p>                  
          
          </div>
          </div>
          </div>
                <div
                >
                <div className="flex items-center gap-2 space-x-2 ">
                    <div className="flex gap-1 py-0.5 px-2 rounded-xl text-xs  border items-center">
                   <AiFillFire fill="rgb(249 115 22)" className='!w-4 !h-4'   />  <p className=" font-semibold">{resource.upvotes} upvotes</p>
                    </div>
                    <div className="flex gap-1 py-0.5 px-2 rounded-xl text-xs text-muted-foreground  border items-center">
                   <FaEye className='text-muted-foreground !w-3 !h-3'    />  <p className=" font-semibold">{resource.views} views</p>
                    </div>
                </div>
                </div>
        </div>
  )
}
