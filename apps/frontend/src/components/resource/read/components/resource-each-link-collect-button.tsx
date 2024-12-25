import { ResourceCollectionwrtLinkPayload } from "@/api/resource-collection/get-collections-wrt-link.api";
import RequestLoader from "@/components/loader/request-loading";
import useCollectResourceLink from "@/hooks/resource-collection/useCollectResourceLink";
import useGetCollectionsWrtLink from "@/hooks/resource-collection/useGetCollectionsWRTLink";
import { Badge } from "@/shadcn/components/ui/badge";
import { Button } from "@/shadcn/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog";
import { Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsCollectionFill } from "react-icons/bs";
import { MdAddLink } from "react-icons/md";

export default function ResourceEachLinkCollectButton({
  link_id,
}: {
  link_id: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex gap-2  justify-end font-semibold items-center text-xs ">
          <button
            className={`relative aspect-square  text-xs font-semibold  h-8 hover:bg-border transition-colors  border rounded-md p-1 px-2`}
          >
            <MdAddLink fontSize={14} />
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[395px]">
        <DialogHeader>
          <DialogTitle>Resource Collections </DialogTitle>
        </DialogHeader>
        <CollectionList id={link_id} setOpen={setOpen}     />
      </DialogContent>
    </Dialog>
  );
}

function CollectionList({ id,setOpen }: { id: string;setOpen:React.Dispatch<React.SetStateAction<boolean>> }) {
  const [state, setState] = useState<ResourceCollectionwrtLinkPayload[]>([]);
  const { isLoading: isFetching,data } = useGetCollectionsWrtLink(id,setState);
  useEffect(() => {
    if(data){
      setState(data.payload)
    }
  }, [data])
  const { mutateAsync, isLoading } = useCollectResourceLink();
  async function handleCollect() {
    await mutateAsync({ link_id: id, collections: state });
    setOpen(false)
    toast.success("Link added to collections");
  }
  function handleCollection(collectionId: string, isCollected: boolean) {
    setState((prev) =>
      prev.map((collection) =>
        collection._id === collectionId
          ? { ...collection, isCollected }
          : collection
      )
    );
  }
  if (isFetching) {
    return (
      <div className="center">
        <RequestLoader />
      </div>
    );
  }
  return (
    <>
      {state?.map((collection) => (
        <EachCollectionItem
          key={collection._id}
          collection={collection}
          onChange={handleCollection}
        />
      ))}
      <Button onClick={handleCollect}> {!isLoading?"Confirm":<RequestLoader  size="16"/>} </Button>
    </>
  );
}

function EachCollectionItem({
  collection,
  onChange,
}: {
  collection: ResourceCollectionwrtLinkPayload;
  onChange: (collectionId: string, isCollected: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2 px-2 border rounded-md">
      <div className="flex items-center gap-4">
        <Checkbox
          checked={collection.isCollected}
          onChange={(e) => {
            onChange(collection._id, e.target.checked);
          }}
        />
    <BsCollectionFill  className="w-3 h-3"/>
        <span className="font-semibold">{collection.name}</span>
      </div>
      <Badge variant={"secondary"} className=" mr-2  ">
        {collection.links}
      </Badge>
    </div>
  );
}

