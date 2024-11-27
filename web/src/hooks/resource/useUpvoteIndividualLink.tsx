import UpvoteIndividualLinkApi from "@/api/resource/upvote-ind-link.api";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
const useUpvoteIndividualLink = () => {

    return useMutation({
      mutationKey: "Upvote individual link",
      mutationFn: (payload:{resource_id:string,link_id:string}) => UpvoteIndividualLinkApi(payload),
      onError(){
        toast.error("Somthing went wrong :!")
      }
    });
};

export default useUpvoteIndividualLink;
