import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/shadcn/components/ui/select";
import { searchedAtom, SearchedSortOptions } from "@/state/search-resource.atom";
import { useRouter, useSearchParams } from "next/navigation";
import { AiFillFire } from "react-icons/ai";
import { LuMousePointerClick } from "react-icons/lu";
import { MdAccessTime } from "react-icons/md";
import { useRecoilState } from "recoil";

export default function AdvancedFiltersSortFeild() {
    const searchParams = useSearchParams();
    const [{  filters ,type}, setAtom] = useRecoilState(searchedAtom);
    const router = useRouter(); 

    function HandleSortChange(val: SearchedSortOptions) {
      const params = new URLSearchParams(searchParams.toString()); 
      params.set("sort", val); 
      router.replace(`?${params.toString()}`); 
      setAtom((e) => ({ ...e, filters:{...e.filters,[type]:{sort:val}}}))
    };
    
  return (
        <Select value={type=="links"?filters.links.sort:filters.resources.sort} onValueChange={HandleSortChange}>
            <SelectTrigger className="md:min-w-[180px] max-md:w-[130px] border border-border ring-offset-transparent bg-white outline-none h-10 ">
              <SelectValue className="hover:!bg-slate-300" />
            </SelectTrigger>
            <SelectContent align="end">
              
              <SelectItem value="upvotes" className="hover:!bg-border ">
                <div className="flex gap-2 items-center">
                  <AiFillFire fill="rgb(249 115 22)" size={18} />
                  <p>Most Upvoted</p>
                </div>
              </SelectItem>

              <SelectItem value="updatedAt" className="hover:!bg-border">
                <div className="flex gap-2 items-center">
                  <MdAccessTime />
                  <p>Recent</p>
                </div>
              </SelectItem>
      {
        type=="links" && (
          <SelectItem value="clicks" className="hover:!bg-border">
                <div className="flex gap-2 items-center">
                  <LuMousePointerClick />
                  <p>Most Clicked</p>
                </div>
              </SelectItem>
              )
            }
            </SelectContent>
          </Select>
  )
}
