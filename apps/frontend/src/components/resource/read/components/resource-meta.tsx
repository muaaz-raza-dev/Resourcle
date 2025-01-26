import SaveBtn from "@/components/global/save-btn";
import UpvoteBtn from "@/components/global/upvote-btn";
import RequestLoader from "@/components/loader/request-loading";
import useShare from "@/hooks/global/useShare";
import useGetResource from "@/hooks/resource/useGetNonContentResource";
import { Card, CardContent } from "@/shadcn/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEye, FaShare } from "react-icons/fa";

export default function ResourceMeta() {
  const { data } = useGetResource({ hitApi: false });
  const { share, isSharing } = useShare();
  const q = data?.payload;
  if (!q) return null;
  return (
    <Card>
      <CardContent className="flex flex-col items-start w-full py-4 gap-2 bg-transparent">
           <div className="flex justify-between max-md:flex-col gap-4 w-full">
          <div className="flex items-start gap-4 w-max max-md:justify-between max-md:items-center max-md:w-full ">
            <div className="flex items-center gap-2  max-md:w-full ">
            <Link href={`/u/${q.publisher._id}`}>
              <Image src={q.publisher.picture || "/user.png"} alt={q.publisher.name || "Picture"} width={40} height={40} className="rounded-full" quality={75} unoptimized/>
            </Link>
              <div className="">
                <div className="flex gap-4">
                  <Link href={`/u/${q.publisher._id}`}>
                    <h2 className="font-semibold">{q.publisher.name}</h2>
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground">
                  {q.publisher.headline}
                </p>
              </div>
            </div>
            <Link
              href={`/u/${q.publisher._id}`}
              className="text-xs text-white max-md:block md:hidden transition-colors duration-200 
                bg-secondary-foreground hover:bg-primary-dark rounded-md py-1 px-4"
            >
              Profile
            </Link>
          </div>
          <div className="flex  justify-between items-center">


            <div className="flex items-center w-full max-md:justify-between gap-2">
              <div className="flex gap-1">
                <div >
                  <UpvoteBtn
                    size={16}
                    id={q._id}
                    value={q.upvotes}
                    isUpvoted={q.isUpvoted}
                  />
                </div>
                <div
                  className="font-semibold  items-center rounded-lg flex gap-2  upvote-button text-xs  border py-1 px-2  text-muted-foreground"
                >
                  <FaEye className="text-muted-foreground " size={16} />
                  <p>
                  {q.views}  views
                  </p>
                </div>
              </div>
              <div className="flex gap-1 md:border-l pl-2">
                <button className="font-semibold  items-center  rounded-lg flex gap-2  text-xs  border py-1 px-2  hover:bg-secondary transition-colors">
                  <SaveBtn size={18} minimal  id={q._id} isSaved={q.isSaved} />
                </button>
                  <button
                    onClick={() =>
                      share({ title: q.title, text: q.description })
                    }
                  >
                    {isSharing ? (
                      <RequestLoader size="18" color="gray" />
                    ) : (
                      <div
                      className="font-semibold   items-center rounded-lg flex gap-2  upvote-button text-xs  border py-1 px-2  hover:bg-secondary transition-colors"
                    >
                      <FaShare  size={16} />
                      <p className="text-muted-foreground">Share</p>
                      </div>
                    )}
                  </button>
           
              </div>
            </div>
          </div>
        </div>
        
      </CardContent>
    </Card>
  );
}
