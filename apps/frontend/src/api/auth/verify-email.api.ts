



import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"

const RequestEmailVerificationApi = async() => {

        const response = await Axios.post("/auth/request/verify/email/", { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
        return response.data
}

export const VerifyEmailApi = async(token:string) => {
    const response = await Axios.post("/auth//verify/email",{token}, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}

export default RequestEmailVerificationApi