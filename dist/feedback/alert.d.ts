import type { ComponentLogicWithAccessibility } from '../types/base.js';
export type AlertType = 'info' | 'warning' | 'error' | 'success';
export interface AlertState {
    message: string;
    type: AlertType;
    dismissible: boolean;
    visible: boolean;
    returnFocusId: string | null;
}
export interface AlertConfig {
    message: string;
    type?: AlertType;
    dismissible?: boolean;
    returnFocusId?: string;
}
export declare function createAlert(config: AlertConfig): ComponentLogicWithAccessibility<AlertState>;
//# sourceMappingURL=alert.d.ts.map