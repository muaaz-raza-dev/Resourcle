import DeleteAccountApi from "@/api/auth/delete-account.api";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import useLogOut from "./useLogOut";
const useDeleteAccount = () => {
    const {LogOut} = useLogOut(true)
    return useMutation({
      mutationKey: "Delete account",
      mutationFn: (password:string) => DeleteAccountApi({password}),
      onSuccess(data) {
        LogOut()
        toast.success(data.message);
      },
      onError({ response: { data: { message } } }) {
        toast.error(message);
      },
    });
};

export default useDeleteAccount;
