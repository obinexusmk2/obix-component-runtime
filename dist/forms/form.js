import { DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';
function computeFormValid(fields) {
    return Object.values(fields).every((f) => f.validation.valid);
}
function renderForm(state) {
    const hasErrors = !state.valid && state.submitted;
    const errorSummaryHtml = hasErrors && state.errorSummary.length > 0
        ? `<div class="obix-form__error-summary" role="alert" aria-live="assertive">
        <h2 id="${state.formId}-errors">There are ${state.errorSummary.length} error(s) in this form:</h2>
        <ul>${state.errorSummary.map((e) => `<li>${e}</li>`).join('')}</ul>
      </div>`
        : '';
    return `<form
  id="${state.formId}"
  class="obix-form"
  aria-label="${state.formLabel}"
  ${state.submitting ? 'aria-busy="true"' : ''}
  ${hasErrors ? `aria-describedby="${state.formId}-errors"` : ''}
  novalidate
>
  ${errorSummaryHtml}
  <div class="obix-form__fields">
    <!-- Field slots rendered by consumer -->
  </div>
</form>`;
}
export function createForm(config) {
    const id = config.id ?? `obix-form-${Math.random().toString(36).slice(2, 8)}`;
    const initialFields = {};
    for (const [key, field] of Object.entries(config.fields ?? {})) {
        initialFields[key] = {
            value: '',
            label: field.label,
            validation: { valid: true, errors: [], touched: false },
        };
    }
    const logic = {
        name: 'ObixForm',
        state: {
            fields: initialFields,
            valid: true,
            submitting: false,
            submitted: false,
            formId: id,
            formLabel: config.label,
            errorSummary: [],
        },
        actions: {
            setFieldValue: (state, key, value) => {
                const fields = {
                    ...state.fields,
                    [String(key)]: { ...state.fields[String(key)], value: String(value) },
                };
                return { fields };
            },
            validate: (state) => {
                const errors = [];
                const fields = { ...state.fields };
                for (const [key, field] of Object.entries(fields)) {
                    if (!field.validation.valid) {
                        errors.push(...field.validation.errors);
                    }
                }
                return { valid: errors.length === 0, errorSummary: errors };
            },
            submit: (state) => ({ submitting: true, submitted: true }),
            submitComplete: (_state) => ({ submitting: false }),
            reset: (_state) => ({
                fields: initialFields,
                valid: true,
                submitting: false,
                submitted: false,
                errorSummary: [],
            }),
        },
        render: renderForm,
        aria: {
            role: 'form',
            'aria-label': config.label,
        },
        focusConfig: DEFAULT_FOCUS_CONFIG,
        reducedMotionConfig: DEFAULT_REDUCED_MOTION,
    };
    return applyAllFudPolicies(logic);
}
//# sourceMappingURL=form.js.map