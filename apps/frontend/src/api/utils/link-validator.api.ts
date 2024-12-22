

import axios from "axios"
import Cookies from "js-cookie"

const validateLinkApi = async(link:string) => {
        const Secretkey  =process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY
        const response = await axios.post(`${process.env.NEXT_PUBLIC_UTIL_SERVER_URI}/utils/validate/link`,{link},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default validateLinkApi