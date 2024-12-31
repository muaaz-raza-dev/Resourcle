import SignupLocalApi from "@/api/auth/singup-local.api";
import { authAtom } from "@/state/auth.atom";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import Cookie from "js-cookie"
const useSignupLocal = () => {
    const router = useRouter();
    const setState = useSetRecoilState(authAtom)
    return useMutation({
      mutationKey: ["Sign up", "Locale"],
      mutationFn: (payload:{name:string,email:string,password:string}) => SignupLocalApi(payload),
      onSuccess(data) {
        setState(e=>({...e,isLogined:true,user:data.payload}))
        Cookie.set(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY,data.token,{expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),})
        toast.success(data.message)
        router.push("/")
      },
      onError({response:{data:{message}}}) {
        toast.error(message);
      }
    });
};

export default useSignupLocal;
