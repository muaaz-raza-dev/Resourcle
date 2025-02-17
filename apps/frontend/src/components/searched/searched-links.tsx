import { useRecoilValue } from "recoil";
import { searchedAtom } from "@/state/search-resource.atom";
import NotAvailableFallbackSearched from "./not-available-fallback-searched";
import SearchedLoadMoreButton from "./searched-load-more-button";
import SkeletonResources from "./skeleton-resources";
import LinksListSearchedComponent from "./links/links-list-searched-component";
const LinksPerRequest  =+(process.env.NEXT_PUBLIC_SEARCH_LINK_LIMIT??10);
export default function SearchedLinks({
  isLoading,
}: {
  isLoading: boolean;
}) {
  const {  total, count,type } = useRecoilValue(searchedAtom);
  if(type == "resources"){ return null;}
  return (
    <div className=" flex flex-col my-4">
      <div className="flex flex-col gap-2">
        <LinksListSearchedComponent/>
      </div>
      {isLoading ? (
        <SkeletonResources />
      ) : (
        total == 0 && <NotAvailableFallbackSearched />
      )}
      {total > (count+1 ) * LinksPerRequest ? <SearchedLoadMoreButton /> : null}
    </div>
  );
}
