import { DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';
function normalise(v) {
    if (typeof v === 'number')
        return `${v}px`;
    return v;
}
function renderCard(state) {
    const ariaBusy = state.loading ? 'aria-busy="true"' : '';
    const w = normalise(state.width);
    const h = normalise(state.height);
    const content = state.skeleton
        ? `<div class="obix-card__skeleton" aria-hidden="true" style="width:${w};height:${h};"></div>`
        : `<div class="obix-card__content">${state.content}</div>`;
    return `<article
  class="obix-card"
  data-jfix-strategy="${state.jfixStrategy}"
  style="width:${w};min-height:${h};"
  ${ariaBusy}
>
  ${state.title ? `<h2 class="obix-card__title">${state.title}</h2>` : ''}
  ${content}
</article>`;
}
export function createCard(config) {
    const logic = {
        name: 'ObixCard',
        state: {
            title: config.title,
            content: config.content ?? '',
            width: config.width,
            height: config.height,
            loading: config.loading ?? false,
            skeleton: config.loading ?? false,
            interactive: config.interactive ?? false,
            jfixStrategy: config.jfixStrategy ?? 'box-shadow',
        },
        actions: {
            startLoading: (state) => ({ loading: true, skeleton: true, interactive: false }),
            finishLoading: (state) => ({ loading: false, skeleton: false, interactive: true }),
            setContent: (_state, content) => ({ content: String(content), loading: false, skeleton: false }),
            setDimensions: (_state, width, height) => ({
                width: width,
                height: height,
            }),
            setJfixStrategy: (_state, strategy) => ({ jfixStrategy: strategy }),
        },
        render: renderCard,
        aria: {
            role: 'article',
            'aria-label': config.ariaLabel ?? config.title,
            'aria-busy': config.loading ?? false,
        },
        touchTarget: config.interactive
            ? { minWidth: 44, minHeight: 44, padding: 8 }
            : undefined,
        focusConfig: DEFAULT_FOCUS_CONFIG,
        loadingState: {
            loading: config.loading ?? false,
            skeleton: config.loading ?? false,
            interactive: config.interactive ?? false,
        },
        reducedMotionConfig: DEFAULT_REDUCED_MOTION,
    };
    return applyAllFudPolicies(logic);
}
//# sourceMappingURL=card.js.map