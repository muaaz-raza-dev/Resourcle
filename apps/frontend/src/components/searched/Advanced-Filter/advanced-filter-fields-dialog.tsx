"use client";

import * as React from "react";
import { Button } from "@/shadcn/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog";
import { Label } from "@/shadcn/components/ui/label";
import AdvancedFiltersCategorySelectField from "./advanced-filters-category-field";
import AdvancedFiltersSortFeild from "./advanced-filters-sort-feild";
import { BiSort } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { useRecoilState } from "recoil";
import {
  defaultSearchedState,
  searchedAtom,
} from "@/state/search-resource.atom";
import useSearchResource from "@/hooks/resource/useSearchResource";
import RequestLoader from "@/components/loader/request-loading";
import useSearchLinks from "@/hooks/links/useSearchLinks";

export function AdvancedFilterFieldsDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const { mutateAsync:searchResoruceAsync,isLoading:isSearchingResources} = useSearchResource()
  const { mutateAsync:searchLinkAsync,isLoading:isSearchingLinks} = useSearchLinks()
  const [state,setState ]= useRecoilState(searchedAtom);
  
  async function ResetFilters() {
    setOpen(false);
    setState((e) => ({ ...defaultSearchedState, type: e.type }));
    if(state.type == "resources"){
      await searchResoruceAsync({...defaultSearchedState,sort:defaultSearchedState.filters.resources.sort})
      setOpen(false)
      return
    }
    if(state.type == "links"){
      await searchLinkAsync({count:0})
      setOpen(false)
      return;
    }

  }
  async function ApplyFilter(){
    setState((e) => ({ ...e,count:0,payload:{resources:[],links:[] } ,type: e.type }));
    if(state.type == "resources"){
      await searchResoruceAsync({...state,sort:defaultSearchedState.filters.resources.sort})
      setOpen(false)
      return
    }
    if(state.type == "links"){
      await searchLinkAsync({count:0})
      setOpen(false)
      return;
    }
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={(o)=>(!isSearchingLinks||!isSearchingResources)&&setOpen(o)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Results</DialogTitle>
          <DialogDescription>
            Apply filters to narrow down your search results.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-2">
          <div className="space-y-2">
            <Label htmlFor="sort by" className="items-center flex gap-1">
              
              <BiSort /> Sort by
            </Label>
            <AdvancedFiltersSortFeild />
          </div>
      {
        state.type== "resources" ? 
        <div className="space-y-2">
            <Label htmlFor="category" className="items-center flex gap-1">
              <MdCategory /> Select Categories
            </Label>
            <AdvancedFiltersCategorySelectField />
          </div> : null 
      }
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={ResetFilters}>
            Reset
          </Button>
          <Button disabled={isSearchingLinks||isSearchingResources} onClick={ApplyFilter}>
            {isSearchingLinks||isSearchingResources? <RequestLoader/>: "Apply Filters"}
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
