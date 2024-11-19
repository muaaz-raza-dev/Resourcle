
import SaveBtn from '@/components/global/save-btn'
import UpvoteBtn from '@/components/global/upvote-btn'
import RequestLoader from '@/components/loader/request-loading'
import useShare from '@/hooks/global/useShare'
import useGetResource from '@/hooks/resource/useGetResource'
import { Card, CardContent } from '@/shadcn/components/ui/card'
import { Tooltip } from 'antd'
import Image from 'next/image'
import React from 'react'
import { FaEye } from 'react-icons/fa'
import { FiShare2 } from 'react-icons/fi'

export default function ResourceMeta() {
    
  const {data} = useGetResource();
  const {share,isSharing} = useShare();
  const q=  data?.payload;
  if(!q) return null
  return (
    <Card>

    <CardContent className='flex flex-col items-start w-full py-4 gap-2 bg-transparent'>
    <div className="flex justify-between gap-4 w-full">
      <div className="flex items-start gap-4 w-max  ">
        <div className="flex items-center gap-2 ">
            <Image
            src={q.publisher.photo||"/user.png"}
            alt={q.publisher.name||"Picture"}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className=''>
            <div className="flex gap-4">
            <h2 className="font-semibold">
           {q.publisher.name}
            </h2>
            </div>
            <p className="text-sm text-muted-foreground">{q.publisher.headline}</p>
          </div>
        </div>
        
      </div>
      <div className="flex  justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
            <Tooltip title="upvotes">
          <UpvoteBtn size={20} id={q._id} value={q.upvotes} isUpvoted={q.isUpvoted} />
          </Tooltip>
          <Tooltip title="views" className='flex gap-1 font-semibold text-xs items-center '>
            {q.views} <FaEye size={18} />
          </Tooltip>
          </div>
          <div className="flex gap-1 border-l pl-2">
          <Tooltip title="upvotes">
          <SaveBtn size={24} minimal id={q._id}  isSaved={q.isSaved} />
          </Tooltip>
          <Tooltip title="share">
        <button onClick={()=>share({title:q.title,text:q.description,})}>
          {isSharing ? <RequestLoader size='18' color='gray'/>:  <FiShare2  size={18} />}
        </button>
        </Tooltip>
        </div>
        </div>
      </div>
    </div>
   

        
      </CardContent>
      </Card>
  )
}
