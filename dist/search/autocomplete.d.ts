import type { ComponentLogicWithAccessibility } from '../types/base.js';
export interface AutocompleteState {
    query: string;
    suggestions: string[];
    open: boolean;
    activeIndex: number;
    selectedValue: string | null;
    loading: boolean;
    label: string;
    inputId: string;
    listboxId: string;
}
export interface AutocompleteConfig {
    label: string;
    suggestions?: string[];
    id?: string;
}
export declare function createAutocomplete(config: AutocompleteConfig): ComponentLogicWithAccessibility<AutocompleteState>;
//# sourceMappingURL=autocomplete.d.ts.map