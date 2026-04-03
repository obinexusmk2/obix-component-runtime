import type { ComponentLogicWithAccessibility } from '../types/base.js';
export type SliderOrientation = 'horizontal' | 'vertical';
export interface SliderState {
    value: number;
    min: number;
    max: number;
    step: number;
    disabled: boolean;
    label: string;
    orientation: SliderOrientation;
    valueText: string | null;
    sliderId: string;
}
export interface SliderConfig {
    label: string;
    min?: number;
    max?: number;
    value?: number;
    step?: number;
    disabled?: boolean;
    orientation?: SliderOrientation;
    valueText?: string;
    id?: string;
}
export declare function createSlider(config: SliderConfig): ComponentLogicWithAccessibility<SliderState>;
//# sourceMappingURL=slider.d.ts.map