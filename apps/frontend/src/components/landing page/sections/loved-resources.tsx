import React from "react";
import HeadingComp from "../components/heading-comp";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import UpvoteBtn from "@/components/global/upvote-btn";
import useLoadResourceFeed from "@/hooks/feed/useLoadResourceFeed";
import Link from "next/link";
import ResourceLoader from "../loader/resource-loader";
import SaveBtn from "@/components/global/save-btn";
import { accurateFromNow } from "@/utils/accurate-time-from-now";
import { Button } from "@/shadcn/components/ui/button";
import { useRouter } from "next/navigation";
export default function LovedResources() {
  const { data, isLoading } = useLoadResourceFeed();
  const q = data?.payload;
  const {push} = useRouter()
  const maximumUpvotes = React.useMemo(
    () => q?.reduce((acc, e) => Math.max(acc, e.upvotes), 0) ?? 5,
    [q]
  );
  if (isLoading) return <ResourceLoader />;
  return (
    <section className="w-full overflow-hidden">
      <HeadingComp text={"Top Resources"} />
      <div className="flex flex-wrap  gap-4 mb-4 w-full overflow-hidden">
        {q?.map((resource, index) => (
          <div 
            onClick={()=>{push(`/resource/${resource._id}`)}}
            key={index}
            className="bg-gradient-to-br  from-secondary   to-secondary/20 rounded-lg w-full flex gap-2  justify-between py-4 px-4 items-center border transition-all hover:bg-secondary"
          >
            <Link href={`/resource/${resource._id}`} className="">

              <div className="flex gap-2 items-center flex-wrap">
                <p className="text-muted-foreground leading-none text-xs">
                  {accurateFromNow(resource.updatedAt)}
                </p>
                {resource.upvotes > Math.max(maximumUpvotes - 7, 0) && (
                  <div className="bg-accent/20 px-3 py-0.5 rounded-md text-xs text-accent ">
                    Top rated
                  </div>
                )}
              </div>

                <h2 className=" text-lg max-md:text-base font-semibold  text-wrap  whitespace-pre-line break-all ">
                  {resource.title}
                </h2>
            </Link>

            <div className="flex items-center gap-1 space-x-2 ">
              <UpvoteBtn
                isDescription={false}
                value={resource.upvotes}
                id={resource._id}
                isUpvoted={resource.isUpvoted}
              />
              <SaveBtn minimal id={resource._id} isSaved={resource.isSaved} />

              <div className="md:border-l md:px-2 ">
                <Link href={`/resource/${resource._id}`}>
                  <Button className="bg-secondary-foreground hover:scale-95 transition-transform text-white flex text-sm items-center hover:bg-secondary-foreground shadow-none  gap-2 ">
                    {" "}
                    <p className="max-md:hidden ">
                      Links
                    </p> <FaArrowRight />{" "}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}

        <Link
          href={"/resource/create"}
          aria-label="Create your own resource"
          className="bg-secondary border-gray-700 py-3 hover:bg-white   rounded-md px-4 hover:border-black border border-dashed  transition-colors  lg:w-[32%] max-lg:w-[49%] max-md:w-[98%]"
        >
          <div className="flex flex-row   gap-2 items-center h-max py-0   ">
            <FaPlus overlineThickness={1} />
            <h3 className="font-semibold  text-lg">Create your own resource</h3>
          </div>
        </Link>
      </div>
    </section>
  );
}
