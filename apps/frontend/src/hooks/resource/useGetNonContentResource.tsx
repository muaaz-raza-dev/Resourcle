"use client;"
import GetResourceNonContentInfoApi from '@/api/resource/get-resource.api'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'


export default function useGetNonContentResource({hitApi}:{hitApi?:boolean}) {
  const params=  useParams()
  const id = params.id as string;
  
  return (
    useQuery({
        queryKey:["resource",id],queryFn:()=>GetResourceNonContentInfoApi(id),
        enabled:id!="" && hitApi,
        refetchOnWindowFocus:false,
        retry:2,
        onError({response:{data:{message}}}){
            toast.error(message||"An error occured")
        }
    })
  )
}
