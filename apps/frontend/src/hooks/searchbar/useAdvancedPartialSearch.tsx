import AdvancedPartialSearchApi from "@/api/search/advanced-partial-search.api";
import { useMutation } from "react-query";
const useAdvancedPartialSearch = () => {
    return useMutation({
      mutationKey: ["partial ","advanced ","search"],
      mutationFn: (q:string) => AdvancedPartialSearchApi(q),
    });
};

export default useAdvancedPartialSearch;
