import GetCollectionsMinimalApi from "@/api/resource-collection/get-collections-minimal.api"
import { useQuery } from "react-query"

const useGetMinimalCollectionList = (onSuccess?:(data:{payload:{name:string;_id:string}[]})=>void)=>{
    return useQuery({queryKey:"minimal collections",queryFn:GetCollectionsMinimalApi,refetchOnWindowFocus:false,staleTime:1000*60*5,onSuccess(data){
        onSuccess?.(data)
    }})
}
export default useGetMinimalCollectionList