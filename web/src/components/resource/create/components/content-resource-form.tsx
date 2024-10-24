import { IResource } from '@/types/Iresource';
import React, { useMemo, useState,useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import LinkGroupResourceForm from './Link-Group/link-group-resource-form';

export default function ContentResourceForm() {
    const form = useFormContext<IResource>()

  const [contentLength, setContentLength] = useState(form.getValues("content").length);

  // Effect to update the length of the content array
  useEffect(() => {
      const handleContentLengthChange = () => {
          const currentContentLength = form.getValues("content").length;
          setContentLength(currentContentLength); // Update the length state if it changes
      };

      // Subscribing to form value changes
      const subscription = form.watch((value, { name }) => {
          if (name === "content") {
              handleContentLengthChange();
          }
      });

      return () => subscription.unsubscribe(); // Cleanup subscription
  }, [form]);
  
    const content = useMemo(() => form.getValues("content"), [contentLength]);

    
    return (
        <section className='flex flex-col gap-2'>
        {content.map((con,index)=><LinkGroupResourceForm key={con.label} index={index} />)}
    </section>
  )
}
