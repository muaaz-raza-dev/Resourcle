import CollectCustomLinkApi from "@/api/resource-collection/collect-custom-link.api";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
const useCollectCustomLink = () => {
  
    return useMutation({
      mutationKey: "collect Custom link",
      mutationFn: (payload:{collectionId:string,linkPayload:{title:string,description:string,url:string,}}) => CollectCustomLinkApi(payload),
      onSuccess(data) {
        toast.success(`Link saved to ${data.payload.name} successfully 🥳`);
      },
     onError() {
            toast.error("Failed to save link");
     },

    });
};

export default useCollectCustomLink;
