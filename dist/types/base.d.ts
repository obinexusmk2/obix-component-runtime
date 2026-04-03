import type { JfixStrategy } from './jfix.js';
export interface AriaAttributes {
    role?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-live'?: 'off' | 'polite' | 'assertive';
    'aria-busy'?: boolean;
    'aria-hidden'?: boolean;
    'aria-disabled'?: boolean;
    'aria-invalid'?: boolean | 'grammar' | 'spelling';
    'aria-pressed'?: boolean | 'mixed';
    'aria-expanded'?: boolean;
    'aria-selected'?: boolean;
    'aria-checked'?: boolean | 'mixed';
    'aria-modal'?: boolean;
    'aria-required'?: boolean;
    'aria-readonly'?: boolean;
    'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
    'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
    'aria-controls'?: string;
    'aria-owns'?: string;
    'aria-activedescendant'?: string;
    'aria-valuemin'?: number;
    'aria-valuemax'?: number;
    'aria-valuenow'?: number;
    'aria-valuetext'?: string;
    'aria-orientation'?: 'horizontal' | 'vertical';
    'aria-multiselectable'?: boolean;
    'aria-multiline'?: boolean;
    'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
    'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other';
    'aria-atomic'?: boolean;
    'aria-relevant'?: string;
}
export interface TouchTarget {
    minWidth: number;
    minHeight: number;
    padding: number;
}
export interface FocusConfig {
    trapFocus: boolean;
    restoreFocus: boolean;
    focusVisible: boolean;
}
export interface LoadingState {
    loading: boolean;
    skeleton: boolean;
    interactive: boolean;
}
export interface ReducedMotionConfig {
    respectPreference: boolean;
    fallback: 'none' | 'fade' | 'instant';
}
export interface ValidationState {
    valid: boolean;
    errors: string[];
    touched: boolean;
}
export interface DimensionConfig {
    width: string | number;
    height: string | number;
}
export interface ComponentLogicWithAccessibility<S> {
    name: string;
    state: S;
    actions: Record<string, (state: S, ...args: unknown[]) => Partial<S>>;
    render: (state: S) => string;
    aria: AriaAttributes;
    touchTarget?: TouchTarget;
    focusConfig?: FocusConfig;
    loadingState?: LoadingState;
    reducedMotionConfig?: ReducedMotionConfig;
    jfixStrategy?: JfixStrategy;
}
export declare const DEFAULT_TOUCH_TARGET: TouchTarget;
export declare const DEFAULT_FOCUS_CONFIG: FocusConfig;
export declare const DEFAULT_REDUCED_MOTION: ReducedMotionConfig;
//# sourceMappingURL=base.d.ts.map