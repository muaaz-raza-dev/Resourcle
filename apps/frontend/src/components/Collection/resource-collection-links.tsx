import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilState} from "recoil";
import { ResourceCollectionAtom } from "@/state/resource-collection.atom";
import Skeleton from "react-loading-skeleton";
import useGetCollectionLinks from "@/hooks/resource-collection/useGetCollectionLinks";
import { useParams } from "next/navigation";
import ResoureCollectionEachResource from "./resoure-collection-each-resource";
export default function ResourceCollectionLinks() {
  
  const id = useParams().id as string;
  const [state] = useRecoilState(ResourceCollectionAtom);
  const limit = process.env.Collection_links_limit || 25;
  const { mutate, isLoading ,isSuccess} = useGetCollectionLinks();
  const fetchData = () => {
    mutate({ count: state.count, id });
  };
  React.useEffect(() => {
    mutate({ count:1, id });
  }, []);

  return (
    <InfiniteScroll
      dataLength={state.total}
      next={fetchData}
      hasMore={state.total >= state.count * +limit}
      className="flex flex-wrap gap-4   w-full h-max"
      loader={<Loader />}
    
    >
      {state.iterable.map((e, i) => (
        <ResoureCollectionEachResource key={i} data={e} />
      ))}
      {isSuccess && state.iterable.length==0 &&
      <div className="w-full text-center py-8 text-muted-foreground text-sm">
        No resource collected 
      </div>
      }
      {isLoading && <Loader />}
    </InfiniteScroll>
  );
}

function Loader() {
  return (
    <div className="w-full flex justify-center items-center gap-4">
      <Skeleton width={500} height={100} />
      <Skeleton width={500} height={100} />
      <Skeleton width={500} height={100} />
    </div>
  );
}
