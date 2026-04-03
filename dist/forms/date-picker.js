import { DEFAULT_TOUCH_TARGET, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';
function renderDatePicker(state) {
    const today = new Date().toISOString().split('T')[0] ?? '';
    return `<div class="obix-field obix-date-picker__wrapper">
  <label for="${state.inputId}" class="obix-field__label">
    ${state.label}${state.required ? ' <span aria-hidden="true">*</span>' : ''}
  </label>
  <input
    type="date"
    id="${state.inputId}"
    class="obix-date-picker"
    value="${state.value ?? ''}"
    ${state.minDate ? `min="${state.minDate}"` : ''}
    ${state.maxDate ? `max="${state.maxDate}"` : ''}
    ${state.required ? 'aria-required="true"' : ''}
    ${state.disabled ? 'aria-disabled="true" disabled' : ''}
    aria-expanded="${state.open}"
    data-jfix-strategy="fixed-size"
    aria-label="${state.label}"
  />
  ${state.open ? `<div
    class="obix-date-picker__calendar"
    role="dialog"
    aria-label="Date picker calendar"
    aria-modal="true"
  >
    <div class="obix-date-picker__calendar-header">
      <button class="obix-button obix-date-picker__calendar-nav" type="button" aria-label="Previous month">‹</button>
      <span aria-live="polite">${state.viewYear}-${String(state.viewMonth + 1).padStart(2, '0')}</span>
      <button class="obix-button obix-date-picker__calendar-nav" type="button" aria-label="Next month">›</button>
    </div>
    <div class="obix-date-picker__calendar-grid" role="grid" aria-label="Calendar">
      <!-- Calendar days rendered by adapter -->
    </div>
  </div>` : ''}
</div>`;
}
export function createDatePicker(config) {
    const id = config.id ?? `obix-datepicker-${Math.random().toString(36).slice(2, 8)}`;
    const now = new Date();
    const logic = {
        name: 'ObixDatePicker',
        state: {
            value: config.value ?? null,
            open: false,
            minDate: config.minDate ?? '',
            maxDate: config.maxDate ?? '',
            disabled: config.disabled ?? false,
            required: config.required ?? false,
            label: config.label,
            inputId: id,
            viewYear: now.getFullYear(),
            viewMonth: now.getMonth(),
        },
        actions: {
            open: (_state) => ({ open: true }),
            close: (_state) => ({ open: false }),
            toggle: (state) => ({ open: !state.open }),
            selectDate: (_state, date) => ({ value: String(date), open: false }),
            clear: (_state) => ({ value: null }),
            prevMonth: (state) => ({
                viewMonth: state.viewMonth === 0 ? 11 : state.viewMonth - 1,
                viewYear: state.viewMonth === 0 ? state.viewYear - 1 : state.viewYear,
            }),
            nextMonth: (state) => ({
                viewMonth: state.viewMonth === 11 ? 0 : state.viewMonth + 1,
                viewYear: state.viewMonth === 11 ? state.viewYear + 1 : state.viewYear,
            }),
        },
        render: renderDatePicker,
        aria: {
            role: 'textbox',
            'aria-label': config.label,
            'aria-expanded': false,
            'aria-required': config.required ?? false,
            'aria-disabled': config.disabled ?? false,
        },
        touchTarget: DEFAULT_TOUCH_TARGET,
        focusConfig: { trapFocus: false, restoreFocus: true, focusVisible: true },
        reducedMotionConfig: DEFAULT_REDUCED_MOTION,
    };
    return applyAllFudPolicies(logic);
}
//# sourceMappingURL=date-picker.js.map