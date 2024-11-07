import React from 'react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/components/ui/avatar'
import { User } from 'lucide-react'
import { Tooltip } from 'antd'
import { HiBadgeCheck } from 'react-icons/hi'
export default function UserProfileInformation() {
  return (
    <div className="relative flex items-center gap-3 mx-auto ">
    <div className="flex flex-col sm:flex-row items-center gap-4 self-start">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-800 shadow-lg">
          <AvatarImage src={"/logo2.png"} alt={"asdfasdfasdf"} />
          <AvatarFallback><User className="w-16 h-16" /></AvatarFallback>
        </Avatar>

      </motion.div>
    </div>
      <div className="text-center  sm:text-left mt-4 sm:mt-0">
          <div className="flex items-center gap-1 ">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{"asdfasdfasdf"}</h1>
        <Tooltip title={"verified"} >
        <HiBadgeCheck className='text-primary' size={22}/>
        </Tooltip>
          </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">{"asdfasdfasdf"}</p>
        <p className="text-gray-800 font-semibold dark:text-gray-400 ">{"asdfasdfasdf"}</p>
        <p className="text-gray-600 dark:text-gray-400 ">{"asdfasdfasdf"}</p>
        <div className="flex gap-2 flex-wrap">
        <p className="text-blue-500 underline  rounded-md pr-2 text-sm">https://linkedin.com</p>
        <p className="text-blue-500 underline  rounded-md pr-2 text-sm">https://linkedin.com</p>
        </div>
      </div>


  </div>
  )
}
