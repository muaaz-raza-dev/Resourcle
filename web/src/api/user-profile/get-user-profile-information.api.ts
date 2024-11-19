import { Axios } from "@/lib/Axios"
import { IuserProfile } from "@/types/IuserProfile"
import Cookie from "js-cookie"
type  IuserProfileInformation = Omit<IuserProfile, "email"> 

export default async function GetUserProfileInformationApi(userid:string) {
        const response = await Axios.get<{payload:IuserProfileInformation}>(
            "/profile/user/"+userid, 
            {headers: { "Authorization": `Bearer ${Cookie.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY)}` } }
            )
            return response.data
}
