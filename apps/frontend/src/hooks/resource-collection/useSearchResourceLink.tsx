import SearchResourceLinkApi from '@/api/resource-collection/search-resoruce-link.api'
import { ResourceCollectionAtom } from '@/state/resource-collection.atom';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query'
import { useSetRecoilState } from 'recoil';

export default function useSearchResourceLink() {
    const id = useParams().id as string;
    const setState = useSetRecoilState(ResourceCollectionAtom);

  return (
    useMutation({mutationKey:"Search resoruce in collection",mutationFn:(payload:{query:string})=>SearchResourceLinkApi({...payload,collectionId:id}),
onSuccess(data) {
    setState((prev)=>({...prev,iterable:data.payload}))
},
onError(){
    setState((prev)=>({...prev,iterable:prev.resources}))
    toast.error("Failed to search resource in collection")
}
})
  )
}
