import { DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';
function renderAlert(state) {
    if (!state.visible)
        return '';
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
export function createAlert(config) {
    const logic = {
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
            setMessage: (_state, message) => ({ message: String(message) }),
            setType: (_state, type) => ({ type: type }),
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
//# sourceMappingURL=alert.js.map