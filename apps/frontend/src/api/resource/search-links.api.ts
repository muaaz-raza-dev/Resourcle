



import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"
export type LinkSortOptions = "upvotes"|"updatedAt" | "clicks"
const SearchLinksApi = async(payload:{sort:LinkSortOptions,q:string,count:number}) => {
        const response = await Axios.post("/resource/search/links", payload, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
        return response.data
}

export default SearchLinksApi