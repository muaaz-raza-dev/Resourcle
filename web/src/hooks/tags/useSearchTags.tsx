import SearchTagsApi from "@/api/category/search-tags.api";
import { searchedTagsAtom } from "@/state/tags.atom";
import { useMutation } from "react-query";
import {useSetRecoilState } from "recoil";

const useSearchTags = () => {
  const update = useSetRecoilState(searchedTagsAtom)
    return useMutation({
      mutationKey: "Search Tags",
      mutationFn: (q:string) => SearchTagsApi(q),
      onSuccess(data) {
        update(data.payload)
      }
    });
};

export default useSearchTags;
