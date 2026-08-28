/**
 * The quick_fix landing resume judgment (UI-8h1x §3.1): which failures a
 * settlement re-run can clear, and which need the session back.
 */
import { expect, test } from 'vitest';
import { resumeKindOf } from './quickfix-resume-kind.js';

test.each([
  'push_not_contained',
  'invalid_impl_review',
  'premature_close',
  'head_mismatch',
  'foreign_deploy_unsupported',
  'not_resolved'
])('reads %s as a session re-run', (reason) => {
  const kind = resumeKindOf({ reason });

  expect(kind).toBe('session');
});

test.each([
  'delivery_unproven:push_log_absent',
  'delivery_unproven:impl_review_missing',
  'delivery_unproven:impl_review_sha_mismatch'
])('reads the %s delivery-evidence family as a session re-run', (reason) => {
  const kind = resumeKindOf({ reason });

  expect(kind).toBe('session');
});

test.each([
  'containment_unobservable',
  'foreign_checkout_unavailable',
  'foreign_landing_unpinned:foreign_repo',
  'worktree_remove_failed',
  'bd_close_failed',
  'bd_read_failed'
])('reads %s as a settlement re-run', (reason) => {
  const kind = resumeKindOf({ reason });

  expect(kind).toBe('settlement');
});

test.each(['remote_history_not_monotonic', 'repo_ops_ancestry_check_failed'])(
  'falls the coordinator code %s to settlement',
  (reason) => {
    const kind = resumeKindOf({ reason });

    expect(kind).toBe('settlement');
  }
);

test('defaults an unknown token to settlement', () => {
  const kind = resumeKindOf({ reason: 'a_reason_nobody_has_written_yet' });

  expect(kind).toBe('settlement');
});

test.each([
  ['null landing', null],
  ['undefined landing', undefined],
  ['null reason', { reason: null }],
  ['empty reason', { reason: '' }]
])('answers session for an absent reason (%s)', (_name, landing) => {
  const kind = resumeKindOf(landing);

  expect(kind).toBe('session');
});

test('ignores the settlement cursor entirely', () => {
  const landing = {
    reason: 'push_not_contained',
    cursor: 'branch_cleanup',
    head_sha: 'a'.repeat(40)
  };

  const kind = resumeKindOf(landing);

  expect(kind).toBe('session');
});
