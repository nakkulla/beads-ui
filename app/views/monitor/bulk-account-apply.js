/**
 * 모니터 `⚙` 패널의 `여러 저장소에 적용` — 계정 절의 계획과 실행 (UI-8ncz §4.2).
 *
 * 열린 저장소의 계정 구역 값을 원본으로 삼아 선택한 다른 저장소에 그대로
 * 복사한다. 저장소마다 `set-workspace-accounts` → claude 한도 정책 → codex 한도
 * 정책을 이 순서로 보낸다. 계정 쓰기가 실패하면 정책은 보내지 않는다 — 계정이
 * 안 옮겨졌는데 허용 목록만 옮기지 않는다.
 */
import { formatBulkResult, messageOf } from './bulk-preset-apply.js';

export { formatBulkResult, messageOf };

/**
 * @typedef {import('./bulk-preset-apply.js').BulkResult} BulkResult
 */

/**
 * @typedef {Object} LimitPatch
 * @property {string} mode
 * @property {string[]} accounts
 * @property {number|null} preempt_pct
 */

/**
 * @typedef {Object} BulkAccountTarget
 * @property {string} root_dir
 * @property {string} name
 * @property {number} revision - 첫 정책 요청의 `expected_revision`.
 * @property {Record<string, string|null>} values - `set-workspace-accounts` body.
 * @property {{ claude: LimitPatch, codex: LimitPatch }} patches
 */

/**
 * @typedef {Object} BulkAccountPlan
 * @property {BulkAccountTarget[]} targets
 * @property {string|null} disabled_reason
 */

/** 복사하는 실행 계정 kv 키 — pane의 `ACCOUNT_ROW_KEYS`와 같은 두 키다. */
export const ACCOUNT_VALUE_KEYS = ['claude_account', 'codex_account'];

/**
 * Request order — claude 먼저, codex 나중. 두 번째 요청은 첫 응답이 실어 온
 * revision을 쓴다.
 *
 * @type {ReadonlyArray<'claude'|'codex'>}
 */
export const LIMIT_RUNNERS = ['claude', 'codex'];

/** 계정 kv op. */
export const ACCOUNTS_OP = 'set-workspace-accounts';

/** 러너별 한도 정책 op. */
export const LIMIT_POLICY_OP = 'worker-provider-limit-policy-set';

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
 * Normalization은 pane `limitPolicyOf`와 같은 규칙을 쓴다: 모드 enum 밖은
 * `switch`, 허용 목록은 공백 없는 문자열만, 임계는 1–99 정수 외 `null`.
 *
 * @param {unknown} raw
 * @returns {LimitPatch}
 */
export function normalizeLimitPatch(raw) {
  const source = isRecord(raw) ? raw : null;
  const accounts = Array.isArray(source?.accounts)
    ? source.accounts.filter(
        (/** @type {unknown} */ key) =>
          typeof key === 'string' && key.length > 0 && !/\s/.test(key)
      )
    : [];
  const pct = source?.preempt_pct;
  return {
    mode: source?.mode === 'wait' ? 'wait' : 'switch',
    accounts,
    preempt_pct:
      typeof pct === 'number' && Number.isInteger(pct) && pct >= 1 && pct <= 99
        ? pct
        : null
  };
}

/**
 * Copy source의 두 kv 키를 그대로 싣는다 — 카탈로그 라벨은 덱이 붙인다. 원본에
 * 없는 키는 `null`("기본값 사용")이다.
 *
 * @param {{ values?: Record<string, string> }|null} source_accounts
 * @returns {Record<string, string|null>}
 */
export function accountValuesOf(source_accounts) {
  /** @type {Record<string, string|null>} */
  const values = {};
  const source = isRecord(source_accounts?.values)
    ? source_accounts.values
    : {};
  for (const key of ACCOUNT_VALUE_KEYS) {
    const value = source[key];
    values[key] = typeof value === 'string' && value.length > 0 ? value : null;
  }
  return values;
}

/**
 * Plan — 대상 목록과 비활성 사유를 계산한다. 복사 원본 저장소는 대상이 아니고
 * 선택 수에도 세지 않는다 (§3.2).
 *
 * @param {Object} input
 * @param {Array<Record<string, any>>} input.rows - 보이는 저장소를 덱 타일
 * 순서대로, `adopted`를 덮은 상태로.
 * @param {Iterable<string>|Set<string>} input.selected_roots
 * @param {string} input.source_root - 지금 `⚙`이 열려 있어 값을 복사해 갈
 * 저장소의 `root_dir`.
 * @param {{ state: string, values: Record<string, string>, pending: boolean }|null} input.source_accounts
 * @param {unknown} input.source_policy - 원본 행의 `provider_limit_policy`.
 * @param {boolean} [input.running]
 * @returns {BulkAccountPlan}
 */
