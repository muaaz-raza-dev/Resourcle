import SearchCategoryApi from "@/api/category/search-category.api";
import { searchedCategoryAtom } from "@/state/category.atom";
import { useMutation } from "react-query";
import {useSetRecoilState } from "recoil";

const useSearchCategory = () => {
  const update = useSetRecoilState(searchedCategoryAtom)
    return useMutation({
      mutationKey: "Search Category",
      mutationFn: (q:string) => SearchCategoryApi(q),
      onSuccess(data) {
        update(data.payload)
      }
    });
};

export default useSearchCategory;
