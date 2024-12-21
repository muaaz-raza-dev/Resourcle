


import { Axios } from "@/lib/Axios"
import { Iproviders } from "@/types/Isecurity";
import Cookie from "js-cookie"
interface ISecurityInfo{
     provider:Iproviders;
      email:string;
      email_verified:string;
      reset_token_expiration?:Date;
      reset_verification?:string
}
const GetAccountSecurityInfoApi = async () => {
    const response = await Axios.get<{payload:ISecurityInfo}>("/profile/security/info", 
        { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}

export default GetAccountSecurityInfoApi