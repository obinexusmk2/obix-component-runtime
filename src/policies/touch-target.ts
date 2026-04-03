import type { ComponentLogicWithAccessibility } from '../types/base.js';
import { DEFAULT_TOUCH_TARGET } from '../types/base.js';
import { PolicyViolationError } from './violation.js';

const NON_INTERACTIVE_ROLES = new Set(['img', 'figure', 'region', 'article', 'main', 'complementary', 'contentinfo', 'banner', 'navigation', 'none', 'presentation', 'separator', 'status', 'alert', 'log', 'marquee', 'timer', 'tooltip', 'caption', 'table', 'row', 'cell', 'columnheader', 'rowheader', 'grid', 'gridcell', 'rowgroup', 'group', 'list', 'listitem', 'definition', 'term', 'note', 'progressbar']);

export function applyTouchTargetPolicy<S>(
  logic: ComponentLogicWithAccessibility<S>,
): ComponentLogicWithAccessibility<S> {
  const role = logic.aria.role ?? '';

  if (NON_INTERACTIVE_ROLES.has(role)) {
    return logic;
  }

  if (!logic.touchTarget) {
    return { ...logic, touchTarget: DEFAULT_TOUCH_TARGET };
  }

  const { minWidth, minHeight } = logic.touchTarget;
  if (minWidth < 44 || minHeight < 44) {
    throw new PolicyViolationError(
      'TouchTargetPolicy',
      `Component "${logic.name}" touch target ${minWidth}x${minHeight}px is below WCAG 2.1 minimum of 44x44px.`,
    );
  }

  return logic;
}
