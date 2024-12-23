import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"
import { ResourceCollectionsPayload } from "../user-profile/get-user-profile-information.api"
export type ResourceCollectionwrtLinkPayload = ResourceCollectionsPayload & {isCollected:boolean}
const GetCollectionWithRespectToLink = async(linkId:string) => {
const response = await Axios.get<{payload:ResourceCollectionwrtLinkPayload[]}>("/resoruceCollection/collections/"+linkId, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
return response.data
}

export default GetCollectionWithRespectToLink