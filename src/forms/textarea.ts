import type { ComponentLogicWithAccessibility, ValidationState } from '../types/base.js';
import { DEFAULT_TOUCH_TARGET, DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';

export type ResizeMode = 'none' | 'vertical' | 'horizontal' | 'both';

export interface TextareaState {
  value: string;
  label: string;
  placeholder: string;
  rows: number;
  cols: number;
  maxLength: number | null;
  resize: ResizeMode;
  autoExpand: boolean;
  required: boolean;
  disabled: boolean;
  readonly: boolean;
  validation: ValidationState;
  textareaId: string;
}

export interface TextareaConfig {
  label: string;
  placeholder?: string;
  rows?: number;
  cols?: number;
  maxLength?: number;
  resize?: ResizeMode;
  autoExpand?: boolean;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  id?: string;
}

function validate(state: TextareaState): ValidationState {
  const errors: string[] = [];
  if (state.required && !state.value.trim()) {
    errors.push(`${state.label} is required.`);
  }
  if (state.maxLength !== null && state.value.length > state.maxLength) {
    errors.push(`Maximum ${state.maxLength} characters allowed.`);
  }
  return { valid: errors.length === 0, errors, touched: true };
}

function renderTextarea(state: TextareaState): string {
  const isInvalid = state.validation.touched && !state.validation.valid;
  const remaining = state.maxLength !== null ? state.maxLength - state.value.length : null;
  const counterId = `${state.textareaId}-counter`;

  return `<div class="obix-field">
  <label for="${state.textareaId}" class="obix-field__label">
    ${state.label}${state.required ? ' <span aria-hidden="true">*</span>' : ''}
  </label>
  <textarea
    id="${state.textareaId}"
    class="obix-textarea"
    placeholder="${state.placeholder}"
    rows="${state.rows}"
    ${state.cols ? `cols="${state.cols}"` : ''}
    ${state.maxLength !== null ? `maxlength="${state.maxLength}"` : ''}
    style="resize:${state.resize};"
    data-jfix-strategy="fixed-size"
    ${state.required ? 'aria-required="true"' : ''}
    ${state.disabled ? 'aria-disabled="true" disabled' : ''}
    ${state.readonly ? 'aria-readonly="true" readonly' : ''}
    aria-multiline="true"
    ${isInvalid ? 'aria-invalid="true"' : ''}
    ${state.maxLength !== null ? `aria-describedby="${counterId}"` : ''}
  >${state.value}</textarea>
  ${state.maxLength !== null
    ? `<div id="${counterId}" class="obix-textarea__counter" aria-live="polite" aria-atomic="true">${remaining} characters remaining</div>`
    : ''}
  ${isInvalid ? `<span class="obix-field__error" role="alert">${state.validation.errors.join(' ')}</span>` : ''}
</div>`;
}

export function createTextarea(config: TextareaConfig): ComponentLogicWithAccessibility<TextareaState> {
  const id = config.id ?? `obix-textarea-${Math.random().toString(36).slice(2, 8)}`;
  const logic: ComponentLogicWithAccessibility<TextareaState> = {
    name: 'ObixTextarea',
    state: {
      value: '',
      label: config.label,
      placeholder: config.placeholder ?? '',
      rows: config.rows ?? 4,
      cols: config.cols ?? 0,
      maxLength: config.maxLength ?? null,
      resize: config.resize ?? 'vertical',
      autoExpand: config.autoExpand ?? false,
      required: config.required ?? false,
      disabled: config.disabled ?? false,
      readonly: config.readonly ?? false,
      validation: { valid: true, errors: [], touched: false },
      textareaId: id,
    },
    actions: {
      change: (state, value: unknown) => ({ value: String(value) }),
      blur: (state) => ({ validation: validate(state) }),
      focus: (_state) => ({}),
      clear: (_state) => ({ value: '', validation: { valid: true, errors: [], touched: false } }),
      validate: (state) => ({ validation: validate(state) }),
    },
    render: renderTextarea,
    aria: {
      role: 'textbox',
      'aria-label': config.label,
      'aria-multiline': true,
      'aria-required': config.required ?? false,
      'aria-disabled': config.disabled ?? false,
    },
    touchTarget: DEFAULT_TOUCH_TARGET,
    focusConfig: DEFAULT_FOCUS_CONFIG,
    reducedMotionConfig: DEFAULT_REDUCED_MOTION,
  };

  return applyAllFudPolicies(logic);
}
