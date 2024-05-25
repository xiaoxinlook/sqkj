"use client";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { Button, Card, CardFooter, Divider } from '@nextui-org/react';
import { useState } from 'react';

interface VideoPlayerProps {
  episodes?: {
    episode: string;
    m3u8: string;
  }[];
}

const VideoPlayer = ({ episodes }: VideoPlayerProps) => {
  const [videoUrl, setVideoUrl] = useState(episodes && episodes.length > 0 ? episodes[0].m3u8 : '');
  const [loadingEpisode, setLoadingEpisode] = useState('');

  const handleEpisodeClick = (m3u8: string, episode: string) => {
    setLoadingEpisode(episode);
    setVideoUrl(m3u8);
  };

  return (
    <Card className="border-none bg-background/60 dark:bg-default-100/50 max-w-auto" shadow="sm">
      <MediaPlayer src={videoUrl}   playsInline aspectRatio="16/9">
      <DefaultVideoLayout icons={defaultLayoutIcons} />
        <MediaProvider />
      </MediaPlayer>
      <Divider />
      <CardFooter>
      {episodes && episodes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {episodes.map((episode, index) => (
            <Button
              key={index}
              size="sm"
              onClick={() => handleEpisodeClick(episode.m3u8, episode.episode)}
              isLoading={loadingEpisode === episode.episode}
            >
              {episode.episode}
            </Button>
          ))}
        </div>
      )}
      </CardFooter>
    </Card>
  );
};

export default VideoPlayer;