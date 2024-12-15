import useRequestForgetPassword from "@/hooks/auth/useRequestForgetPassword";
import React from "react";
import Cookie from "../../../../node_modules/@types/js-cookie"
import { useRouter } from "next/navigation";
import RequestLoader from "@/components/loader/request-loading";
export default function SecurityAccountForgetPasswordBtn({email}:{email:string}) {
    const {push} = useRouter()
  const { mutate, isLoading } = useRequestForgetPassword();
  function RequestOTP() {
    const isExist  = Cookie.get(process.env.NEXT_PUBLIC_REQUESTED_OTP_COOKIE_KEY)
    if (isExist) {
        push("/auth/verify-token")
    }
    else{
        mutate(email)
    }
  }
  return (
    <button disabled={isLoading} className="text-muted-foreground text-sm font-semibold hover:underline transition mt-2" 
    onClick={RequestOTP}>
        {
            isLoading? <RequestLoader size="16" /> : "Forget password"
        }
    </button>
  );
}
