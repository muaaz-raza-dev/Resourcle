import LoginLocal from "@/api/auth/login-local.api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
const useLoginLocal = () => {
    const router = useRouter()
    return useMutation({
      mutationKey: ["Login", "Locale"],
      mutationFn: (payload:{email:string,password:string}) => LoginLocal(payload),
      onSuccess(data) {
        toast.success(data.message)
        router.push("/")
      },
      onError() {
        toast.error("Login failed, please check your credentials");
      }
    });
};

export default useLoginLocal;
