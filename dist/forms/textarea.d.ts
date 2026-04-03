import type { ComponentLogicWithAccessibility, ValidationState } from '../types/base.js';
export type ResizeMode = 'none' | 'vertical' | 'horizontal' | 'both';
export interface TextareaState {
    value: string;
    label: string;
    placeholder: string;
    rows: number;
    cols: number;
    maxLength: number | null;
    resize: ResizeMode;
    autoExpand: boolean;
    required: boolean;
    disabled: boolean;
    readonly: boolean;
    validation: ValidationState;
    textareaId: string;
}
export interface TextareaConfig {
    label: string;
    placeholder?: string;
    rows?: number;
    cols?: number;
    maxLength?: number;
    resize?: ResizeMode;
    autoExpand?: boolean;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    id?: string;
}
export declare function createTextarea(config: TextareaConfig): ComponentLogicWithAccessibility<TextareaState>;
//# sourceMappingURL=textarea.d.ts.map