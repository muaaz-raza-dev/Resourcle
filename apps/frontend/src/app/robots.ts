import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/',"/auth/login","/auth/signup"],
      disallow: ['/auth/',"/settings","/collection"],
      crawlDelay:10,
      
    },
    host: process.env.NEXT_PUBLIC_URL,
    sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
  }
}