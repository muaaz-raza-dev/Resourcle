import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"
interface IResourceCollectionMeta {
    _id: string;
    totalResource: number;
    totalLinks: number;
    createdAt: string;
    updatedAt: string;
    name:string;
}
const GetResourceCollectionMeta = async(collectionId:string) => {
const response = await Axios.get<{payload:IResourceCollectionMeta}>("/resoruceCollection/meta/"+collectionId, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
return response.data
}

export default GetResourceCollectionMeta