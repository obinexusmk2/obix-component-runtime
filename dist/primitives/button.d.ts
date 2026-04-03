import type { ComponentLogicWithAccessibility } from '../types/base.js';
import type { JfixStrategy } from '../types/jfix.js';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';
export interface ButtonState {
    label: string;
    variant: ButtonVariant;
    size: ButtonSize;
    type: ButtonType;
    disabled: boolean;
    loading: boolean;
    pressed: boolean | undefined;
    expanded: boolean | undefined;
    jfixStrategy: JfixStrategy;
}
export interface ButtonConfig {
    label: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    type?: ButtonType;
    disabled?: boolean;
    loading?: boolean;
    toggle?: boolean;
    ariaLabel?: string;
    ariaControls?: string;
    jfixStrategy?: JfixStrategy;
}
export declare function createButton(config: ButtonConfig): ComponentLogicWithAccessibility<ButtonState>;
//# sourceMappingURL=button.d.ts.map