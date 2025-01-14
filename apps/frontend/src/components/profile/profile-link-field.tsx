import { Input } from '@/shadcn/components/ui/input'
import { IuserProfile } from '@/types/IuserProfile'
import { Label } from '@radix-ui/react-label'
import React, { useCallback } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FaPlus, FaTrash } from 'react-icons/fa'

export default function ProfileLinkField() {
    const form = useFormContext<IuserProfile>()
    const links = form.watch("links")
    function AddLinkHandler() {
        form.setValue("links",form.getValues("links")?.concat({url:"",label:""}))
    }
  return (
    <div className="border-t py-4">
    <Label className="!font-bold text-2xl ">Handles</Label>
    <p className='text-sm text-muted-foreground pb-4 leading-tight'>Add an additional link to showcase more about yourself, such as a personal website, portfolio, or social media profile.</p>
    {
        links?.map((l,i)=><EachLinkInput key={`${i} link`} index={i}/>)
    }
    <button className='text-primary font-semibold flex items-center gap-1 text-sm' onClick={AddLinkHandler}>
        Add Link <FaPlus size={12}/>
    </button>
    
    </div>
  )
}


const EachLinkInput = React.memo(
    function EachLinkInput({ index }: { index: number }) {
    const {control,setValue,getValues,formState,} = useFormContext<IuserProfile>()
    const removeLink = useCallback(() => {
        setValue("links", getValues("links")?.filter((_, i) => i !== index));
        
      }, [index, setValue, getValues]);
    return (
      
    <div  className="mb-4 flex items-center  w-full gap-3">
      <div className="flex-1">
        <Label htmlFor={`link-name-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
          Label
        </Label>
        <Controller
          name={`links.${index}.label`}
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <Input
              {...field}
              id={`link-name-${index}`}
              placeholder="e.g : twitter"
              className="w-full"
            />
          )}
        />
        {formState.errors.links && formState.errors.links[index]?.label && (
          <p className="text-xs text-red-600">{formState.errors.links[index]?.label?.message}</p>
        )}
      </div>
      <div className="flex-1">
        <Label htmlFor={`link-url-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
          URL
        </Label>
        <Controller
          name={`links.${index}.url`}

          control={control}
          rules={{ required: "Url is required" }}
          render={({ field }) => (
            <div className='flex items-center gap-5'>
            <Input
              {...field}
              id={`link-url-${index}`}
              placeholder="https://twitter.com/@elonmusk"
              className="w-full"
            />
            <button
            type="button"
            onClick={removeLink}
            className="text-destructive center "
          >
            <FaTrash/>
          </button>
            </div>
          )}
        />
        {formState.errors.links && formState.errors.links[index]?.url && (
          <p className="text-xs text-red-600">{formState.errors.links[index]?.url?.message}</p>
        )}


      </div>
        </div>
          
)
})