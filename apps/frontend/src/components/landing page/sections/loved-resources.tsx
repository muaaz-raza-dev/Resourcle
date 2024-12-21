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
          <motion.div
          className="bg-gradient-to-br from-secondary to-secondary/80 rounded-lg shadow-lg overflow-hidden"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <Link href={`/resource/${resource._id}`} className="block h-full">
            <div className="p-6 flex flex-col h-full">
              <h2 className="text-xl font-bold mb-2 text-primary">{resource.title}</h2>
              <p className="text-muted-foreground mb-4 flex-grow">
                {resource.description.slice(0, 100)}
                {resource.description.length > 100 ? '...' : ''}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <UpvoteBtn value={resource.upvotes} id={resource._id} isUpvoted={resource.isUpvoted} />
                  <SaveBtn minimal id={resource._id} isSaved={resource.isSaved} />
                </div>
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRightIcon className="w-5 h-5 text-primary" />
                </motion.div>
              </div>
            </div>
          </Link>
        </motion.div>
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
