import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createDisplayPolicyStore } from './display-policy-store.js';

/** @type {string} */
let tmp_dir;

/**
 * @param {string} workspace
 * @returns {string}
 */
function filePathFor(workspace) {
  return path.join(tmp_dir, path.basename(workspace), 'display-policy.json');
}

/**
 * @returns {ReturnType<typeof createDisplayPolicyStore>}
 */
function createStore() {
  return createDisplayPolicyStore({ filePathFor });
}

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-dps-'));
});

afterEach(() => {
  fs.rmSync(tmp_dir, { recursive: true, force: true });
});

describe('display-policy-store defaults', () => {
  test('seeds the retired mirror labels as hidden when no file exists', () => {
    const store = createStore();

    const policy = store.snapshot('/ws/a');

    expect(policy.revision).toBe(0);
    expect(policy.hidden_labels).toEqual(['has:spec', 'pr']);
    expect(policy.hidden_prefixes).toEqual(['reviewed:', 'skipped:']);
    expect(policy.visible_labels).toEqual([]);
  });

  test('enables every chip toggle by default', () => {
    const store = createStore();

    const policy = store.snapshot('/ws/a');

    expect(policy.chips).toEqual({
      route: true,
      fast_track: true,
      pr: true,
      from: true,
      blocked: true,
      stepper: true
    });
  });

  test('keeps workspaces independent', () => {
    const store = createStore();

    store.setPolicy('/ws/a', {
      expected_revision: 0,
      policy: { hidden_labels: ['only-a'] }
    });

    expect(store.snapshot('/ws/b').hidden_labels).toEqual(['has:spec', 'pr']);
  });

  test('returns snapshot copies that cannot mutate the cache', () => {
    const store = createStore();

    store.snapshot('/ws/a').hidden_labels.push('injected');

    expect(store.snapshot('/ws/a').hidden_labels).toEqual(['has:spec', 'pr']);
  });
});

describe('display-policy-store persistence', () => {
  test('round-trips a written policy through a cold store', () => {
    const store = createStore();

    store.setPolicy('/ws/a', {
      expected_revision: 0,
      policy: { hidden_labels: ['wip'], chips: { stepper: false } }
    });

    const cold = createStore();
    const policy = cold.load('/ws/a');
    expect(policy.revision).toBe(1);
    expect(policy.hidden_labels).toEqual(['wip']);
    expect(policy.chips.stepper).toBe(false);
  });

  test('falls back to the default seed on an unreadable file', () => {
    fs.mkdirSync(path.dirname(filePathFor('/ws/a')), { recursive: true });
    fs.writeFileSync(filePathFor('/ws/a'), 'not json at all');

    const policy = createStore().load('/ws/a');

    expect(policy.hidden_labels).toEqual(['has:spec', 'pr']);
    expect(policy.revision).toBe(0);
  });

  test('normalizes a hand-edited file so visible wins over exact hidden', () => {
    fs.mkdirSync(path.dirname(filePathFor('/ws/a')), { recursive: true });
    fs.writeFileSync(
      filePathFor('/ws/a'),
      JSON.stringify({
        revision: 3,
        hidden_labels: ['pr', 'wip'],
        visible_labels: ['wip']
      })
    );

    const policy = createStore().load('/ws/a');

    expect(policy.hidden_labels).toEqual(['pr']);
    expect(policy.visible_labels).toEqual(['wip']);
  });
});

describe('display-policy-store CAS', () => {
  test('bumps the revision on an applied mutation', () => {
    const store = createStore();

    const result = store.setPolicy('/ws/a', {
      expected_revision: 0,
      policy: { hidden_labels: ['wip'] }
    });

    expect(result.ok).toBe(true);
    expect(result.conflict).toBe(false);
    expect(result.revision).toBe(1);
    expect(result.policy.hidden_labels).toEqual(['wip']);
  });

  test('rejects a stale revision as a conflict carrying the current policy', () => {
    const store = createStore();
    store.setPolicy('/ws/a', {
      expected_revision: 0,
      policy: { hidden_labels: ['first'] }
    });

    const result = store.setPolicy('/ws/a', {
      expected_revision: 0,
      policy: { hidden_labels: ['second'] }
    });

    expect(result.ok).toBe(false);
    expect(result.conflict).toBe(true);
    expect(result.revision).toBe(1);
    expect(result.policy.hidden_labels).toEqual(['first']);
  });

  test('leaves the persisted file untouched on a conflict', () => {
    const store = createStore();
    store.setPolicy('/ws/a', {
      expected_revision: 0,
      policy: { hidden_labels: ['first'] }
    });
    const before = fs.readFileSync(filePathFor('/ws/a'), 'utf8');

    store.setPolicy('/ws/a', {
      expected_revision: 0,
      policy: { hidden_labels: ['second'] }
    });

    expect(fs.readFileSync(filePathFor('/ws/a'), 'utf8')).toBe(before);
  });

  test('rejects an invalid patch without bumping the revision', () => {
    const store = createStore();

    const result = store.setPolicy('/ws/a', {
      expected_revision: 0,
      policy: /** @type {any} */ ({ hidden_labels: 'not-an-array' })
    });

    expect(result.ok).toBe(false);
    expect(result.conflict).toBe(false);
    expect(result.revision).toBe(0);
    expect(store.snapshot('/ws/a').hidden_labels).toEqual(['has:spec', 'pr']);
  });
});

describe('display-policy-store mutation semantics', () => {
  test('replaces a list key wholesale', () => {
    const store = createStore();

    const result = store.setPolicy('/ws/a', {
      expected_revision: 0,
      policy: { hidden_prefixes: ['area:'] }
    });

    expect(result.policy.hidden_prefixes).toEqual(['area:']);
  });

  test('leaves absent list keys unchanged', () => {
    const store = createStore();

    const result = store.setPolicy('/ws/a', {
      expected_revision: 0,
      policy: { hidden_prefixes: ['area:'] }
    });

    expect(result.policy.hidden_labels).toEqual(['has:spec', 'pr']);
  });

  test('accepts an explicitly empty list as a clear', () => {
    const store = createStore();

    const result = store.setPolicy('/ws/a', {
      expected_revision: 0,
      policy: { hidden_labels: [] }
    });

    expect(result.policy.hidden_labels).toEqual([]);
  });

  test('merges chips per key', () => {
    const store = createStore();

    const result = store.setPolicy('/ws/a', {
      expected_revision: 0,
      policy: { chips: { from: false } }
    });

    expect(result.policy.chips.from).toBe(false);
    expect(result.policy.chips.route).toBe(true);
  });

  test('de-duplicates and trims label entries', () => {
    const store = createStore();

    const result = store.setPolicy('/ws/a', {
      expected_revision: 0,
      policy: { hidden_labels: [' wip ', 'wip', ''] }
    });

    expect(result.policy.hidden_labels).toEqual(['wip']);
  });

  test('drops a label from hidden_labels when the same write forces it visible', () => {
    const store = createStore();

    const result = store.setPolicy('/ws/a', {
      expected_revision: 0,
      policy: { hidden_labels: ['pr', 'wip'], visible_labels: ['wip'] }
    });

    expect(result.policy.hidden_labels).toEqual(['pr']);
    expect(result.policy.visible_labels).toEqual(['wip']);
  });

  test('drops an already-hidden label when a later write forces it visible', () => {
    const store = createStore();

    const result = store.setPolicy('/ws/a', {
      expected_revision: 0,
      policy: { visible_labels: ['pr'] }
    });

    expect(result.policy.hidden_labels).toEqual(['has:spec']);
    expect(result.policy.visible_labels).toEqual(['pr']);
  });
});
