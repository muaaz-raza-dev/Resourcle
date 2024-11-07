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
            className="bg-secondary border-gray-200  py-3  rounded-md px-3 hover:border-gray-500 border border-transparent transition-colors   w-[32%] "
          >
            <main
              
              className="flex flex-row gap-4  justify-between items-center h-max py-0   "
            >
              <Link  href={`/resource/${resource._id}`} >
              <h2 className="font-semibold text-[0.9rem]  whitespace-pre-wrap ">
                {resource.title}
              </h2>
              </Link>

              <div className="flex gap-1 items-center">
                <UpvoteBtn value={`${resource.upvotes}`} id={resource._id} isUpvoted={resource.isUpvoted}/>
                <SaveBtn minimal id={resource._id} isSaved={resource.isSaved} />
              </div>
            </main>
          </section>
        ))}

        <Link
          href={"/resource/create"}
          className="bg-secondary border-gray-700 py-3 hover:bg-white   rounded-md px-4 hover:border-black border border-dashed  transition-colors w-[32%]"
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
