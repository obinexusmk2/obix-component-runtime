import type { ComponentLogicWithAccessibility } from '../types/base.js';
export interface StepItem {
    id: string;
    label: string;
    description?: string;
}
export interface StepperState {
    steps: StepItem[];
    currentStep: number;
    completedSteps: number[];
    label: string;
}
export interface StepperConfig {
    label: string;
    steps: StepItem[];
    currentStep?: number;
}
export declare function createStepper(config: StepperConfig): ComponentLogicWithAccessibility<StepperState>;
//# sourceMappingURL=stepper.d.ts.map