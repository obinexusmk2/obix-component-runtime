# @obinexusltd/obix-component-runtime

> OBIX Heart/Soul UI/UX SDK — 30 WCAG 2.1 AA accessible components with FUD policy enforcement, jfix.scss design system, and first-class JSX support.

**Author:** OBINexus `<okpalan@protonmail.com>`
**License:** MIT | **Version:** 0.1.0

---

## Installation

```bash
npm install @obinexusltd/obix-component-runtime
```

---

## Philosophy: Accessibility-First, Data-Oriented

OBIX is built on three principles:

1. **Accessibility First** — Every component is WCAG 2.1 AA compliant by default. ARIA attributes, touch targets (min 48px), focus management, and reduced motion preferences are enforced automatically via the FUD policy system.

2. **Data-Oriented Programming (DOP)** — Components are plain data objects with state, actions, and a render function. No class instances, no virtual DOM, no framework lock-in.

3. **FUD Mitigation** — _Focus_, _Undo_, and _Drag_ policies prevent inaccessible interactions from reaching users. `applyAllFudPolicies()` wraps every component at creation time.

---

## Three Usage Modes

### 1. JavaScript / DOP (data-oriented programming)

```typescript
import { createButton } from '@obinexusltd/obix-component-runtime';

const btn = createButton({ label: 'Save', variant: 'primary' });

// Read state
console.log(btn.state.disabled); // false

// Dispatch actions
const next = btn.actions.setLoading(btn.state, true);

// Render to HTML string
const html = btn.render({ ...btn.state, ...next });
document.getElementById('app')!.innerHTML = html;
// → <button type="button" class="obix-button obix-button--md"
//     aria-busy="true" aria-disabled="true">
//     <span aria-hidden="true" class="obix-button__spinner"></span>Save
//   </button>
```

### 2. JSX (standard via OBINexus OBIX)

Configure `tsconfig.json`:
```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment"
  }
}
```

```tsx
/** @jsxRuntime classic */
/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from '@obinexusltd/obix-component-runtime/jsx-runtime';
import { createButton, createCard, createInput } from '@obinexusltd/obix-component-runtime';

// JSX syntax compiles to: h(createButton, { label: 'Save', variant: 'primary' })
const saveBtn = <createButton label="Save" variant="primary" />;
const cancelBtn = <createButton label="Cancel" variant="ghost" />;

// Render to HTML
document.getElementById('form-actions')!.innerHTML =
  saveBtn.render(saveBtn.state) +
  cancelBtn.render(cancelBtn.state);
```

### 3. HTMLx / Template Insertion

OBIX components render to semantic HTML strings, making them ideal for server-side rendering, HTMX, or any template-based workflow:

```typescript
import { createAlert, createModal } from '@obinexusltd/obix-component-runtime';

// Express.js route
app.get('/dashboard', (req, res) => {
  const alert = createAlert({ message: 'Welcome back!', type: 'success' });
  const html = `
    <div id="notifications">
      ${alert.render(alert.state)}
    </div>
  `;
  res.send(html);
});

// HTMX partial response
app.post('/modal', (req, res) => {
  const modal = createModal({ title: 'Confirm', content: 'Are you sure?' });
  res.send(modal.render(modal.state));
});
```

---

## API Reference

### Primitives
| Factory | Config key props | Description |
|---|---|---|
| `createButton` | `label`, `variant`, `size`, `disabled`, `loading`, `toggle` | Accessible button with FUD policies |
| `createCard` | `title`, `content`, `interactive` | Semantic card container |
| `createImage` | `src`, `alt`, `loading`, `width`, `height` | Accessible image with lazy loading |
| `createVideo` | `src`, `tracks`, `controls`, `autoplay` | Accessible video with caption tracks |

### Forms
| Factory | Description |
|---|---|
| `createInput` | Text input with validation states, autocomplete, ARIA |
| `createCheckbox` | Three-state checkbox (checked/unchecked/indeterminate) |
| `createRadioGroup` | Accessible radio button group |
| `createSelect` | Native select with option groups |
| `createTextarea` | Resizable textarea with character count |
| `createForm` | Form container with field validation orchestration |
| `createDatePicker` | Accessible date picker |
| `createFileUpload` | Drag-and-drop file upload with ARIA live region |

### Navigation
| Factory | Description |
|---|---|
| `createNavigation` | Landmark navigation with keyboard support |
| `createBreadcrumb` | ARIA breadcrumb trail |
| `createPagination` | Accessible pagination with page announcement |
| `createTabs` | ARIA tablist / tabpanel pattern |
| `createStepper` | Multi-step form/wizard stepper |

### Overlays
| Factory | Description |
|---|---|
| `createModal` | Focus-trapped modal dialog with return-focus management |
| `createDropdown` | Accessible dropdown menu |
| `createTooltip` | ARIA tooltip with show/hide lifecycle |

### Feedback
| Factory | Description |
|---|---|
| `createAlert` | ARIA live region alert (polite/assertive by type) |
| `createToast` | Auto-dismissing toast notification with position control |
| `createProgress` | Progress bar with `aria-valuenow` / `aria-valuemax` |
| `createLoading` | Loading spinner with `aria-busy` and `aria-label` |

