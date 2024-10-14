import { IResource } from '@/types/Iresource';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function ContentResourceForm() {
    const form = useFormContext<IResource>()
    function DeleteLinkGroup(key:React.KeyboardEvent<HTMLInputElement>,index:number){
        if(key.key == "Backspace"){
            const toBeDelelted= form.getValues("content").find((_,i)=>i==index)
            if(toBeDelelted?.label == ""&&toBeDelelted?.links.length==0){
                form.setValue("content",form.getValues("content").filter((_,i)=>i!=index))
            }
        }
    }
    return (
        <section>
                {
                    form.watch("content").map((con,index)=>
            <div className='w-full flex justify-center bg-accent-foreground text-white rounded-md p-2' key={con.label}>
        <input className='text-xl h-max resize-none border-none w-full outline-none font-bold placeholder:text-gray-400 bg-transparent '
           placeholder='Youtube videos links' onKeyDown={(e)=>DeleteLinkGroup(e,index)} autoFocus/>
            </div>
        )
    }
    </section>
  )
}
