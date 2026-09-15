/**
 * Share the queue remove mutation and its notifications across HTTP and WS.
 */
import { debug } from '../logging.js';
import { fanout } from '../ws/worker-handlers.js';
import { tickWorkerQueue } from './attach.js';
import { getWorkerRuntime } from './runtime.js';

const log = debug('worker:queue-remove');

/**
 * @returns {ReturnType<typeof import('./queue-store.js').createQueueStore>}
 */
function queueStore() {
  return getWorkerRuntime().queueStore;
}

/**
 * @param {string} workspace_key
 * @param {{ bead_id: string, expected_revision: number }} input
 * @returns {import('./queue-store.js').QueueOpResult}
 */
export function removeBeadFromQueue(workspace_key, input) {
  const result = queueStore().remove(workspace_key, input);
  if (result.ok) {
    fanout(workspace_key, result.queue);
    Promise.resolve(tickWorkerQueue(workspace_key)).catch((err) => {
      log('worker tick after remove failed for %s: %o', workspace_key, err);
    });
  }
  return result;
}
