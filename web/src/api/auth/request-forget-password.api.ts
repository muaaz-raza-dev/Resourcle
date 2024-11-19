
import { Axios } from "@/lib/Axios"
const RequestForgetPasswordApi = async(payload:{email:string}) => {
    const response = await Axios.post("/auth/request/forgot-password",payload)
    return response.data
}
export default RequestForgetPasswordApi