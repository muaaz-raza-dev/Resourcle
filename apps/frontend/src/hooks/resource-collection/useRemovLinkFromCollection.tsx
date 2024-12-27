import { IcollectedResourceLink } from '@/api/resource-collection/get-collection-links.api';
import RemoveResourceCollection from '@/api/resource-collection/remove-link-collection.api';
import { ResourceCollectionAtom } from '@/state/resource-collection.atom';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';

export default function useRemoveLinkFromCollection(linkId:string) {
    
    const setState = useSetRecoilState(ResourceCollectionAtom)
    return useMutation({
        mutationKey: "remove collection links",
        mutationFn: (payload:{linkId:string,collectionId:string}) => RemoveResourceCollection(payload),
        onSuccess() {
          const filteredResources =(e:IcollectedResourceLink[])=> e.filter(e=>e._id!==linkId)
        setState(e=>({...e,resources:filteredResources(e.resources),iterable:filteredResources(e.resources)}))
        toast.success("Link removed from collection")
        },
        onError(){
          toast.error("Failed to remove link from collection")
        }
      });
}
