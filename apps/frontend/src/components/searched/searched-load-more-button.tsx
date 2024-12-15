import useSearchResource from '@/hooks/resource/useSearchResource'
import { Button } from '@/shadcn/components/ui/button'
import { searchedResourcesAtom } from '@/state/search-resource.atom'
import React from 'react'
import { useRecoilState } from 'recoil'
import RequestLoader from '../loader/request-loading'

export default function SearchedLoadMoreButton() {
    const {mutate,isLoading} = useSearchResource()
    const [state,setState] = useRecoilState(searchedResourcesAtom)
    function handleLoadMore(){
        setState(s=>({...s,count:s.count+1}));
        mutate({...state,count:state.count+1})
    }
    
  return (
    <Button className=" my-4 mx-auto" variant={"secondary"} onClick={handleLoadMore} disabled={isLoading}>
        {isLoading? <RequestLoader/>: "Load more" }
      </Button>
  )
}
