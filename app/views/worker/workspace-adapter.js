/**
 * Worker 탭의 `buildLanes` 입력 어댑터 (UI-4tud §4.2).
 *
 * `buildLanes`는 Monitor 워크스페이스 항목 N개를 받는 순수 함수다. Worker는 그
 * 형태를 서버에서 받지 못한다 — `worker-queue` 스냅샷 하나 + Board live store 다섯
 * 열이 원천이고, 후보 레인은 서버 `runnable`보다 넓다(자격 미달 관측 행을 포함).
 * 이 모듈이 그 차이를 흡수해 **길이 0 또는 1**의 `workspaces`/`workspaces_state`를
 * 만든다. 비동기 조회(세션 완료 보고서·세션 기본값)와 그 캐시도 여기 산다 —
 * `buildLanes`는 순수 함수로 남는다.
 *
 * @import { CandidateSortState } from './candidate-sort.js'
 */
import { resolveSpecEvidence } from '../../../server/spec-id.js';
import { createListSelectors } from '../../data/list-selectors.js';
import { awaitingUserReason } from '../../utils/awaiting-user-reason.js';
import { buildCarryoverIndex } from '../../utils/carryover-index.js';
import { buildChildrenIndex, rollupFor } from '../../utils/child-rollup.js';
import { debug } from '../../utils/logging.js';
import { coerceTimestampMs } from '../../utils/relative-time.js';
import { parseReport } from '../../utils/report-marker.js';
import { sessionPreferredReason } from '../../utils/session-preferred.js';
import { specAfterBlockerActive } from '../../utils/spec-after-blocker.js';
import { BEAD_PIN_KEYS } from '../settings-dialog/session-model.js';
import { blockerIdsOf } from './blocker-ids.js';
import {
  applyCandidateSort,
  normalizeCandidateSort
} from './candidate-sort.js';
import { MIN_SLOTS } from './lane-model.js';
import { candidatePlacement } from './placement.js';

const log = debug('views:worker:adapter');

const READY_KEY = 'tab:worker:ready';
const BLOCKED_KEY = 'tab:worker:blocked';
/**
 * The Worker tab's own in_progress subscription (UI-53es §2). It is one of the
 * five columns the running tile's child rollup counts from
 * (worker-card-exec-chips §3.3).
 */
const IN_PROGRESS_KEY = 'tab:worker:in-progress';
/** Resolved children (worker-card-exec-chips §3.3), for the rollup alone. */
const RESOLVED_KEY = 'tab:worker:resolved';
const CLOSED_KEY = 'tab:worker:closed';
/**
 * 보류 선반의 원천 (UI-p7s2 §3.1). 후보 레인과 달리 자격을 묻지 않으므로 이 열은
 * `runnable`에 섞이지 않고 `deferred`로만 실린다.
 */
const DEFERRED_KEY = 'tab:worker:deferred';

/**
 * 아직 스냅샷이 도착하지 않은 워크스페이스의 큐 (§6). 후보 레인의 원천은 Board
 * live store이므로, 큐 구독이 첫 스냅샷을 싣기 전에도 후보는 그려져야 한다 —
 * 종전 `currentQueue()`의 빈 스냅샷 폴백과 같은 자리다. 스토어 자체가 없으면
 * (워커 큐를 구독하지 않는 호출) 워크스페이스 항목을 만들지 않는다.
 *
 * @type {Record<string, any>}
 */
const EMPTY_QUEUE_SNAPSHOT = {
  revision: 0,
  auto_advance: false,
  auto_merge: false,
  slots: MIN_SLOTS,
  queue: [],
  serial_lanes: [],
  serial_lane_count: 0,
  pr_wait: [],
  done: []
};

/**
 * 계정 핀 두 키. `server/worker/exec-enums.js ACCOUNT_KEYS`의 클라이언트 사본이다
 * — 서버 모듈은 `node:fs`를 끌고 오므로 프런트 번들이 import할 수 없다.
 *
 * @type {ReadonlyArray<string>}
 */
const ACCOUNT_KEYS = ['claude_account', 'codex_account'];

/**
 * 실행 핀으로 인정하는 metadata 키 집합 — 이슈별 실행 핀 17키와 계정 2키다.
 * 서버 `runnable-cache.js`의 `EXEC_PIN_KEYS`와 같은 집합이어야 두 원천의 후보
 * 행이 같은 칩을 얻는다. quick_fix 저장 키는 여기 없다: 그 값은 워크스페이스
 * kv와 큐에 살고 Bead metadata에는 쓰이지 않는다 (design §5).
 *
 * @type {ReadonlyArray<string>}
 */
