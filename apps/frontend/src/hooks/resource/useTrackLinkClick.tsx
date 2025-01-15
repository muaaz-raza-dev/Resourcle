import TrackLinkClicksApi from "@/api/resource/track-links-click.api";
import { useMutation } from "react-query";
const useTrackLinkClick = () => {
    return useMutation({
      mutationKey: ["track","link click"],
      mutationFn: (id:string) => TrackLinkClicksApi(id),
    });
};

export default useTrackLinkClick;
