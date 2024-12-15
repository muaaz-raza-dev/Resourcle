import { Axios } from "@/lib/Axios"
import Cookie from "../../../node_modules/@types/js-cookie"
const DeleteResourceApi = async (id: string) => {
    const response = await Axios.put("/remove", { id },
         { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } }
        )
    return response.data
}
export default DeleteResourceApi