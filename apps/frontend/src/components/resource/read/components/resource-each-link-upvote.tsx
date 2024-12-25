import useUpvoteIndividualLink from '@/hooks/resource/useUpvoteIndividualLink'
import clsx from 'clsx'
import React, { useState } from 'react'
import { FaCaretUp } from 'react-icons/fa'

export default function ResourceEachLinkUpvote({link_id,resource_id,upvotes,isUpvoted}:{upvotes:number,resource_id:string,link_id:string,isUpvoted:boolean}) {
    const [count,setcount] = useState(upvotes||0)
    const [upvoted,setUpvoted] = useState(isUpvoted)
    const {mutateAsync,isLoading} = useUpvoteIndividualLink()
    async function handleUpvote(){
        await mutateAsync({link_id, resource_id})
        if(upvoted) setcount(count-1) 
        else  setcount(count+1)
        setUpvoted(vote=>!vote)
    }
  return (
    <div className='flex gap-2  justify-end font-semibold items-center text-xs '>
    <button onClick={handleUpvote} className={clsx(`relative aspect-square  text-xs font-semibold  h-8 hover:bg-border transition-colors  border rounded-md p-1 px-2`,isLoading&&"animate-pulse",upvoted?"!bg-secondary-foreground":"bg-white")}>
        <FaCaretUp fill={upvoted?"white":"black"}  fontSize={14}/> 
    </button>
    {count?
    <p className='text-muted-foreground text-xs'>
    {count} 
    </p>:0
    }
    </div>
  )
}
