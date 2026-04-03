export type JfixStrategy = 'transform-scale' | 'box-shadow' | 'fixed-size';
export interface JfixHoverConfig {
    strategy: JfixStrategy;
    bgColor?: string;
    textColor?: string;
    scale?: number;
    shadow?: string;
}
export declare const JFIX_STRATEGIES: Record<JfixStrategy, JfixStrategy>;
export declare const DEFAULT_JFIX_STRATEGY: JfixStrategy;
//# sourceMappingURL=jfix.d.ts.map