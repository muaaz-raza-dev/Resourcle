
import GetCollectionWithRespectToLink, { ResourceCollectionwrtLinkPayload } from "@/api/resource-collection/get-collections-wrt-link.api"
import toast from "react-hot-toast"
import { useQuery } from "react-query"

const useGetCollectionsWrtLink = (linkId:string,setState?:React.Dispatch<React.SetStateAction<ResourceCollectionwrtLinkPayload[]>>)=>{

    return useQuery({queryKey:["Resource Collection",linkId],queryFn:()=>GetCollectionWithRespectToLink(linkId),
        onSuccess(data){
            setState?.(data.payload)
        },
        onError(){
            toast.error("Failed to fetch collections")
        },
        refetchOnWindowFocus:false,staleTime:1000*60*5 ,
     })
}
export default useGetCollectionsWrtLink