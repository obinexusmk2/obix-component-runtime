import type { ComponentLogicWithAccessibility } from '../types/base.js';
export interface LoadingState {
    visible: boolean;
    label: string;
    overlay: boolean;
}
export interface LoadingConfig {
    label?: string;
    overlay?: boolean;
}
export declare function createLoading(config: LoadingConfig): ComponentLogicWithAccessibility<LoadingState>;
//# sourceMappingURL=loading.d.ts.map