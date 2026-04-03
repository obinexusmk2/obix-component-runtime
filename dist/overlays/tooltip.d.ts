import type { ComponentLogicWithAccessibility } from '../types/base.js';
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export interface TooltipState {
    content: string;
    visible: boolean;
    placement: TooltipPlacement;
    tooltipId: string;
    triggerId: string;
}
export interface TooltipConfig {
    content: string;
    placement?: TooltipPlacement;
    triggerId: string;
    id?: string;
}
export declare function createTooltip(config: TooltipConfig): ComponentLogicWithAccessibility<TooltipState>;
//# sourceMappingURL=tooltip.d.ts.map