
import DecodeRequestOtpTokenApi from "@/api/auth/decode-request-otp-token.api"
import { useQuery } from "react-query"
import Cookie from "js-cookie"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
const useDecodeROTPToken = ()=>{
    const {push} = useRouter()
    return useQuery({queryKey:"decode requested token",queryFn:()=>DecodeRequestOtpTokenApi(),
        enabled:true,
        retry:2,
        refetchOnWindowFocus:false,staleTime:1000*60*5 ,
        onError({response:{data:{message}}}) {
            toast.error(message)
            Cookie.remove(process.env.NEXT_PUBLIC_REQUESTED_OTP_COOKIE_KEY)
            push("/auth/forget-password")
        },
     })
}
export default useDecodeROTPToken