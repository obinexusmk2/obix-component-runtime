export class PolicyViolationError extends Error {
  constructor(
    public readonly policy: string,
    message: string,
  ) {
    super(`[OBIX Policy: ${policy}] ${message}`);
    this.name = 'PolicyViolationError';
  }
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
