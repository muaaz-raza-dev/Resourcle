/* eslint-disable react/no-unescaped-entities */
import React from 'react'

export default function NotAvailableFallbackSearched() {
    return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" height={150} width={150} color='#313135'  viewBox="0 0 24 24"><path d="M16.775 16.368a1 1 0 0 1-1.55 1.264 4 4 0 0 0-6.45 0 1 1 0 1 1-1.55-1.264 6 6 0 0 1 9.55 0zM23 12A11 11 0 1 1 12 1a11.013 11.013 0 0 1 11 11zm-2 0a9 9 0 1 0-9 9 9.01 9.01 0 0 0 9-9zm-4-3a1 1 0 0 1-2 0 1 1 0 0 0-2 0 3 3 0 0 0 6 0 1 1 0 0 0-2 0zm-6 0a1 1 0 0 0-2 0 1 1 0 0 1-2 0 1 1 0 0 0-2 0 3 3 0 0 0 6 0z"/></svg>
    <h2 className="text-2xl font-bold mb-2">Nothing Found</h2>
    <p className="text-muted-foreground mb-6 max-w-md">
      It looks like there aren't any resources available at the moment. 
    </p>
    
  </div>
  )
}
