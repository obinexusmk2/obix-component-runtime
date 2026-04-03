import { DEFAULT_TOUCH_TARGET, DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';
function validate(state) {
    const errors = [];
    const { value, type, required } = state;
    if (required && !value.trim()) {
        errors.push(`${state.label} is required.`);
    }
    if (value && type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.push('Please enter a valid email address.');
    }
    if (value && type === 'url') {
        try {
            new URL(value);
        }
        catch {
            errors.push('Please enter a valid URL.');
        }
    }
    return { valid: errors.length === 0, errors, touched: true };
}
function renderInput(state) {
    const isInvalid = state.validation.touched && !state.validation.valid;
    const ariaDescribedBy = [
        state.hintText ? `${state.inputId}-hint` : '',
        isInvalid ? state.errorId : '',
    ].filter(Boolean).join(' ');
    return `<div class="obix-field">
  <label for="${state.inputId}" class="obix-field__label">
    ${state.label}${state.required ? ' <span aria-hidden="true">*</span>' : ''}
  </label>
  ${state.hintText ? `<span id="${state.inputId}-hint" class="obix-form__hint">${state.hintText}</span>` : ''}
  <input
    id="${state.inputId}"
    type="${state.type}"
    class="obix-input"
    value="${state.value}"
    placeholder="${state.placeholder}"
    autocomplete="${state.autocomplete}"
    data-jfix-strategy="fixed-size"
    ${state.required ? 'aria-required="true"' : ''}
    ${state.disabled ? 'aria-disabled="true" disabled' : ''}
    ${state.readonly ? 'aria-readonly="true" readonly' : ''}
    ${isInvalid ? `aria-invalid="true"` : ''}
    ${ariaDescribedBy ? `aria-describedby="${ariaDescribedBy}"` : ''}
  />
  ${isInvalid ? `<span id="${state.errorId}" class="obix-field__error" role="alert" aria-live="polite">${state.validation.errors.join(' ')}</span>` : ''}
</div>`;
}
export function createInput(config) {
    const id = config.id ?? `obix-input-${Math.random().toString(36).slice(2, 8)}`;
    const logic = {
        name: 'ObixInput',
        state: {
            value: '',
            type: config.type ?? 'text',
            label: config.label,
            placeholder: config.placeholder ?? '',
            required: config.required ?? false,
            disabled: config.disabled ?? false,
            readonly: config.readonly ?? false,
            autocomplete: config.autocomplete ?? 'on',
            validationTiming: config.validationTiming ?? 'blur',
            validation: { valid: true, errors: [], touched: false },
            hintText: config.hintText ?? '',
            errorId: `${id}-error`,
            inputId: id,
        },
        actions: {
            change: (state, value) => {
                const next = { ...state, value: String(value) };
                if (state.validationTiming === 'change') {
                    return { value: String(value), validation: validate(next) };
                }
                return { value: String(value) };
            },
            blur: (state) => ({ validation: validate(state) }),
            focus: (_state) => ({}),
            clear: (_state) => ({ value: '', validation: { valid: true, errors: [], touched: false } }),
            validate: (state) => ({ validation: validate(state) }),
        },
        render: renderInput,
        aria: {
            role: 'textbox',
            'aria-label': config.label,
            'aria-required': config.required ?? false,
            'aria-invalid': false,
            'aria-disabled': config.disabled ?? false,
        },
        touchTarget: DEFAULT_TOUCH_TARGET,
        focusConfig: DEFAULT_FOCUS_CONFIG,
        reducedMotionConfig: DEFAULT_REDUCED_MOTION,
    };
    return applyAllFudPolicies(logic);
}
//# sourceMappingURL=input.js.map