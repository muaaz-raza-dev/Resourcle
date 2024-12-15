import { Axios } from "@/lib/Axios"
import { IuserProfile } from "@/types/IuserProfile"
import Cookie from "../../../node_modules/@types/js-cookie"
const UpdateProfileInfoApi = async (payload:Omit<IuserProfile,"username">) => {
    const response = await Axios.put<{payload:IuserProfile}>(
        "/profile/update", 
        payload,
        {headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } }
        )
    return response.data
}
export const UpdateUsernameApi = async (username:string) => {
    const response = await Axios.put<{payload:IuserProfile}>(
        "/profile/update", 
        {username},
        {headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } }
        )
    return response.data
}
export default UpdateProfileInfoApi