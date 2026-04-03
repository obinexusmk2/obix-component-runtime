import { DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';
function renderSlider(state) {
    const pct = ((state.value - state.min) / (state.max - state.min)) * 100;
    return `<div
  class="obix-slider"
  id="${state.sliderId}-wrapper"
>
  <label id="${state.sliderId}-label" class="obix-field__label">${state.label}</label>
  <div class="obix-slider__track">
    <div class="obix-slider__fill" style="width:${pct}%;"></div>
    <div
      id="${state.sliderId}"
      role="slider"
      class="obix-slider__thumb"
      tabindex="${state.disabled ? '-1' : '0'}"
      data-jfix-strategy="transform-scale"
      aria-valuenow="${state.value}"
      aria-valuemin="${state.min}"
      aria-valuemax="${state.max}"
      aria-orientation="${state.orientation}"
      aria-label="${state.label}"
      aria-labelledby="${state.sliderId}-label"
      ${state.valueText ? `aria-valuetext="${state.valueText}"` : ''}
      ${state.disabled ? 'aria-disabled="true"' : ''}
      style="left:${pct}%;"
    ></div>
  </div>
</div>`;
}
export function createSlider(config) {
    const id = config.id ?? `obix-slider-${Math.random().toString(36).slice(2, 8)}`;
    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
    const min = config.min ?? 0;
    const max = config.max ?? 100;
    const step = config.step ?? 1;
    const logic = {
        name: 'ObixSlider',
        state: {
            value: clamp(config.value ?? min, min, max),
            min,
            max,
            step,
            disabled: config.disabled ?? false,
            label: config.label,
            orientation: config.orientation ?? 'horizontal',
            valueText: config.valueText ?? null,
            sliderId: id,
        },
        actions: {
            setValue: (state, value) => ({
                value: clamp(Number(value), state.min, state.max),
            }),
            increment: (state) => ({
                value: clamp(state.value + state.step, state.min, state.max),
            }),
            decrement: (state) => ({
                value: clamp(state.value - state.step, state.min, state.max),
            }),
            home: (state) => ({ value: state.min }),
            end: (state) => ({ value: state.max }),
            setValueText: (_state, text) => ({ valueText: String(text) }),
        },
        render: renderSlider,
        aria: {
            role: 'slider',
            'aria-label': config.label,
            'aria-valuenow': config.value ?? min,
            'aria-valuemin': min,
            'aria-valuemax': max,
            'aria-orientation': config.orientation ?? 'horizontal',
            'aria-disabled': config.disabled ?? false,
        },
        touchTarget: { minWidth: 44, minHeight: 44, padding: 8 },
        focusConfig: DEFAULT_FOCUS_CONFIG,
        reducedMotionConfig: DEFAULT_REDUCED_MOTION,
    };
    return applyAllFudPolicies(logic);
}
//# sourceMappingURL=slider.js.map