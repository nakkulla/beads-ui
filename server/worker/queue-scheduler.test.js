import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createQueueScheduler } from './queue-scheduler.js';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

/**
 * @param {{ queue_state?: Record<string, unknown>, find_prs?: (issue_id: string) => Promise<Array<{ number: number, url: string }>> }} [overrides]
 */
function createHarness(overrides = {}) {
  /** @type {Array<{ type: string, payload: Record<string, unknown> }>} */
  const events = [];
  /** @type {any[]} */
  const spawned = [];
  const queue_state = {
    moveToProgress: vi.fn(async () => {}),
    clearProgress: vi.fn(async () => {}),
    startReviewWait: vi.fn(async () => {}),
    clearReviewWait: vi.fn(async () => {}),
    cancelReviewWait: vi.fn(async () => {}),
    cachePrLink: vi.fn(async () => {}),
    listWaitingCards: vi.fn(async () => []),
    setLastJob: vi.fn(async () => {}),
    setLastSession: vi.fn(async () => {}),
    ...overrides.queue_state
  };
  const scheduler = createQueueScheduler({
    queue_state,
    pr_review_wait_ms: 300000,
    advance_delay_ms: 60000,
    now: () => '2026-05-14T00:00:00.000Z',
    spawn_phase: async (input) => {
      spawned.push(input);
      return { id: `${input.phase}-${input.issueId || input.prNumber}` };
    },
    find_prs: overrides.find_prs || (async () => []),
    broadcast: (type, payload) => events.push({ type, payload })
  });
  return { scheduler, queue_state, events, spawned };
}

