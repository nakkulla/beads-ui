import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  TIMING_FIELDS,
  __resetTimingSettingsForTest,
  __setTimingOverridesForTest,
  createTimingSettingsStore,
  getTimingSettings,
  onTimingSettingsChanged
} from './timing-settings.js';

/** @type {string} */
let tmp_dir;
/** @type {string} */
let file;
/** @type {string[]} */
let warnings;

/**
 * @param {number} [list_poll]
 * @returns {ReturnType<typeof createTimingSettingsStore>}
 */
function makeStore(list_poll = 30) {
  return createTimingSettingsStore({
    filePath: () => file,
    warn: (message) => warnings.push(message),
    listPollDefault: () => list_poll
  });
}

/**
 * @param {unknown} content
 */
function writeFile(content) {
  fs.writeFileSync(
    file,
    typeof content === 'string' ? content : JSON.stringify(content)
  );
}

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-timing-'));
  file = path.join(tmp_dir, 'timing-settings.json');
  warnings = [];
});

afterEach(() => {
  fs.rmSync(tmp_dir, { recursive: true, force: true });
  __resetTimingSettingsForTest();
});

describe('timing settings table', () => {
  test('lists the fifteen keys with ladder rung counts', () => {
    expect(Object.keys(TIMING_FIELDS)).toHaveLength(15);
    expect(TIMING_FIELDS.env_retry_delays_seconds.rungs).toBe(3);
    expect(TIMING_FIELDS.completion_retry_delays_seconds.rungs).toBe(3);
    expect(TIMING_FIELDS.auto_resume_retry_delays_seconds.rungs).toBe(4);
    expect(TIMING_FIELDS.provider_outage_backoff_seconds.rungs).toBe(6);
  });

  test('gives only the list poll key an off value', () => {
    const with_off = Object.entries(TIMING_FIELDS)
      .filter(([, field]) => field.off_value !== undefined)
      .map(([key]) => key);

    expect(with_off).toEqual(['list_poll_interval_seconds']);
  });
});

describe('timing settings reads', () => {
  test('reads every default when the file is absent', () => {
    const store = makeStore();

    const snapshot = store.snapshot();

    expect(snapshot.revision).toBe(0);
    expect(snapshot.overrides).toEqual({});
    expect(snapshot.values).toMatchObject({
      queue_grace_seconds: 20,
      external_wait_slurm_interval_seconds: 120,
      external_wait_process_interval_seconds: 30,
      env_retry_delays_seconds: [120, 300, 900],
      base_moved_retry_seconds: 120,
      completion_retry_delays_seconds: [60, 300, 900],
      auto_resume_retry_delays_seconds: [300, 900, 1800, 3600],
      provider_outage_backoff_seconds: [60, 120, 240, 480, 900, 3600],
      provider_usage_unknown_reset_seconds: 900,
      provider_usage_reset_grace_seconds: 60,
      pr_poll_interval_seconds: 45,
      list_poll_interval_seconds: 30,
      merge_resolution_wait_seconds: 1800,
      merge_unconfirmed_poll_seconds: 60,
      merge_unconfirmed_wait_seconds: 1800
    });
    expect(warnings).toEqual([]);
  });

  test('takes the list poll default from the config source', () => {
    const store = makeStore(0);

    const snapshot = store.snapshot();

    expect(snapshot.values.list_poll_interval_seconds).toBe(0);
    expect(snapshot.fields.list_poll_interval_seconds).toMatchObject({
      default: 0,
      off_value: 0
    });
  });

  test('reads defaults and warns once for a corrupt file', () => {
    writeFile('{not json');
    const store = makeStore();

    const snapshot = store.snapshot();

    expect(snapshot.revision).toBe(0);
    expect(snapshot.values.queue_grace_seconds).toBe(20);
    expect(warnings).toHaveLength(1);
  });

  test('keeps good keys and defaults only the bad key', () => {
    writeFile({
      revision: 4,
      overrides: {
        queue_grace_seconds: 45,
        pr_poll_interval_seconds: 3,
        env_retry_delays_seconds: [300, 120, 900],
        unknown_key: 5
      }
    });
    const store = makeStore();

    const snapshot = store.snapshot();

    expect(snapshot.revision).toBe(4);
    expect(snapshot.overrides).toEqual({ queue_grace_seconds: 45 });
    expect(snapshot.values.pr_poll_interval_seconds).toBe(45);
    expect(snapshot.values.env_retry_delays_seconds).toEqual([120, 300, 900]);
    expect(warnings).toHaveLength(3);
  });

  test('carries the off value only on the field that has one', () => {
    const store = makeStore();

    const { fields } = store.snapshot();

    expect(fields.list_poll_interval_seconds.off_value).toBe(0);
    expect('off_value' in fields.queue_grace_seconds).toBe(false);
    expect(fields.env_retry_delays_seconds).toMatchObject({
      default: [120, 300, 900],
      min: 60,
      max: 21600,
      rungs: 3,
      unit: 'minutes'
    });
  });
});

