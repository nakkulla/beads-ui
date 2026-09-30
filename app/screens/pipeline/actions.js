/**
 * The pipeline screen's operation controller (UI-dbn6 §4.2, §5 step 3). Every
 * worker op names its workspace (`root_dir`, validated server-side by
 * `targetWorkspaceOf`) and carries that workspace's `expected_revision`; a CAS
 * conflict is adopted and retried once (the existing discipline). The reply's
 * `queue` goes to `adopt(root_dir, queue)` — the screen decides whether that
 * is the worker-queue store (레포 scope) or the adopted-queue rule (전체).
 *
 * Confirmation sentences, refusal toasts and the resume / continuation flows
 * are the current base's, unchanged: they are imported from their owners
 * rather than re-worded here.
 */
import {
  discardAbandonCompletionMessage,
  discardAbandonConfirmationMessage,
  discardCompletionMessage,
  discardConfirmationMessage
} from '../../model/discard.js';
import { providerProbeRefusalText } from '../../model/gate-labels.js';
import { formatAttemptTuple } from '../../utils/attempt-display.js';
import { resolveContinuationMismatch } from '../../utils/continuation-dialog.js';
import { runResumeFlow } from '../../utils/resume-flow.js';
import { runExternalWaitAction } from './external-wait-action.js';

/**
 * @typedef {Object} ActionDeps
 * @property {(type: string, payload?: unknown) => Promise<any>} send
 * @property {(root_dir: string, queue: any) => void} adopt
 * @property {(root_dir: string) => number} revisionOf
 * @property {(root_dir: string) => any} queueOf - The freshest queue view.
 * @property {(message: string) => boolean} confirm
 * @property {(message: string, kind?: 'success'|'error'|'info'|'warning', ms?: number) => void} toast
 * @property {() => void} onChange - Re-render request (pending flags).
 */

/**
 * @param {unknown} error
 * @returns {string}
 */
function errorMessage(error) {
  if (typeof error === 'string' && error.length > 0) {
    return error;
  }
  const value = /** @type {any} */ (error);
  return value && typeof value.message === 'string' && value.message
    ? value.message
    : '요청에 실패했습니다';
}

/**
 * @param {ActionDeps} deps
 */
