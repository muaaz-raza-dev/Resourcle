import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/shadcn/components/ui/form'
import { IResource } from '@/types/Iresource'
import React, { useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'

export default function TitleDescriptionResournceForm() {
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const methods = useFormContext<IResource>()

  useEffect(() => {
    const textarea = descriptionRef.current;

    if (!textarea) return;
    const handleDescriptionTextAreaInput = () => {
      // Reset height to auto to shrink before expanding
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea?.scrollHeight}px`; // Dynamically adjust height
    };
      textarea.addEventListener('input', handleDescriptionTextAreaInput);
    return () => {
      if(textarea) textarea.removeEventListener('input', handleDescriptionTextAreaInput);
    };
  }, []);
  return (
    <section className='flex flex-col w-full'>
      <FormField
      control={methods.control}
      name="title"
      rules={{required:"*Title is required"}}
      render={({field}) => (
        <FormItem>
          <FormLabel />
          <FormControl>
          <input {...field}
           className='text-lg  p-2 rounded-md  w-full border focus:border-black/30  resize-none   focus:outline-none  font-semibold placeholder:text-gray-400 bg-transparent text-wrap '
           placeholder='Title of the resource'  autoFocus/>
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
          <FormControl className='h-max'>
          <textarea {...field}
          className='text-base border  p-2  rounded-md   resize-none w-full min-h-[40px] focus:border-black/30  focus:outline-none outline-none   font-medium placeholder:text-gray-400 bg-transparent '
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
