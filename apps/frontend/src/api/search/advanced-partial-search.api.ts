



import { Axios } from "@/lib/Axios"
import Cookie from "js-cookie"
export interface IpartialSearchPayload{
  resources:{title:string;upvotes:number;updatedAt:string;createdAt:string;views:number;_id:string}[],
  tags:{name:string;_id:string}[];
  users:{name:string;_id:string;headline:string; picture:string;username:string}[]
        
}
const AdvancedPartialSearchApi = async(q:string) => {
        const response = await Axios.post<{payload:IpartialSearchPayload}>("/resource/search/advanced/partial",{q}, { headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
        return response.data
}

export default AdvancedPartialSearchApi