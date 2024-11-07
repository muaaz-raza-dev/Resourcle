'use client'
import UserProfileInformation from '@/components/user-profile/user-profile-information'
import UserProfileBanner from '@/components/user-profile/user-profile-banner'
import UserProfileResourceTabs from '@/components/user-profile/user-profile-resource-tabs'



export default function ProfilePage() {
  
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <UserProfileBanner />
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-4 lg:px-8 pb-8">
       <UserProfileInformation/>
      <UserProfileResourceTabs/>
      </section>
    </main>
  )
}

