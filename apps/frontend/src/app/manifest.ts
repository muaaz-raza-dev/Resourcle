import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Resourcle',
    short_name: 'Resourcle',
    description: 'Link sharing platform for everyone',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFE5CF',
    theme_color: '#0b110b',
    icons: [
      {
        src: '/logo-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}