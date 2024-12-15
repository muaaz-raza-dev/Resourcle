



import { Axios } from "@/lib/Axios"
import Cookie from "../../../node_modules/@types/js-cookie"

const AttachGoogleLoginApi = async(payload:{id_token:string,provider:string}) => {
        const response = await Axios.put("/profile/attach/google/login",payload, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
        return response.data
}

export default AttachGoogleLoginApi