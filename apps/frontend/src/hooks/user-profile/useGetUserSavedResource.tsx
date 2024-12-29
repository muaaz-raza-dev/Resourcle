import GetUserSavedResourcesApi from "@/api/user-profile/get-user-saved-resources.api";
import { UserProfileResourceAtom } from "@/state/user-profile-resource.atom";
import { useParams } from "next/navigation";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
export default function useGetUserSavedResource() {
  const [{saved: { count, sort: sortP }},setValue] = useRecoilState(UserProfileResourceAtom);
  const userid = useParams().user as string;
  return useMutation({
    mutationKey: ["saved", userid],
    mutationFn: (directParams?:{count?:number}) => GetUserSavedResourcesApi({count: directParams?.count||count,sort: sortP,userid: userid || "",}),
    onSuccess({ payload }) {
      setValue((prev) => ({
        ...prev,
        saved: {
          ...prev.saved,
          resources: { ...prev.saved.resources, [prev.saved.count]: payload.resources },
          total: payload.total,
        },
      }));
    },
    onSettled(){
      setValue((prev) => ({...prev,saved:{...prev.saved,isLoading:false}}))
    }
  });
}
