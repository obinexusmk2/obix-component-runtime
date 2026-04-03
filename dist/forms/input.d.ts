import type { ComponentLogicWithAccessibility, ValidationState } from '../types/base.js';
export type InputType = 'text' | 'email' | 'password' | 'url' | 'tel' | 'number' | 'search';
export type ValidationTiming = 'blur' | 'change' | 'submit';
export type AutocompleteValue = 'on' | 'off' | 'email' | 'username' | 'current-password' | 'new-password' | 'given-name' | 'family-name' | 'name' | 'tel' | 'url' | string;
export interface InputState {
    value: string;
    type: InputType;
    label: string;
    placeholder: string;
    required: boolean;
    disabled: boolean;
    readonly: boolean;
    autocomplete: AutocompleteValue;
    validationTiming: ValidationTiming;
    validation: ValidationState;
    hintText: string;
    errorId: string;
    inputId: string;
}
export interface InputConfig {
    label: string;
    type?: InputType;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    autocomplete?: AutocompleteValue;
    validationTiming?: ValidationTiming;
    hintText?: string;
    id?: string;
}
export declare function createInput(config: InputConfig): ComponentLogicWithAccessibility<InputState>;
//# sourceMappingURL=input.d.ts.map