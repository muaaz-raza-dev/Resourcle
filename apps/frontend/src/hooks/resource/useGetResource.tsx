
import GetResourceApi from '@/api/resource/get-resource.api'
import { ResourceSearchBarAtom } from '@/state/resource-link-searchbar.atom'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { useSetRecoilState } from 'recoil'

export default function useGetResource({hitApi}:{hitApi?:boolean}) {
  const params=  useParams()
  const id = params.id as string;
    const setState = useSetRecoilState(ResourceSearchBarAtom)
  return (
    useQuery({
        queryKey:["resource",id],queryFn:()=>GetResourceApi(id),
        enabled:id!="" && hitApi,
        refetchOnWindowFocus:false,
        retry:3,
        onSuccess(data) {
          setState({original:data.payload.content,filtered:data.payload.content})
        },
        onError({response:{data:{message}}}){
            toast.error(message||"An error occured")
        }
    })
  )
}
