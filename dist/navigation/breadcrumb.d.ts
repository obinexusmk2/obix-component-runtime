import type { ComponentLogicWithAccessibility } from '../types/base.js';
export interface Crumb {
    label: string;
    href: string;
}
export interface BreadcrumbState {
    crumbs: Crumb[];
    separator: string;
}
export interface BreadcrumbConfig {
    crumbs: Crumb[];
    separator?: string;
}
export declare function createBreadcrumb(config: BreadcrumbConfig): ComponentLogicWithAccessibility<BreadcrumbState>;
//# sourceMappingURL=breadcrumb.d.ts.map