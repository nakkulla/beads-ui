/**
 * 여러 저장소 설정 창의 `계정` 탭 — 일괄 편집 폼의 계획과 실행 (UI-nu43 §4.2).
 *
 * 폼은 바꾼 필드만 담는 `edit`를 넘긴다. 저장소마다 실행 계정 값이 있을 때만
 * `set-workspace-accounts`를, 러너 patch가 있을 때만 그 러너의 한도 정책 요청을
 * 이 순서로 보낸다. 계정 쓰기가 실패하면 그 저장소의 정책 요청은 보내지 않는다 —
 * 계정이 안 옮겨졌는데 허용 목록만 옮기지 않는다. 서버 op는 그대로다.
 */
import { formatBulkResult, messageOf } from './bulk-preset-apply.js';

export { formatBulkResult, messageOf };

/**
 * @typedef {import('./bulk-preset-apply.js').BulkResult} BulkResult
 */

/**
 * @typedef {Object} LimitPatch
 * @property {'wait'|'switch'} mode
 * @property {string[]} accounts
 * @property {number|null} preempt_pct
 */

/**
 * @typedef {'claude_account'|'codex_account'} AccountValueKey
 */

/**
 * @typedef {Object} BulkAccountEdit
 * @property {Partial<Record<AccountValueKey, string|null>>} values - 바꾼 실행
 * 계정 키만 (changed keys). `null`은 "기본값 사용"(키 삭제)이다.
 * @property {{ claude?: Partial<LimitPatch>, codex?: Partial<LimitPatch> }} patches -
 * 러너별로 바꾼 한도 정책 필드만 (per runner).
 */

/**
 * @typedef {Object} BulkAccountTarget
 * @property {string} root_dir
 * @property {string} name
 * @property {number} revision - 첫 정책 요청의 `expected_revision`.
 * @property {Partial<Record<AccountValueKey, string|null>>} values - `set-workspace-accounts` body.
 * @property {{ claude?: Partial<LimitPatch>, codex?: Partial<LimitPatch> }} patches
 */

/**
 * @typedef {Object} BulkAccountPlan
 * @property {BulkAccountTarget[]} targets
 * @property {string|null} disabled_reason
 */

/** 폼이 쓸 수 있는 실행 계정 kv 키 — pane의 `ACCOUNT_ROW_KEYS`와 같은 두 키다. */
export const ACCOUNT_VALUE_KEYS = /** @type {const} */ ([
  'claude_account',
  'codex_account'
]);

/**
 * Request order — claude 먼저, codex 나중. 두 번째 요청은 첫 응답이 실어 온
 * revision을 쓴다.
 *
 * @type {ReadonlyArray<'claude'|'codex'>}
 */
export const LIMIT_RUNNERS = ['claude', 'codex'];

/** 한도 정책 patch가 실을 수 있는 필드. */
const LIMIT_PATCH_KEYS = ['mode', 'accounts', 'preempt_pct'];

/** 계정 kv op. */
export const ACCOUNTS_OP = 'set-workspace-accounts';

/** 러너별 한도 정책 op. */
export const LIMIT_POLICY_OP = 'worker-provider-limit-policy-set';

/** Disabled reason: 선제 전환 기준이 범위 밖일 때. */
export const PREEMPT_RANGE_REASON = '선제 전환 기준은 1–99 정수입니다';

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {any} res
 * @returns {boolean}
 */
function isError(res) {
  return isRecord(res) && res.error !== undefined && res.error !== null;
}

/**
 * @param {Iterable<string>|Set<string>} selected_roots
 * @param {string} root_dir
 * @returns {boolean}
 */
function isSelected(selected_roots, root_dir) {
  if (selected_roots instanceof Set) {
    return selected_roots.has(root_dir);
  }
  for (const value of selected_roots || []) {
    if (value === root_dir) {
      return true;
    }
  }
  return false;
}

/**
 * Whether a preemptive threshold is one the server accepts: `null` (off) or an
 * integer 1–99.
 *
 * @param {unknown} value
 * @returns {boolean}
 */
