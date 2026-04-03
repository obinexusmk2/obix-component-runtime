import type { ComponentLogicWithAccessibility } from '../types/base.js';
import type { JfixStrategy } from '../types/jfix.js';
export interface CardState {
    title: string;
    content: string;
    width: string | number;
    height: string | number;
    loading: boolean;
    skeleton: boolean;
    interactive: boolean;
    jfixStrategy: JfixStrategy;
}
export interface CardConfig {
    title: string;
    content?: string;
    width: string | number;
    height: string | number;
    loading?: boolean;
    interactive?: boolean;
    ariaLabel?: string;
    jfixStrategy?: JfixStrategy;
}
export declare function createCard(config: CardConfig): ComponentLogicWithAccessibility<CardState>;
//# sourceMappingURL=card.d.ts.map