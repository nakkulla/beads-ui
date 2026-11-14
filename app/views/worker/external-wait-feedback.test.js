import { render } from 'lit-html';
import { afterEach, expect, test, vi } from 'vitest';
import {
  runExternalWaitAction,
  sessionResumeToast
} from './external-wait-action.js';
import { waitReasonLines } from './lanes.js';
import { externalWaitFeedbackText } from './wait-vocabulary.js';

afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

/** @param {Record<string, any>} [patch] */
function feedback(patch = {}) {
  return {
    bead_id: 'B1',
    kind: /** @type {const} */ ('session_resume'),
    reason: 'owner_alive',
    at: 123,
    version: 7,
    session_ref: 'claude:s1@host',
    owner_tmux: 'dev:@1.%2',
    ...patch
  };
}

test.each(['owner_alive', 'owner_unverified'])(
  'leaves the clipboard untouched on %s',
  async (reason) => {
    const writeText = vi.fn();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText }
    });

    const toast = await sessionResumeToast({
      reason,
      command: 'unused resume',
      session: 'not_launched'
    });

    expect(writeText).not.toHaveBeenCalled();
    expect(toast.variant).toBe(reason === 'owner_alive' ? 'info' : 'warning');
  }
);

test('preserves unknown refusal codes in the visible sentence', () => {
  const text = externalWaitFeedbackText(
    feedback({ kind: 'conversation_handoff', reason: 'new_server_code' })
  );

  expect(text).toBe(
    'Worker로 넘기지 못했습니다 · 상태를 확인한 뒤 다시 시도하세요 (new_server_code)'
  );
});

test('explains the unsupported Codex owner probe', () => {
  const text = externalWaitFeedbackText(
    feedback({ reason: 'owner_unverified', session_ref: 'codex:s1@host' })
  );

  expect(text).toContain('Codex 생존 확인을 지원하지 않습니다');
});

test.each([
  ['owner_alive', 'dev:@1.%2', 2],
  ['owner_alive', null, 1],
  ['owner_unverified', null, 1],
  ['session_ref_changed', null, 1],
  ['owner_dead', null, 0]
])(
  'renders owner actions for %s with location %s',
  (reason, owner_tmux, count) => {
    const record = /** @type {any} */ ({
      root_dir: '/repo',
      bead_id: 'B1',
      wait_id: 'w-0123456789ab',
      jobs: [],
      feedback: feedback({ reason, owner_tmux })
    });
    const wait_reason = /** @type {any} */ ({
      kind: 'external_job',
      subject: { root_dir: '/repo', bead_id: 'B1' },
      verdict: 'normal',
      actions: [],
      targets: []
    });
    const lines = waitReasonLines(wait_reason, { external_wait: record });

    const mount = document.createElement('div');
    document.body.append(mount);
    render(lines.actions, mount);

    expect(document.querySelectorAll('[data-feedback-action]')).toHaveLength(
      Number(count)
    );
    for (const button of Array.from(document.querySelectorAll('button'))) {
      expect(button.classList.contains('op-btn')).toBe(true);
      expect(button.type).toBe('button');
      expect(button.disabled).toBe(false);
    }
  }
);

test('sends owner identity and version without a client tmux target', async () => {
  const button = document.createElement('button');
  Object.assign(button.dataset, {
    externalWaitOp: 'external_wait_check',
    feedbackAction: 'focus',
    rootDir: '/repo',
    beadId: 'B1',
    waitId: 'w-0123456789ab',
    version: '7',
    ownerTmux: 'injected:%999'
  });
  const transport = vi.fn(async () => ({ ok: true }));

  await runExternalWaitAction(button, { transport });

  expect(transport).toHaveBeenCalledExactlyOnceWith('external_wait_check', {
    root_dir: '/repo',
    bead_id: 'B1',
    wait_id: 'w-0123456789ab',
    feedback_action: 'focus',
    version: 7
  });
});
