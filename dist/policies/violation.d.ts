export declare class PolicyViolationError extends Error {
    readonly policy: string;
    constructor(policy: string, message: string);
}
export interface PolicyViolation {
    policy: string;
    message: string;
    severity: 'error' | 'warning';
}
export interface PolicyResult {
    valid: boolean;
    violations: PolicyViolation[];
}
//# sourceMappingURL=violation.d.ts.map