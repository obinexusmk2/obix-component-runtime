import { DEFAULT_TOUCH_TARGET, DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';
function renderAutocomplete(state) {
    const activeDescendant = state.open && state.activeIndex >= 0
        ? `${state.listboxId}-option-${state.activeIndex}`
        : '';
    const options = state.suggestions.map((s, i) => {
        const isActive = i === state.activeIndex;
        return `<div
      id="${state.listboxId}-option-${i}"
      role="option"
      class="obix-autocomplete__option${isActive ? ' obix-autocomplete__option--active' : ''}"
      aria-selected="${s === state.selectedValue}"
      data-jfix-strategy="fixed-size"
    >${s}</div>`;
    }).join('');
    return `<div class="obix-autocomplete">
  <label for="${state.inputId}" class="obix-field__label">${state.label}</label>
  <input
    id="${state.inputId}"
    type="text"
    class="obix-autocomplete__input"
    value="${state.query}"
    aria-label="${state.label}"
    aria-expanded="${state.open}"
    aria-autocomplete="list"
    aria-controls="${state.listboxId}"
    role="combobox"
    data-jfix-strategy="transform-scale"
    ${activeDescendant ? `aria-activedescendant="${activeDescendant}"` : ''}
    ${state.loading ? 'aria-busy="true"' : ''}
    autocomplete="off"
  />
  <div
    id="${state.listboxId}"
    role="listbox"
    class="obix-autocomplete__listbox"
    aria-label="${state.label} suggestions"
    ${!state.open || state.suggestions.length === 0 ? 'hidden' : ''}
  >
    ${options}
  </div>
  ${state.open && state.suggestions.length > 0
        ? `<div role="status" aria-live="polite" class="obix-sr-only">${state.suggestions.length} suggestion${state.suggestions.length !== 1 ? 's' : ''} available</div>`
        : ''}
</div>`;
}
export function createAutocomplete(config) {
    const id = config.id ?? `obix-autocomplete-${Math.random().toString(36).slice(2, 8)}`;
    const logic = {
        name: 'ObixAutocomplete',
        state: {
            query: '',
            suggestions: config.suggestions ?? [],
            open: false,
            activeIndex: -1,
            selectedValue: null,
            loading: false,
            label: config.label,
            inputId: id,
            listboxId: `${id}-listbox`,
        },
        actions: {
            setQuery: (state, query) => ({
                query: String(query),
                open: String(query).length > 0,
                activeIndex: -1,
            }),
            setSuggestions: (_state, suggestions) => ({
                suggestions: suggestions,
                open: suggestions.length > 0,
            }),
            open: (_state) => ({ open: true }),
            close: (_state) => ({ open: false, activeIndex: -1 }),
            navigateNext: (state) => ({
                activeIndex: Math.min(state.activeIndex + 1, state.suggestions.length - 1),
            }),
            navigatePrev: (state) => ({
                activeIndex: Math.max(state.activeIndex - 1, 0),
            }),
            select: (state, index) => {
                const i = Number(index);
                const val = state.suggestions[i];
                if (!val)
                    return state;
                return { selectedValue: val, query: val, open: false, activeIndex: -1 };
            },
            selectActive: (state) => {
                if (state.activeIndex < 0)
                    return state;
                const val = state.suggestions[state.activeIndex];
                if (!val)
                    return state;
                return { selectedValue: val, query: val, open: false, activeIndex: -1 };
            },
            setLoading: (_state, loading) => ({ loading: Boolean(loading) }),
        },
        render: renderAutocomplete,
        aria: {
            role: 'combobox',
            'aria-label': config.label,
            'aria-expanded': false,
            'aria-autocomplete': 'list',
        },
        touchTarget: DEFAULT_TOUCH_TARGET,
        focusConfig: DEFAULT_FOCUS_CONFIG,
        reducedMotionConfig: DEFAULT_REDUCED_MOTION,
    };
    return applyAllFudPolicies(logic);
}
//# sourceMappingURL=autocomplete.js.map