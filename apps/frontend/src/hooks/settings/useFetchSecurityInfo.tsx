
import GetAccountSecurityInfoApi from "@/api/settings/get-account-security-info.api"
import { authAtom } from "@/state/auth.atom"
import { useQuery } from "react-query"
import { useRecoilValue } from "recoil"

const useFetchSecurityInfo = (options?:{hitApi?:boolean})=>{
    const {user} = useRecoilValue(authAtom)
    return useQuery({queryKey:["securtiy account info",user?._id],queryFn:()=>GetAccountSecurityInfoApi(),
        refetchOnWindowFocus:false,staleTime:1000*60*5,refetchOnMount:true,enabled:options?.hitApi
     })
}
export default useFetchSecurityInfo