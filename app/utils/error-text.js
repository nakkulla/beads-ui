/**
 * The text of a failed request. A server refusal arrives as the reply's
 * `{ code, message }` object (`app/ws.js` rejects with `msg.error`), not an
 * `Error`, so `String(err)` reads `[object Object]`.
 */

/**
 * An `Error`'s message, the refusal object's `message` (a strict validation
 * names its reason there), its `code`, or the value itself.
 *
 * @param {unknown} err
 * @returns {string}
 */
export function errorText(err) {
  if (err instanceof Error) {
    return err.message;
  }
  const message = /** @type {any} */ (err)?.message;
  if (typeof message === 'string' && message.length > 0) {
    return message;
  }
  const code = /** @type {any} */ (err)?.code;
  return typeof code === 'string' && code.length > 0 ? code : String(err);
}
