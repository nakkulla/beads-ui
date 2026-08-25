import { describe, expect, test } from 'vitest';
import { pushSnapshotIfChanged } from './context.js';

/**
 * A fake socket recording every frame it was sent.
 */
function fakeWs() {
  /** @type {any[]} */
  const frames = [];
  return {
    frames,
    /** @param {string} raw */
    send(raw) {
      frames.push(JSON.parse(raw));
    }
  };
}

describe('pushSnapshotIfChanged (UI-d509)', () => {
  test('assembles the standard push envelope around the shared body', () => {
    const ws = fakeWs();
    const sub = { ws: /** @type {any} */ (ws), client_id: 'worker:queue' };

    const sent = pushSnapshotIfChanged(
      sub,
      'worker-queue-snapshot',
      JSON.stringify({ root_dir: '/r', queue: { revision: 1 } })
    );

    expect(sent).toBe(true);
    expect(ws.frames).toHaveLength(1);
    expect(ws.frames[0].ok).toBe(true);
    expect(ws.frames[0].id).toMatch(/^evt-\d+$/);
    expect(ws.frames[0].type).toBe('worker-queue-snapshot');
    expect(ws.frames[0].payload).toEqual({
      type: 'worker-queue-snapshot',
      id: 'worker:queue',
      root_dir: '/r',
      queue: { revision: 1 }
    });
  });

  test('skips a body identical to the last one sent', () => {
    const ws = fakeWs();
    const sub = { ws: /** @type {any} */ (ws), client_id: 'm1' };
    const body = JSON.stringify({ workspaces: [] });
    pushSnapshotIfChanged(sub, 'monitor-pipeline-snapshot', body);

    const sent = pushSnapshotIfChanged(sub, 'monitor-pipeline-snapshot', body);

    expect(sent).toBe(false);
    expect(ws.frames).toHaveLength(1);
  });

  test('sends again once the body changes', () => {
    const ws = fakeWs();
    const sub = { ws: /** @type {any} */ (ws), client_id: 'm1' };
    pushSnapshotIfChanged(sub, 'monitor-pipeline-snapshot', '{"a":1}');

    pushSnapshotIfChanged(sub, 'monitor-pipeline-snapshot', '{"a":2}');

    expect(ws.frames.map((f) => f.payload.a)).toEqual([1, 2]);
  });

  test('retries on the next push when the send threw', () => {
    let fail = true;
    /** @type {any[]} */
    const frames = [];
    const ws = {
      /** @param {string} raw */
      send(raw) {
        if (fail) {
          throw new Error('socket closed');
        }
        frames.push(JSON.parse(raw));
      }
    };
    const sub = { ws: /** @type {any} */ (ws), client_id: 'm1' };

    const first = pushSnapshotIfChanged(
      sub,
      'monitor-pipeline-snapshot',
      '{"a":1}'
    );
    fail = false;
    const second = pushSnapshotIfChanged(
      sub,
      'monitor-pipeline-snapshot',
      '{"a":1}'
    );

    expect(first).toBe(false);
    expect(second).toBe(true);
    expect(frames).toHaveLength(1);
  });
});
