/* eslint-disable react/no-unescaped-entities */
            
import useGetResource from '@/hooks/resource/useGetResource';
import { CardContent, CardHeader, CardTitle } from '@/shadcn/components/ui/card'
import Image from 'next/image'
import React from 'react'

export default function ResourceHeader() {
  const {data} = useGetResource();

  return (
    <>
    <CardHeader>
      {data?.payload.banner&&
      <Image
      src={data?.payload.banner}
      alt="Resource Library Banner"
      width={800}
      height={200}
      className="w-full h-40 object-cover rounded-t-lg"
      />
    }
  </CardHeader>
  <CardContent>
    <CardTitle className="text-2xl mb-2">
      {data?.payload.title}
   </CardTitle>
    <p className="text-muted-foreground">
    {data?.payload.description}
    </p>
  </CardContent>
  </>
  )
}
