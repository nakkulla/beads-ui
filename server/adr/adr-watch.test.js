import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createAdrWatch } from './adr-watch.js';

/**
 * @import { AdrPlan } from './adr-signals.js'
 * @import { AdrWatch } from './adr-watch.js'
 */

const POLL_MS = 5000;

/** @type {string} */
let root_dir;
/** @type {AdrPlan[]} */
let plans;
/** @type {(() => void)[]} */
let watch_listeners;
/** @type {number} */
let closed_watchers;
/** @type {boolean} */
let watch_throws;
/** @type {AdrWatch | null} */
let watch_instance = null;
/** @type {(plan: AdrPlan) => Promise<unknown>} */
let onChangeImpl;

/**
 * @param {string} _target
 * @param {unknown} _opts
 * @param {() => void} listener
 */
function fakeWatchImpl(_target, _opts, listener) {
  if (watch_throws) {
    throw new Error('EMFILE: too many open files');
  }
  watch_listeners.push(listener);
  return {
    close() {
      closed_watchers += 1;
    }
  };
}

/** @type {typeof fs.watch} */
const fakeWatch = /** @type {any} */ (fakeWatchImpl);

/**
 * @param {string} rel
 * @param {string} text
 */
function writeFile(rel, text) {
  const abs = path.join(root_dir, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, text);
}

/**
 * @param {Object} [options]
 * @param {number} [options.debounce_ms]
 */
function startWatch(options = {}) {
  watch_instance = createAdrWatch({
    root_dir,
    onChange: (plan) => onChangeImpl(plan),
    poll_interval_ms: POLL_MS,
    debounce_ms: options.debounce_ms,
    watch: fakeWatch
  });
  return watch_instance;
}

/** Fire every registered fs.watch listener once. */
function emit() {
  for (const listener of watch_listeners) {
    listener();
  }
}

beforeEach(() => {
  root_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'adr-watch-'));
  writeFile('docs/adr/0012-a.md', 'a\n');
  writeFile('docs/adr/README.md', 'index\n');
  writeFile('AGENTS.md', 'agents\n');
  writeFile('CLAUDE.md', 'claude\n');
  writeFile('docs/agents/policy.md', 'policy\n');
  writeFile('docs/superpowers/specs/a-design.md', 'a\n');
  plans = [];
  watch_listeners = [];
  closed_watchers = 0;
  watch_throws = false;
  watch_instance = null;
  onChangeImpl = async (plan) => {
    plans.push(plan);
  };
  vi.useFakeTimers();
});

afterEach(() => {
  watch_instance?.close();
  vi.useRealTimers();
  fs.rmSync(root_dir, { recursive: true, force: true });
});

describe('fingerprint comparison', () => {
  test('emits no plan when the fingerprint is unchanged', async () => {
    startWatch();

    emit();
    await vi.advanceTimersByTimeAsync(600);

    expect(plans).toEqual([]);
  });

  test('emits a spec-only plan when only specs changed', async () => {
    startWatch();

    writeFile('docs/superpowers/specs/a-design.md', 'aa\n');
    writeFile('docs/superpowers/specs/b-design.md', 'bb\n');
    emit();
    await vi.advanceTimersByTimeAsync(600);

    expect(plans).toEqual([
      {
        full: false,
        specs: [
          'docs/superpowers/specs/a-design.md',
          'docs/superpowers/specs/b-design.md'
        ]
      }
    ]);
  });

  test('reports a deleted spec in the partial plan', async () => {
    startWatch();

    fs.rmSync(path.join(root_dir, 'docs/superpowers/specs/a-design.md'));
    emit();
    await vi.advanceTimersByTimeAsync(600);

    expect(plans).toEqual([
      { full: false, specs: ['docs/superpowers/specs/a-design.md'] }
    ]);
  });

  test('emits a full plan when an ADR file changed', async () => {
    startWatch();

    writeFile('docs/adr/0013-b.md', 'bb\n');
    emit();
    await vi.advanceTimersByTimeAsync(600);

    expect(plans).toEqual([{ full: true }]);
  });

  test('emits a full plan when AGENTS.md changed', async () => {
    startWatch();

    writeFile('AGENTS.md', 'agents changed\n');
    emit();
    await vi.advanceTimersByTimeAsync(600);

    expect(plans).toEqual([{ full: true }]);
  });

  test('emits a full plan when docs/agents changed', async () => {
    startWatch();

    writeFile('docs/agents/policy.md', 'policy changed\n');
    emit();
    await vi.advanceTimersByTimeAsync(600);

    expect(plans).toEqual([{ full: true }]);
  });
});

