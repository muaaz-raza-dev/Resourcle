import { Axios } from "@/lib/Axios"
import {  ITagFeed } from "@/types/Ifeed"
import Cookie from "js-cookie"
const LoadTagFeedApi = async () => {
    const response = await Axios.get<{ payload: ITagFeed[] }>("/tags/feed", 
        { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}
export default LoadTagFeedApi