import useGetUserProfileInfomartion from '@/hooks/user-profile/useGetUserInfomartion'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog"
import { ResourceCollectionsPayload } from '@/api/user-profile/get-user-profile-information.api'
import { FaBookmark, FaLink } from 'react-icons/fa'
import Link from 'next/link'
import { Badge } from '@/shadcn/components/ui/badge'  

export default function UserResourceCollectionsButton() {
    const [open, setOpen] = React.useState(false)
    const {data}  = useGetUserProfileInfomartion({hitApi:false})
    const q = data?.payload.resourceCollections
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <button className='flex gap-2  py-2 font-semibold w-max items-center justify-center whitespace-nowrap rounded-md px-3 bg-white  text-sm  ring-offset-background transition-all  border ' >
        
        <FaLink className="mr-2 h-4 w-4" />
        Resource Collection
      </button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Resource Collections </DialogTitle>
      </DialogHeader>
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
          <FaBookmark className="mr-2 h-4 w-4" />
          <h2 className='font-semibold'>{collection.name}</h2>
        </div>
        <Badge variant={"secondary"} className="text-sm text-muted-foreground">{collection.links}</Badge>
      </Link>
        </>
    )
}
  