
import GetAccountSecurityInfoApi from "@/api/settings/get-account-security-info.api"
import { useQuery } from "react-query"

const useFetchSecurityInfo = (options?:{hitApi?:boolean})=>{
    return useQuery({queryKey:["securtiy","account","info"],queryFn:()=>GetAccountSecurityInfoApi(),
        refetchOnWindowFocus:false,staleTime:1000*60*5,enabled:options?.hitApi
     })
}
export default useFetchSecurityInfo