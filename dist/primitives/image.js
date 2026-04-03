import { DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';
function renderImage(state) {
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
export function createImage(config) {
    const logic = {
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
            setSrc: (_state, src) => ({ src: String(src), loaded: false }),
            setLoaded: (_state, loaded) => ({ loaded: Boolean(loaded) }),
            setCaption: (_state, caption) => ({ caption: String(caption) }),
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
//# sourceMappingURL=image.js.map