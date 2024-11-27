import useSearchResource from "@/hooks/resource/useSearchResource";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, KeyboardEvent, useEffect, useState,useRef } from "react";
import { useHotkeys } from 'react-hotkeys-hook'
import { MdKeyboardCommandKey } from "react-icons/md";
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
    <div className="flex border gap-2 items-center pl-2 pr-2  w-[280px] rounded-md  whitespace-nowrap h-8 
    bg-white" onClick={()=>ref.current?.focus()}>
      <Search size={18} />
      <input
        ref={ref}
        onChange={handleChange}
        onKeyDown={HandleSearch}
        placeholder="Search for anything "
        value={input || undefined}
        className="border-none outline-none w-full text-sm !bg-transparent"
      />
      <div className="flex gap-1 border text-xs bg-secondary items-center px-1 rounded font-semibold">
            <MdKeyboardCommandKey />
            <span className="text-xs font-medium">K</span>
      </div>

    </div>
  );
}
