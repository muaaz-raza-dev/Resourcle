"use client"

import { ReactNode } from "react"
import {QueryClient, QueryClientProvider} from "react-query"
const queryClient = new QueryClient({defaultOptions:{queries:{refetchOnWindowFocus:false,refetchOnMount:true}}})
export default function QueryClientsProvider({children}:{children:ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
