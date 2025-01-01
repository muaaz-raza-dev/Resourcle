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
           className='text-2xl max-md:text-xl  border-none w-full outline-none  resize-none   focus:outline-none  font-bold placeholder:text-gray-400 bg-transparent text-wrap '
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
          className='text-lg max-md:text-base border-none  resize-none w-full min-h-[80px]  focus:outline-none outline-none  py-0 font-medium placeholder:text-gray-400 bg-transparent '
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
