import { Axios } from "@/lib/Axios"




export default async function SignupLocalApi(payload:{name:string,email:string,password:string}) {
    const response = await Axios.post("/auth/signup/locale",payload)
    return response.data
}
