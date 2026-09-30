/**
 * Constants and pure helpers of the bulk settings pane (`bulk-pane.js`), moved
 * out when the pane was split into its state machine and its templates
 * (UI-dbn6). Nothing here holds state.
 *
 * @typedef {import('../../model/bulk-preset-apply.js').BulkResult} BulkResult
 */
import { messageOf } from '../../model/bulk-preset-apply.js';
import { WORKFLOW_MODES } from '../../model/session-model.js';
import { bulkFormRowKeysFor } from './bulk-worker-form.js';

/** Select value for `기본값 사용` (sent as `null`). */
export const USE_DEFAULT = '__bulk_use_default__';
/** Default preemptive threshold the number box starts from. */
export const DEFAULT_PREEMPT_PCT = '80';
/** Loading copy while the monitor rows have not arrived. */
export const ROWS_LOADING = '저장소 목록을 불러오는 중입니다';
/** The sentinel a `갈림 — 유지`·`미확인 — 유지` option carries (§3). */
export const HOLD = '__bulk_hold__';
/** What that option is called, by the observation that put it there. */
export const HOLD_LABEL = { mixed: '갈림 — 유지', pending: '미확인 — 유지' };
/** The one-line contract every tab carries under `적용 대상` (§3.2). */
export const APPLY_BANNER =
  '화면에 값이 선 행은 손대지 않아도 그대로 쓰입니다 — 갈림·미확인으로 남은 행만 저장소별 현재 값을 유지합니다.';
/**
 * Hint next to one tab's preset select (§4.1). The count is that tab's own row
 * count — a preset fills the tab it was chosen on and nothing else (§6.2).
 *
 * @param {'general'|'quick_fix'} profile
 * @returns {string}
 */
export function presetHintFor(profile) {
  return `고르면 아래 ${bulkFormRowKeysFor(profile).length}행이 그 프리셋 값으로 채워집니다`;
}

/** The preset profile each bulk tab edits (§6.2). */
export const SECTION_PROFILE = Object.freeze({
  worker: 'general',
  quick_fix: 'quick_fix'
});
/** Copy for a runner whose account list could not be read. */
export const CATALOG_MISSING = '계정 목록을 불러올 수 없습니다';
/** What the read-only `적용된 프리셋` line says for an id nothing names (§4.1). */
export const DELETED_PRESET = '삭제된 프리셋';
/** What that line says for a repo with no record at all. */
export const NO_APPLIED_PRESET = '없음';
/** Copy a server with no quick_fix lane locks that whole tab with (§6.1). */
export const QUICK_FIX_UNSUPPORTED =
  '서버가 quick_fix 레인을 지원하지 않습니다';
/**
 * What every preset bar says about the list it edits: one list lives on the
 * server, so a save or a delete here is seen by every workspace (§6.1).
 */
export const PRESET_LIST_GLOBAL =
  '프리셋 목록은 서버 전역이라 저장·삭제가 모든 저장소의 목록을 바꿉니다';

/** @type {ReadonlyArray<'claude'|'codex'>} */
export const RUNNERS = ['claude', 'codex'];

/** @type {ReadonlyArray<[ 'claude_account'|'codex_account', string, 'claude'|'codex' ]>} */
export const ACCOUNT_FIELDS = [
  ['claude_account', 'Claude', 'claude'],
  ['codex_account', 'Codex', 'codex']
];

/**
 * The three rows the `세션` tab draws (§5). `base_sync_accept_local_commits` is
 * a contract `bool` whose stored `false` and absence are the same fact, so it
 * carries two values instead of a `기본값 사용` (§5).
 *
 * @type {ReadonlyArray<{ key: string, label: string, kind: 'select'|'text', choices: string[], choice_labels?: Record<string, string> }>}
 */
export const SESSION_ROWS = [
  {
    key: 'workflow_mode',
    label: '모드',
    kind: 'select',
    choices: [...WORKFLOW_MODES]
  },
  { key: 'bdui_url', label: 'Worker 주소', kind: 'text', choices: [] },
  {
    key: 'base_sync_accept_local_commits',
    label: 'base 동기화',
    kind: 'select',
    choices: ['true'],
    choice_labels: { '': '끔', true: '켬' }
  }
];

/** The op every 세션 row is written with; one call per repo (§5). */
const SESSION_DEFAULTS_OP = 'set-session-defaults';

/**
 * @typedef {Object} RunnerForm
 * @property {'wait'|'switch'} mode - Limit mode; the queue default to start.
 * @property {string[]} accounts - The allow set exactly as the boxes show it.
 * @property {'off'|'pct'} preempt - Threshold choice.
 * @property {string} pct_text - Raw number box text, written on every input.
 */

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
export function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * The limit form every runner starts from: the queue's own defaults, because
 * this tab has no `변경 안 함` to start from (§3.3).
 *
 * @returns {RunnerForm}
 */
export function freshRunnerForm() {
  return {
    mode: 'switch',
    accounts: [],
    preempt: 'off',
    pct_text: DEFAULT_PREEMPT_PCT
  };
}

/**
 * Write the 세션 rows to each ticked repo, one call at a time — the same
 * sequential contract the two other tabs run under (§5).
 *
 * @param {{ targets: Array<Record<string, any>>, send: (type: string, payload: any) => Promise<any>, onProgress: (progress: { done: number, total: number, results: BulkResult[] }) => void, isCancelled: () => boolean }} input
 * @returns {Promise<BulkResult[]>}
 */
export async function runBulkSessionApply(input) {
  /** @type {BulkResult[]} */
  const out = [];
  for (const target of input.targets) {
    if (input.isCancelled()) {
      break;
    }
    /** @type {BulkResult} */
    let result;
    if (Object.keys(target.values).length === 0) {
      out.push({
        root_dir: target.root_dir,
        name: target.name,
        state: 'skipped',
        detail: '값이 선 행이 없습니다'
      });
      input.onProgress({
        done: out.length,
        total: input.targets.length,
        results: out
      });
      continue;
    }
    try {
      const res = await input.send(SESSION_DEFAULTS_OP, {
        values: target.values,
        root_dir: target.root_dir
      });
      result =
        isRecord(res) && res.error === undefined
          ? {
              root_dir: target.root_dir,
              name: target.name,
              state: 'applied',
              detail: ''
            }
          : {
              root_dir: target.root_dir,
              name: target.name,
              state: 'failed',
              detail: messageOf(res)
            };
    } catch (err) {
      result = {
        root_dir: target.root_dir,
        name: target.name,
        state: 'failed',
        detail: messageOf(err)
      };
    }
    out.push(result);
    input.onProgress({
      done: out.length,
      total: input.targets.length,
      results: out
    });
  }
  return out;
}
