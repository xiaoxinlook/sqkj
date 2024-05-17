// app/page.tsx
import { getContents } from '@/config/api';
import { CardBalance } from '@/components/home/card-balance';
import type { Video } from '@/types/index';

type VideoData = {
  category: string;
  data: Video[];
}[];

const categories = [
  '国产嫩妹',
  '国产自拍',
  '国产偷拍',
  '国产探花',
  '国产黑料',
  '国产直播',
];

export default async function Page(): Promise<JSX.Element> {
  const videoData: VideoData = await Promise.all(
    categories.map((category) =>
      getContents({ category, size: 10, type: 'movie,tv' }).then((data) => ({
        category,
        data: data || [],
      }))
    )
  ).catch((error) => {
    console.error('Failed to fetch video data:', error);
    return [];
  });

  return (

      
        <div className="gap-6 flex flex-col w-full">
          {/* Card Section Top */}
          <div className="flex flex-col gap-2">
            {videoData.map((content, index) => (
              <div className="mt-6 " key={index}>
                <h2 className="text-xl font-semibold mb-2">{content.category}</h2>
                <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 2xl:grid-cols-5 gap-5 w-full">
                  {content.data?.map((video, videoIndex) => (
                    <CardBalance key={videoIndex} video={video} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

  );
}