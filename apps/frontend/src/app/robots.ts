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
    sitemap: `https://resourcle.com/sitemap.xml`,
    host: 'https://resourcle.com'
  };
}
