import React from "react";
import Link from "next/link";
import Image from "next/image";
import Searchbar from "./logined/searchbar";
import { FaInbox } from "react-icons/fa";
import ActiveNavLinkWrapper from "../global/active-nav-link-wrapper";
import { IoMdAdd } from "react-icons/io";
import { GoIssueOpened } from "react-icons/go";
import ProfileMenu from "./logined/profile-menu";
import HeaderLabel from "./logined/header-label";
export default function LoginedNavbar() {
  return (
    <nav className="  border-b border z-[100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image height={50} width={50} src="/logo.svg" alt="Logo" />
              <HeaderLabel/>
            </Link>
          </div>
          <div className="flex gap-2 items-center">
            <Searchbar />

            <ActiveNavLinkWrapper tooltip={"Create new project"} link="/resource/create">
              <IoMdAdd />
            </ActiveNavLinkWrapper>

            <ActiveNavLinkWrapper tooltip={"You have no unread issues"}>
              <GoIssueOpened />
            </ActiveNavLinkWrapper>

            <ActiveNavLinkWrapper tooltip={"You have no unread notification"}>
              <FaInbox />
            </ActiveNavLinkWrapper>

            <ProfileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
