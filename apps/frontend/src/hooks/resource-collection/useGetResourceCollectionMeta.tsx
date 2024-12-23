"use client";
import GetResourceCollectionMeta from "@/api/resource-collection/get-resource-collection-meta.api"
import { useParams } from "next/navigation"
import { useQuery } from "react-query"


const useGetResouceCollectionMeta = ()=>{
    const id = useParams().id as string
    return useQuery({queryKey:["Collection",id],queryFn:()=>GetResourceCollectionMeta(id),
        refetchOnWindowFocus:false,staleTime:1000*60*5 ,
     })
}
export default useGetResouceCollectionMeta