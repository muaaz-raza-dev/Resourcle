
import { TabsList, TabsTrigger } from '@/shadcn/components/ui/tabs'
import React from 'react'
import { FaBookmark,   FaThList } from 'react-icons/fa'
import UserResourceCollectionsButton from './ResourceCollection/user-resource-collections-button'
import { useRecoilValue } from 'recoil'
import { authAtom } from '@/state/auth.atom'
import useGetUserProfileInfomartion from '@/hooks/user-profile/useGetUserInfomartion'

export default function UserProfileResourceNavbar() {
  const {isLogined,user} = useRecoilValue(authAtom)
  const {data} = useGetUserProfileInfomartion({hitApi:false})
  const q=data?.payload
  
  return (
    <section className="flex justify-between items-center ">

    <TabsList className=" w-max flex gap-3 items-center border px-0 !py-4">
               <TabsTrigger value='resource' className='flex gap-2 items-center py-2 font-semibold w-max '>
                <FaThList />
                  Resources
                </TabsTrigger>
              <TabsTrigger value='saved' className='flex gap-2 items-center py-2 font-semibold w-max '>
                <FaBookmark /> Savelist
                </TabsTrigger>
          {isLogined&&user?._id==q?._id&&
                <TabsTrigger value='' className='flex gap-2 items-center py-2 font-semibold w-max '>
           <UserResourceCollectionsButton/>
                </TabsTrigger>
           }
          </TabsList>
    </section>
  )
}


