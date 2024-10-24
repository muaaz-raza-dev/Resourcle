import { IResource } from '@/types/Iresource';
import React from 'react'
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

export default function BannerResourceForm() {
    const [sample, setsample] = React.useState("");
    const {setValue} = useFormContext<IResource>()
    const { getRootProps, getInputProps } = useDropzone({
        maxSize: 1024 ** 3 * 5,
        multiple: false,
        accept: { "image/*": [".jpeg", ".jpg", ".png"] },
        onDrop(acceptedFiles) {
          if (acceptedFiles.length) {
            const sample = URL.createObjectURL(acceptedFiles[0]);
            setValue("banner",acceptedFiles[0])
            setsample(sample);
          }
        },
     });
  return (
    <section>
          <div className='w-full h-52 bg-gray-200 center rounded-md' {...getRootProps()}>
            {
                sample?
                <img src={sample}className='object-cover object-center rounded-md overflow-hidden w-full h-full' alt="" />
                :
                <div className="flex items-center justify-center text-gray-500 text-lg font-medium">
                    Drag and drop a banner image or click here to upload.
                </div>
            }
        </div>
        <input {...getInputProps()} />
    </section>
  )
}
