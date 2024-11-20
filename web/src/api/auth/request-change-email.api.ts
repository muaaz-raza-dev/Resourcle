import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"
const RequestChangeEmailApi = async(payload:{password:string;new_email:string}) => {
        const response = await Axios.post("/auth/request/change/email",payload,
                {
                        headers: {'Content-Type': 'application/json',"Authorization":`Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}`},
                }
                )
        return response.data
}

export default RequestChangeEmailApi