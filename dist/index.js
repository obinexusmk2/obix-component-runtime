// @obinexusltd/obix — OBIX Heart/Soul UI/UX SDK
// 30 WCAG 2.1 AA accessible components with FUD policy enforcement and jfix.scss design system
// Author: OBINexus <okpalan@protonmail.com>
export { DEFAULT_TOUCH_TARGET, DEFAULT_FOCUS_CONFIG, DEFAULT_REDUCED_MOTION, } from './types/base.js';
export { JFIX_STRATEGIES, DEFAULT_JFIX_STRATEGY } from './types/jfix.js';
// ── Policies ─────────────────────────────────────────────────────────────────
export { PolicyViolationError } from './policies/violation.js';
export { applyAccessibilityPolicy } from './policies/accessibility.js';
export { applyTouchTargetPolicy } from './policies/touch-target.js';
export { applyReducedMotionPolicy } from './policies/reduced-motion.js';
export { applyFocusPolicy } from './policies/focus.js';
export { applyLoadingPolicy } from './policies/loading.js';
export { applyAllFudPolicies, validateFudCompliance } from './policies/compose.js';
// ── Style Utilities ───────────────────────────────────────────────────────────
export { jfixApplyStrategy, jfixRemoveStrategy, jfixGetStrategy, prefersReducedMotion } from './styles/jfix-utils.js';
export { TOKENS, JFIX_CLASS_MAP } from './styles/tokens.js';
// ── Adapter ───────────────────────────────────────────────────────────────────
export { createObixAdapter, toFunctional, toOOP, toReactive } from './adapter/create-obix-adapter.js';
// ── Primitives ────────────────────────────────────────────────────────────────
export { createButton } from './primitives/button.js';
export { createCard } from './primitives/card.js';
export { createImage } from './primitives/image.js';
export { createVideo } from './primitives/video.js';
// ── Forms ─────────────────────────────────────────────────────────────────────
export { createInput } from './forms/input.js';
export { createCheckbox } from './forms/checkbox.js';
export { createRadioGroup } from './forms/radio-group.js';
export { createSelect } from './forms/select.js';
export { createTextarea } from './forms/textarea.js';
export { createForm } from './forms/form.js';
export { createDatePicker } from './forms/date-picker.js';
export { createFileUpload } from './forms/file-upload.js';
// ── Navigation ────────────────────────────────────────────────────────────────
export { createNavigation } from './navigation/navigation.js';
export { createBreadcrumb } from './navigation/breadcrumb.js';
export { createPagination } from './navigation/pagination.js';
export { createTabs } from './navigation/tabs.js';
export { createStepper } from './navigation/stepper.js';
// ── Overlays ──────────────────────────────────────────────────────────────────
export { createModal, getFocusableElements, createFocusTrap } from './overlays/modal.js';
export { createDropdown } from './overlays/dropdown.js';
export { createTooltip } from './overlays/tooltip.js';
// ── Feedback ──────────────────────────────────────────────────────────────────
export { createAlert } from './feedback/alert.js';
export { createToast } from './feedback/toast.js';
export { createProgress } from './feedback/progress.js';
export { createLoading } from './feedback/loading.js';
// ── Controls ──────────────────────────────────────────────────────────────────
export { createSlider } from './controls/slider.js';
export { createSwitch } from './controls/switch.js';
// ── Data ──────────────────────────────────────────────────────────────────────
export { createTable } from './data/table.js';
export { createAccordion } from './data/accordion.js';
// ── Search ────────────────────────────────────────────────────────────────────
export { createSearch } from './search/search.js';
export { createAutocomplete } from './search/autocomplete.js';
//# sourceMappingURL=index.js.map