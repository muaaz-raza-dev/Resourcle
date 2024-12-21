import React from "react";
import HeadingComp from "../components/heading-comp";
import { FaPlus } from "react-icons/fa";
import UpvoteBtn from "@/components/global/upvote-btn";
import useLoadResourceFeed from "@/hooks/feed/useLoadResourceFeed";
import Link from "next/link";
import ResourceLoader from "../loader/resource-loader";
import SaveBtn from "@/components/global/save-btn";
import {motion} from "framer-motion"
export default function LovedResources() {
  const { data, isLoading } = useLoadResourceFeed();
  const q = data?.payload;
  if (isLoading) return <ResourceLoader />;
  return (
    <>
      <HeadingComp text={"❤️ Loved Resources"} />
      <div className="flex flex-wrap  gap-4 mb-4 w-full">
        {q?.map((resource, index) => (
          <motion.div
          key={index}
          className="bg-gradient-to-br from-secondary to-secondary/80 rounded-lg shadow-lg w-[32%] flex overflow-hidden justify-between p-2 px-4 items-center border"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2 ">
          <div className="w-2 h-2 rounded-full bg-accent"></div>
          <Link href={`/resource/${resource._id}`} className="">
              <h2 className="text-sm font-semibold ">{resource.title}</h2>
          </Link>
          </div>
                <motion.div
                  transition={{ duration: 0.2 }}
                >
                <div className="flex items-center space-x-2">
                  <UpvoteBtn value={resource.upvotes} id={resource._id} isUpvoted={resource.isUpvoted} />
                  <SaveBtn minimal id={resource._id} isSaved={resource.isSaved} />
                </div>
                </motion.div>
        </motion.div>
        ))}

        <Link
          href={"/resource/create"}
          className="bg-secondary border-gray-700 py-3 hover:bg-white   rounded-md px-4 hover:border-black border border-dashed  transition-colors  lg:w-[32%] max-lg:w-[49%] max-md:w-[98%]"
        >
          <div className="flex flex-row   gap-2 items-center h-max py-0   ">
            <FaPlus overlineThickness={1} />
            <h1 className="font-semibold text-sm">Create your own resource</h1>
          </div>
        </Link>
      </div>
    </>
  );
}