"use client";
import useSearchResource from "@/hooks/resource/useSearchResource";
import { searchedResourcesAtom } from "@/state/search-resource.atom";
import { useSearchParams } from "next/navigation";
import { FaSliders } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import { AdvancedFilterFieldsDialog } from "./Advanced-Filter/advanced-filter-fields-dialog";
import SearchTypeFilterSelect from "./search-type-filter-select";
export default function FilterbarSearched() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [{total, }] = useRecoilState(searchedResourcesAtom);
  const {  isLoading } = useSearchResource();


  return (
    <div className="w-full  py-6 md:py-8 mx-auto space-y-8 border-b ">
      <div className=" w-full flex justify-between items-start ">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold ">
            <span className="text-muted-foreground">Results for</span> {search}
          </h1>
          {!isLoading && (
            <div className="text-muted-foreground">
              <span className="font-semibold max-md:text-sm text-foreground">
                {total}  results
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
         <SearchTypeFilterSelect/>
          <AdvancedFilterFieldsDialog>
            <button className="text-sm border bg-white rounded-md h-10 px-3 font-semibold flex items-center gap-2  " disabled>
              <FaSliders />
            </button>
          </AdvancedFilterFieldsDialog>
        </div>
      </div>
    </div>
  );
}
