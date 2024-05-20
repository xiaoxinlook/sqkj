'use client';

import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import {
  MediaPlayer,
  MediaProvider,
  isHLSProvider,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from '@vidstack/react';
import { Gesture } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
import HLS from 'hls.js';

type VideoPlayerProps = {
  title: string;
  src: string;
};

export default function VideoPlayer({ title,src}: VideoPlayerProps) {


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
      src={src}
      onProviderChange={onProviderChange}
      playsInline
      aspectRatio="16/9"
    >
      <MediaProvider />
      <Gesture className="vds-gesture" event="pointerup" action="toggle:paused" />
      <Gesture className="vds-gesture" event="pointerup" action="toggle:controls" />
      <Gesture className="vds-gesture" event="dblpointerup" action="seek:-10" />
      <Gesture className="vds-gesture" event="dblpointerup" action="seek:10" />
      <Gesture className="vds-gesture" event="dblpointerup" action="toggle:fullscreen" />
      <PlyrLayout icons={plyrLayoutIcons} />
    </MediaPlayer>
  );
}