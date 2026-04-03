import type { ComponentLogicWithAccessibility } from '../types/base.js';
import { DEFAULT_TOUCH_TARGET, DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import type { JfixStrategy } from '../types/jfix.js';
import { applyAllFudPolicies } from '../policies/compose.js';

export interface DropdownItem {
  id: string;
  label: string;
  href?: string;
  disabled?: boolean;
}

export interface DropdownState {
  open: boolean;
  items: DropdownItem[];
  activeIndex: number;
  selectedId: string | null;
  trigger: string;
  listboxId: string;
  triggerId: string;
  jfixStrategy: JfixStrategy;
  label: string;
}

export interface DropdownConfig {
  trigger: string;
  items: DropdownItem[];
  label?: string;
  jfixStrategy?: JfixStrategy;
  id?: string;
}

function renderDropdown(state: DropdownState): string {
  const itemsHtml = state.items.map((item, i) => {
    const isActive = i === state.activeIndex;
    const isSelected = item.id === state.selectedId;
    return `<div
      id="${state.listboxId}-item-${item.id}"
      role="option"
      class="obix-dropdown__item"
      data-jfix-strategy="${state.jfixStrategy}"
      aria-selected="${isSelected}"
      ${item.disabled ? 'aria-disabled="true"' : ''}
      ${isActive ? 'class="obix-dropdown__item obix-dropdown__item--active"' : ''}
    >${item.href ? `<a href="${item.href}">${item.label}</a>` : item.label}</div>`;
  }).join('');

  return `<div
  class="obix-dropdown jfix-dropdown"
  data-jfix-strategy="${state.jfixStrategy}"
>
  <button
    id="${state.triggerId}"
    class="obix-dropdown__trigger"
    type="button"
    aria-haspopup="listbox"
    aria-expanded="${state.open}"
    aria-controls="${state.listboxId}"
    aria-label="${state.label}"
  >${state.trigger} <span aria-hidden="true">${state.open ? '▲' : '▼'}</span></button>
  <div
    id="${state.listboxId}"
    role="listbox"
    class="obix-dropdown__list jfix-dropdown-content"
    aria-label="${state.label}"
    aria-labelledby="${state.triggerId}"
    ${state.open ? '' : 'hidden'}
    ${state.activeIndex >= 0 ? `aria-activedescendant="${state.listboxId}-item-${state.items[state.activeIndex]?.id ?? ''}"` : ''}
  >
    ${itemsHtml}
  </div>
</div>`;
}

export function createDropdown(config: DropdownConfig): ComponentLogicWithAccessibility<DropdownState> {
  const id = config.id ?? `obix-dropdown-${Math.random().toString(36).slice(2, 8)}`;
  const logic: ComponentLogicWithAccessibility<DropdownState> = {
    name: 'ObixDropdown',
    state: {
      open: false,
      items: config.items,
      activeIndex: -1,
      selectedId: null,
      trigger: config.trigger,
      listboxId: `${id}-listbox`,
      triggerId: `${id}-trigger`,
      jfixStrategy: config.jfixStrategy ?? 'transform-scale',
      label: config.label ?? config.trigger,
    },
    actions: {
      open: (_state) => ({ open: true, activeIndex: 0 }),
      close: (_state) => ({ open: false, activeIndex: -1 }),
      toggle: (state) => state.open
        ? { open: false, activeIndex: -1 }
        : { open: true, activeIndex: 0 },
      selectItem: (state, index: unknown) => {
        const idx = Number(index);
        const item = state.items[idx];
        if (!item || item.disabled) return state;
        return { selectedId: item.id, open: false, activeIndex: -1 };
      },
      navigateNext: (state) => {
        const next = Math.min(state.activeIndex + 1, state.items.length - 1);
        return { activeIndex: next };
      },
      navigatePrev: (state) => {
        const prev = Math.max(state.activeIndex - 1, 0);
        return { activeIndex: prev };
      },
      navigateFirst: (_state) => ({ activeIndex: 0 }),
      navigateLast: (state) => ({ activeIndex: state.items.length - 1 }),
      setJfixStrategy: (_state, strategy: unknown) => ({ jfixStrategy: strategy as JfixStrategy }),
    },
    render: renderDropdown,
    aria: {
      role: 'listbox',
      'aria-label': config.label ?? config.trigger,
      'aria-expanded': false,
      'aria-haspopup': 'listbox',
    },
    touchTarget: DEFAULT_TOUCH_TARGET,
    focusConfig: { trapFocus: false, restoreFocus: true, focusVisible: true },
    reducedMotionConfig: DEFAULT_REDUCED_MOTION,
  };

  return applyAllFudPolicies(logic);
}
