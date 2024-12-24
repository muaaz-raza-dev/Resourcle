"use client";
import GetResourceCollectionMeta from "@/api/resource-collection/get-resource-collection-meta.api"
import { ResourceCollectionAtom } from "@/state/resource-collection.atom";
import { useParams } from "next/navigation"
import { useQuery } from "react-query"
import { useSetRecoilState } from "recoil";


const useGetResouceCollectionMeta = ()=>{
    const id = useParams().id as string
    const setState = useSetRecoilState(ResourceCollectionAtom)
    return useQuery({queryKey:["Collection",id],queryFn:()=>GetResourceCollectionMeta(id),
        onSuccess(data) {
            setState(e=>({...e,total:data.payload.totalLinks}))
        },
        refetchOnWindowFocus:false,staleTime:1000*60*5 ,
     })
}
export default useGetResouceCollectionMeta