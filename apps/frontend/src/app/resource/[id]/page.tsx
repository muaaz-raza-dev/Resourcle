import { GetResourceMetaInfoApi } from '@/api/resource/get-resource.api';
import ResourcesPage from '@/components/resource/read/resource-page';
import { Keywords } from '@/data/keywords';

export const generateMetadata = async ({ params: { id } }: { params: { id: string } }) => {
  try {
    const resource = await GetResourceMetaInfoApi(id); // Fetch resource data by ID
    
    // Ensure resource is available
    if (!resource || !resource.payload) {
      throw new Error('Resource data is missing');
    }

    // Keywords handling: Concatenate title, description, and predefined Keywords
    const keywords = `${resource.payload.title}, ${resource.payload.description}`;

    return {
      title: resource.payload.title,
      description: resource.payload.description,
      keywords: keywords,
      openGraph: {
        title: resource.payload.title,
        description: resource.payload.description,
        url: `${process.env.NEXT_PUBLIC_URL}/resource/${resource?.payload._id}`,
        images: [{ url: resource.payload.banner || "/logo/logo.png" }],
      },
      twitter: {
        card: 'summary_large_image',
        title: resource.payload.title,
        description: resource.payload.description,
        image: resource.payload.banner || "/logo/logo.png",
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    
    // Fallback values in case of error (can be customized)
    return {
      title: 'Resource Not Found',
      description: 'Sorry, the requested resource could not be found.',
      keywords: Keywords, // Default keywords if something goes wrong
      openGraph: {
        title: 'Resource Not Found',
        description: 'Sorry, the requested resource could not be found.',
        url: `${process.env.NEXT_PUBLIC_URL}/resource/${id}`,
        images: [{ url: "/logo/logo.png" }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Resource Not Found',
        description: 'Sorry, the requested resource could not be found.',
        image: "/logo/logo.png",
      },
    };
  }
};


export default function Page() {
  return ( <ResourcesPage />);
}
