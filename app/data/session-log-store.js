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
 *
 * Each attempt also carries `last_event_at` (UI-rkly §2) — when the session
 * last moved, in epoch ms. The raw events have no timestamp of their own, so
 * the two directions get it from different places: a snapshot takes the
 * server's log-file mtime, an append takes the client's receive time.
 */

/**
 * @returns {{
 *   set: (attempt_id: string, lines: unknown[], last_event_at?: number|null) => void,
 *   append: (attempt_id: string, event: unknown) => void,
 *   get: (attempt_id: string) => { lines: unknown[], last_event_at: number|null } | null,
 *   clear: (attempt_id?: string) => void,
 *   subscribe: (fn: () => void) => () => void
 * }}
 */
export function createSessionLogStore() {
  /** @type {Map<string, { lines: unknown[], last_event_at: number|null }>} */
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
     * @param {number|null} [last_event_at] - Server log-file mtime (epoch ms).
     */
    set(attempt_id, lines, last_event_at = null) {
      byAttempt.set(attempt_id, {
        lines: Array.isArray(lines) ? [...lines] : [],
        last_event_at: typeof last_event_at === 'number' ? last_event_at : null
      });
      emit();
    },
    /**
     * @param {string} attempt_id
     * @param {unknown} event
     */
    append(attempt_id, event) {
      const rec = byAttempt.get(attempt_id) || {
        lines: [],
        last_event_at: null
      };
      rec.lines = [...rec.lines, event];
      // The event itself carries no time, so arrival IS the event time.
      rec.last_event_at = Date.now();
      byAttempt.set(attempt_id, rec);
      emit();
    },
    /**
     * @param {string} attempt_id
     * @returns {{ lines: unknown[], last_event_at: number|null } | null}
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
