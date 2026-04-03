import { DEFAULT_TOUCH_TARGET, DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';
function renderNavigation(state) {
    const items = state.items.map((item) => {
        const isCurrent = item.id === state.activeId;
        return `<a
      href="${item.href}"
      class="obix-navigation__item"
      data-jfix-strategy="fixed-size"
      ${isCurrent ? 'aria-current="page"' : ''}
      ${item.disabled ? 'aria-disabled="true"' : ''}
    >${item.label}</a>`;
    }).join('');
    return `<nav aria-label="${state.label}" class="obix-navigation">
  <a href="#main-content" class="obix-navigation__skip-link">Skip to main content</a>
  <button
    class="obix-navigation__hamburger"
    type="button"
    aria-expanded="${state.mobileOpen}"
    aria-controls="${state.mobileMenuId}"
    aria-label="Toggle navigation menu"
  >☰</button>
  <div id="${state.mobileMenuId}" class="obix-navigation__menu" ${!state.mobileOpen ? 'hidden' : ''}>
    ${items}
  </div>
</nav>`;
}
export function createNavigation(config) {
    const menuId = (config.id ?? `obix-nav-${Math.random().toString(36).slice(2, 8)}`) + '-menu';
    const logic = {
        name: 'ObixNavigation',
        state: {
            items: config.items,
            activeId: config.activeId ?? null,
            orientation: config.orientation ?? 'horizontal',
            mobileOpen: false,
            mobileMenuId: menuId,
            label: config.label,
        },
        actions: {
            setActive: (_state, id) => ({ activeId: String(id) }),
            toggleMobile: (state) => ({ mobileOpen: !state.mobileOpen }),
            openMobile: (_state) => ({ mobileOpen: true }),
            closeMobile: (_state) => ({ mobileOpen: false }),
            navigateNext: (state) => {
                const idx = state.items.findIndex((i) => i.id === state.activeId);
                const next = (idx + 1) % state.items.length;
                return { activeId: state.items[next]?.id ?? state.activeId };
            },
            navigatePrev: (state) => {
                const idx = state.items.findIndex((i) => i.id === state.activeId);
                const prev = (idx - 1 + state.items.length) % state.items.length;
                return { activeId: state.items[prev]?.id ?? state.activeId };
            },
        },
        render: renderNavigation,
        aria: {
            role: 'navigation',
            'aria-label': config.label,
        },
        touchTarget: DEFAULT_TOUCH_TARGET,
        focusConfig: DEFAULT_FOCUS_CONFIG,
        reducedMotionConfig: DEFAULT_REDUCED_MOTION,
    };
    return applyAllFudPolicies(logic);
}
//# sourceMappingURL=navigation.js.map