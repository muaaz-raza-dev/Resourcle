import { Axios } from "@/lib/Axios"
import { InewProject } from "@/types/InewProject"
import Cookie from "js-cookie"
const CreateProjectApi = async (payload:InewProject) => {
    const response = await Axios.post(
        "/project/create", 
        {payload},
        {headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } }
        )
    return response.data
}
export default CreateProjectApi