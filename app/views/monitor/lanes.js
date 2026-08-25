/**
 * Monitor tab lane builder (UI-qrfo §8, UI-eey2 §3·§5–§8).
 *
 * The monitor no longer owns card templates. It projects every visible repo's
 * pipeline into WORKER item shapes and the Worker templates
 * (`paneTemplate`/`candidateCard`/`miniRow`/`runningTile`) draw them — 같은
 * 사실은 같은 모양으로 그린다. What is monitor-only is the SECOND axis this tab
 * has and Worker does not: the repo. Repos become 섹션 (실행가능·대기), a badge
 * (실행중·PR 대기·완료), and the coordinate every mutation carries.
 *
 * 배타 우선순위는 `running > pr_wait > (queue ∪ serial_lanes) > runnable >
 * done`이다 — 실행중인 버드는 대기 레인에 그대로 남아 있고
 * conflict-resolution attempt는 `pr_wait` 소속 버드에서도 돌기 때문에, 배타 없이
 * 그리면 같은 버드가 두 레인에 동시에 나타난다. `runnable`은 서버가 이미 레인
 * 소속 버드를 빼고 보내지만, 같은 규약을 클라이언트에서도 한 번 더 건다
 * (스냅샷 사이의 경합).
 *
 * 레포 섹션은 **`workspaces_state`를 돌며** 만든다: 큐가 빈 레포에도 후보가
 * 있으면 드롭 타깃이 필요하고 (§6), 순서는 데크 순서와 같아야 한다.
 */
import {
  activeAttemptStates,
  headReviewAttemptStates,
  isImplementationAttempt
} from '../../utils/active-attempts.js';
import { isForeignBlocker } from '../../utils/blocker-scope.js';
import {
  formatAttemptOrchestrationChip,
  formatOrchestrationChip,
  formatWorkerChip
} from '../../utils/exec-settings-chip.js';
import { resolveExecutionSettings } from '../../utils/execution-defaults.js';
import { overlapPrefixes } from '../../utils/scope-overlap.js';
import { sumAttemptUsage } from '../../utils/token-usage.js';
import {
  discardProjection,
  headReviewAttemptBadges,
  sumAttemptWorkMs
} from '../worker/lanes.js';
import {
  cleanupStalledReason,
  cleanupStepLabel
} from '../worker/merge-steps.js';
import {
  isPrWaitCleanupActive,
  prWaitProgress
} from '../worker/pr-wait-progress.js';
import {
  blockerLocationLabel,
  buildBlockerLocationMap,
  classifyBlockerPrefix,
  describeBlocker,
  detectSerialLaneHeadCycles,
  serialCycleKey
} from './blockers.js';

/**
 * @import { DependencyChip, DependencyChips, MiniItem } from '../worker/lanes.js'
 */

/**
 * Lower bound on a repo's concurrency cap, mirroring the server's `MIN_SLOTS`
 * (`server/worker/queue-store.js`). The server rejects an out-of-bound value
 * rather than clamping it, so the input carries the bound.
 */
export const MIN_SLOTS = 1;

/**
 * 실행가능 레인 정렬 (UI-eey2 §5). `updated_flat`만 섹션을 만들지 않는다 —
 * 레포 묶음이 방해될 때의 탈출구이므로, 묶음 자체가 없어야 한다.
 *
 * @type {ReadonlyArray<{ value: 'repo_spec'|'repo_updated'|'updated_flat', label: string }>}
 */
export const CANDIDATE_SORT_OPTIONS = [
  { value: 'repo_spec', label: '레포 · spec 우선' },
  { value: 'repo_updated', label: '레포 · 최신 수정' },
  { value: 'updated_flat', label: '최신 수정(레포 무시)' }
];

/**
 * spec 유무 세그먼트 (UI-eey2 §5). 판정은 runnable 투영의 `spec_id` 유무다.
 *
 * @type {ReadonlyArray<{ value: 'all'|'with'|'without', label: string }>}
 */
export const SPEC_FILTER_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'with', label: 'spec 있음' },
  { value: 'without', label: 'spec 없음' }
];

/**
 * @typedef {{ show_blocked: boolean, spec: 'all'|'with'|'without' }} CandidateFilter
 */

/**
 * 모니터의 blocked 기본값은 **표시**다 (Worker는 숨김, 사용자 결정 2026-08-24):
 * 레포 간 계획을 세우려면 막힌 후보가 보여야 한다.
 *
 * @type {CandidateFilter}
 */
export const CANDIDATE_FILTER_DEFAULT = {
  show_blocked: true,
  spec: 'all'
};

/**
 * Display names for a completion kind. 여기 없는 종류는 서버가 준 문자열
 * 그대로 싣는다 — 모르는 종료를 "정상"으로 칠하지 않는다.
 *
 * @type {Record<string, string>}
 */
const DONE_KIND_LABELS = {
  auto_merge: '자동 머지',
  merged: '머지',
  merge: '머지',
  pr_stop: 'PR 중단',
  stopped: '중단',
  failed: '실패'
};

/**
 * @typedef {MiniItem & {
 *   root_dir: string,
 *   workspace_name: string,
 *   expected_revision: number,
 *   kind?: 'session',
 *   non_occupying?: boolean,
 *   attempt_id?: string|null,
 *   run_state?: 'running'|'paused'|'failed',
 *   can_pause?: boolean,
 *   can_resume?: boolean,
 *   started_at?: number|null,
 *   last_event_at?: number|null,
 *   last_activity?: Record<string, any>|null,
 *   legs?: Array<Record<string, any>>,
 *   runner?: string|null,
 *   model?: string|null,
 *   effort?: string|null,
 *   speed?: string|null,
 *   resumed_from?: string|null,
 *   continuation_mode?: 'session'|'fresh'|null,
 *   continuation_mismatch?: any,
 *   queue_position?: number,
 *   queue_index?: number,
 *   queue_length?: number,
 *   place_index?: number,
 *   serial_lane_id?: 's1'|'s2'|'s3'|'s4'|'s5',
 *   place_lanes?: Array<{ id: 's1'|'s2'|'s3'|'s4'|'s5', index: number, length: number, occupied_by: string[] }>,
 *   blocked?: boolean,
 *   blocked_by?: string[],
 *   blockers?: import('./blockers.js').BlockerDisplay[],
 *   done_kind?: string|null,
 *   spec_id?: string,
 *   labels?: string[],
 *   overlap_chips?: OverlapChip[],
 *   scope_state?: 'declared'|'missing',
 *   cross_lane_chip?: CrossLaneChip
 * }} MonitorItem
 */

/**
 * `연결 n` / `연결 n (draft)` 칩 (UI-j92s §5.2a). draft 멤버는 어디에서도
 * 숨기지 않고, confirmed 멤버 중 실행가능·미적재인 것(어긋남)도 숨기지 않으므로,
 * 그 카드·행이 소속을 말하는 자리다. 칩 클릭 = 그 레인으로 스크롤이며 좌표는
 * `lane_id`다.
 *
 * @typedef {Object} CrossLaneChip
 * @property {string} lane_id
 * @property {number} number - 1부터. `label`과 같은 사실의 기계 판독형.
 * @property {'draft'|'confirmed'} status
 * @property {string} label
 */

/**
 * One 겹침 상대 (UI-qm12 §5.2). 표시 전용 파생값이다 — 스케줄러도 admission도
 * 선언 scope를 읽지 않는다. 칩 모양은 Worker 템플릿이 소유하므로 형태도
 * 거기서 온다.
 *
 * @typedef {import('../worker/lanes.js').OverlapChip} OverlapChip
 */

/**
 * @typedef {Object} MonitorOccupant
 * @property {string} id
 * @property {string} title
 * @property {string} badge
 */

/**
 * @typedef {Object} MonitorSerialSublane
 * @property {'s1'|'s2'|'s3'|'s4'|'s5'} id
 * @property {number} index
 * @property {MonitorItem[]} items
 * @property {string[]} occupied_by
 * @property {MonitorOccupant[]} occupants - `occupied_by`의 표시 투영 (Worker
 * 탭 ghost 행과 같은 형태). 제목은 실행중/PR 대기 항목에서 찾고, 없으면 id다.
 * @property {number} corrections
 * @property {boolean} cycle
 * @property {number} raw_length - 서버 배열의 entry 수. DOM에는 실행중으로 빠진
 * 버드가 없으므로, 드롭 말미 인덱스는 이 값이어야 서버 인덱스와 맞는다 (§6).
 * @property {boolean} [empty] - 설정만 있고 비어 있는 레인 (§6): 평소엔 한 줄
 * 힌트로 접히고 드래그 중에만 드롭 타깃 pane으로 펼쳐진다 (표시는 CSS 소유).
 * @property {Array<{ root_dir: string, workspace_name: string, lane: string }>} [cross_wait_peers]
 */

/**
 * @typedef {Object} MonitorQueueGroup
 * @property {string} root_dir
 * @property {string} name
 * @property {boolean} auto_advance
 * @property {boolean} auto_merge
 * @property {number} slots
 * @property {number} revision
 * @property {Record<string, any>} runner_catalog
 * @property {MonitorItem[]} items
 * @property {{ parallel: MonitorItem[], serial: MonitorSerialSublane[] }} sublanes
 * @property {number} serial_lane_count
 * @property {number} raw_queue_length - 병렬 큐 서버 배열의 entry 수 (§6).
 */

/**
 * @typedef {Object} MonitorRunnableSection
 * @property {string} root_dir
 * @property {string} name
 * @property {MonitorItem[]} items
 */

