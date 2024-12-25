import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"

const CreateResourceCollectionApi = async(payload:{name:string}) => {
        const response = await Axios.post("/resoruceCollection/create",{payload}, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
        return response.data
        
}

export default CreateResourceCollectionApi