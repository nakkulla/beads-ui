import { describe, expect, test } from 'vitest';
import { createActivityStore } from './activity-store.js';

describe('worker/activity-store — poller activity', () => {
  test('reports no activity for a bead nothing touched', () => {
    const store = createActivityStore();

    expect(store.get('/ws', 'UI-1')).toBe(null);
  });

  test('reports checking while an observation runs', () => {
    const store = createActivityStore();

    store.beginChecking('/ws', 'UI-1');

    expect(store.get('/ws', 'UI-1')?.activity).toBe('checking');
  });

  test('clears checking when the observation ends', () => {
    const store = createActivityStore();
    store.beginChecking('/ws', 'UI-1');

    store.endChecking('/ws', 'UI-1');

    expect(store.get('/ws', 'UI-1')).toBe(null);
  });

  test('prefers verifying over a concurrent checking', () => {
    const store = createActivityStore();
    store.beginVerifying('/ws', 'UI-1');

    store.beginChecking('/ws', 'UI-1');

    expect(store.get('/ws', 'UI-1')?.activity).toBe('verifying');
  });

  test('keeps verifying after an overlapping observation pass finishes', () => {
    const store = createActivityStore();
    store.beginVerifying('/ws', 'UI-1');
    store.beginChecking('/ws', 'UI-1');

    store.endChecking('/ws', 'UI-1');

    expect(store.get('/ws', 'UI-1')?.activity).toBe('verifying');
  });

  test('keeps verifying while a second head SHA verification is still running', () => {
    const store = createActivityStore();
    store.beginVerifying('/ws', 'UI-1');
    store.beginVerifying('/ws', 'UI-1');

    store.endVerifying('/ws', 'UI-1');

    expect(store.get('/ws', 'UI-1')?.activity).toBe('verifying');
  });

  test('clears verifying only when the last run ends', () => {
    const store = createActivityStore();
    store.beginVerifying('/ws', 'UI-1');
    store.beginVerifying('/ws', 'UI-1');
    store.endVerifying('/ws', 'UI-1');

    store.endVerifying('/ws', 'UI-1');

    expect(store.get('/ws', 'UI-1')).toBe(null);
  });

  test('never drops a counter below zero on an unmatched end', () => {
    const store = createActivityStore();

    store.endChecking('/ws', 'UI-1');
    store.beginChecking('/ws', 'UI-1');
    store.endChecking('/ws', 'UI-1');

    expect(store.get('/ws', 'UI-1')).toBe(null);
  });

  test('keeps the activity of different workspaces apart', () => {
    const store = createActivityStore();

    store.beginChecking('/a', 'UI-1');

    expect(store.get('/b', 'UI-1')).toBe(null);
  });

  test('resolves workspace keys so writer and reader share one lane', () => {
    const store = createActivityStore();

    store.beginChecking('/ws/sub/..', 'UI-1');

    expect(store.get('/ws', 'UI-1')?.activity).toBe('checking');
  });
});

describe('worker/activity-store — merge progress', () => {
  test('records the current merge step with its start time', () => {
    const store = createActivityStore({ now: () => 4242 });

    store.setMergeProgress('/ws', 'UI-1', 'deploy');

    expect(store.get('/ws', 'UI-1')?.merge_progress).toEqual({
      step: 'deploy',
      started_at: 4242
    });
  });

  test('advances the step without restarting the clock', () => {
    let t = 1000;
    const store = createActivityStore({ now: () => t });
    store.setMergeProgress('/ws', 'UI-1', 'merging');

    t = 5000;
    store.setMergeProgress('/ws', 'UI-1', 'base_sync');

    expect(store.get('/ws', 'UI-1')?.merge_progress).toEqual({
      step: 'base_sync',
      started_at: 1000
    });
  });

  test('drops the record when the merge releases it', () => {
    const store = createActivityStore();
    store.setMergeProgress('/ws', 'UI-1', 'merging');

    store.clearMergeProgress('/ws', 'UI-1');

    expect(store.get('/ws', 'UI-1')).toBe(null);
  });

  test('keeps a running verification visible after the merge progress clears', () => {
    const store = createActivityStore();
    store.beginVerifying('/ws', 'UI-1');
    store.setMergeProgress('/ws', 'UI-1', 'merging');

    store.clearMergeProgress('/ws', 'UI-1');

    expect(store.get('/ws', 'UI-1')?.activity).toBe('verifying');
  });
});

describe('worker/activity-store — snapshot and prune', () => {
  test('projects every touched bead into the snapshot', () => {
    const store = createActivityStore({ now: () => 1 });
    store.beginChecking('/ws', 'UI-1');
    store.setMergeProgress('/ws', 'UI-2', 'deploy');

    expect(store.snapshot('/ws')).toEqual({
      'UI-1': { activity: 'checking', merge_progress: null },
      'UI-2': {
        activity: null,
        merge_progress: { step: 'deploy', started_at: 1 }
      }
    });
  });

  test('drops beads that left the lane on prune', () => {
    const store = createActivityStore();
    store.beginChecking('/ws', 'UI-1');
    store.beginChecking('/ws', 'UI-2');

    store.prune('/ws', ['UI-2']);

    expect(Object.keys(store.snapshot('/ws'))).toEqual(['UI-2']);
  });

  test('drops everything on clear', () => {
    const store = createActivityStore();
    store.beginChecking('/ws', 'UI-1');

    store.clear();

    expect(store.snapshot('/ws')).toEqual({});
  });
});
