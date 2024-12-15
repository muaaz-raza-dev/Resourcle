import VerifyOTPApi from "@/api/auth/verify-otp.api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
const useVerifyOTP = () => {
    const {push} = useRouter()
    return useMutation({
      mutationKey: "Verify OTP",
      mutationFn: (payload:{otp?:string;email?:string;token?:string}) => VerifyOTPApi(payload),
      onSuccess() {
        toast.success("OTP verified successfully. Now You can change your password.")
        push("/settings/account")
      },
      onError({response:{data:{message}}}) {
        toast.error(message)
      },
    });
};

export default useVerifyOTP;
