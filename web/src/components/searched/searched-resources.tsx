import { Button } from "@/shadcn/components/ui/button"
import { Card, CardContent, CardFooter } from "@/shadcn/components/ui/card"
import { Avatar } from "antd"
import { Bookmark, Dot, Link as LinkIcon } from "lucide-react"
import Image from "next/image"
import UpvoteBtn from "../global/upvote-btn"
import { useRecoilValue } from "recoil"
import { searchedResourcesAtom } from "@/state/search-resource.atom"
import moment from "moment"
import RequestLoader from "../loader/request-loading"
import { useMemo } from "react"
import NotAvailableFallbackSearched from "./not-available-fallback-searched"

export default function SearchedResources({isLoading}:{isLoading:boolean}) {
  const {resources,total,count } = useRecoilValue(searchedResourcesAtom)
  const FlatResources  = useMemo(()=>Object.values(resources).flat(),[resources])
  return (
<div className=" flex flex-col ">
      <div className="flex flex-col  gap-2">
        {
        FlatResources.map((resource) => (
          <Card key={resource._id} className="overflow-hidden px-2 py-2">
            <div className="flex flex-col sm:flex-row center">
                {resource.banner&&
              <div className="relative w-full sm:w-48 h-28 bg-secondary rounded-md">
                
                <Image
                  src={resource.banner||""}
                  alt={resource.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
                }
              <div className="flex-1 p-4 flex flex-col justify-between">
                <CardContent className="p-0">
                  <div className="flex items-center gap-1">
                    <Avatar src={resource?.publisher?.picture||"/user.png"} size={20}/>
                    <p className="font-semibold text-sm pl-1">{resource?.publisher?.name}</p>
                    <Dot/>
                    <span className="text-sm text-gray-500">{moment(resource.createdAt).fromNow()}</span>
                  </div>
                  <h2 className="text-xl font-semibold ">{resource.title}</h2>
                  
                </CardContent>
                <CardFooter className="p-0 items-end">
                <div className="flex items-center space-x-3  text-sm text-muted-foreground">
                    <span className="flex items-center  text-primary  text-xs font-semibold">
                      <LinkIcon className="h-4 w-4 mr-1 font-medium text-primary" />
                      {resource.linksLength} links
                    </span>
                    <UpvoteBtn value={`${resource.upvotes} upvotes`} size={18} containerClassName="flex-row-reverse"/>
                    
                    
                  </div>
                  <Button variant="outline" className="ml-auto hover:bg-secondary">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {
      isLoading?
      <div className="center max-auto my-2">
      <RequestLoader/>
      </div>
      :
      FlatResources.length ==0 &&
      <NotAvailableFallbackSearched/>
      }
      {  (total>((count+1)*10)) ?
      <Button className=" my-4 mx-auto" variant={"secondary"} >
          Load more
      </Button>:null
      }
    </div>
  )
}
