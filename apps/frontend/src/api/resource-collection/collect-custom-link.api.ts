






import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"

const CollectCustomLinkApi = async(payload:{collectionId:string,linkPayload:{title:string,description:string,url:string,}}) => {
        const response = await Axios.put<{payload:{name:string }}>("/resoruceCollection/save/custom/link",payload, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
        return response.data
}

export default CollectCustomLinkApi