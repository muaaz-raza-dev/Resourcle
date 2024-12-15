import { Axios } from "@/lib/Axios"
import {  IUserFeed } from "@/types/Ifeed"
import Cookie from "../../../node_modules/@types/js-cookie"
const LoadUsersFeedApi = async () => {
    const response = await Axios.get<{ payload:IUserFeed[] }>("/users/feed", 
        { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}
export default LoadUsersFeedApi