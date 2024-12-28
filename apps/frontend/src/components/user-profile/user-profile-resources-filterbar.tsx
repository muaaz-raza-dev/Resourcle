import useGetUserResources from "@/hooks/user-profile/useGetUserResource";
import { Switch } from "@/shadcn/components/ui/switch";
import { SearchedSortOptions } from "@/state/search-resource.atom";
import { UserProfileResourceAtom } from "@/state/user-profile-resource.atom";
import { Select } from "antd";
import React, { useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import RequestLoader from "../loader/request-loading";
import { authAtom } from "@/state/auth.atom";
import { useParams } from "next/navigation";

export default function UserProfileResourcesFilterbar() {
  const { mutate } = useGetUserResources();
  const {
    resources: { total },
  } = useRecoilValue(UserProfileResourceAtom);
  useEffect(() => {
    if(total==0)mutate(undefined);
  }, []);

  return (
    <header className="flex justify-between items-center">
      <p className="text-muted-foreground  text-sm">{total} resources</p>
      <section className="flex gap-4 max-md:justify-between ">
        <SwitchPublicOperatorComp />
        <SortResourceOperatorComp />
      </section>
    </header>
  );
}

function SortResourceOperatorComp() {
  const [
    {
      resources: { sort },
    },
    setState,
  ] = useRecoilState(UserProfileResourceAtom);
  const { mutate,isLoading } = useGetUserResources();
  function handleSortOptionChange(value: SearchedSortOptions) {
    setState((val) => ({
      ...val,
      resources: { ...val.resources, sort: value,isLoading:true },
    }));
    mutate({ sort: value });
  }
  return (
    <div className="flex gap-2 md:items-center ">
    <Select
      className="w-[120px] max-md:text-sm"
      options={[
        { value: "createdAt", label: "recent" },
        { label: "popular", value: "upvotes" },
      ]}
      onChange={handleSortOptionChange}
      value={sort}
      />
      {isLoading? <RequestLoader size="18"/>:null}
      </div>
  );
}

function SwitchPublicOperatorComp() {
  const {isLogined,user} = useRecoilValue(authAtom);
  
  const userid = useParams().user as string
  const [ {resources: { isPrivate },},setState,] = useRecoilState(UserProfileResourceAtom);
  const { mutate,isLoading } = useGetUserResources();
  function handlePublicPrivateOptionChange(value: boolean) {
    setState((val) => ({
      ...val,
      resources: { ...val.resources, isPrivate: value ,isLoading:true},
    }));
    mutate({ isPrivate: value });
  }
  if(!isLogined||!user||userid!=user._id) return null; // only logged in users can switch between public and private resources


  return (
    <div className="flex gap-3 items-center">
      {/* <div className=" text-xs flex items-center gap-1">
        <FaGlobe /> Public
      </div> */}
      <Switch
        checked={isPrivate}
        onCheckedChange={handlePublicPrivateOptionChange}
      />
      <div className=" text-xs flex items-center gap-1">
        <FaLock /> Private
      </div>
      {isLoading? <RequestLoader size="18"/>:null}
    </div>
  );
}
