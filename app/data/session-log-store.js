/**
 * Client-side holder for per-attempt session-log lines (spec §5.6).
 *
 * The server pushes a `session-log-snapshot` (all persisted raw events) on
 * subscribe, then `session-log-append` events (one raw event each) for a live
 * attempt. Both land here keyed by `attempt_id`; the transcript drawer
 * subscribes for re-render and parses the raw stream via `transcript-render.js`.
 *
 * Total-state per attempt: a snapshot replaces the buffer wholesale; an append
 * pushes one event onto the tail.
 */

/**
 * @returns {{
 *   set: (attempt_id: string, lines: unknown[]) => void,
 *   append: (attempt_id: string, event: unknown) => void,
 *   get: (attempt_id: string) => { lines: unknown[] } | null,
 *   clear: (attempt_id?: string) => void,
 *   subscribe: (fn: () => void) => () => void
 * }}
 */
export function createSessionLogStore() {
  /** @type {Map<string, { lines: unknown[] }>} */
  const byAttempt = new Map();
  /** @type {Set<() => void>} */
  const listeners = new Set();

  function emit() {
    for (const fn of Array.from(listeners)) {
      try {
        fn();
      } catch {
        /* ignore listener errors */
      }
    }
  }

  return {
    /**
     * @param {string} attempt_id
     * @param {unknown[]} lines
     */
    set(attempt_id, lines) {
      byAttempt.set(attempt_id, {
        lines: Array.isArray(lines) ? [...lines] : []
      });
      emit();
    },
    /**
     * @param {string} attempt_id
     * @param {unknown} event
     */
    append(attempt_id, event) {
      const rec = byAttempt.get(attempt_id) || { lines: [] };
      rec.lines = [...rec.lines, event];
      byAttempt.set(attempt_id, rec);
      emit();
    },
    /**
     * @param {string} attempt_id
     * @returns {{ lines: unknown[] } | null}
     */
    get(attempt_id) {
      return byAttempt.get(attempt_id) || null;
    },
    /**
     * @param {string} [attempt_id]
     */
    clear(attempt_id) {
      if (typeof attempt_id === 'string') {
        byAttempt.delete(attempt_id);
      } else {
        byAttempt.clear();
      }
      emit();
    },
    /**
     * @param {() => void} fn
     * @returns {() => void}
     */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}
