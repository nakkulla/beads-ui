import { describe, expect, test } from 'vitest';
import { createMonitorPipelineStore } from './monitor-pipeline-store.js';

/**
 * @param {Array<Record<string, any>>} [lanes]
 * @param {number} [revision]
 */
function crossLanes(lanes = [], revision = 3) {
  return { revision, lanes };
}

describe('data/monitor-pipeline-store cross lanes (UI-j92s §4.4)', () => {
  test('keeps the cross lanes the snapshot carried', () => {
    const store = createMonitorPipelineStore();
    const lanes = crossLanes([{ id: 'cl_1', status: 'draft', entries: [] }]);

    store.set([], [], lanes);

    expect(store.crossLanes()).toEqual(lanes);
  });

  test('reports undefined before any snapshot arrives', () => {
    const store = createMonitorPipelineStore();

    const value = store.crossLanes();

    expect(value).toBe(undefined);
  });

  // 키 없음(구서버)과 `null`(저장소 읽기 실패)은 다른 말이다 — 뷰가 전자는 없는
  // 기능으로, 후자는 고장으로 그린다.
  test('leaves an old-server snapshot with no key undefined', () => {
    const store = createMonitorPipelineStore();
    store.set([], [], crossLanes());

    store.set([], []);

    expect(store.crossLanes()).toBe(undefined);
  });

  test('keeps a null cross_lanes distinct from an absent key', () => {
    const store = createMonitorPipelineStore();

    store.set([], [], null);

    expect(store.crossLanes()).toBe(null);
  });

  test('rejects a malformed cross_lanes as unreadable', () => {
    const store = createMonitorPipelineStore();

    store.set([], [], /** @type {any} */ ({ revision: 'x', lanes: [] }));

    expect(store.crossLanes()).toBe(null);
  });

  test('clears the cross lanes back to undefined', () => {
    const store = createMonitorPipelineStore();
    store.set([], [], crossLanes());

    store.clear();

    expect(store.crossLanes()).toBe(undefined);
  });

  test('notifies subscribers when the cross lanes change', () => {
    const store = createMonitorPipelineStore();
    let calls = 0;
    store.subscribe(() => {
      calls += 1;
    });

    store.set([], [], crossLanes());

    expect(calls).toBe(1);
  });
});
