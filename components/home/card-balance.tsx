import { Card, CardFooter, Button } from "@nextui-org/react";
import React from "react";
import Link from "next/link";
import { Image } from "@nextui-org/image";
import type { Video } from '@/types/index';

type VideoCardProps = {
  video: Video;
};

export const CardBalance: React.FC<VideoCardProps> = ({ video }) => {
  const IMG_HOST = process.env.NEXT_PUBLIC_IMG_HOST;
  const PREVIEW_HOST = process.env.NEXT_PUBLIC_PREVIEW_HOST
  const posterUrl = `${IMG_HOST}${video.poster2 ? video.poster2.url : video.poster}`;
  const previewvideo = `${PREVIEW_HOST}${video.previewvideo}`;

  const posterwidth = video.poster2 && video.poster2.width ? video.poster2.width : 850;
  const posterheight = video.poster2 && video.poster2.height ? video.poster2.height : 500;
  const href = video.episodes ? `/videos/${video._id}` : `/video/${video._id}`;
  return (
    
<Card
  isFooterBlurred
  radius="lg"
  className=" group border-none self-start aspect-w-16 aspect-h-9 "
  style={{ backgroundImage: `url(${posterUrl})` } as any}
>
<Link href={href} scroll={true} prefetch={true}>
  <Image
    
    isBlurred
    src={posterUrl}
    loading="lazy"
    width={700}
    height={400}
    alt={video.originalname}
    className="backdrop-blur-sm md:min-h-48 md:max-h-48 object-contain"
  />
  </Link>
  <CardFooter className="lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 ease-in-out justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
    <div>
    <Link href={href} scroll={true} prefetch={true}>
      <p className="text-tiny text-white/80">{video.originalname ?? video.title ??  'Untitled'}</p>
      </Link>
    </div>
    
      <Button
        className="text-tiny text-white bg-black/20"
        variant="flat"
        color="default"
        radius="lg"
        size="sm"
      >
        {video.duration}
      </Button>
   
  </CardFooter>
</Card>

  );
};