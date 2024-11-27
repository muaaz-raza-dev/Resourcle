import AttachGoogleLoginApi from "@/api/auth/attach-google-login.api";
import { useMutation } from "react-query";
import useFetchSecurityInfo from "../settings/useFetchSecurityInfo";
import toast from "react-hot-toast";
const useAttachGoogleProvider = () => {
    const {refetch} = useFetchSecurityInfo()
    return useMutation({
      mutationKey: "Attach google",
      mutationFn: (payload:{id_token:string,provider:string}) => AttachGoogleLoginApi(payload),
      onSuccess() {
        refetch()
        toast.success("You are all set 🔥")
      },
      onError(){
        toast.error("Failed to attach Google account")
      }
    });
};

export default useAttachGoogleProvider;
