import { Axios } from "@/lib/Axios"
import { IResource } from "@/types/Iresource"
import Cookie from "../../../node_modules/@types/js-cookie"
const CreateResourceApi = async (payload:IResource) => {
    const response = await Axios.post(
        "/resource/new", 
        {payload},
        {headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } }
        )
    return response.data
}
export default CreateResourceApi