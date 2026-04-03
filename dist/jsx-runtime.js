/**
 * OBIX JSX Runtime — Heart/Soul UI/UX SDK
 *
 * Provides a hyperscript-style JSX factory for the OBIX data-oriented
 * component system. Components are NOT virtual DOM nodes; they are
 * ComponentLogicWithAccessibility objects that carry state, actions,
 * render functions, and ARIA attributes.
 *
 * Usage (tsconfig.json):
 *   "jsx": "react",
 *   "jsxFactory": "h",
 *   "jsxFragmentFactory": "Fragment"
 *
 * Usage (tsx file):
 *   /** @jsxRuntime classic * /
 *   /** @jsx h * /
 *   /** @jsxFrag Fragment * /
 *   import { h, Fragment } from '@obinexusltd/obix-component-runtime/jsx-runtime';
 *   import { createButton } from '@obinexusltd/obix-component-runtime';
 *
 *   const btn = <createButton label="Save" variant="primary" />;
 *   document.body.innerHTML = btn.render(btn.state);
 */
// ── Fragment sentinel ────────────────────────────────────────────────────────
/**
 * Fragment sentinel — used for <></> or <Fragment> grouping.
 * OBIX fragments return an array of rendered HTML strings joined together.
 */
export const Fragment = Symbol.for('ObixFragment');
// ── h (hyperscript) ──────────────────────────────────────────────────────────
/**
 * OBIX hyperscript factory — the JSX transform target.
 *
 * Maps JSX syntax to OBIX factory function calls:
 *   <createButton label="Save" />
 *   → h(createButton, { label: "Save" })
 *   → createButton({ label: "Save" })   // with FUD policies applied
 */
export function h(factory, props, ...children) {
    // Fragment: return children array directly
    if (factory === Fragment) {
        return children.flat();
    }
    const normalizedProps = {
        ...(props ?? {}),
        ...(children.length > 0 ? { children } : {}),
    };
    // Remove JSX internal keys that don't belong in component configs
    const { children: _children, ...componentProps } = normalizedProps;
    void _children;
    return factory(componentProps);
}
// Aliases for automatic JSX transform compatibility
export { h as jsx, h as jsxs };
//# sourceMappingURL=jsx-runtime.js.map