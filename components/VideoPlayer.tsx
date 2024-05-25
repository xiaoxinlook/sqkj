'use client';

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import {
  MediaPlayer,
  MediaProvider,
  isHLSProvider,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from '@vidstack/react';
import { Gesture } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { Poster } from '@vidstack/react';
import HLS from 'hls.js';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  posterUrl: string;
}

export default function VideoPlayer({ title,videoUrl,posterUrl}: VideoPlayerProps) {


    function onProviderChange(
      provider: MediaProviderAdapter | null,
      nativeEvent: MediaProviderChangeEvent,
    ) {
      if (isHLSProvider(provider)) {
        // Static import
        provider.library = HLS;
        // Or, dynamic import
        provider.library = () => import('hls.js');
      }
    }

  return (
    <MediaPlayer
      title={title}
      src={videoUrl}
      onProviderChange={onProviderChange}
      playsInline
      aspectRatio="16/9"
    >
       <MediaProvider>
              <Poster
                className="vds-poster"
                src={posterUrl}
                alt="视频海报"
              />
            </MediaProvider>
      <Gesture className="vds-gesture" event="pointerup" action="toggle:paused" />
      <Gesture className="vds-gesture" event="pointerup" action="toggle:controls" />
      <Gesture className="vds-gesture" event="dblpointerup" action="seek:-10" />
      <Gesture className="vds-gesture" event="dblpointerup" action="seek:10" />
      <Gesture className="vds-gesture" event="dblpointerup" action="toggle:fullscreen" />
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
}