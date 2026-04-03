import type { ComponentLogicWithAccessibility } from '../types/base.js';
import { DEFAULT_TOUCH_TARGET, DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';

export interface SwitchState {
  checked: boolean;
  disabled: boolean;
  label: string;
  switchId: string;
}

export interface SwitchConfig {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  id?: string;
}

function renderSwitch(state: SwitchState): string {
  return `<div
  class="obix-switch"
  role="switch"
  id="${state.switchId}"
  aria-checked="${state.checked}"
  aria-label="${state.label}"
  ${state.disabled ? 'aria-disabled="true"' : ''}
  tabindex="${state.disabled ? '-1' : '0'}"
  data-jfix-strategy="transform-scale"
>
  <div class="obix-switch__track">
    <div class="obix-switch__thumb"></div>
  </div>
  <span class="obix-switch__label">${state.label}</span>
</div>`;
}

export function createSwitch(config: SwitchConfig): ComponentLogicWithAccessibility<SwitchState> {
  const id = config.id ?? `obix-switch-${Math.random().toString(36).slice(2, 8)}`;
  const logic: ComponentLogicWithAccessibility<SwitchState> = {
    name: 'ObixSwitch',
    state: {
      checked: config.checked ?? false,
      disabled: config.disabled ?? false,
      label: config.label,
      switchId: id,
    },
    actions: {
      toggle: (state) => state.disabled ? state : { checked: !state.checked },
      on: (state) => state.disabled ? state : { checked: true },
      off: (state) => state.disabled ? state : { checked: false },
    },
    render: renderSwitch,
    aria: {
      role: 'switch',
      'aria-label': config.label,
      'aria-checked': config.checked ?? false,
      'aria-disabled': config.disabled ?? false,
    },
    touchTarget: DEFAULT_TOUCH_TARGET,
    focusConfig: DEFAULT_FOCUS_CONFIG,
    reducedMotionConfig: DEFAULT_REDUCED_MOTION,
  };

  return applyAllFudPolicies(logic);
}
