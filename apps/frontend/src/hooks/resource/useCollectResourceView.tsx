import { CollectResourceViewApi } from '@/api/resource/collect-resource-view.api';
import { useParams } from 'next/navigation';
import { useQuery } from 'react-query'

export default function useCollectResourceView() {
    const params=  useParams()
    const id = params.id as string;
  return (
    useQuery({
        queryKey:["resource","view",id],queryFn:()=>CollectResourceViewApi(id),
        refetchOnWindowFocus:false,
        staleTime:Infinity,
    })
  )
}
