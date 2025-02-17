"use client"
import { LinkSortOptions } from '@/api/resource/search-links.api'
import useSearchLinks from '@/hooks/links/useSearchLinks'
import useSearchResource from '@/hooks/resource/useSearchResource'
import { searchedAtom, SearchedSortOptions, SearchedTypes } from '@/state/search-resource.atom'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

export default function useInitializeSearchState(){
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const type = searchParams.get('type') 
  const sort = searchParams.get('sort') as SearchedSortOptions|LinkSortOptions
  const {mutate} = useSearchResource()
  const {mutate:searchLinks} = useSearchLinks()
  const [{isLoading},setState] = useRecoilState(searchedAtom)
  useEffect(() => {

setState(e=>({...e,type:type?(type=="links"?"links":"resources"):e.type,filters:{resources:{...e.filters.resources,sort:type == "resources"?(sort as SearchedSortOptions )||e.filters.resources.sort:e.filters.resources.sort},links:{...e.filters.links,sort:type == "links" ? (sort  as LinkSortOptions)||e.filters.links.sort :e.filters.links.sort}}})) 
 if(!isLoading&&search){
    if(type == "links"){
      searchLinks({})
    }
    else{
      mutate({sort:sort as SearchedSortOptions})
    }
  }

  },[])
}

export function useDynamicSearch(){
  const searchParams= useSearchParams();
  const type = searchParams.get("type") as SearchedTypes
  const searchResources = useSearchResource()
  const searchLinks = useSearchLinks()
  
  return type =="links" ? searchLinks: searchResources
}
