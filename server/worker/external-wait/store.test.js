import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { beforeEach, expect, test } from 'vitest';
import { RECORD_STAGES, WAIT_ID_RE } from './contract.js';
import { createExternalWaitStore, makeWaitId } from './store.js';

let workspace = '';
let file = '';
let sequence = 0;
let store = createExternalWaitStore();
const NOW = Date.parse('2026-09-21T00:00:00Z');

/**
 * @param {Partial<import('./store.js').WaitInput>} [overrides]
 * @returns {import('./store.js').WaitInput}
 */
function input(overrides = {}) {
  return {
    root_dir: workspace,
    bead_id: 'UI-test',
    owner: { kind: 'worker', attempt_id: 'attempt-1' },
    worktree: workspace,
    execution_sha: 'a'.repeat(40),
    jobs: [],
    ...overrides
  };
}

beforeEach(() => {
  workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'external-wait-store-'));
  file = path.join(workspace, 'state', 'external-wait.json');
  sequence = 0;
  store = createExternalWaitStore({
    filePathFor: () => file,
    now: () => NOW,
    makeId: () => `w-${(++sequence).toString(16).padStart(12, '0')}`
  });
});

test('generates twelve lowercase hex digits after the wait prefix', () => {
  const ids = Array.from({ length: 10 }, () => makeWaitId());

  expect(ids.every((id) => WAIT_ID_RE.test(id))).toBe(true);
  expect(new Set(ids).size).toBe(10);
});

test('reads missing files as empty without an error', () => {
  const records = store.list(workspace);

  expect(records).toEqual([]);
  expect(store.last_read_error).toBeNull();
});

test.each([
  '{broken',
  '{"schema":2,"records":[]}',
  '{"schema":1,"records":[{}]}'
])('exposes corrupt reads while returning an empty list: %s', (contents) => {
  fs.mkdirSync(path.dirname(file));
  fs.writeFileSync(file, contents);

  const records = store.list(workspace);

  expect(records).toEqual([]);
  expect(store.last_read_error).toBeTruthy();
});

test('persists defaults atomically and reads them after restart', () => {
  const record = store.insert(workspace, input());
  const restarted = createExternalWaitStore({ filePathFor: () => file });

  expect(record.registered_at).toBe(new Date(NOW).toISOString());
  expect(record.budget).toEqual({ turns_total: 3, turns_used: 0 });
  expect(restarted.get(workspace, record.wait_id)).toEqual(record);
  expect(JSON.parse(fs.readFileSync(file, 'utf8'))).toEqual({
    schema: 1,
    records: [record]
  });
  expect(fs.readdirSync(path.dirname(file))).toEqual(['external-wait.json']);
});

test('returns detached copies from writes and reads', () => {
  const record = store.insert(workspace, input());
  record.budget.turns_used = 99;
  const read = store.get(workspace, record.wait_id);
  if (!read) {
    throw new Error('missing fixture');
  }
  read.budget.turns_used = 100;

  expect(store.get(workspace, record.wait_id)?.budget.turns_used).toBe(0);
});

test.each(['hold', 'detached', 'completing'])(
  'rejects a second live wait beside %s',
  (stage) => {
    const record = store.insert(
      workspace,
      input({ stage: /** @type {import('./store.js').Stage} */ (stage) })
    );

    expect(() => store.insert(workspace, input())).toThrow('already exists');
    expect(store.findByBead(workspace, 'UI-test')).toEqual(record);
  }
);

test.each(['done', 'resumed', 'stopped'])(
  'releases bead ownership at %s',
  (stage) => {
    store.insert(
      workspace,
      input({ stage: /** @type {import('./store.js').Stage} */ (stage) })
    );

    expect(store.findByBead(workspace, 'UI-test')).toBeNull();
    expect(store.insert(workspace, input()).stage).toBe('hold');
  }
);

test('validates every permitted and forbidden stage transition', () => {
  const legal = new Set([
    'hold:done',
    'hold:detached',
    'detached:completing',
    'completing:resumed'
  ]);

  for (const from of RECORD_STAGES) {
    for (const to of RECORD_STAGES) {
      const record = store.insert(
        workspace,
        input({
          bead_id: `${from}:${to}`,
          stage: /** @type {import('./store.js').Stage} */ (from)
        })
      );
      const mutate = () =>
        store.update(workspace, record.wait_id, (next) => {
          next.stage = /** @type {import('./store.js').Stage} */ (to);
        });

      if (from === to || to === 'stopped' || legal.has(`${from}:${to}`)) {
        expect(mutate().stage).toBe(to);
      } else {
        expect(mutate).toThrow('Illegal');
        expect(store.get(workspace, record.wait_id)?.stage).toBe(from);
      }
    }
  }
});

test('rejects invalid mutations without changing the persisted record', () => {
  const record = store.insert(workspace, input());
  const before = fs.readFileSync(file, 'utf8');

  expect(() =>
    store.update(workspace, record.wait_id, (next) => {
      next.budget.turns_used = -1;
    })
  ).toThrow('Invalid');
  expect(() =>
    store.update(workspace, record.wait_id, (next) => {
      next.bead_id = 'other';
    })
  ).toThrow('immutable');
  expect(fs.readFileSync(file, 'utf8')).toBe(before);
});

test('removes only the requested wait', () => {
  const first = store.insert(workspace, input());
  const second = store.insert(workspace, input({ bead_id: 'other' }));

  const removed = store.remove(workspace, first.wait_id);

  expect(removed).toBe(true);
  expect(store.list(workspace)).toEqual([second]);
  expect(store.remove(workspace, first.wait_id)).toBe(false);
});
