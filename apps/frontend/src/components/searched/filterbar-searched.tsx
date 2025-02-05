"use client";
import useSearchResource from "@/hooks/resource/useSearchResource";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/components/ui/select";
import { searchedResourcesAtom, SearchedSortOptions } from "@/state/search-resource.atom";
import { useSearchParams } from 'next/navigation'
import { AiFillFire } from "react-icons/ai";
import { FaSliders } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import { useRecoilState } from "recoil";
export default function FilterbarSearched() {
    const searchParams = useSearchParams()
    const [{total,sort},setAtom] = useRecoilState(searchedResourcesAtom)
    const search = searchParams.get('search')
    const { mutate,isLoading } = useSearchResource();

    function HandleSortChange(val: SearchedSortOptions ){
      setAtom(e => ({ ...e, sort: val }))
      mutate({sort:val})
    }

  return (
    
      <div className="w-full  py-6 md:py-8 mx-auto space-y-8 border-b ">
        <div className=" w-full flex justify-between items-start ">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold "><span className="text-muted-foreground">Results for</span> {search}</h1>
          {!isLoading&& 
          <div className="text-muted-foreground">
            <span className="font-semibold max-md:text-sm text-foreground">{total}</span> resource
          </div>
            }
        </div>

        <div className="flex items-center gap-2">
          <Select disabled={isLoading} value={sort} onValueChange={HandleSortChange}>

  <SelectTrigger className="md:min-w-[180px] max-md:w-[130px] border border-border ring-offset-transparent bg-white outline-none h-10 ">
    <SelectValue className="hover:!bg-slate-300" />
  </SelectTrigger>
  <SelectContent align="end">
    <SelectItem value="upvotes" className="hover:!bg-border ">
      <div className="flex gap-2 items-center">
      <AiFillFire fill="rgb(249 115 22)" size={18}/>
      <p>
       Most Upvoted
      </p>
      </div>
      </SelectItem>
    <SelectItem value="createdAt" className="hover:!bg-border">
    <div className="flex gap-2 items-center">
      <MdAccessTime />
      <p>
      Recent
      </p>
      </div>
    </SelectItem>
  </SelectContent>
</Select>
<button className="text-sm border bg-white rounded-md h-10 px-3 font-semibold flex items-center gap-2  " disabled><FaSliders /> </button>


          </div>
        </div>


     
    </div>
    
  )
}
