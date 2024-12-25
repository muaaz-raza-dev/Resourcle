import CreateResourceCollectionApi from "@/api/resource-collection/create-collection.api";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import useGetResourceCollections from "./useGetProfileCollection";

export default function useCreateResourceCollection() {
    const {refetch} = useGetResourceCollections()
  return useMutation({
    mutationFn: (payload: { name: string }) =>
      CreateResourceCollectionApi(payload),
    mutationKey: "Create Resource Collection",
    onSuccess() {
      toast.success("Collection Created successfully ");
      refetch()
    },
    onError() {
      toast.error("An error occured. Try again later");
    },
  });
}
