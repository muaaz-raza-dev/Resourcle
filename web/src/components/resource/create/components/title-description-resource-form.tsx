import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/shadcn/components/ui/form'
import { IResource } from '@/types/Iresource'
import React, { useRef } from 'react'
import { useFormContext } from 'react-hook-form'

export default function TitleDescriptionResournceForm() {
  const methods = useFormContext<IResource>()
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, nextInputRef:React.RefObject<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      nextInputRef.current?.focus(); 
    }
  };
  return (
    <section className='flex flex-col w-full'>
      <FormField
      control={methods.control}
      name="title"
      render={({field}) => (
        <FormItem>
          <FormLabel />
          <FormControl>
          <input {...field}
           className='text-3xl h-max resize-none border-none w-full outline-none font-bold placeholder:text-gray-400 bg-transparent '
           placeholder='Title of the resource' onKeyDown={(key)=>handleKeyDown(key,descriptionRef)} autoFocus/>
           </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />

<FormField
      control={methods.control}
      name="description"
      render={({field}) => (
        <FormItem>
          <FormLabel />
          <FormControl>
          <textarea {...field}
           className='text-xl border-none outline-none w-full resize-none font-semibold placeholder:text-gray-400 bg-transparent '
            placeholder='Description of the resource' ref={descriptionRef}/>
           </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
    </section>
  )
}