/**
 * 저장 레인 한 줄의 투영 (UI-j92s §5.2). route 칩·겹침 칩·`← 선행` 칩은 이
 * 행에 없다 — 레인 순서가 곧 의존이므로 같은 사실을 두 번 말하지 않는다.
 *
 * @typedef {Object} MonitorChainLaneRow
 * @property {string} id
 * @property {string} title
 * @property {string} root_dir - 위치가 해석되면 그 레포, 아니면 저장 entry가
 * 실어 온 값. 레인 멤버십은 위치보다 오래 살아 있다.
 * @property {string} workspace_name - 행이 그리는 레포 배지 (§5.2). 등록·표시되지
 * 않는 레포면 빈 문자열이다.
 * @property {number} seq - 1부터. ①②③ 표시는 뷰가 소유한다.
 * @property {string} location_label - `● 실행중`/`PR 대기`/`완료`/`실행가능`/
 * `미적재`/`외부`/병렬 `#n`/직렬 `s1 #n` (`chainRowLocationLabel` 재사용).
 * @property {boolean} draggable - 고정 행이 아닌 행만 끌 수 있다 (§5.3).
 * @property {boolean} fixed - 실행중·PR 대기·완료 (§5.3). 이 행 앞에는 넣을 수
 * 없고, 이 행의 `✕`는 허용된다.
 * @property {boolean} done
 * @property {boolean} unplaced - 큐·실행중·PR 대기·완료 어디에도 없다 (§5.2).
 * 위치 칩 `미적재`/`외부`가 그 자체로 어긋남 신호다.
 * @property {boolean} mismatch - `⚠ 의존 없음` (§5.2): confirmed 레인에서
 * 바로 앞 멤버가 이 행의 blocker가 아니다.
 * @property {number} [queue_index] - 병렬 큐 raw 좌표. 큐 밖 행에는 없다.
 */

/**
 * 저장 레인 하나 (UI-j92s §4.1·§5.1). 표시 번호 `number`는 `lanes` 배열 순서에서
 * 나오며 어디에도 저장되지 않는다.
 *
 * @typedef {Object} MonitorChainLane
 * @property {string} lane_id - 서버가 발급한 불변 id (`cl_<ulid>`).
 * @property {'draft'|'confirmed'} status
 * @property {boolean} draft
 * @property {number} number - 1부터.
 * @property {string} label - `연결 n · 레포 간`.
 * @property {MonitorChainLaneRow[]} rows
 * @property {boolean} all_done - 멤버 전원이 완료 (§5.1). 자동 삭제는 없다.
 * @property {boolean} can_confirm - draft이고 멤버가 2개 이상 (§5.1).
 * @property {boolean} has_mismatch - `재적용` 버튼의 조건 (§5.2): 어긋남 칩이나
 * `미적재` 멤버가 하나라도 있다.
 */

/**
 * @typedef {Object} MonitorLanes
 * @property {MonitorItem[]} runnable - Filter/sort 적용 후의 평면 목록.
 * @property {MonitorItem[]} runnable_all - Filter 이전의 실행가능 목록. 의존성
 * 패널의 후보 모집단은 여기서 나온다 (UI-j92s §6.1): 필터는 보기를 좁힐 뿐
 * 의존을 걸 수 있는 이슈를 줄이지 않는다.
 * @property {{ blocked: number, spec: number }} runnable_hidden - `blocked`는
 * `blocked` 토글이, `spec`은 spec 필터가 각각 걸러 낸 카드 수다. 필터 바가 이
 * 수를 자기 토글 옆에 적어 좁힌 대가를 드러낸다.
 * @property {MonitorRunnableSection[]} runnable_sections - `updated_flat`에서는
 * 빈 배열이다 (섹션 자체를 만들지 않는다).
 * @property {boolean} runnable_flat
 * @property {MonitorItem[]} queue
 * @property {MonitorQueueGroup[]} queue_groups - 대기 레인의 레포 섹션. 큐가
 * 비어 있어도 그 레포에 후보가 있으면 남는다 — 데스크톱의 유일한 적재 수단이
 * 드래그이므로 같은 레포 드롭 타깃이 있어야 한다 (§6).
 * @property {MonitorItem[]} running
 * @property {MonitorItem[]} pr_wait
 * @property {MonitorItem[]} done
 * @property {MonitorItem[]} parallel_rows - 병렬 통합 큐 (UI-e6hw §4.1): 모든
 * visible 레포의 병렬 큐 행을 레포명 → 자기 레포 큐 순서로 이은 평면 목록.
 * **confirmed** 연결 레인에 들어 있는 버드는 빠진다 (UI-j92s §5.2a).
 * @property {MonitorChainLane[]} chain_lanes - 저장 연결 레인 (UI-j92s §4.1).
 * 스냅샷 `cross_lanes.lanes` 순서 그대로이며 표시 번호도 그 순서다.
 * @property {number|null} cross_lanes_revision - 레인 op의 CAS 값. 저장소를
 * 읽을 수 없거나(스냅샷 `null`) 키 자체가 없는 구서버(`undefined`)면 `null`이고,
 * 그때 레인 op는 비활성이다 (UI-j92s §4.4·§7).
 * @property {boolean} cross_lanes_unreadable - 스냅샷이 `null`을 실어 왔다 =
 * 저장소 읽기 실패. 뷰는 `연결 레인 저장소를 읽을 수 없음` 한 줄을 그린다.
 * 구서버(키 없음)는 여기서 `false`다 — 없는 기능과 고장 난 기능은 다른 말이다.
 * @property {Record<string, number>} parallel_raw_length - root_dir → 병렬 큐
 * 서버 배열의 entry 수 (§5.1). 통합 pane은 단일 `data-lane-length`를 가질 수
 * 없으므로 드롭 좌표는 이 값에서만 나온다.
 * @property {Record<string, string>} owner_of - bead_id → root_dir. 어느 레인에도
 * 없지만 저장 연결 레인이 등록된 레포로 지목한 버드도 여기 들어온다 (§7): 의존
 * op의 root는 이 맵에서만 나오고, 숨김·해제된 레포 멤버는 키 자체가 없다.
 */

/**
 * Pick the newest attempt of a bead that has already ENDED.
 *
 * @param {Record<string, any>} attempts
 * @param {string} bead_id
 * @returns {any|null}
 */
export function latestTerminalAttempt(attempts, bead_id) {
  /** @type {any|null} */
  let best = null;
  let best_at = -Infinity;
  for (const attempt of Object.values(attempts)) {
    if (
      !attempt ||
      attempt.bead_id !== bead_id ||
      attempt.status === 'running' ||
      // 완료 종류를 정하는 것은 이 bead의 구현 시도다 (UI-hk74 §7): 나중에 끝난
      // head review가 이기면 실제 완료 종류 배지가 사라진다.
      !isImplementationAttempt(attempt)
    ) {
      continue;
    }
    const at =
      typeof attempt.finished_at === 'number'
        ? attempt.finished_at
        : typeof attempt.started_at === 'number'
          ? attempt.started_at
          : 0;
    if (at >= best_at) {
      best_at = at;
      best = attempt;
    }
  }
  return best;
}

/**
 * Fold one repo's UNFINISHED attempts onto the beads they belong to.
 *
 * 실행중 레인은 `running` attempt만이 아니라 leaf paused와 아직 처리되지 않은
 * 실패까지 받는다 — 재개·실패 정리 액션에 도달할 경로가 그 레인뿐이다.
 *
 * @param {Record<string, any>} attempts
 * @param {Map<string, number>} done_at_by_bead
 * @returns {Map<string, any>}
 */
export function activeByBead(attempts, done_at_by_bead) {
  const { winners, resumed_from_ids } = activeAttemptStates(
    attempts,
    done_at_by_bead
  );

  /** @type {Map<string, any>} */
  const map = new Map();
  for (const [bead_id, state] of winners) {
    const a = state.attempt;
    const run_state = state.run_state;
    const started_at = state.started_at;
    const has_session =
      typeof a.session_id === 'string' && a.session_id.length > 0;
    map.set(bead_id, {
      attempt_id: typeof a.attempt_id === 'string' ? a.attempt_id : '',
      run_state,
      started_at,
      last_event_at:
        typeof a.last_event_at === 'number' ? a.last_event_at : null,
      last_activity:
        a.last_activity && typeof a.last_activity === 'object'
          ? a.last_activity
          : null,
      legs: Array.isArray(a.legs) ? a.legs : [],
      runner: typeof a.runner === 'string' ? a.runner : null,
      model: typeof a.model === 'string' ? a.model : null,
      effort: typeof a.effort === 'string' ? a.effort : null,
      speed: typeof a.speed === 'string' ? a.speed : null,
      resumed_from: typeof a.resumed_from === 'string' ? a.resumed_from : null,
      continuation_mode:
        a.continuation_mode === 'session' || a.continuation_mode === 'fresh'
          ? a.continuation_mode
          : null,
      status: typeof a.status === 'string' ? a.status : null,
      usage: sumAttemptUsage(attempts, a.bead_id),
      can_pause: run_state === 'running' && has_session,
      can_resume:
        run_state !== 'running' &&
        has_session &&
        !resumed_from_ids.has(a.attempt_id)
    });
  }
  return map;
}

/**
 * The ⛔ / ♻️ chip an admission record renders as.
 *
 * @param {Record<string, any>} admission
 * @param {string} bead_id
 * @returns {string}
 */
