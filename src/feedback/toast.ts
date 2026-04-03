import type { ComponentLogicWithAccessibility } from '../types/base.js';
import { DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';

export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export type ToastType = 'info' | 'warning' | 'error' | 'success';

export interface ToastState {
  message: string;
  type: ToastType;
  visible: boolean;
  duration: number;
  position: ToastPosition;
  toastId: string;
  pauseOnHover: boolean;
}

export interface ToastConfig {
  message: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  pauseOnHover?: boolean;
  id?: string;
}

function renderToast(state: ToastState): string {
  if (!state.visible) return '';
  return `<div
  id="${state.toastId}"
  class="obix-toast obix-toast--${state.type} obix-toast--${state.position}"
  role="status"
  aria-live="polite"
  aria-atomic="true"
  data-jfix-strategy="box-shadow"
  data-pause-on-hover="${state.pauseOnHover}"
>
  <span class="obix-toast__message">${state.message}</span>
  <button class="obix-toast__dismiss obix-button" type="button" aria-label="Dismiss notification">×</button>
</div>`;
}

export function createToast(config: ToastConfig): ComponentLogicWithAccessibility<ToastState> {
  const id = config.id ?? `obix-toast-${Math.random().toString(36).slice(2, 8)}`;
  const logic: ComponentLogicWithAccessibility<ToastState> = {
    name: 'ObixToast',
    state: {
      message: config.message,
      type: config.type ?? 'info',
      visible: true,
      duration: config.duration ?? 5000,
      position: config.position ?? 'bottom-right',
      toastId: id,
      pauseOnHover: config.pauseOnHover ?? true,
    },
    actions: {
      show: (_state) => ({ visible: true }),
      hide: (_state) => ({ visible: false }),
      dismiss: (_state) => ({ visible: false }),
      setMessage: (_state, message: unknown) => ({ message: String(message) }),
      setDuration: (_state, duration: unknown) => ({ duration: Number(duration) }),
    },
    render: renderToast,
    aria: {
      role: 'status',
      'aria-label': config.message,
      'aria-live': 'polite',
      'aria-atomic': true,
    },
    focusConfig: DEFAULT_FOCUS_CONFIG,
    reducedMotionConfig: DEFAULT_REDUCED_MOTION,
  };

  return applyAllFudPolicies(logic);
}
