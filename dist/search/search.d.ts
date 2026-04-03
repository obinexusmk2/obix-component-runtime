import type { ComponentLogicWithAccessibility } from '../types/base.js';
export interface SearchState {
    query: string;
    placeholder: string;
    disabled: boolean;
    loading: boolean;
    resultsCount: number | null;
    label: string;
    searchId: string;
}
export interface SearchConfig {
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    id?: string;
}
export declare function createSearch(config: SearchConfig): ComponentLogicWithAccessibility<SearchState>;
//# sourceMappingURL=search.d.ts.map