export function planBulkAccountApply({
  rows,
  selected_roots,
  source_root,
  source_accounts,
  source_policy,
  running = false
}) {
  const values = accountValuesOf(source_accounts);
  const patches = {
    claude: normalizeLimitPatch(
      isRecord(source_policy) ? source_policy.claude : null
    ),
    codex: normalizeLimitPatch(
      isRecord(source_policy) ? source_policy.codex : null
    )
  };
  const targets = (Array.isArray(rows) ? rows : [])
    .filter(
      (row) =>
        isRecord(row) &&
        String(row.root_dir) !== source_root &&
        isSelected(selected_roots, String(row.root_dir))
    )
    .map((row) => ({
      root_dir: String(row.root_dir),
      name: typeof row.name === 'string' ? row.name : String(row.root_dir),
      revision: typeof row.revision === 'number' ? row.revision : 0,
      values: { ...values },
      patches: {
        claude: { ...patches.claude, accounts: [...patches.claude.accounts] },
        codex: { ...patches.codex, accounts: [...patches.codex.accounts] }
      }
    }));
  /** @type {string|null} */
  let disabled_reason = null;
  if (running === true) {
    disabled_reason = '적용 중입니다';
  } else if (targets.length === 0) {
    disabled_reason = '적용할 저장소를 고르세요';
  } else if (source_accounts?.state === 'unusable') {
    disabled_reason = '이 저장소의 실행 계정 기본값을 해석할 수 없습니다';
  } else if (!isRecord(source_policy)) {
    disabled_reason = '서버가 한도 정책을 싣지 않습니다';
  } else if (source_accounts?.pending === true) {
    disabled_reason = '저장 확인을 기다리는 중';
  }
  return { targets, disabled_reason };
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
 * @param {LimitPatch} input.patch
 * @param {number} input.revision
 * @param {(type: string, payload: Record<string, unknown>) => Promise<any>} input.send
 * @param {(root_dir: string, queue: any) => void} input.adopt
 * @returns {Promise<{ applied: boolean, revision: number }>}
 */
async function applyLimitPolicy({
  root_dir,
  runner,
  patch,
  revision,
  send,
  adopt
}) {
  let current = revision;
  let res = await send(LIMIT_POLICY_OP, {
    root_dir,
    runner,
    patch,
    expected_revision: current
  });
  current = adoptQueue(adopt, root_dir, res) ?? current;
  if (!isError(res) && isRecord(res) && res.conflict === true) {
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
 * Sequential 복사 — 선택한 저장소마다 원본의 계정 설정을 옮긴다. 저장소 사이에
 * 공유되는 revision이 없으므로 하나가 실패해도 다음 대상으로 항상 계속한다.
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
    results.push(await applyOne(target, send, adopt));
    onProgress?.({ done: results.length, total, results });
  }
  return results;
}

/**
 * Three requests for 한 저장소와 그 판정 (§4.2 4). 계정 쓰기가 실패하면
 * `failed`이고 정책 요청은 0회다.
 *
 * @param {BulkAccountTarget} target
 * @param {(type: string, payload: Record<string, unknown>) => Promise<any>} send
 * @param {(root_dir: string, queue: any) => void} adopt
 * @returns {Promise<BulkResult>}
 */
async function applyOne(target, send, adopt) {
  const base = { root_dir: target.root_dir, name: target.name };
  try {
    const res = await send(ACCOUNTS_OP, {
      root_dir: target.root_dir,
      values: target.values
    });
    if (isError(res) || !isRecord(res)) {
      return {
        ...base,
        state: 'failed',
        detail: isRecord(res) ? messageOf(res) : '요청이 처리되지 않았습니다'
      };
    }
    if (res.state === 'unusable') {
      return {
        ...base,
        state: 'failed',
        detail: '실행 계정 기본값이 해석되지 않습니다'
      };
    }
  } catch (err) {
    return { ...base, state: 'failed', detail: messageOf(err) };
  }
  /** @type {string[]} */
  const failed_runners = [];
  let revision = target.revision;
  for (const runner of LIMIT_RUNNERS) {
    try {
      const outcome = await applyLimitPolicy({
        root_dir: target.root_dir,
        runner,
        patch: target.patches[runner],
        revision,
        send,
        adopt
      });
      revision = outcome.revision;
      if (!outcome.applied) {
        failed_runners.push(runner);
      }
    } catch {
      failed_runners.push(runner);
    }
  }
  return failed_runners.length === 0
    ? { ...base, state: 'applied', detail: '' }
    : {
        ...base,
        state: 'partial',
        detail: `${failed_runners.join('·')} 한도 정책 미적용`
      };
}
