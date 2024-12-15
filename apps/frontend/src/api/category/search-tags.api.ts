import { Axios } from "@/lib/Axios"
import { Itags } from "@/types/Itags"
const SearchTagsApi = async(q:string) => {
  const response = await Axios.post<{payload:Itags[]}>("/tags/search",{q})
  return response.data
}
export default SearchTagsApi