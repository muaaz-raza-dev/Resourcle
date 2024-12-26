
import GetCollectionWithRespectToLink, { ResourceCollectionwrtLinkPayload } from "@/api/resource-collection/get-collections-wrt-link.api"
import { authAtom } from "@/state/auth.atom"
import toast from "react-hot-toast"
import { useQuery } from "react-query"
import { useRecoilValue } from "recoil"

const useGetCollectionsWrtLink = (linkId:string,setState?:React.Dispatch<React.SetStateAction<ResourceCollectionwrtLinkPayload[]>>)=>{
    const {isLogined} = useRecoilValue(authAtom)
    return useQuery({queryKey:["Resource Collection",linkId],enabled:isLogined,queryFn:()=>GetCollectionWithRespectToLink(linkId),
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