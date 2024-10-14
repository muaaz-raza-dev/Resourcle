"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
const routesMap = {
  "/project/create": "New Project",
  "/": "Dashboard",
};
export default function HeaderLabel() {
  const [active, setActive] = useState("Dashboard");
  const pathname: string = usePathname();
  function ValidateLabel() {
    setActive(routesMap[pathname as keyof typeof routesMap]);
  }
  useEffect(() => {
    ValidateLabel();
  }, [pathname]);
  return (
    <span className="pl-2 text-lg hover:bg-muted p-2 py-1 transition-colors rounded-md font-semibold text-gray-800 ">
      {active}
    </span>
  );
}
