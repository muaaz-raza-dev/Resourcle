



import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"

const TrackLinkClicksApi = async(linkId:string) => {
        const response = await Axios.post("/resource/track/clicks/link/"+linkId,{}, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
        return response.data
}

export default TrackLinkClicksApi