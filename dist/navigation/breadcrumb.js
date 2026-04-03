import { DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';
function renderBreadcrumb(state) {
    const items = state.crumbs.map((crumb, i) => {
        const isLast = i === state.crumbs.length - 1;
        return `<li class="obix-breadcrumb__item-wrapper">
      ${isLast
            ? `<span class="obix-breadcrumb__item" aria-current="page">${crumb.label}</span>`
            : `<a href="${crumb.href}" class="obix-breadcrumb__item" data-jfix-strategy="fixed-size">${crumb.label}</a>
           <span aria-hidden="true" class="obix-breadcrumb__separator">${state.separator}</span>`}
    </li>`;
    }).join('');
    return `<nav aria-label="Breadcrumb" class="obix-breadcrumb">
  <ol class="obix-breadcrumb__list" style="list-style:none;display:flex;align-items:center;flex-wrap:wrap;padding:0;margin:0;">
    ${items}
  </ol>
</nav>`;
}
export function createBreadcrumb(config) {
    const logic = {
        name: 'ObixBreadcrumb',
        state: {
            crumbs: config.crumbs,
            separator: config.separator ?? '/',
        },
        actions: {
            setCrumbs: (_state, crumbs) => ({ crumbs: crumbs }),
            push: (state, crumb) => ({ crumbs: [...state.crumbs, crumb] }),
            pop: (state) => ({ crumbs: state.crumbs.slice(0, -1) }),
        },
        render: renderBreadcrumb,
        aria: {
            role: 'navigation',
            'aria-label': 'Breadcrumb',
        },
        focusConfig: DEFAULT_FOCUS_CONFIG,
        reducedMotionConfig: DEFAULT_REDUCED_MOTION,
    };
    return applyAllFudPolicies(logic);
}
//# sourceMappingURL=breadcrumb.js.map