import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createVisibleWorkspacesStore } from './visible-workspaces-store.js';
import { visibleWorkspacesFilePath } from './worker/state-paths.js';

/** @type {string} */
let tmp_state;
const WS_A = '/tmp/example-workspace/project-a';
const WS_B = '/tmp/example-workspace/project-b';

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-viswks-'));
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

describe('worker/state-paths visible-workspaces', () => {
  test('derives a single global visible-workspaces.json under the bdui state root', () => {
    expect(visibleWorkspacesFilePath()).toBe(
      path.join(tmp_state, 'bdui', 'visible-workspaces.json')
    );
  });
});

describe('visible-workspaces-store', () => {
  test('missing file cold-loads to an empty hidden set', () => {
    const store = createVisibleWorkspacesStore();
    expect(store.listHidden()).toEqual([]);
  });

  test('hiding a workspace persists and round-trips through a fresh store', () => {
    const a = createVisibleWorkspacesStore();
    const r = a.setVisibility(WS_A, false);
    expect(r.changed).toBe(true);
    expect(r.hidden).toEqual([WS_A]);

    // On-disk file exists and is valid JSON (never partial).
    const file = visibleWorkspacesFilePath();
    expect(fs.existsSync(file)).toBe(true);
    expect(fs.existsSync(`${file}.tmp`)).toBe(false);
    expect(JSON.parse(fs.readFileSync(file, 'utf8'))).toEqual({
      hidden: [WS_A]
    });

    // A brand-new store instance cold-loads the same hidden set from disk.
    const b = createVisibleWorkspacesStore();
    expect(b.listHidden()).toEqual([WS_A]);
  });

  test('setVisibility is idempotent — re-hiding is a no-op with no persist', () => {
    const store = createVisibleWorkspacesStore();
    const first = store.setVisibility(WS_A, false);
    expect(first.changed).toBe(true);
    const before = fs.readFileSync(visibleWorkspacesFilePath(), 'utf8');

    const again = store.setVisibility(WS_A, false);
    expect(again.changed).toBe(false);
    expect(again.hidden).toEqual([WS_A]);
    // File untouched byte-for-byte (no re-persist on a no-op).
    expect(fs.readFileSync(visibleWorkspacesFilePath(), 'utf8')).toBe(before);
  });

  test('showing a hidden workspace removes it; showing a visible one is a no-op', () => {
    const store = createVisibleWorkspacesStore();
    store.setVisibility(WS_A, false);
    store.setVisibility(WS_B, false);
    expect(store.listHidden()).toEqual([WS_A, WS_B]);

    const shown = store.setVisibility(WS_A, true);
    expect(shown.changed).toBe(true);
    expect(shown.hidden).toEqual([WS_B]);

    // Showing an already-visible workspace changes nothing.
    const noop = store.setVisibility(WS_A, true);
    expect(noop.changed).toBe(false);
    expect(noop.hidden).toEqual([WS_B]);
  });

  test('paths are resolved so equivalent inputs collapse to one entry', () => {
    const store = createVisibleWorkspacesStore();
    store.setVisibility(`${WS_A}/`, false);
    const r = store.setVisibility(`${WS_A}/.`, false);
    expect(r.changed).toBe(false);
    expect(store.listHidden()).toEqual([WS_A]);
  });

  test('a failed write leaves memory and disk unchanged (atomic)', () => {
    const good = createVisibleWorkspacesStore();
    good.setVisibility(WS_A, false);
    const before = fs.readFileSync(visibleWorkspacesFilePath(), 'utf8');

    const failing = createVisibleWorkspacesStore({
      fs: /** @type {any} */ ({
        readFileSync: fs.readFileSync,
        mkdirSync: fs.mkdirSync,
        renameSync: fs.renameSync,
        writeFileSync: () => {
          throw new Error('disk full');
        }
      })
    });
    expect(() => failing.setVisibility(WS_B, false)).toThrow(/disk full/);

    // Disk untouched (still only WS_A hidden).
    expect(fs.readFileSync(visibleWorkspacesFilePath(), 'utf8')).toBe(before);
    // In-memory cache uncommitted: WS_B not retained.
    expect(failing.listHidden()).toEqual([WS_A]);
  });
});
