import { Axios } from "@/lib/Axios"
import { IResource, IresourceContent } from "@/types/Iresource"
import Cookie from "js-cookie"

export type IresourceRemote = Omit<IResource, " banner" | "tags" | "publisher" |"isPrivate"|"content"> & {
    banner?: string, publisher: { name: string, _id: string, picture: string; headline: string },
    tags: { name: string, _id: string }[];
    isUpvoted:boolean;
    isSaved:boolean;
    _id:string;
    views:number
}


const GetResourceNonContentInfoApi = async (id: string) => {
    const response = await Axios.get<{ payload: IresourceRemote }>("/resource/d/" + id, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}

export const GetResourceContentApi = async ({id,sort}:{id: string,sort:string}) => {
    const response = await Axios.get<{ payload:{content: IresourceContent[]} }>(`/resource/d/link/${id}/${sort}`, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}

export const GetResourceMetaInfoApi = async (id: string) => {
    const response = await Axios.get<{ payload: {title:string;_id:string;description:string;banner:string} }>("/resource/d/meta/" + id, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}
export default GetResourceNonContentInfoApi