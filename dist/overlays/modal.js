import { DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';
export function getFocusableElements(container) {
    const selectors = [
        'a[href]', 'button:not([disabled])', 'textarea:not([disabled])',
        'input:not([disabled])', 'select:not([disabled])', '[tabindex]:not([tabindex="-1"])',
    ].join(', ');
    return Array.from(container.querySelectorAll(selectors));
}
export function createFocusTrap(container) {
    return (e) => {
        if (e.key !== 'Tab')
            return;
        const focusable = getFocusableElements(container);
        if (focusable.length === 0)
            return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        }
        else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    };
}
function renderModal(state) {
    if (!state.open)
        return '';
    return `<div class="obix-modal__overlay" aria-hidden="${!state.open}">
  <div
    class="obix-modal__dialog"
    role="dialog"
    aria-modal="true"
    aria-labelledby="${state.titleId}"
    id="${state.modalId}"
    data-jfix-strategy="box-shadow"
    tabindex="-1"
  >
    <button
      class="obix-modal__close obix-button"
      type="button"
      aria-label="Close dialog"
    >×</button>
    <h2 id="${state.titleId}" class="obix-modal__title">${state.title}</h2>
    <div class="obix-modal__content">${state.content}</div>
  </div>
</div>`;
}
export function createModal(config) {
    const id = config.id ?? `obix-modal-${Math.random().toString(36).slice(2, 8)}`;
    const logic = {
        name: 'ObixModal',
        state: {
            open: false,
            title: config.title,
            content: config.content ?? '',
            backdropClose: config.backdropClose ?? true,
            modalId: id,
            titleId: `${id}-title`,
            label: config.label ?? config.title,
        },
        actions: {
            open: (_state) => ({ open: true }),
            close: (_state) => ({ open: false }),
            setContent: (_state, content) => ({ content: String(content) }),
            backdropClick: (state) => state.backdropClose ? { open: false } : state,
        },
        render: renderModal,
        aria: {
            role: 'dialog',
            'aria-label': config.label ?? config.title,
            'aria-modal': true,
        },
        touchTarget: { minWidth: 44, minHeight: 44, padding: 8 },
        focusConfig: { trapFocus: true, restoreFocus: true, focusVisible: true },
        reducedMotionConfig: DEFAULT_REDUCED_MOTION,
    };
    return applyAllFudPolicies(logic);
}
//# sourceMappingURL=modal.js.map