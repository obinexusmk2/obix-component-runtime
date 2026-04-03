import type { ComponentLogicWithAccessibility } from '../types/base.js';
export interface TabItem {
    id: string;
    label: string;
    content: string;
    disabled?: boolean;
}
export interface TabsState {
    tabs: TabItem[];
    activeId: string;
    orientation: 'horizontal' | 'vertical';
    tablistId: string;
    label: string;
}
export interface TabsConfig {
    label: string;
    tabs: TabItem[];
    activeId?: string;
    orientation?: 'horizontal' | 'vertical';
    id?: string;
}
export declare function createTabs(config: TabsConfig): ComponentLogicWithAccessibility<TabsState>;
//# sourceMappingURL=tabs.d.ts.map