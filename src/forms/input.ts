import type { ComponentLogicWithAccessibility, ValidationState } from '../types/base.js';
import { DEFAULT_TOUCH_TARGET, DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';

export type InputType = 'text' | 'email' | 'password' | 'url' | 'tel' | 'number' | 'search';
export type ValidationTiming = 'blur' | 'change' | 'submit';
export type AutocompleteValue = 'on' | 'off' | 'email' | 'username' | 'current-password' | 'new-password' | 'given-name' | 'family-name' | 'name' | 'tel' | 'url' | string;

export interface InputState {
  value: string;
  type: InputType;
  label: string;
  placeholder: string;
  required: boolean;
  disabled: boolean;
  readonly: boolean;
  autocomplete: AutocompleteValue;
  validationTiming: ValidationTiming;
  validation: ValidationState;
  hintText: string;
  errorId: string;
  inputId: string;
}

export interface InputConfig {
  label: string;
  type?: InputType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  autocomplete?: AutocompleteValue;
  validationTiming?: ValidationTiming;
  hintText?: string;
  id?: string;
}

function validate(state: InputState): ValidationState {
  const errors: string[] = [];
  const { value, type, required } = state;

  if (required && !value.trim()) {
    errors.push(`${state.label} is required.`);
  }
  if (value && type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    errors.push('Please enter a valid email address.');
  }
  if (value && type === 'url') {
    try { new URL(value); } catch { errors.push('Please enter a valid URL.'); }
  }

  return { valid: errors.length === 0, errors, touched: true };
}

function renderInput(state: InputState): string {
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

export function createInput(config: InputConfig): ComponentLogicWithAccessibility<InputState> {
  const id = config.id ?? `obix-input-${Math.random().toString(36).slice(2, 8)}`;
  const logic: ComponentLogicWithAccessibility<InputState> = {
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
      change: (state, value: unknown) => {
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