### Controls
| Factory | Description |
|---|---|
| `createSlider` | Range slider with keyboard step, ARIA orientation |
| `createSwitch` | Toggle switch with `aria-checked` |

### Data
| Factory | Description |
|---|---|
| `createTable` | Sortable data table with `aria-sort` |
| `createAccordion` | Collapsible accordion with `aria-expanded` |

### Search
| Factory | Description |
|---|---|
| `createSearch` | Search input with live results announcement |
| `createAutocomplete` | ARIA combobox autocomplete |

---

## FUD Policy System

Every component is wrapped by `applyAllFudPolicies()` at creation. The following policies run automatically:

| Policy | What it enforces |
|---|---|
| `applyAccessibilityPolicy` | ARIA `role`, `aria-label`, required attributes present |
| `applyTouchTargetPolicy` | Minimum 48×48 px touch target (WCAG 2.5.5) |
| `applyFocusPolicy` | Visible focus indicator, `tabindex` management |
| `applyReducedMotionPolicy` | Respects `prefers-reduced-motion` media query |
| `applyLoadingPolicy` | `aria-busy` set correctly during loading states |

### Manual policy use

```typescript
import { validateFudCompliance, applyAllFudPolicies } from '@obinexusltd/obix-component-runtime';

// Validate an existing component
const result = validateFudCompliance(myComponent);
if (!result.valid) {
  console.warn('FUD violations:', result.violations);
}

// Apply policies to custom component logic
const accessible = applyAllFudPolicies(myComponentLogic);
```

---

## Adapter (Paradigm Translation)

The `createObixAdapter` allows any component to be used across paradigms:

```typescript
import { createButton, createObixAdapter } from '@obinexusltd/obix-component-runtime';

const btn = createButton({ label: 'Submit' });
const adapter = createObixAdapter(btn);

// Functional paradigm
const fn = adapter.toFunctional();
fn.dispatch('setLoading', true);
console.log(fn.render());

// OOP paradigm
const oop = adapter.toOOP();
oop.setLoading(true);

// Reactive paradigm
const rx = adapter.toReactive();
rx.subscribe(state => console.log('state changed:', state));
rx.dispatch('click');
```

---

## jfix Design System

OBIX uses the `jfix.scss` design system. Import styles:

```typescript
// Import compiled CSS
import '@obinexusltd/obix-component-runtime/styles';

// Or use SCSS source directly
import '@obinexusltd/obix-component-runtime/styles/scss';
```

Supported jfix strategies applied via `data-jfix-strategy`:
- `transform-scale` — smooth scale transitions
- `box-shadow` — elevation-based focus/hover
- `color-shift` — accessible color state changes
- `none` — disables all jfix effects (for reduced motion)

---

## Sub-path Imports

Install once, import by category:

```typescript
import { createButton } from '@obinexusltd/obix-component-runtime';           // all
import { createButton } from '@obinexusltd/obix-component-runtime/primitives'; // primitives only
import { createInput }  from '@obinexusltd/obix-component-runtime/forms';      // forms only
import { createModal }  from '@obinexusltd/obix-component-runtime/overlays';   // overlays only
import { createAlert }  from '@obinexusltd/obix-component-runtime/feedback';   // feedback only
import { createTabs }   from '@obinexusltd/obix-component-runtime/navigation'; // navigation only
import { createSlider } from '@obinexusltd/obix-component-runtime/controls';   // controls only
import { createTable }  from '@obinexusltd/obix-component-runtime/data';       // data only
import { createSearch } from '@obinexusltd/obix-component-runtime/search';     // search only
```

---

## ObixRuntime (optional peer dependency)

For managed component lifecycle, state halting, and revision tracking, install the optional runtime engine:

```bash
npm install @obinexusltd/obix-sdk-core
```

```typescript
import { ObixRuntime } from '@obinexusltd/obix-sdk-core';
import { createButton } from '@obinexusltd/obix-component-runtime';

const runtime = new ObixRuntime({ maxRevisions: 50, stabilityThreshold: 3 });

runtime.register({
  name: 'SaveButton',
  state: { label: 'Save', variant: 'primary', disabled: false, loading: false },
  actions: { ... },
  render: createButton({ label: 'Save' }).render,
});

const instance = runtime.create('SaveButton');
runtime.update(instance.id, 'setLoading', true);
```

---

## WCAG 2.1 AA Guarantees

| Criterion | How OBIX satisfies it |
|---|---|
| 1.1.1 Non-text Content | `alt` required on images; `aria-label` on icon-only controls |
| 1.3.1 Info and Relationships | Semantic HTML (`<button>`, `<nav>`, `<dialog>`, roles) |
| 1.4.3 Contrast | jfix tokens meet 4.5:1 minimum |
| 2.1.1 Keyboard | All interactive components support full keyboard operation |
| 2.4.3 Focus Order | Focus traps in modals; return-focus on close |
| 2.4.7 Focus Visible | jfix focus styles always visible (never hidden) |
| 2.5.3 Label in Name | Visible label matches `aria-label` |
| 2.5.5 Target Size | Minimum 48×48 px touch target enforced by policy |
| 4.1.2 Name, Role, Value | Comprehensive ARIA state management on all components |
| 4.1.3 Status Messages | Live regions (`aria-live`) on alerts, toasts, progress |
