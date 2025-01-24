import { GetResourceMetaInfoApi } from '@/api/resource/get-resource.api';
import ResourcesPage from '@/components/resource/read/resource-page';

export const generateMetadata = async ({ params: { id } }: { params: { id: string } }) => {
  const resource = await GetResourceMetaInfoApi(id); // Fetch resource data by ID

  return {
    title: `${resource.payload.title} `,
    description: resource.payload.description,
    keywords: resource.payload.description.split(" ").join(', ')+" , "+resource.payload.title.split(" ").join(', ')+", resources, developer resources, resources for professionals",
    openGraph: {
      title: resource.payload.title,
      description: resource.payload.description,
      url: `${process.env.NEXT_PUBLIC_URL}/resource/${resource?.payload._id}`,
      images: [{ url: resource.payload.banner||"/logo/logo.png" }],
    },
    twitter: {
      card: 'summary_large_image',
      title: resource.payload.title,
      description: resource.payload.description,
      image: resource.payload.banner||"/logo/logo.png",
    },
  };
};

export default function Page() {
  return ( <ResourcesPage />);
}
