import type { ComponentLogicWithAccessibility } from '../types/base.js';
export interface DatePickerState {
    value: string | null;
    open: boolean;
    minDate: string;
    maxDate: string;
    disabled: boolean;
    required: boolean;
    label: string;
    inputId: string;
    viewYear: number;
    viewMonth: number;
}
export interface DatePickerConfig {
    label: string;
    value?: string;
    minDate?: string;
    maxDate?: string;
    disabled?: boolean;
    required?: boolean;
    id?: string;
}
export declare function createDatePicker(config: DatePickerConfig): ComponentLogicWithAccessibility<DatePickerState>;
//# sourceMappingURL=date-picker.d.ts.map