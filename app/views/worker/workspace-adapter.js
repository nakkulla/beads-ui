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
import { buildChildrenIndex, rollupFor } from '../../utils/child-rollup.js';
import { debug } from '../../utils/logging.js';
import { coerceTimestampMs } from '../../utils/relative-time.js';
import { parseReport } from '../../utils/report-marker.js';
import { sessionPreferredReason } from '../../utils/session-preferred.js';
import { isWorkerIneligible } from '../../utils/worker-eligibility.js';
import { IMPL_PRESET_KEYS } from '../settings-dialog/session-model.js';
import {
  applyCandidateSort,
  normalizeCandidateSort
} from './candidate-sort.js';
import { MIN_SLOTS } from './lane-model.js';
import { AWAITING_USER_REASON_PREFIX } from './lanes.js';

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
 * 선행 id를 하나도 모르는 blocked 후보가 다는 잠금 문장 (UI-anna §2 결정 4). id를
 * 아는 후보는 `⛓ blocked: <id>` 칩이 같은 사실을 적으므로 이 문장을 달지 않는다.
 */
const BLOCKED_WITHOUT_IDS = '🔒 blocked';

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
 * 실행 핀으로 인정하는 metadata 키 집합. 서버 `runnable-cache.js`의
 * `EXEC_PIN_KEYS`와 같은 집합이어야 두 원천의 후보 행이 같은 칩을 얻는다.
 *
 * @type {ReadonlyArray<string>}
 */
const EXEC_PIN_KEYS = [...IMPL_PRESET_KEYS, ...ACCOUNT_KEYS];

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
 * The blocker ids of a blocked candidate. The server-synthesized
 * `blocked_info.blockers` is the primary source; when the whole object is absent
 * (older server) the embedded `blocks` dependency edges answer instead.
 *
 * @param {any} issue
 * @returns {string[]}
 */
export function blockerIdsOf(issue) {
  const info = issue?.blocked_info;
  if (info && typeof info === 'object') {
    return Array.isArray(info.blockers)
      ? info.blockers.filter(
          (/** @type {unknown} */ id) => typeof id === 'string' && id.length > 0
        )
      : [];
  }
  const deps = Array.isArray(issue?.dependencies) ? issue.dependencies : [];
  return deps
    .map((/** @type {any} */ d) => {
      if (typeof d === 'string') {
        return d;
      }
      if (!d || typeof d !== 'object') {
        return '';
      }
      const kind = d.type ?? d.dependency_type;
      if (kind !== undefined && kind !== 'blocks') {
        return '';
      }
      return d.depends_on_id || d.id || '';
    })
    .filter(Boolean);
}

/**
 * `awaiting_user` 파킹이 후보 행에 다는 사유 파트 (UI-dqg9 §2.2).
 *
 * @param {unknown} metadata
 * @returns {string}
 */
