import useSearchResource from "@/hooks/resource/useSearchResource";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, KeyboardEvent, useEffect, useState,useRef } from "react";
import { useHotkeys } from 'react-hotkeys-hook'
export default function Searchbar() {
  const [input, setinput] = useState("");
  const searched = useSearchParams();
  const ref = useRef<HTMLInputElement|null>(null)
  const searchTerm = searched.get("search");
  const { mutate } = useSearchResource();
  const { push } = useRouter();

  useEffect(() => {
    setinput(searchTerm || "");
  }, [searchTerm]);
  useHotkeys('shift+k', () =>ref?.current?.focus())
  function HandleSearch(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key == "Enter") {
      if (location.pathname.includes("/search")) {
        const params = new URLSearchParams(window.location.search);
        params.set("search", input || "");
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}?${params}`
        );
        mutate({search:input});
      } else {
        push(`/search/?search=${input}`);
      }
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setinput(e.target.value);
  }

  return (
    <div className="flex border gap-2 border-secondary-foreground items-center pl-2 pr-4  w-[250px] rounded-md  whitespace-nowrap h-8 ">
      <Search size={18} />
      <input
        ref={ref}
        onChange={handleChange}
        onKeyDown={HandleSearch}
        placeholder="Search for anything <Shift+k>"
        value={input || undefined}
        className="border-none outline-none w-full text-sm"
      />
    </div>
  );
}
