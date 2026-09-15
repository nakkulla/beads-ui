/**
 * Test fixture that folds keyed patch frames back into whole-snapshot frames.
 *
 * Since UI-defk §4.2 the worker and monitor channels send one snapshot per
 * subscriber and patches afterwards. Tests that assert delivered CONTENT — a
 * queue revision, a decorated title, an account row — care about the state the
 * channel conveyed, not the wire form, and the patch envelope itself is covered
 * by `push-patch.test.js` and the channel tests. Wrapping a fake socket's
 * `send` with this normalizer keeps those content assertions reading one
 * `*-snapshot` frame per push, so `sock.sent = []` still means false start.
 *
 * @import { KeyedMap } from '../../app/data/keyed-patch.js'
 */
import {
  applyPatch,
  assembleMonitorPipeline,
  assembleWorkerQueue,
  splitMonitorPipeline,
  splitWorkerQueue
} from '../../app/data/keyed-patch.js';

/**
 * Build a per-socket normalizer. Each socket carries its own baseline because
 * the server tracks `last` per subscriber.
 *
 * @returns {(raw: string) => string} Maps one outgoing frame to its snapshot form.
 */
export function createKeyedFrameNormalizer() {
  /** @type {KeyedMap} */
  let worker_keys = new Map();
  /** @type {KeyedMap} */
  let monitor_keys = new Map();

  /**
   * @param {string} raw
   * @returns {string}
   */
  return function normalizeKeyedFrame(raw) {
    /** @type {any} */
    let frame = null;
    try {
      frame = JSON.parse(raw);
    } catch {
      return raw;
    }
    if (frame?.type === 'worker-queue-snapshot') {
      worker_keys = splitWorkerQueue({
        root_dir: frame.payload.root_dir,
        queue: frame.payload.queue
      });
      return raw;
    }
    if (frame?.type === 'monitor-pipeline-snapshot') {
      monitor_keys = splitMonitorPipeline({
        workspaces: frame.payload.workspaces,
        workspaces_state: frame.payload.workspaces_state
      });
      return raw;
    }
    if (frame?.type === 'worker-queue-patch') {
      worker_keys = applyPatch(worker_keys, {
        set: frame.payload.set,
        unset: frame.payload.unset
      });
      return JSON.stringify({
        ...frame,
        type: 'worker-queue-snapshot',
        payload: {
          type: 'worker-queue-snapshot',
          id: frame.payload.id,
          seq: frame.payload.seq,
          root_dir: frame.payload.root_dir,
          queue: assembleWorkerQueue(worker_keys).queue
        }
      });
    }
    if (frame?.type === 'monitor-pipeline-patch') {
      monitor_keys = applyPatch(monitor_keys, {
        set: frame.payload.set,
        unset: frame.payload.unset
      });
      const body = assembleMonitorPipeline(monitor_keys);
      return JSON.stringify({
        ...frame,
        type: 'monitor-pipeline-snapshot',
        payload: {
          type: 'monitor-pipeline-snapshot',
          id: frame.payload.id,
          seq: frame.payload.seq,
          workspaces: body.workspaces,
          workspaces_state: body.workspaces_state
        }
      });
    }
    return raw;
  };
}
