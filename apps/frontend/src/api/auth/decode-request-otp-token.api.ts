import { Axios } from "@/lib/Axios"
import Cookie from "../../../node_modules/@types/js-cookie"
export default async function DecodeRequestOtpTokenApi() {
    const response = await Axios.get<{payload:{email:string}}>("/auth/decode/request-otp/token",{headers:{token_otp_requested:Cookie.get(process.env.NEXT_PUBLIC_REQUESTED_OTP_COOKIE_KEY)}})
    return response.data
}

