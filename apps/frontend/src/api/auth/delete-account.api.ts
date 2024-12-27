



import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"

const DeleteAccountApi = async(payload:{password:string}) => {
    const response = await Axios.put("/profile/delete/account",payload, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}

export default DeleteAccountApi     
