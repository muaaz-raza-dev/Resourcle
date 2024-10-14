import { Axios } from "@/lib/Axios"
import { Icategory } from "@/types/Icategory"
const SearchCategoryApi = async(q:string) => {
  const response = await Axios.post<{payload:Icategory[]}>("/category/search",{q})
  return response.data
}
export default SearchCategoryApi