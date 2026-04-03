import { describe, it, expect } from 'vitest';
import { PolicyViolationError, applyAllFudPolicies, validateFudCompliance } from '../src/policies/index.js';
import type { ComponentLogicWithAccessibility } from '../src/types/base.js';

const makeMinimalLogic = (overrides: Partial<ComponentLogicWithAccessibility<{ value: string }>> = {}): ComponentLogicWithAccessibility<{ value: string }> => ({
  name: 'TestComponent',
  state: { value: 'test' },
  actions: {},
  render: (s) => `<div>${s.value}</div>`,
  aria: { role: 'button', 'aria-label': 'Test button' },
  ...overrides,
});

describe('PolicyViolationError', () => {
  it('includes policy name in message', () => {
    const err = new PolicyViolationError('TestPolicy', 'something failed');
    expect(err.message).toContain('TestPolicy');
    expect(err.policy).toBe('TestPolicy');
    expect(err.name).toBe('PolicyViolationError');
  });
});

describe('applyAllFudPolicies', () => {
  it('returns logic unchanged when compliant', () => {
    const logic = makeMinimalLogic();
    const result = applyAllFudPolicies(logic);
    expect(result.name).toBe('TestComponent');
    expect(result.touchTarget?.minWidth).toBeGreaterThanOrEqual(44);
    expect(result.touchTarget?.minHeight).toBeGreaterThanOrEqual(44);
  });

  it('throws when role is missing', () => {
    const logic = makeMinimalLogic({ aria: {} });
    expect(() => applyAllFudPolicies(logic)).toThrow(PolicyViolationError);
  });

  it('throws when button-role lacks aria-label', () => {
    const logic = makeMinimalLogic({ aria: { role: 'button' } });
    expect(() => applyAllFudPolicies(logic)).toThrow(PolicyViolationError);
  });

  it('injects default touch target when missing', () => {
    const logic = makeMinimalLogic({ touchTarget: undefined });
    const result = applyAllFudPolicies(logic);
    expect(result.touchTarget?.minWidth).toBe(44);
    expect(result.touchTarget?.minHeight).toBe(44);
  });

  it('throws when touch target is below 44px', () => {
    const logic = makeMinimalLogic({ touchTarget: { minWidth: 30, minHeight: 30, padding: 0 } });
    expect(() => applyAllFudPolicies(logic)).toThrow(PolicyViolationError);
  });

  it('injects default reduced motion config when missing', () => {
    const logic = makeMinimalLogic({ reducedMotionConfig: undefined });
    const result = applyAllFudPolicies(logic);
    expect(result.reducedMotionConfig?.respectPreference).toBe(true);
  });
});

describe('validateFudCompliance', () => {
  it('returns valid:true for compliant component', () => {
    const logic = makeMinimalLogic();
    const result = validateFudCompliance(logic);
    expect(result.valid).toBe(true);
    expect(result.violations).toHaveLength(0);
  });

  it('returns violations without throwing for non-compliant component', () => {
    const logic = makeMinimalLogic({ aria: {} });
    expect(() => validateFudCompliance(logic)).not.toThrow();
    const result = validateFudCompliance(logic);
    expect(result.valid).toBe(false);
    expect(result.violations.length).toBeGreaterThan(0);
    expect(result.violations[0]?.policy).toBe('AccessibilityPolicy');
  });
});
