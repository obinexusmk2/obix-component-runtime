import type { ComponentLogicWithAccessibility } from '../types/base.js';
export interface SwitchState {
    checked: boolean;
    disabled: boolean;
    label: string;
    switchId: string;
}
export interface SwitchConfig {
    label: string;
    checked?: boolean;
    disabled?: boolean;
    id?: string;
}
export declare function createSwitch(config: SwitchConfig): ComponentLogicWithAccessibility<SwitchState>;
//# sourceMappingURL=switch.d.ts.map