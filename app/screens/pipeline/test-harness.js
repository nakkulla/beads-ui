/**
 * Shared jsdom harness of the pipeline screen tests (UI-dbn6 Phase 1): the
 * 8-repo fixture of `scripts/ui-fixture-server.mjs` delivered through the
 * keyed-frames normalizer (one keyed patch folded into a snapshot, as the
 * monitor channel conveys it), real stores, and a recording `send`.
 */
import { vi } from 'vitest';
import {
  buildPipelineFixture,
  queueViewOf
} from '../../../scripts/ui-fixture-server.mjs';
import { createKeyedFrameNormalizer } from '../../../server/ws/keyed-frames-fixture.js';
import { splitMonitorPipeline } from '../../data/keyed-patch.js';
import { createMonitorPipelineStore } from '../../model/monitor-pipeline-store.js';
import { createWorkerQueueStore } from '../../model/worker-queue-store.js';
import { createPipelineScreen } from './index.js';

/** The fixture clock: 2026-09-30 03:00 UTC (12:00 in Seoul). */
export const NOW = Date.parse('2026-09-30T03:00:00Z');

/**
 * The monitor snapshot the keyed channel conveys for a fixture: an empty
 * baseline snapshot, then one patch setting every key, folded back by the
 * normalizer the server channel tests use.
 *
 * @param {ReturnType<typeof buildPipelineFixture>} fixture
 * @returns {{ workspaces: Array<Record<string, any>>, workspaces_state: Array<Record<string, any>>, seq: number }}
 */
export function keyedSnapshotOf(fixture) {
  const normalize = createKeyedFrameNormalizer();
  normalize(
    JSON.stringify({
      id: 'evt-1',
      ok: true,
      type: 'monitor-pipeline-snapshot',
      payload: {
        type: 'monitor-pipeline-snapshot',
        id: 'tab:monitor:pipeline',
        seq: 1,
        workspaces: [],
        workspaces_state: []
      }
    })
  );
  const frame = JSON.parse(
    normalize(
      JSON.stringify({
        id: 'evt-2',
        ok: true,
        type: 'monitor-pipeline-patch',
        payload: {
          type: 'monitor-pipeline-patch',
          id: 'tab:monitor:pipeline',
          seq: 2,
          set: Object.fromEntries(splitMonitorPipeline(fixture)),
          unset: []
        }
      })
    )
  );
  return {
    workspaces: frame.payload.workspaces,
    workspaces_state: frame.payload.workspaces_state,
    seq: frame.payload.seq
  };
}

/**
 * @param {{ width?: number, coarse?: boolean }} [options]
 * @returns {(query: string) => { matches: boolean, addEventListener: () => void, removeEventListener: () => void }}
 */
export function fakeMatchMedia(options = {}) {
  const width = options.width ?? 1280;
  return (query) => {
    const min = /min-width:\s*(\d+)px/.exec(query);
    const matches = min
      ? width >= Number(min[1])
      : /pointer:\s*coarse/.test(query)
        ? options.coarse === true
        : false;
    return {
      matches,
      addEventListener: () => {},
      removeEventListener: () => {}
    };
  };
}

/** @returns {Storage} */
function memoryStorage() {
  /** @type {Map<string, string>} */
  const values = new Map();
  return /** @type {any} */ ({
    getItem: (/** @type {string} */ key) => values.get(key) ?? null,
    setItem: (/** @type {string} */ key, /** @type {string} */ value) =>
      values.set(key, String(value)),
    removeItem: (/** @type {string} */ key) => values.delete(key),
    clear: () => values.clear()
  });
}

/**
 * @typedef {Object} MountOptions
 * @property {string} [scope] - `*` (default) or a fixture root_dir.
 * @property {number} [width]
 * @property {boolean} [coarse]
 * @property {number} [now] - Screen clock (defaults to Date.now()).
 * @property {number} [fixture_now] - Fixture clock (defaults to NOW).
 * @property {(message: string) => boolean} [confirm]
 * @property {(type: string, payload: any) => any} [reply]
 * @property {any} [buildLanes]
 * @property {(x: number, y: number) => Element|null} [hitTest]
 * @property {(fixture: ReturnType<typeof buildPipelineFixture>) => void} [edit]
 * @property {any} [presetStore] - The impl-presets store (preset names).
 */

/**
 * Mount the pipeline screen over the fixture.
 *
 * @param {MountOptions} [options]
 */
export function mountPipeline(options = {}) {
  const fixture = buildPipelineFixture({ now: options.fixture_now ?? NOW });
  options.edit?.(fixture);
  const snapshot = keyedSnapshotOf(fixture);
  const monitor = createMonitorPipelineStore();
  monitor.set(snapshot.workspaces, snapshot.workspaces_state, snapshot.seq);
  const queue = createWorkerQueueStore();
  const scope = options.scope ?? '*';
  const connected = scope === '*' ? fixture.workspaces[0].root_dir : scope;
  const row = fixture.workspaces.find((entry) => entry.root_dir === connected);
  const state = fixture.workspaces_state.find(
    (entry) => entry.root_dir === connected
  );
  if (scope !== '*' && row && state) {
    queue.setSnapshot({
      root_dir: connected,
      queue: queueViewOf(row, state),
      seq: 1
    });
  }
  const send = vi.fn(
    async (/** @type {string} */ type, /** @type {any} */ payload) => {
      const custom = options.reply?.(type, payload);
      if (custom !== undefined) {
        return custom;
      }
      if (type.startsWith('worker-queue-')) {
        return { applied: true };
      }
      return {};
    }
  );
  const setScope = vi.fn();
  const openIssue = vi.fn();
  const openSettings = vi.fn();
  const openDoc = vi.fn();
  const toast = vi.fn();
  const confirm = vi.fn(options.confirm || (() => true));
  const mount = document.createElement('div');
  document.body.appendChild(mount);
  const screen = createPipelineScreen(mount, {
    monitorStore: monitor,
    queueStore: queue,
    getScope: () => scope,
    setScope,
    getConnected: () => connected,
    send,
    openIssue,
    openSettings,
    openDoc,
    presetStore: options.presetStore,
    confirm,
    toast,
    now:
      options.now === undefined
        ? undefined
        : () => /** @type {number} */ (options.now),
    matchMedia: fakeMatchMedia({
      width: options.width,
      coarse: options.coarse
    }),
    storage: memoryStorage(),
    buildLanes: options.buildLanes,
    hitTest: options.hitTest
  });
  return {
    fixture,
    mount,
    screen,
    send,
    setScope,
    openIssue,
    openSettings,
    openDoc,
    toast,
    confirm,
    monitor,
    queue,
    /** Tear the screen down and detach its mount. */
    destroy() {
      screen.destroy();
      mount.remove();
    }
  };
}

/**
 * Let chained promise callbacks run (microtasks only, so it also works under
 * fake timers).
 *
 * @returns {Promise<void>}
 */
export async function settle() {
  for (let index = 0; index < 50; index++) {
    await Promise.resolve();
  }
}

/**
 * The `send` calls of one type.
 *
 * @param {import('vitest').Mock} send
 * @param {string} type
 * @returns {any[]}
 */
export function payloadsOf(send, type) {
  return send.mock.calls
    .filter((call) => call[0] === type)
    .map((call) => call[1]);
}
