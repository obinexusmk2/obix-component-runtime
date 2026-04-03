import type { ComponentLogicWithAccessibility } from '../types/base.js';
import { PolicyViolationError } from './violation.js';

export function applyLoadingPolicy<S>(
  logic: ComponentLogicWithAccessibility<S>,
): ComponentLogicWithAccessibility<S> {
  const { loadingState } = logic;

  if (!loadingState || !loadingState.skeleton) {
    return logic;
  }

  const state = logic.state as Record<string, unknown>;
  const width = state['width'];
  const height = state['height'];

  if (width === 'auto' || height === 'auto') {
    throw new PolicyViolationError(
      'LoadingPolicy',
      `Component "${logic.name}" uses skeleton loading but has auto dimensions. Explicit width/height required to prevent Cumulative Layout Shift (CLS).`,
    );
  }

  if (width === undefined || height === undefined) {
    throw new PolicyViolationError(
      'LoadingPolicy',
      `Component "${logic.name}" uses skeleton loading but is missing explicit width or height. CLS prevention requires explicit dimensions.`,
    );
  }

  return logic;
}
