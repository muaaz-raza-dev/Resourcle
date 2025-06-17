"use client";
import ResourceLoader from '@/components/resource/read/components/resource-loader';
import useGetResourceCollections from '@/hooks/resource-collection/useGetProfileCollection';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function Page() {
    const { data, isLoading } = useGetResourceCollections({enabled:true});
    const {push} = useRouter()
    useEffect(() => {
      if(data?.payload && data.payload.length > 0){
        push(`/collection/${data?.payload[0]?._id}`)
      }
    }, [isLoading,data])
  return (
    <ResourceLoader/>
  )
}
