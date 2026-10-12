import { describe, expect, test } from 'vitest';
import {
  normalizeSessionInquiries,
  refTail,
  sessionInquiryIdOf,
  sessionInquiryRowKey
} from './contract.js';

describe('session-inquiry contract helpers (UI-gske §3.1)', () => {
  test('keeps a stored row with its consumed session ids', () => {
    const rows = normalizeSessionInquiries({
      'si-0123456789ab': {
        repo: '/repo',
        ref: 'refs/set-aside/main/sync-1',
        session_id: '11111111-1111-4111-8111-111111111111',
        cwd: '/repo',
        summary: '질문',
        bundles: [{ title: 't', paths: ['a'], reason: 'r' }],
        state: 'held',
        created_at: 1,
        auto_resume_consumed: ['11111111-1111-4111-8111-111111111111'],
        liveness: { state: 'dead', at: 2, tmux: null }
      }
    });

    expect(rows['si-0123456789ab']).toMatchObject({
      id: 'si-0123456789ab',
      state: 'held',
      updated_at: 1,
      auto_resume_consumed: ['11111111-1111-4111-8111-111111111111'],
      liveness: { state: 'dead', at: 2, tmux: null }
    });
  });

  test('drops a row that cannot name its id, session or state', () => {
    const rows = normalizeSessionInquiries({
      'bad-id': {
        repo: '/r',
        ref: 'x',
        session_id: 's',
        cwd: '/r',
        state: 'waiting',
        created_at: 1
      },
      'si-0123456789ab': {
        repo: '/r',
        ref: 'x',
        cwd: '/r',
        state: 'waiting',
        created_at: 1
      },
      'si-0123456789ac': {
        repo: '/r',
        ref: 'x',
        session_id: 's',
        cwd: '/r',
        state: 'open',
        created_at: 1
      }
    });

    expect(rows).toEqual({});
  });

  test('round-trips a row key', () => {
    const key = sessionInquiryRowKey('si-0123456789ab');

    expect(sessionInquiryIdOf(key)).toBe('si-0123456789ab');
    expect(sessionInquiryIdOf('repo-op:op-1')).toBeNull();
  });

  test('cuts a long ref to its last 24 characters', () => {
    expect(refTail('refs/set-aside/main/2026-10-13-base-sync')).toBe(
      '…ain/2026-10-13-base-sync'
    );
  });
});
