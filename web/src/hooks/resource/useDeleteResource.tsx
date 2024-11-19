import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import DeleteResourceApi from "../../api/resource/delete-resource.api";
import { useSearchParams } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { UserProfileResourceAtom } from "@/state/user-profile-resource.atom";
const itemsPerCount = Number(process.env.NEXT_PUBLIC_SEARCH_LIMIT || 10);
export default function useDeleteResource(index: number) {
  const paramsValue = useSearchParams().get("tabs");
  const activeTab = paramsValue == "saved" ? "saved" : "resources";
  const setValue = useSetRecoilState(UserProfileResourceAtom);
  return useMutation({
    mutationFn: (id: string) => DeleteResourceApi(id),
    onSuccess({ payload: id, message }) {
      toast.success(message);
      const fragment = Math.floor(index / itemsPerCount);
      setValue((p) => ({
        ...p,
        [activeTab]: {
          ...p[activeTab],
          resources: {
            ...p[activeTab].resources,
            [fragment]: p[activeTab].resources[fragment].filter(
              (r) => r._id !== id
            ),
          },
        },
      }));
    },
    onError({
      response: {
        data: { message },
      },
    }) {
      toast.error(message || "Internal server error. Try again later...");
    },
  });
}
