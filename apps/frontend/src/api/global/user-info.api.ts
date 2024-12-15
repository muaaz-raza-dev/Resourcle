import { Axios } from "@/lib/Axios"
import Cookie from "../../../node_modules/@types/js-cookie"
const GetUserInfo = async() => {
    const response = await Axios.get("/auth/",{headers:{"Authorization":`Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}`}})
    return response.data
}
export default GetUserInfo