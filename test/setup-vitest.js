/* global console */
// Suppress Lit dev-mode warning in Vitest
// Provided snippet: overrides console.warn but forwards all other messages
const { warn } = console;
console.warn = /** @type {function(...*): void} */ (
  (...args) => {
    // Filter out the noisy Lit dev-mode banner in tests
    if (!args[0].startsWith('Lit is in dev mode.')) {
      warn.call(console, ...args);
    }
  }
);

// Node 26 exposes a configurable `globalThis.localStorage` placeholder whose
// value is undefined unless `--localstorage-file` is supplied. Vitest sees the
// existing key and skips jsdom's implementation, so install the browser-sized
// fallback the tests expect instead of requiring a host-specific NODE_OPTIONS.
const local_storage_descriptor = Object.getOwnPropertyDescriptor(
  globalThis,
  'localStorage'
);
if (
  local_storage_descriptor?.enumerable === false &&
  typeof local_storage_descriptor.get === 'function'
) {
  /** @type {Map<string, string>} */
  const values = new Map();
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      get length() {
        return values.size;
      },
      clear() {
        values.clear();
      },
      /** @param {string} key */
      getItem(key) {
        return values.get(String(key)) ?? null;
      },
      /** @param {number} index */
      key(index) {
        return Array.from(values.keys())[index] ?? null;
      },
      /** @param {string} key */
      removeItem(key) {
        values.delete(String(key));
      },
      /**
       * @param {string} key
       * @param {string} value
       */
      setItem(key, value) {
        values.set(String(key), String(value));
      }
    }
  });
}
