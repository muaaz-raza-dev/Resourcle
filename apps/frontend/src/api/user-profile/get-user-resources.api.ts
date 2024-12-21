import { Axios } from "@/lib/Axios"
import { IResourceSearched } from "@/types/Isearched"
import Cookie from "js-cookie"


const GetUserResourceApi = async (payload: { sort: "upvotes" | "createdAt", count: number, isPrivate: boolean,userid:string }) => {
    const response = await Axios.post<{ payload: { resources: IResourceSearched[], total: number } }>("/resource/user/resources", { ...payload }, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}
export default GetUserResourceApi