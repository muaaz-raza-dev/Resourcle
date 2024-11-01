import { Button } from "@/shadcn/components/ui/button"
import { Card, CardContent, CardFooter } from "@/shadcn/components/ui/card"
import { Avatar } from "antd"
import { Bookmark, Dot, Link as LinkIcon } from "lucide-react"
import Image from "next/image"
import UpvoteBtn from "../global/upvote-btn"

interface ResourceItem {
  id: string
  title: string
  bannerUrl: string
  linkCount: number
  upvotes: number;
  description?: string;
}
const resourceItems: ResourceItem[] = [
  {
    id: "1",
    title: "Frontend Developer Roadmap 2024",
    bannerUrl: "/banner.png",
    linkCount: 42,
    upvotes: 1337
  },
  {
    id: "2",
    title: "Backend Developer Career Path",
    bannerUrl: "/banner.png",
    linkCount: 35,
    upvotes: 982
  },
  {
    id: "3",
    title: "Full Stack Web Development Guide",
    bannerUrl: "/banner.png",
    linkCount: 50,
    upvotes: 1500
  }
  // Add more items as needed
];
export default function SearchedResources() {
  return (
<div className=" flex flex-col ">
      <div className="flex flex-col gap-2">
        {resourceItems.map((item) => (
          <Card key={item.id} className="overflow-hidden px-2 py-2">
            <div className="flex flex-col sm:flex-row center">
              <div className="relative w-full sm:w-48 h-28">
                <Image
                  src={item.bannerUrl}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <CardContent className="p-0">
                  <div className="flex items-center gap-1">
                    <Avatar src="/user.png" size={20}/>
                    <p className="font-semibold text-sm pl-1">Muaaz Raza</p>
                    <Dot/>
                    <span className="text-sm text-gray-500">10 days ago</span>
                  </div>
                  <h2 className="text-xl font-semibold ">{item.title}</h2>
                  
                </CardContent>
                <CardFooter className="p-0 items-end">
                <div className="flex items-center space-x-3  text-sm text-muted-foreground">
                    <span className="flex items-center  text-primary  text-xs font-semibold">
                      <LinkIcon className="h-4 w-4 mr-1 font-medium text-primary" />
                      {item.linkCount} links
                    </span>
                    <UpvoteBtn value={`45 upvotes`} size={18} containerClassName="flex-row-reverse"/>
                    
                    
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
      <Button className=" my-4 mx-auto" variant={"secondary"} >
          Load more
      </Button>
    </div>
  )
}
