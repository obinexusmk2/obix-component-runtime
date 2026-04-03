/**
 * Converts a ComponentLogicWithAccessibility to a functional paradigm.
 * State is held in a closure; actions return new state.
 */
export function toFunctional(logic) {
    let currentState = { ...logic.state };
    return {
        getState: () => ({ ...currentState }),
        dispatch: (action, ...args) => {
            const actionFn = logic.actions[action];
            if (!actionFn)
                return;
            const patch = actionFn(currentState, ...args);
            currentState = { ...currentState, ...patch };
        },
        render: () => logic.render(currentState),
    };
}
/**
 * Converts a ComponentLogicWithAccessibility to an OOP paradigm.
 * Returns a plain object with bound methods acting as "class instance".
 */
export function toOOP(logic) {
    const instance = {
        state: { ...logic.state },
        render() {
            return logic.render(this.state);
        },
    };
    for (const [name, actionFn] of Object.entries(logic.actions)) {
        instance[name] = (...args) => {
            const patch = actionFn(instance.state, ...args);
            instance.state = { ...instance.state, ...patch };
        };
    }
    return instance;
}
/**
 * Converts a ComponentLogicWithAccessibility to a reactive paradigm.
 * Returns an object with subscribe/dispatch similar to a minimal observable store.
 */
export function toReactive(logic) {
    let currentState = { ...logic.state };
    const listeners = new Set();
    return {
        subscribe: (listener) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        dispatch: (action, ...args) => {
            const actionFn = logic.actions[action];
            if (!actionFn)
                return;
            const patch = actionFn(currentState, ...args);
            currentState = { ...currentState, ...patch };
            listeners.forEach((l) => l({ ...currentState }));
        },
        render: () => logic.render(currentState),
    };
}
/**
 * createObixAdapter — factory that wraps a ComponentLogicWithAccessibility
 * and exposes all four paradigm transforms.
 */
export function createObixAdapter(logic) {
    return {
        toFunctional: () => toFunctional(logic),
        toOOP: () => toOOP(logic),
        toReactive: () => toReactive(logic),
        toData: () => ({ ...logic }),
    };
}
//# sourceMappingURL=create-obix-adapter.js.map