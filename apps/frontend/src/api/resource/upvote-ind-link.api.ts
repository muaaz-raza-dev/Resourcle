import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"

const UpvoteIndividualLinkApi = async(payload:{resource_id:string,link_id:string}) => {
        const response = await Axios.put(
            "/resource/upvote/link", 
            payload,
            { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } }
        )
        return response.data
}

export default UpvoteIndividualLinkApi