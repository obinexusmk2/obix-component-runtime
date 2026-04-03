import type { ComponentLogicWithAccessibility } from '../types/base.js';
import { DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';

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

function renderImage(state: ImageState): string {
  const aspectRatio = state.height > 0 ? `${state.width} / ${state.height}` : 'auto';
  const img = `<img
  src="${state.src}"
  alt="${state.alt}"
  width="${state.width}"
  height="${state.height}"
  loading="${state.loading}"
  class="obix-image"
  style="aspect-ratio:${aspectRatio};"
  ${state.loaded ? '' : 'aria-busy="true"'}
/>`;

  if (state.useFigure) {
    return `<figure class="obix-image-figure">
  ${img}
  ${state.caption ? `<figcaption class="obix-image-caption">${state.caption}</figcaption>` : ''}
</figure>`;
  }
  return img;
}

export function createImage(config: ImageConfig): ComponentLogicWithAccessibility<ImageState> {
  const logic: ComponentLogicWithAccessibility<ImageState> = {
    name: 'ObixImage',
    state: {
      src: config.src,
      alt: config.alt,
      width: config.width,
      height: config.height,
      loading: config.loading ?? 'lazy',
      useFigure: config.useFigure ?? false,
      caption: config.caption ?? '',
      loaded: false,
    },
    actions: {
      setSrc: (_state, src: unknown) => ({ src: String(src), loaded: false }),
      setLoaded: (_state, loaded: unknown) => ({ loaded: Boolean(loaded) }),
      setCaption: (_state, caption: unknown) => ({ caption: String(caption) }),
    },
    render: renderImage,
    aria: {
      role: 'img',
      'aria-label': config.alt,
    },
    reducedMotionConfig: DEFAULT_REDUCED_MOTION,
  };

  return applyAllFudPolicies(logic);
}
