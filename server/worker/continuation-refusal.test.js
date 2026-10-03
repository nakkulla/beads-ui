import { describe, expect, test } from 'vitest';
import {
  autoResumeRetryDelayMs,
  continuationRefusalClass
} from './continuation-refusal.js';

describe('continuationRefusalClass (2026-10-01 stall-reconcile D1)', () => {
  test.each([
    ['bd_snapshot_failed', 'transient'],
    ['gh_unavailable', 'transient'],
    ['git_error', 'transient'],
    ['attempt_prerecord_failed', 'transient'],
    ['provider_gate', 'wait'],
    ['prerequisite_unmet', 'wait'],
    ['not_ready:in_progress', 'wait'],
    ['serial_lane_occupied', 'wait'],
    ['bead_running', 'wait'],
    ['not_ready:closed', 'closed'],
    ['worktree_missing', 'permanent'],
    ['workflow_mode_record_failed', 'permanent'],
    ['a_reason_nobody_has_seen', 'permanent']
  ])('classifies %s as %s', (reason, expected) => {
    const refusal_class = continuationRefusalClass(reason);

    expect(refusal_class).toBe(expected);
  });
});

describe('autoResumeRetryDelayMs (D2)', () => {
  test('waits five, fifteen and thirty minutes, then an hour from then on', () => {
    const delays = [1, 2, 3, 4, 9].map((count) =>
      autoResumeRetryDelayMs(count)
    );

    expect(delays.map((ms) => ms / 60_000)).toEqual([5, 15, 30, 60, 60]);
  });

  test('follows the ladder the caller passes', () => {
    const ladder_ms = [60_000, 120_000, 180_000, 240_000];

    const delays = [1, 2, 3, 4, 9].map((count) =>
      autoResumeRetryDelayMs(count, ladder_ms)
    );

    expect(delays.map((ms) => ms / 60_000)).toEqual([1, 2, 3, 4, 4]);
  });
});
