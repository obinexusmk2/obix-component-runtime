import type { ComponentLogicWithAccessibility } from '../types/base.js';
import { DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';

export interface VideoTrack {
  src: string;
  kind: 'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata';
  srclang: string;
  label: string;
  default?: boolean;
}

export interface VideoState {
  src: string;
  poster: string;
  playing: boolean;
  muted: boolean;
  captionsEnabled: boolean;
  controlsVisible: boolean;
  transcriptUrl: string;
  tracks: VideoTrack[];
  width: number;
  height: number;
  label: string;
}

export interface VideoConfig {
  src: string;
  poster?: string;
  width?: number;
  height?: number;
  tracks?: VideoTrack[];
  transcriptUrl?: string;
  label: string;
  autoPlay?: boolean;
}

function renderVideo(state: VideoState): string {
  const tracks = state.tracks
    .map(
      (t) =>
        `<track src="${t.src}" kind="${t.kind}" srclang="${t.srclang}" label="${t.label}"${t.default ? ' default' : ''}>`,
    )
    .join('\n  ');

  return `<div class="obix-video" role="region" aria-label="${state.label}">
  <video
    src="${state.src}"
    ${state.poster ? `poster="${state.poster}"` : ''}
    width="${state.width}"
    height="${state.height}"
    ${state.muted ? 'muted' : ''}
    ${state.captionsEnabled ? '' : ''}
    class="obix-video__player"
    aria-label="${state.label}"
  >
  ${tracks}
  Your browser does not support the video element.
  </video>
  <div class="obix-video__controls" aria-label="Video controls">
    <button class="obix-video__controls obix-button" aria-label="${state.playing ? 'Pause' : 'Play'}" type="button">
      ${state.playing ? '⏸' : '▶'}
    </button>
    <button class="obix-video__controls obix-button" aria-label="${state.muted ? 'Unmute' : 'Mute'}" type="button">
      ${state.muted ? '🔇' : '🔊'}
    </button>
    <button class="obix-video__controls obix-button" aria-label="${state.captionsEnabled ? 'Hide captions' : 'Show captions'}" type="button">
      CC
    </button>
  </div>
  ${state.transcriptUrl ? `<a href="${state.transcriptUrl}" class="obix-video__transcript">View transcript</a>` : ''}
</div>`;
}

export function createVideo(config: VideoConfig): ComponentLogicWithAccessibility<VideoState> {
  const logic: ComponentLogicWithAccessibility<VideoState> = {
    name: 'ObixVideo',
    state: {
      src: config.src,
      poster: config.poster ?? '',
      playing: config.autoPlay ?? false,
      muted: false,
      captionsEnabled: true, // captions on by default for accessibility
      controlsVisible: true,
      transcriptUrl: config.transcriptUrl ?? '',
      tracks: config.tracks ?? [],
      width: config.width ?? 640,
      height: config.height ?? 360,
      label: config.label,
    },
    actions: {
      play: (state) => ({ playing: true }),
      pause: (state) => ({ playing: false }),
      toggleMute: (state) => ({ muted: !state.muted }),
      toggleCaptions: (state) => ({ captionsEnabled: !state.captionsEnabled }),
      toggleControls: (state) => ({ controlsVisible: !state.controlsVisible }),
      setSrc: (_state, src: unknown) => ({ src: String(src), playing: false }),
    },
    render: renderVideo,
    aria: {
      role: 'region',
      'aria-label': config.label,
    },
    touchTarget: { minWidth: 44, minHeight: 44, padding: 8 },
    focusConfig: DEFAULT_FOCUS_CONFIG,
    reducedMotionConfig: DEFAULT_REDUCED_MOTION,
  };

  return applyAllFudPolicies(logic);
}
