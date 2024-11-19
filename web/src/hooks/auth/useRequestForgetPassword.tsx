import RequestForgetPasswordApi from "@/api/auth/request-forget-password.api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export default function useRequestForgetPassword() {
    const {push} = useRouter()
  return (
 useMutation({
          mutationKey: ["Request", "forget otp"],
          mutationFn: (email:string) => RequestForgetPasswordApi({email}),
          onSuccess() {
            toast.success("An OTP has been sent to your registered email.")
            push("/auth/verify-token")
          },
          onError({response:{data:{message}}}) {
            toast.error(message||"Failed to request OTP. Please check your email.")
          }
        })
    
  )
}
