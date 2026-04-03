import type { ComponentLogicWithAccessibility, ValidationState } from '../types/base.js';
export interface FieldState {
    value: string;
    validation: ValidationState;
    label: string;
}
export interface FormState {
    fields: Record<string, FieldState>;
    valid: boolean;
    submitting: boolean;
    submitted: boolean;
    formId: string;
    formLabel: string;
    errorSummary: string[];
}
export interface FormConfig {
    label: string;
    fields?: Record<string, {
        label: string;
        required?: boolean;
    }>;
    id?: string;
}
export declare function createForm(config: FormConfig): ComponentLogicWithAccessibility<FormState>;
//# sourceMappingURL=form.d.ts.map