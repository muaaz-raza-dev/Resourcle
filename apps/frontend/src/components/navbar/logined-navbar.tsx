import React from "react";
import ActiveNavLinkWrapper from "../global/active-nav-link-wrapper";
import { IoMdAdd } from "react-icons/io";
import ProfileMenu from "./logined/profile-menu";
import {  BsCollectionFill } from "react-icons/bs";
import { BetaSearchBar } from "../searchbar/beta-searchbar";
export default function LoginedNavbar() {
  return (
          <div className="flex gap-2 items-center">
            <BetaSearchBar/>            
            <ActiveNavLinkWrapper tooltip={"Create new project"} link="/resource/create" >
              <IoMdAdd />
            </ActiveNavLinkWrapper>
    <div className="max-md:hidden">
            <ActiveNavLinkWrapper tooltip={"Resource Collection "} link="/collection/">
              <BsCollectionFill  />
            </ActiveNavLinkWrapper>
    </div>
            <ProfileMenu />
          </div>
        
  );
}