describe('queue-scheduler', () => {
  test('starts review wait after successful goal with a PR and spawns pr-finish after wait', async () => {
    const harness = createHarness({
      find_prs: async () => [{ number: 42, url: 'https://github.test/pull/42' }]
    });

    await harness.scheduler.handleJobExit({
      issueId: 'UI-A',
      phase: 'goal',
      status: 'succeeded',
      jobId: 'job-goal'
    });
    await vi.advanceTimersByTimeAsync(300000);

    expect(harness.queue_state.cachePrLink).toHaveBeenCalledWith('UI-A', {
      number: 42,
      url: 'https://github.test/pull/42'
    });
    expect(harness.spawned).toContainEqual({
      issueId: 'UI-A',
      phase: 'pr_finish',
      prNumber: 42
    });
  });

  test('skips review wait when successful goal has no PR and starts advance countdown', async () => {
    const harness = createHarness({
      queue_state: {
        listWaitingCards: vi.fn(async () => [
          { id: 'UI-B', spec_id: 'docs/spec.md', metadata: {}, parallel: false }
        ])
      },
      find_prs: async () => []
    });

    await harness.scheduler.handleJobExit({
      issueId: 'UI-A',
      phase: 'goal',
      status: 'succeeded',
      jobId: 'job-goal'
    });
    await vi.advanceTimersByTimeAsync(60000);

    expect(harness.spawned).toContainEqual({ issueId: 'UI-B', phase: 'goal' });
  });

  test('cancels auto pr-finish once and allows manual pr-finish', async () => {
    const harness = createHarness({
      find_prs: async () => [{ number: 42, url: 'https://github.test/pull/42' }]
    });

    await harness.scheduler.handleJobExit({
      issueId: 'UI-A',
      phase: 'goal',
      status: 'succeeded',
      jobId: 'job-goal'
    });
    await harness.scheduler.cancelAutoPrFinish('UI-A');
    await vi.advanceTimersByTimeAsync(300000);

    expect(harness.queue_state.cancelReviewWait).toHaveBeenCalledWith('UI-A');
    expect(harness.spawned).toEqual([]);

    await harness.scheduler.runPrFinish('UI-A');

    expect(harness.spawned).toContainEqual({
      issueId: 'UI-A',
      phase: 'pr_finish',
      prNumber: 42
    });
  });

  test('restores cancelled review waits without auto spawn and keeps manual pr-finish available', async () => {
    const harness = createHarness({
      queue_state: {
        listIssues: vi.fn(async () => [
          {
            id: 'UI-A',
            metadata: {
              worker_pr_review_wait_started_at: '2026-05-14T00:00:00.000Z',
              worker_pr_review_wait_cancelled: 'true',
              worker_last_goal_job_id: 'job-goal',
              pr_number: '42'
            }
          }
        ])
      }
    });

    await harness.scheduler.restoreReviewWaits();
    await vi.advanceTimersByTimeAsync(300000);

    expect(harness.spawned).toEqual([]);

    await harness.scheduler.runPrFinish('UI-A');

    expect(harness.spawned).toContainEqual({
      issueId: 'UI-A',
      phase: 'pr_finish',
      prNumber: 42
    });
  });

  test('does not auto-advance while serial slot is occupied', async () => {
    const harness = createHarness({
      queue_state: {
        listWaitingCards: vi.fn(async () => [
          { id: 'UI-B', spec_id: 'docs/spec.md', metadata: {}, parallel: false }
        ])
      }
    });

    await harness.scheduler.handleJobStart({
      issueId: 'UI-A',
      jobId: 'job-a',
      phase: 'goal',
      parallel: false
    });
    harness.scheduler.setPaused(false);
    await vi.advanceTimersByTimeAsync(60000);

    expect(harness.spawned).toEqual([]);
  });

  test('auto-advances a parallel head while serial slot is occupied', async () => {
    const harness = createHarness({
      queue_state: {
        listWaitingCards: vi.fn(async () => [
          {
            id: 'UI-X',
            spec_id: 'docs/spec.md',
            metadata: { worker_parallel: 'true' },
            parallel: true
          }
        ])
      }
    });

    await harness.scheduler.handleJobStart({
      issueId: 'UI-A',
      jobId: 'job-a',
      phase: 'goal',
      parallel: false
    });
    harness.scheduler.setPaused(false);
    await vi.advanceTimersByTimeAsync(60000);

    expect(harness.spawned).toContainEqual(
      expect.objectContaining({
        issueId: 'UI-X',
        phase: 'goal',
        parallel: true
      })
    );
  });

  test('does not advance serial queue when a parallel card completes', async () => {
    const harness = createHarness({
      queue_state: {
        listWaitingCards: vi.fn(async () => [
          { id: 'UI-B', spec_id: 'docs/spec.md', metadata: {}, parallel: false }
        ])
      }
    });

    await harness.scheduler.handleJobStart({
      issueId: 'UI-X',
      jobId: 'job-x',
      phase: 'goal',
      parallel: true
    });
    await harness.scheduler.handleJobExit({
      issueId: 'UI-X',
      phase: 'pr_finish',
      status: 'succeeded',
      jobId: 'job-finish'
    });
    await vi.advanceTimersByTimeAsync(60000);

    expect(harness.spawned).toEqual([]);
  });

  test('stops auto-advance on a spec-less head waiting card', async () => {
    const harness = createHarness({
      queue_state: {
        listWaitingCards: vi.fn(async () => [
          { id: 'UI-B', spec_id: '', metadata: {}, parallel: false },
          { id: 'UI-C', spec_id: 'docs/spec.md', metadata: {}, parallel: false }
        ])
      }
    });

    await harness.scheduler.handleJobExit({
      issueId: 'UI-A',
      phase: 'pr_finish',
      status: 'succeeded',
      jobId: 'job-finish'
    });
    await vi.advanceTimersByTimeAsync(60000);

    expect(harness.spawned).toEqual([]);
    expect(harness.events.some((event) => event.type === 'queue.blocked')).toBe(
      true
    );
  });

  test('pauses queue without advancing when pr-finish fails', async () => {
    const harness = createHarness();

    await harness.scheduler.handleJobStart({
      issueId: 'UI-A',
      jobId: 'job-a',
      phase: 'pr_finish',
      parallel: false
    });
    await harness.scheduler.handleJobExit({
      issueId: 'UI-A',
      phase: 'pr_finish',
      status: 'failed',
      jobId: 'job-a'
    });

    expect(harness.queue_state.clearProgress).toHaveBeenCalledWith('UI-A');
    expect(harness.spawned).toEqual([]);
    expect(harness.events).toContainEqual({
      type: 'queue.paused',
      payload: expect.objectContaining({ paused: true, issueId: 'UI-A' })
    });
  });

  test('does not auto-advance while paused', async () => {
    const harness = createHarness({
      queue_state: {
        listWaitingCards: vi.fn(async () => [
          { id: 'UI-B', spec_id: 'docs/spec.md', metadata: {}, parallel: false }
        ])
      }
    });

    harness.scheduler.setPaused(true);
    await harness.scheduler.handleJobExit({
      issueId: 'UI-A',
      phase: 'pr_finish',
      status: 'succeeded',
      jobId: 'job-finish'
    });
    await vi.advanceTimersByTimeAsync(60000);

    expect(harness.spawned).toEqual([]);
  });
});
