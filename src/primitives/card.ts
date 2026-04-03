import type { ComponentLogicWithAccessibility, LoadingState } from '../types/base.js';
import { DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import type { JfixStrategy } from '../types/jfix.js';
import { applyAllFudPolicies } from '../policies/compose.js';

export interface CardState {
  title: string;
  content: string;
  width: string | number;
  height: string | number;
  loading: boolean;
  skeleton: boolean;
  interactive: boolean;
  jfixStrategy: JfixStrategy;
}

export interface CardConfig {
  title: string;
  content?: string;
  width: string | number;
  height: string | number;
  loading?: boolean;
  interactive?: boolean;
  ariaLabel?: string;
  jfixStrategy?: JfixStrategy;
}

function normalise(v: string | number): string {
  if (typeof v === 'number') return `${v}px`;
  return v;
}

function renderCard(state: CardState): string {
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

export function createCard(config: CardConfig): ComponentLogicWithAccessibility<CardState> {
  const logic: ComponentLogicWithAccessibility<CardState> = {
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
      setContent: (_state, content: unknown) => ({ content: String(content), loading: false, skeleton: false }),
      setDimensions: (_state, width: unknown, height: unknown) => ({
        width: width as string | number,
        height: height as string | number,
      }),
      setJfixStrategy: (_state, strategy: unknown) => ({ jfixStrategy: strategy as JfixStrategy }),
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
    } as LoadingState,
    reducedMotionConfig: DEFAULT_REDUCED_MOTION,
  };

  return applyAllFudPolicies(logic);
}
