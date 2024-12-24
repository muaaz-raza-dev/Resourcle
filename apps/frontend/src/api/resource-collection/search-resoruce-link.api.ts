



import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"

const SearchResourceLinkApi = async(payload:{query:string,collectionId:string}) => {

        const response = await Axios.post("/resoruceCollection/search",payload, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
        return response.data
}

export default SearchResourceLinkApi