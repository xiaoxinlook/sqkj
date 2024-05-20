// app/page.tsx

import { getVideo, gettv, getm3u8,getContentCounts,getContents } from '@/config/api';
import { CardBalance } from '@/components/home/card-balance';
import VideoPlayer from '@/components/VideosPlayer';
import { Video } from '@/types';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;
  const video = await gettv({id});
  const IMG_HOST = process.env.NEXT_PUBLIC_IMG_HOST;

  return {
    title: `${video.tv.title}-合集-${video.tv.category}`,
    description: `${video.tv.title}-合集-${video.tv.category} - 在线国产视频播放`,
    openGraph: {
      title: `${video.tv.title}-合集-${video.tv.category} - 色请空间`,
      description: `${video.tv.title}}-合集-${video.tv.category} - 在线国产视频播放`,
      type: 'video.movie',
      url: `https://sqkj.ru/videos/${id}`,
      images: [
        {
          url: `${IMG_HOST}${video.tv.poster2.url}`,
          width: video.tv.poster2.width,
          height: video.tv.poster2.height,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: video.title,
      description: `${video.tv.title}}-合集-${video.tv.category} - 在线国产视频播放`,
      images: [{
        url: `${IMG_HOST}${video.tv.poster2.url}`,
          width: video.tv.poster2.width,
          height: video.tv.poster2.height,
      },
    ],

    },
  };
}

export async function generateStaticParams() {
  const categories = ['国产嫩妹', '国产自拍', '国产探花', '国产黑料','国产偷拍', '国产直播'];
  const paths = [];

  for (const category of categories) {
    const contentCounts = await getContentCounts({ type: 'tv', category });
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
export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  let video;
  let episodes = [];

  // 使用 gettv 函数查询视频数据
  const tvData = await gettv({ id });

  // 提取 tv.episodes[0].movieid
  const firstEpisodeMovieId = tvData.tv.episodes[0].movieid;

  // 使用 getVideo 函数查询 firstEpisodeMovieId 对应的视频信息
  const firstEpisodeVideo = await getVideo({ id: firstEpisodeMovieId });

  // 提取 episodes 数组中的 episode 和 movieid
  episodes = await Promise.all(
    tvData.tv.episodes.map(async (episode: any) => {
      const { m3u8 } = await getm3u8({ id: episode.movieid });
      const VIDEO_HOST = process.env.VIDEO_HOST || 'https://v2.shizizuodh.com';
      return {
        episode: episode.episode,
        m3u8: `${VIDEO_HOST}${m3u8}`,
      };
    })
  );

  // 将第一集视频的详细信息赋值给 video 对象
  video = firstEpisodeVideo;
  return (
    <>
        <div className="mt-6 gap-6 flex flex-col w-full">
          {/* Card Section Top */}
          <VideoPlayer
            episodes={episodes}
          />
        </div>

        <h3 className="text-xl font-semibold">智能推荐</h3>
        <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-5 gap-5 w-full">
          {video.likes.map((video: Video) => (
            <CardBalance key={video._id} video={video} />
          ))}
        </div>
</>
  );
}