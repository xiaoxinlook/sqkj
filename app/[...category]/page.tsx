import React from 'react';
import { getContentCounts, getContents } from '@/config/api';
import { CardBalance } from '@/components/home/card-balance';
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

export async function generateStaticParams() {
   // 定义一个名为 `medias` 的数组,包含一个字符串元素 "寸止合集"
   const medias = ['国产嫩妹', '国产自拍', '国产探花', '国产黑料','国产偷拍', '国产直播'];
 
   // 定义一个空数组 `params`,用于存储生成的静态路由参数
   const params = [];
 
   // 使用 `for...of` 循环遍历 `medias` 数组中的每个元素
   for (const media of medias) {
     // 对于每个 `media`,将其进行 URL 编码,并将编码后的结果作为数组 `[encodeURIComponent(media)]` 推入 `params` 数组
     params.push({ slug: [encodeURIComponent(media)] });
 
     // 对于每个 `media`,将其进行 URL 编码,并将编码后的结果与字符串 '1' 组成数组 `[encodeURIComponent(media), '1']`,然后推入 `params` 数组
     params.push({ slug: [encodeURIComponent(media), '1'] });
   }
 
   // 函数返回生成的静态路由参数数组 `params`
   return params;
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
  console.log('视频数量:', counts);
  const totalPages = Math.ceil(counts / size);
  console.log('视频分页:', totalPages);

   return (
      
    <>
        <div className="mt-6 gap-6 flex flex-col w-full">
          {/* Card Section Top */}
          <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{category}</h3>
                <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-5 gap-5 w-full">
                {videos.map((video: Video) => (
                    <CardBalance key={video._id} video={video} />
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