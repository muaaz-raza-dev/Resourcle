import { Loader2 } from 'lucide-react'
import React from 'react'

export default function ProfileFormInformationLoader() {
  return (
          <div className="min-h-screen flex flex-col">
          <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Fetching </h2>
            <p className="text-muted-foreground">Please wait while we gather your profile information ...</p>
          </div>
        </main>
        </div>
      
  )
}
