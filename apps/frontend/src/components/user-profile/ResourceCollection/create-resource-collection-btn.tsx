import useCreateResourceCollection from '@/hooks/resource-collection/useCreateResourceCollection'
import { Button } from '@/shadcn/components/ui/button'
import React, { ReactNode, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog"
import { Input } from '@/shadcn/components/ui/input'
import { Label } from '@/shadcn/components/ui/label'
import RequestLoader from '@/components/loader/request-loading'


export default function CreateResourceCollectionButton({children}:{children?:ReactNode}) {
  const [name,setName] = useState("")
  const [open,setOpen] = useState(false)
  const {mutate,isLoading} = useCreateResourceCollection()
  function HandleCreate(){
    if(name){
      mutate({name})
    }
    setName("")
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={(o)=>!isLoading&&setOpen(o)}>
  <DialogTrigger  asChild>
    {
      children || 
    <Button  className='w-full'>
      Create
      </Button>
    }
      </DialogTrigger>
  <DialogContent>
    
    <DialogHeader>
      <DialogTitle>
        Create Resource Collection
      </DialogTitle>
      <DialogDescription>
      Create the new resoruce collection to organize collected links in a separate slots
      </DialogDescription>
    </DialogHeader>

    <Label>Name of collection</Label>
    <Input value={name} onChange={({target:{value}})=>setName(value)} placeholder='Give a suitable name to collection'/>
  <DialogFooter>
    <Button disabled={!name||isLoading} onClick={HandleCreate}>{isLoading?<RequestLoader size='14' />:"Confirm"}</Button>
  </DialogFooter>
  </DialogContent>
</Dialog>

    
  )
}
