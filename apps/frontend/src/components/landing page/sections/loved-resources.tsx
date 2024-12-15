import React from "react";
import HeadingComp from "../components/heading-comp";
import { FaPlus } from "react-icons/fa";
import UpvoteBtn from "@/components/global/upvote-btn";
import useLoadResourceFeed from "@/hooks/feed/useLoadResourceFeed";
import Link from "next/link";
import ResourceLoader from "../loader/resource-loader";
import SaveBtn from "@/components/global/save-btn";

export default function LovedResources() {
  const { data, isLoading } = useLoadResourceFeed();
  const q = data?.payload;
  if (isLoading) return <ResourceLoader />;
  return (
    <>
      <HeadingComp text={"❤️ Loved Resources"} />
      <div className="flex flex-wrap  gap-4 mb-4 w-full">
        {q?.map((resource, index) => (
          <section
            key={index}
            className="bg-secondary-foreground  py-3 text-white  rounded-md px-3 transition-colors   lg:w-[32%] max-lg:w-[48%] max-md:w-[98%] "
          >
            <main
              
              className="flex flex-row gap-4  justify-between items-center h-max py-0   "
            >
              <Link  href={`/resource/${resource._id}`} >
              <h2 className=" text-[0.85rem] max-lg:text-[1rem] max-lg:font-semibold  whitespace-pre-wrap ">
                {resource.title}
              </h2>
              </Link>

              <div className="flex gap-1 items-center">
                <UpvoteBtn value={resource.upvotes} id={resource._id} isUpvoted={resource.isUpvoted}/>
                <SaveBtn minimal id={resource._id} isSaved={resource.isSaved} />
              </div>
            </main>
          </section>
        ))}

        <Link
          href={"/resource/create"}
          className="bg-secondary border-gray-700 py-3 hover:bg-white   rounded-md px-4 hover:border-black border border-dashed  transition-colors  lg:w-[32%] max-lg:w-[49%] max-md:w-[98%]"
        >
          <div className="flex flex-row   gap-2 items-center h-max py-0   ">
            <FaPlus overlineThickness={1} />
            <h1 className="font-semibold ">Create your own resource</h1>
          </div>
        </Link>
      </div>
    </>
  );
}
