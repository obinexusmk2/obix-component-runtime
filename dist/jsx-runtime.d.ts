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
import type { ComponentLogicWithAccessibility } from './types/base.js';
/** A factory function that produces an OBIX component from a config object */
export type ObixFactory<S extends object> = (config: S) => ComponentLogicWithAccessibility<S>;
/** The rendered OBIX element — same as ComponentLogicWithAccessibility */
export type ObixElement<S extends object = object> = ComponentLogicWithAccessibility<S>;
/** Props accepted by the OBIX JSX transform */
export type ObixProps<S extends object> = S & {
    children?: (ObixElement<object> | string)[];
};
/**
 * Fragment sentinel — used for <></> or <Fragment> grouping.
 * OBIX fragments return an array of rendered HTML strings joined together.
 */
export declare const Fragment: unique symbol;
/**
 * OBIX hyperscript factory — the JSX transform target.
 *
 * Maps JSX syntax to OBIX factory function calls:
 *   <createButton label="Save" />
 *   → h(createButton, { label: "Save" })
 *   → createButton({ label: "Save" })   // with FUD policies applied
 */
export declare function h<S extends object>(factory: ObixFactory<S> | typeof Fragment, props: ObixProps<S> | null, ...children: (ObixElement<object> | string)[]): ObixElement<S> | ObixElement<object>[];
export { h as jsx, h as jsxs };
//# sourceMappingURL=jsx-runtime.d.ts.map