function admissionBadge(admission, bead_id) {
  const record = admission[bead_id];
  if (!record) {
    return '';
  }
  if (record.stale === true) {
    return '♻️ stale→재리뷰';
  }
  const reason = typeof record.reason === 'string' ? record.reason : '';
  const sep = reason.indexOf(':');
  if (sep > 0 && sep < reason.length - 1) {
    return `⛔ ${reason.slice(0, sep)} (${reason.slice(sep + 1)})`;
  }
  return `⛔ ${reason}`;
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
 * The 실행가능 card's exec chips (UI-eey2 §5): drawn ONLY when the issue pin
 * resolves to something different from the repo's own default, because the repo
 * default is what the deck tile says and repeating it on every card is noise.
 *
 * Resolving twice — once with the pin, once without — is the only honest way to
 * ask "does this pin change anything": the pin's presence alone does not, since
 * a pin may store exactly the repo value.
 *
 * @param {Record<string, any>} state - The repo's `workspaces_state` row.
 * @param {Record<string, string>|null|undefined} exec_pins
 * @param {string|null} route
 * @returns {import('../../utils/exec-settings-chip.js').ExecChips|null}
 */
function pinnedExecChips(state, exec_pins, route) {
  const pins = objectOf(exec_pins);
  if (Object.keys(pins).length === 0) {
    return null;
  }
  const execution_defaults = state.execution_defaults;
  const runner_catalog = state.runner_catalog;
  const session_defaults = state.session_defaults;
  // 구버전 서버: 기본값을 알 수 없으면 "다르다"를 판정할 수 없다 — 칩 줄 자체를
  // 생략한다 (스펙 §12).
  if (!execution_defaults || !runner_catalog || !session_defaults) {
    return null;
  }
  /**
   * @param {Record<string, unknown>|null} pin
   */
  const resolve = (pin) =>
    resolveExecutionSettings({
      pin,
      global: session_defaults,
      execution_defaults,
      runner_catalog,
      route
    });
  /** @type {any} */
  let pinned;
  /** @type {any} */
  let base;
  try {
    pinned = resolve(pins);
    base = resolve(null);
  } catch {
    return null;
  }
  const orchestration = formatOrDrop(
    formatOrchestrationChip(pinned, runner_catalog),
    formatOrchestrationChip(base, runner_catalog)
  );
  const worker = formatOrDrop(
    formatWorkerChip(pinned, null),
    formatWorkerChip(base, null)
  );
  return orchestration || worker ? { orchestration, worker } : null;
}

/**
 * @param {import('../../utils/exec-settings-chip.js').ExecChip|null} pinned
 * @param {import('../../utils/exec-settings-chip.js').ExecChip|null} base
 * @returns {import('../../utils/exec-settings-chip.js').ExecChip|null}
 */
function formatOrDrop(pinned, base) {
  if (!pinned) {
    return null;
  }
  if (base && base.text === pinned.text) {
    return null;
  }
  return pinned;
}

/**
 * One blocked chip — Board 카드와 같은 한 벌이다 (`board/card.js` `blockedChips`).
 * 칩이 서 있다는 사실 자체가 "이 이슈는 저것 때문에 못 나간다"이므로 방향어를
 * 다시 적지 않고, blocker가 지금 어느 레인에 있는지는 카드가 아니라 툴팁이
 * 말한다 — 카드 위에서 `(실행가능)`은 이 이슈의 상태로 오독됐다.
 *
 * 타 레포 blocker는 같은 문구에 색만 갈라진다 (`foreign`): 기다린다는 사실은
 * 같고, 그것이 이 레포 밖에 있어 여기서 닫을 수 없다는 것만 다르다.
 *
 * @param {string} owner_id
 * @param {import('./blockers.js').BlockerDisplay} blocker
 * @returns {DependencyChip}
 */
function predecessorChip(owner_id, blocker) {
  const foreign = isForeignBlocker(owner_id, blocker.id);
  return {
    id: blocker.id,
    label: `⛓ blocked: ${blocker.id}`,
    title: `이 이슈는 ${blocker.id}가 close될 때까지 출발하지 않는다 (${blocker.location_label})`,
    ...(foreign ? { foreign: true } : {})
  };
}

/**
 * @param {string} bead_id
 * @param {Array<Record<string, any>>} states
 * @returns {string}
 */
function chainScopeLabel(bead_id, states) {
  const scope = classifyBlockerPrefix(bead_id, states);
  return scope === 'internal'
    ? '미적재'
    : scope === 'external'
      ? '외부'
      : '위치 미확인';
}

/**
 * The 연결 레인 행의 위치 칩 (§4.2). 큐 안의 노드는 자기 레포 큐 순번을 보이고,
 * 그 밖에는 현행 `blockerLocationLabel`/`chainScopeLabel` 값을 그대로 쓴다 —
 * 같은 사실에 새 문자열을 발명하지 않는다.
 *
 * @param {string} bead_id
 * @param {Map<string, import('./blockers.js').BlockerLocation>} locations
 * @param {Array<Record<string, any>>} states
 * @returns {string}
 */
function chainRowLocationLabel(bead_id, locations, states) {
  const location = locations.get(bead_id);
  if (!location) {
    return chainScopeLabel(bead_id, states);
  }
  if (typeof location.position === 'number') {
    if (location.lane === 'parallel') {
      return `#${location.position}`;
    }
    if (/^s[1-5]$/.test(location.lane)) {
      return `${location.lane} #${location.position}`;
    }
  }
  return blockerLocationLabel(location);
}

/**
 * The 저장 연결 레인 투영 (UI-j92s §4.1·§5.1·§5.2·§5.3). 파생이 아니라 서버가
 * 보관한 멤버십이므로, 이 함수는 순서를 **계산하지 않고** 읽는다: `entries`
 * 순서가 곧 레인 순서이고 표시 번호는 배열 자리다.
 *
 * bd `blocks` 의존은 여전히 실행 진실이므로, 저장 순서와 의존이 어긋나면
 * (confirmed 레인에서) `⚠ 의존 없음`으로 드러낼 뿐 어느 쪽도 고치지 않는다.
 *
 * @param {Array<Record<string, any>>} lanes - 스냅샷 `cross_lanes.lanes`.
 * @param {Map<string, string[]>} blocked_by_map
 * @param {Map<string, import('./blockers.js').BlockerLocation>} locations
 * @param {Array<Record<string, any>>} states
 * @param {Map<string, string>} title_by_bead
 * @param {Map<string, string>} name_by_root
 * @returns {MonitorChainLane[]}
 */
function buildCrossLanes(
  lanes,
  blocked_by_map,
  locations,
  states,
  title_by_bead,
  name_by_root
) {
  /** @type {MonitorChainLane[]} */
  const projected = [];
  lanes.forEach((lane, index) => {
    const lane_id = typeof lane.id === 'string' ? lane.id : '';
    if (lane_id.length === 0) {
      return;
    }
    const status = lane.status === 'confirmed' ? 'confirmed' : 'draft';
    const entries = Array.isArray(lane.entries) ? lane.entries : [];
    /** @type {MonitorChainLaneRow[]} */
    const rows = [];
    entries.forEach((entry, position) => {
      const bead_id =
        entry && typeof entry.bead_id === 'string' ? entry.bead_id : '';
      if (bead_id.length === 0) {
        return;
      }
      const entry_root =
        entry && typeof entry.root_dir === 'string' ? entry.root_dir : '';
      const location = locations.get(bead_id);
      const state = location ? location.state : undefined;
      const fixed =
        state === 'running' || state === 'pr_wait' || state === 'done';
      // 실행가능은 "적재된 자리"가 아니다 (§5.2·§5.4): 확정·재적용이 병렬 큐
      // 끝에 올리는 대상이 곧 이 집합이다.
      const unplaced = !location || state === 'runnable';
      const parallel_index =
        location &&
        location.lane === 'parallel' &&
        typeof location.position === 'number'
          ? location.position - 1
          : null;
      const previous = rows.length > 0 ? rows[rows.length - 1].id : null;
      const mismatch =
        status === 'confirmed' &&
        previous !== null &&
        !(blocked_by_map.get(bead_id) || []).includes(previous);
      rows.push({
        id: bead_id,
        title: title_by_bead.get(bead_id) || bead_id,
        root_dir: location ? location.root_dir : entry_root,
        workspace_name: location
          ? location.workspace_name
          : name_by_root.get(entry_root) || '',
        seq: position + 1,
        location_label: chainRowLocationLabel(bead_id, locations, states),
        draggable: !fixed,
        fixed,
        done: state === 'done',
        unplaced,
        mismatch,
        ...(parallel_index !== null ? { queue_index: parallel_index } : {})
      });
    });
    // 순번은 저장 배열이 아니라 그린 행 기준이다 — 형식이 깨진 entry는 위에서
    // 빠지므로 ①②③에 구멍이 생기면 안 된다.
    rows.forEach((row, seq) => {
      row.seq = seq + 1;
    });
    projected.push({
      lane_id,
      status,
      draft: status === 'draft',
      number: index + 1,
      label: `연결 ${index + 1} · 레포 간`,
      rows,
      all_done: rows.length > 0 && rows.every((row) => row.done),
      can_confirm: status === 'draft' && rows.length >= 2,
      has_mismatch:
        status === 'confirmed' &&
        rows.some((row) => row.mismatch || row.unplaced)
    });
  });
  return projected;
}

/**
 * The declared scope of ONE comparison-set item, and what that declaration says
 * about itself (UI-qm12 §5.2). 큐·실행 중 버드는 스냅샷 장식 `bead_scope`에서,
 * 실행가능 항목은 자기 행이 실어 온 `scope`에서 읽는다 — 같은 버드가 큐에
 * 적재되는 순간 판정이 달라지면 안 되므로 서버가 같은 원천을 읽는다.
 *
 * 두 분기 모두 세 상태를 같은 뜻으로 읽는다: 값 없음 = 판정 불가, 빈 배열 =
 * 선언은 읽었는데 비었다(`missing`), 항목 n개 = `declared`.
 *
 * @param {MonitorItem} item
 * @param {Map<string, Record<string, any>>} bead_scope_by_root
 * @param {Map<string, string[]>} runnable_scope_by_bead
 * @returns {{ scope: string[], state: 'declared'|'missing'|undefined }}
 */
function declaredScopeOf(item, bead_scope_by_root, runnable_scope_by_bead) {
  if (item.lane === 'runnable') {
    const scope = runnable_scope_by_bead.get(item.id);
    if (!scope) {
      return { scope: [], state: undefined };
    }
    if (scope.length === 0) {
      // 행이 `scope` 필드를 실었다 = 서버가 원천(아티팩트 front-matter 또는
      // description `## scope`)을 읽는 데 성공했다는 뜻이므로, 빈 선언은 route와
      // `spec_id`에 무관하게 판정 불가를 드러낸다 (UI-f1qy §5). 필드 부재는 위
      // `!scope`에서 이미 아무 말도 하지 않고 빠진다.
      return { scope: [], state: 'missing' };
    }
    return { scope, state: 'declared' };
  }
  const record = bead_scope_by_root.get(item.root_dir);
  const entry = record ? record[item.id] : undefined;
  // 항목 없음 = 아직 안 읽음·스펙 없음, `null` = 읽기 실패 (§4.3) — 둘 다
  // 아무 말도 하지 않는다.
  if (!entry || !Array.isArray(entry.scope)) {
    return { scope: [], state: undefined };
  }
  const scope = entry.scope.filter(
    (/** @type {unknown} */ path) => typeof path === 'string' && path.length > 0
  );
  return {
    scope,
    state: scope.length === 0 ? 'missing' : 'declared'
  };
}

/**
 * Derive the 겹침 칩 (UI-qm12 §5.2): 레포별 (실행 중 ∪ 병렬 큐 ∪ 직렬 레인 ∪
 * 실행가능) 안에서 양쪽 모두 scope를 선언한 쌍만 비교한다. PR 대기·완료는
 * 비교 집합이 아니고 레포 간 비교는 정의되지 않는다 (scope는 레포 상대 경로다).
 *
 * @param {MonitorLanes} model
 * @param {Map<string, Record<string, any>>} bead_scope_by_root
 * @param {Map<string, string[]>} runnable_scope_by_bead
 * @param {Map<string, import('./blockers.js').BlockerLocation>} locations
 * @param {Array<Record<string, any>>} states
 */
function applyScopeOverlaps(
  model,
  bead_scope_by_root,
  runnable_scope_by_bead,
  locations,
  states
) {
  /** @type {Map<string, Array<{ item: MonitorItem, scope: string[] }>>} */
  const declared_by_root = new Map();
  for (const item of [...model.running, ...model.queue, ...model.runnable]) {
    if (!bead_scope_by_root.has(item.root_dir)) {
      continue;
    }
    const { scope, state } = declaredScopeOf(
      item,
      bead_scope_by_root,
      runnable_scope_by_bead
    );
    if (state !== undefined) {
      item.scope_state = state;
    }
    if (scope.length === 0) {
      continue;
    }
    const bucket = declared_by_root.get(item.root_dir);
    if (bucket) {
      bucket.push({ item, scope });
    } else {
      declared_by_root.set(item.root_dir, [{ item, scope }]);
    }
  }

  /**
   * @param {MonitorItem} item
   * @param {MonitorItem} counterpart
   * @param {string[]} prefixes
   */
  const pushChip = (item, counterpart, prefixes) => {
    /** @type {OverlapChip} */
    const chip = {
      id: counterpart.id,
      title: counterpart.title,
      location_label: chainRowLocationLabel(counterpart.id, locations, states),
      prefixes
    };
    if (item.overlap_chips) {
      item.overlap_chips.push(chip);
    } else {
      item.overlap_chips = [chip];
    }
  };

  for (const entries of declared_by_root.values()) {
    for (let left = 0; left < entries.length; left += 1) {
      for (let right = left + 1; right < entries.length; right += 1) {
        const prefixes = overlapPrefixes(
          entries[left].scope,
          entries[right].scope
        );
        if (prefixes.length === 0) {
          continue;
        }
        pushChip(entries[left].item, entries[right].item, prefixes);
        pushChip(entries[right].item, entries[left].item, prefixes);
      }
    }
  }
}

/**
 * A timestamp that is either real or absent (UI-yrzu §5). {@link timeOf}
 * answers `0` on a parse failure, which a fallback chain would read as a valid
 * 1970 timestamp — 세션 항목의 `started_at`/`updated_at`만 이 함수를 쓴다.
 *
 * @param {unknown} value
 * @returns {number|null}
 */
export function validTime(value) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value === 'string') {
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

/**
 * @param {unknown} value
 * @returns {number}
 */
function timeOf(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

/**
 * Merge the aggregated snapshot into the five exclusive lanes, the repo
 * sections, and the 저장 연결 레인 projection on top of them.
 *
 * `options.cross_lanes`는 스냅샷 최상위 키를 그대로 받는다 (UI-j92s §4.4):
 * `null` = 저장소 읽기 실패, `undefined` = 그 키를 모르는 구서버. 둘 다 빈 레인
 * 목록으로 그리지만 사용자에게 하는 말이 다르므로 모델에서 갈라 둔다.
 *
 * @param {Array<Record<string, any>>|null|undefined} workspaces
 * @param {Array<Record<string, any>>|null|undefined} [workspaces_state]
 * @param {{ done_since?: number, running_sort?: 'started'|'repo', candidate_filter?: CandidateFilter, candidate_sort?: 'repo_spec'|'repo_updated'|'updated_flat', cross_lanes?: { revision: number, lanes: Array<Record<string, any>> }|null }} [options]
 * @returns {MonitorLanes}
 */
export function buildLanes(workspaces, workspaces_state, options) {
  const list = Array.isArray(workspaces) ? workspaces : [];
  const states = Array.isArray(workspaces_state) ? workspaces_state : [];
  const done_since =
    options && typeof options.done_since === 'number'
      ? options.done_since
      : undefined;
  const candidate_filter = {
    ...CANDIDATE_FILTER_DEFAULT,
    ...(options && options.candidate_filter ? options.candidate_filter : {})
  };
  // 키 부재(구서버)와 `null`(읽기 실패)을 끝까지 구분한다 (§4.4).
  const cross_lanes_input =
    options && Object.hasOwn(options, 'cross_lanes')
      ? (options.cross_lanes ?? null)
      : undefined;
  const candidate_sort =
    options &&
    CANDIDATE_SORT_OPTIONS.some((o) => o.value === options.candidate_sort)
      ? /** @type {'repo_spec'|'repo_updated'|'updated_flat'} */ (
          options.candidate_sort
        )
      : 'repo_spec';

  /** @type {Map<string, Record<string, any>>} */
  const state_by_root = new Map();
  for (const s of states) {
    if (s && typeof s.root_dir === 'string') {
      state_by_root.set(s.root_dir, s);
    }
  }
  // 저장 연결 레인 행의 배지·소유 레포 판정은 위치가 아니라 등록 사실에서
  // 나온다 (UI-j92s §7): 어느 레인에도 없는 멤버도 자기 레포가 보이면 배지를
  // 갖는다.
  /** @type {Map<string, string>} */
  const name_by_root = new Map();
  for (const s of states) {
    if (s && typeof s.root_dir === 'string') {
      name_by_root.set(s.root_dir, s.name || s.root_dir);
    }
  }
  for (const workspace of list) {
    if (workspace && typeof workspace.root_dir === 'string') {
      name_by_root.set(
        workspace.root_dir,
        workspace.name || workspace.root_dir
      );
    }
  }

  /** @type {MonitorItem[]} */
  const runnable = [];
  /** @type {MonitorItem[]} */
  const running = [];
  /** @type {MonitorItem[]} */
  const pr_wait = [];
  /** @type {MonitorItem[]} */
  const queue = [];
  /** @type {MonitorItem[]} */
  const done = [];
  /** @type {Array<{ id: string, root_dir: string, workspace_name: string }>} */
  const all_done_locations = [];
  /** @type {Map<string, MonitorItem[]>} */
  const queue_by_root = new Map();
  /** @type {Map<string, MonitorSerialSublane[]>} */
  const serial_by_root = new Map();
  /** @type {Map<string, number>} */
  const serial_count_by_root = new Map();
  /** @type {Map<string, number>} */
  const raw_queue_length_by_root = new Map();
  /** @type {Map<string, string[]>} */
  const blocked_by_map = new Map();
  // 선언 scope 사실 (UI-qm12 §5.2). 겹침은 레포 안에서만 정의되므로 레포별로
  // 모으고, 실행가능 항목의 scope는 큐 장식이 아니라 자기 행이 싣고 온다.
  /** @type {Map<string, Record<string, any>>} */
  const bead_scope_by_root = new Map();
  /** @type {Map<string, string[]>} */
  const runnable_scope_by_bead = new Map();
  /** @type {Map<string, string>} */
  const title_by_bead = new Map();

  for (const workspace of list) {
    if (!workspace || typeof workspace.root_dir !== 'string') {
      continue;
    }
    const root_dir = workspace.root_dir;
    const workspace_name = workspace.name || root_dir;
    const state = state_by_root.get(root_dir);
    const expected_revision =
      state && typeof state.revision === 'number'
        ? state.revision
        : typeof workspace.revision === 'number'
          ? workspace.revision
          : 0;
    const attempts = objectOf(workspace.attempts);
    const titles = objectOf(workspace.bead_titles);
    for (const [bead_id, title] of Object.entries(titles)) {
      if (typeof title === 'string' && title.length > 0) {
        title_by_bead.set(bead_id, title);
      }
    }
    const times = objectOf(workspace.bead_times);
    const observations = objectOf(workspace.pr_observations);
    const admission = objectOf(workspace.admission);
    const revise_parked = objectOf(workspace.revise_parked);
    const merge_state = objectOf(workspace.merge_queue_state);
    const cleanup_failed = objectOf(workspace.cleanup_failed);
    const discard_operations = objectOf(workspace.discard_operations);
    const bead_blocked_by = objectOf(workspace.bead_blocked_by);
    // 키 자체가 없는 구서버 스냅샷은 겹침 계산을 통째로 건너뛴다 (§5.2) —
    // 빈 객체와 "서버가 사실을 보내지 않는다"는 다른 말이다.
    if (Object.hasOwn(workspace, 'bead_scope')) {
      bead_scope_by_root.set(root_dir, objectOf(workspace.bead_scope));
    }
    // 대기·PR 대기·실행중 행의 route 칩 재료 (UI-yrzu §7.2). 연결 레인 행은
    // route 칩을 그리지 않으므로 (UI-j92s §5.2) 여기 항목에만 실린다.
    const bead_workflow = objectOf(workspace.bead_workflow);
    const pr_activity = objectOf(workspace.pr_activity);
    const repo_operations = Array.isArray(workspace.repo_operations)
      ? workspace.repo_operations
      : [];
    const merge_queue = Array.isArray(workspace.merge_queue)
      ? workspace.merge_queue
      : [];
    /** @type {Set<string>} */
    const merge_queued = new Set(
      merge_queue
        .filter((/** @type {any} */ e) => e && typeof e.bead_id === 'string')
        .map((/** @type {any} */ e) => e.bead_id)
    );
    /** @type {Map<string, any>} */
    const merge_entries = new Map(
      merge_queue
        .filter((/** @type {any} */ e) => e && typeof e.bead_id === 'string')
        .map((/** @type {any} */ e) => [e.bead_id, e])
    );
    const queue_lane = Array.isArray(workspace.queue) ? workspace.queue : [];
    const serial_lanes = (
      Array.isArray(workspace.serial_lanes) ? workspace.serial_lanes : []
    ).filter(
      (/** @type {any} */ lane) =>
        lane && /^s[1-5]$/.test(lane.id) && Array.isArray(lane.entries)
    );
    const lane_states = objectOf(workspace.lane_states);
    const serial_lane_count =
      typeof workspace.serial_lane_count === 'number'
        ? Math.max(0, Math.min(5, Math.floor(workspace.serial_lane_count)))
        : Math.min(5, serial_lanes.length);
    serial_count_by_root.set(root_dir, serial_lane_count);
    raw_queue_length_by_root.set(root_dir, queue_lane.length);
    /** @type {Map<string, any>} */
    const serial_by_id = new Map(serial_lanes.map((lane) => [lane.id, lane]));
    /** @type {Map<string, 's1'|'s2'|'s3'|'s4'|'s5'>} */
    const serial_lane_by_bead = new Map();
    for (const lane of serial_lanes) {
      for (const entry of lane.entries) {
        if (entry && typeof entry.bead_id === 'string') {
          serial_lane_by_bead.set(
            entry.bead_id,
            /** @type {'s1'|'s2'|'s3'|'s4'|'s5'} */ (lane.id)
          );
        }
      }
    }
    for (const [bead_id, blockers] of Object.entries(bead_blocked_by)) {
      if (Array.isArray(blockers)) {
        blocked_by_map.set(
          bead_id,
          blockers.filter(
            (/** @type {unknown} */ id) =>
              typeof id === 'string' && id.length > 0
          )
        );
      }
    }
    const done_lane = Array.isArray(workspace.done) ? workspace.done : [];
    for (const entry of done_lane) {
      if (entry && typeof entry.bead_id === 'string') {
        all_done_locations.push({
          id: entry.bead_id,
          root_dir,
          workspace_name
        });
      }
    }
    /** @type {Map<string, number>} */
    const done_at_by_bead = new Map();
    for (const entry of done_lane) {
      if (
        entry &&
        typeof entry.bead_id === 'string' &&
        typeof entry.added_at === 'number'
      ) {
        done_at_by_bead.set(entry.bead_id, entry.added_at);
      }
    }

    /**
     * @param {string} bead_id
     */
    const base = (bead_id) => ({
      id: bead_id,
      title: titles[bead_id] || bead_id,
      root_dir,
      workspace_name,
      expected_revision,
      draggable: false,
      ...(objectOf(times[bead_id]).created_at
        ? { created_at: objectOf(times[bead_id]).created_at }
        : {}),
      ...(objectOf(times[bead_id]).updated_at
        ? { updated_at: objectOf(times[bead_id]).updated_at }
        : {})
    });

    /** @type {Set<string>} */
    const claimed = new Set();

    for (const [bead_id, live] of activeByBead(attempts, done_at_by_bead)) {
      claimed.add(bead_id);
      running.push({
        ...base(bead_id),
        lane: 'running',
        ...(serial_lane_by_bead.has(bead_id)
          ? { serial_lane_id: serial_lane_by_bead.get(bead_id) }
          : {}),
        attempt_id: live.attempt_id,
        run_state: live.run_state,
        status: live.status || undefined,
        // 실행중 타일의 route 칩 재료 (UI-yrzu §7.2). 그 버드의 항목이 아직
        // 채워지지 않았으면 칩만 생략된다.
        workflow: /** @type {any} */ (bead_workflow[bead_id] || null),
        can_pause: live.can_pause,
        can_resume: live.can_resume,
        started_at: live.started_at,
        last_event_at: live.last_event_at,
        last_activity: live.last_activity,
        legs: live.legs,
        runner: live.runner,
        model: live.model,
        effort: live.effort,
        speed: live.speed,
        resumed_from: live.resumed_from,
        continuation_mode: live.continuation_mode,
        usage: live.usage,
        exec_chips: {
          orchestration: formatAttemptOrchestrationChip(live),
          worker: null
        },
        discard: discardProjection(discard_operations, bead_id, {
          attempt_id: live.attempt_id
        }),
        badges:
          live.run_state === 'paused'
            ? ['⏸ 일시정지']
            : live.run_state === 'failed'
              ? ['⚠ 실패']
              : [],
        alert: live.run_state === 'failed'
      });
    }

    // 돌고 있는 head review·repair 세션 (UI-hk74 §7). **비점유** 타일이다:
    // `claimed`에 넣지 않으므로 그 bead는 PR 대기 레인의 점유자로 그대로 남고,
    // 여기에는 지금 실제로 돌고 있는 리뷰/수리 세션이 함께 보일 뿐이다. 점유
    // 계산(`activeByBead`)은 구현 attempt만 본다 — 그대로 둔다.
    for (const [bead_id, review] of headReviewAttemptStates(attempts)) {
      if (running.some((item) => item.id === bead_id)) {
        continue;
      }
      const a = review.attempt;
      const label = review.kind === 'head_review' ? '리뷰' : '수리';
      running.push({
        ...base(bead_id),
        lane: 'running',
        kind: 'session',
        attempt_id: typeof a.attempt_id === 'string' ? a.attempt_id : '',
        run_state: /** @type {const} */ ('running'),
        status: 'running',
        non_occupying: true,
        workflow: /** @type {any} */ (bead_workflow[bead_id] || null),
        // 리뷰 세션은 사람이 재개·일시정지할 대상이 아니다: 저널이 그 lifecycle의
        // 주인이고, 여기서 손대면 CAS가 늦은 결과로 만들 수 있다.
        can_pause: false,
        can_resume: false,
        started_at: review.started_at,
        last_event_at:
          typeof a.last_event_at === 'number' ? a.last_event_at : null,
        last_activity:
          a.last_activity && typeof a.last_activity === 'object'
            ? a.last_activity
            : null,
        legs: Array.isArray(a.legs) ? a.legs : [],
        runner: typeof a.runner === 'string' ? a.runner : null,
        model: typeof a.model === 'string' ? a.model : null,
        effort: typeof a.effort === 'string' ? a.effort : null,
        speed: typeof a.speed === 'string' ? a.speed : null,
        resumed_from: null,
        continuation_mode: null,
        usage: a.usage && typeof a.usage === 'object' ? a.usage : null,
        exec_chips: {
          orchestration: formatAttemptOrchestrationChip(a),
          worker: null
        },
        // 이 bead는 머지 큐 안에 있다 — 폐기는 [취소] 뒤에야 열린다.
        discard: discardProjection(discard_operations, bead_id, {
          merge_queued: true
        }),
        badges: [review.origin === 'auto' ? `${label} · 자동` : label],
        alert: false
      });
    }

    // 세션이 `in_progress`로 잡은 이슈 (UI-yrzu §5). Worker 타일 직후, 같은
    // `claimed` 집합이다 — 서버가 이미 활성 attempt와 레인 멤버를 뺐지만
    // (§4.2), 스냅샷 사이의 경합은 클라이언트가 한 번 더 막는다.
    for (const entry of Array.isArray(workspace.session_active)
      ? workspace.session_active
      : []) {
      const bead_id = entry && entry.bead_id;
      if (typeof bead_id !== 'string' || claimed.has(bead_id)) {
        continue;
      }
      claimed.add(bead_id);
      if (Array.isArray(entry.blocked_by) && entry.blocked_by.length > 0) {
        blocked_by_map.set(
          bead_id,
          entry.blocked_by.filter(
            (/** @type {unknown} */ id) =>
              typeof id === 'string' && id.length > 0
          )
        );
      }
      if (typeof entry.title === 'string' && entry.title.length > 0) {
        title_by_bead.set(bead_id, entry.title);
      }
      running.push({
        ...base(bead_id),
        title: entry.title || titles[bead_id] || bead_id,
        lane: 'running',
        kind: 'session',
        status: 'in_progress',
        // 세션 타일의 경과는 시작 시각이 없으면 마지막 갱신 시각으로 물러나고,
        // 둘 다 없으면 경과·활동 줄이 통째로 생략된다 (§5·§10).
        started_at:
          validTime(entry.started_at) ??
          validTime(entry.updated_at) ??
          undefined,
        updated_at: validTime(entry.updated_at) ?? undefined,
        workflow: /** @type {any} */ (entry.workflow || null),
        labels: Array.isArray(entry.labels) ? entry.labels : [],
        spec_id: typeof entry.spec_id === 'string' ? entry.spec_id : '',
        blocked: entry.blocked === true,
        ...(Array.isArray(entry.blocked_by)
          ? {
              blocked_by: entry.blocked_by.filter(
                (/** @type {unknown} */ blocker_id) =>
                  typeof blocker_id === 'string' && blocker_id.length > 0
              )
            }
          : {}),
        // attempt가 없으므로 운영할 것이 없다 (§6): 드래그도 일시정지도 폐기도
        // 이 타일의 사실이 아니다.
        draggable: false,
        can_pause: false,
        can_resume: false,
        exec_chips: null,
        usage: null,
        legs: [],
        last_activity: null,
        badges: [],
        alert: false
      });
    }

    for (const entry of Array.isArray(workspace.pr_wait)
      ? workspace.pr_wait
      : []) {
      const bead_id = entry && entry.bead_id;
      if (typeof bead_id !== 'string' || claimed.has(bead_id)) {
        continue;
      }
      claimed.add(bead_id);
      const observed = objectOf(observations[bead_id]);
      const pr = objectOf(observed.pr);
      const gate = observed.gate ? objectOf(observed.gate) : null;
      const queued = merge_queued.has(bead_id);
      const continuation_action =
        merge_entries.get(bead_id)?.continuation_action || null;
      const continuation_required =
        !!continuation_action && continuation_action.continuation === null;
      const active = merge_state.active === bead_id;
      const external = entry.external === true;
      const cleanup = cleanup_failed[bead_id] || null;
      const activity = objectOf(pr_activity[bead_id]);
      const merge_step = prWaitProgress({
        bead_id,
        merge_sha: entry.merge_sha,
        cleanup_cursor: entry.cleanup_cursor,
        merge_progress: activity.merge_progress || null,
        cleanup_failed: cleanup,
        repo_operations
      });
      const cleanup_active = isPrWaitCleanupActive(merge_step);
      const conflicting = !!gate && gate.base_badge === '충돌';
      const cleanup_retry =
        !!cleanup &&
        ['child_sweep', 'branch_cleanup', 'parent_close'].includes(
          cleanup.step
        ) &&
        !!gate &&
        gate.tier === 'merged';
      const external_cleanup =
        external && !!cleanup && !!gate && gate.tier === 'merged';
      const gate_alert =
        !!gate &&
        ['closed_unmerged', 'review', 'undecidable'].includes(gate.tier);
      const discard = discardProjection(discard_operations, bead_id, {
        external,
        merge_active: active || merge_step?.step === 'merge',
        merge_queued: queued,
        cleanup_active,
        merged: !!cleanup || gate?.tier === 'merged'
      });
      const discard_blocks_merge = !!discard.operation;
      pr_wait.push({
        ...base(bead_id),
        lane: 'pr_wait',
        // 대기 행과 같은 route 칩 재료 (UI-yrzu §5·§7.2).
        workflow: /** @type {any} */ (bead_workflow[bead_id] || null),
        pr_number: typeof pr.number === 'number' ? pr.number : null,
        pr_url: typeof pr.url === 'string' ? pr.url : undefined,
        external,
        usage: sumAttemptUsage(attempts, bead_id),
        merge_step,
        badges: continuation_required
          ? ['이어하기 선택 필요']
          : merge_step
            ? [gate?.tier === 'merged' ? '머지됨' : '머지 중']
            : cleanup
              ? [
                  cleanupStepLabel(cleanup.step)
                    ? `정리 멈춤 · ${cleanupStepLabel(cleanup.step)}`
                    : '정리 멈춤'
                ]
              : typeof gate?.gate_badge === 'string' &&
                  gate.gate_badge.length > 0
                ? [gate.gate_badge]
                : [],
        alert: merge_step
          ? merge_step.failed === true
          : !!cleanup || gate_alert,
        reason:
          cleanup && merge_step?.active !== true
            ? cleanupStalledReason(cleanup.step)
            : 'PR 대기',
        merge_action:
          gate?.tier === 'merged' && !cleanup_retry && !external_cleanup
            ? false
            : !queued || continuation_required,
        merge_enabled:
          !discard_blocks_merge &&
          (continuation_required ||
            gate?.enabled === true ||
            conflicting ||
            cleanup_retry ||
            external_cleanup),
        merge_label: continuation_required
          ? '이어하기 선택'
          : external_cleanup || cleanup_retry
            ? '정리 재개'
            : conflicting && !cleanup_retry
              ? '충돌 해소 후 머지'
              : undefined,
        merge_title: continuation_required
          ? '실행 provider가 변경되었습니다 — 이어갈 방식을 선택하세요'
          : discard_blocks_merge
            ? discard.error
              ? `폐기 실패: ${discard.error} — [재시도]하거나 상태를 확인하세요`
              : `폐기 진행 중 — ${discard.progress || '완료를 기다리세요'}`
            : external_cleanup
              ? '머지 완료 — 클릭하면 실패한 정리를 재개합니다'
              : cleanup_retry
                ? '머지 완료 — 클릭하면 남은 정리를 실패 단계부터 재개합니다'
                : conflicting
                  ? '충돌 — 큐에 넣으면 해소 세션을 띄우고 완료 후 자동으로 재머지합니다'
                  : gate?.enabled === true
                    ? `머지 (${gate.gate_badge}) — 큐에 넣어 순서대로 머지합니다`
                    : `머지 불가: ${gate?.reason || '관측 대기'}`,
        cancel_action: queued && !continuation_required,
        cancel_enabled: !active,
        continuation_mismatch: continuation_action?.mismatch || null,
        discard,
        discard_action: discard.action,
        discard_enabled: discard.enabled,
        discard_title: discard.title
      });
    }

    /**
     * Project one parallel or serial waiting row (UI-2gi1 §5).
     *
     * @param {any} entry
     * @param {'queue'|'s1'|'s2'|'s3'|'s4'|'s5'} lane
     * @param {number} queue_index
     * @param {number} queue_length
     * @returns {MonitorItem|null}
     */
    const waitingItem = (entry, lane, queue_index, queue_length) => {
      const bead_id = entry && entry.bead_id;
      if (typeof bead_id !== 'string' || claimed.has(bead_id)) {
        return null;
      }
      claimed.add(bead_id);
      const parked = revise_parked[bead_id];
      const projected_discard = discardProjection(discard_operations, bead_id);
      const discard = projected_discard.operation ? projected_discard : null;
      /** @type {MonitorItem} */
      const item = {
        ...base(bead_id),
        lane,
        // 대기 행의 route 칩 재료 (UI-yrzu §5·§7.2). 서버는 이미 대기 레인
        // 멤버에게 `bead_workflow`를 실어 준다 — 없으면 칩만 생략된다.
        workflow: /** @type {any} */ (bead_workflow[bead_id] || null),
        // 데스크톱의 유일한 적재 수단이 드래그다 (§6) — 대기 행은 끌 수 있다.
        draggable: !discard,
        discard: discard || undefined,
        reason: admissionBadge(admission, bead_id),
        seq: queue_index + 1,
        queue_position: queue_index + 1,
        queue_index,
        queue_length,
        badges: parked ? ['⏸ REVISE 파킹'] : [],
        alert: !!parked,
        revise_action: !!parked,
        revise_enabled: !!parked && !discard,
        revise_title: parked
          ? parked.notes_tail
            ? `REVISE findings (자세히는 카드 클릭 → 이슈 상세):\n${parked.notes_tail}`
            : 'notes의 REVISE finding을 스펙에 반영하는 처분 세션을 띄웁니다'
          : ''
      };
      if (Object.hasOwn(bead_blocked_by, bead_id)) {
        item.blocked_by = Array.isArray(bead_blocked_by[bead_id])
          ? bead_blocked_by[bead_id].filter(
              (/** @type {unknown} */ blocker_id) =>
                typeof blocker_id === 'string' && blocker_id.length > 0
            )
          : [];
      }
      return item;
    };

    for (let i = 0; i < queue_lane.length; i++) {
      const item = waitingItem(queue_lane[i], 'queue', i, queue_lane.length);
      if (!item) {
        continue;
      }
      queue.push(item);
      const bucket = queue_by_root.get(root_dir);
      if (bucket) {
        bucket.push(item);
      } else {
        queue_by_root.set(root_dir, [item]);
      }
    }

    /**
     * Display projection of an occupying bead. 점유자는 이 레인 DOM에 행으로 없고(실행중/PR 대기
     * 레인 소속) 여기서는 ghost 행으로만 보이므로 드롭 인덱스에 관여하지 않는다.
     *
     * @param {string} bead_id
     * @returns {MonitorOccupant}
     */
    const occupantOf = (bead_id) => {
      const in_pr_wait = pr_wait.find(
        (item) => item.id === bead_id && item.root_dir === root_dir
      );
      if (in_pr_wait) {
        return {
          id: bead_id,
          title: in_pr_wait.title,
          badge: 'PR 대기 · 점유'
        };
      }
      const live = running.find(
        (item) => item.id === bead_id && item.root_dir === root_dir
      );
      const badge =
        live && live.run_state === 'failed'
          ? '실패 · 점유 유지'
          : live && live.run_state === 'paused'
            ? '일시정지 · 점유'
            : '실행 중 · 점유';
      return {
        id: bead_id,
        title: live ? live.title : base(bead_id).title,
        badge
      };
    };

    /** @type {MonitorSerialSublane[]} */
    const projected_serial = [];
    for (
      let lane_index = 0;
      lane_index < Math.max(serial_lane_count, serial_lanes.length);
      lane_index++
    ) {
      const id = /** @type {'s1'|'s2'|'s3'|'s4'|'s5'} */ (`s${lane_index + 1}`);
      const lane = serial_by_id.get(id);
      const entries = lane && Array.isArray(lane.entries) ? lane.entries : [];
      /** @type {MonitorItem[]} */
      const items = [];
      for (let i = 0; i < entries.length; i++) {
        const item = waitingItem(entries[i], id, i, entries.length);
        if (!item) {
          continue;
        }
        items.push(item);
        queue.push(item);
      }
      const lane_state = objectOf(lane_states[id]);
      const occupied_by = Array.isArray(lane_state.occupied_by)
        ? lane_state.occupied_by.filter(
            (/** @type {any} */ bead_id) => typeof bead_id === 'string'
          )
        : [];
      // 설정된 레인 수가 1이고 그마저 비었으면 힌트도 생략한다 (§6): 드롭
      // 타깃이 하나뿐인 병렬 pane과 구분할 것이 없다.
      if (
        items.length === 0 &&
        occupied_by.length === 0 &&
        (serial_lane_count <= 1 || lane_index >= serial_lane_count)
      ) {
        continue;
      }
      projected_serial.push({
        id,
        index: lane_index,
        items,
        raw_length: entries.length,
        occupied_by,
        occupants: occupied_by.map((bead_id) => occupantOf(bead_id)),
        corrections: Array.isArray(lane_state.corrections)
          ? lane_state.corrections.length
          : 0,
        cycle: lane_state.cycle === true,
        ...(items.length === 0 && occupied_by.length === 0
          ? { empty: true }
          : {})
      });
    }
    serial_by_root.set(root_dir, projected_serial);

    const place_lanes = Array.from(
      { length: serial_lane_count },
      (_, lane_index) => {
        const id = /** @type {'s1'|'s2'|'s3'|'s4'|'s5'} */ (
          `s${lane_index + 1}`
        );
        const lane = serial_by_id.get(id);
        const entries = lane && Array.isArray(lane.entries) ? lane.entries : [];
        const lane_state = objectOf(lane_states[id]);
        return {
          id,
          index: entries.length,
          length: entries.length,
          occupied_by: Array.isArray(lane_state.occupied_by)
            ? lane_state.occupied_by.filter(
                (/** @type {any} */ bead_id) => typeof bead_id === 'string'
              )
            : []
        };
      }
    );

    for (const entry of Array.isArray(workspace.runnable)
      ? workspace.runnable
      : []) {
      const bead_id = entry && entry.bead_id;
      if (typeof bead_id !== 'string' || claimed.has(bead_id)) {
        continue;
      }
      claimed.add(bead_id);
      const workflow =
        entry.workflow && typeof entry.workflow === 'object'
          ? entry.workflow
          : null;
      const route =
        (workflow && typeof workflow.route === 'string' && workflow.route) ||
        (typeof entry.route === 'string' ? entry.route : null);
      const exec_chips = pinnedExecChips(
        objectOf(state),
        entry.exec_pins,
        route
      );
      if (Array.isArray(entry.blocked_by) && entry.blocked_by.length > 0) {
        blocked_by_map.set(
          bead_id,
          entry.blocked_by.filter(
            (/** @type {unknown} */ id) =>
              typeof id === 'string' && id.length > 0
          )
        );
      }
      // 연결 레인은 실행가능 멤버도 그린다 (UI-j92s §5.2) — 큐 제목 캐시에 없는
      // 그 제목이 여기서만 들어온다.
      if (typeof entry.title === 'string' && entry.title.length > 0) {
        title_by_bead.set(bead_id, entry.title);
      }
      if (Array.isArray(entry.scope)) {
        runnable_scope_by_bead.set(
          bead_id,
          entry.scope.filter(
            (/** @type {unknown} */ path) =>
              typeof path === 'string' && path.length > 0
          )
        );
      }
      runnable.push({
        ...base(bead_id),
        title: entry.title || titles[bead_id] || bead_id,
        lane: 'runnable',
        draggable: true,
        reason: admissionBadge(admission, bead_id),
        created_at: entry.created_at ?? undefined,
        updated_at: entry.updated_at ?? undefined,
        status: typeof entry.status === 'string' ? entry.status : undefined,
        labels: Array.isArray(entry.labels) ? entry.labels : [],
        spec_id: typeof entry.spec_id === 'string' ? entry.spec_id : '',
        // Phase 1이 `workflow`를 실어 주므로 실행가능 카드도 Worker와 같은
        // stepper를 그린다. 없으면 route 칩만 남는다 (fail-quiet).
        workflow: /** @type {any} */ (
          workflow || (route ? { route, chips: { route } } : null)
        ),
        ...(exec_chips ? { exec_chips } : {}),
        blocked: entry.blocked === true,
        ...(Array.isArray(entry.blocked_by)
          ? {
              blocked_by: entry.blocked_by.filter(
                (/** @type {unknown} */ blocker_id) =>
                  typeof blocker_id === 'string' && blocker_id.length > 0
              )
            }
          : {}),
        place_index: queue_lane.length,
        place_lanes
      });
    }

    for (const entry of done_lane) {
      const bead_id = entry && entry.bead_id;
      if (typeof bead_id !== 'string' || claimed.has(bead_id)) {
        continue;
      }
      claimed.add(bead_id);
      if (
        done_since !== undefined &&
        typeof entry.added_at === 'number' &&
        entry.added_at < done_since
      ) {
        continue;
      }
      const terminal = latestTerminalAttempt(attempts, bead_id);
      const kind =
        terminal && typeof terminal.done_kind === 'string'
          ? terminal.done_kind
          : null;
      done.push({
        ...base(bead_id),
        lane: 'done',
        done: true,
        // 완료 3줄 행 (§8): 레포 배지가 붙으면 2줄 변형에서 제목이 먼저 잘린다.
        done_layout: 'three_line',
        usage: sumAttemptUsage(attempts, bead_id),
        work_ms: sumAttemptWorkMs(attempts, bead_id),
        done_at:
          typeof entry.added_at === 'number' ? entry.added_at : undefined,
        done_kind: kind,
        // 완료 종류 배지 + 이 bead에 섞인 head review·repair 시도 (UI-hk74 §7).
        badges: [
          ...(kind && DONE_KIND_LABELS[kind] ? [DONE_KIND_LABELS[kind]] : []),
          ...headReviewAttemptBadges(attempts, bead_id)
        ]
      });
    }
  }

  /** @type {Map<string, number>} */
  const repo_order = new Map();
  states.forEach((entry, index) => {
    if (entry && typeof entry.root_dir === 'string') {
      repo_order.set(entry.root_dir, index);
    }
  });
  const running_sort =
    options && options.running_sort === 'repo' ? 'repo' : 'started';
  running.sort((a, b) => {
    // Worker 타일 전체가 세션 타일 전체보다 앞이다 (UI-yrzu §5): 두 종류는
    // 다른 사실(attempt vs. bead 상태)을 말하므로 섞어 정렬하면 어느 쪽도
    // 훑을 수 없다. `repo` 정렬을 택해도 이 분할이 먼저다.
    const a_session = a.kind === 'session';
    const b_session = b.kind === 'session';
    if (a_session !== b_session) {
      return a_session ? 1 : -1;
    }
    if (a_session && b_session) {
      const diff = timeOf(b.updated_at) - timeOf(a.updated_at);
      return diff !== 0 ? diff : a.id.localeCompare(b.id);
    }
    if (running_sort === 'repo') {
      const a_repo = repo_order.get(a.root_dir) ?? Number.MAX_SAFE_INTEGER;
      const b_repo = repo_order.get(b.root_dir) ?? Number.MAX_SAFE_INTEGER;
      if (a_repo !== b_repo) {
        return a_repo - b_repo;
      }
    }
    const a_started =
      typeof a.started_at === 'number' && Number.isFinite(a.started_at)
        ? a.started_at
        : null;
    const b_started =
      typeof b.started_at === 'number' && Number.isFinite(b.started_at)
        ? b.started_at
        : null;
    if (a_started !== null && b_started !== null && a_started !== b_started) {
      return a_started - b_started;
    }
    if (a_started === null && b_started !== null) {
      return 1;
    }
    if (a_started !== null && b_started === null) {
      return -1;
    }
    return a.id.localeCompare(b.id);
  });
  done.sort((a, b) => (b.done_at ?? 0) - (a.done_at ?? 0));

  // 대기 섹션은 `workspaces_state`를 돌며 만든다 — 큐가 빈 레포에도 후보가
  // 있으면 같은 레포 드롭 타깃이 있어야 한다 (§6).
  const group_sources =
    states.length > 0
      ? states
      : list.map((w) => ({
          root_dir: w && w.root_dir,
          name: w && w.name,
          auto_advance: w && w.auto_advance,
          auto_merge: w && w.auto_merge,
          slots: w && w.slots,
          revision: w && w.revision,
          runner_catalog: w && w.runner_catalog
        }));

  /** @type {Set<string>} */
  const roots_with_candidates = new Set(runnable.map((item) => item.root_dir));

  /** @type {MonitorQueueGroup[]} */
  const queue_groups = [];
  for (const source of group_sources) {
    if (!source || typeof source.root_dir !== 'string') {
      continue;
    }
    const parallel = queue_by_root.get(source.root_dir) || [];
    const serial = serial_by_root.get(source.root_dir) || [];
    const has_queue =
      parallel.length > 0 ||
      serial.some(
        (lane) => lane.items.length > 0 || lane.occupied_by.length > 0
      );
    if (!has_queue && !roots_with_candidates.has(source.root_dir)) {
      continue;
    }
    queue_groups.push({
      root_dir: source.root_dir,
      name: source.name || source.root_dir,
      auto_advance: source.auto_advance === true,
      auto_merge: source.auto_merge === true,
      slots:
        typeof source.slots === 'number' && source.slots >= MIN_SLOTS
          ? source.slots
          : MIN_SLOTS,
      revision: typeof source.revision === 'number' ? source.revision : 0,
      runner_catalog: objectOf(source.runner_catalog),
      items: parallel,
      sublanes: { parallel, serial },
      serial_lane_count: serial_count_by_root.get(source.root_dir) || 0,
      raw_queue_length: raw_queue_length_by_root.get(source.root_dir) || 0
    });
  }

  /** @type {MonitorLanes} */
  const model = {
    runnable,
    runnable_all: runnable,
    runnable_hidden: { blocked: 0, spec: 0 },
    runnable_sections: [],
    runnable_flat: candidate_sort === 'updated_flat',
    queue,
    queue_groups,
    running,
    pr_wait,
    done,
    parallel_rows: [],
    chain_lanes: [],
    cross_lanes_revision:
      cross_lanes_input && typeof cross_lanes_input.revision === 'number'
        ? cross_lanes_input.revision
        : null,
    cross_lanes_unreadable: cross_lanes_input === null,
    parallel_raw_length: Object.fromEntries(raw_queue_length_by_root),
    owner_of: {}
  };

  // 이하는 스냅샷 한 번에만 유효한 표시 파생값이다.
  const locations = buildBlockerLocationMap(model);
  for (const entry of all_done_locations) {
    if (!locations.has(entry.id)) {
      locations.set(entry.id, {
        root_dir: entry.root_dir,
        workspace_name: entry.workspace_name,
        lane: 'done',
        state: 'done'
      });
    }
  }

  for (const item of [...model.queue, ...model.runnable]) {
    if (!Object.hasOwn(item, 'blocked_by')) {
      continue;
    }
    const current_location = locations.get(item.id);
    item.blockers = (item.blocked_by || []).map((blocker_id) =>
      describeBlocker(blocker_id, current_location, locations, states)
    );
  }

  // 카드는 blocked만 말한다: 역방향(후속) 칩은 걷어냈다 — 이미 출발한 이슈에게
  // "네가 누굴 막는다"를 알려도 그 이슈가 할 일이 없고, 막힌 쪽 카드에 같은
  // 사실이 blocked 칩으로 이미 서 있다. 후속 관계 자체는 의존성 패널이 그린다.
  for (const item of [
    ...model.queue,
    ...model.runnable,
    ...model.running,
    ...model.pr_wait
  ]) {
    /** @type {DependencyChip[]} */
    const predecessors =
      item.lane === 'running' || item.lane === 'pr_wait'
        ? []
        : (item.blockers || []).map((blocker) =>
            predecessorChip(item.id, blocker)
          );
    if (predecessors.length === 0) {
      continue;
    }
    /** @type {DependencyChips} */
    const chips = { predecessors };
    item.dependency_chips = chips;
  }

  applyScopeOverlaps(
    model,
    bead_scope_by_root,
    runnable_scope_by_bead,
    locations,
    states
  );

  const cross_wait_cycles = detectSerialLaneHeadCycles(model.queue_groups);
  for (const group of model.queue_groups) {
    for (const lane of group.sublanes.serial) {
      const peers = cross_wait_cycles.get(
        serialCycleKey(group.root_dir, lane.id)
      );
      if (peers) {
        lane.cross_wait_peers = peers;
      }
    }
  }

  // 대기 레인 통합 투영 (UI-e6hw §4). 연결 레인이 먼저다 — 병렬 통합 큐의
  // 숨김 규칙이 confirmed 레인 멤버 집합에서 나온다 (UI-j92s §5.2a).
  model.chain_lanes = buildCrossLanes(
    cross_lanes_input && Array.isArray(cross_lanes_input.lanes)
      ? cross_lanes_input.lanes
      : [],
    blocked_by_map,
    locations,
    states,
    title_by_bead,
    name_by_root
  );

  // 소속 칩은 실행가능 카드와 대기 행에만 붙는다 (§5.2a).
  /** @type {Map<string, MonitorItem>} */
  const item_by_bead = new Map();
  for (const item of [...model.queue, ...model.runnable]) {
    if (!item_by_bead.has(item.id)) {
      item_by_bead.set(item.id, item);
    }
  }

  // confirmed 멤버만 병렬 영역에서 숨긴다 (§5.2a): draft는 아직 대기가 아니므로
  // 어디에서도 숨기지 않고, 숨기지 않는 멤버는 대신 소속 칩을 단다.
  /** @type {Set<string>} */
  const confirmed_parallel_members = new Set();
  for (const lane of model.chain_lanes) {
    for (const row of lane.rows) {
      if (lane.status === 'confirmed' && !row.unplaced && !row.fixed) {
        confirmed_parallel_members.add(row.id);
      }
      // 숨기는 멤버는 칩이 필요 없다 — 레인 행이 이미 그 사실을 말한다.
      if (!lane.draft && !row.unplaced) {
        continue;
      }
      const item = item_by_bead.get(row.id);
      if (!item) {
        continue;
      }
      item.cross_lane_chip = {
        lane_id: lane.lane_id,
        number: lane.number,
        status: lane.status,
        label: lane.draft
          ? `연결 ${lane.number} (draft)`
          : `연결 ${lane.number}`
      };
    }
  }
  /** @type {MonitorItem[]} */
  const parallel_rows = [];
  for (const items of queue_by_root.values()) {
    for (const item of items) {
      if (!confirmed_parallel_members.has(item.id)) {
        parallel_rows.push(item);
      }
    }
  }
  // 레포명 오름차순으로 같은 레포 행을 붙이고, 레포 안에서는 서버 큐 순서 (§4.1).
  parallel_rows.sort((a, b) => {
    const by_name = a.workspace_name.localeCompare(b.workspace_name);
    return by_name !== 0
      ? by_name
      : (a.queue_index ?? 0) - (b.queue_index ?? 0);
  });
  model.parallel_rows = parallel_rows;

  /** @type {Record<string, string>} */
  const owner_of = {};
  for (const [bead_id, location] of locations) {
    if (typeof location.root_dir === 'string' && location.root_dir.length > 0) {
      owner_of[bead_id] = location.root_dir;
    }
  }
  // 어느 레인에도 없는 레인 멤버의 레포는 저장 entry만이 안다 (§7). 등록·표시된
  // 레포일 때만 싣는다 — 숨김·해제된 레포 멤버는 키가 없어야 그 멤버가 낀 의존
  // 계획이 거부된다.
  for (const lane of model.chain_lanes) {
    for (const row of lane.rows) {
      if (
        !Object.hasOwn(owner_of, row.id) &&
        row.root_dir.length > 0 &&
        name_by_root.has(row.root_dir)
      ) {
        owner_of[row.id] = row.root_dir;
      }
    }
  }
  model.owner_of = owner_of;

  // 실행가능 필터·정렬은 마지막이다: 파생값(의존 칩·체인)은 필터와 무관하게
  // 전 레포 사실에서 나와야 한다.
  const before = model.runnable.length;
  // 필터가 감춘 카드도 의존 상대로는 살아 있다 (UI-j92s §6.1) — 후보 모집단은
  // 필터 이전 목록에서 나온다.
  model.runnable_all = model.runnable.slice();
  let visible = model.runnable;
  if (!candidate_filter.show_blocked) {
    visible = visible.filter((item) => item.blocked !== true);
  }
  const after_blocked = visible.length;
  if (candidate_filter.spec === 'with') {
    visible = visible.filter((item) => !!item.spec_id);
  } else if (candidate_filter.spec === 'without') {
    visible = visible.filter((item) => !item.spec_id);
  }
  model.runnable_hidden = {
    blocked: before - after_blocked,
    spec: after_blocked - visible.length
  };

  /**
   * @param {MonitorItem} a
   * @param {MonitorItem} b
   */
  const byUpdated = (a, b) => {
    const diff = timeOf(b.updated_at) - timeOf(a.updated_at);
    return diff !== 0 ? diff : a.id.localeCompare(b.id);
  };
  /**
   * @param {MonitorItem} a
   * @param {MonitorItem} b
   */
  const bySpecThenUpdated = (a, b) => {
    const a_spec = a.spec_id ? 0 : 1;
    const b_spec = b.spec_id ? 0 : 1;
    return a_spec !== b_spec ? a_spec - b_spec : byUpdated(a, b);
  };
  const within = candidate_sort === 'repo_spec' ? bySpecThenUpdated : byUpdated;

  if (candidate_sort === 'updated_flat') {
    model.runnable = visible.slice().sort(byUpdated);
    model.runnable_sections = [];
  } else {
    /** @type {Map<string, MonitorItem[]>} */
    const by_root = new Map();
    for (const item of visible) {
      const bucket = by_root.get(item.root_dir);
      if (bucket) {
        bucket.push(item);
      } else {
        by_root.set(item.root_dir, [item]);
      }
    }
    /** @type {MonitorRunnableSection[]} */
    const sections = [];
    /** @type {MonitorItem[]} */
    const ordered = [];
    for (const source of group_sources) {
      if (!source || typeof source.root_dir !== 'string') {
        continue;
      }
      const items = (by_root.get(source.root_dir) || []).slice().sort(within);
      by_root.delete(source.root_dir);
      if (items.length === 0) {
        continue;
      }
      sections.push({
        root_dir: source.root_dir,
        name: source.name || source.root_dir,
        // 섹션 헤더가 레포를 말하므로 카드는 배지를 그리지 않는다 (§5).
        // 섹션 헤더가 레포를 말하므로 카드는 배지를 그리지 않는다 — 빈 이름이
        // 곧 "배지 없음"이다 (Worker 템플릿의 조건이 값의 존재다).
        items: items.map((item) => ({ ...item, workspace_name: '' }))
      });
      ordered.push(...items);
    }
    // 제어 상태에 없는 레포(구버전 스냅샷)는 뒤에 붙인다 — 후보를 지우지 않는다.
    for (const [root_dir, items] of by_root) {
      const sorted = items.slice().sort(within);
      sections.push({
        root_dir,
        name: sorted[0]?.workspace_name || root_dir,
        items: sorted.map((item) => ({ ...item, workspace_name: '' }))
      });
      ordered.push(...sorted);
    }
    model.runnable = ordered;
    model.runnable_sections = sections;
  }

  return model;
}
