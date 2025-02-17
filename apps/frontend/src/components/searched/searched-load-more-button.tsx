
import { Button } from '@/shadcn/components/ui/button'
import { searchedAtom } from '@/state/search-resource.atom'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import RequestLoader from '../loader/request-loading'
import { useDynamicSearch } from './utils/UseInitializeSearchState'

export default function SearchedLoadMoreButton() {
    const {isLoading} = useDynamicSearch()
    const setState = useSetRecoilState(searchedAtom)
    function handleLoadMore(){
        setState(s=>({...s,count:s.count+1}));
        
    }
    
  return (
    <Button className=" my-4 mx-auto" variant={"secondary"} onClick={handleLoadMore} disabled={isLoading}>
        {isLoading? <RequestLoader/>: "Load more" }
      </Button>
  )
}
