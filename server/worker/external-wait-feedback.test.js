import { expect, test } from 'vitest';
import { projectExternalWait } from './attach.js';

/** @param {Record<string, any>} [patch] */
function record(patch = {}) {
  return /** @type {any} */ ({
    wait_id: 'w-0123456789ab',
    bead_id: 'B1',
    root_dir: '/repo',
    stage: 'completing',
    owner: { kind: 'session' },
    jobs: [],
    completion: null,
    resume: null,
    ...patch
  });
}

/** @param {Record<string, any>} [patch] */
function queue(patch = {}) {
  return /** @type {any} */ ({
    external_wait_feedback: {
      'w-0123456789ab': {
        bead_id: 'B1',
        kind: 'session_resume',
        reason: 'owner_alive',
        at: 123,
        version: 4,
        session_ref: 'claude:old@host',
        owner_tmux: 'dev:@1.%7'
      }
    },
    conversation_refusals: {},
    interactive_sessions: {},
    ...patch
  });
}

test('drops old movable coordinates when current session metadata changes', () => {
  const source = queue();

  const projected = projectExternalWait(record(), source, {
    session_ref: 'claude:new@host'
  });

  expect(projected.feedback).toMatchObject({
    reason: 'session_ref_changed',
    owner_tmux: null,
    version: 4
  });
  expect(source.external_wait_feedback['w-0123456789ab'].owner_tmux).toBe(
    'dev:@1.%7'
  );
});

test('reads a legacy external handoff refusal only for its confirmed wait', () => {
  const source = queue({
    external_wait_feedback: {},
    conversation_refusals: {
      B1: { kind: 'external_resume', reason: 'serial_lane_not_head', at: 123 }
    },
    interactive_sessions: {
      key: {
        bead_id: 'B1',
        kind: 'external_resume',
        conversation: { wait_id: 'w-0123456789ab' }
      }
    }
  });

  const projected = projectExternalWait(record(), source);
  const next = projectExternalWait(
    record({ wait_id: 'w-abcdef012345' }),
    source
  );

  expect(projected.feedback?.reason).toBe('serial_lane_not_head');
  expect(next.feedback).toBeUndefined();
  expect(source.external_wait_feedback).toEqual({});
});

test.each([123, 124])(
  'reads an ended legacy handoff refusal at %i after wait registration',
  (at) => {
    const source = queue({
      external_wait_feedback: {},
      conversation_refusals: {
        B1: { kind: 'external_resume', reason: 'serial_lane_not_head', at }
      }
    });
    const before = JSON.stringify(source);

    const projected = projectExternalWait(
      record({ registered_at: new Date(123).toISOString() }),
      source
    );

    expect(projected.feedback?.reason).toBe('serial_lane_not_head');
    expect(JSON.stringify(source)).toBe(before);
  }
);

test('hides an ended legacy refusal from before the current wait', () => {
  const source = queue({
    external_wait_feedback: {},
    conversation_refusals: {
      B1: { kind: 'external_resume', reason: 'serial_lane_not_head', at: 122 }
    }
  });

  const projected = projectExternalWait(
    record({ registered_at: new Date(123).toISOString() }),
    source
  );

  expect(projected.feedback).toBeUndefined();
});

test('prefers the new wait feedback over legacy conversation refusals', () => {
  const source = queue({
    conversation_refusals: {
      B1: { kind: 'external_resume', reason: 'serial_lane_not_head', at: 999 }
    }
  });

  const projected = projectExternalWait(record(), source);

  expect(projected.feedback?.reason).toBe('owner_alive');
});

test.each(['resumed', 'stopped', 'done'])(
  'omits feedback for a %s wait',
  (stage) => {
    const projected = projectExternalWait(record({ stage }), queue());

    expect(projected.feedback).toBeUndefined();
  }
);
