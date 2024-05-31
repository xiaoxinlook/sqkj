import React from 'react';
import { getContentCounts, getContents } from '@/config/api';
import { VideoCard } from '@/components/VideoCard';
import { Pagination } from '@/components/Pagination';
import { Video } from '@/types';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { category: string[] } }): Promise<Metadata> {
  const slug = decodeURIComponent(params.category[0]);
  return {
    title: `${slug}-分类`,
    description: `观看最新的 ${slug} 分类视频`,
    openGraph: {
      title: `${slug}-分类`,
      description: `观看最新的 ${slug} 分类视频`,
      type: 'website',
      url: `https://sqkj.ru/${encodeURIComponent(slug)}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${slug}-分类`,
      description: `观看最新最热的 ${slug} 分类视频`,
    },
  };
}

 export default async function CategoryPage({ params }: { params: { category: string[] } }) {
   const category = decodeURIComponent(params.category[0]);
   const size = 20;
   const page = params.category[1] ? parseInt(params.category[1], 10) : 1;
   const [countsResult, videos] = await Promise.all([
      getContentCounts({ type: 'movie,tv', category }),
      getContents({ category, size: 20,page,type: 'movie,tv' })

   ]);

   const counts = countsResult.counts;
  const totalPages = Math.ceil(counts / size);

   return (
      
    <>
        <div className="mt-6 gap-6 flex flex-col w-full">
          {/* Card Section Top */}
          <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{category}</h3>
                <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-5 gap-5 w-full">
                {videos.map((video: Video) => (
                    <VideoCard key={video._id} video={video} />
                  ))}
                </div>
          </div>
        </div>
        {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          basePath={`/${params.category[0]}`}
        />
      )}
      </>
    );
  }