describe('timing settings writes', () => {
  test('stores only the changed key and bumps the revision', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      values: { queue_grace_seconds: 45 }
    });

    expect(result.ok).toBe(true);
    expect(result.snapshot.revision).toBe(1);
    expect(JSON.parse(fs.readFileSync(file, 'utf8'))).toEqual({
      revision: 1,
      overrides: { queue_grace_seconds: 45 }
    });
  });

  test('rejects a stale revision with conflict and leaves the file', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 3,
      values: { queue_grace_seconds: 45 }
    });

    expect(result).toMatchObject({ ok: false, code: 'conflict' });
    expect(fs.existsSync(file)).toBe(false);
  });

  test.each([
    ['below the range', { queue_grace_seconds: -1 }, 'queue_grace_seconds'],
    ['above the range', { queue_grace_seconds: 601 }, 'queue_grace_seconds'],
    ['fractional', { queue_grace_seconds: 1.5 }, 'queue_grace_seconds'],
    ['not a number', { queue_grace_seconds: '45' }, 'queue_grace_seconds'],
    [
      'not a minute multiple',
      { base_moved_retry_seconds: 150 },
      'base_moved_retry_seconds'
    ],
    [
      'a ladder with the wrong rung count',
      { env_retry_delays_seconds: [60, 120] },
      'env_retry_delays_seconds'
    ],
    [
      'a shrinking ladder',
      { auto_resume_retry_delays_seconds: [900, 300, 1800, 3600] },
      'auto_resume_retry_delays_seconds'
    ],
    [
      'a ladder rung out of range',
      { provider_outage_backoff_seconds: [60, 120, 240, 480, 900, 30000] },
      'provider_outage_backoff_seconds'
    ],
    ['an unknown key', { nope_seconds: 5 }, 'nope_seconds']
  ])('rejects %s and writes nothing', (_name, values, key) => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      values: { pr_poll_interval_seconds: 60, ...values }
    });

    expect(result).toMatchObject({
      ok: false,
      code: 'invalid_value',
      key
    });
    expect(fs.existsSync(file)).toBe(false);
    expect(store.snapshot().revision).toBe(0);
    expect(store.snapshot().values.pr_poll_interval_seconds).toBe(45);
  });

  test('rejects a non-object values payload', () => {
    const store = makeStore();

    const result = store.set({ expected_revision: 0, values: [1] });

    expect(result).toMatchObject({ ok: false, code: 'invalid_value' });
  });

  test('accepts the off value 0 for the list poll', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      values: { list_poll_interval_seconds: 0 }
    });

    expect(result.ok).toBe(true);
    expect(result.snapshot.values.list_poll_interval_seconds).toBe(0);
  });

  test.each([1, 4])(
    'rejects list poll value %i between off and the minimum',
    (seconds) => {
      const store = makeStore();

      const result = store.set({
        expected_revision: 0,
        values: { list_poll_interval_seconds: seconds }
      });

      expect(result).toMatchObject({
        ok: false,
        code: 'invalid_value',
        key: 'list_poll_interval_seconds'
      });
    }
  );

  test('accepts a flat ladder with equal rungs', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      values: { env_retry_delays_seconds: [300, 300, 300] }
    });

    expect(result.ok).toBe(true);
    expect(result.snapshot.values.env_retry_delays_seconds).toEqual([
      300, 300, 300
    ]);
  });

  test('clears an override with null and drops the key from the file', () => {
    const store = makeStore();
    store.set({
      expected_revision: 0,
      values: { queue_grace_seconds: 45, pr_poll_interval_seconds: 60 }
    });

    const result = store.set({
      expected_revision: 1,
      values: { queue_grace_seconds: null }
    });

    expect(result.ok).toBe(true);
    expect(result.snapshot.values.queue_grace_seconds).toBe(20);
    expect(JSON.parse(fs.readFileSync(file, 'utf8')).overrides).toEqual({
      pr_poll_interval_seconds: 60
    });
  });

  test('reloads a written file from disk', () => {
    makeStore().set({
      expected_revision: 0,
      values: { merge_resolution_wait_seconds: 3600 }
    });

    const snapshot = makeStore().snapshot();

    expect(snapshot.revision).toBe(1);
    expect(snapshot.values.merge_resolution_wait_seconds).toBe(3600);
  });
});

describe('timing settings change notification', () => {
  test('notifies listeners with the new and previous values', () => {
    const store = makeStore();
    /** @type {Array<[number | number[], number | number[]]>} */
    const calls = [];
    store.onChange((snapshot, previous) => {
      calls.push([
        snapshot.values.queue_grace_seconds,
        previous.queue_grace_seconds
      ]);
    });

    store.set({ expected_revision: 0, values: { queue_grace_seconds: 45 } });

    expect(calls).toEqual([[45, 20]]);
  });

  test('stays silent for a rejected write', () => {
    const store = makeStore();
    let count = 0;
    store.onChange(() => {
      count += 1;
    });

    store.set({ expected_revision: 0, values: { queue_grace_seconds: -5 } });

    expect(count).toBe(0);
  });

  test('stops notifying after unsubscribe', () => {
    const store = makeStore();
    let count = 0;
    const off = store.onChange(() => {
      count += 1;
    });
    off();

    store.set({ expected_revision: 0, values: { queue_grace_seconds: 45 } });

    expect(count).toBe(0);
  });
});

describe('timing settings accessor', () => {
  /** @type {string | undefined} */
  let saved_xdg;

  beforeEach(() => {
    saved_xdg = process.env.XDG_STATE_HOME;
    process.env.XDG_STATE_HOME = tmp_dir;
  });

  afterEach(() => {
    if (saved_xdg === undefined) {
      delete process.env.XDG_STATE_HOME;
    } else {
      process.env.XDG_STATE_HOME = saved_xdg;
    }
  });

  test('serves defaults after the test reset', () => {
    __resetTimingSettingsForTest();

    const values = getTimingSettings();

    expect(values.queue_grace_seconds).toBe(20);
  });

  test('serves an in-memory override and notifies subscribers', () => {
    __resetTimingSettingsForTest();
    /** @type {number | number[] | undefined} */
    let seen;
    onTimingSettingsChanged((snapshot) => {
      seen = snapshot.values.queue_grace_seconds;
    });

    __setTimingOverridesForTest({ queue_grace_seconds: 90 });

    expect(getTimingSettings().queue_grace_seconds).toBe(90);
    expect(seen).toBe(90);
  });
});
