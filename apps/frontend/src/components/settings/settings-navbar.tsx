"use client";
import Link from "next/link"
import { usePathname } from "next/navigation"
import {  FileText, Lock } from 'lucide-react'
import { cn } from "@/shadcn/lib/utils"

export default function SettingsNavbar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Personal info",
      href: "/settings/personal-info",
      icon: FileText
    },
    {
      title: "Security",
      href: "/settings/account",
      icon: Lock
    },
    
  ]

  return (
    
      <div className="w-64 max-md:w-full md:mt-4  space-y-1 max-md:gap-4 flex md:flex-col max-md:py-4 md:border-r max-md:border-b px-7">
  <h2 className="font-semibold max-md:hidden text-lg">Settings</h2>        
      {menuItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 font-semibold max-md:px-4 rounded-lg  py-2  transition-colors",
              isActive 
                ? "bg-green-50 text-primary" 
                : "text-gray-600 max-md:bg-border hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span className="max-[350px]:hidden">{item.title}</span>
          </Link>
        )
      })}
    </div>
  )
}