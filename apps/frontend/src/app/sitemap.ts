import axios from 'axios';
import type { MetadataRoute } from 'next';

export default async  function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const response = await axios.get<{ _id: string; updatedAt: string }[]>(
      `${process.env.NEXT_PUBLIC_UTIL_SERVER_URI}/resource/urls`
    );
    // Map fetched data to the expected sitemap format
    const resourceRoutes = response.data.map((resource) => ({
      url: `${process.env.NEXT_PUBLIC_URL}/resource/${resource._id}`,
      lastModified: new Date(resource.updatedAt).toISOString(),
      priority: 1,
    }));

    // Return the final sitemap
    return [
      {
        url: "https://resourcle.com",
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1,
      },
      ...resourceRoutes,
    ];
  } catch (error) {
    console.error('Error fetching resources for sitemap:', error);
    return [];
  }
}
