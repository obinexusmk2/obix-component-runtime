import type { ComponentLogicWithAccessibility } from '../types/base.js';
import { DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipState {
  content: string;
  visible: boolean;
  placement: TooltipPlacement;
  tooltipId: string;
  triggerId: string;
}

export interface TooltipConfig {
  content: string;
  placement?: TooltipPlacement;
  triggerId: string;
  id?: string;
}

function renderTooltip(state: TooltipState): string {
  return `<div class="obix-tooltip">
  <div
    id="${state.tooltipId}"
    role="tooltip"
    class="obix-tooltip__content obix-tooltip__content--${state.placement}"
    aria-live="polite"
    data-jfix-strategy="box-shadow"
    ${state.visible ? '' : 'hidden'}
  >${state.content}</div>
</div>`;
}

export function createTooltip(config: TooltipConfig): ComponentLogicWithAccessibility<TooltipState> {
  const id = config.id ?? `obix-tooltip-${Math.random().toString(36).slice(2, 8)}`;
  const logic: ComponentLogicWithAccessibility<TooltipState> = {
    name: 'ObixTooltip',
    state: {
      content: config.content,
      visible: false,
      placement: config.placement ?? 'top',
      tooltipId: id,
      triggerId: config.triggerId,
    },
    actions: {
      show: (_state) => ({ visible: true }),
      hide: (_state) => ({ visible: false }),
      toggle: (state) => ({ visible: !state.visible }),
      setContent: (_state, content: unknown) => ({ content: String(content) }),
      setPlacement: (_state, placement: unknown) => ({ placement: placement as TooltipPlacement }),
    },
    render: renderTooltip,
    aria: {
      role: 'tooltip',
      'aria-label': config.content,
    },
    focusConfig: DEFAULT_FOCUS_CONFIG,
    reducedMotionConfig: { ...DEFAULT_REDUCED_MOTION, fallback: 'instant' },
  };

  return applyAllFudPolicies(logic);
}
