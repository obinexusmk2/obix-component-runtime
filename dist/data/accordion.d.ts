import type { ComponentLogicWithAccessibility } from '../types/base.js';
export interface AccordionItem {
    id: string;
    heading: string;
    content: string;
    headingLevel?: 2 | 3 | 4 | 5 | 6;
}
export interface AccordionState {
    items: AccordionItem[];
    openIds: string[];
    allowMultiple: boolean;
    accordionId: string;
    label: string;
}
export interface AccordionConfig {
    label: string;
    items: AccordionItem[];
    allowMultiple?: boolean;
    defaultOpenIds?: string[];
    id?: string;
}
export declare function createAccordion(config: AccordionConfig): ComponentLogicWithAccessibility<AccordionState>;
//# sourceMappingURL=accordion.d.ts.map