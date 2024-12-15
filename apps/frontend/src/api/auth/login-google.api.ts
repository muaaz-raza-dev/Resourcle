import { Axios } from "@/lib/Axios"
const LoginWithGoogle = async(id_token:string) => {
    const response = await Axios.post("/auth/login/google",{id_token})
    return response.data
}
export default LoginWithGoogle