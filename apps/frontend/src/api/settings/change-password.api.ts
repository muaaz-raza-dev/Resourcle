
import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"
export interface IChangePasswordApiPayload{current_password?:string,new_password: string,provider:"local"|"google"|"hybrid"}
const ChangePasswordApi = async(payload:IChangePasswordApiPayload) => {
        const response = await Axios.put("/profile/change/password",payload, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
        return response.data
}

export default ChangePasswordApi