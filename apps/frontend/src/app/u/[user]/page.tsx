'use client'
import UserProfileInformation from '@/components/user-profile/user-profile-information'
import UserProfileResourceTabs from '@/components/user-profile/user-profile-resource-tabs'
import useGetUserProfileInfomartion from '@/hooks/user-profile/useGetUserInfomartion'
import NotFoundRenderer from '@/components/global/not-found-renderer'
import ProfileSkeletonLoader from '@/components/user-profile/user-profile-loader'



export default function ProfilePage() {
  const {isLoading,isError}  = useGetUserProfileInfomartion({hitApi:true})
  
  return (
    <NotFoundRenderer isError={isError}  isLoading={isLoading} Loader={<ProfileSkeletonLoader/>} 
    errorMessage={" We couldn't find the user you're looking for. They may have been deleted or never existed. "} >
    <main className="min-h-screen mt-4">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-4 lg:px-8 pb-8">
      <UserProfileInformation/> 
      <UserProfileResourceTabs/>
      </section>
    </main>
    </NotFoundRenderer>
  )
}

