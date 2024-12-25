import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog"
import { ResourceCollectionsPayload } from '@/api/user-profile/get-user-profile-information.api'
import Link from 'next/link'
import { Badge } from '@/shadcn/components/ui/badge'  

export default function UserResourceCollectionsButton() {
  const  {data,isLoading} = useGetProfileCollection()
    const [open, setOpen] = React.useState(false)
    const q = data?.payload
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger disabled={isLoading} asChild>
      <button disabled={isLoading} className='flex gap-2  py-2 font-semibold w-max items-center justify-center whitespace-nowrap rounded-md px-3   text-sm  ring-offset-background transition-all  bg-secondary ' >
        <BsCollectionFill   className="h-4 w-4" />
        {isLoading?  <RequestLoader size='14'/>  :
        <p className='max-sm:hidden'>
         Resource collections
        </p>
      }
      </button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Resource Collections </DialogTitle>
      </DialogHeader>
      <LinkLimitIndicator  totalCollections={q?.length||0} />
      {q?.length === 0 ||!q && ( 
        <div>
          <p className="text-center font-semibold">No collections found </p> 
          <p className='text-sm text-muted-foreground text-center'>Automatically create one by save any individual link</p>
      </div>
          )
          }
        {q?.map((collection) => (
          <CollectionItem
            key={collection._id}
            collection={collection}
            onClick={() => setOpen(false)}
          />
        ))}
        
        <CreateResourceCollectionButton/>
    </DialogContent>
  </Dialog>
  )
}


function CollectionItem({ collection, onClick }: { collection: ResourceCollectionsPayload; onClick: () => void }) {
    return (
      <>
      <Link href={`/collection/${collection._id}`} className="flex items-center justify-between py-2 hover:bg-secondary transition-colors rounded-md cursor-pointer border p-2 "
        onClick={onClick} >
        <div className="flex items-center">
          <BsCollectionFill className="mr-2 h-4 w-4"/>
          <h2 className='font-semibold'>{collection.name}</h2>
        </div>
        <Badge variant={"secondary"} className="text-sm text-muted-foreground">{collection.links}</Badge>
      </Link>
        </>
    )
}

import { Progress } from "@/shadcn/components/ui/progress"
import CreateResourceCollectionButton from './create-resource-collection-btn'
import { BsCollectionFill } from 'react-icons/bs'
import useGetProfileCollection from '@/hooks/resource-collection/useGetProfileCollection'
import RequestLoader from '@/components/loader/request-loading'

interface LinkLimitIndicatorProps {
  totalCollections: number
  maxCollection?: number
}
const CollectionLimit = process.env.NEXT_PUBLIC_Collection_limit || 0
export  function LinkLimitIndicator({ totalCollections, maxCollection=+CollectionLimit }: LinkLimitIndicatorProps) {
  const progressPercentage = (totalCollections / maxCollection) * 100
  const remainingCollection = Math.max(0,maxCollection-totalCollections)
  return (
    
    <div className="w-full  mx-auto ">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-muted-foreground">Collection Limit</span>
        <span className="text-xs text-muted-foreground">{remainingCollection} remaining</span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
      <p className="mt-2 text-xs text-gray-500 text-center">
        {totalCollections} of {maxCollection} links used
      </p>
    </div>
  )
}