export function isValidPreemptPct(value) {
  return (
    value === null ||
    (typeof value === 'number' &&
      Number.isInteger(value) &&
      value >= 1 &&
      value <= 99)
  );
}

/**
 * The changed fields of one runner patch, with the allow list reduced to
 * whitespace-free strings. `null` when the runner changes nothing.
 *
 * @param {unknown} raw
 * @returns {Partial<LimitPatch>|null}
 */
function changedPatch(raw) {
  if (!isRecord(raw)) {
    return null;
  }
  /** @type {Partial<LimitPatch>} */
  const patch = {};
  if (raw.mode === 'wait' || raw.mode === 'switch') {
    patch.mode = raw.mode;
  }
  if (Array.isArray(raw.accounts)) {
    patch.accounts = raw.accounts.filter(
      (/** @type {unknown} */ key) =>
        typeof key === 'string' && key.length > 0 && !/\s/.test(key)
    );
  }
  if (Object.hasOwn(raw, 'preempt_pct')) {
    patch.preempt_pct = raw.preempt_pct;
  }
  return Object.keys(patch).length > 0 ? patch : null;
}

/**
 * The changed account keys of an edit. Only the two known keys pass, and only
 * with a non-empty string or `null`.
 *
 * @param {unknown} raw
 * @returns {Partial<Record<AccountValueKey, string|null>>}
 */
function changedValues(raw) {
  /** @type {Partial<Record<AccountValueKey, string|null>>} */
  const values = {};
  if (!isRecord(raw)) {
    return values;
  }
  for (const key of ACCOUNT_VALUE_KEYS) {
    if (!Object.hasOwn(raw, key)) {
      continue;
    }
    const value = raw[key];
    if (value === null || (typeof value === 'string' && value.length > 0)) {
      values[key] = value;
    }
  }
  return values;
}

/**
 * Count of changed fields (§3.4 `바꿀 항목 k개`). 러너별 필드는 따로 센다.
 *
 * @param {BulkAccountEdit|null|undefined} edit
 * @returns {number}
 */
export function countEditFields(edit) {
  let count = Object.keys(changedValues(edit?.values)).length;
  for (const runner of LIMIT_RUNNERS) {
    const patch = changedPatch(edit?.patches?.[runner]);
    if (patch) {
      count += LIMIT_PATCH_KEYS.filter((key) =>
        Object.hasOwn(patch, key)
      ).length;
    }
  }
  return count;
}

/**
 * Build the target list and disabled reason — 대상은 선택한 행 전부다.
 *
 * @param {Object} input
 * @param {Array<Record<string, any>>} input.rows - 보이는 저장소를 모니터 행
 * 순서대로, `adopted`를 덮은 상태로.
 * @param {Iterable<string>|Set<string>} input.selected_roots
 * @param {BulkAccountEdit} input.edit
 * @param {boolean} [input.running]
 * @returns {BulkAccountPlan}
 */
export function planBulkAccountApply({
  rows,
  selected_roots,
  edit,
  running = false
}) {
  const values = changedValues(edit?.values);
  /** @type {{ claude?: Partial<LimitPatch>, codex?: Partial<LimitPatch> }} */
  const patches = {};
  for (const runner of LIMIT_RUNNERS) {
    const patch = changedPatch(edit?.patches?.[runner]);
    if (patch) {
      patches[runner] = patch;
    }
  }
  const selected_rows = (Array.isArray(rows) ? rows : []).filter(
    (row) => isRecord(row) && isSelected(selected_roots, String(row.root_dir))
  );
  const targets = selected_rows.map((row) => ({
    root_dir: String(row.root_dir),
    name: typeof row.name === 'string' ? row.name : String(row.root_dir),
    revision: typeof row.revision === 'number' ? row.revision : 0,
    values: { ...values },
    patches: copyPatches(patches)
  }));
  const touches_policy = Object.keys(patches).length > 0;
  const preempt_invalid = LIMIT_RUNNERS.some((runner) => {
    const patch = patches[runner];
    return (
      !!patch &&
      Object.hasOwn(patch, 'preempt_pct') &&
      !isValidPreemptPct(patch.preempt_pct)
    );
  });
  /** @type {string|null} */
  let disabled_reason = null;
  if (running === true) {
    disabled_reason = '적용 중입니다';
  } else if (targets.length === 0) {
    disabled_reason = '적용할 저장소를 고르세요';
  } else if (countEditFields({ values, patches }) === 0) {
    disabled_reason = '바꿀 항목을 고르세요';
  } else if (preempt_invalid) {
    disabled_reason = PREEMPT_RANGE_REASON;
  } else if (
    touches_policy &&
    !selected_rows.some((row) => Object.hasOwn(row, 'provider_limit_policy'))
  ) {
    disabled_reason = '서버가 한도 정책을 싣지 않습니다';
  }
  return { targets, disabled_reason };
}

