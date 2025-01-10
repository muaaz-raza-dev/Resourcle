import { VerifyEmailApi } from "@/api/auth/verify-email.api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
const useVerifyEmail = () => {
    const {push}= useRouter()
    return useMutation({
      mutationKey: "request email verification",
      mutationFn:(token:string)=> VerifyEmailApi(token),
      onSuccess(data) {
        toast.success(data.message);
      },
      onError({response:{data:{message}}}) {
        toast.error(message)
        push("/settings/account");
      }
    });
};

export default useVerifyEmail;
