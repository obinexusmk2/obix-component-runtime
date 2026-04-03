import { DEFAULT_TOUCH_TARGET, DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';
const SIZE_CLASS = {
    sm: 'obix-button--sm',
    md: 'obix-button--md',
    lg: 'obix-button--lg',
};
function renderButton(state) {
    const ariaDisabled = state.disabled ? 'aria-disabled="true"' : '';
    const ariaBusy = state.loading ? 'aria-busy="true"' : '';
    const ariaPressed = state.pressed !== undefined ? `aria-pressed="${state.pressed}"` : '';
    const ariaExpanded = state.expanded !== undefined ? `aria-expanded="${state.expanded}"` : '';
    return `<button
  type="${state.type}"
  class="obix-button ${SIZE_CLASS[state.size]}"
  data-jfix-strategy="${state.jfixStrategy}"
  ${ariaDisabled}
  ${ariaBusy}
  ${ariaPressed}
  ${ariaExpanded}
>${state.loading ? '<span aria-hidden="true" class="obix-button__spinner"></span>' : ''}${state.label}</button>`;
}
export function createButton(config) {
    const isToggle = config.toggle ?? false;
    const logic = {
        name: 'ObixButton',
        state: {
            label: config.label,
            variant: config.variant ?? 'primary',
            size: config.size ?? 'md',
            type: config.type ?? 'button',
            disabled: config.disabled ?? false,
            loading: config.loading ?? false,
            pressed: isToggle ? false : undefined,
            expanded: undefined,
            jfixStrategy: config.jfixStrategy ?? 'transform-scale',
        },
        actions: {
            click: (state) => {
                if (state.disabled || state.loading)
                    return state;
                if (state.pressed !== undefined) {
                    return { pressed: !state.pressed };
                }
                return {};
            },
            setLoading: (state, loading) => ({
                loading: Boolean(loading),
                disabled: Boolean(loading),
            }),
            setDisabled: (_state, disabled) => ({ disabled: Boolean(disabled) }),
            setExpanded: (_state, expanded) => ({ expanded: Boolean(expanded) }),
            setJfixStrategy: (_state, strategy) => ({
                jfixStrategy: strategy,
            }),
        },
        render: renderButton,
        aria: {
            role: 'button',
            'aria-label': config.ariaLabel ?? config.label,
            'aria-busy': config.loading ?? false,
            'aria-disabled': config.disabled ?? false,
            'aria-controls': config.ariaControls,
        },
        touchTarget: DEFAULT_TOUCH_TARGET,
        focusConfig: DEFAULT_FOCUS_CONFIG,
        reducedMotionConfig: DEFAULT_REDUCED_MOTION,
    };
    return applyAllFudPolicies(logic);
}
//# sourceMappingURL=button.js.map