/**
 * @param {{ claude?: Partial<LimitPatch>, codex?: Partial<LimitPatch> }} patches
 * @returns {{ claude?: Partial<LimitPatch>, codex?: Partial<LimitPatch> }}
 */
function copyPatches(patches) {
  /** @type {{ claude?: Partial<LimitPatch>, codex?: Partial<LimitPatch> }} */
  const copy = {};
  for (const runner of LIMIT_RUNNERS) {
    const patch = patches[runner];
    if (patch) {
      copy[runner] = Array.isArray(patch.accounts)
        ? { ...patch, accounts: [...patch.accounts] }
        : { ...patch };
    }
  }
  return copy;
}

/**
 * @param {(root_dir: string, queue: any) => void} adopt
 * @param {string} root_dir
 * @param {any} res
 * @returns {number|null} 응답이 실어 온 최신 revision.
 */
function adoptQueue(adopt, root_dir, res) {
  if (isRecord(res) && isRecord(res.queue)) {
    adopt(root_dir, res.queue);
    return typeof res.queue.revision === 'number' ? res.queue.revision : null;
  }
  return null;
}

/**
 * One runner의 정책 요청. `conflict:true`면 응답 revision으로 한 번
 * 재시도한다 — pane `sendQueueCas`가 저장소를 지정했을 때와 같은 규칙이다.
 *
 * @param {Object} input
 * @param {string} input.root_dir
 * @param {'claude'|'codex'} input.runner
 * @param {Partial<LimitPatch>} input.patch
 * @param {number} input.revision
 * @param {(type: string, payload: Record<string, unknown>) => Promise<any>} input.send
 * @param {(root_dir: string, queue: any) => void} input.adopt
 * @param {(() => boolean)|undefined} input.isCancelled
 * @returns {Promise<{ applied: boolean, revision: number }>} Cancelled after
 * the first response, the retry is not sent and that response is judged.
 */
async function applyLimitPolicy({
  root_dir,
  runner,
  patch,
  revision,
  send,
  adopt,
  isCancelled
}) {
  let current = revision;
  let res = await send(LIMIT_POLICY_OP, {
    root_dir,
    runner,
    patch,
    expected_revision: current
  });
  current = adoptQueue(adopt, root_dir, res) ?? current;
  if (
    isCancelled?.() !== true &&
    !isError(res) &&
    isRecord(res) &&
    res.conflict === true
  ) {
    res = await send(LIMIT_POLICY_OP, {
      root_dir,
      runner,
      patch,
      expected_revision: current
    });
    current = adoptQueue(adopt, root_dir, res) ?? current;
  }
  return {
    applied: !isError(res) && isRecord(res) && res.applied === true,
    revision: current
  };
}

