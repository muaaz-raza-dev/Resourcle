"use client";
import Link from "next/link"
import { usePathname } from "next/navigation"
import {  FileText, Lock,  Info } from 'lucide-react'
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
    {
      title: "About",
      href: "/settings/about",
      icon: Info
    }
  ]

  return (
    
      <div className="w-64 space-y-1  flex flex-col border-r">
        
      {menuItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 font-semibold rounded-lg px-5 py-2  transition-colors",
              isActive 
                ? "bg-green-50 text-primary" 
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        )
      })}
    </div>
  )
}