

import { Axios } from "@/lib/Axios"
import { IResourceLink } from "@/types/Iresource"
import Cookie from "js-cookie"
export interface IcollectedResourceLink extends IResourceLink{
        resource:{name:string;_id:string;publisher:{name:string,_id:string}}
}
const GetCollectionLinks = async(payload:{id:string,count:number}) => {
        const response = await Axios.post<{payload:IcollectedResourceLink[]}>("/resoruceCollection/links",payload, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
        return response.data
}

export default GetCollectionLinks