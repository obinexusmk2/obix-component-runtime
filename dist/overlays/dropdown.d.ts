import type { ComponentLogicWithAccessibility } from '../types/base.js';
import type { JfixStrategy } from '../types/jfix.js';
export interface DropdownItem {
    id: string;
    label: string;
    href?: string;
    disabled?: boolean;
}
export interface DropdownState {
    open: boolean;
    items: DropdownItem[];
    activeIndex: number;
    selectedId: string | null;
    trigger: string;
    listboxId: string;
    triggerId: string;
    jfixStrategy: JfixStrategy;
    label: string;
}
export interface DropdownConfig {
    trigger: string;
    items: DropdownItem[];
    label?: string;
    jfixStrategy?: JfixStrategy;
    id?: string;
}
export declare function createDropdown(config: DropdownConfig): ComponentLogicWithAccessibility<DropdownState>;
//# sourceMappingURL=dropdown.d.ts.map