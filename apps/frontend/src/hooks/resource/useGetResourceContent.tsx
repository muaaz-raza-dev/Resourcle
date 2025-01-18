"use client;"
import  { GetResourceContentApi } from '@/api/resource/get-resource.api'
import { ResourceFilterLinksAtom } from '@/state/resource-link-searchbar.atom'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'


export function useGetContentResource({hitApi}:{hitApi?:boolean}) {
  const params=  useParams()
  const id = params.id as string;
  const [state,setState] = useRecoilState(ResourceFilterLinksAtom);
  
  return (
    useQuery({
        queryKey:["resource","content",id],queryFn:()=>GetResourceContentApi({id,sort:state.sort}),
        enabled:id!="" && hitApi,
        onSuccess(data) {
            setState(e=>({...e,original:data.payload.content,filtered:data.payload.content}))
        },
        refetchOnWindowFocus:false,
        retry:2,
        onError({response:{data:{message}}}){
            toast.error(message||"An error occured")
        }
    })
  )
}
