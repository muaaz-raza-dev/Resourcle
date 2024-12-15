import ChangeEmailApi from "@/api/auth/change-email";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import useFetchSecurityInfo from "../settings/useFetchSecurityInfo";

export default function useVerifyEmailAndChange() {
    const {refetch,remove} = useFetchSecurityInfo()
    return useMutation({
        mutationKey: "Verify and Change email",
        mutationFn: (payload:{token:string;}) => ChangeEmailApi(payload),
        onSuccess({message}) {
          toast.success(message)
          remove()
          refetch()
        },
        onError({response:{data:{message}}}) {
          toast.error(message)
        },
      });
}
