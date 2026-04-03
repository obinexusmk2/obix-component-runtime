import type { ComponentLogicWithAccessibility } from '../types/base.js';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export type ToastType = 'info' | 'warning' | 'error' | 'success';
export interface ToastState {
    message: string;
    type: ToastType;
    visible: boolean;
    duration: number;
    position: ToastPosition;
    toastId: string;
    pauseOnHover: boolean;
}
export interface ToastConfig {
    message: string;
    type?: ToastType;
    duration?: number;
    position?: ToastPosition;
    pauseOnHover?: boolean;
    id?: string;
}
export declare function createToast(config: ToastConfig): ComponentLogicWithAccessibility<ToastState>;
//# sourceMappingURL=toast.d.ts.map