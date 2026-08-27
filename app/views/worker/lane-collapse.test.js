import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createLaneCollapse } from './lane-collapse.js';

const KEY = 'beads-ui.test.lane-collapsed';

beforeEach(() => {
  window.localStorage.clear();
});

describe('createLaneCollapse defaults', () => {
  test('collapses 완료 by default', () => {
    const collapse = createLaneCollapse(KEY);

    expect(collapse.isCollapsed('done')).toBe(true);
  });

  test('leaves every other lane expanded by default', () => {
    const collapse = createLaneCollapse(KEY);

    expect(collapse.isCollapsed('queue')).toBe(false);
    expect(collapse.isCollapsed('candidate')).toBe(false);
    expect(collapse.isCollapsed('running')).toBe(false);
    expect(collapse.isCollapsed('pr_wait')).toBe(false);
  });

  test('leaves both wait areas expanded by default', () => {
    const collapse = createLaneCollapse(KEY);

    expect(collapse.isAreaCollapsed('parallel')).toBe(false);
    expect(collapse.isAreaCollapsed('serial')).toBe(false);
  });

  test('takes the caller defaults over the built-in ones', () => {
    const collapse = createLaneCollapse(KEY, {
      lanes: { queue: true },
      areas: { serial: true }
    });

    expect(collapse.isCollapsed('done')).toBe(false);
    expect(collapse.isCollapsed('queue')).toBe(true);
    expect(collapse.isAreaCollapsed('serial')).toBe(true);
  });
});

describe('createLaneCollapse toggling', () => {
  test('returns the state a lane toggle produced', () => {
    const collapse = createLaneCollapse(KEY);

    expect(collapse.toggle('queue')).toBe(true);
    expect(collapse.isCollapsed('queue')).toBe(true);
  });

  test('expands a lane that started collapsed', () => {
    const collapse = createLaneCollapse(KEY);

    collapse.toggle('done');

    expect(collapse.isCollapsed('done')).toBe(false);
  });

  test('toggles an area independently of the lanes', () => {
    const collapse = createLaneCollapse(KEY);

    collapse.toggleArea('parallel');

    expect(collapse.isAreaCollapsed('parallel')).toBe(true);
    expect(collapse.isAreaCollapsed('serial')).toBe(false);
    expect(collapse.isCollapsed('queue')).toBe(false);
  });

  test('persists lanes and areas under the storage key', () => {
    const collapse = createLaneCollapse(KEY);

    collapse.toggle('queue');
    collapse.toggleArea('serial');

    expect(JSON.parse(window.localStorage.getItem(KEY) || '{}')).toEqual({
      lanes: { done: true, queue: true },
      areas: { serial: true }
    });
  });

  test('reads back what an earlier store wrote', () => {
    createLaneCollapse(KEY).toggle('done');

    const reloaded = createLaneCollapse(KEY);

    expect(reloaded.isCollapsed('done')).toBe(false);
  });
});

describe('createLaneCollapse stored value handling', () => {
  test('promotes the legacy boolean map into lanes', () => {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ queue: true, done: false })
    );

    const collapse = createLaneCollapse(KEY);

    expect(collapse.isCollapsed('queue')).toBe(true);
    expect(collapse.isCollapsed('done')).toBe(false);
  });

  test('keeps the defaults for a lane the stored value never mentions', () => {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ lanes: { queue: true } })
    );

    const collapse = createLaneCollapse(KEY);

    expect(collapse.isCollapsed('done')).toBe(true);
  });

  test('ignores non-boolean entries in the stored value', () => {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ lanes: { queue: 'yes' }, areas: { serial: 1 } })
    );

    const collapse = createLaneCollapse(KEY);

    expect(collapse.isCollapsed('queue')).toBe(false);
    expect(collapse.isAreaCollapsed('serial')).toBe(false);
  });

  test('falls back to the defaults on unparsable JSON', () => {
    window.localStorage.setItem(KEY, '{oops');

    const collapse = createLaneCollapse(KEY);

    expect(collapse.isCollapsed('done')).toBe(true);
  });

  test('falls back to the defaults when reading throws', () => {
    const getItem = vi
      .spyOn(window.localStorage, 'getItem')
      .mockImplementation(() => {
        throw new Error('denied');
      });

    const collapse = createLaneCollapse(KEY);

    expect(collapse.isCollapsed('done')).toBe(true);
    getItem.mockRestore();
  });

  test('keeps toggling when writing throws', () => {
    const setItem = vi
      .spyOn(window.localStorage, 'setItem')
      .mockImplementation(() => {
        throw new Error('denied');
      });
    const collapse = createLaneCollapse(KEY);

    collapse.toggle('queue');

    expect(collapse.isCollapsed('queue')).toBe(true);
    setItem.mockRestore();
  });
});