const EXEC_PIN_KEYS = [...BEAD_PIN_KEYS, ...ACCOUNT_KEYS];

/**
 * A full_plan phase child (`UI-xxxx.N`) is a sub-unit of its parent plan's
 * execution, never a standalone worker candidate (spec §1). Judged by the
 * flattened `parent` edge OR a dotted id suffix, since `bd ready --json` may
 * omit `parent`.
 *
 * @param {any} issue
 * @returns {boolean}
 */
export function isPhaseChild(issue) {
  const raw = issue && issue.parent;
  const has_parent =
    typeof raw === 'string' ? raw.length > 0 : !!(raw && raw.id);
  return has_parent || /\.\d+$/.test((issue && issue.id) || '');
}

/**
 * @param {unknown} value
 * @returns {Record<string, any>}
 */
function objectOf(value) {
  return value && typeof value === 'object'
    ? /** @type {Record<string, any>} */ (value)
    : {};
}

/**
 * The execution pins of one issue's metadata. Non-string values are dropped
 * rather than coerced — a pin is an enum token, and a number where one belongs
 * is a malformed record, not a selection (server `execPinsOf`).
 *
 * @param {Record<string, any>} metadata
 * @returns {Record<string, string>}
 */
function execPinsOf(metadata) {
  /** @type {Record<string, string>} */
  const pins = {};
  for (const key of EXEC_PIN_KEYS) {
    const value = metadata[key];
    if (typeof value === 'string' && value.length > 0) {
      pins[key] = value;
    }
  }
  return pins;
}

/**
 * `path/to/x` → `x`. 워크스페이스 항목의 `name`은 Monitor 서버 투영과 같은
 * 규칙(경로 마지막 조각)으로 만든다.
 *
 * @param {string} root_dir
 * @returns {string}
 */
function basenameOf(root_dir) {
  const trimmed = root_dir.replace(/\/+$/, '');
  const cut = trimmed.lastIndexOf('/');
  return cut >= 0 ? trimmed.slice(cut + 1) : trimmed;
}

/**
 * @typedef {Object} WorkerLaneInput
 * @property {Array<Record<string, any>>} workspaces - 길이 0 또는 1.
 * @property {Array<Record<string, any>>} workspaces_state - 길이 0 또는 1.
 */

/**
 * @typedef {Object} WorkspaceAdapterOptions
 * @property {any} [queueStore] - 이 워크스페이스의 `worker-queue` 스냅샷 스토어.
 * @property {any} [issueStores] - 다섯 상태 열의 Board live 스토어 묶음.
 * @property {((type: string, payload?: any) => Promise<any>)} [transport]
 * @property {(() => string|undefined)} [getWorkspacePath]
 * @property {(() => void)} [onInvalidate] - `get-comments`·`get-session-defaults`
 * 조회가 끝났을 때 한 번 불린다. 뷰는 그 프레임을 다시 그린다.
 */

/**
 * Build the `buildLanes` input for the Worker tab.
 *
 * @param {WorkspaceAdapterOptions} options
 */
