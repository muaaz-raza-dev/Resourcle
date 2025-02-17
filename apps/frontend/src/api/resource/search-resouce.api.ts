import { Axios } from "@/lib/Axios"
import { SearchedSortOptions } from "@/state/search-resource.atom";
import { IResourceSearched } from "@/types/Isearched"
import Cookie from "js-cookie"


const ResourceSearchApi = async (payload :{search:string,sort:SearchedSortOptions,count:number;categories:string[]}) => {
    const response = await Axios.post<{payload:{resources:IResourceSearched[],total:number}}>("/resource/search", {...payload},{headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}
export default ResourceSearchApi