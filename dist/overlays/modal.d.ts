import type { ComponentLogicWithAccessibility } from '../types/base.js';
export interface ModalState {
    open: boolean;
    title: string;
    content: string;
    backdropClose: boolean;
    modalId: string;
    titleId: string;
    label: string;
}
export interface ModalConfig {
    title: string;
    content?: string;
    backdropClose?: boolean;
    label?: string;
    id?: string;
}
export declare function getFocusableElements(container: Element): HTMLElement[];
export declare function createFocusTrap(container: Element): (e: KeyboardEvent) => void;
export declare function createModal(config: ModalConfig): ComponentLogicWithAccessibility<ModalState>;
//# sourceMappingURL=modal.d.ts.map