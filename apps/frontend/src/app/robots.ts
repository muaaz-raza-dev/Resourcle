import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/auth/', '/settings', '/collection'],
      },
    ],
    
    host: 'https://resourcle.com',
    sitemap: `https://resourcle.com/sitemap.xml`,
  };
}
