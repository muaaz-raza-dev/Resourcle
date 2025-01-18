import useUpvoteIndividualLink from '@/hooks/resource/useUpvoteIndividualLink'
import { Separator } from '@/shadcn/components/ui/separator'
import useProtectAuthorisedEvents from '@/utils/authorised-event-protector'
import { Tooltip } from 'antd'
import clsx from 'clsx'
import React, { useState } from 'react'
import { BiSolidUpvote, BiUpvote } from "react-icons/bi";

export default function ResourceEachLinkUpvote({link_id,resource_id,upvotes,isUpvoted}:{upvotes:number,resource_id:string,link_id:string,isUpvoted:boolean}) {
    const [count,setcount] = useState(upvotes||0)
    const [upvoted,setUpvoted] = useState(isUpvoted)
    const authorize = useProtectAuthorisedEvents()
    const {mutateAsync,isLoading} = useUpvoteIndividualLink()
    async function handleUpvote(){
      

        await mutateAsync({link_id, resource_id})
        if(upvoted) setcount(count-1) 
        else  setcount(count+1)
        setUpvoted(vote=>!vote)
    }
    function Proceed(){
      authorize(handleUpvote)
    }
  return (
    <div className='flex gap-2  justify-end font-semibold items-center text-xs '>
      <Tooltip title="upvote"  className={clsx(`relative aspect-square  text-xs font-semibold items-center h-8    transition-colors  border rounded-md flex  `,isLoading&&"animate-pulse",isUpvoted?"gap-0":"")}>
    <button onClick={Proceed} className={"rounded-l-md h-full px-2 hover:bg-border bg-secondary-foreground"}>
      {
        upvoted ?
        <BiSolidUpvote fill={"black"} fontSize={14}/> :
        <BiUpvote fontSize={14} />

      }
    </button>
      <Separator className={'h-[80%] w-[1px] '}/>
    <p className={clsx('text-muted-foreground !text-xs px-3  ')}>
    {count||0} 
    </p>
      </Tooltip>
    </div>
  )
}
