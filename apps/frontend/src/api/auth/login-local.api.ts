import { Axios } from "@/lib/Axios"
const LoginLocal = async(payload:{email:string,password:string}) => {
    const response = await Axios.post("/auth/login/locale",payload)
    return response.data
}
export default LoginLocal