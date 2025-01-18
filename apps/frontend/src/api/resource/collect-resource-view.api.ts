



import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"

export const CollectResourceViewApi = async (id: string) => {
    const response = await Axios.get("/resource/d/collect/view/" + id, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}