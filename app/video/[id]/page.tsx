// app\v\[...id]

import { getVideo, getContentCounts, getContents } from '@/config/api';
import { CardBalance } from '@/components/home/card-balance';
import VideoPlayer from '@/components/VideoPlayer';
import { Video } from '@/types';
import { Card, CardBody, CardHeader, Chip } from '@nextui-org/react';
import { FcMultipleCameras } from "react-icons/fc";
import { FcFilm } from "react-icons/fc";
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Key } from 'react';
import { Metadata } from 'next';
import { createHash } from 'crypto';

// 生成防盗链URL的函数
function generateAntiTheftUrl(url: string, tokenKey: string) {
  const nowstamp = Date.now(); // 获取当前时间的毫秒数
  const dutestamp = nowstamp + 20 * 1000; // 60秒后过期
  const playCount = 3; // 允许播放3次
  const tokenUrl = `${url}&counts=${playCount}&timestamp=${dutestamp}${tokenKey}`;
  const md5 = createHash('md5');
  const md5Token = md5.update(tokenUrl).digest('hex');
  return `${url}?counts=${playCount}&timestamp=${dutestamp}&key=${md5Token}`;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;
  const video = await getVideo({id});
  const IMG_HOST = process.env.NEXT_PUBLIC_IMG_HOST;

  return {
    title: `${video.title}-${video.category}`,
    description: `${video.title}-${video.category} - 在线国产视频播放`,
    openGraph: {
      title: `${video.title}-${video.category} - 色请空间`,
      description: `${video.title}}-${video.category} - 在线国产视频播放`,
      type: 'video.movie',
      url: `https://sqkj.ru/videos/${id}`,
      images: [
        {
          url: `${IMG_HOST}${video.poster2.url}`,
          width: video.poster2.width,
          height: video.poster2.height,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: video.title,
      description: `${video.title}}-${video.category} - 在线国产视频播放`,
      images: [{
        url: `${IMG_HOST}${video.poster2.url}`,
          width: video.poster2.width,
          height: video.poster2.height,
      },
    ],

    },
  };
}

export async function generateStaticParams() {
  const categories = ['国产嫩妹', '国产自拍', '国产探花', '国产黑料','国产偷拍', '国产直播'];
  const paths = [];

  for (const category of categories) {
    const contentCounts = await getContentCounts({ type: 'movie', category });
    const count = contentCounts[category];

    if (count > 0) {
      const contents = await getContents({ category, page: 1, size: count });
      const categoryPaths = contents.map((content: { _id: any; }) => ({
        category,
        id: content._id,
      }));
      paths.push(...categoryPaths);
    }
  }

  return paths;
}
export default async function Page({ params: { id } }: { params: { id: string } }) {
  const video = await getVideo({ id });
    // 生成防盗链URL和视频海报链接
    const tokenKey = process.env.TOKEN_KEY || '1q1a1z2q2a2z3q3a3z';
    const videoHost = process.env.NEXT_PUBLIC_VIDEO_HOST || '';
    const imgHost = process.env.NEXT_PUBLIC_IMG_HOST || '';
  
    const antiTheftPath = generateAntiTheftUrl(`${video.m3u8}`, tokenKey);
    const videoURL = `${videoHost}${antiTheftPath}`;
    const posterUrl = `${imgHost}${video.poster2.url}`;

  return (
<>
        <div className="mt-6 gap-6 flex flex-col w-full">
          {/* Card Section Top */}
          <Card className="border-none bg-background/60 dark:bg-default-100/50 max-w-auto" shadow="sm">
          <VideoPlayer title={video.title} videoUrl={videoURL} posterUrl={posterUrl}/>
          </Card>
        </div>
        <h2 className="text-xl font-semibold">視頻信息</h2>
     <Card className="bg-default-50 rounded-xl shadow-md">
     <CardHeader className="flex flex-col gap-3">
  <div className="flex items-center justify-between">
    <h1 className="text-base lg:text-lg text-nord6 flex-grow mr-4">{video.title}</h1>

  </div>
  <div className="flex items-center">
  <Chip
      startContent={<FcMultipleCameras size={18} />}
      variant="faded"
      color="success"
      className="flex-shrink-0"
    >
      <span className="truncate">{video.count}次</span>
    </Chip>
    <Chip
      startContent={<FcFilm size={18} />}
      variant="faded"
      color="success"
      className="flex-shrink-0"
    >
      <span className="truncate">{video.category}</span>
    </Chip>
  </div>
</CardHeader>
    <div className="flex flex-row overflow-x-auto touch-pan-x scroll-smooth">
    {video.photos.slice(1).map((photo: string | StaticImport, index: Key | null | undefined) => (
        <Image key={index} loading = 'lazy' unoptimized={true} src={photo} width={200} height={300} alt={`Photo ${index}`} className="object-cover" />
      ))}
    </div>

     </Card>
        <h2 className="text-xl font-semibold">智能推荐</h2>
        <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-5 gap-5 w-full">
          {video.likes.map((video: Video) => (
            <CardBalance key={video._id} video={video} />
          ))}
        </div>
        </>
  );
}