/**
 * Show a transient global toast message anchored to the viewport.
 *
 * @param {string} text - Message text.
 * @param {'info'|'success'|'warning'|'error'} [variant] - Visual variant.
 * @param {number} [duration_ms] - Auto-dismiss delay in milliseconds.
 */
export function showToast(text, variant = 'info', duration_ms = 2800) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = text;
  el.style.position = 'fixed';
  el.style.right = '12px';
  el.style.bottom = '12px';
  el.style.zIndex = '1000';
  el.style.color = '#fff';
  el.style.padding = '8px 10px';
  el.style.borderRadius = '4px';
  el.style.fontSize = '12px';
  if (variant === 'success') {
    el.style.background = '#156d36';
  } else if (variant === 'warning') {
    el.style.background = '#a36a00';
  } else if (variant === 'error') {
    el.style.background = '#9f2011';
  } else {
    el.style.background = 'rgba(0,0,0,0.85)';
  }
  (document.body || document.documentElement).appendChild(el);
  setTimeout(() => {
    try {
      el.remove();
    } catch {
      /* ignore */
    }
  }, duration_ms);
}

/** @type {Set<string>} */
const shown_toast_keys = new Set();

/**
 * Show a toast only once per browser session. Session storage survives page
 * reloads in the same tab but never becomes server-side workflow authority.
 *
 * @param {string} key
 * @param {string} text
 * @param {'info'|'success'|'warning'|'error'} [variant]
 * @param {number} [duration_ms]
 * @returns {boolean} Whether this call rendered a toast.
 */
export function showToastOnce(key, text, variant = 'info', duration_ms = 2800) {
  if (typeof key !== 'string' || key.length === 0) {
    return false;
  }
  const storage_key = `beads-ui.toast.${key}`;
  if (shown_toast_keys.has(storage_key)) {
    return false;
  }
  try {
    if (window.sessionStorage.getItem(storage_key) === '1') {
      shown_toast_keys.add(storage_key);
      return false;
    }
    window.sessionStorage.setItem(storage_key, '1');
  } catch {
    // Storage can be blocked by browser policy. The module-local set still
    // provides one delivery for this JavaScript session.
  }
  shown_toast_keys.add(storage_key);
  showToast(text, variant, duration_ms);
  return true;
}
