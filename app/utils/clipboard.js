/**
 * Copy text to the clipboard with a non-secure-context fallback.
 *
 * `navigator.clipboard` is undefined when the page is served over plain HTTP
 * from a non-localhost host (e.g. the tailnet bind), so a hidden-textarea
 * `document.execCommand('copy')` fallback is required there. A present-but-
 * rejecting `writeText` (permission denied) also falls through to the legacy
 * path instead of failing silently.
 *
 * @param {string} text
 * @returns {Promise<boolean>} Whether the text landed on the clipboard.
 */
export async function copyToClipboard(text) {
  const value = String(text);
  if (
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === 'function'
  ) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      // fall through to the execCommand path
    }
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = value;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } finally {
      ta.remove();
    }
    return ok;
  } catch {
    return false;
  }
}
