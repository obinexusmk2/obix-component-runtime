import type { ComponentLogicWithAccessibility } from '../types/base.js';
export type ImageLoading = 'lazy' | 'eager' | 'auto';
export interface ImageState {
    src: string;
    alt: string;
    width: number;
    height: number;
    loading: ImageLoading;
    useFigure: boolean;
    caption: string;
    loaded: boolean;
}
export interface ImageConfig {
    src: string;
    alt: string;
    width: number;
    height: number;
    loading?: ImageLoading;
    useFigure?: boolean;
    caption?: string;
}
export declare function createImage(config: ImageConfig): ComponentLogicWithAccessibility<ImageState>;
//# sourceMappingURL=image.d.ts.map