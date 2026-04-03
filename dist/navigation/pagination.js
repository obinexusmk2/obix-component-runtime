import { DEFAULT_TOUCH_TARGET, DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';
function renderPagination(state) {
    const pages = Array.from({ length: state.totalPages }, (_, i) => i + 1);
    const buttons = pages.map((page) => `<button
    class="obix-pagination__button"
    type="button"
    data-jfix-strategy="fixed-size"
    ${page === state.currentPage ? 'aria-current="page"' : ''}
    ${state.disabled ? 'aria-disabled="true"' : ''}
    aria-label="Page ${page}"
  >${page}</button>`).join('');
    const isPrevDisabled = state.currentPage <= 1 || state.disabled;
    const isNextDisabled = state.currentPage >= state.totalPages || state.disabled;
    return `<nav aria-label="${state.label}" class="obix-pagination">
  <button
    class="obix-pagination__button"
    type="button"
    data-jfix-strategy="fixed-size"
    aria-label="Previous page"
    ${isPrevDisabled ? 'aria-disabled="true"' : ''}
  >‹</button>
  ${buttons}
  <button
    class="obix-pagination__button"
    type="button"
    data-jfix-strategy="fixed-size"
    aria-label="Next page"
    ${isNextDisabled ? 'aria-disabled="true"' : ''}
  >›</button>
</nav>`;
}
export function createPagination(config) {
    const logic = {
        name: 'ObixPagination',
        state: {
            currentPage: config.currentPage ?? 1,
            totalPages: config.totalPages,
            pageSize: config.pageSize ?? 10,
            disabled: config.disabled ?? false,
            label: config.label ?? 'Pagination',
        },
        actions: {
            goToPage: (state, page) => {
                const p = Number(page);
                if (p < 1 || p > state.totalPages)
                    return state;
                return { currentPage: p };
            },
            next: (state) => state.currentPage < state.totalPages ? { currentPage: state.currentPage + 1 } : state,
            prev: (state) => state.currentPage > 1 ? { currentPage: state.currentPage - 1 } : state,
            first: (_state) => ({ currentPage: 1 }),
            last: (state) => ({ currentPage: state.totalPages }),
        },
        render: renderPagination,
        aria: {
            role: 'navigation',
            'aria-label': config.label ?? 'Pagination',
        },
        touchTarget: DEFAULT_TOUCH_TARGET,
        focusConfig: DEFAULT_FOCUS_CONFIG,
        reducedMotionConfig: DEFAULT_REDUCED_MOTION,
    };
    return applyAllFudPolicies(logic);
}
//# sourceMappingURL=pagination.js.map