function awaitingUserReason(metadata) {
  const value =
    metadata && typeof metadata === 'object'
      ? /** @type {Record<string, unknown>} */ (metadata).awaiting_user
      : undefined;
  const text = typeof value === 'string' ? value.trim() : '';
  return text.length > 0
    ? `${AWAITING_USER_REASON_PREFIX}: ${text}`
    : AWAITING_USER_REASON_PREFIX;
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
  // Worker 탭은 ui-order를 읽지 않는다 (UI-d13v §6): 후보 순서는 정렬 체인이
  // 정하고 수동 rank는 Board 탭만 쓴다.
  const selectors = issueStores ? createListSelectors(issueStores) : null;
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
   * @param {'ready'|'blocked'|'in_progress'|'resolved'|'closed'} status
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
    const queue_entries = Array.isArray(q.queue) ? q.queue : [];
    const queued = new Set([
      ...queue_entries.map((/** @type {any} */ e) => e.bead_id),
      ...(Array.isArray(q.serial_lanes) ? q.serial_lanes : []).flatMap(
        (/** @type {any} */ lane) =>
          (Array.isArray(lane?.entries) ? lane.entries : []).map(
            (/** @type {any} */ e) => e.bead_id
          )
      ),
      ...(Array.isArray(q.pr_wait) ? q.pr_wait : []).map(
        (/** @type {any} */ e) => e.bead_id
      ),
      ...(Array.isArray(q.done) ? q.done : []).map(
        (/** @type {any} */ e) => e.bead_id
      )
    ]);
    /** @type {Set<string>} */
    const blocked_ids = new Set(blocked.map((/** @type {any} */ it) => it.id));
    /** @type {Set<string>} */
    const seen = new Set();
    /** @type {any[]} */
    const merged = [];
    for (const it of [...ready, ...blocked]) {
      if (queued.has(it.id) || seen.has(it.id) || isPhaseChild(it)) {
        continue;
      }
      seen.add(it.id);
      merged.push(it);
    }
    // 정렬 체인만이 렌더 순서를 정한다 (UI-d13v §4.1, UI-8ham). `buildLanes`는
    // `candidate_sort: 'as_given'`으로 이 순서를 그대로 받는다.
    const sorted = applyCandidateSort(
      merged,
      normalizeCandidateSort(candidate_sort)
    );
    /** @type {Record<string, any>} */
    const bead_scope = objectOf(q.bead_scope);
    return sorted.map((/** @type {any} */ it) => {
      const spec = resolveSpecEvidence(it);
      const has_spec = spec.evidence === 'published';
      const route =
        (typeof it.workflow?.route === 'string' && it.workflow.route) ||
        (it.metadata && typeof it.metadata.route === 'string'
          ? it.metadata.route
          : '');
      const is_quick_fix = route === 'quick_fix';
      // Ready/Blocked subscriptions preserve raw bd fields, including
      // `description`. An older/partial server may omit the key; that absence
      // stays fail-quiet and leaves the authoritative check to the server.
      const has_description =
        !Object.hasOwn(it, 'description') ||
        (typeof it.description === 'string' &&
          it.description.trim().length > 0);
      // Labels follow the same ownership boundary.
      const worker_ineligible =
        Object.hasOwn(it, 'labels') &&
        isWorkerIneligible(/** @type {any} */ (it).labels);
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
      // 사용자 결정 대기 파킹 (UI-dqg9 §2.2). 서버 admission과 같은 presence
      // 규칙을 쓰되, metadata가 없는 페이로드에서는 판정하지 않는다.
      const awaiting_user =
        it.metadata && typeof it.metadata === 'object'
          ? Object.hasOwn(/** @type {any} */ (it).metadata, 'awaiting_user')
          : false;
      const eligible =
        !worker_ineligible &&
        !awaiting_user &&
        (is_quick_fix ? has_description : has_spec && !spec.conflict);
      const is_blocked = blocked_ids.has(it.id);
      const blocker_ids = is_blocked ? blockerIdsOf(it) : [];
      /** @type {string[]} */
      const parts = [];
      if (is_blocked && blocker_ids.length === 0) {
        parts.push(BLOCKED_WITHOUT_IDS);
      }
      if (awaiting_user) {
        parts.push(awaitingUserReason(/** @type {any} */ (it).metadata));
      }
      if (is_quick_fix && !has_description) {
        parts.push('missing_description');
      } else if (!is_quick_fix && spec.conflict) {
        parts.push('spec_id_conflict');
      } else if (!is_quick_fix && spec.evidence === 'none') {
        parts.push('spec 없음');
      } else if (!is_quick_fix && spec.evidence === 'draft') {
        parts.push('spec 미발행(draft)');
      }
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
        created_at: it.created_at,
        updated_at: it.updated_at,
        status: it.status,
        workflow: it.workflow || null,
        exec_pins: execPinsOf(objectOf(it.metadata)),
        // 복잡 판정은 `bead_overlay`의 metadata가 덧씌운다 (§4.1) — 후보는 언제나
        // 구독 집합 안이므로 그쪽이 더 온전한 원천이다.
        rec: null,
        // 겹침 판정의 선언 scope (UI-qm12 §5.2). 후보 bead의 scope도 서버가 같은
        // 스냅샷에 실어 준다 — 값 없음/읽기 실패는 필드를 만들지 않는다.
        ...(scope_entry && Array.isArray(scope_entry.scope)
          ? { scope: scope_entry.scope }
          : {}),
        // 자격·사유는 관측 행을 싣는 이 어댑터만 실어 보낸다 (§4.1).
        eligible,
        reason: parts.join(' · '),
        worker_ineligible,
        session_preferred: session_preferred_reason.length > 0,
        session_preferred_reason,
        // UI-d13v 재료는 서버 Ready/Blocked 장식을 그대로 전달한다.
        release_info: it.release_info,
        dependents_info: it.dependents_info
      };
    });
  }

  /**
   * Board live store가 아는 이슈 필드 (§4.1). `priority`·`from_id`는 다섯 열
   * 전부에서 모으고, `metadata`는 **구독된** Ready·Blocked·In-progress에서만
   * 싣는다 — 나머지 두 열의 이슈는 실행 설정·복잡 판정의 핀을 볼 수 없으므로
   * 전역값만으로 해석하면 틀린 칩이 된다.
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
    return overlay;
  }

  /**
   * The 세션이 끝낸 일 rows (§4.2). Closed live store에서 Worker `done`에 없는 이슈 중
   * 댓글이 있는 것을 `get-comments`로 한 번 조회해, 세션 lane 보고서가 있으면
   * 완료 행을 만든다. 조회는 비동기이므로 캐시 miss는 이 렌더에서 행을 만들지
   * 않고, 끝나면 `onInvalidate()`가 재렌더를 부른다.
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
        (done_since !== undefined && closed_at < done_since) ||
        typeof issue.comment_count !== 'number' ||
        issue.comment_count <= 0
      ) {
        continue;
      }
      const identity = `${root_dir} ${issue.id} ${String(
        issue.updated_at
      )} ${issue.comment_count}`;
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
        worker_serial: false,
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
        updated_at: issue.updated_at
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
