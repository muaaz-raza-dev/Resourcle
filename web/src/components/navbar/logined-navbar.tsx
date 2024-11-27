import React from "react";

import Searchbar from "./logined/searchbar";
import ActiveNavLinkWrapper from "../global/active-nav-link-wrapper";
import { IoMdAdd } from "react-icons/io";
import ProfileMenu from "./logined/profile-menu";
export default function LoginedNavbar() {
  return (
    
          <div className="flex gap-2 items-center">
            <Searchbar />

            <ActiveNavLinkWrapper tooltip={"Create new project"} link="/resource/create">
              <IoMdAdd />
            </ActiveNavLinkWrapper>

            <ProfileMenu />
          </div>
        
  );
}
