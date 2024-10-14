import { Axios } from "@/lib/Axios"
import { IuserProfile } from "@/types/IuserProfile"
import Cookie from "js-cookie"
const GetProfileInfoApi = async () => {
    const response = await Axios.get<{payload:IuserProfile}>(
        "/profile/", 
        {headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } }
        )
    return response.data
}
export default GetProfileInfoApi