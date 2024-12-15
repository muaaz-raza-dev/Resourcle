import DettachHybridLoginApi from "@/api/settings/dettach-hybrid-login.api";
import { Iproviders } from "@/types/Isecurity";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import useFetchSecurityInfo from "./useFetchSecurityInfo";
const useDettachHybridMode = () => {
    const {refetch}= useFetchSecurityInfo()
    return useMutation({
      mutationKey: "Dettach hybrid login mode",
      mutationFn: (payload:{password:string,provider:Iproviders}) => DettachHybridLoginApi(payload),
      onSuccess(data) {
        toast.success(data.message)
        refetch();
      },
      onError({response:{data:{message}}}) {
        toast.error(message||"An error occured")
      },
    });
};

export default useDettachHybridMode;
