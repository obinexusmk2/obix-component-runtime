import type { ComponentLogicWithAccessibility } from '../types/base.js';
export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}
export interface SelectOptGroup {
    label: string;
    options: SelectOption[];
}
export type SelectItem = SelectOption | SelectOptGroup;
export interface SelectState {
    options: SelectItem[];
    selectedValues: string[];
    multiple: boolean;
    open: boolean;
    disabled: boolean;
    required: boolean;
    placeholder: string;
    label: string;
    selectId: string;
    searchQuery: string;
}
export interface SelectConfig {
    label: string;
    options: SelectItem[];
    selectedValue?: string;
    multiple?: boolean;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
    id?: string;
}
export declare function createSelect(config: SelectConfig): ComponentLogicWithAccessibility<SelectState>;
//# sourceMappingURL=select.d.ts.map