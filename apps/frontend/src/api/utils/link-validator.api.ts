

import { Axios } from "@/lib/Axios"
import Cookies from "js-cookie"

const validateLinkApi = async(link:string) => {
        const Secretkey  =process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY
        const response = await Axios.post("/utils/validate/link",{link},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default validateLinkApi