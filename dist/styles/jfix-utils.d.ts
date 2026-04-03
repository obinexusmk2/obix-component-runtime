import type { JfixStrategy } from '../types/jfix.js';
/**
 * Applies a jfix hover strategy to a DOM element by setting
 * the data-jfix-strategy attribute and corresponding CSS class.
 * The SCSS [data-jfix-strategy] attribute selectors handle the actual styles.
 */
export declare function jfixApplyStrategy(element: Element, strategy: JfixStrategy): void;
/**
 * Removes any jfix strategy from the element,
 * resetting it to the default CSS-defined hover behaviour.
 */
export declare function jfixRemoveStrategy(element: Element): void;
/**
 * Returns the current jfix strategy applied to an element, or null if none.
 */
export declare function jfixGetStrategy(element: Element): JfixStrategy | null;
/**
 * Checks the user's prefers-reduced-motion media query.
 * Returns true if motion should be reduced.
 */
export declare function prefersReducedMotion(): boolean;
//# sourceMappingURL=jfix-utils.d.ts.map