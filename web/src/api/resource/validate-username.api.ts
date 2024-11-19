import { Axios } from "@/lib/Axios";
import Cookie from "js-cookie";

export default async function ValidateUsernameApi(username:string) {
    const response = await Axios.post<{payload:{isAvailable:boolean}}>("/profile/validate/username", 
        {username},
        {headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } })
    return response.data
}
