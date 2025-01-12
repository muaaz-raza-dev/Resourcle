/* eslint-disable react/no-unescaped-entities */
import { Button } from '@/shadcn/components/ui/button'
import { DialogClose, DialogTrigger } from '@/shadcn/components/ui/dialog'
import { HelpCircle } from 'lucide-react'
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/shadcn/components/ui/dialog"

export default function SecuritySettingsProviderInfoDialog() {
  return (
    <Dialog >
        <DialogTrigger asChild>
        <Button variant="outline" size="icon" className='bg-transparent border-border hover:bg-border transition-colors' >
    <HelpCircle className="h-4 w-4" />
    <span className="sr-only">How it works</span>
  </Button>
        </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>How Provider Setup Works</DialogTitle>
        <DialogDescription>
          <p className="mt-2">
            The provider setup allows you to choose between three options for your data source:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            
            <li><strong>Google:</strong> Uses Google's services for your authentication.</li>
            <li><strong>Local:</strong> Stores and processes data on your local infrastructure.</li>
            <li><strong>Hybrid:</strong> Combines both Google and local resources for a customized solution.</li>
          </ul>
          <p className="mt-2">
            Select the option that best fits your needs by clicking on the corresponding icon. 
            Your choice will determine how your data is handled and where it's stored.
          </p>
        </DialogDescription>
      </DialogHeader>
      <DialogClose>
      <Button variant={"secondary"} className="w-full hover:bg-secondary transition-colors">Close</Button>
      </DialogClose>
    </DialogContent>
  </Dialog>
    
  )
}
