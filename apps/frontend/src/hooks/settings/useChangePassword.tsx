import ChangePasswordApi, { IChangePasswordApiPayload } from "@/api/settings/change-password.api";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import useFetchSecurityInfo from "./useFetchSecurityInfo";
const useChangePassword = () => {
    const {refetch} = useFetchSecurityInfo()
    return useMutation({
      mutationKey: ["Change ","password/provider"],
      mutationFn: (payload:IChangePasswordApiPayload) => ChangePasswordApi(payload),
      onSuccess() {
        toast.success("You are all set 🔥");        
        refetch();
      },
      onError({response:{data:{message}}}) {
        toast.error(message||"Failed to change password");
      }
    });
};

export default useChangePassword;
