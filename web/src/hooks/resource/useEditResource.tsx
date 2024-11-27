import EditResourceApi, { FetchResourceTobeEdit } from "@/api/resource/edit-resource.api";
import { searchedTagsAtom } from "@/state/tags.atom";
import { IResource } from "@/types/Iresource";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
const useEditResource = () => {
  const id = useParams().id as string ;
    return useMutation({
      mutationKey: "Edit Resource",
      mutationFn: (payload:{payload: IResource}) => EditResourceApi({...payload,resource_id: id||""}),
      onSuccess() {
        toast.success("Resource edited successfully")
      },
      onError(){
        toast.error("Failed to edit resource")
      }
    });
};

export const useFetchEditableResource = (enabled:boolean,reset:(payload:IResource)=>void) => {
  const setTags = useSetRecoilState(searchedTagsAtom)
  const id = useParams().id as string ;
  return useQuery({
    queryKey:[ "Resource:edit",id],
    refetchOnWindowFocus:false,
    staleTime: 1000 * 60 * 5, 
    enabled:enabled&&!!id,
    onSuccess: ({payload}) =>{
       reset(payload)
      setTags(payload.tagObjects)
    },
    queryFn: () => FetchResourceTobeEdit(id||""),
    retry: 2,
  });
};
export default useEditResource;
