

import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"

const GetCollectionsMinimalApi = async() => {
const response = await Axios.get<{payload:{name:string;_id:string}[]}>("/resoruceCollection/minimal", { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
return response.data
}

export default GetCollectionsMinimalApi