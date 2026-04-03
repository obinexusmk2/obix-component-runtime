import type { ComponentLogicWithAccessibility } from '../types/base.js';
import { DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';

export type AlertType = 'info' | 'warning' | 'error' | 'success';

export interface AlertState {
  message: string;
  type: AlertType;
  dismissible: boolean;
  visible: boolean;
  returnFocusId: string | null;
}

export interface AlertConfig {
  message: string;
  type?: AlertType;
  dismissible?: boolean;
  returnFocusId?: string;
}

function renderAlert(state: AlertState): string {
  if (!state.visible) return '';
  const isAssertive = state.type === 'error' || state.type === 'warning';
  return `<div
  class="obix-alert obix-alert--${state.type}"
  role="${isAssertive ? 'alert' : 'status'}"
  aria-live="${isAssertive ? 'assertive' : 'polite'}"
  aria-atomic="true"
  data-jfix-strategy="box-shadow"
>
  <span class="obix-alert__message">${state.message}</span>
  ${state.dismissible
    ? `<button class="obix-alert__dismiss obix-button" type="button" aria-label="Dismiss ${state.type} alert">×</button>`
    : ''}
</div>`;
}

export function createAlert(config: AlertConfig): ComponentLogicWithAccessibility<AlertState> {
  const logic: ComponentLogicWithAccessibility<AlertState> = {
    name: 'ObixAlert',
    state: {
      message: config.message,
      type: config.type ?? 'info',
      dismissible: config.dismissible ?? true,
      visible: true,
      returnFocusId: config.returnFocusId ?? null,
    },
    actions: {
      dismiss: (_state) => ({ visible: false }),
      show: (_state) => ({ visible: true }),
      hide: (_state) => ({ visible: false }),
      setMessage: (_state, message: unknown) => ({ message: String(message) }),
      setType: (_state, type: unknown) => ({ type: type as AlertType }),
    },
    render: renderAlert,
    aria: {
      role: 'alert',
      'aria-label': config.message,
      'aria-live': 'assertive',
      'aria-atomic': true,
    },
    focusConfig: DEFAULT_FOCUS_CONFIG,
    reducedMotionConfig: DEFAULT_REDUCED_MOTION,
  };

  return applyAllFudPolicies(logic);
}
