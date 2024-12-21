import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"
const UpvoteResourceApi = async (id: string) => {
    const response = await Axios.put("/upvotes/upvote", { id }, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}
export default UpvoteResourceApi