



import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"
import { ResourceCollectionwrtLinkPayload } from "./get-collections-wrt-link.api"

const CollectResourceLinkApi = async(payload:{link_id:string,collections:ResourceCollectionwrtLinkPayload[]}) => {
        const response = await Axios.put("/resoruceCollection/save",payload, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
        return response.data
}

export default CollectResourceLinkApi