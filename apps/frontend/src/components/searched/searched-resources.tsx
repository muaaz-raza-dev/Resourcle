import { useRecoilValue } from "recoil";
import { searchedAtom } from "@/state/search-resource.atom";
import NotAvailableFallbackSearched from "./not-available-fallback-searched";
import SearchedLoadMoreButton from "./searched-load-more-button";
import SkeletonResources from "./skeleton-resources";
import EachResourceComponent from "./resource/each-resource-component";
const ResourcesPerRequest  =+(process.env.NEXT_PUBLIC_SEARCH_RESOURCE_LIMIT??5);
export default function SearchedResources() {
  const { payload:{resources}, total, count,type,isLoading } = useRecoilValue(searchedAtom);
  if(type == "links") return null;
  return (
    <div className=" flex flex-col my-8">
      <div className="flex flex-col  gap-2">
        {resources.map((resource) => (
          <EachResourceComponent
            resource={resource}
            key={resource._id}
            />
        ))}
      </div>
      {isLoading ? (
        <SkeletonResources />
      ) : (
        resources.length == 0 && <NotAvailableFallbackSearched />
      )}
      {total > (count+1 ) * ResourcesPerRequest ? <SearchedLoadMoreButton /> : null}
    </div>
  );
}
