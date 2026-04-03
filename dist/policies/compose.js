import { PolicyViolationError } from './violation.js';
import { applyAccessibilityPolicy } from './accessibility.js';
import { applyTouchTargetPolicy } from './touch-target.js';
import { applyReducedMotionPolicy } from './reduced-motion.js';
import { applyFocusPolicy } from './focus.js';
import { applyLoadingPolicy } from './loading.js';
export function applyAllFudPolicies(logic) {
    let result = logic;
    result = applyAccessibilityPolicy(result);
    result = applyTouchTargetPolicy(result);
    result = applyFocusPolicy(result);
    result = applyLoadingPolicy(result);
    result = applyReducedMotionPolicy(result);
    return result;
}
export function validateFudCompliance(logic) {
    const violations = [];
    const policies = [
        applyAccessibilityPolicy,
        applyTouchTargetPolicy,
        applyFocusPolicy,
        applyLoadingPolicy,
        applyReducedMotionPolicy,
    ];
    let current = logic;
    for (const policy of policies) {
        try {
            current = policy(current);
        }
        catch (err) {
            if (err instanceof PolicyViolationError) {
                violations.push({
                    policy: err.policy,
                    message: err.message,
                    severity: 'error',
                });
            }
        }
    }
    return {
        valid: violations.length === 0,
        violations,
    };
}
//# sourceMappingURL=compose.js.map