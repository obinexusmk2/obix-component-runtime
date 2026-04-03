import { DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';
function renderToast(state) {
    if (!state.visible)
        return '';
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
export function createToast(config) {
    const id = config.id ?? `obix-toast-${Math.random().toString(36).slice(2, 8)}`;
    const logic = {
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
            setMessage: (_state, message) => ({ message: String(message) }),
            setDuration: (_state, duration) => ({ duration: Number(duration) }),
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
//# sourceMappingURL=toast.js.map