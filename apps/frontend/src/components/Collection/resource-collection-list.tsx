import useGetResourceCollections from "@/hooks/resource-collection/useGetProfileCollection";
import { Badge } from "@/shadcn/components/ui/badge";
import clsx from "clsx";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BsCollectionFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import CreateResourceCollectionButton from "../user-profile/ResourceCollection/create-resource-collection-btn";

export default function ResourceCollectionList() {
  const { data, isLoading } = useGetResourceCollections({enabled:true});
  const id = useParams().id as string;
  const {push} = useRouter()
  useEffect(() => {
    if(data?.payload&&!id){
      push(`/collection/${data?.payload[0]._id}`)
    }
  }, [isLoading,id])
  if (isLoading) return  (
<section className="flex w-full flex-wrap gap-2">
<Skeleton width={300} height={50}/>
<Skeleton width={300} height={50}/>
<Skeleton width={300} height={50}/>
  </section>);
  
  return (
    <section className="flex w-full border-b pb-2 flex-wrap gap-2">
      {data?.payload.map((e) => {
        return (
          <Link
            href={`/collection/${e._id}`}
            key={e._id}
            className={clsx("flex items-center w-[32%] max-lg:w-[49%] max-md:w-full justify-between py-2 hover:bg-secondary transition-colors rounded-md cursor-pointer px-6 ",e._id==id&&"bg-secondary-foreground text-white border-none hover:bg-secondary-foreground")}
          >
            <div className="flex items-center gap-2">
              <BsCollectionFill className=" h-4 w-4" />
              <h2 className="font-semibold">{e.name}</h2>
            </div>
            <Badge
              variant={"secondary"}
              className="text-sm text-muted-foreground"
            >
              {e.links}
            </Badge>
          </Link>
        );
      })}
      <CreateResourceCollectionButton>
        <button aria-label="create new collection" className={"flex items-center w-[32%] max-lg:w-[49%] max-md:w-full justify-between py-2 bg-secondary transition-colors border rounded-md cursor-pointer px-6 border-dashed "}>
            <div className="flex items-center gap-2">
              <FaPlus className=" h-4 w-4" />
              <h2 className="font-semibold"> Create a new collection </h2>
            </div>
          </button>
      </CreateResourceCollectionButton>
    </section>
  );
}
