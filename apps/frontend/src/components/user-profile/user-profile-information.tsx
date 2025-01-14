import React from 'react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/components/ui/avatar'
import { User } from 'lucide-react'
import { Tooltip } from 'antd'
import useGetUserProfileInfomartion from '@/hooks/user-profile/useGetUserInfomartion'
import Link from 'next/link'
export default function UserProfileInformation() {
  const {data}  = useGetUserProfileInfomartion({hitApi:false})
  const q= data?.payload
  return (
    <main>

    
    <div className="relative flex items-center gap-3 mx-auto ">
    <div className="flex flex-col sm:flex-row items-center gap-4 self-start">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className=''
      >
        <Avatar className="w-32 h-32 max-md:w-16 max-md:h-16 aspect-square  dark:border-gray-800 ">
          <AvatarImage src={q?.picture||"/user.png"} alt={q?.name} />
          <AvatarFallback><User className="w-16 h-16" /></AvatarFallback>
        </Avatar>
      </motion.div>
    </div>
      <div className="sm:mt-2 ">
        <p className="text-muted-foreground leading-none text-sm">{q?.username}</p>
        <h1 className="text-3xl max-md:text-2xl font-bold leading-none text-gray-900 dark:text-gray-100">{q?.name}</h1>
        <p className="text-muted-foreground text-sm leading-tight max-md:hidden ">{q?.about||"No about to display here"}</p>
        <div className="flex gap-2 flex-wrap md:mt-2 ">
          {
            q?.links?.map(link=> <Link target='_blank' href={link.url} key={link.url}  className="
            inline-flex items-center px-2 py-1 text-xs font-normal text-muted-foreground bg-secondary border rounded-md hover:bg-gray-50">
              <Tooltip placement='bottom' title={link.url}>
              {link.label}
              </Tooltip>
              </Link>
              )
          }
        </div>
      </div>
  </div>
      <p className="text-muted-foreground text-sm mt-2 leading-tight md:hidden ">{q?.about||"No about to display here"}</p>
      </main>
  )
}