describe('debounce and in-flight merging', () => {
  test('collapses a burst of events into one plan', async () => {
    startWatch();

    writeFile('docs/superpowers/specs/a-design.md', 'aa\n');
    emit();
    await vi.advanceTimersByTimeAsync(200);
    writeFile('docs/superpowers/specs/b-design.md', 'bb\n');
    emit();
    await vi.advanceTimersByTimeAsync(600);

    expect(plans.length).toEqual(1);
    expect(plans[0]).toEqual({
      full: false,
      specs: [
        'docs/superpowers/specs/a-design.md',
        'docs/superpowers/specs/b-design.md'
      ]
    });
  });

  test('reruns once after an in-flight change and lets full win', async () => {
    /** @type {(() => void) | null} */
    let release = null;
    onChangeImpl = async (plan) => {
      plans.push(plan);
      if (plans.length === 1) {
        await new Promise((resolve) => {
          release = () => resolve(undefined);
        });
      }
    };
    const watch = startWatch();

    writeFile('docs/superpowers/specs/a-design.md', 'aa\n');
    emit();
    await vi.advanceTimersByTimeAsync(600);
    writeFile('docs/superpowers/specs/b-design.md', 'bb\n');
    void watch.refresh();
    writeFile('docs/adr/0013-b.md', 'bb\n');
    await watch.refresh();
    /** @type {any} */ (release)();
    await vi.advanceTimersByTimeAsync(0);

    expect(plans).toEqual([
      { full: false, specs: ['docs/superpowers/specs/a-design.md'] },
      { full: true }
    ]);
  });
});

describe('poll safety net', () => {
  test('catches a change the watcher missed', async () => {
    startWatch();

    writeFile('docs/adr/0013-b.md', 'bb\n');
    await vi.advanceTimersByTimeAsync(POLL_MS);

    expect(plans).toEqual([{ full: true }]);
  });

  test('stays quiet on an unchanged fingerprint', async () => {
    startWatch();

    await vi.advanceTimersByTimeAsync(POLL_MS * 3);

    expect(plans).toEqual([]);
  });

  test('recomputes once on the next poll while a retry is pending', async () => {
    const watch = startWatch();

    watch.setRetryPending(true);
    await vi.advanceTimersByTimeAsync(POLL_MS);
    await vi.advanceTimersByTimeAsync(POLL_MS);

    expect(plans).toEqual([{ full: true }]);
  });

  test('keeps retrying while the retry stays armed', async () => {
    const watch = startWatch();

    watch.setRetryPending(true);
    await vi.advanceTimersByTimeAsync(POLL_MS);
    watch.setRetryPending(true);
    await vi.advanceTimersByTimeAsync(POLL_MS);

    expect(plans).toEqual([{ full: true }, { full: true }]);
  });

  test('works with poll only when fs.watch fails', async () => {
    watch_throws = true;
    startWatch();

    expect(watch_listeners).toEqual([]);
    writeFile('docs/adr/0013-b.md', 'bb\n');
    await vi.advanceTimersByTimeAsync(POLL_MS);

    expect(plans).toEqual([{ full: true }]);
  });
});

describe('close', () => {
  test('clears watchers and stops the poll timer', async () => {
    const watch = startWatch();
    const watcher_count = watch_listeners.length;

    watch.close();
    writeFile('docs/adr/0013-b.md', 'bb\n');
    await vi.advanceTimersByTimeAsync(POLL_MS * 2);

    expect(watcher_count).toBeGreaterThan(0);
    expect(closed_watchers).toEqual(watcher_count);
    expect(plans).toEqual([]);
    expect(vi.getTimerCount()).toEqual(0);
  });
});

describe('trigger', () => {
  test('dispatches a plan through the in-flight merge', async () => {
    const root_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'adr-watch-'));
    /** @type {AdrPlan[]} */
    const plans = [];
    /** @type {Array<() => void>} */
    const releases = [];
    const watch = createAdrWatch({
      root_dir,
      onChange: (plan) => {
        plans.push(plan);
        return new Promise((resolve) => {
          releases.push(() => resolve(undefined));
        });
      },
      poll_interval_ms: 60000
    });

    const first = watch.trigger({ full: false, specs: ['a'] });
    const second = watch.trigger({ full: true });
    await second;
    releases[0]();
    await vi.waitFor(() => expect(releases.length).toBe(2));
    releases[1]();
    await first;

    expect(plans).toEqual([{ full: false, specs: ['a'] }, { full: true }]);
    watch.close();
  });
});
