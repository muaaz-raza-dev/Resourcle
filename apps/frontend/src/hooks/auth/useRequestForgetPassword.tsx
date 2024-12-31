import RequestForgetPasswordApi from "@/api/auth/request-forget-password.api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import Cookie from "js-cookie"
export default function useRequestForgetPassword() {
    const {push} = useRouter()
  return (
 useMutation({
          mutationKey: ["Request", "forget otp"],
          mutationFn: (email:string) => RequestForgetPasswordApi({email}),
          onSuccess(data) {
            Cookie.set(process.env.NEXT_PUBLIC_REQUESTED_OTP_COOKIE_KEY,data.token,{expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),})
            toast.success("An OTP has been sent to your registered email.")
            push("/auth/verify-token")
          },
          onError({response:{data:{message}}}) {
            toast.error(message||"Failed to request OTP. Please check your email.")
          }
        })
    
  )
}
