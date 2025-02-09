"use client"

import * as React from "react"
import { Button } from "@/shadcn/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shadcn/components/ui/dialog"
import { Label } from "@/shadcn/components/ui/label"
import AdvancedFiltersCategorySelectField from "./advanced-filters-category-field"
import AdvancedFiltersSortFeild from "./advanced-filters-sort-feild"

export function AdvancedFilterFieldsDialog({children}:{children:React.ReactNode}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Resource</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">

        <div className="space-y-2">
          <Label htmlFor="sort by">Sort by</Label>
          <AdvancedFiltersSortFeild/>
         </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
         <AdvancedFiltersCategorySelectField/>
         </div>



          
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Reset
          </Button>
          <Button onClick={() => setOpen(false)}>Apply Filters</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