export function createWorkspaceAdapter(options = {}) {
  const { queueStore, issueStores, transport, getWorkspacePath, onInvalidate } =
    options;
  // 후보 순서는 정렬 체인이 정한다 (UI-d13v §6) — 수동 rank 채널은 Board 탭과
  // 함께 사라졌다 (UI-p7s2 §7.2).
  // 이 어댑터가 그리는 열들의 구독만 소비한다 (UI-hhn9 §5.1).
  const selectors = issueStores
    ? createListSelectors(issueStores, {
        client_ids: [
          READY_KEY,
          BLOCKED_KEY,
          IN_PROGRESS_KEY,
          RESOLVED_KEY,
          CLOSED_KEY,
          DEFERRED_KEY
        ]
      })
    : null;
  /**
   * Session-report presence keyed by workspace + immutable closed-issue
   * snapshot identity. A failed request stays failed until the issue store
   * emits again, so queue-only renders cannot retry-loop.
   *
   * @type {Map<string, 'pending'|'session'|'not-session'|'failed'>}
   */
  const session_report_cache = new Map();
  /**
   * The workspace-global execution kv (`bd kv workflow_session_defaults`), the
   * `전역` layer of the exec chips (worker-card-exec-chips §2.1).
   *
   * @type {Record<string, string>}
   */
  let session_defaults = {};
  /** @type {string|null} Workspace path the cached values belong to. */
  let session_defaults_key = null;
  /**
   * Bumped on every refresh and on every fresh request. A response whose
   * generation is no longer current is DISCARDED.
   *
   * @type {number}
   */
  let session_defaults_generation = 0;
  /** @type {{ key: string, generation: number }|null} */
  let session_defaults_inflight = null;
  let destroyed = false;

  /** Re-render request from a finished async lookup. */
  function invalidate() {
    if (destroyed || !onInvalidate) {
      return;
    }
    onInvalidate();
  }

  /**
   * The global layer for `key`'s renders. A mismatch reads as "no global
   * layer", never as another workspace's values.
   *
   * @param {string} key
   * @returns {Record<string, string>}
   */
  function sessionDefaultsFor(key) {
    return session_defaults_key === key ? session_defaults : {};
  }

  /**
   * Fetch the workspace kv once per workspace. The key guard (already have it)
   * and the in-flight guard (already asking for it) keep this to one request; a
   * workspace switch or a refresh breaks both.
   */
  async function ensureSessionDefaults() {
    if (!transport || destroyed) {
      return;
    }
    const key = getWorkspacePath?.() || '';
    if (session_defaults_key === key) {
      return;
    }
    if (
      session_defaults_inflight &&
      session_defaults_inflight.key === key &&
      session_defaults_inflight.generation === session_defaults_generation
    ) {
      return;
    }
    const generation = ++session_defaults_generation;
    session_defaults_inflight = { key, generation };
    /** @type {any} */
    let res = null;
    try {
      res = await Promise.resolve(transport('get-session-defaults', {}));
    } catch (err) {
      if (generation !== session_defaults_generation) {
        return;
      }
      session_defaults_inflight = null;
      // Fail-quiet: the chips resolve with no global layer rather than with a
      // fabricated one, and the next refresh point tries again. The re-render
      // is the point — `refreshSessionDefaults` already dropped the key.
      log('get-session-defaults failed: %o', err);
      invalidate();
      return;
    }
    if (generation !== session_defaults_generation) {
      return;
    }
    session_defaults =
      res && typeof res.values === 'object' && res.values !== null
        ? { ...res.values }
        : {};
    session_defaults_key = key;
    session_defaults_inflight = null;
    invalidate();
  }

  /**
   * Drop the cache and ask again. Clearing the key breaks the "already have it"
   * guard and bumping the generation invalidates whatever is in flight.
   */
  function refreshSessionDefaults() {
    session_defaults_key = null;
    session_defaults_generation += 1;
    void ensureSessionDefaults();
  }

  /**
   * Drop the FAILED session-report lookups — 이슈 스토어가 다시 방출했으니 그
   * 조회는 다시 시도할 값이 있다. 실패를 영구화하면 다음 스냅샷에서도 그 완료
   * 행이 서지 못한다.
   */
  function notifyIssuesChanged() {
    for (const [identity, state] of session_report_cache) {
      if (state === 'failed') {
        session_report_cache.delete(identity);
      }
    }
  }

  /**
   * @param {string} key
   * @param {'ready'|'blocked'|'in_progress'|'resolved'|'closed'|'deferred'} status
   * @returns {any[]}
   */
  function column(key, status) {
    return selectors ? selectors.selectBoardColumn(key, status) : [];
  }

  /**
   * The candidate lane's observation rows (§4.2). Ready+Blocked 전부를 그리고, 큐·직렬·실행·PR
   * 대기·완료 구성원과 phase child만 뺀다 — `worker-ineligible`도 spec 미발행도
   * 제외 사유가 아니다 (UI-8881): 워커 탭은 후보를 **관측**하는 화면이고, 실행
   * 안전은 서버 admission이 지킨다.
   *
   * @param {any} q - `worker-queue` 스냅샷.
   * @param {any[]} ready
   * @param {any[]} blocked
   * @param {CandidateSortState|undefined} candidate_sort
   * @returns {any[]}
   */
  function runnableRows(q, ready, blocked, candidate_sort) {
    /** @type {Set<string>} */
    const blocked_ids = new Set(blocked.map((/** @type {any} */ it) => it.id));
    /** @type {Set<string>} */
    const seen = new Set();
    /**
     * 이 렌더의 배치 판정 — 후보 제외와 자격·사유가 같은 값을 읽는다 (§6.1).
     *
     * @type {Map<string, import('./placement.js').Placement>}
     */
    const placements = new Map();
    /** @type {any[]} */
    const merged = [];
    for (const it of [...ready, ...blocked]) {
      if (seen.has(it.id) || isPhaseChild(it)) {
        continue;
      }
      const placement = candidatePlacement(it, q);
      // 이미 어느 레인에 서 있는 bead는 후보가 아니다 — 종전 `queued` 집합의
      // 자리이며, 그 구성원 판정도 이제 `candidatePlacement`가 소유한다.
      if (placement.location !== null) {
        continue;
      }
      seen.add(it.id);
      placements.set(it.id, placement);
      merged.push(it);
    }
    // 체인이 순서를 정하고, 그 뒤 의존 인접화 패스가 후행을 자기 선행 바로 뒤로
    // 끌어온다 (UI-d13v §4.1, UI-8ham, UI-q1y7 §2). 둘 다 `applyCandidateSort`
    // 안에서 끝나므로 `buildLanes`는 `candidate_sort: 'as_given'`으로 이 순서를
    // 그대로 받는다.
    const sorted = applyCandidateSort(
      merged,
      normalizeCandidateSort(candidate_sort)
    );
    /** @type {Record<string, any>} */
    const bead_scope = objectOf(q.bead_scope);
    return sorted.map((/** @type {any} */ it) => {
      // 위 루프가 `merged`에 넣은 행만 여기 오므로 판정은 언제나 있다.
      const placement = /** @type {import('./placement.js').Placement} */ (
        placements.get(it.id)
      );
      const spec = resolveSpecEvidence(it);
      const has_spec = spec.evidence === 'published';
      const route =
        (it.workflow?.route_source === 'explicit' &&
          typeof it.workflow.route === 'string' &&
          it.workflow.route) ||
        (it.metadata && typeof it.metadata.route === 'string'
          ? it.metadata.route
          : '');
      const worker_ineligible = placement.worker_ineligible;
      // Advisory only (UI-49mc §3): the projection folds the contract's
      // priority here so no card re-decides that `worker-ineligible` beats
      // `session-preferred`.
      const session_preferred_reason =
        worker_ineligible || !Object.hasOwn(it, 'labels')
          ? ''
          : sessionPreferredReason(
              /** @type {any} */ (it).labels,
              /** @type {any} */ (it).metadata
            );
      const is_blocked = blocked_ids.has(it.id);
      const blocker_ids = is_blocked ? blockerIdsOf(it) : [];
      const awaiting_user_reason = awaitingUserReason(it.metadata);
      const scope_entry = bead_scope[it.id];
      return {
        bead_id: it.id,
        title: it.title || it.id,
        route,
        spec_id: spec.conflict ? '' : spec.path,
        // 발행 판정은 route와 무관하다 (UI-vb7u §3) — spec 필터가 읽는 값이다.
        published: has_spec,
        blocked: is_blocked,
        blocked_by: blocker_ids,
        labels: Array.isArray(it.labels) ? it.labels : [],
        // 타입·우선순위 필터가 읽는 bd 원본 필드 (UI-p7s2 §6). 값이 없으면 키를
        // 만들지 않는다 — 판정할 재료가 없는 행은 일치로 본다 (fail-quiet).
        ...(typeof it.issue_type === 'string' && it.issue_type.length > 0
          ? { issue_type: it.issue_type }
          : {}),
        ...(typeof it.priority === 'number' ? { priority: it.priority } : {}),
        created_at: it.created_at,
        updated_at: it.updated_at,
        status: it.status,
        workflow: it.workflow || null,
        worker_created_from:
          typeof it.workflow?.worker_created_from === 'string'
            ? it.workflow.worker_created_from
            : undefined,
        worker_created_from_root_dir:
          typeof it.worker_created_from_root_dir === 'string'
            ? it.worker_created_from_root_dir
            : undefined,
        exec_pins: execPinsOf(objectOf(it.metadata)),
        // 복잡 판정은 `bead_overlay`의 라벨·metadata가 싣는다 (§4.1, UI-7nhi §3)
        // — 후보는 언제나 구독 집합 안이므로 그쪽이 더 온전한 원천이다.
        // 겹침 판정의 선언 scope (UI-qm12 §5.2). 후보 bead의 scope도 서버가 같은
        // 스냅샷에 실어 준다 — 값 없음/읽기 실패는 필드를 만들지 않는다.
        ...(scope_entry && Array.isArray(scope_entry.scope)
          ? { scope: scope_entry.scope }
          : {}),
        observation: true,
        spec_state: placement.spec,
        has_description: !placement.missing_description,
        awaiting_user: placement.awaiting_user,
        ...(awaiting_user_reason ? { awaiting_user_reason } : {}),
        ...(is_blocked && blocker_ids.length === 0
          ? { blocked_without_ids: true }
          : {}),
        worker_ineligible,
        session_preferred_reason,
        // 예외 라벨 `spec-after-blocker` (UI-svh6 §4.2). 계약이 이 라벨을
        // `effective_only_while: dependency_unsatisfied`로 두므로 판정은 라벨과
        // 지금의 blocker를 함께 읽는다 — 자격에는 들어가지 않는다.
        spec_after_blocker: specAfterBlockerActive(it.labels, blocker_ids),
        // UI-d13v 재료는 서버 Ready/Blocked 장식을 그대로 전달한다.
        release_info: it.release_info,
        dependents_info: it.dependents_info
      };
    });
  }

  /**
   * The 보류 선반 observation rows (UI-p7s2 §3.1). 후보 행과 같은 사실 키를 싣되 자격
   * 판정은 하나도 하지 않는다 — `route`·`spec_state`는 칩 재료로만 쓰이고,
   * 정렬은 `updated_at` 내림차순 고정이다(선반이라 정렬 선택지가 없다).
   *
   * @param {any[]} deferred
   * @returns {any[]}
   */
  function deferredRows(deferred) {
    /** @type {any[]} */
    const rows = [];
    for (const it of deferred) {
      if (!it || typeof it.id !== 'string' || isPhaseChild(it)) {
        continue;
      }
      const spec = resolveSpecEvidence(it);
      const route =
        (it.workflow?.route_source === 'explicit' &&
          typeof it.workflow.route === 'string' &&
          it.workflow.route) ||
        (it.metadata && typeof it.metadata.route === 'string'
          ? it.metadata.route
          : '');
      // 의존 칩의 재료는 후보 행과 같다 (§3.2 "의존 칩은 그대로") — 선행 ID와
      // 서버의 해제·후속 장식을 그대로 옮긴다. 자격 판정만 없다.
      const blocker_ids = blockerIdsOf(it);
      rows.push({
        bead_id: it.id,
        title: it.title || it.id,
        route,
        spec_id: spec.conflict ? '' : spec.path,
        published: spec.evidence === 'published',
        blocked: blocker_ids.length > 0,
        blocked_by: blocker_ids,
        labels: Array.isArray(it.labels) ? it.labels : [],
        ...(typeof it.issue_type === 'string' && it.issue_type.length > 0
          ? { issue_type: it.issue_type }
          : {}),
        ...(typeof it.priority === 'number' ? { priority: it.priority } : {}),
        created_at: it.created_at,
        updated_at: it.updated_at,
        status: it.status,
        workflow: it.workflow || null,
        exec_pins: execPinsOf(objectOf(it.metadata)),
        observation: true,
        deferred: true,
        release_info: it.release_info,
        dependents_info: it.dependents_info
      });
    }
    rows.sort(
      (a, b) =>
        (coerceTimestampMs(b.updated_at) ?? 0) -
          (coerceTimestampMs(a.updated_at) ?? 0) ||
        a.bead_id.localeCompare(b.bead_id)
    );
    return rows;
  }

  /**
   * Board live store가 아는 이슈 필드 (§4.1). `priority`·`from_id`는 다섯 열
   * 전부에서 모으고, `metadata`는 **구독된** Ready·Blocked·In-progress에서만
   * 싣는다 — 나머지 두 열의 이슈는 실행 설정·복잡 판정의 핀을 볼 수 없으므로
   * 전역값만으로 해석하면 틀린 칩이 된다.
   *
   * 이월 후속 색인(`carried_to`)도 여기서 같이 만든다 (UI-btj6 §3):
   * {@link buildChildrenIndex}와 같이 이미 구독된 이슈 집합 하나에서 파생하는
   * 교차 이슈 색인이라 서버 왕복이 없다.
   *
   * @param {any[][]} columns - `[ready, blocked, in_progress, resolved, closed]`
   * @returns {Record<string, any>}
   */
  function beadOverlay(columns) {
    const [ready, blocked, in_progress, resolved, closed] = columns;
    // 실행 타일의 child rollup이 읽는 자식 집합 (worker-card-exec-chips §3.3):
    // Board와 같은 5집합에서 센다.
    const children_by_parent = buildChildrenIndex([
      ...ready,
      ...blocked,
      ...in_progress,
      ...resolved,
      ...closed
    ]);
    // 이월 후속 색인 (UI-btj6 §3). 닫힌 후속만 재료에서 빠진다 — `resolved`는
    // PR을 이미 낸 후속이고 아직 살아 있는 일이라 부모 카드에서 지울 이유가
    // 없다. 이 색인은 오버레이의 metadata 적재 규칙과 무관하게 열의 이슈를
    // 직접 읽으므로 네 열 모두에서 파생할 수 있다.
    const carried_to_by_parent = buildCarryoverIndex([
      ...ready,
      ...blocked,
      ...in_progress,
      ...resolved
    ]);
    /** @type {Record<string, any>} */
    const overlay = {};
    /**
     * @param {any} issue
     * @param {boolean} with_metadata
     */
    const add = (issue, with_metadata) => {
      if (!issue || typeof issue.id !== 'string' || issue.id.length === 0) {
        return;
      }
      const entry = overlay[issue.id] || (overlay[issue.id] = {});
      if (typeof issue.priority === 'number' && !('priority' in entry)) {
        entry.priority = issue.priority;
      }
      if (typeof issue.from_id === 'string' && !('from_id' in entry)) {
        entry.from_id = issue.from_id;
      }
      // 타입·라벨 필터의 재료 (UI-p7s2 §6). 서버 큐 스냅샷에서 오는 대기·실행
      // 중·PR 대기·완료 행에는 이 두 필드가 없으므로 오버레이가 유일한 원천이다.
      // 값이 없는 이슈는 키를 만들지 않는다 (fail-quiet).
      if (
        typeof issue.issue_type === 'string' &&
        issue.issue_type.length > 0 &&
        !('issue_type' in entry)
      ) {
        entry.issue_type = issue.issue_type;
      }
      // 빈 배열도 싣는다 — "라벨 없음"은 확인된 사실이고 배열 부재만 모름이다.
      if (Array.isArray(issue.labels) && !('labels' in entry)) {
        entry.labels = issue.labels.filter(
          (/** @type {unknown} */ label) => typeof label === 'string'
        );
      }
      const worker_created_from = objectOf(issue.workflow).worker_created_from;
      if (
        typeof worker_created_from === 'string' &&
        !('worker_created_from' in entry)
      ) {
        entry.worker_created_from = worker_created_from;
      }
      if (
        typeof issue.worker_created_from_root_dir === 'string' &&
        !('worker_created_from_root_dir' in entry)
      ) {
        entry.worker_created_from_root_dir = issue.worker_created_from_root_dir;
      }
      if (with_metadata && !('metadata' in entry)) {
        entry.metadata = objectOf(issue.metadata);
        // 서버가 이슈에 얹은 workflow route (`route_source: 'derived'` 포함).
        // 큐 스냅샷의 `bead_workflow`보다 이쪽이 이 bead의 실행 설정을 푸는
        // 원천이다 — 종전 `execRowsFor`가 읽던 자리다.
        const route = objectOf(issue.workflow).route;
        if (typeof route === 'string' && route.length > 0) {
          entry.route = route;
        }
      }
    };
    for (const issue of [...ready, ...blocked, ...in_progress]) {
      add(issue, true);
    }
    for (const issue of [...resolved, ...closed]) {
      add(issue, false);
    }
    // 큐 스냅샷에는 페이즈명이 없다 — child 진행도가 "지금 어디까지"를 말하는
    // 유일한 사실이다. 자식이 없는 bead는 키를 만들지 않는다: 빈 블록은
    // "0/0"이라 주장하지만 진실은 "그런 종류의 bead가 아니다"이다 (§3.3).
    // 부모가 어느 구독 열에도 없을 수 있다 (실행 중인 bead는 큐 스냅샷이 알고
    // Board는 모른다) — 자식 색인의 부모 키도 함께 돈다.
    for (const bead_id of new Set([
      ...Object.keys(overlay),
      ...children_by_parent.keys()
    ])) {
      const rollup = rollupFor(children_by_parent, bead_id);
      if (rollup.total > 0) {
        const entry = overlay[bead_id] || (overlay[bead_id] = {});
        entry.rollup = rollup;
      }
    }
    // 이월된 부모도 어느 구독 열에도 없을 수 있다 (완료 레인 행은 큐 스냅샷이
    // 알고 Board는 닫힌 열에서만 안다) — 자식 색인과 같이 색인의 부모 키도 함께
    // 돈다. 후속이 없는 bead는 키를 만들지 않는다 (fail-quiet).
    for (const [bead_id, carried_to] of carried_to_by_parent) {
      const entry = overlay[bead_id] || (overlay[bead_id] = {});
      entry.carried_to = carried_to;
    }
    return overlay;
  }

  /**
   * The 완료 레인 merge rule (UI-p7s2 §5): 서버 스냅샷의 Worker 완료 행 `q.done`에
   * **없는** 닫힌 이슈를 전부 완료 레인에 싣고, `get-comments` 조회로 **분류만**
   * 한다.
   *
   * - 세션 lane 완료 보고서가 확인되면 종전과 같은 세션 완료 행 — 세션 배지와
   *   `작업` 시간이 붙는다.
   * - 그 밖(댓글 없음·보고서가 세션 lane이 아님·조회 실패·조회 대기 중)은 닫힘
   *   행이다: 배지도 `작업`도 없다. 출처를 모르는 행에 세션 배지를 붙이지 않는
   *   다는 것이 이 행의 규칙이다. 조회가 끝나 세션 보고서로 판명되면
   *   `invalidate()` 재렌더가 세션 완료 행으로 바꾼다.
   *
   * @param {any} q
   * @param {any[]} closed
   * @param {string} root_dir
   * @param {number|undefined} done_since
   * @returns {any[]}
   */
  function sessionDoneRows(q, closed, root_dir, done_since) {
    /** @type {Set<string>} */
    const worker_done_ids = new Set(
      (Array.isArray(q.done) ? q.done : [])
        .map((/** @type {any} */ entry) => entry?.bead_id)
        .filter((/** @type {any} */ bead_id) => typeof bead_id === 'string')
    );
    /** @type {any[]} */
    const rows = [];
    for (const issue of closed) {
      const closed_at = coerceTimestampMs(issue.closed_at);
      if (
        typeof issue.id !== 'string' ||
        worker_done_ids.has(issue.id) ||
        closed_at === null ||
        (done_since !== undefined && closed_at < done_since)
      ) {
        continue;
      }
      // 필터가 읽는 원본 필드는 두 변형이 같이 싣는다 (UI-p7s2 §6).
      const issue_fields = {
        labels: Array.isArray(issue.labels) ? issue.labels : [],
        ...(typeof issue.issue_type === 'string' && issue.issue_type.length > 0
          ? { issue_type: issue.issue_type }
          : {}),
        ...(typeof issue.priority === 'number'
          ? { priority: issue.priority }
          : {})
      };
      /**
       * One 닫힘 행 whose origin is unknown (§5). 세션 배지도 `작업` 시간도 없다.
       *
       * @returns {any}
       */
      const closedRow = () => ({
        id: issue.id,
        title: issue.title || issue.id,
        reason: '',
        draggable: false,
        done: true,
        lane: 'done',
        selectable: false,
        selected: false,
        badges: [],
        alert: false,
        usage: null,
        work_ms: null,
        done_at: closed_at,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
        // route 칩의 재료 (§5 "ID·제목·route 칩·완료 시각·의존 칩"). 닫힌 열은
        // 오버레이에 route를 싣지 않으므로 행이 서버 workflow를 직접 옮긴다.
        workflow: issue.workflow || null,
        ...issue_fields
      });
      const has_comments =
        typeof issue.comment_count === 'number' && issue.comment_count > 0;
      if (!has_comments) {
        // 댓글이 0이면 조회할 것이 없다 — 바로 닫힘 행이다.
        rows.push(closedRow());
        continue;
      }
      const identity = `${root_dir}\0${issue.id}\0${String(
        issue.updated_at
      )}\0${issue.comment_count}`;
      const cached = session_report_cache.get(identity);
      if (cached === undefined && transport) {
        session_report_cache.set(identity, 'pending');
        void Promise.resolve(transport('get-comments', { id: issue.id }))
          .then((comments) => {
            const has_session_report =
              Array.isArray(comments) &&
              comments.some(
                (/** @type {any} */ comment) =>
                  parseReport(
                    typeof comment?.text === 'string' ? comment.text : ''
                  )?.lane === 'session'
              );
            session_report_cache.set(
              identity,
              has_session_report ? 'session' : 'not-session'
            );
            invalidate();
          })
          .catch(() => {
            session_report_cache.set(identity, 'failed');
            invalidate();
          });
      }
      if (cached !== 'session') {
        // 보고서가 세션 lane이 아니거나 아직 판정이 없다 — 지금은 닫힘 행이고,
        // 조회가 세션 보고서로 끝나면 재렌더가 이 행을 세션 완료 행으로 바꾼다.
        rows.push(closedRow());
        continue;
      }
      // 세션 작업 행의 "작업" 시간은 bead가 in_progress를 잡은 순간부터 닫힌
      // 순간까지다. Worker 행(attempt 실행 벽시계 합)과 산식은 다르지만 라벨은
      // 같은 `작업`이다 — 읽는 사람이 두 레인을 같은 질문으로 훑기 때문이다.
      const started_ms = coerceTimestampMs(issue.started_at);
      rows.push({
        id: issue.id,
        title: issue.title || issue.id,
        reason: '',
        draggable: false,
        done: true,
        lane: 'done',
        selectable: false,
        selected: false,
        badges: ['세션 작업'],
        alert: false,
        usage: null,
        work_ms:
          started_ms !== null && closed_at >= started_ms
            ? closed_at - started_ms
            : null,
        work_kind: 'session',
        done_at: closed_at,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
        workflow: issue.workflow || null,
        ...issue_fields
      });
    }
    return rows;
  }

  return {
    /**
     * @param {{ candidate_sort: CandidateSortState, done_since?: number }} view_state
     * @returns {WorkerLaneInput}
     */
    read(view_state) {
      if (!queueStore) {
        return { workspaces: [], workspaces_state: [] };
      }
      const q = queueStore.get() || EMPTY_QUEUE_SNAPSHOT;
      const root_dir = getWorkspacePath?.() || '';
      const done_since =
        view_state && typeof view_state.done_since === 'number'
          ? view_state.done_since
          : undefined;
      const ready = column(READY_KEY, 'ready');
      const blocked = column(BLOCKED_KEY, 'blocked');
      const in_progress = column(IN_PROGRESS_KEY, 'in_progress');
      const resolved = column(RESOLVED_KEY, 'resolved');
      const closed = column(CLOSED_KEY, 'closed');
      const deferred = column(DEFERRED_KEY, 'deferred');
      return {
        workspaces: [
          {
            ...q,
            // 서버 데코레이션을 먼저 깔고 live Ready/Blocked 제목으로 덮는다
            // (UI-12k6): 두 원천 중 live 쪽이 더 신선하다.
            bead_titles: {
              ...objectOf(q.bead_titles),
              ...Object.fromEntries(
                [...ready, ...blocked]
                  .filter((issue) => issue && typeof issue.id === 'string')
                  .map((issue) => [issue.id, issue.title || issue.id])
              )
            },
            root_dir,
            name: basenameOf(root_dir),
            runnable: runnableRows(
              q,
              ready,
              blocked,
              view_state ? view_state.candidate_sort : undefined
            ),
            deferred: deferredRows(deferred),
            session_done: sessionDoneRows(q, closed, root_dir, done_since),
            bead_overlay: beadOverlay([
              ready,
              blocked,
              in_progress,
              resolved,
              closed
            ])
          }
        ],
        workspaces_state: [
          {
            root_dir,
            revision: q.revision,
            auto_advance: q.auto_advance,
            auto_merge: q.auto_merge,
            // 워크스페이스 선언이 있으면 그것이 cap이고, 없으면 스냅샷 값이다.
            slots:
              typeof objectOf(q.workspace_info).slots === 'number'
                ? objectOf(q.workspace_info).slots
                : q.slots,
            runner_catalog: q.runner_catalog,
            execution_defaults: q.execution_defaults,
            session_defaults: sessionDefaultsFor(root_dir),
            // 전역 실행 값의 orchestration 3키는 큐 스냅샷이 소유한다
            // (`execGlobalValues`) — 워크스페이스 kv 위에 이 값이 덮인다.
            orchestration_model: q.orchestration_model,
            orchestration_effort: q.orchestration_effort,
            orchestration_speed: q.orchestration_speed,
            // route=quick_fix Bead의 칩은 이 3키를 먼저 읽는다. 워크스페이스
            // 오케스트레이션 표시 행은 위의 일반 3키 그대로다.
            quick_fix_orchestration_model: q.quick_fix_orchestration_model,
            quick_fix_orchestration_effort: q.quick_fix_orchestration_effort,
            quick_fix_orchestration_speed: q.quick_fix_orchestration_speed,
            issue_prefix: ''
          }
        ]
      };
    },
    /**
     * Fetch the workspace session defaults once (뷰의 `load()` 시점). 키·inflight
     * 가드가 실제 요청을 워크스페이스당 한 번으로 묶는다.
     */
    ensureSessionDefaults() {
      void ensureSessionDefaults();
    },
    refreshSessionDefaults,
    notifyIssuesChanged,
    destroy() {
      destroyed = true;
      // inflight 무효화: 이미 날아간 응답이 캐시를 다시 앉히지 못한다.
      session_defaults_generation += 1;
      session_defaults_inflight = null;
      session_report_cache.clear();
    }
  };
}
