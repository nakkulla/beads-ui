/**
 * Theme toggle (UI-dbn6 §5.1), lifted out of the old `main.js` inline block
 * with the same storage key and `data-theme` meaning: a saved `dark`/`light`
 * wins, otherwise the OS preference decides.
 */

export const THEME_KEY = 'beads-ui.theme';

/**
 * @param {{ getItem: (key: string) => string|null }|null} storage
 * @param {((query: string) => { matches: boolean })|undefined} matchMedia
 * @returns {'dark'|'light'}
 */
export function initialTheme(storage, matchMedia) {
  let saved = null;
  try {
    saved = storage ? storage.getItem(THEME_KEY) : null;
  } catch {
    saved = null;
  }
  if (saved === 'dark' || saved === 'light') {
    return saved;
  }
  return matchMedia && matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * @param {'dark'|'light'} mode
 * @param {Document} doc
 * @param {{ setItem: (key: string, value: string) => void }|null} [storage]
 */
export function applyTheme(mode, doc, storage = null) {
  doc.documentElement.setAttribute('data-theme', mode);
  if (storage) {
    try {
      storage.setItem(THEME_KEY, mode);
    } catch {
      // storage denial must not break the toggle
    }
  }
}

/**
 * @param {Document} doc
 * @returns {'dark'|'light'}
 */
export function currentTheme(doc) {
  return doc.documentElement.getAttribute('data-theme') === 'light'
    ? 'light'
    : 'dark';
}

/**
 * Flip the theme and persist the choice.
 *
 * @param {Document} doc
 * @param {{ setItem: (key: string, value: string) => void }|null} storage
 * @returns {'dark'|'light'}
 */
export function toggleTheme(doc, storage) {
  const next = currentTheme(doc) === 'dark' ? 'light' : 'dark';
  applyTheme(next, doc, storage);
  return next;
}
