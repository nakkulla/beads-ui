export const DISCARD_TERMINAL_PHASES = Object.freeze(['done', 'abandoned']);

/**
 * Report whether a normalized discard operation still owns active work.
 *
 * @param {{ phase?: unknown }|null|undefined} operation
 */
export function discardOperationActive(operation) {
  if (!operation || typeof operation !== 'object' || Array.isArray(operation)) {
    return false;
  }
  return (
    typeof operation.phase === 'string' &&
    !DISCARD_TERMINAL_PHASES.includes(operation.phase)
  );
}
