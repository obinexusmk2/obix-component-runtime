import type { ComponentLogicWithAccessibility } from '../types/base.js';
import { DEFAULT_TOUCH_TARGET, DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupState {
  options: RadioOption[];
  selectedValue: string | null;
  name: string;
  groupLabel: string;
  required: boolean;
  disabled: boolean;
  focusedIndex: number;
}

export interface RadioGroupConfig {
  groupLabel: string;
  options: RadioOption[];
  name?: string;
  selectedValue?: string;
  required?: boolean;
  disabled?: boolean;
}

function renderRadioGroup(state: RadioGroupState): string {
  const radios = state.options
    .map(
      (opt, i) => `
    <div class="obix-radio-group__item" data-jfix-strategy="fixed-size">
      <input
        type="radio"
        id="${state.name}-${i}"
        name="${state.name}"
        value="${opt.value}"
        ${opt.value === state.selectedValue ? 'checked aria-checked="true"' : 'aria-checked="false"'}
        ${opt.disabled || state.disabled ? 'disabled aria-disabled="true"' : ''}
        ${state.required ? 'aria-required="true"' : ''}
        tabindex="${i === state.focusedIndex ? '0' : '-1'}"
      />
      <label for="${state.name}-${i}">${opt.label}</label>
    </div>`,
    )
    .join('');

  return `<fieldset class="obix-radio-group" role="radiogroup" aria-label="${state.groupLabel}">
  <legend class="obix-radio-group__legend">${state.groupLabel}</legend>
  ${radios}
</fieldset>`;
}

export function createRadioGroup(config: RadioGroupConfig): ComponentLogicWithAccessibility<RadioGroupState> {
  const name = config.name ?? `obix-radio-${Math.random().toString(36).slice(2, 8)}`;
  const initialIndex = config.selectedValue
    ? config.options.findIndex((o) => o.value === config.selectedValue)
    : 0;

  const logic: ComponentLogicWithAccessibility<RadioGroupState> = {
    name: 'ObixRadioGroup',
    state: {
      options: config.options,
      selectedValue: config.selectedValue ?? null,
      name,
      groupLabel: config.groupLabel,
      required: config.required ?? false,
      disabled: config.disabled ?? false,
      focusedIndex: Math.max(0, initialIndex),
    },
    actions: {
      select: (state, value: unknown) => {
        const idx = state.options.findIndex((o) => o.value === value);
        return { selectedValue: String(value), focusedIndex: Math.max(0, idx) };
      },
      navigateNext: (state) => {
        const next = (state.focusedIndex + 1) % state.options.length;
        return { focusedIndex: next, selectedValue: state.options[next]?.value ?? null };
      },
      navigatePrev: (state) => {
        const prev = (state.focusedIndex - 1 + state.options.length) % state.options.length;
        return { focusedIndex: prev, selectedValue: state.options[prev]?.value ?? null };
      },
      navigateFirst: (state) => ({ focusedIndex: 0, selectedValue: state.options[0]?.value ?? null }),
      navigateLast: (state) => {
        const last = state.options.length - 1;
        return { focusedIndex: last, selectedValue: state.options[last]?.value ?? null };
      },
    },
    render: renderRadioGroup,
    aria: {
      role: 'radiogroup',
      'aria-label': config.groupLabel,
      'aria-required': config.required ?? false,
    },
    touchTarget: DEFAULT_TOUCH_TARGET,
    focusConfig: DEFAULT_FOCUS_CONFIG,
    reducedMotionConfig: DEFAULT_REDUCED_MOTION,
  };

  return applyAllFudPolicies(logic);
}
