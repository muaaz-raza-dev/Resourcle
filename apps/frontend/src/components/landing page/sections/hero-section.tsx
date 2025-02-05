import React from "react";
import { Search } from "lucide-react";
import SearchingAnimation from "./searching-animation";

export default function HeroSection() {
  return (
    <div className="w-full relative overflow-hidden center mb-5 flex-col  ">
      <div className="border border-dashed border-accent font-semibold center gap-2 text-accent rounded-md px-3 py-1 ">
        <div className="flex  items-center text-black gap-1 ">
          <Search size={15} />
          Search
        </div>
        <p className="text-left max-sm:text-sm">
        Discover all useful links in one place
        </p>
      </div>

      <h1 className="text-5xl text-center pt-4 font-bold max-md:text-3xl  flex flex-col gap-2 bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-black/90 to-black/80">
        Your Place for Organized, High Quality Resources.
      </h1>

      <h2 className="text-center text-lg font-medium max-md:text-sm text-gray-600 tracking-tight mt-2"
      >
        Resourcle is a community driven effort to share resources, guides, and other
        educational content to help guide users in picking up a path and guide
        their learnings.
      </h2>
      <div className="mt-4 w-full">
        <SearchingAnimation/>
      </div>
      {/* <div className="flex mt-4 gap-3">
        <button className="text-white font-semibold px-4 py-2 bg-accent rounded-md hover:bg-primary-dark transition-colors">
          Save your favorite link
        </button>
        <button className=" font-semibold px-4 py-2 bg-secondary rounded-md hover:bg-primary-dark transition-colors">
          Create resource
        </button>
      </div> */}
    </div>
  );
}
