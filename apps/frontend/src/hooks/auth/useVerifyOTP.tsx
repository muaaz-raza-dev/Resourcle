import VerifyOTPApi from "@/api/auth/verify-otp.api";
import { authAtom } from "@/state/auth.atom";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
const useVerifyOTP = () => {
    const {push} = useRouter()
    const setState = useSetRecoilState(authAtom)
    return useMutation({
      mutationKey: "Verify OTP",
      mutationFn: (payload:{otp?:string;email?:string;token?:string}) => VerifyOTPApi(payload),
      onSuccess(payload) {
        setState(e=>({...e,isLogined:true,user:payload}))
        toast.success("OTP verified successfully. Now You can change your password.")
        push("/settings/account")
      },
      onError({response:{data:{message}}}) {
        toast.error(message)
      },
    });
};

export default useVerifyOTP;
