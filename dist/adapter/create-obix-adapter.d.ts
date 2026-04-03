import type { ComponentLogicWithAccessibility } from '../types/base.js';
/**
 * Paradigm types supported by the ObixAdapter.
 * Maps to the DOPAdapter paradigm enum from @obinexusltd/obix-sdk-adapter.
 */
export type ObixParadigm = 'functional' | 'oop' | 'reactive' | 'data';
export interface FunctionalComponent<S> {
    getState: () => S;
    dispatch: (action: string, ...args: unknown[]) => void;
    render: () => string;
}
export interface OOPComponent<S> {
    state: S;
    [key: string]: unknown;
    render(): string;
}
export interface ReactiveComponent<S> {
    subscribe: (listener: (state: S) => void) => () => void;
    dispatch: (action: string, ...args: unknown[]) => void;
    render: () => string;
}
/**
 * Converts a ComponentLogicWithAccessibility to a functional paradigm.
 * State is held in a closure; actions return new state.
 */
export declare function toFunctional<S>(logic: ComponentLogicWithAccessibility<S>): FunctionalComponent<S>;
/**
 * Converts a ComponentLogicWithAccessibility to an OOP paradigm.
 * Returns a plain object with bound methods acting as "class instance".
 */
export declare function toOOP<S>(logic: ComponentLogicWithAccessibility<S>): OOPComponent<S>;
/**
 * Converts a ComponentLogicWithAccessibility to a reactive paradigm.
 * Returns an object with subscribe/dispatch similar to a minimal observable store.
 */
export declare function toReactive<S>(logic: ComponentLogicWithAccessibility<S>): ReactiveComponent<S>;
/**
 * createObixAdapter — factory that wraps a ComponentLogicWithAccessibility
 * and exposes all four paradigm transforms.
 */
export declare function createObixAdapter<S>(logic: ComponentLogicWithAccessibility<S>): {
    toFunctional: () => FunctionalComponent<S>;
    toOOP: () => OOPComponent<S>;
    toReactive: () => ReactiveComponent<S>;
    toData: () => {
        name: string;
        state: S;
        actions: Record<string, (state: S, ...args: unknown[]) => Partial<S>>;
        render: (state: S) => string;
        aria: import("../index.js").AriaAttributes;
        touchTarget?: import("../index.js").TouchTarget;
        focusConfig?: import("../index.js").FocusConfig;
        loadingState?: import("../index.js").LoadingState;
        reducedMotionConfig?: import("../index.js").ReducedMotionConfig;
        jfixStrategy?: import("../index.js").JfixStrategy;
    };
};
//# sourceMappingURL=create-obix-adapter.d.ts.map