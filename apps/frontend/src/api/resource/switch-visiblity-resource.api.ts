import { Axios } from "@/lib/Axios";
import Cookie from "js-cookie";

export default async function SwitchVisiblityResourceApi(id:string) {
    const response = await Axios.put<{payload:{isPrivate:boolean}}>("/resource/switch/visiblity", {id},{headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}
