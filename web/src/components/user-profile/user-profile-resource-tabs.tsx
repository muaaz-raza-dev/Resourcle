"use client";
import { Tabs, TabsContent } from '@/shadcn/components/ui/tabs'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import UserProfileResourceNavbar from './user-profile-resource-navbar'
import UserProfileResourcesFilterbar from './user-profile-resources-filterbar';
import UserProfileOwnResources from './user-profile-own-resources';

export default function UserProfileResourceTabs() {
  const search =  useSearchParams()
  const activeTab = search.get('tab') || 'resource' 
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('tab', "resource")
  }, [])
  function setActiveTab(tab:string){
    const searchParams = new URLSearchParams(window.location.search)
     searchParams.set('tab', tab)
     window.history.replaceState({},"",`${window.location.pathname}?${searchParams}`);
  }
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-5">
      <UserProfileResourceNavbar/>
      <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >

              <TabsContent value="resource" className="mt-6">
                <UserProfileResourcesFilterbar/>
                <div className="flex flex-col  gap-2">
                  <UserProfileOwnResources/>
                </div>
              </TabsContent>

              <TabsContent value="saved" className="mt-6">

              {/* <PostGrid posts={posts.filter(post => post.saved)} /> */}
              </TabsContent>
            </motion.div>
          </AnimatePresence>
    </Tabs>
  )
}
