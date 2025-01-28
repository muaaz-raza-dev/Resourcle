import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/components/ui/avatar'
import Link from 'next/link'
import React from 'react'

export default function SearchedUserComponent({user,Close}:{user:{_id:string,picture:string,name:string,headline:string;},Close:()=>void}) {
  return (
    
    
      <div

        key={user._id}
        className="flex items-center gap-3 border-b pb-2  w-full "
      >
        <Link onClick={Close} href={`/u/${user._id}`}>
        <Avatar className="h-8 w-8  ">
          <AvatarImage
            src={user.picture || "/user.png"}
            alt={user.name} 
            />
          <AvatarFallback className="bg-secondary-foreground text-white font-semibold">
            {user.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
            </Link>
        <Link className="flex-1  flex flex-col justify-betweeen" href={`/u/${user._id}`} onClick={Close}>
          <div >
          <p className="font-semibold text-sm ">
            {user.name}
          </p>
          </div>
          <p className="text-xs max-md:text-sm leading-tight text-muted-foreground">
            {user.headline} 
          </p>
         
          
        </Link>
        <div className="flex " />
        
        <Link href={`/u/${user._id}`} onClick={Close} className="text-xs text-white transition-colors duration-200 
        bg-secondary-foreground hover:bg-primary-dark rounded-md py-1 px-4">
           Profile
        </Link>
      </div>
    
  
  )
}
