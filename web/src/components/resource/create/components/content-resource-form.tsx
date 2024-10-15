import { IResource } from '@/types/Iresource';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import LinkGroupResourceForm from './Link-Group/link-group-resource-form';

export default function ContentResourceForm() {
    const form = useFormContext<IResource>()
    
    return (
        <section>
                {form.watch("content").map((con,index)=><LinkGroupResourceForm key={con.label} index={index} />)}
    </section>
  )
}
