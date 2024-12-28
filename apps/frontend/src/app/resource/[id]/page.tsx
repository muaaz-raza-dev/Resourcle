import { GetResourceMetaInfoApi } from '@/api/resource/get-resource.api';
import ResourceLoader from '@/components/resource/read/components/resource-loader';
import ResourcesPage from '@/components/resource/read/resource-page';
import { Suspense } from 'react';

export const generateMetadata = async ({ params: { id } }: { params: { id: string } }) => {
  const resource = await GetResourceMetaInfoApi(id); // Fetch resource data by ID

  return {
    title: `${resource.payload.title} - ${process.env.NEXT_PUBLIC_NAME}`,
    description: resource.payload.description,
    openGraph: {
      title: resource.payload.title,
      description: resource.payload.description,
      url: `${process.env.NEXT_PUBLIC_URL}/resource/${resource?.payload._id}`,
      images: [{ url: resource.payload.banner }],
    },
    twitter: {
      card: 'summary_large_image',
      title: resource.payload.title,
      description: resource.payload.description,
      image: resource.payload.banner,
    },
  };
};

export default function Page() {
  return (
    <>
      <Suspense fallback={<ResourceLoader />}>
        <ResourcesPage />
      </Suspense>
    </>
  );
}
