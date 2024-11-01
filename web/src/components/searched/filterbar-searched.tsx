"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu"
import { ArrowUpDown} from "lucide-react"
import { useSearchParams } from 'next/navigation'
export default function FilterbarSearched() {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
  return (
    
      <div className="container px-4 py-6 md:py-8 mx-auto">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{search}</h1>
          <p className="text-lg font-medium text-muted-foreground">
            Search all the specific keywords to get the better results
          </p>
          
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b pb-4">
          <div className="text-muted-foreground">
            <span className="font-semibold text-foreground">2,451</span> results found
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button  className="gap-2 text-sm flex items-center  px-4 rounded py-1">
                  <ArrowUpDown className="h-4 w-4" />
                  Most Upvoted
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="hover:!bg-slate-300">Most Upvoted</DropdownMenuItem>
                <DropdownMenuItem className="hover:!bg-slate-300">Recent</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
    
  )
}
