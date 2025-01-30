import CollectCustomLinkApi from "@/api/resource-collection/collect-custom-link.api";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
const useCollectCustomLink = () => {
  
    return useMutation({
      mutationKey: ["collectCustomLink"],
      mutationFn: (payload:{collectionId:string,linkPayload:{title:string,description:string,url:string,tags:string[]}}) => CollectCustomLinkApi(payload),
      onSuccess() {
        toast.success("Link saved successfully");
      },
     onError() {
            toast.error("Failed to save link");
     },

    });
};

export default useCollectCustomLink;
