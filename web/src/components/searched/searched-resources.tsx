import { useRecoilValue } from "recoil";
import { searchedResourcesAtom } from "@/state/search-resource.atom";
import { useMemo } from "react";
import NotAvailableFallbackSearched from "./not-available-fallback-searched";
import SearchedLoadMoreButton from "./searched-load-more-button";
import SkeletonResources from "./skeleton-resources";
import { Separator } from "@/shadcn/components/ui/separator";
import EachResourceComponent from "./resource/each-resource-component";
const ResourcesPerRequest  =+process.env.NEXT_PUBLIC_SEARCH_LIMIT||10;
export default function SearchedResources({
  isLoading,
}: {
  isLoading: boolean;
}) {
  const { resources, total, count } = useRecoilValue(searchedResourcesAtom);
  const FlatResources = useMemo( () => Object.values(resources).flat(), [resources]);
  return (
    <div className=" flex flex-col ">
      <div className="flex flex-col  gap-2">
        {FlatResources.map((resource) => (
          <EachResourceComponent
            resource={resource}
            key={resource._id}
            />
        ))}
      </div>
      {isLoading ? (
        <SkeletonResources />
      ) : (
        FlatResources.length == 0 && <NotAvailableFallbackSearched />
      )}
      {total > (count + 1) * ResourcesPerRequest ? <SearchedLoadMoreButton /> :
      <div className="flex flex-col center my-4 gap-2">
      <Separator/>
      <p className="mx-auto text-muted-foreground text-sm">You all caught up</p>
      </div>
      }
    </div>
  );
}
