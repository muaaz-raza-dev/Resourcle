import { Switch } from "@/shadcn/components/ui/switch";
import { Select } from "antd";
import React from "react";
import { FaGlobe, FaLock } from "react-icons/fa";

export default function UserProfileResourcesFilterbar() {
  return (
    <header className="flex justify-between">
      <p className="text-muted-foreground">204 resources</p>
      <section className="flex gap-4">
        <div className="flex gap-3 items-center">
          <div className=" text-xs flex items-center gap-1">
            <FaGlobe /> Public
          </div>
          <Switch />
          <div className=" text-xs flex items-center gap-1">
            <FaLock /> Private
          </div>
        </div>
        <Select
          className="w-[120px]"
          options={[{ value: "recent" }, { value: "popular" }]}
          value={"recent"}
        />
      </section>
    </header>
  );
}
