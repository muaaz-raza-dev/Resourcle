import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"
const RemoveResourceCollection = async(payload:{linkId:string,collectionId:string}) => {
    const response = await Axios.put("/resoruceCollection/remove/",payload, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}
    
export default RemoveResourceCollection