import SignupLocalApi from "@/api/auth/singup-local.api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
const useSignupLocal = () => {
    const router = useRouter()
    return useMutation({
      mutationKey: ["Sign up", "Locale"],
      mutationFn: (payload:{name:string,email:string,password:string}) => SignupLocalApi(payload),
      onSuccess(data) {
        toast.success(data.message)
        router.push("/")
      },
      onError({response:{data:{message}}}) {
        toast.error(message);
      }
    });
};

export default useSignupLocal;
