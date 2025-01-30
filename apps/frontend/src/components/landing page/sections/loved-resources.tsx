import React from "react";
import HeadingComp from "../components/heading-comp";
import { FaPlus } from "react-icons/fa";
import UpvoteBtn from "@/components/global/upvote-btn";
import useLoadResourceFeed from "@/hooks/feed/useLoadResourceFeed";
import Link from "next/link";
import ResourceLoader from "../loader/resource-loader";
import SaveBtn from "@/components/global/save-btn";
import {motion} from "framer-motion"
import { accurateFromNow } from "@/utils/accurate-time-from-now";
export default function LovedResources() {
  const { data, isLoading } = useLoadResourceFeed();
  const q = data?.payload;
  const maximumUpvotes = React.useMemo(()=>q?.reduce((acc,e)=>Math.max(acc,e.upvotes),0) ?? 5 ,[q])
  if (isLoading) return <ResourceLoader />;
  return (
    <section className="w-full overflow-hidden">
      <HeadingComp text={"Top Resources"} />
      <div className="flex flex-wrap  gap-4 mb-4 w-full overflow-hidden">
        {q?.map((resource, index) => (
          <motion.div
          key={index}
          className="bg-gradient-to-br  from-secondary   to-secondary/80 rounded-lg w-full flex gap-3  justify-between py-4 px-4 items-center border"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.1 }}
        >
          <div className="flex items-center gap-2 ">
            <div className="">

          <Link href={`/resource/${resource._id}`} className="">
              <h2 className=" text-lg font-semibold whitespace-wrap leading-tight">{resource.title}</h2>
          </Link>


            <div className="flex gap-4 items-center mb-1 mt-2 max-md:mt-3">
          <p className="text-muted-foreground text-xs">{accurateFromNow(resource.updatedAt)}</p>                  
          {
            resource.upvotes>(Math.max(maximumUpvotes-3,0))&&
            <div className="bg-accent/20 px-3 py-0.5 rounded-md text-xs text-accent ">
          Top rated
          </div>
            
          }
          </div>
          </div>
          </div>
                <motion.div
                  transition={{ duration: 0.2 }}
                >
                <div className="flex items-center gap-2 space-x-2 ">
                  <UpvoteBtn value={resource.upvotes} id={resource._id} isUpvoted={resource.isUpvoted} />
                  <SaveBtn minimal id={resource._id} isSaved={resource.isSaved} />
                </div>
                </motion.div>
        </motion.div>
        ))}

        <Link
          href={"/resource/create"}
          aria-label="Create your own resource"
          className="bg-secondary border-gray-700 py-3 hover:bg-white   rounded-md px-4 hover:border-black border border-dashed  transition-colors  lg:w-[32%] max-lg:w-[49%] max-md:w-[98%]"
        >
          <div className="flex flex-row   gap-2 items-center h-max py-0   ">
            <FaPlus overlineThickness={1} />
            <h3 className="font-semibold text-sm">Create your own resource</h3>
          </div>
        </Link>
      </div>
    </section>
  );
}
