import CollectResourceLinkApi from "@/api/resource-collection/collect-resource.api";
import { ResourceCollectionwrtLinkPayload } from "@/api/resource-collection/get-collections-wrt-link.api";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
const useCollectResourceLink = () => {
    return useMutation({
      mutationKey:"Add Link To collections",
      mutationFn: (payload:{link_id:string,collections:ResourceCollectionwrtLinkPayload[]}) => CollectResourceLinkApi(payload),
        onError(){
            toast.error("Somthing went wrong. Please try again")
        }
    });
};

export default useCollectResourceLink;
