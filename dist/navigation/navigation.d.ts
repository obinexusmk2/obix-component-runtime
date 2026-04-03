import type { ComponentLogicWithAccessibility } from '../types/base.js';
export interface NavItem {
    id: string;
    label: string;
    href: string;
    disabled?: boolean;
}
export interface NavigationState {
    items: NavItem[];
    activeId: string | null;
    orientation: 'horizontal' | 'vertical';
    mobileOpen: boolean;
    mobileMenuId: string;
    label: string;
}
export interface NavigationConfig {
    label: string;
    items: NavItem[];
    activeId?: string;
    orientation?: 'horizontal' | 'vertical';
    id?: string;
}
export declare function createNavigation(config: NavigationConfig): ComponentLogicWithAccessibility<NavigationState>;
//# sourceMappingURL=navigation.d.ts.map