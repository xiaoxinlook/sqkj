import { CardBalance } from '@/components/home/card-balance';
import { searchContents } from '@/config/api';
import { Video } from '@/types';
import { Metadata } from 'next';
import React from 'react';


export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug[0]);
  return {
    title: `${slug}-搜寻结果`,
    description: `观看最新的 ${slug}搜寻结果，免费观看${slug}相关视频`,
    openGraph: {
      title: `${slug}-搜寻结果`,
      description: `观看最新的 ${slug} 搜寻结果，免费观看${slug}相关视频`,
      type: 'website',
      url: `/chuan-mei/${encodeURIComponent(slug)}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${slug}-搜寻结果`,
      description: `观看最新的 ${slug} 搜寻结果，免费观看${slug}相关视频`,
    },
  };
}
const allowedCategories = ['国产嫩妹', '国产自拍', '国产探花', '国产黑料','国产偷拍', '国产直播'];
async function SearchResultPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = decodeURIComponent(params.slug);
  const pageSize = 1000;
  const currentPage = searchParams.page ? parseInt(searchParams.page as string, 10) : 1;

  const posts = await searchContents(query, currentPage, pageSize);

  // 过滤搜索结果,只保留 "category" 为 "麻豆视频" 的结果
  const filteredPosts = posts.filter((posts: any) => allowedCategories.includes(posts.category));

   return (
<>
        <div className="mt-6 gap-6 flex flex-col w-full">
          {/* Card Section Top */}
          <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">搜索结果:{query}</h3>
                <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-5 gap-5 w-full">
                {filteredPosts.map((video: Video) => (
                    <CardBalance key={video._id} video={video} />
                  ))}
                </div>
          </div>
        </div>
        </>
    );
  }
export default SearchResultPage;
