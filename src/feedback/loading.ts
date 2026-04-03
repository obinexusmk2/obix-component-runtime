import type { ComponentLogicWithAccessibility } from '../types/base.js';
import { DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';

export interface LoadingState {
  visible: boolean;
  label: string;
  overlay: boolean;
}

export interface LoadingConfig {
  label?: string;
  overlay?: boolean;
}

function renderLoading(state: LoadingState): string {
  if (!state.visible) return '';
  return `<div
  class="obix-loading${state.overlay ? ' obix-loading--overlay' : ''}"
  role="status"
  aria-live="polite"
  aria-busy="${state.visible}"
  aria-label="${state.label}"
>
  <div class="obix-loading__spinner" aria-hidden="true"></div>
  <span class="obix-loading__label">${state.label}</span>
</div>`;
}

export function createLoading(config: LoadingConfig): ComponentLogicWithAccessibility<LoadingState> {
  const logic: ComponentLogicWithAccessibility<LoadingState> = {
    name: 'ObixLoading',
    state: {
      visible: false,
      label: config.label ?? 'Loading…',
      overlay: config.overlay ?? false,
    },
    actions: {
      show: (_state) => ({ visible: true }),
      hide: (_state) => ({ visible: false }),
      setLabel: (_state, label: unknown) => ({ label: String(label) }),
    },
    render: renderLoading,
    aria: {
      role: 'status',
      'aria-label': config.label ?? 'Loading…',
      'aria-live': 'polite',
      'aria-busy': false,
    },
    focusConfig: DEFAULT_FOCUS_CONFIG,
    reducedMotionConfig: { ...DEFAULT_REDUCED_MOTION, fallback: 'instant' },
  };

  return applyAllFudPolicies(logic);
}
