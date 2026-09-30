/**
 * A replace-only store for the ADR snapshot (UI-8uz7 §6): the channel sends
 * whole snapshots, so there are no partial patches to apply.
 *
 * @returns {{ get: () => ({ workspaces: any[] }|null), set: (value: { workspaces: any[] }) => void, subscribe: (fn: () => void) => () => void }}
 */
export function createAdrStore() {
  /** @type {{ workspaces: any[] }|null} */
  let value = null;
  /** @type {Set<() => void>} */
  const listeners = new Set();
  return {
    get: () => value,
    set(next) {
      value = next;
      for (const fn of Array.from(listeners)) {
        try {
          fn();
        } catch {
          // a broken subscriber must not stop the others
        }
      }
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}
