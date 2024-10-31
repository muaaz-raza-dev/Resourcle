import { Axios } from "@/lib/Axios"
import { IResource } from "@/types/Iresource"
import Cookie from "js-cookie"

type IresourceRemote = Omit<IResource," banner" | "tags" | "publisher"> & {banner?:string,publisher:{name:string,_id:string,photo:string},
tags:{name:string,_id:string}[]}


const GetResourceApi = async (id:string) => {
    const response = await Axios.get<{payload:IresourceRemote }>("/resource/d/"+id, {headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}
export default GetResourceApi