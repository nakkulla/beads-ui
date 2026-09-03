import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { TIMELINE_KINDS, createBeadTimeline } from './bead-timeline.js';
import { beadTimelinePath } from './state-paths.js';

const WS = '/tmp/example-workspace/project-a';
const BEAD = 'UI-8wpb';

/** @type {string} */
let tmp_state;

/**
 * @param {Partial<import('./bead-timeline.js').TimelineAppendInput>} [overrides]
 * @returns {import('./bead-timeline.js').TimelineAppendInput}
 */
function dispatchEvent(overrides = {}) {
  return {
    bead_id: BEAD,
    attempt_id: 'UI-8wpb-1',
    kind: 'dispatched',
    seq: 1,
    summary: 'claude opus/high 디스패치 · base a1b2c3d',
    ...overrides
  };
}

/**
 * @returns {string[]} Raw non-empty lines of the bead's timeline file.
 */
function rawLines() {
  return fs
    .readFileSync(beadTimelinePath(WS, BEAD), 'utf8')
    .split('\n')
    .filter((line) => line.length > 0);
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-timeline-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

describe('bead-timeline append', () => {
  test('composes event_id from kind, attempt and caller sequence', () => {
    const timeline = createBeadTimeline({ workspace_root: WS });

    const result = timeline.append(dispatchEvent());

    expect(result).toMatchObject({
      ok: true,
      event: { event_id: 'dispatched:UI-8wpb-1:1' }
    });
  });

  test('falls back to the bead id when the fact has no attempt', () => {
    const timeline = createBeadTimeline({ workspace_root: WS });

    const result = timeline.append(
      dispatchEvent({ kind: 'user_action', attempt_id: undefined, seq: 'op-7' })
    );

    expect(result).toMatchObject({
      ok: true,
      event: { event_id: `user_action:${BEAD}:op-7` }
    });
  });

  test('writes one line per append under the bead directory', () => {
    const timeline = createBeadTimeline({ workspace_root: WS });

    timeline.append(dispatchEvent());
    timeline.append(dispatchEvent({ seq: 2, kind: 'session_ended' }));

    expect(rawLines()).toHaveLength(2);
  });

  test('rejects a kind outside the event vocabulary', () => {
    const timeline = createBeadTimeline({ workspace_root: WS });

    const result = timeline.append(dispatchEvent({ kind: 'exploded' }));

    expect(result).toMatchObject({ ok: false, reason: 'invalid' });
    expect(fs.existsSync(beadTimelinePath(WS, BEAD))).toBe(false);
  });

  test('rejects an append that cannot compose a stable event_id', () => {
    const timeline = createBeadTimeline({ workspace_root: WS });

    const result = timeline.append(dispatchEvent({ seq: '' }));

    expect(result).toMatchObject({ ok: false, reason: 'invalid' });
  });

  test('reports failure when fsync does not complete', () => {
    const failing_fs = {
      ...fs,
      fsyncSync: () => {
        throw new Error('EIO: fsync failed');
      }
    };
    const timeline = createBeadTimeline({
      workspace_root: WS,
      fs: /** @type {typeof fs} */ (failing_fs)
    });

    const result = timeline.append(dispatchEvent());

    expect(result).toMatchObject({ ok: false, reason: 'write_failed' });
  });

  test('keeps the caller free to retry after a failed fsync', () => {
    const failing_fs = {
      ...fs,
      fsyncSync: () => {
        throw new Error('EIO: fsync failed');
      }
    };
    createBeadTimeline({
      workspace_root: WS,
      fs: /** @type {typeof fs} */ (failing_fs)
    }).append(dispatchEvent());

    const retried = createBeadTimeline({ workspace_root: WS }).append(
      dispatchEvent()
    );

    expect(retried.ok).toBe(true);
    expect(
      createBeadTimeline({ workspace_root: WS }).readTimeline(BEAD)
    ).toHaveLength(1);
  });
});

describe('bead-timeline readTimeline', () => {
  test('returns an empty timeline when the bead has no file yet', () => {
    const timeline = createBeadTimeline({ workspace_root: WS });

    const events = timeline.readTimeline(BEAD);

    expect(events).toEqual([]);
  });

  test('reads back the same fact appended twice as one event', () => {
    const timeline = createBeadTimeline({ workspace_root: WS });

    timeline.append(dispatchEvent({ at: 1000 }));
    timeline.append(dispatchEvent({ at: 2000 }));

    expect(rawLines()).toHaveLength(2);
    expect(timeline.readTimeline(BEAD)).toEqual([
      expect.objectContaining({ event_id: 'dispatched:UI-8wpb-1:1', at: 1000 })
    ]);
  });

  test('ignores a torn final line and still reads the earlier events', () => {
    const timeline = createBeadTimeline({ workspace_root: WS });
    timeline.append(dispatchEvent());
    fs.appendFileSync(
      beadTimelinePath(WS, BEAD),
      '{"event_id":"session_ended:UI-8wpb-1:2","at":170'
    );

    const events = timeline.readTimeline(BEAD);

    expect(events).toHaveLength(1);
    expect(events[0].event_id).toBe('dispatched:UI-8wpb-1:1');
  });

  test('reads the events appended after a torn line', () => {
    const timeline = createBeadTimeline({ workspace_root: WS });
    timeline.append(dispatchEvent());
    fs.appendFileSync(beadTimelinePath(WS, BEAD), '{"event_id":"torn:');

    timeline.append(dispatchEvent({ seq: 3, kind: 'session_ended' }));

    expect(timeline.readTimeline(BEAD).map((event) => event.event_id)).toEqual([
      'dispatched:UI-8wpb-1:1',
      'session_ended:UI-8wpb-1:3'
    ]);
  });

  test('produces no duplicates when a restarted writer replays the same facts', () => {
    const before_restart = createBeadTimeline({ workspace_root: WS });
    before_restart.append(dispatchEvent({ at: 1000 }));
    before_restart.append(
      dispatchEvent({ kind: 'session_ended', seq: 2, at: 2000 })
    );

    const after_restart = createBeadTimeline({ workspace_root: WS });
    after_restart.append(dispatchEvent({ at: 9000 }));
    after_restart.append(
      dispatchEvent({ kind: 'session_ended', seq: 2, at: 9001 })
    );

    expect(after_restart.readTimeline(BEAD)).toEqual([
      expect.objectContaining({ event_id: 'dispatched:UI-8wpb-1:1', at: 1000 }),
      expect.objectContaining({
        event_id: 'session_ended:UI-8wpb-1:2',
        at: 2000
      })
    ]);
  });

  test('returns the most recent events when a limit is given', () => {
    const timeline = createBeadTimeline({ workspace_root: WS });
    for (let seq = 1; seq <= 4; seq += 1) {
      timeline.append(dispatchEvent({ seq }));
    }

    const events = timeline.readTimeline(BEAD, { limit: 2 });

    expect(events.map((event) => event.event_id)).toEqual([
      'dispatched:UI-8wpb-1:3',
      'dispatched:UI-8wpb-1:4'
    ]);
  });

  test('keeps each bead timeline separate', () => {
    const timeline = createBeadTimeline({ workspace_root: WS });
    timeline.append(dispatchEvent());

    timeline.append(
      dispatchEvent({ bead_id: 'UI-5ym8', attempt_id: 'UI-5ym8-1' })
    );

    expect(timeline.readTimeline('UI-5ym8')).toHaveLength(1);
    expect(timeline.readTimeline(BEAD)).toHaveLength(1);
  });

  test('stores the timestamp from the injected clock', () => {
    const timeline = createBeadTimeline({
      workspace_root: WS,
      now: () => 1234
    });

    timeline.append(dispatchEvent({ at: undefined }));

    expect(timeline.readTimeline(BEAD)[0].at).toBe(1234);
  });
});

describe('TIMELINE_KINDS', () => {
  test('carries exactly the fourteen kinds of the event table', () => {
    expect([...TIMELINE_KINDS]).toEqual([
      'dispatched',
      'guard_warning',
      'session_ended',
      'attempt_failed',
      'attempt_retry',
      'queue_hold',
      'queue_resume',
      'provider_hold',
      'provider_recovered',
      'landing_step',
      'merge_step',
      'operation_failed',
      'needs_human',
      'user_action'
    ]);
  });
});
