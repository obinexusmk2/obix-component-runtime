import type { ComponentLogicWithAccessibility } from '../types/base.js';
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
export declare function createVideo(config: VideoConfig): ComponentLogicWithAccessibility<VideoState>;
//# sourceMappingURL=video.d.ts.map