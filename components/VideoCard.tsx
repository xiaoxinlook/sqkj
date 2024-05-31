import Link from "next/link";
import Image from "next/image";
import type { Video } from "@/types/index";

type VideoCardProps = {
  video: Video;
};

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const IMG_HOST = process.env.NEXT_PUBLIC_IMG_HOST;
  const posterUrl = `${IMG_HOST}${video.poster2 ? video.poster2.url : video.poster}`;
  const posterWidth = video.poster2 && video.poster2.width ? video.poster2.width : 850;
  const posterHeight = video.poster2 && video.poster2.height ? video.poster2.height : 500;
  const href = video.episodes ? `/videos/${video._id}` : `/video/${video._id}`;

  return (
    <Link href={href} scroll={true} prefetch={true}>
      <div className="group relative overflow-hidden rounded-lg aspect-w-16 aspect-h-10">
        <Image
          src={posterUrl}
          loading="lazy"
          width={posterWidth}
          height={posterHeight}
          alt={video.originalname}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            `<svg xmlns="http://www.w3.org/2000/svg" width="${posterWidth}" height="${posterHeight}" viewBox="0 0 ${posterWidth} ${posterHeight}"><rect fill="#EBEBEB" width="100%" height="100%"/></svg>`
          )}`}
          placeholder="blur"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 via-black/50 to-transparent p-4">
          <span className="bg-black/30 text-white px-1 py-0.5 rounded-md absolute bottom-4 right-4 text-xs">
            {video.duration}
          </span>
        </div>
      </div>
      <div className="mt-2">
        <h3
          className="text-cyan-600 text-lg  font-semibold line-clamp-2 sm:text-base"
          title={video.originalname ?? video.title ?? "Untitled"}
        >
          {video.originalname ?? video.title ?? "Untitled"}
        </h3>
      </div>
    </Link>
  );
};

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);