import { IResource } from '@/types/Iresource';
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form';
import { HiOutlineSwitchVertical } from "react-icons/hi";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/shadcn/components/ui/dialog"
import { Label } from '@/shadcn/components/ui/label';
import { Select } from 'antd';
import toast from 'react-hot-toast';
  
export default function SwitchLinkGroupResourceForm({currentGroupIndex,linkIndex}:{currentGroupIndex:number;linkIndex:number}) {
    const [group,setGroup] = useState(currentGroupIndex)       ;
    const form = useFormContext<IResource>();
    const groups = form.watch("content").map((e,i)=>({label:e.label||i+1,value:i}))
    const handleSwitchLinkGroup = () => {
    const link  = form.watch(`content.${currentGroupIndex}.links.${linkIndex}`)
     if(group!=currentGroupIndex){
        form.setValue(
        "content",
        form.getValues("content").map((e,i)=>{
            if(i==currentGroupIndex) {
                //remove from prev group
                return {...e,links:e.links.filter((_,lIndex)=>lIndex!=linkIndex)} 
            }
            else if(i==group){
                //remove added to new one prev group
                return {...e,links:e.links.concat(link)}
            }
            else {
                return e;
            }
        })
      );
      toast.success("Link moved to the selected group")
     }
     else{
         toast.error("You can't switch to the same group")
     }
    }
  return (
<Dialog>
  <DialogTrigger>  <button type="button" className="flex py-1  items-center hover:bg-border gap-2 font-semibold  border px-4  bg-secondary text-desctructive  transition-colors rounded-md p-2" >
        Change Link Group <HiOutlineSwitchVertical />
    </button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Drop this link to other group</DialogTitle>
      <DialogDescription>
        Select one of those groups where it fits more accurately .
      </DialogDescription>
    </DialogHeader>
    <section className='flex flex-col gap-2'>

    <Label>
        Select Group
    </Label>
        <Select options={groups} 
        value={group}
        onChange={(value)=>setGroup(value)}
        className="col-span-3"
        placeholder="Select a group"
        showSearch
        optionFilterProp="children"
        />    
        </section>
  <DialogFooter>
    <button disabled={currentGroupIndex==group} onClick={handleSwitchLinkGroup} className="w-full text-white font-semibold bg-secondary-foreground  transition-colors hover:bg-secondary-foreground/90 rounded-md p-2" >
      Switch
    </button>
    
  </DialogFooter>
  </DialogContent>
</Dialog>

  
  )
}
