import type { ComponentLogicWithAccessibility } from '../types/base.js';
export type CheckedState = boolean | 'mixed';
export interface CheckboxState {
    checked: CheckedState;
    label: string;
    value: string;
    required: boolean;
    disabled: boolean;
    groupLabel: string;
    inputId: string;
}
export interface CheckboxConfig {
    label: string;
    value?: string;
    checked?: boolean;
    indeterminate?: boolean;
    required?: boolean;
    disabled?: boolean;
    groupLabel?: string;
    id?: string;
}
export declare function createCheckbox(config: CheckboxConfig): ComponentLogicWithAccessibility<CheckboxState>;
//# sourceMappingURL=checkbox.d.ts.map