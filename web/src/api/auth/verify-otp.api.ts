



import { Axios } from "@/lib/Axios"

const VerifyOTPApi = async(payload:{otp?:string;email?:string;token?:string}) => {
        const response = await Axios.post("/auth/verify/otp",payload)
        return response.data
}

export default VerifyOTPApi