/**
 * Process-local workspace activity signal. The payload is deliberately only a
 * resolved root: receivers own the in-memory evidence that decides whether the
 * activity can release one of their waiting beads.
 */
import { debug } from '../logging.js';

const log = debug('worker:workspace-activity');

/** @type {Set<(root: string) => void>} */
const LISTENERS = new Set();

/**
 * Publish activity for one resolved workspace root.
 *
 * @param {string} root
 */
export function publishWorkspaceActivity(root) {
  for (const listener of LISTENERS) {
    try {
      listener(root);
    } catch (err) {
      log('workspace activity listener failed for %s: %o', root, err);
    }
  }
}

/**
 * Register one workspace activity listener.
 *
 * @param {(root: string) => void} listener
 * @returns {() => void} Unsubscribe callback.
 */
export function onWorkspaceActivity(listener) {
  LISTENERS.add(listener);
  return () => {
    LISTENERS.delete(listener);
  };
}

/** Reset process-local listeners for isolated tests. */
export function __resetWorkspaceActivityForTest() {
  LISTENERS.clear();
}
