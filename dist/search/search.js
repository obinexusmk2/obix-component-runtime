import { DEFAULT_TOUCH_TARGET, DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';
function renderSearch(state) {
    return `<form
  class="obix-search"
  role="search"
  aria-label="${state.label}"
>
  <div class="obix-search__form">
    <input
      id="${state.searchId}"
      type="search"
      class="obix-search__input"
      placeholder="${state.placeholder}"
      value="${state.query}"
      aria-label="${state.label}"
      ${state.disabled ? 'aria-disabled="true" disabled' : ''}
      ${state.loading ? 'aria-busy="true"' : ''}
      data-jfix-strategy="transform-scale"
    />
    ${state.query
        ? `<button class="obix-search__clear" type="button" aria-label="Clear search">×</button>`
        : ''}
    <button class="obix-search__submit" type="submit" aria-label="Search">🔍</button>
  </div>
  ${state.resultsCount !== null
        ? `<div role="status" aria-live="polite" aria-atomic="true" class="obix-search__results-count">
        ${state.resultsCount === 0 ? 'No results found' : `${state.resultsCount} result${state.resultsCount !== 1 ? 's' : ''} found`}
      </div>`
        : ''}
</form>`;
}
export function createSearch(config) {
    const id = config.id ?? `obix-search-${Math.random().toString(36).slice(2, 8)}`;
    const logic = {
        name: 'ObixSearch',
        state: {
            query: '',
            placeholder: config.placeholder ?? 'Search…',
            disabled: config.disabled ?? false,
            loading: false,
            resultsCount: null,
            label: config.label ?? 'Search',
            searchId: id,
        },
        actions: {
            setQuery: (_state, query) => ({ query: String(query) }),
            submit: (state) => ({ loading: true, resultsCount: null }),
            clear: (_state) => ({ query: '', resultsCount: null }),
            setLoading: (_state, loading) => ({ loading: Boolean(loading) }),
            setResults: (_state, count) => ({ resultsCount: Number(count), loading: false }),
        },
        render: renderSearch,
        aria: {
            role: 'search',
            'aria-label': config.label ?? 'Search',
        },
        touchTarget: DEFAULT_TOUCH_TARGET,
        focusConfig: DEFAULT_FOCUS_CONFIG,
        reducedMotionConfig: DEFAULT_REDUCED_MOTION,
    };
    return applyAllFudPolicies(logic);
}
//# sourceMappingURL=search.js.map