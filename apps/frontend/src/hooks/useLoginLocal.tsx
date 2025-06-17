import LoginLocal from "@/api/auth/login-local.api";
import { authAtom } from "@/state/auth.atom";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
// import Cookie from "js-cookie"
const useLoginLocal = () => {
    const router = useRouter()
    const setState = useSetRecoilState(authAtom)
    return useMutation({
      mutationKey: ["Login", "Locale"],
      mutationFn: (payload:{email:string,password:string}) => LoginLocal(payload),
      onSuccess(data) {
        // Cookie.set("RESOURCE_SESSION",data.token,{expires:new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)})
        setState(e=>({...e,isLogined:true,user:data.payload,authReminderModal:false}))
        toast.success(data.message)
        router.push("/")
      },
      onError() {
        toast.error("Login failed, please check your credentials");
      }
    });
};

export default useLoginLocal;
