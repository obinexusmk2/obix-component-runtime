export class PolicyViolationError extends Error {
    policy;
    constructor(policy, message) {
        super(`[OBIX Policy: ${policy}] ${message}`);
        this.policy = policy;
        this.name = 'PolicyViolationError';
    }
}
//# sourceMappingURL=violation.js.map