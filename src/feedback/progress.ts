import type { ComponentLogicWithAccessibility } from '../types/base.js';
import { DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';

export interface ProgressState {
  value: number;
  min: number;
  max: number;
  indeterminate: boolean;
  label: string;
  valueText: string | null;
}

export interface ProgressConfig {
  label: string;
  value?: number;
  min?: number;
  max?: number;
  indeterminate?: boolean;
  valueText?: string;
}

function renderProgress(state: ProgressState): string {
  const pct = state.indeterminate ? 0 : ((state.value - state.min) / (state.max - state.min)) * 100;
  return `<div
  class="obix-progress${state.indeterminate ? ' obix-progress--indeterminate' : ''}"
  role="progressbar"
  aria-valuenow="${state.indeterminate ? undefined : state.value}"
  aria-valuemin="${state.min}"
  aria-valuemax="${state.max}"
  aria-label="${state.label}"
  ${state.valueText ? `aria-valuetext="${state.valueText}"` : ''}
  ${state.indeterminate ? 'aria-busy="true"' : ''}
>
  <div class="obix-progress__fill" style="width:${state.indeterminate ? '' : `${pct}%`};"></div>
</div>`;
}

export function createProgress(config: ProgressConfig): ComponentLogicWithAccessibility<ProgressState> {
  const logic: ComponentLogicWithAccessibility<ProgressState> = {
    name: 'ObixProgress',
    state: {
      value: config.value ?? 0,
      min: config.min ?? 0,
      max: config.max ?? 100,
      indeterminate: config.indeterminate ?? false,
      label: config.label,
      valueText: config.valueText ?? null,
    },
    actions: {
      setValue: (_state, value: unknown) => ({ value: Number(value), indeterminate: false }),
      setIndeterminate: (_state, indeterminate: unknown) => ({ indeterminate: Boolean(indeterminate) }),
      complete: (state) => ({ value: state.max, indeterminate: false }),
      reset: (state) => ({ value: state.min }),
      setValueText: (_state, text: unknown) => ({ valueText: String(text) }),
    },
    render: renderProgress,
    aria: {
      role: 'progressbar',
      'aria-label': config.label,
      'aria-valuenow': config.value ?? 0,
      'aria-valuemin': config.min ?? 0,
      'aria-valuemax': config.max ?? 100,
    },
    focusConfig: DEFAULT_FOCUS_CONFIG,
    reducedMotionConfig: DEFAULT_REDUCED_MOTION,
  };

  return applyAllFudPolicies(logic);
}
