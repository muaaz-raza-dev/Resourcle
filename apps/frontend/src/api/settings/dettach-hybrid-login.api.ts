



import { Axios } from "@/lib/Axios"
import { Iproviders } from "@/types/Isecurity"
import Cookie from "../../../node_modules/@types/js-cookie"

const DettachHybridLoginApi = async ({provider,password}:{provider: Iproviders,password:string}) => {
    const response = await Axios.put("/profile/dettach/hybrid/login", { provider,password }, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}

export default DettachHybridLoginApi