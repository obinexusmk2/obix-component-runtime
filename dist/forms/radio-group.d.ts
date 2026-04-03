import type { ComponentLogicWithAccessibility } from '../types/base.js';
export interface RadioOption {
    label: string;
    value: string;
    disabled?: boolean;
}
export interface RadioGroupState {
    options: RadioOption[];
    selectedValue: string | null;
    name: string;
    groupLabel: string;
    required: boolean;
    disabled: boolean;
    focusedIndex: number;
}
export interface RadioGroupConfig {
    groupLabel: string;
    options: RadioOption[];
    name?: string;
    selectedValue?: string;
    required?: boolean;
    disabled?: boolean;
}
export declare function createRadioGroup(config: RadioGroupConfig): ComponentLogicWithAccessibility<RadioGroupState>;
//# sourceMappingURL=radio-group.d.ts.map