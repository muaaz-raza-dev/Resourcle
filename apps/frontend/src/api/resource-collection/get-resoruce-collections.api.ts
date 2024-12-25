
import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"

const GetResourceCollectionsApi = async() => {
        const response = await Axios.get<{payload:{name:string;links:number;_id:string}[]}>("/resoruceCollection" ,{ headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
        return response.data
}

export default GetResourceCollectionsApi