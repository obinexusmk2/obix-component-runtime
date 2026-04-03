import type { ComponentLogicWithAccessibility } from '../types/base.js';
export interface ProgressState {
    value: number;
    min: number;
    max: number;
    indeterminate: boolean;
    label: string;
    valueText: string | null;
}
export interface ProgressConfig {
    label: string;
    value?: number;
    min?: number;
    max?: number;
    indeterminate?: boolean;
    valueText?: string;
}
export declare function createProgress(config: ProgressConfig): ComponentLogicWithAccessibility<ProgressState>;
//# sourceMappingURL=progress.d.ts.map