import type { ComponentLogicWithAccessibility } from '../types/base.js';
import { DEFAULT_TOUCH_TARGET, DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';

export interface TabItem {
  id: string;
  label: string;
  content: string;
  disabled?: boolean;
}

export interface TabsState {
  tabs: TabItem[];
  activeId: string;
  orientation: 'horizontal' | 'vertical';
  tablistId: string;
  label: string;
}

export interface TabsConfig {
  label: string;
  tabs: TabItem[];
  activeId?: string;
  orientation?: 'horizontal' | 'vertical';
  id?: string;
}

function renderTabs(state: TabsState): string {
  const tabButtons = state.tabs.map((tab) => {
    const isSelected = tab.id === state.activeId;
    return `<button
      id="${state.tablistId}-tab-${tab.id}"
      role="tab"
      class="obix-tabs__tab"
      data-jfix-strategy="fixed-size"
      aria-selected="${isSelected}"
      aria-controls="${state.tablistId}-panel-${tab.id}"
      ${tab.disabled ? 'aria-disabled="true"' : ''}
      tabindex="${isSelected ? '0' : '-1'}"
      type="button"
    >${tab.label}</button>`;
  }).join('');

  const panels = state.tabs.map((tab) => {
    const isSelected = tab.id === state.activeId;
    return `<div
      id="${state.tablistId}-panel-${tab.id}"
      role="tabpanel"
      class="obix-tabs__panel"
      aria-labelledby="${state.tablistId}-tab-${tab.id}"
      tabindex="0"
      ${!isSelected ? 'hidden' : ''}
    >${isSelected ? tab.content : ''}</div>`;
  }).join('');

  return `<div class="obix-tabs" aria-label="${state.label}">
  <div
    id="${state.tablistId}"
    role="tablist"
    aria-label="${state.label}"
    aria-orientation="${state.orientation}"
    class="obix-tabs__tablist"
  >
    ${tabButtons}
  </div>
  <div class="obix-tabs__panels">
    ${panels}
  </div>
</div>`;
}

export function createTabs(config: TabsConfig): ComponentLogicWithAccessibility<TabsState> {
  const id = config.id ?? `obix-tabs-${Math.random().toString(36).slice(2, 8)}`;
  const activeId = config.activeId ?? config.tabs[0]?.id ?? '';

  const logic: ComponentLogicWithAccessibility<TabsState> = {
    name: 'ObixTabs',
    state: {
      tabs: config.tabs,
      activeId,
      orientation: config.orientation ?? 'horizontal',
      tablistId: id,
      label: config.label,
    },
    actions: {
      selectTab: (_state, id: unknown) => ({ activeId: String(id) }),
      navigateNext: (state) => {
        const idx = state.tabs.findIndex((t) => t.id === state.activeId);
        const next = (idx + 1) % state.tabs.length;
        return { activeId: state.tabs[next]?.id ?? state.activeId };
      },
      navigatePrev: (state) => {
        const idx = state.tabs.findIndex((t) => t.id === state.activeId);
        const prev = (idx - 1 + state.tabs.length) % state.tabs.length;
        return { activeId: state.tabs[prev]?.id ?? state.activeId };
      },
      navigateFirst: (state) => ({ activeId: state.tabs[0]?.id ?? state.activeId }),
      navigateLast: (state) => ({ activeId: state.tabs[state.tabs.length - 1]?.id ?? state.activeId }),
    },
    render: renderTabs,
    aria: {
      role: 'tablist',
      'aria-label': config.label,
      'aria-orientation': config.orientation ?? 'horizontal',
    },
    touchTarget: DEFAULT_TOUCH_TARGET,
    focusConfig: DEFAULT_FOCUS_CONFIG,
    reducedMotionConfig: DEFAULT_REDUCED_MOTION,
  };

  return applyAllFudPolicies(logic);
}
