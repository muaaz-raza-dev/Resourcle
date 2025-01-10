import RequestEmailVerificationApi from "@/api/auth/verify-email.api";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
const useRequestEmailVerification = () => {
    return useMutation({
      mutationKey: "request email verification",
      mutationFn:  RequestEmailVerificationApi,
      onSuccess(data) {
        toast.success(data.message)
      },
      onError({response:{data:{message}}}) {
        toast.error(message)
      }
    });
};

export default useRequestEmailVerification;
