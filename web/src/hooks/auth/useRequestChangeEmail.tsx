import RequestChangeEmailApi from "@/api/auth/request-change-email.api";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
const useRequestEmailChange = () => {
    return useMutation({
      mutationKey: "Request Change email",
      mutationFn: (payload:{password:string;new_email:string}) => RequestChangeEmailApi(payload),
      onSuccess({message}) {
        toast.success(message)
      },
      onError({response:{data:{message}}}) {
        toast.error(message)
      },
    });
};

export default useRequestEmailChange;