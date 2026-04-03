import type { ComponentLogicWithAccessibility } from '../types/base.js';
import { DEFAULT_TOUCH_TARGET, DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';

export type CheckedState = boolean | 'mixed';

export interface CheckboxState {
  checked: CheckedState;
  label: string;
  value: string;
  required: boolean;
  disabled: boolean;
  groupLabel: string;
  inputId: string;
}

export interface CheckboxConfig {
  label: string;
  value?: string;
  checked?: boolean;
  indeterminate?: boolean;
  required?: boolean;
  disabled?: boolean;
  groupLabel?: string;
  id?: string;
}

function renderCheckbox(state: CheckboxState): string {
  const ariaChecked = state.checked === 'mixed' ? 'mixed' : state.checked ? 'true' : 'false';
  return `<div class="obix-checkbox" data-jfix-strategy="fixed-size">
  <input
    type="checkbox"
    id="${state.inputId}"
    name="${state.value}"
    value="${state.value}"
    ${state.checked === true ? 'checked' : ''}
    ${state.checked === 'mixed' ? 'data-indeterminate="true"' : ''}
    ${state.required ? 'aria-required="true"' : ''}
    ${state.disabled ? 'aria-disabled="true" disabled' : ''}
    aria-checked="${ariaChecked}"
    ${state.groupLabel ? `aria-describedby="${state.inputId}-group"` : ''}
  />
  <label for="${state.inputId}" class="obix-checkbox__label">${state.label}</label>
</div>`;
}

export function createCheckbox(config: CheckboxConfig): ComponentLogicWithAccessibility<CheckboxState> {
  const id = config.id ?? `obix-checkbox-${Math.random().toString(36).slice(2, 8)}`;
  const initialChecked: CheckedState = config.indeterminate ? 'mixed' : (config.checked ?? false);

  const logic: ComponentLogicWithAccessibility<CheckboxState> = {
    name: 'ObixCheckbox',
    state: {
      checked: initialChecked,
      label: config.label,
      value: config.value ?? config.label.toLowerCase().replace(/\s+/g, '-'),
      required: config.required ?? false,
      disabled: config.disabled ?? false,
      groupLabel: config.groupLabel ?? '',
      inputId: id,
    },
    actions: {
      toggle: (state) => {
        if (state.disabled) return state;
        return { checked: !state.checked };
      },
      check: (state) => state.disabled ? state : { checked: true },
      uncheck: (state) => state.disabled ? state : { checked: false },
      setIndeterminate: (state) => state.disabled ? state : { checked: 'mixed' as CheckedState },
    },
    render: renderCheckbox,
    aria: {
      role: 'checkbox',
      'aria-label': config.label,
      'aria-checked': initialChecked,
      'aria-required': config.required ?? false,
      'aria-disabled': config.disabled ?? false,
    },
    touchTarget: DEFAULT_TOUCH_TARGET,
    focusConfig: DEFAULT_FOCUS_CONFIG,
    reducedMotionConfig: DEFAULT_REDUCED_MOTION,
  };

  return applyAllFudPolicies(logic);
}
