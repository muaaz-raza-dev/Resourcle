import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"
const SaveResourceApi = async (id: string) => {
    const response = await Axios.put("/profile/save/resource", { id }, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}
export default SaveResourceApi