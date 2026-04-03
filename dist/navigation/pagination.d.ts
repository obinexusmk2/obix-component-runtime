import type { ComponentLogicWithAccessibility } from '../types/base.js';
export interface PaginationState {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    disabled: boolean;
    label: string;
}
export interface PaginationConfig {
    totalPages: number;
    currentPage?: number;
    pageSize?: number;
    disabled?: boolean;
    label?: string;
}
export declare function createPagination(config: PaginationConfig): ComponentLogicWithAccessibility<PaginationState>;
//# sourceMappingURL=pagination.d.ts.map