



import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"

const LogOutApi = async() => {
        const response = await Axios.post("/auth/logout", { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
        return response.data
}

export default LogOutApi