import useGetUserProfileInfomartion from '@/hooks/user-profile/useGetUserInfomartion'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog"
import { Link, ListIcon as PlaylistIcon } from 'lucide-react'
import { ResourceCollectionsPayload } from '@/api/user-profile/get-user-profile-information.api'
import { FaLink } from 'react-icons/fa'

export default function UserResourceCollectionsButton() {
    const [open, setOpen] = React.useState(false)
    const {data}  = useGetUserProfileInfomartion({hitApi:false})
    const q = data?.payload.ResourceCollections
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <button className='flex gap-2  py-2 font-semibold w-max items-center justify-center whitespace-nowrap rounded-md px-3  text-sm  ring-offset-background transition-all bg-secondary border ' >
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
      <Link href={`/collection/${collection._id}`}
        className="flex items-center justify-between py-2 px-1 hover:bg-accent rounded-md cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center">
          <PlaylistIcon className="mr-2 h-4 w-4" />
          <span>{collection.name}</span>
        </div>
        <span className="text-sm text-muted-foreground">{collection.links}</span>
      </Link>
    )
}
  