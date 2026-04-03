import { DEFAULT_TOUCH_TARGET, DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';
function isOptGroup(item) {
    return 'options' in item && Array.isArray(item.options);
}
function renderOption(opt) {
    return `<option value="${opt.value}" ${opt.disabled ? 'disabled' : ''}>${opt.label}</option>`;
}
function renderSelect(state) {
    const items = state.options.map((item) => {
        if (isOptGroup(item)) {
            return `<optgroup label="${item.label}">${item.options.map(renderOption).join('')}</optgroup>`;
        }
        return renderOption(item);
    }).join('');
    return `<div class="obix-field">
  <label for="${state.selectId}" class="obix-field__label">
    ${state.label}${state.required ? ' <span aria-hidden="true">*</span>' : ''}
  </label>
  <select
    id="${state.selectId}"
    class="obix-select"
    data-jfix-strategy="fixed-size"
    ${state.multiple ? 'multiple' : ''}
    ${state.required ? 'aria-required="true"' : ''}
    ${state.disabled ? 'aria-disabled="true" disabled' : ''}
    aria-expanded="${state.open}"
    ${state.multiple ? 'aria-multiselectable="true"' : ''}
  >
    ${state.placeholder && !state.multiple ? `<option value="" disabled ${state.selectedValues.length === 0 ? 'selected' : ''}>${state.placeholder}</option>` : ''}
    ${items}
  </select>
</div>`;
}
export function createSelect(config) {
    const id = config.id ?? `obix-select-${Math.random().toString(36).slice(2, 8)}`;
    const logic = {
        name: 'ObixSelect',
        state: {
            options: config.options,
            selectedValues: config.selectedValue ? [config.selectedValue] : [],
            multiple: config.multiple ?? false,
            open: false,
            disabled: config.disabled ?? false,
            required: config.required ?? false,
            placeholder: config.placeholder ?? '',
            label: config.label,
            selectId: id,
            searchQuery: '',
        },
        actions: {
            open: (_state) => ({ open: true }),
            close: (_state) => ({ open: false }),
            toggle: (state) => ({ open: !state.open }),
            selectOption: (state, value) => {
                const v = String(value);
                if (state.multiple) {
                    const exists = state.selectedValues.includes(v);
                    return {
                        selectedValues: exists
                            ? state.selectedValues.filter((s) => s !== v)
                            : [...state.selectedValues, v],
                    };
                }
                return { selectedValues: [v], open: false };
            },
            deselectOption: (state, value) => ({
                selectedValues: state.selectedValues.filter((s) => s !== value),
            }),
            setSearch: (_state, query) => ({ searchQuery: String(query) }),
            clearSearch: (_state) => ({ searchQuery: '' }),
        },
        render: renderSelect,
        aria: {
            role: 'listbox',
            'aria-label': config.label,
            'aria-expanded': false,
            'aria-required': config.required ?? false,
            'aria-disabled': config.disabled ?? false,
            'aria-multiselectable': config.multiple ?? false,
        },
        touchTarget: DEFAULT_TOUCH_TARGET,
        focusConfig: DEFAULT_FOCUS_CONFIG,
        reducedMotionConfig: DEFAULT_REDUCED_MOTION,
    };
    return applyAllFudPolicies(logic);
}
//# sourceMappingURL=select.js.map