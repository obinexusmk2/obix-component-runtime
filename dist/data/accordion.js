import { DEFAULT_TOUCH_TARGET, DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION } from '../types/base.js';
import { applyAllFudPolicies } from '../policies/compose.js';
function renderAccordion(state) {
    const panels = state.items.map((item) => {
        const isOpen = state.openIds.includes(item.id);
        const level = item.headingLevel ?? 3;
        return `<div class="obix-accordion__item">
  <h${level} class="obix-accordion__heading">
    <button
      id="${state.accordionId}-trigger-${item.id}"
      class="obix-accordion__trigger"
      type="button"
      data-jfix-strategy="fixed-size"
      aria-expanded="${isOpen}"
      aria-controls="${state.accordionId}-panel-${item.id}"
    >${item.heading}<span aria-hidden="true">${isOpen ? ' ▲' : ' ▼'}</span></button>
  </h${level}>
  <div
    id="${state.accordionId}-panel-${item.id}"
    role="region"
    class="obix-accordion__panel"
    aria-labelledby="${state.accordionId}-trigger-${item.id}"
    ${isOpen ? '' : 'hidden'}
  >${isOpen ? item.content : ''}</div>
</div>`;
    }).join('');
    return `<div class="obix-accordion" aria-label="${state.label}">${panels}</div>`;
}
export function createAccordion(config) {
    const id = config.id ?? `obix-accordion-${Math.random().toString(36).slice(2, 8)}`;
    const logic = {
        name: 'ObixAccordion',
        state: {
            items: config.items,
            openIds: config.defaultOpenIds ?? [],
            allowMultiple: config.allowMultiple ?? false,
            accordionId: id,
            label: config.label,
        },
        actions: {
            toggle: (state, itemId) => {
                const id = String(itemId);
                const isOpen = state.openIds.includes(id);
                if (isOpen) {
                    return { openIds: state.openIds.filter((i) => i !== id) };
                }
                return { openIds: state.allowMultiple ? [...state.openIds, id] : [id] };
            },
            open: (state, itemId) => {
                const id = String(itemId);
                if (state.openIds.includes(id))
                    return state;
                return { openIds: state.allowMultiple ? [...state.openIds, id] : [id] };
            },
            close: (state, itemId) => ({
                openIds: state.openIds.filter((i) => i !== String(itemId)),
            }),
            openAll: (state) => ({
                openIds: state.allowMultiple ? state.items.map((i) => i.id) : state.openIds,
            }),
            closeAll: (_state) => ({ openIds: [] }),
        },
        render: renderAccordion,
        aria: {
            role: 'list',
            'aria-label': config.label,
        },
        touchTarget: DEFAULT_TOUCH_TARGET,
        focusConfig: DEFAULT_FOCUS_CONFIG,
        reducedMotionConfig: DEFAULT_REDUCED_MOTION,
    };
    return applyAllFudPolicies(logic);
}
//# sourceMappingURL=accordion.js.map