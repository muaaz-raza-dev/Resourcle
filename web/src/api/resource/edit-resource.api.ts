



import { Axios } from "@/lib/Axios"
import { IResource } from "@/types/Iresource"
import { Itags } from "@/types/Itags"
import Cookie from "js-cookie"

const  EditResourceApi = async(payload:{resource_id: string,payload: IResource}) => {
const response = await Axios.put("/resource/update/"+payload.resource_id,payload, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
return response.data
}


type IeditableResource = IResource & {tagObjects:Itags[]}
export const  FetchResourceTobeEdit = async(resource_id:string) => {
        const response = await Axios.get<{payload:IeditableResource}>("/resource/update/"+resource_id, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
        return response.data
}

export default EditResourceApi