/**
 * Sequential 적용 — 선택한 저장소마다 폼의 변경을 쓴다. 저장소 사이에 공유되는
 * revision이 없으므로 하나가 실패해도 다음 대상으로 항상 계속한다.
 *
 * @param {Object} input
 * @param {BulkAccountTarget[]} input.targets
 * @param {(type: string, payload: Record<string, unknown>) => Promise<any>} input.send
 * @param {(root_dir: string, queue: any) => void} input.adopt
 * @param {(progress: { done: number, total: number, results: BulkResult[] }) => void} [input.onProgress]
 * @param {() => boolean} [input.isCancelled]
 * @returns {Promise<BulkResult[]>}
 */
export async function runBulkAccountApply({
  targets,
  send,
  adopt,
  onProgress,
  isCancelled
}) {
  /** @type {BulkResult[]} */
  const results = [];
  const total = targets.length;
  for (const target of targets) {
    if (isCancelled?.() === true) {
      return results;
    }
    const result = await applyOne(target, send, adopt, isCancelled);
    results.push(result);
    onProgress?.({ done: results.length, total, results });
  }
  return results;
}

/**
 * The account step of one 저장소. `null` when it succeeded, else the failure
 * sentence.
 *
 * @param {BulkAccountTarget} target
 * @param {(type: string, payload: Record<string, unknown>) => Promise<any>} send
 * @returns {Promise<string|null>}
 */
async function applyAccounts(target, send) {
  try {
    const res = await send(ACCOUNTS_OP, {
      root_dir: target.root_dir,
      values: { ...target.values }
    });
    if (isError(res) || !isRecord(res)) {
      return isRecord(res) ? messageOf(res) : '요청이 처리되지 않았습니다';
    }
    if (res.state === 'unusable') {
      return '실행 계정 기본값이 해석되지 않습니다';
    }
    return null;
  } catch (err) {
    return messageOf(err);
  }
}

/**
 * Requests for 한 저장소와 그 판정 (§4.2). 보낸 요청이 모두 성공하면
 * `applied`, 하나도 성공하지 못하면 `failed`, 일부만이면 `partial`이다. 요청
 * 사이에 취소되면 남은 요청은 보내지 않고 미적용으로 센다 — 그 저장소가
 * 쓰였는지는 호출자의 패널 재읽기가 알아야 한다.
 *
 * @param {BulkAccountTarget} target
 * @param {(type: string, payload: Record<string, unknown>) => Promise<any>} send
 * @param {(root_dir: string, queue: any) => void} adopt
 * @param {(() => boolean)|undefined} isCancelled
 * @returns {Promise<BulkResult>}
 */
async function applyOne(target, send, adopt, isCancelled) {
  const base = { root_dir: target.root_dir, name: target.name };
  let sent = 0;
  let succeeded = 0;
  let unsent = 0;
  /** @type {string[]} */
  const failed_parts = [];
  if (Object.keys(target.values).length > 0) {
    sent += 1;
    const failure = await applyAccounts(target, send);
    if (failure !== null) {
      // 계정이 안 옮겨졌는데 허용 목록만 옮기지 않는다 — 정책 요청 0회.
      return { ...base, state: 'failed', detail: failure };
    }
    succeeded += 1;
  }
  let revision = target.revision;
  for (const runner of LIMIT_RUNNERS) {
    const patch = target.patches[runner];
    if (!patch) {
      continue;
    }
    if (isCancelled?.() === true) {
      unsent += 1;
      failed_parts.push(`${runner} 한도 정책`);
      continue;
    }
    sent += 1;
    try {
      const outcome = await applyLimitPolicy({
        root_dir: target.root_dir,
        runner,
        patch,
        revision,
        send,
        adopt,
        isCancelled
      });
      revision = outcome.revision;
      if (outcome.applied) {
        succeeded += 1;
      } else {
        failed_parts.push(`${runner} 한도 정책`);
      }
    } catch {
      failed_parts.push(`${runner} 한도 정책`);
    }
  }
  if (succeeded === sent && unsent === 0) {
    return { ...base, state: 'applied', detail: '' };
  }
  const detail = `${failed_parts.join('·')} 미적용`;
  return succeeded === 0
    ? { ...base, state: 'failed', detail }
    : { ...base, state: 'partial', detail };
}
