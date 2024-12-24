import GetCollectionLinks from "@/api/resource-collection/get-collection-links.api";
import { ResourceCollectionAtom } from "@/state/resource-collection.atom";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
const useGetCollectionLinks = () => {
  const setState = useSetRecoilState(ResourceCollectionAtom)
    return useMutation({
      mutationKey: "collection links",
      mutationFn: (payload:{id:string,count:number}) => GetCollectionLinks(payload),
      onSuccess(data) {
        setState(e=>({...e,resources:data.payload,iterable:data.payload,count:e.count+1}))
        
      },
      onError(){
        toast.error("Failed to get collection links")
      }
    });
};

export default useGetCollectionLinks;
