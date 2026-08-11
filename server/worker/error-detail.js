/**
 * Upper bound on a preserved diagnostic string — enough to name a failure,
 * not enough to bloat durable queue state.
 *
 * @type {number}
 */
const DETAIL_MAX = 512;

/**
 * Reduce a thrown value to the diagnostic text worth persisting.
 *
 * @param {unknown} err
 * @returns {string}
 */
export function errorDetail(err) {
  const text =
    err instanceof Error
      ? err.message
      : typeof err === 'string'
        ? err
        : String(err);
  return text.trim().slice(0, DETAIL_MAX);
}
