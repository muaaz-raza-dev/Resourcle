"use client";

import {useState,useEffect} from "react";
import {Search} from "lucide-react";
import {   CommandDialog, } from "@/shadcn/components/ui/command";
import { MdKeyboardCommandKey } from "react-icons/md";
import { useHotkeys } from "react-hotkeys-hook";
import { useRouter, useSearchParams } from "next/navigation";
import useSearchResource from "@/hooks/resource/useSearchResource";
import useAdvancedPartialSearch from "@/hooks/searchbar/useAdvancedPartialSearch";
import { useDebouncedCallback } from "use-debounce";
import RequestLoader from "../loader/request-loading";
import SearchbarResults from "./searchbar-results";
import { Input } from "@/shadcn/components/ui/input";
import NotSearchedFallback from "./not-searched-fallback";

export function BetaSearchBar() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const searched = useSearchParams();
  const searchTerm = searched.get("search");
  const { push } = useRouter();
  const { mutate: search } = useSearchResource();
  const {
    mutate: partialSearch,
    isLoading: PartialSearchLoading,
    data: searchResults,
  } = useAdvancedPartialSearch();
  const debounced = useDebouncedCallback((value: string) => {
    if (value) {
      partialSearch(value);
    }
  }, 800);
  useEffect(() => {
    setInput(searchTerm || "");
  }, [searchTerm]);

  useHotkeys("ctrl+k", (e) => {e.preventDefault();setOpen(true);});
function DetailedSearch(){
  const params = new URLSearchParams(window.location.search);
  params.set("search", input || "");
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${params}`
  );
  search({ search: input });
}
  function HandleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key == "Enter") {
      if(data&&data.resources.length==0){
        return;
      }
        if (location.pathname.includes("/search")) {
          DetailedSearch()
          setOpen(false);
        } else {
          search({ search: input });
          push(`/search/?search=${input}`);
          setOpen(false);
        }
    }
  }
  

  function handleChange(value: string) {
    setInput(value);
    debounced(value);
  }
  const data = searchResults?.payload;
  return (
    <>
      <div


        className="flex border gap-2 items-center pl-2 pr-2  lg:w-[280px] max-lg:w-[180px]  rounded-md  whitespace-nowrap h-8 
    bg-white justify-between"
        onClick={() => setOpen(true)}
      >
        <div className="flex gap-2 items-center">
          <Search size={18} />
          <p className="text-muted-foreground text-sm">Search for anything</p>
        </div>
        <div
          className={
            "flex gap-1 border text-xs bg-secondary items-center px-1 rounded font-semibold "
          }
        >
          <MdKeyboardCommandKey />
          <span className="text-xs font-medium">K</span>
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen} >
        <div className="flex  items-center h-12 w-full rounded-md bg-transparent py-3 border-b px-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50">
        <Search size={20} className="text-muted-foreground"/>
      <Input
      placeholder="Search for Resources, Categories and Users"
      value={input}
      onChange={(e) => handleChange(e.target.value)}
      onKeyDown={HandleSearch}
      className="flex h-10 w-full rounded-md bg-transparent border-none shadow-none  text-sm outline-none "
      />
        </div>
        {PartialSearchLoading ? (
          <div className="center gap-2 text-muted-foreground my-5">
           <RequestLoader size="24" />
           <p>Searching</p>
          </div>
           )
            : 
        (
          data ? 
        <SearchbarResults Close={()=>{setOpen(false)}} data={data} DetailedSearchFunction={DetailedSearch} /> :
        <NotSearchedFallback/>
        
        )}
        
      </CommandDialog>
    </>
  );
}
