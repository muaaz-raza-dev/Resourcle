import SearchLinksApi from '@/api/resource/search-links.api';
import { searchedAtom } from '@/state/search-resource.atom';
import { useSearchParams } from 'next/navigation';
import { useMutation } from "react-query";
import { useRecoilState } from 'recoil';

export default function useSearchLinks() {
    const [{count,filters:{links:{sort}}},setState]  = useRecoilState(searchedAtom)
    const search = useSearchParams().get("search") ?? ""
  return (
        useMutation({
          mutationKey: "search links",
          mutationFn: (directPayload:{count?:number}) => SearchLinksApi({count:directPayload.count??count,sort,q:search}),
          onMutate(){
            setState((val) => ({...val, isLoading:true }));
          },
          onSuccess({payload:{links,total}}) {
            setState((prev) => ({...prev,total:total??prev.total, payload:{...prev.payload,links: prev.payload.links.concat(links) }, count: prev.count + 1 }))
          },
          onSettled(){
            setState((val) => ({...val, isLoading:true }));
          }
}) 
)   
    
    
}
