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
  const { resources: { total }} = useRecoilValue(UserProfileResourceAtom);
  useEffect(() => {
    mutate(undefined);
  }, []);

  return (
    <>
        <SwitchPublicOperatorComp />
    <header className="flex justify-between items-center">
      <p className="text-muted-foreground  text-sm">{total} resource(s)</p>
      <section className="flex gap-4 max-md:justify-between ">
        <SortResourceOperatorComp />
      </section>
    </header>
    </>
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
    setState((val) => ({...val,resources: {  ...val.resources,resources:{}, sort: value,isLoading:true ,count:0},}));
    mutate({ sort: value,count:0 });
  }
  return (
    <div className="flex gap-2 md:items-center ">
    <Select
      className="w-[120px] max-md:text-sm"
      disabled={isLoading}
      options={[
        { value: "createdAt", label: "recent" },
        { label: "popular", value: "upvotes" },
      ]}
      onChange={handleSortOptionChange}
      value={sort}
      />
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
      resources: { ...val.resources,resources:{}, isPrivate: value ,isLoading:true,count:0},
    }));
    mutate({ isPrivate: value,count:0 });
  }
  if(!isLogined||!user||userid!=user._id) return null; // only logged in users can switch between public and private resources


  return (
    <div className="flex gap-3 items-center w-full justify-between border rounded-md p-2 mb-2">
      <div className="">
      <div className="  flex items-center gap-2 text-sm font-semibold ">
        <FaLock /> Private Resources
      {isLoading? <RequestLoader size="18" />:null}
      </div>
 
      </div>
  
      <Switch
      disabled={isLoading}
        checked={isPrivate}
        onCheckedChange={handlePublicPrivateOptionChange}
      />
    </div>
  );
}
