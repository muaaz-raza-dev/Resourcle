import SettingsNavbar from '@/components/settings/settings-navbar'

import React from 'react'

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <main className='flex py-2  max-md:flex-col'>
        <SettingsNavbar/>
      {children}
    </main>
  )
}
