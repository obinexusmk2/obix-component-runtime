import { DEFAULT_REDUCED_MOTION } from '../types/base.js';
export function applyReducedMotionPolicy(logic) {
    if (!logic.reducedMotionConfig) {
        return { ...logic, reducedMotionConfig: DEFAULT_REDUCED_MOTION };
    }
    return logic;
}
//# sourceMappingURL=reduced-motion.js.map