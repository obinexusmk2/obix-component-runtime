import type { ComponentLogicWithAccessibility } from '../types/base.js';
import { DEFAULT_TOUCH_TARGET, DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';

export interface StepItem {
  id: string;
  label: string;
  description?: string;
}

export interface StepperState {
  steps: StepItem[];
  currentStep: number;
  completedSteps: number[];
  label: string;
}

export interface StepperConfig {
  label: string;
  steps: StepItem[];
  currentStep?: number;
}

function renderStepper(state: StepperState): string {
  const items = state.steps.map((step, i) => {
    const isCurrent = i === state.currentStep;
    const isCompleted = state.completedSteps.includes(i);
    const isClickable = isCompleted;

    return `<li
      class="obix-stepper__step${isCurrent ? ' obix-stepper__step--current' : ''}${isCompleted ? ' obix-stepper__step--completed' : ''}"
      role="listitem"
      data-jfix-strategy="fixed-size"
      ${isCurrent ? 'aria-current="step"' : ''}
      ${isClickable ? 'tabindex="0"' : ''}
    >
      <span class="obix-stepper__step-indicator" aria-hidden="true">${isCompleted ? '✓' : i + 1}</span>
      <span class="obix-stepper__step-label">${step.label}</span>
      ${step.description ? `<span class="obix-stepper__step-desc">${step.description}</span>` : ''}
    </li>`;
  }).join('');

  return `<nav aria-label="${state.label}" class="obix-stepper">
  <ol class="obix-stepper__list" role="list" aria-label="${state.label}">
    ${items}
  </ol>
  <div class="obix-stepper__progress" role="progressbar" aria-valuenow="${state.currentStep + 1}" aria-valuemin="1" aria-valuemax="${state.steps.length}" aria-label="Step ${state.currentStep + 1} of ${state.steps.length}"></div>
</nav>`;
}

export function createStepper(config: StepperConfig): ComponentLogicWithAccessibility<StepperState> {
  const logic: ComponentLogicWithAccessibility<StepperState> = {
    name: 'ObixStepper',
    state: {
      steps: config.steps,
      currentStep: config.currentStep ?? 0,
      completedSteps: [],
      label: config.label,
    },
    actions: {
      nextStep: (state) => {
        if (state.currentStep >= state.steps.length - 1) return state;
        const completed = [...state.completedSteps, state.currentStep];
        return { currentStep: state.currentStep + 1, completedSteps: [...new Set(completed)] };
      },
      prevStep: (state) => state.currentStep > 0 ? { currentStep: state.currentStep - 1 } : state,
      goToStep: (state, step: unknown) => {
        const s = Number(step);
        if (!state.completedSteps.includes(s) && s !== state.currentStep) return state;
        return { currentStep: s };
      },
      completeStep: (state, step: unknown) => ({
        completedSteps: [...new Set([...state.completedSteps, Number(step)])],
      }),
    },
    render: renderStepper,
    aria: {
      role: 'navigation',
      'aria-label': config.label,
    },
    touchTarget: DEFAULT_TOUCH_TARGET,
    focusConfig: DEFAULT_FOCUS_CONFIG,
    reducedMotionConfig: DEFAULT_REDUCED_MOTION,
  };

  return applyAllFudPolicies(logic);
}