export function createPipelineActions(deps) {
  /** @type {Set<string>} */
  const resolve_pending = new Set();
  /** @type {Set<string>} */
  const handoff_pending = new Set();
  /** @type {Set<string>} */
  const revise_pending = new Set();
  /** @type {Set<string>} */
  const external_pending = new Set();

  /**
   * @param {string} root_dir
   * @param {any} res
   */
  function adoptReply(root_dir, res) {
    if (res && res.queue && root_dir) {
      deps.adopt(root_dir, res.queue);
    }
  }

  /**
   * One workspace-scoped mutation under CAS.
   *
   * @param {string} type
   * @param {Record<string, unknown>} payload
   * @param {string} root_dir
   * @param {{ retry?: boolean, revision?: number }} [options]
   * @returns {Promise<any>}
   */
  async function sendCas(type, payload, root_dir, options = {}) {
    if (!root_dir) {
      return null;
    }
    const revision =
      typeof options.revision === 'number'
        ? options.revision
        : deps.revisionOf(root_dir);
    let res = await deps.send(type, {
      ...payload,
      root_dir,
      expected_revision: revision
    });
    adoptReply(root_dir, res);
    if (res && res.conflict && options.retry !== false) {
      const fresh =
        res.queue && typeof res.queue.revision === 'number'
          ? res.queue.revision
          : deps.revisionOf(root_dir);
      res = await deps.send(type, {
        ...payload,
        root_dir,
        expected_revision: fresh
      });
      adoptReply(root_dir, res);
    }
    return res;
  }

  /**
   * A mutation that carries no CAS (`worker-attempt-pause`, `-start-now`,
   * `-provider-probe-now`, repo-op dismiss).
   *
   * @param {string} type
   * @param {Record<string, unknown>} payload
   * @param {string} root_dir
   * @returns {Promise<any>}
   */
  async function sendPlain(type, payload, root_dir) {
    const res = await deps.send(type, { ...payload, root_dir });
    adoptReply(root_dir, res);
    return res;
  }

  /**
   * @param {string} root_dir
   * @param {string} bead_id
   * @returns {any}
   */
  function queuedContinuation(root_dir, bead_id) {
    const queue = deps.queueOf(root_dir);
    return queue?.merge_queue?.find(
      (/** @type {any} */ entry) => entry.bead_id === bead_id
    )?.continuation_action;
  }

  /**
   * Settle a merge-queue continuation decision the server already persisted.
   *
   * @param {string} root_dir
   * @param {string} bead_id
   * @param {any} mismatch
   */
  async function decideQueuedContinuation(root_dir, bead_id, mismatch) {
    const result = await resolveContinuationMismatch(
      { continuation_mismatch: mismatch },
      (continuation, decision_token) =>
        sendCas(
          'worker-merge-queue-add',
          { bead_id, continuation, decision_token },
          root_dir,
          { retry: false }
        )
    );
    const action = result?.queue?.merge_queue?.find(
      (/** @type {any} */ entry) => entry.bead_id === bead_id
    )?.continuation_action;
    if (
      result?.applied !== true &&
      action?.continuation === null &&
      action.mismatch
    ) {
      await decideQueuedContinuation(root_dir, bead_id, action.mismatch);
    }
  }

  return {
    sendCas,
    /**
     * @param {string} bead_id
     * @returns {boolean}
     */
    isResolvePending: (bead_id) => resolve_pending.has(bead_id),
    /**
     * @param {string} bead_id
     * @returns {boolean}
     */
    isHandoffPending: (bead_id) => handoff_pending.has(bead_id),
    /**
     * @param {string} bead_id
     * @returns {boolean}
     */
    isRevisePending: (bead_id) => revise_pending.has(bead_id),

    /**
     * A queue placement/order op (`-place`·`-reorder`·`-remove`) with the drag
     * controller's refusal vocabulary (UI-4tud §4.5).
     *
     * @param {{ type: string, payload: Record<string, unknown>, root_dir: string }} op
     * @returns {Promise<boolean>} Whether the server applied it.
     */
    async queueOp(op) {
      try {
        const res = await sendCas(op.type, op.payload, op.root_dir);
        if (
          !res ||
          typeof res.applied !== 'boolean' ||
          res.conflict ||
          !res.applied
        ) {
          deps.toast(
            res?.admission_reason
              ? `큐 적재 거부: ${res.admission_reason}`
              : res?.conflict
                ? '큐가 바뀌었습니다 — 다시 시도해 주세요'
                : '큐 요청이 적용되지 않았습니다',
            'error'
          );
          return false;
        }
        return true;
      } catch (error) {
        deps.toast(errorMessage(error), 'error');
        return false;
      } finally {
        deps.onChange();
      }
    },

    /**
     * `[지금 시작]` (UI-q1tg §3.3): no CAS — nothing durable changes.
     *
     * @param {string} bead_id
     * @param {string} root_dir
     */
    async startNow(bead_id, root_dir) {
      const res = await sendPlain(
        'worker-queue-start-now',
        { bead_id },
        root_dir
      );
      if (res && res.ok === false) {
        deps.toast(
          `지금 시작 거부: ${
            res.reason === 'not_waiting'
              ? '이 이슈는 더 이상 대기 레인에 없습니다'
              : res.reason || ''
          }`,
          'error',
          2800
        );
      }
      deps.onChange();
    },

    /**
     * `↻ 지금 프로브` (UI-o5ll §3.4).
     *
     * @param {string} runner
     * @param {number} since
     * @param {string} root_dir
     */
    async probe(runner, since, root_dir) {
      if (!runner || !Number.isFinite(since) || !root_dir) {
        return;
      }
      const res = await sendPlain(
        'worker-provider-probe-now',
        { runner, since },
        root_dir
      );
      if (res && res.ok === false) {
        deps.toast(
          `지금 프로브 거부: ${providerProbeRefusalText(res.reason)}`,
          'error',
          2800
        );
      }
      deps.onChange();
    },

    /**
     * @param {string} attempt_id
     * @param {string} root_dir
     */
    async pause(attempt_id, root_dir) {
      if (!attempt_id) {
        return;
      }
      const res = await sendPlain(
        'worker-attempt-pause',
        { attempt_id },
        root_dir
      );
      if (res && res.paused === false && res.reason) {
        deps.toast(`일시정지 거부: ${res.reason}`, 'error', 2400);
      }
    },

    /**
     * `↻ 이어하기`·`▶ 재개`·`정리 재시도` — the shared resume flow (UI-6g3t §5.1).
     *
     * @param {{ bead_id: string, attempt_id: string, root_dir: string, kind: 'session'|'settlement', item?: any, base_payload?: Record<string, unknown> }} input
     */
    async resume(input) {
      if (!input.attempt_id) {
        return;
      }
      await runResumeFlow({
        context: {
          bead_id: input.bead_id,
          kind: input.kind,
          tuple: input.item ? formatAttemptTuple(input.item) : ''
        },
        transport: (payload) =>
          sendCas(
            'worker-attempt-resume',
            {
              attempt_id: input.attempt_id,
              ...(input.base_payload || {}),
              ...payload
            },
            input.root_dir,
            { retry: false }
          )
      });
      deps.onChange();
    },

    /**
     * `[세션에서 해결]` (UI-jw27 §4).
     *
     * @param {string} bead_id
     * @param {string} root_dir
     */
    async resolve(bead_id, root_dir) {
      if (resolve_pending.has(bead_id)) {
        return;
      }
      resolve_pending.add(bead_id);
      deps.onChange();
      try {
        const res = await sendCas(
          'worker-resolve-in-session',
          { bead_id },
          root_dir,
          { retry: false }
        );
        if (res?.session === 'already_running') {
          deps.toast(`이미 열려 있습니다 · ${res.tmux_window || '?'}`, 'info');
        } else if (res && res.launched !== true && !res.conflict) {
          deps.toast(`세션 기동 실패: ${res?.reason || 'unknown'}`, 'error');
        } else if (res && res.mode !== 'fork' && res.mode !== 'resume') {
          deps.toast(
            `${typeof res.runner === 'string' ? res.runner : 'claude'} 새 세션으로 시작 (${res.fallback_reason || 'unknown'})`,
            'success'
          );
        }
      } finally {
        resolve_pending.delete(bead_id);
        deps.onChange();
      }
    },

    /**
     * `[워커로 이어가기]` (UI-nuwy §3.6) — the server reserves or resumes.
     *
     * @param {string} bead_id
     * @param {string} attempt_id
     * @param {string} root_dir
     */
    async handoff(bead_id, attempt_id, root_dir) {
      if (!attempt_id || handoff_pending.has(bead_id)) {
        return;
      }
      handoff_pending.add(bead_id);
      deps.onChange();
      try {
        const res = await sendCas(
          'worker-conversation-handoff',
          { bead_id, attempt_id },
          root_dir,
          { retry: false }
        );
        if (res && res.conflict) {
          deps.toast(
            '큐가 바뀌어 클릭이 적용되지 않았습니다 — 다시 눌러주세요',
            'error',
            2800
          );
        } else if (res && !res.resumed) {
          deps.toast(
            `워커로 이어가기 거부: ${res.reason || 'unknown'}`,
            'error',
            2800
          );
        } else if (res && res.pending) {
          deps.toast(
            '대화 창을 닫는 중 — 창이 닫히면 Worker가 이어갑니다',
            'info',
            2800
          );
        }
      } finally {
        handoff_pending.delete(bead_id);
        deps.onChange();
      }
    },

    /**
     * `[폐기]` — destructive; the state-specific sentence is confirmed first
     * (a retry of a failed operation id is already an explicit decision).
     *
     * @param {{ bead_id: string, root_dir: string, attempt_id?: string, operation_id?: string, confirmation?: string }} input
     */
    async discard(input) {
      const confirmation =
        input.confirmation === 'merged' ? 'merged' : 'unmerged';
      if (
        !input.operation_id &&
        !deps.confirm(discardConfirmationMessage(input.bead_id, confirmation))
      ) {
        return;
      }
      const res = await sendCas(
        'worker-discard',
        {
          bead_id: input.bead_id,
          ...(input.attempt_id ? { attempt_id: input.attempt_id } : {}),
          ...(input.operation_id ? { operation_id: input.operation_id } : {})
        },
        input.root_dir
      );
      if (res && res.discarded === true) {
        deps.toast(discardCompletionMessage(res), 'success', 5000);
      } else if (res && res.reason) {
        deps.toast(`폐기 실패: ${res.reason}`, 'error', 2800);
      } else if (res && res.accepted && res.pending === 'merged_revert') {
        deps.toast('revert PR 대기 상태로 전환했습니다', 'success', 2400);
      } else if (res && res.accepted) {
        deps.toast(`폐기 진행: ${res.phase || '백업 중'}`, 'success', 2400);
      } else if (res && !res.conflict) {
        deps.toast('폐기 거부: unknown', 'error', 2800);
      }
      deps.onChange();
    },

    /**
     * `[폐기 포기]` — destructive, confirmed.
     *
     * @param {{ bead_id: string, root_dir: string, operation_id: string, operation_kind?: string, last_error?: string }} input
     */
    async abandonDiscard(input) {
      const operation = {
        kind: input.operation_kind || '',
        last_error: input.last_error || ''
      };
      if (
        !input.operation_id ||
        !deps.confirm(
          discardAbandonConfirmationMessage(input.bead_id, operation)
        )
      ) {
        return;
      }
      const res = await sendCas(
        'worker-discard-abandon',
        { bead_id: input.bead_id, operation_id: input.operation_id },
        input.root_dir
      );
      if (res && res.abandoned === true) {
        deps.toast(discardAbandonCompletionMessage(operation), 'success', 5000);
      } else if (res && res.reason) {
        deps.toast(`폐기 포기 거부: ${res.reason}`, 'error', 2800);
      } else if (res && !res.conflict) {
        deps.toast('폐기 포기 거부: unknown', 'error', 2800);
      }
      deps.onChange();
    },

    /**
     * `[머지]` (or `[이어하기 선택]` / `[정리 재시도]` on the same button).
     *
     * @param {string} bead_id
     * @param {string} root_dir
     */
    async merge(bead_id, root_dir) {
      const action = queuedContinuation(root_dir, bead_id);
      if (action?.mismatch && action.continuation === null) {
        await decideQueuedContinuation(root_dir, bead_id, action.mismatch);
      } else {
        await sendCas('worker-merge-queue-add', { bead_id }, root_dir);
      }
      deps.onChange();
    },

    /**
     * `[취소]` — give up one waiting place in the merge queue.
     *
     * @param {string} bead_id
     * @param {string} root_dir
     */
    async mergeCancel(bead_id, root_dir) {
      const res = await sendCas(
        'worker-merge-queue-remove',
        { bead_id },
        root_dir
      );
      if (
        res &&
        !res.conflict &&
        !res.applied &&
        res.reason === 'merge_active'
      ) {
        deps.toast('머지 진행 중 — 취소할 수 없습니다', 'error', 2400);
      }
      deps.onChange();
    },

    /**
     * `[일괄 머지]` — one request per repository, each with its own revision.
     *
     * @param {string[]} root_dirs
     */
    async mergeAll(root_dirs) {
      for (const root_dir of root_dirs) {
        await sendCas('worker-merge-queue-add-all', {}, root_dir);
      }
      deps.onChange();
    },

    /**
     * `[일괄 머지 중단]` — ONE request per repository (`all: true`).
     *
     * @param {string[]} root_dirs
     */
    async mergeStopAll(root_dirs) {
      for (const root_dir of root_dirs) {
        await sendCas('worker-merge-queue-remove', { all: true }, root_dir);
      }
      deps.onChange();
    },

    /**
     * @param {string} root_dir
     * @param {boolean} on
     */
    async autoMerge(root_dir, on) {
      const res = await sendCas('worker-merge-auto-toggle', { on }, root_dir);
      if (res && !res.conflict) {
        deps.toast(
          on
            ? '자동 머지 켜짐 — 자격이 생기는 PR을 계속 머지합니다'
            : '자동 머지 꺼짐 — 대기 항목을 비웠습니다',
          on ? 'success' : 'info',
          2400
        );
      }
      deps.onChange();
    },

    /**
     * @param {string} root_dir
     * @param {boolean} on
     */
    async automation(root_dir, on) {
      try {
        await sendCas('worker-automation-toggle', { on }, root_dir);
      } catch (error) {
        deps.toast(`설정 저장 실패: ${errorMessage(error)}`, 'error', 4000);
      }
      deps.onChange();
    },

    /**
     * @param {string} root_dir
     * @param {number} slots
     */
    async setSlots(root_dir, slots) {
      if (!Number.isFinite(slots)) {
        return;
      }
      await sendCas(
        'worker-queue-set-slots',
        { slots: Math.max(1, Math.floor(slots)) },
        root_dir
      );
      deps.onChange();
    },

    /**
     * @param {string} root_dir
     * @param {number} count
     */
    async setSerialLanes(root_dir, count) {
      if (!Number.isInteger(count) || count < 1 || count > 5) {
        return;
      }
      const before = deps.queueOf(root_dir);
      const truncated = (
        Array.isArray(before?.serial_lanes) ? before.serial_lanes : []
      )
        .slice(count)
        .reduce(
          (/** @type {number} */ sum, /** @type {any} */ lane) =>
            sum + (Array.isArray(lane?.entries) ? lane.entries.length : 0),
          0
        );
      const res = await sendCas(
        'worker-queue-set-serial-lane-count',
        { count },
        root_dir
      );
      if (res && res.applied && truncated > 0) {
        deps.toast(`직렬 레인 축소 — ${truncated}개 항목이 병렬 대기로 이동`);
      }
      deps.onChange();
    },

    /**
     * REVISE parking disposition (UI-hs11 §3.5).
     *
     * @param {'worker-revise-fix'|'worker-revise-approve'} type
     * @param {string} bead_id
     * @param {string} root_dir
     */
    async revise(type, bead_id, root_dir) {
      if (revise_pending.has(bead_id)) {
        return;
      }
      revise_pending.add(bead_id);
      deps.onChange();
      /** @type {any} */
      let res = null;
      try {
        res = await sendCas(type, { bead_id }, root_dir);
        if (type === 'worker-revise-fix') {
          res = await resolveContinuationMismatch(
            res,
            (continuation, decision_token) =>
              sendCas(
                type,
                { bead_id, continuation, decision_token },
                root_dir,
                {
                  retry: false
                }
              ),
            {
              refresh: () =>
                sendCas(type, { bead_id }, root_dir, { retry: false })
            }
          );
        }
      } finally {
        revise_pending.delete(bead_id);
        deps.onChange();
      }
      if (!res || res.conflict) {
        return;
      }
      if (res.ok) {
        deps.toast(
          type === 'worker-revise-fix'
            ? '처분 세션을 띄웠습니다 — 수리 후 구현이 재디스패치됩니다'
            : '델타 승인 완료 — 영수증 갱신 + 파킹 해제',
          'success',
          2800
        );
        return;
      }
      deps.toast(`처분 거부: ${res.reason || ''}`, 'error', 3000);
    },

    /**
     * An external-wait button (UI-r6xq §4.4) — confirm when it carries one.
     *
     * @param {HTMLElement} button
     */
    async externalWait(button) {
      const root_dir = button.dataset.rootDir || '';
      const key = `${root_dir}:${button.dataset.waitId || ''}`;
      if (!root_dir || external_pending.has(key)) {
        return;
      }
      external_pending.add(key);
      try {
        await runExternalWaitAction(button, {
          transport: deps.send,
          confirm: deps.confirm,
          adopt: (res) => adoptReply(root_dir, res)
        });
      } finally {
        external_pending.delete(key);
        deps.onChange();
      }
    },

    /**
     * `worker-cleanup-retry` — the timeline drawer's `[정리 재시도]`.
     *
     * @param {string} bead_id
     * @param {string} root_dir
     */
    async cleanupRetry(bead_id, root_dir) {
      const res = await sendCas('worker-cleanup-retry', { bead_id }, root_dir, {
        retry: false
      });
      if (res && !res.retried && !res.conflict && res.reason) {
        deps.toast(`정리 재시도 거부: ${res.reason}`, 'error', 2400);
      }
      deps.onChange();
    },

    /**
     * `worker-repo-operation-dismiss` — the timeline's `기록 닫기`.
     *
     * @param {string} operation_id
     * @param {string} root_dir
     */
    async dismissRepoOperation(operation_id, root_dir) {
      if (!operation_id) {
        return;
      }
      const res = await sendPlain(
        'worker-repo-operation-dismiss',
        { operation_id },
        root_dir
      );
      if (res && res.ok === false) {
        deps.toast(`기록 닫기 거부: ${res.reason || ''}`, 'error', 3000);
      }
      deps.onChange();
    }
  };
}
