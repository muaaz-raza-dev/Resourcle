

import { Axios } from "@/lib/Axios"
import { IResourceFeed } from "@/types/Ifeed"
import Cookie from "js-cookie"
const LoadResourceFeedApi = async () => {
    const response = await Axios.get<{ payload: IResourceFeed[] }>("/resource/feed", { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}
export default LoadResourceFeedApi