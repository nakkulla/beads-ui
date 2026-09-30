/**
 * The pipeline ops that cross a provider boundary route through the one
 * continuation dialog (`continuation-dialog.js`, on `ui/dialog.js`): the
 * dialog's choice is re-sent with `continuation` and the server's
 * `decision_token` (UI-6g3t §5.1, old `monitor/index.js` continuation path).
 * `worker-cleanup-retry` never carried a continuation and still does not.
 */
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createPipelineActions } from '../pipeline/actions.js';

const ROOT = '/repo';
const TOKEN = { source_attempt_id: 'att-1', digest: 'd1' };
const MISMATCH = {
  prior_available: true,
  prior: { runner: 'codex', model: 'sol' },
  current: { runner: 'claude', model: 'opus' },
  decision_token: TOKEN
};

/**
 * @param {(type: string, payload: any, call: number) => any} reply
 * @param {{ queue?: any }} [options]
 */
function actionsWith(reply, options = {}) {
  let call = 0;
  const send = vi.fn(
    async (/** @type {string} */ type, /** @type {any} */ payload) =>
      reply(type, payload, call++)
  );
  const toast = vi.fn();
  const actions = createPipelineActions({
    send,
    adopt: () => {},
    revisionOf: () => 3,
    queueOf: () => options.queue || {},
    confirm: () => true,
    toast,
    onChange: () => {}
  });
  return { actions, send, toast };
}

/** @returns {Promise<void>} */
async function settle() {
  for (let index = 0; index < 20; index++) {
    await Promise.resolve();
  }
}

/**
 * @param {string} label
 */
function clickDialogButton(label) {
  const button = Array.from(
    document.querySelectorAll('.continuation-dialog button')
  ).find((node) => node.textContent === label);
  /** @type {HTMLButtonElement} */ (button).click();
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('continuation dialog routing of pipeline ops', () => {
  test('re-sends a resume with the chosen prior session and its token', async () => {
    const { actions, send } = actionsWith((type, payload, call) =>
      call === 0
        ? { resumed: false, continuation_mismatch: MISMATCH }
        : { resumed: true }
    );

    const pending = actions.resume({
      bead_id: 'UI-1',
      attempt_id: 'att-1',
      root_dir: ROOT,
      kind: 'session'
    });
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog button')
    ).click();
    await settle();
    clickDialogButton('기존 session 이어하기');
    await pending;

    expect(send.mock.calls.map((entry) => entry[1])).toEqual([
      { attempt_id: 'att-1', root_dir: ROOT, expected_revision: 3 },
      {
        attempt_id: 'att-1',
        continuation: 'prior_session',
        decision_token: TOKEN,
        root_dir: ROOT,
        expected_revision: 3
      }
    ]);
  });

  test('routes a settlement 정리 재시도 through the same dialog', async () => {
    const { actions, send } = actionsWith((type, payload, call) =>
      call === 0
        ? { resumed: false, continuation_mismatch: MISMATCH }
        : { resumed: true }
    );

    const pending = actions.resume({
      bead_id: 'UI-1',
      attempt_id: 'att-1',
      root_dir: ROOT,
      kind: 'settlement'
    });
    const title = document.querySelector(
      '.resume-instructions-dialog h2'
    )?.textContent;
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog button')
    ).click();
    await settle();
    clickDialogButton('현재 preset으로 새 session');
    await pending;

    expect(title).toBe('착지 후 정리 재시도');
    expect(send.mock.calls[1][1]).toMatchObject({
      continuation: 'fresh_current',
      decision_token: TOKEN
    });
  });

  test('settles a queued merge continuation through the dialog', async () => {
    const { actions, send } = actionsWith(
      () => ({ applied: true, queue: { merge_queue: [] } }),
      {
        queue: {
          merge_queue: [
            {
              bead_id: 'UI-1',
              continuation_action: { continuation: null, mismatch: MISMATCH }
            }
          ]
        }
      }
    );

    const pending = actions.merge('UI-1', ROOT);
    await settle();
    clickDialogButton('현재 preset으로 새 session');
    await pending;

    expect(send).toHaveBeenCalledWith('worker-merge-queue-add', {
      bead_id: 'UI-1',
      continuation: 'fresh_current',
      decision_token: TOKEN,
      root_dir: ROOT,
      expected_revision: 3
    });
  });

  test('re-sends a REVISE fix with the chosen continuation', async () => {
    const { actions, send } = actionsWith((type, payload, call) =>
      call === 0 ? { ok: false, continuation_mismatch: MISMATCH } : { ok: true }
    );

    const pending = actions.revise('worker-revise-fix', 'UI-1', ROOT);
    await settle();
    clickDialogButton('기존 session 이어하기');
    await pending;

    expect(send.mock.calls[1]).toEqual([
      'worker-revise-fix',
      {
        bead_id: 'UI-1',
        continuation: 'prior_session',
        decision_token: TOKEN,
        root_dir: ROOT,
        expected_revision: 3
      }
    ]);
  });

  test('sends a cleanup retry once and names its refusal', async () => {
    const { actions, send, toast } = actionsWith(() => ({
      retried: false,
      reason: 'not_landed'
    }));

    await actions.cleanupRetry('UI-1', ROOT);

    expect(send).toHaveBeenCalledTimes(1);
    expect(document.querySelector('.continuation-dialog')).toBeNull();
    expect(toast).toHaveBeenCalledWith(
      '정리 재시도 거부: not_landed',
      'error',
      2400
    );
  });
});
