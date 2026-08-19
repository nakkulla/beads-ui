/**
 * Client-side holder for per-subscription session-log lines (spec §5.6).
 *
 * The server pushes a `session-log-snapshot` (all persisted raw events) on
 * subscribe, then `session-log-append` events (one raw event each) for a live
 * attempt. Both land here keyed by subscription id; the transcript drawer
 * subscribes for re-render and parses the raw stream via `transcript-render.js`.
 *
 * Total-state per subscription: a snapshot replaces the buffer wholesale; an append
 * pushes one event onto the tail.
 *
 * Each subscription also carries `last_event_at` (UI-rkly §2) — when the session
 * last moved, in epoch ms. The raw events have no timestamp of their own, so
 * the two directions get it from different places: a snapshot takes the
 * server's log-file mtime, an append takes the client's receive time.
 */

/**
 * @returns {{
 *   set: (subscription_id: string, lines: unknown[], last_event_at?: number|null) => void,
 *   append: (subscription_id: string, event: unknown) => void,
 *   get: (subscription_id: string) => { lines: unknown[], last_event_at: number|null } | null,
 *   clear: (subscription_id?: string) => void,
 *   subscribe: (fn: () => void) => () => void
 * }}
 */
export function createSessionLogStore() {
  /** @type {Map<string, { lines: unknown[], last_event_at: number|null }>} */
  const by_subscription = new Map();
  /** @type {Set<() => void>} */
  const listeners = new Set();

  /**
   * Keep callers from older clients compatible while storing every record under
   * the transport subscription id.
   *
   * @param {string} subscription_id
   */
  function subscriptionKey(subscription_id) {
    return subscription_id.startsWith('session-log:')
      ? subscription_id
      : `session-log:${subscription_id}`;
  }

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
     * @param {string} subscription_id
     * @param {unknown[]} lines
     * @param {number|null} [last_event_at] - Server log-file mtime (epoch ms).
     */
    set(subscription_id, lines, last_event_at = null) {
      by_subscription.set(subscriptionKey(subscription_id), {
        lines: Array.isArray(lines) ? [...lines] : [],
        last_event_at: typeof last_event_at === 'number' ? last_event_at : null
      });
      emit();
    },
    /**
     * @param {string} subscription_id
     * @param {unknown} event
     */
    append(subscription_id, event) {
      const key = subscriptionKey(subscription_id);
      const rec = by_subscription.get(key) || {
        lines: [],
        last_event_at: null
      };
      rec.lines = [...rec.lines, event];
      // The event itself carries no time, so arrival IS the event time.
      rec.last_event_at = Date.now();
      by_subscription.set(key, rec);
      emit();
    },
    /**
     * @param {string} subscription_id
     * @returns {{ lines: unknown[], last_event_at: number|null } | null}
     */
    get(subscription_id) {
      return by_subscription.get(subscriptionKey(subscription_id)) || null;
    },
    /**
     * @param {string} [subscription_id]
     */
    clear(subscription_id) {
      if (typeof subscription_id === 'string') {
        by_subscription.delete(subscriptionKey(subscription_id));
      } else {
        by_subscription.clear();
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
