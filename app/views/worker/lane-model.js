/**
 * Shared lane builder (Worker · Monitor) (UI-qrfo §8, UI-eey2 §3·§5–§8).
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
  isImplementationAttempt,
  reviewSessionAttemptStates
} from '../../utils/active-attempts.js';
import { isForeignBlocker } from '../../utils/blocker-scope.js';
import {
  formatAttemptOrchestrationChip,
  formatOrchestrationChip,
  formatWorkerChip
} from '../../utils/exec-settings-chip.js';
import { resolveExecutionSettings } from '../../utils/execution-defaults.js';
import { resumeKindOf } from '../../utils/quickfix-resume-kind.js';
import { recSettings } from '../../utils/rec-settings.js';
import { overlapPrefixes } from '../../utils/scope-overlap.js';
import {
  SUM_FIELDS,
  formatUsageTotalWithCost,
  mergeUsageProjections,
  providerUsageBadges,
  sumAttemptUsage
} from '../../utils/token-usage.js';
import { modelRunnerOf } from '../detail-panel/exec-settings.js';
import {
  blockerLocationLabel,
  buildBlockerLocationMap,
  classifyBlockerPrefix,
  describeBlocker,
  detectSerialLaneHeadCycles,
  serialCycleKey
} from '../monitor/blockers.js';
import {
  discardProjection,
  quickFixLanded,
  reviewSessionAttemptBadges,
  sumAttemptWorkMs
} from './lanes.js';
import { cleanupStalledReason, cleanupStepLabel } from './merge-steps.js';
import { isPrWaitCleanupActive, prWaitProgress } from './pr-wait-progress.js';
// 칩의 모양은 두 탭이 공유한다 (UI-anna §5.1): 워커 투영도 같은 함수를 불러
// 같은 라벨·같은 툴팁 문장 틀을 낸다.
import {
  dependentsChip,
  predecessorChip,
  releasedChip
} from './queue-blockers.js';

/**
 * @import { DependencyChip, DependencyChips, MiniItem } from './lanes.js'
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
 * spec 유무 세그먼트 (UI-eey2 §5). 판정은 runnable 투영의 `published` 필드,
 * 즉 spec 경로 + 유효한 `spec_review` receipt다 (UI-vb7u §3). 경로만 있고
 * 리뷰가 아직 없는 행은 `spec 없음` 쪽에 선다.
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
  failed: '실패',
  refuted: '반증',
  no_delta: '무-delta'
};

/**
 * @typedef {MiniItem & {
 *   root_dir: string,
 *   workspace_name: string,
 *   expected_revision: number,
 *   kind?: 'session',
 *   non_occupying?: boolean,
 *   attempt_id?: string|null,
 *   run_state?: 'running'|'paused'|'failed'|'parked'|'retry_wait'|'waiting',
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
 *   failure?: import('./running-grid.js').FailureTile|null,
 *   wait?: import('./running-grid.js').WaitTile|null,
 *   retry?: import('./running-grid.js').RetryTile|null,
 *   conflict_resolution?: boolean,
 *   base_exception?: string|null,
 *   rollup?: import('../../utils/child-rollup.js').ChildRollup|null,
 *   landing?: { step: string, label: string, index: number, total: number, percent: number, active: boolean, failed: boolean },
 *   queue_position?: number,
 *   queue_index?: number,
 *   queue_length?: number,
 *   place_index?: number,
 *   serial_lane_id?: 's1'|'s2'|'s3'|'s4'|'s5',
 *   place_lanes?: Array<{ id: 's1'|'s2'|'s3'|'s4'|'s5', index: number, length: number, occupied_by: string[] }>,
 *   blocked?: boolean,
 *   blocked_by?: string[],
 *   carried_to?: string[],
 *   blockers?: import('../monitor/blockers.js').BlockerDisplay[],
 *   done_kind?: string|null,
 *   spec_id?: string,
 *   published?: boolean,
 *   labels?: string[],
 *   dependents_info?: import('./queue-blockers.js').DependentsInfo,
 *   overlap_chips?: OverlapChip[],
 *   scope_state?: 'declared'|'missing',
 *   cross_lane_chip?: CrossLaneChip,
 *   armed_lane_chip?: ArmedLaneChip,
 *   session_refs?: import('../../../server/worker/session-ref.js').SessionRefView[]
 * }} LaneItem
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
 * `▶ 연결 n` / `▶ 진행 중 · 레인 없음` 칩 (UI-jaua §5.6·§5.3 (2)). 그 엔트리가
 * armed일 때 병렬 대기 행·실행중 타일이 그린다. 자리는 카드 문법 §5.1 슬롯 4
 * "의존·겹침"이다 — 그 표가 `연결 레인 칩`을 이미 그 슬롯에 배정했고, 이 칩이
 * 답하는 질문도 "지금 갈 수 있나"다.
 *
 * `orphan`은 `armed_by_lane`이 스냅샷에 없는 레인을 가리키는 상태다. 스케줄러는
 * 계속 발차하므로 숨기지 않고 드러내며(fail-visible), 그 자리에서 해제할 수 있게
 * 칩이 해제 버튼을 함께 싣는다.
 *
 * @typedef {Object} ArmedLaneChip
 * @property {string} lane_id
 * @property {string} label
 * @property {boolean} orphan
 */

/**
 * One 겹침 상대 (UI-qm12 §5.2). 표시 전용 파생값이다 — 스케줄러도 admission도
 * 선언 scope를 읽지 않는다. 칩 모양은 Worker 템플릿이 소유하므로 형태도
 * 거기서 온다.
 *
 * @typedef {import('./lanes.js').OverlapChip} OverlapChip
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
 * @property {LaneItem[]} items
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
 * @typedef {Object} LaneQueueGroup
 * @property {string} root_dir
 * @property {string} name
 * @property {boolean} auto_advance
 * @property {boolean} auto_merge
 * @property {number} slots
 * @property {number} revision
 * @property {Record<string, any>} runner_catalog
 * @property {LaneItem[]} items
 * @property {{ parallel: LaneItem[], serial: MonitorSerialSublane[] }} sublanes
 * @property {number} serial_lane_count
 * @property {number} raw_queue_length - 병렬 큐 서버 배열의 entry 수 (§6).
 * @property {number} live_count - 슬롯을 점유하는 실행 중 attempt 수 (UI-4tud
 * §4.3). 세션 타일·일시정지·실패 타일은 세지 않는다.
 * @property {boolean} over_cap - {@link live_count}가 {@link slots}를 넘었다.
 * 수동 ▶가 의도적으로 넘길 수 있으므로 막지 않고 드러낸다.
 * @property {LaneMergeQueue} merge - 순차 머지 큐의 위치·해소·이어하기·권한과
 * 드라이버의 라이브 기억 (UI-5v7d). Monitor는 읽지 않는다.
 * @property {string|Array<{ provider: 'claude'|'codex', label: string, tooltip: string }>|null} token_total
 * - 이 레포 완료 레인의 토큰 합계. 아무 행도 보고하지 않았으면 `null`이다.
 * @property {Array<Record<string, any>>} cleanup_failures - durable 정리 실패
 * 기록 (worker-phase2 §6).
 * @property {string|null} declared_base - 워크스페이스가 선언한 base (UI-j6wa
 * §3). 선언을 읽지 못했거나 구서버면 `null`이다 (fail-quiet).
 * @property {Array<Record<string, any>>} repo_operations - 서버가 이미 투영한
 * 저장소 작업 카드 (master spec §10). 그대로 지나간다.
 */

/**
 * 한 레포의 순차 머지 큐 (UI-5v7d). 멤버십과 순서는 durable하고, 활성 항목과
 * 스킵 사유는 드라이버의 라이브 기억이다.
 *
 * @typedef {Object} LaneMergeQueue
 * @property {Map<string, number>} positions - bead_id → 1부터의 큐 순번.
 * @property {Map<string, any>} resolutions - bead_id → 충돌 해소 투영.
 * @property {Map<string, any>} continuations - bead_id → `continuation_action`.
 * @property {Map<string, any>} authorities - bead_id → 머지 권한 기록.
 * @property {{ active: string|null, failures: Record<string, string>, waiting: { bead_id: string, reason: string }|null }} state
 * @property {string[]} auto_excluded - 자동 편입이 지금 건너뛸 PR 대기 행
 * (UI-yk55 §3.2): 기록된 head가 지금 관측된 head와 같은 것만 센다.
 * @property {boolean} running - Whether the queue holds at least one entry.
 */

/**
 * @typedef {Object} MonitorRunnableSection
 * @property {string} root_dir
 * @property {string} name
 * @property {LaneItem[]} items
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
 * @property {string} location_label - "지금 막혀 있나"를 답하는 칩 (UI-jaua §8):
 * `🔒 대기`/`대기`/`▶ 실행중`/`PR 대기`/`완료`/`실행가능`/`미적재`/`외부`/
 * `위치 미확인`. 레포별 큐 순번은 라벨이 아니라 {@link location_title}이다 —
 * 레인 순번 `①②` 옆의 `#n`이 전역 실행 순서로 오독됐다 (§1.4).
 * @property {string} location_title - `beads-ui 병렬 #1` 같은 좌표 툴팁. 큐 밖
 * 행에는 말할 좌표가 없으므로 빈 문자열이다 (fail-quiet).
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
 * @property {'draft'|'confirmed'|'running'|'failed'|'restart'|'all_done'} state
 * - 저장하지 않고 파생하는 레인 상태 (UI-jaua §5.5). 판정은 배타 우선순위로
 * 위에서 아래로 한 번만 한다: 실패 > 재시작 > 진행 중 > 모두 완료/확정. draft
 * 레인에는 발차 축이 없으므로 언제나 `draft`다.
 * @property {string} badge - 헤더 상태 배지 (`draft`/`확정`/`▶ 진행 중`/
 * `⛔ 실패`/`⏸ 재시작`). `모두 완료`는 {@link all_done}이 따로 그린다.
 * @property {string|null} run_label - `▶ 진행`/`▶ 이어서 진행`/`▶ 다시 진행`,
 * 그릴 것이 없으면 `null`. 미발차 멤버가 남아 있는 한 이 조작이 사라지지 않는
 * 것이 §9 복구 경로의 성립 조건이다.
 * @property {boolean} can_stop - Whether `⏸ 정지`가 선다 (진행 중일 때만).
 * 이미 도는 세션과 이미 머지 큐에 든 항목은 그대로 간다 — 회수가 아니라 후보
 * 축소다.
 * @property {string[]} unlaunched - 완료·실행중·PR 대기·머지 대기 어디에도 없고
 * 이 레인에 armed되지도 않은 멤버 (§5.5).
 */

/**
 * @typedef {Object} LaneModel
 * @property {LaneItem[]} runnable - Filter/sort 적용 후의 평면 목록.
 * @property {LaneItem[]} runnable_all - Filter 이전의 실행가능 목록. 의존성
 * 패널의 후보 모집단은 여기서 나온다 (UI-j92s §6.1): 필터는 보기를 좁힐 뿐
 * 의존을 걸 수 있는 이슈를 줄이지 않는다.
 * @property {{ blocked: number, spec: number }} runnable_hidden - `blocked`는
 * `blocked` 토글이, `spec`은 spec 필터가 각각 걸러 낸 카드 수다. 필터 바가 이
 * 수를 자기 토글 옆에 적어 좁힌 대가를 드러낸다.
 * @property {MonitorRunnableSection[]} runnable_sections - `updated_flat`에서는
 * 빈 배열이다 (섹션 자체를 만들지 않는다).
 * @property {boolean} runnable_flat
 * @property {LaneItem[]} queue
 * @property {LaneQueueGroup[]} queue_groups - 대기 레인의 레포 섹션. 큐가
 * 비어 있어도 그 레포에 후보가 있으면 남는다 — 데스크톱의 유일한 적재 수단이
 * 드래그이므로 같은 레포 드롭 타깃이 있어야 한다 (§6).
 * @property {LaneItem[]} running
 * @property {LaneItem[]} pr_wait
 * @property {LaneItem[]} done
 * @property {LaneItem[]} parallel_rows - 병렬 통합 큐 (UI-e6hw §4.1): 모든
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
 * Status of a bead's last implementation attempt, or null when it has none.
 *
 * 레인 점유는 실행중 레인보다 오래 산다 (`activeLaneLineages`): ✕로 닫힌 실패,
 * supersede된 실패, 이미 완료로 정리된 실패는 실행중 타일에서 빠지지만 lineage는 레인을
 * 계속 붙잡는다. 그 상태를 실행중 레인 목록에서만 읽으면 실패가 '실행 중'이 된다.
 *
 * head review·repair attempt는 제외한다 — 점유는 구현 attempt의 질문이다.
 *
 * @param {Record<string, any>} attempts
 * @param {string} bead_id
 * @returns {string|null}
 */
export function lastImplementationStatus(attempts, bead_id) {
  /** @type {string|null} */
  let status = null;
  for (const attempt of Object.values(attempts || {})) {
    if (
      !attempt ||
      attempt.bead_id !== bead_id ||
      !isImplementationAttempt(attempt)
    ) {
      continue;
    }
    status = typeof attempt.status === 'string' ? attempt.status : null;
  }
  return status;
}

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
 * @param {{ discard_operations?: Record<string, any>, observations?: Record<string, any>, bead_timelines?: Record<string, any> }} [input]
 * @returns {Map<string, any>}
 */
export function activeByBead(attempts, done_at_by_bead, input = {}) {
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
    // 정산 재개는 서버에서 세션 ID도 워크트리도 요구하지 않으므로 (UI-8h1x
    // §3.2·§3.3b) `has_session`은 세션 재실행일 때만 조건이다. 반대로
    // `resumed_from_ids` 검사는 세션 유무와 무관한 중복 방지라 두 경우 모두
    // 유지한다.
    const resume_kind = resumeKindOf(a.quickfix_landing);
    const session_required = resume_kind === 'session';
    const resume_eligible =
      run_state !== 'running' &&
      (has_session || !session_required) &&
      !resumed_from_ids.has(a.attempt_id);
    const resume_reason =
      !has_session && session_required
        ? 'session_id 없는 구 attempt — 이어하기 불가'
        : resumed_from_ids.has(a.attempt_id)
          ? '이미 이어받은 attempt (child attempt 존재) — 이어하기 불가'
          : null;
    const observed = objectOf(input.observations?.[bead_id]);
    const observed_pr = objectOf(observed.pr);
    const merged =
      (typeof a.merge_sha === 'string' && a.merge_sha.length > 0) ||
      observed_pr.state === 'MERGED';
    const discard = discardProjection(input.discard_operations, bead_id, {
      attempt_id: a.attempt_id,
      merged
    });
    const failure =
      run_state === 'failed'
        ? failureProjection(a, {
            resume_eligible,
            resume_reason,
            confirmation: discard.confirmation,
            history: input.bead_timelines?.[bead_id]
          })
        : null;
    map.set(bead_id, {
      ...liveAttemptFields(a, attempts, run_state),
      started_at,
      ...(failure ? { failure } : {}),
      can_pause: run_state === 'running' && has_session,
      can_resume: resume_eligible
    });
  }

  // 사람(파킹) 또는 시계(backoff)를 기다리는 attempt (UI-5ym8 §3.1·§3.3).
  // `activeAttemptStates`는 실행·일시정지·실패만 안다 — 그 판정은 점유(그리고
  // 서버의 `counts.running`)가 쓰는 것이고, 이 둘은 슬롯을 잡지 않으므로 거기
  // 넣으면 기다리는 bead가 '실행 중'으로 세어진다. 그래서 타일은 여기서 난다.
  for (const [bead_id, held] of heldAttemptStates(attempts, done_at_by_bead)) {
    // 같은 bead에 살아 있는 attempt가 이미 있으면 그것이 이긴다: 사람이 파킹을
    // 재시도해 새 세션이 도는 동안 옛 파킹 기록이 카드를 빼앗지 않는다.
    if (map.has(bead_id)) {
      continue;
    }
    const a = held.attempt;
    const discard = discardProjection(input.discard_operations, bead_id, {
      attempt_id: a.attempt_id
    });
    const retry = retryProjection(a);
    map.set(bead_id, {
      ...liveAttemptFields(a, attempts, held.run_state),
      started_at: typeof a.started_at === 'number' ? a.started_at : null,
      ...(held.run_state === 'parked'
        ? {
            failure: failureProjection(a, {
              // 파킹의 출구는 이어하기가 아니라 새 attempt다 (§3.1): 같은
              // 세션을 되살리면 사용자가 결정하기 전 자리로 돌아간다.
              resume_eligible: false,
              resume_reason: '세션 대기 — [재시도]가 새 attempt를 띄웁니다',
              confirmation: discard.confirmation,
              history: input.bead_timelines?.[bead_id]
            })
          }
        : {}),
      // 선행 대기는 `failure` 투영을 쓰지 않는다 (선행 대기 계층 §5.1): 실패
      // 팝오버가 묻는 것 — 실패 코드·착지 단계·재개 행 — 중 이 결말이 답할 수
      // 있는 질문이 하나도 없고, 정산은 시작되지도 않았다.
      ...(held.run_state === 'waiting' ? { wait: waitProjection(a) } : {}),
      ...(retry ? { retry } : {}),
      can_pause: false,
      can_resume: false
    });
  }
  return map;
}

/**
 * The fields every 실행중 항목 carries whatever its state is. Extracted so the
 * running/paused/failed loop and the parked/retry_wait loop cannot end up
 * describing the same attempt with two different sets of facts.
 *
 * @param {any} a
 * @param {Record<string, any>} attempts
 * @param {'running'|'paused'|'failed'|'parked'|'retry_wait'|'waiting'} run_state
 */
function liveAttemptFields(a, attempts, run_state) {
  return {
    attempt_id: typeof a.attempt_id === 'string' ? a.attempt_id : '',
    run_state,
    last_event_at: typeof a.last_event_at === 'number' ? a.last_event_at : null,
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
    usage: sumAttemptUsage(attempts, a.bead_id)
  };
}

/**
 * The decision material of an attempt that ENDED without landing — a failure or
 * a park (UI-5ym8 §8). Both travel through the same projection because both
 * answer the same question ("무엇이 이 시도를 끝냈나"); only the badge and the
 * buttons differ, and those are the renderer's call.
 *
 * `summary` is hoisted out of `cause_detail` rather than left inside it: it is
 * the ONE line the parked tile body and the failure popover's first row both
 * read, and records written before §6 simply have none (fail-quiet).
 *
 * `timeline`/`log_path`/`log_expired`/`log_unreadable` come from the snapshot's `bead_timelines`
 * decoration (record-timeline-retention §9), NOT from anything the renderer
 * reads: ADR 14 makes this projection the only place a card's materials are
 * assembled. The events arrive oldest first and are turned around here, because
 * "무엇이 방금 일어났나" is the question the popover asks and the ordering
 * decision belongs to the one assembler rather than to each surface.
 *
 * @param {any} a
 * @param {{ resume_eligible: boolean, resume_reason: string|null, confirmation: 'merged'|'unmerged', history?: any }} ctx
 * @returns {import('./running-grid.js').FailureTile}
 */
function failureProjection(a, ctx) {
  const cause_detail =
    a.cause_detail && typeof a.cause_detail === 'object'
      ? a.cause_detail
      : null;
  return {
    cause: typeof a.cause === 'string' ? a.cause : null,
    cause_detail,
    summary:
      cause_detail && typeof cause_detail.summary === 'string'
        ? cause_detail.summary
        : null,
    bead_id: typeof a.bead_id === 'string' ? a.bead_id : '',
    finished_at: typeof a.finished_at === 'number' ? a.finished_at : null,
    runner: typeof a.runner === 'string' ? a.runner : null,
    model: typeof a.model === 'string' ? a.model : null,
    effort: typeof a.effort === 'string' ? a.effort : null,
    observed_effort:
      typeof a.observed_effort === 'string' ? a.observed_effort : null,
    speed: typeof a.speed === 'string' ? a.speed : null,
    attempt_id: typeof a.attempt_id === 'string' ? a.attempt_id : '',
    usage: a.usage && typeof a.usage === 'object' ? a.usage : null,
    halted_auto_advance: a.halted_auto_advance === true,
    quickfix_lane: a.quickfix_lane === true,
    quickfix_landing:
      a.quickfix_landing && typeof a.quickfix_landing === 'object'
        ? a.quickfix_landing
        : null,
    retry: retryProjection(a),
    resume_eligible: ctx.resume_eligible,
    resume_reason: ctx.resume_reason,
    landed: quickFixLanded(a),
    confirmation: ctx.confirmation,
    ...timelineFields(ctx.history)
  };
}

/**
 * The §9 history material of one bead, folded into the failure/park projection.
 *
 * Every key is OMITTED when its material is missing rather than carried as an
 * empty value: the popover and the parked tile decide whether to draw a row by
 * asking whether the key is there, and an empty array would make them draw an
 * empty 이력 block for every bead whose timeline predates this spec.
 *
 * @param {any} history - One `bead_timelines` entry, or undefined.
 * @returns {{ timeline?: import('./running-grid.js').TimelineRow[], log_path?: string, log_expired?: boolean, log_unreadable?: boolean }}
 */
function timelineFields(history) {
  if (!history || typeof history !== 'object') {
    return {};
  }
  const events = Array.isArray(history.events) ? history.events : [];
  /** @type {import('./running-grid.js').TimelineRow[]} */
  const rows = [];
  for (const event of events) {
    if (
      !event ||
      typeof event !== 'object' ||
      typeof event.summary !== 'string' ||
      event.summary.length === 0
    ) {
      continue;
    }
    rows.push({
      event_id: typeof event.event_id === 'string' ? event.event_id : '',
      kind: typeof event.kind === 'string' ? event.kind : '',
      summary: event.summary,
      at: typeof event.at === 'number' ? event.at : null
    });
  }
  rows.reverse();
  const log_path =
    typeof history.log_path === 'string' && history.log_path.length > 0
      ? history.log_path
      : null;
  return {
    ...(rows.length > 0 ? { timeline: rows } : {}),
    ...(log_path === null ? {} : { log_path }),
    ...(history.log_expired === true ? { log_expired: true } : {}),
    ...(history.log_unreadable === true ? { log_unreadable: true } : {})
  };
}

/**
 * The decision material of an attempt that ended on an UNMET PREREQUISITE
 * (선행 대기 계층 §5.1). Its own projection rather than the failure one because
 * the questions differ: this tile says what the session left behind and which
 * bead it is waiting on, and it has no exits — the blocker closing is what
 * moves it.
 *
 * `blockers` is the server's proven list (§4.4), kept in its `{id, rig, status}`
 * shape so the 4a chip reads the same fact the settlement recorded. Records
 * written without it simply carry none (fail-quiet).
 *
 * @param {any} a
 * @returns {import('./running-grid.js').WaitTile}
 */
function waitProjection(a) {
  const cause_detail =
    a.cause_detail && typeof a.cause_detail === 'object'
      ? a.cause_detail
      : null;
  const raw = Array.isArray(cause_detail?.blockers)
    ? cause_detail.blockers
    : [];
  /** @type {Array<{ id: string, rig: string|null, status: string }>} */
  const blockers = [];
  for (const blocker of raw) {
    if (
      !blocker ||
      typeof blocker !== 'object' ||
      typeof blocker.id !== 'string' ||
      blocker.id.length === 0
    ) {
      continue;
    }
    blockers.push({
      id: blocker.id,
      rig: typeof blocker.rig === 'string' ? blocker.rig : null,
      status: typeof blocker.status === 'string' ? blocker.status : ''
    });
  }
  return {
    summary:
      cause_detail && typeof cause_detail.summary === 'string'
        ? cause_detail.summary
        : null,
    blockers,
    since: typeof a.finished_at === 'number' ? a.finished_at : null
  };
}

/**
 * The backoff facts of one attempt (UI-5ym8 §6), or null when it carries none.
 * A record written before §6 has no `retry` key at all, so the 재시도 대기 badge
 * and the popover's 이력 row simply do not render.
 *
 * @param {any} attempt
 * @returns {import('./running-grid.js').RetryTile|null}
 */
function retryProjection(attempt) {
  const retry =
    attempt && attempt.retry && typeof attempt.retry === 'object'
      ? attempt.retry
      : null;
  if (!retry) {
    return null;
  }
  return {
    cause: typeof retry.cause === 'string' ? retry.cause : null,
    attempts: typeof retry.attempts === 'number' ? retry.attempts : 0,
    max: typeof retry.max === 'number' ? retry.max : 0,
    next_at: typeof retry.next_at === 'number' ? retry.next_at : null
  };
}

/**
 * Attempt statuses that keep a bead in the 실행중 레인 WITHOUT it running
 * (UI-5ym8 §6). `parked` waits for a person's decision and `retry_wait` waits
 * for the backoff clock; neither is a failure, so neither halts the queue, and
 * neither occupies a slot — but both need a tile, because the tile is the only
 * place the 재시도·폐기 actions exist.
 *
 * `waiting` joins them (선행 대기 계층 §5.1): the session refused to start on an
 * unmet prerequisite, so nothing is running and nothing failed. It differs from
 * the other two in having no exit of its own — the blocker closing brings the
 * bead back as an ordinary candidate — but it still needs a tile, because
 * otherwise the bead vanishes from the board while it waits.
 *
 * `superseded` is deliberately NOT here: it records an attempt that a later
 * retry replaced, so it is history and leaves the grid the way a dismissed
 * failure does.
 *
 * @type {Set<string>}
 */
const HELD_STATUSES = new Set(['parked', 'retry_wait', 'waiting']);

/**
 * The parked/retry_wait attempts of one repo, folded onto their beads.
 *
 * The admission rules mirror the unhandled-failure ones exactly (last
 * implementation attempt · not dismissed · not resolved by a done entry), so a
 * park a person already cleared does not come back as a card.
 *
 * @param {Record<string, any>} attempts
 * @param {Map<string, number>} done_at_by_bead
 * @returns {Map<string, { attempt: any, run_state: 'parked'|'retry_wait'|'waiting' }>}
 */
function heldAttemptStates(attempts, done_at_by_bead) {
  const values = /** @type {any[]} */ (Object.values(attempts || {}));
  /** @type {Map<string, string>} */
  const last_impl_by_bead = new Map();
  for (const a of values) {
    if (a && typeof a.bead_id === 'string' && isImplementationAttempt(a)) {
      last_impl_by_bead.set(a.bead_id, a.attempt_id);
    }
  }
  /** @type {Map<string, { attempt: any, run_state: 'parked'|'retry_wait'|'waiting' }>} */
  const held = new Map();
  for (const a of values) {
    if (
      !a ||
      typeof a.bead_id !== 'string' ||
      a.bead_id.length === 0 ||
      !isImplementationAttempt(a) ||
      !HELD_STATUSES.has(a.status) ||
      last_impl_by_bead.get(a.bead_id) !== a.attempt_id ||
      typeof a.dismissed_at === 'number'
    ) {
      continue;
    }
    const done_at = done_at_by_bead.get(a.bead_id);
    if (
      typeof done_at === 'number' &&
      done_at > 0 &&
      typeof a.finished_at === 'number' &&
      done_at >= a.finished_at
    ) {
      continue;
    }
    held.set(a.bead_id, { attempt: a, run_state: a.status });
  }
  return held;
}

/**
 * The ⛔ chip an admission record renders as.
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
  // 유일한 비-차단 관측이다 (UI-dlim §3.4): 그 bead는 admit돼 실행되므로 ⛔
  // 거절 표시를 달아서는 안 되고, 디스패치가 세션에 요구하는 세션 내 재리뷰를
  // 알릴 뿐이다.
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
 * The DISPLAY-ONLY receipt codes on a `receipt_check` summary (UI-h6t1 §4.3).
 * dotfiles 계약의 `badge` 등급이며, 서버가 `summarizeReceiptCheck`로 실어 보낸다.
 * 부재·비배열·빈 문자열은 전부 빈 목록이다 (fail-quiet).
 *
 * @param {unknown} summary
 * @returns {string[]}
 */
function receiptBadgeCodesOf(summary) {
  const codes = objectOf(summary).badge_codes;
  return Array.isArray(codes)
    ? codes.filter((code) => typeof code === 'string' && code.length > 0)
    : [];
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
 * The `🔓 <ID>` 칩 한 벌 (UI-d13v §5.3, 상한 제거는 UI-8x90 §4.2). 7일 창은
 * {@link releasedChip}이 닫고, 여기서는 `closed_at` desc 정렬만 정한다 — 칩 수를
 * 제한하는 것은 그 창 하나뿐이다. 재료가 없거나 전부 창 밖이면 `null`이다
 * (fail-quiet).
 *
 * @param {string} bead_id
 * @param {any} release_info
 * @param {number} now
 * @returns {import('./lanes.js').ReleasedChip[]|null}
 */
export function releasedChipsFor(bead_id, release_info, now) {
  const released_by =
    release_info &&
    typeof release_info === 'object' &&
    Array.isArray(release_info.released_by)
      ? release_info.released_by
      : [];
  const ordered = released_by
    .filter(
      (/** @type {any} */ entry) =>
        entry && typeof entry === 'object' && typeof entry.id === 'string'
    )
    .slice()
    .sort(
      (/** @type {any} */ a, /** @type {any} */ b) =>
        (typeof b.closed_at === 'number' ? b.closed_at : 0) -
        (typeof a.closed_at === 'number' ? a.closed_at : 0)
    );
  /** @type {import('./lanes.js').ReleasedChip[]} */
  const chips = [];
  for (const entry of ordered) {
    const chip = releasedChip(bead_id, entry, now);
    if (chip) {
      chips.push(chip);
    }
  }
  return chips.length === 0 ? null : chips;
}

/**
 * The base-exception badge text for one attempt, or null when there is no
 * exception to report (UI-j6wa §3).
 *
 * Both unknowns are fail-quiet rather than alarming: a `declared_base` of null
 * means the server could not read the declaration, and a legacy attempt carries
 * no `target_base` at all. Comparing against either would badge on ignorance,
 * and this badge only ever means "this attempt targets something else".
 *
 * @param {string|null|undefined} declared_base
 * @param {string|null|undefined} target_base
 * @returns {string|null}
 */
export function baseException(declared_base, target_base) {
  if (typeof declared_base !== 'string' || declared_base.length === 0) {
    return null;
  }
  if (typeof target_base !== 'string' || target_base.length === 0) {
    return null;
  }
  return target_base === declared_base ? null : `→ ${target_base}`;
}

/**
 * The three workflow routes an execution resolution accepts
 * (worker-card-exec-chips §2.2). Anything else — an unknown string, a missing
 * key — resolves as no route.
 *
 * @type {ReadonlySet<string>}
 */
const WORKFLOW_ROUTES = new Set(['quick_fix', 'spec_backed', 'full_plan']);

/**
 * @param {unknown} value
 * @returns {value is string}
 */
function isWorkflowRoute(value) {
  return typeof value === 'string' && WORKFLOW_ROUTES.has(value);
}

/**
 * The 전역 실행 값 layer of a repo: the workspace's session defaults with the
 * snapshot's orchestration triple on top (Worker `exec_global_values`).
 *
 * @param {Record<string, any>} state - The repo's `workspaces_state` row.
 * @returns {Record<string, any>}
 */
function execGlobalValues(state) {
  /** @type {Record<string, any>} */
  const values = { ...objectOf(state.session_defaults) };
  for (const key of [
    'orchestration_model',
    'orchestration_effort',
    'orchestration_speed'
  ]) {
    const value = state[key];
    if (typeof value === 'string') {
      values[key] = value;
    }
  }
  return values;
}

/**
 * The 대기 행·후보 카드 exec chips of a bead whose issue `metadata` the caller
 * knows: "what this bead WOULD run with" (Worker `beadExecChips`). Resolved
 * twice on purpose — the controller runtime comes out of the orchestration
 * model, which only the first resolution knows, and it is in turn an input to
 * `impl_runtime: inherit`.
 *
 * @param {Record<string, any>} state - The repo's `workspaces_state` row.
 * @param {Record<string, any>} metadata - The bead's issue metadata.
 * @param {unknown} enriched_route - Server-enriched `workflow.route`, if known.
 * @returns {import('../../utils/exec-settings-chip.js').ExecChips|null}
 */
function overlayExecChips(state, metadata, enriched_route) {
  const runner_catalog = state.runner_catalog ?? null;
  const probe = execRows(state, metadata, enriched_route, null);
  if (!probe) {
    return null;
  }
  const ctl = modelRunnerOf(
    runner_catalog,
    probe.orchestration_model.value ?? ''
  );
  const rows =
    ctl === null
      ? probe
      : execRows(state, metadata, enriched_route, ctl) || probe;
  const orchestration = formatOrchestrationChip(rows, runner_catalog);
  const worker = formatWorkerChip(rows, ctl);
  return orchestration || worker ? { orchestration, worker } : null;
}

/**
 * One bead's resolved execution settings, the way the issue detail's
 * effective-settings card resolves them (Worker `execRowsFor`). `route`는 서버
 * 장식(`enriched_route`)이 먼저이고 핀 metadata가 다음이다 — `impl_dispatch`의
 * route 기본값(`quick_fix → main`)이 Board 카드와 같은 답을 하도록.
 *
 * @param {Record<string, any>} state - The repo's `workspaces_state` row.
 * @param {Record<string, any>} metadata - The bead's issue metadata.
 * @param {unknown} enriched_route - Server-enriched `workflow.route`, if known.
 * @param {string|null} controller_runtime
 * @returns {Record<string, import('../../utils/execution-defaults.js').ExecutionValue>|null}
 */
function execRows(state, metadata, enriched_route, controller_runtime) {
  const route = isWorkflowRoute(enriched_route)
    ? enriched_route
    : isWorkflowRoute(metadata.route)
      ? metadata.route
      : null;
  try {
    return resolveExecutionSettings({
      pin: metadata,
      global: execGlobalValues(state),
      execution_defaults: state.execution_defaults ?? null,
      runner_catalog: state.runner_catalog ?? null,
      route,
      controller_runtime
    });
  } catch {
    return null;
  }
}

/**
 * The 실행 중 타일의 worker(구현 위임) 칩 (Worker `attemptExecChips`,
 * worker-card-exec-chips §2.2). 그 attempt가 **기록한** runner가
 * `impl_runtime: inherit`이 따를 controller이므로, 후보·대기 행처럼
 * orchestration 모델에서 controller를 되유추하지 않고 그 값을 그대로 쓴다.
 * 오버레이가 이 bead의 metadata를 모르면(구독 열 밖·Monitor 스냅샷) 칩이
 * 서지 않는다 — 틀린 칩보다 없는 칩.
 *
 * @param {Record<string, any>} state - The repo's `workspaces_state` row.
 * @param {Record<string, any>|null|undefined} overlay - The bead's `bead_overlay` entry.
 * @param {string|null} controller_runtime - The attempt's own runner.
 * @returns {import('../../utils/exec-settings-chip.js').ExecChip|null}
 */
function attemptWorkerChip(state, overlay, controller_runtime) {
  if (!overlay || !Object.hasOwn(overlay, 'metadata')) {
    return null;
  }
  return formatWorkerChip(
    execRows(
      state,
      objectOf(overlay.metadata),
      overlay.route,
      controller_runtime
    ),
    controller_runtime
  );
}

/**
 * Whether this attempt is doing conflict-resolution work (UI-dxgz §1). The ▶
 * resume path mints its child with `conflict_resolution: false`, so the flag is
 * inherited through `resumed_from` — otherwise resuming a paused resolution
 * makes the badge vanish.
 *
 * @param {any} attempt
 * @param {Map<string, any>} attempt_by_id
 * @returns {boolean}
 */
export function resolvesConflict(attempt, attempt_by_id) {
  /** @type {Set<string>} */
  const seen = new Set();
  let cur = attempt;
  while (cur && !seen.has(cur.attempt_id)) {
    if (cur.conflict_resolution === true) {
      return true;
    }
    seen.add(cur.attempt_id);
    cur =
      typeof cur.resumed_from === 'string' && cur.resumed_from.length > 0
        ? attempt_by_id.get(cur.resumed_from) || null
        : null;
  }
  return false;
}

/**
 * The 완료 레인 토큰 KPI (UI-58y2 §툴바, UI-tq13 §5): 행이 이미 들고 있는
 * usage의 합이라 새 데이터 소스가 없다. 보고된 0과 아예 보고되지 않은 usage는
 * 다른 사실이므로, 아무 행도 보고하지 않았으면 `null`이다.
 *
 * @param {LaneItem[]} rows
 * @returns {string|Array<{ provider: 'claude'|'codex', label: string, tooltip: string }>|null}
 */
function doneTokenTotal(rows) {
  /** @type {Record<string, number>} */
  const token_sum = {};
  for (const field of SUM_FIELDS) {
    token_sum[field] = 0;
  }
  let token_reported = false;
  // 비용은 합산 대상 전부가 보고했을 때만 붙인다 (UI-j6wa §2): 일부만 보고한
  // 합계에 $를 붙이면 토큰과 돈이 서로 다른 모집단을 말한다.
  let cost_sum = 0;
  let summed_rows = 0;
  let cost_rows = 0;
  for (const row of rows) {
    const usage = /** @type {any} */ (row.usage);
    if (!usage || typeof usage !== 'object') {
      continue;
    }
    let row_reported = false;
    for (const field of SUM_FIELDS) {
      if (Number.isFinite(usage[field])) {
        token_sum[field] += usage[field];
        token_reported = true;
        row_reported = true;
      }
    }
    if (row_reported) {
      summed_rows += 1;
      if (Number.isFinite(usage.total_cost_usd)) {
        cost_sum += usage.total_cost_usd;
        cost_rows += 1;
      }
    }
  }
  if (summed_rows > 0 && cost_rows === summed_rows) {
    token_sum.total_cost_usd = cost_sum;
  }
  const projections = rows
    .map((row) => /** @type {any} */ (row.usage))
    .filter((usage) => usage && typeof usage === 'object' && usage.providers);
  if (projections.length > 0) {
    return providerUsageBadges(mergeUsageProjections(projections));
  }
  return token_reported ? formatUsageTotalWithCost(token_sum) : null;
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
 * @param {Map<string, import('../monitor/blockers.js').BlockerLocation>} locations
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
 * The 연결 레인 행의 위치 칩 (UI-jaua §8). 답하는 질문이 "어디 있나"가 아니라
 * **"지금 막혀 있나"**다: 레인 순번 `①②` 옆에 선 큐 순번 `#n`을 사용자가 전역
 * 실행 순서로 읽었기 때문에(§1.4), 순번은 툴팁으로 내리고 라벨은 막힘 여부만
 * 말한다.
 *
 * blocked 판정 재료는 스냅샷 `bead_blocked_by`뿐이다. 그 맵은 닫힌 blocker를
 * 이미 뺀 뒤이므로(같은 rig는 `status`, foreign은 모니터의 prune) 항목이 비어
 * 있지 않으면 아직 열린 blocker가 있다는 뜻이고, **키 자체가 없으면 모르는
 * 것**이므로 순번 없는 `대기`로 수렴한다 (fail-quiet).
 *
 * @param {string} bead_id
 * @param {Map<string, import('../monitor/blockers.js').BlockerLocation>} locations
 * @param {Array<Record<string, any>>} states
 * @param {Map<string, string[]>} blocked_by_map
 * @returns {{ label: string, title: string }}
 */
function chainRowLocation(bead_id, locations, states, blocked_by_map) {
  const location = locations.get(bead_id);
  if (!location) {
    return { label: chainScopeLabel(bead_id, states), title: '' };
  }
  const queued =
    typeof location.position === 'number' &&
    (location.lane === 'parallel' || /^s[1-5]$/.test(location.lane));
  if (queued) {
    const blockers = blocked_by_map.get(bead_id);
    const lane_name = location.lane === 'parallel' ? '병렬' : location.lane;
    return {
      label: blockers && blockers.length > 0 ? '🔒 대기' : '대기',
      title: `${location.workspace_name || location.root_dir} ${lane_name} #${location.position}`
    };
  }
  return {
    label:
      location.state === 'running'
        ? '▶ 실행중'
        : blockerLocationLabel(location),
    title: ''
  };
}

/**
 * The `armed_by_lane` ONE attempt was dispatched with (UI-jaua §5.1), or `null`.
 * 레코드를 값으로 훑는다 — 키가 attempt_id라는 관례에 실패 판정을 걸면, 그
 * 관례가 어긋난 스냅샷에서 실패가 조용히 `▶ 진행 중`으로 읽힌다.
 *
 * @param {Record<string, any>} attempts
 * @param {string} attempt_id
 * @returns {string|null}
 */
function armedLaneOfAttempt(attempts, attempt_id) {
  for (const attempt of Object.values(attempts || {})) {
    if (
      attempt &&
      attempt.attempt_id === attempt_id &&
      typeof attempt.armed_by_lane === 'string' &&
      attempt.armed_by_lane.length > 0
    ) {
      return attempt.armed_by_lane;
    }
  }
  return null;
}

/**
 * 발차 축의 스냅샷 재료 (UI-jaua §5.5). 세 값 모두 workspace를 가로질러 모은
 * 것이다 — 한 레인의 멤버가 여러 레포에 걸치므로 레인 상태는 레포 하나로
 * 판정할 수 없다.
 *
 * @typedef {Object} LaneRunAxis
 * @property {Map<string, string>} armed_by_bead - bead_id → 그 엔트리의
 * `armed_by_lane` (병렬 대기·PR 대기 행).
 * @property {Map<string, string>} failed_by_bead - bead_id → 그 버드의 마지막
 * terminal 구현 attempt가 실어 온 `armed_by_lane`. 실패한 attempt만 들어온다.
 * @property {Set<string>} disarmed_lanes - 보이는 workspace들의
 * `disarmed_on_load` 합집합 (§5.1): 한 레포에서라도 해제됐으면 그 레인은
 * 재시작이 멈춘 것이다.
 */

/**
 * Derive ONE lane's 상태와 조작 (UI-jaua §5.5 두 표). 판정은 **배타
 * 우선순위**로 위에서 아래로 한 번만 한다: 실패(1) > 재시작(2) > 진행 중(3) >
 * 모두 완료·확정·draft(4). 상태가 한 곳에서만 나와야 배지와 버튼이 어긋나지
 * 않는다.
 *
 * 실패는 attempt 스냅샷의 `armed_by_lane`에 결속된다 (§5.1). 이 결속이 없으면
 * 그 실패가 이 레인의 발차에서 왔는지 사용자가 켠 `auto_advance`에서 왔는지
 * 구별할 수 없고, 무관한 실패가 레인을 멈춘 것처럼 보인다.
 *
 * draft 레인에는 발차 축이 없다 — `진행`은 확정 레인의 조작이므로 draft는
 * armed될 수 없고, 상태도 `draft` 하나다.
 *
 * @param {string} lane_id
 * @param {'draft'|'confirmed'} status
 * @param {MonitorChainLaneRow[]} rows
 * @param {boolean} all_done
 * @param {string[]} unlaunched
 * @param {LaneRunAxis} axis
 * @returns {{ state: MonitorChainLane['state'], badge: string, run_label: string|null, can_stop: boolean }}
 */
function laneRunState(lane_id, status, rows, all_done, unlaunched, axis) {
  if (status === 'draft') {
    return { state: 'draft', badge: 'draft', run_label: null, can_stop: false };
  }
  if (rows.some((row) => axis.failed_by_bead.get(row.id) === lane_id)) {
    return {
      state: 'failed',
      badge: '⛔ 실패',
      run_label: '▶ 다시 진행',
      can_stop: false
    };
  }
  if (axis.disarmed_lanes.has(lane_id)) {
    return {
      state: 'restart',
      badge: '⏸ 재시작',
      run_label: '▶ 진행',
      can_stop: false
    };
  }
  if (rows.some((row) => axis.armed_by_bead.get(row.id) === lane_id)) {
    return {
      state: 'running',
      badge: '▶ 진행 중',
      // 부분 성공으로 진행 중이 되어도 남은 멤버를 올릴 버튼은 사라지지 않는다
      // (§9): 그 재클릭이 복구 경로다.
      run_label: unlaunched.length > 0 ? '▶ 이어서 진행' : null,
      can_stop: true
    };
  }
  if (all_done) {
    // 상태 배지는 하나다 (§5.5 표): 전원 완료 행의 헤더는 `모두 완료`이고,
    // 그 옆에 `확정`을 함께 세우면 배타 상태 표가 두 배지로 갈라진다.
    return {
      state: 'all_done',
      badge: '모두 완료',
      run_label: null,
      can_stop: false
    };
  }
  return {
    state: 'confirmed',
    badge: '확정',
    run_label: '▶ 진행',
    can_stop: false
  };
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
 * @param {Map<string, import('../monitor/blockers.js').BlockerLocation>} locations
 * @param {Array<Record<string, any>>} states
 * @param {Map<string, string>} title_by_bead
 * @param {Map<string, string>} name_by_root
 * @param {LaneRunAxis} axis
 * @returns {MonitorChainLane[]}
 */
function buildCrossLanes(
  lanes,
  blocked_by_map,
  locations,
  states,
  title_by_bead,
  name_by_root,
  axis
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
      const location_chip = chainRowLocation(
        bead_id,
        locations,
        states,
        blocked_by_map
      );
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
        location_label: location_chip.label,
        location_title: location_chip.title,
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
    const all_done = rows.length > 0 && rows.every((row) => row.done);
    // 미발차 = 완료·실행중·PR 대기·머지 대기 어디에도 없고 이 레인에 armed되지도
    // 않은 멤버 (§5.5). 고정 행이 그 네 자리를 모두 대표한다 — 머지 대기 항목은
    // PR 대기 행이므로 고정이다.
    const unlaunched = rows
      .filter((row) => !row.fixed && axis.armed_by_bead.get(row.id) !== lane_id)
      .map((row) => row.id);
    const derived = laneRunState(
      lane_id,
      status,
      rows,
      all_done,
      unlaunched,
      axis
    );
    projected.push({
      lane_id,
      status,
      draft: status === 'draft',
      number: index + 1,
      label: `연결 ${index + 1} · 레포 간`,
      rows,
      all_done,
      can_confirm: status === 'draft' && rows.length >= 2,
      has_mismatch:
        status === 'confirmed' &&
        rows.some((row) => row.mismatch || row.unplaced),
      unlaunched,
      ...derived
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
 * @param {LaneItem} item
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
 * @typedef {Object} ScopeBead
 * @property {LaneItem[]} cards - 이 bead가 지금 서 있는 **모든** 표시 카드.
 * @property {string[]} scope
 */

/**
 * Derive the 겹침 칩 (UI-qm12 §5.2, 대상 확대는 UI-anna §4.4): 레포별 (실행 중
 * ∪ 병렬 큐 ∪ 직렬 레인 ∪ 실행가능 ∪ PR 대기) 안에서 양쪽 모두 scope를 선언한
 * 쌍만 비교한다. 완료는 비교 집합이 아니고 레포 간 비교는 정의되지 않는다
 * (scope는 레포 상대 경로다).
 *
 * 비교 단위는 카드가 아니라 **bead**다: head review·repair 세션 타일은
 * `non_occupying`이라 그 bead가 PR 대기 레인에도 그대로 서 있고, 카드끼리
 * 비교하면 자기 자신과 겹친다는 칩이 서고 제3의 카드에는 같은 상대가 두 번
 * 적힌다. 그래서 레포별 집합은 bead ID로 dedupe하고, 판정 결과(`overlap_chips`
 * · `scope_state`)는 그 ID의 모든 표시 카드에 복사한다.
 *
 * @param {LaneModel} model
 * @param {Map<string, Record<string, any>>} bead_scope_by_root
 * @param {Map<string, string[]>} runnable_scope_by_bead
 * @param {Map<string, import('../monitor/blockers.js').BlockerLocation>} locations
 * @param {Array<Record<string, any>>} states
 */
function applyScopeOverlaps(
  model,
  bead_scope_by_root,
  runnable_scope_by_bead,
  locations,
  states
) {
  /** @type {Map<string, ScopeBead>} */
  const bead_by_key = new Map();
  for (const item of [
    ...model.running,
    ...model.queue,
    ...model.runnable,
    ...model.pr_wait
  ]) {
    if (!bead_scope_by_root.has(item.root_dir)) {
      continue;
    }
    const key = `${item.root_dir}\u0000${item.id}`;
    const seen = bead_by_key.get(key);
    if (seen) {
      seen.cards.push(item);
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
    bead_by_key.set(key, { cards: [item], scope });
  }

  /** @type {Map<string, ScopeBead[]>} */
  const declared_by_root = new Map();
  for (const bead of bead_by_key.values()) {
    // 첫 카드가 판정을 받았으므로 같은 bead의 나머지 카드에 그대로 복사한다.
    const state = bead.cards[0].scope_state;
    if (state !== undefined) {
      for (const card of bead.cards) {
        card.scope_state = state;
      }
    }
    if (bead.scope.length === 0) {
      continue;
    }
    const root_dir = bead.cards[0].root_dir;
    const bucket = declared_by_root.get(root_dir);
    if (bucket) {
      bucket.push(bead);
    } else {
      declared_by_root.set(root_dir, [bead]);
    }
  }

  /**
   * @param {ScopeBead} bead
   * @param {ScopeBead} counterpart
   * @param {string[]} prefixes
   */
  const pushChip = (bead, counterpart, prefixes) => {
    const other = counterpart.cards[0];
    /** @type {OverlapChip} */
    const chip = {
      id: other.id,
      title: other.title,
      location_label: chainRowLocationLabel(other.id, locations, states),
      prefixes,
      // 겹침은 레포 안에서만 정의되지만 (UI-qm12 §5.2) 그 레포가 지금 활성
      // workspace라는 보장은 없다 — 칩 클릭이 이슈 상세가 된 뒤로 (UI-8x90 §4.3)
      // 소유 레포를 싣지 않으면 Monitor에서 현재 레포로 잘못 열린다.
      ...(typeof other.root_dir === 'string' && other.root_dir.length > 0
        ? { root_dir: other.root_dir }
        : {})
    };
    for (const card of bead.cards) {
      if (card.overlap_chips) {
        card.overlap_chips.push(chip);
      } else {
        card.overlap_chips = [chip];
      }
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
        pushChip(entries[left], entries[right], prefixes);
        pushChip(entries[right], entries[left], prefixes);
      }
    }
  }
}

/**
 * Where a dependency chip's click should land, and whether it may be a button
 * at all (UI-8x90 §4.2·§4.4). One ladder for all four chip kinds: 모델이 아는
 * 위치가 먼저고, 레인에 없는 같은 레포 상대는 카드 자신의 레포에 있으며, 셋 다
 * 없는 — 소유 레포를 모르는 타 레포 — 상대는 누를 수 없다.
 *
 * `root_dir` 없이 여는 것은 "현재 활성 레포에서 이 ID를 연다"는 뜻이라, 모니터가
 * 다른 레포를 보고 있으면 같은 ID의 남의 이슈를 연다. 같은 레포 상대에게만 그
 * 생략이 안전하고, 거기서도 카드의 `root_dir`을 실을 수 있으면 싣는다.
 *
 * `locations`는 아직 없을 수 있다 — 해제 칩은 위치 사전이 만들어지기 전, 후보 행을
 * 조립하는 자리에서 붙는다. 그 자리에서는 타 레포 owner를 서버 `release_info`가
 * 이미 실어 왔으므로 사다리의 첫 칸만 비는 셈이다.
 *
 * @param {{ id: string, root_dir?: string }} card
 * @param {string} other_id
 * @param {Map<string, import('../monitor/blockers.js').BlockerLocation>} [locations]
 * @returns {{ openable?: true, root_dir?: string }}
 */
function openTarget(card, other_id, locations) {
  const located = locations ? locations.get(other_id)?.root_dir : undefined;
  const same_repo = !isForeignBlocker(card.id, other_id);
  const own = typeof card.root_dir === 'string' ? card.root_dir : '';
  const root_dir =
    typeof located === 'string' && located.length > 0
      ? located
      : same_repo && own.length > 0
        ? own
        : '';
  if (root_dir.length > 0) {
    return { openable: true, root_dir };
  }
  return same_repo ? { openable: true } : {};
}

/**
 * The `→` 칩 재료 for one card (UI-8x90 §4.4): 큐 장식과 후보 행 장식의 합집합,
 * 그리고 각 ID의 `root_dir` 결정.
 *
 * 두 원천을 합치는 이유는 재료의 성질이 다르기 때문이다 — `bead_dependents`의 빈
 * 배열은 "보이는 스냅샷 안에는 없다"이고, `dependents_info`는 후보 행에만 실린다.
 * 어느 쪽도 다른 쪽의 사실을 지우지 않는다.
 *
 * `root_dir`은 네 단계다: (1) 서버가 실어 준 owner; (2) 같은 레포 접두사면 **카드
 * 자신의** `root_dir` — 레인에 없는 열린 후속은 `locations`에 없으므로, 이 단계가
 * 없으면 다른 레포가 활성인 상태에서 현재 레포로 잘못 연다; (3) 그 외 타 레포는
 * `locations`; (4) 셋 다 없으면 값이 없고 칩은 열리지 않는다.
 *
 * @param {{ ids: Set<string>, root_dirs: Record<string, string> }|undefined} decoration
 * @param {import('./queue-blockers.js').DependentsInfo|undefined} info
 * @param {LaneItem} item
 * @param {Map<string, import('../monitor/blockers.js').BlockerLocation>} locations
 * @returns {import('./queue-blockers.js').DependentsInfo}
 */
function unionDependents(decoration, info, item, locations) {
  /** @type {Set<string>} */
  const ids = new Set(decoration ? decoration.ids : []);
  for (const id of info && Array.isArray(info.ids) ? info.ids : []) {
    if (typeof id === 'string' && id.length > 0) {
      ids.add(id);
    }
  }
  if (ids.size === 0) {
    return { ids: [] };
  }
  /** @type {Record<string, string>} */
  const root_dirs = {};
  const server_owners = {
    ...(decoration ? decoration.root_dirs : {}),
    ...(info && info.root_dirs && typeof info.root_dirs === 'object'
      ? info.root_dirs
      : {})
  };
  for (const id of ids) {
    const owner = server_owners[id];
    if (typeof owner === 'string' && owner.length > 0) {
      root_dirs[id] = owner;
      continue;
    }
    if (!isForeignBlocker(item.id, id)) {
      if (item.root_dir.length > 0) {
        root_dirs[id] = item.root_dir;
      }
      continue;
    }
    const located = locations.get(id)?.root_dir;
    if (typeof located === 'string' && located.length > 0) {
      root_dirs[id] = located;
    }
  }
  return { ids: [...ids], root_dirs };
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
 * `options.candidate_sort: 'as_given'`은 정렬을 이미 끝낸 호출자(Worker
 * 어댑터)의 값이다 (UI-4tud §4.3): 입력 순서를 그대로 두고 섹션도 만들지 않는다.
 * `options.candidate_hidden_counts: 'per_control'`은 후보 필터가 감춘 수를 Worker
 * 규칙으로 센다 (UI-4tud §4.3): 두 필터에 모두 걸린 행은 어느 수에도 들어가지
 * 않는다. 기본값 `'sequential'`은 현행 Monitor 규칙이다.
 *
 * `options.groups: 'all'`은 대기·직렬·후보가 모두 비어도 `workspaces_state` 행
 * 하나당 그룹을 남긴다 — 실행 중·PR 대기·완료·저장소 작업만 있는 스냅샷에서도
 * `slots`·`merge`·`repo_operations`가 살아 있어야 하기 때문이다.
 *
 * @param {Array<Record<string, any>>|null|undefined} workspaces
 * @param {Array<Record<string, any>>|null|undefined} [workspaces_state]
 * @param {{ done_since?: number, running_sort?: 'started'|'repo', candidate_filter?: CandidateFilter, candidate_sort?: 'repo_spec'|'repo_updated'|'updated_flat'|'as_given', candidate_hidden_counts?: 'sequential'|'per_control', groups?: 'nonempty'|'all', cross_lanes?: { revision: number, lanes: Array<Record<string, any>> }|null }} [options]
 * @returns {LaneModel}
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
    options && options.candidate_sort === 'as_given'
      ? /** @type {const} */ ('as_given')
      : options &&
          CANDIDATE_SORT_OPTIONS.some((o) => o.value === options.candidate_sort)
        ? /** @type {'repo_spec'|'repo_updated'|'updated_flat'} */ (
            options.candidate_sort
          )
        : 'repo_spec';
  const groups_mode = options && options.groups === 'all' ? 'all' : 'nonempty';
  // 후보 필터가 감춘 수를 세는 규칙 (§4.3). 두 탭의 뜻이 달라 하나로 합칠 수
  // 없다: Monitor는 순차(앞 필터가 겹친 행을 가져간다), Worker는 조작별(두
  // 필터에 모두 걸린 행은 어느 수에도 없다).
  const hidden_counts =
    options && options.candidate_hidden_counts === 'per_control'
      ? 'per_control'
      : 'sequential';
  // 해제 칩의 7일 창 기준 시각 (UI-d13v §5.3). 모델 조립당 한 번만 읽어 같은
  // 렌더 안의 모든 카드가 같은 창을 본다.
  const now = Date.now();

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

  /** @type {LaneItem[]} */
  const runnable = [];
  /** @type {LaneItem[]} */
  const running = [];
  /** @type {LaneItem[]} */
  const pr_wait = [];
  /** @type {LaneItem[]} */
  const queue = [];
  /** @type {LaneItem[]} */
  const done = [];
  /** @type {Array<{ id: string, root_dir: string, workspace_name: string }>} */
  const all_done_locations = [];
  /** @type {Map<string, LaneItem[]>} */
  const queue_by_root = new Map();
  /** @type {Map<string, MonitorSerialSublane[]>} */
  const serial_by_root = new Map();
  /** @type {Map<string, number>} */
  const serial_count_by_root = new Map();
  /** @type {Map<string, number>} */
  const raw_queue_length_by_root = new Map();
  // Worker 전용 그룹 값 (UI-4tud §4.3). 재료가 워크스페이스별이므로 레포별로
  // 모아 `queue_groups[i]`에 싣는다 — Monitor는 읽지 않는다.
  /** @type {Map<string, LaneMergeQueue>} */
  const merge_by_root = new Map();
  /** @type {Map<string, Array<Record<string, any>>>} */
  const cleanup_failures_by_root = new Map();
  /** @type {Map<string, string|null>} */
  const declared_base_by_root = new Map();
  /** @type {Map<string, Array<Record<string, any>>>} */
  const repo_operations_by_root = new Map();
  // Board live store가 아는 이슈 필드 (§4.1): `${root_dir}\0${bead_id}` → 항목.
  /** @type {Map<string, Record<string, any>>} */
  const overlay_by_key = new Map();
  /** @type {Map<string, string[]>} */
  const blocked_by_map = new Map();
  // 후속 칩의 큐 장식 재료 (UI-8x90 §6.2). `bead_blocked_by`와 달리 빈 배열이
  // "없다"가 아니라 "보이는 스냅샷 안에는 없다"이므로, 부착은 후보 행의
  // `dependents_info`와의 합집합으로만 한다 (§4.4).
  /** @type {Map<string, { ids: Set<string>, root_dirs: Record<string, string> }>} */
  const dependents_by_bead = new Map();
  // 발차 축의 스냅샷 재료 (UI-jaua §5.5). 레인은 레포를 가로지르므로 세 값 모두
  // 보이는 workspace 전부에서 모은다.
  /** @type {Map<string, string>} */
  const armed_by_bead = new Map();
  /** @type {Map<string, string>} */
  const failed_by_bead = new Map();
  /** @type {Set<string>} */
  const disarmed_lanes = new Set();
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
    // 실패·파킹 타일이 읽는 bead별 최근 이력 + 로그 경로
    // (record-timeline-retention §9). ADR 14대로 재료는 여기서 실어 나르고
    // 렌더러는 아무것도 읽지 않는다.
    const bead_timelines = objectOf(workspace.bead_timelines);
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
    repo_operations_by_root.set(root_dir, repo_operations);
    // 워크스페이스가 선언한 base (UI-j6wa §3). 서버 데코레이션이라 구버전
    // 서버에서는 아예 없고, 선언을 읽지 못하면 null로 온다 — 둘 다 fail-quiet.
    const declared_base =
      typeof workspace.declared_base === 'string'
        ? workspace.declared_base
        : null;
    declared_base_by_root.set(root_dir, declared_base);
    cleanup_failures_by_root.set(
      root_dir,
      Object.entries(cleanup_failed).map(([bead_id, rec]) => ({
        bead_id,
        step: rec && rec.step ? rec.step : '',
        reason: rec && rec.reason ? rec.reason : '',
        // 언제 멈췄나 — 타임라인이 이 값으로 정렬한다 (§4.2). 값이 없는 기록은
        // 위가 아니라 가장 오래된 끝으로 간다 (fail-quiet).
        at: rec && typeof rec.at === 'number' ? rec.at : null,
        detail: rec && typeof rec.detail === 'string' ? rec.detail : null,
        output_tail:
          rec && typeof rec.output_tail === 'string' && rec.output_tail
            ? rec.output_tail
            : undefined,
        log_path:
          rec && typeof rec.log_path === 'string' && rec.log_path
            ? rec.log_path
            : undefined,
        retry_count:
          rec &&
          typeof rec.retry_count === 'number' &&
          Number.isInteger(rec.retry_count) &&
          rec.retry_count > 0
            ? rec.retry_count
            : 0,
        // durable failure token은 그대로 나른다 — 클라이언트는 재분류하지 않는다.
        failure_code:
          rec && typeof rec.failure_code === 'string'
            ? rec.failure_code
            : undefined
      }))
    );
    // 이슈 필드 오버레이 (§4.1): `{ priority?, from_id?, metadata?, route?,
    // rollup? }`. 키가 없는 bead는 스냅샷 장식만으로 그린다.
    for (const [bead_id, entry] of Object.entries(
      objectOf(workspace.bead_overlay)
    )) {
      if (entry && typeof entry === 'object') {
        overlay_by_key.set(`${root_dir}\u0000${bead_id}`, entry);
      }
    }
    /** @type {Map<string, any>} */
    const attempt_by_id = new Map();
    for (const attempt of Object.values(attempts)) {
      if (attempt && typeof attempt.attempt_id === 'string') {
        attempt_by_id.set(attempt.attempt_id, attempt);
      }
    }
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
    // 순차 머지 큐 (UI-5v7d, UI-4tud §4.3). 멤버십·순서는 durable하고, 활성
    // 항목과 스킵 사유는 드라이버의 라이브 기억이다.
    /** @type {Map<string, number>} */
    const merge_positions = new Map();
    /** @type {Map<string, any>} */
    const merge_resolutions = new Map();
    /** @type {Map<string, any>} */
    const merge_continuations = new Map();
    /** @type {Map<string, any>} */
    const merge_authorities = new Map();
    merge_queue.forEach((/** @type {any} */ entry, /** @type {number} */ i) => {
      if (entry && typeof entry.bead_id === 'string') {
        merge_positions.set(entry.bead_id, i + 1);
        merge_resolutions.set(entry.bead_id, entry.resolution);
        merge_continuations.set(
          entry.bead_id,
          entry.continuation_action || null
        );
        merge_authorities.set(entry.bead_id, entry.authority || null);
      }
    });
    // durable 제외 기록 (UI-yk55 §3): 계약 키가 없는 구버전 스냅샷은 빈 맵이다.
    const auto_merge_skips = objectOf(workspace.auto_merge_skips);
    /**
     * Whether a row's exclusion still holds (UI-yk55 §3.2): only when the
     * recorded head is the one now observed. head가 움직였으면 다음 스캔이
     * 기록을 지우고 다시 후보로 삼는다.
     *
     * @param {string} bead_id
     * @returns {string|null}
     */
    const autoSkipReason = (bead_id) => {
      const skip = auto_merge_skips[bead_id];
      if (!skip) {
        return null;
      }
      const head = objectOf(objectOf(observations[bead_id]).pr).head_sha;
      return head && head === skip.head_sha ? skip.reason || '' : null;
    };
    merge_by_root.set(root_dir, {
      positions: merge_positions,
      resolutions: merge_resolutions,
      continuations: merge_continuations,
      authorities: merge_authorities,
      state: {
        active:
          typeof merge_state.active === 'string' ? merge_state.active : null,
        failures: objectOf(merge_state.failures),
        waiting:
          merge_state.waiting &&
          typeof merge_state.waiting.bead_id === 'string' &&
          typeof merge_state.waiting.reason === 'string'
            ? merge_state.waiting
            : null
      },
      auto_excluded: (Array.isArray(workspace.pr_wait) ? workspace.pr_wait : [])
        .map((/** @type {any} */ entry) => entry && entry.bead_id)
        .filter(
          (/** @type {unknown} */ id) =>
            typeof id === 'string' && autoSkipReason(id) !== null
        ),
      running: merge_queue.length > 0
    });
    const queue_lane = Array.isArray(workspace.queue) ? workspace.queue : [];
    // arm은 병렬 대기 행에 쓰이고 PR 대기 행으로 옮겨 실린다 (§5.1) — 두 자리를
    // 같이 읽어야 PR 대기에 닿은 멤버도 `▶ 진행 중`으로 남는다.
    for (const entry of [
      ...queue_lane,
      ...(Array.isArray(workspace.pr_wait) ? workspace.pr_wait : [])
    ]) {
      if (
        entry &&
        typeof entry.bead_id === 'string' &&
        typeof entry.armed_by_lane === 'string' &&
        entry.armed_by_lane.length > 0
      ) {
        armed_by_bead.set(entry.bead_id, entry.armed_by_lane);
      }
    }
    // 키가 없는 구서버는 아무 레인도 재시작으로 멈추지 않았다고 읽는다
    // (fail-quiet): 없는 기능과 "해제된 레인 없음"은 여기서 같은 그림이다.
    for (const lane_id of Array.isArray(workspace.disarmed_on_load)
      ? workspace.disarmed_on_load
      : []) {
      if (typeof lane_id === 'string' && lane_id.length > 0) {
        disarmed_lanes.add(lane_id);
      }
    }
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
    for (const [bead_id, entry] of Object.entries(
      objectOf(workspace.bead_dependents)
    )) {
      const ids = Array.isArray(/** @type {any} */ (entry)?.ids)
        ? /** @type {any} */ (entry).ids
        : [];
      const owners = objectOf(/** @type {any} */ (entry)?.root_dirs);
      const bucket = dependents_by_bead.get(bead_id) || {
        ids: new Set(),
        root_dirs: {}
      };
      for (const id of ids) {
        if (typeof id === 'string' && id.length > 0) {
          bucket.ids.add(id);
        }
      }
      for (const [id, owner] of Object.entries(owners)) {
        if (typeof owner === 'string' && owner.length > 0) {
          bucket.root_dirs[id] = owner;
        }
      }
      dependents_by_bead.set(bead_id, bucket);
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

    /**
     * The 완료 행's PR link material — Worker 탭 완료 행과 같은 판정이다. 두
     * 값이 모두 있어야 링크가 되고, 하나라도 없으면 필드를 만들지 않는다
     * (fail-quiet).
     *
     * @param {string} bead_id
     * @returns {{ pr_number: number, pr_url: string }|{}}
     */
    const donePrFields = (bead_id) => {
      const pr = bead_workflow[bead_id]?.chips?.pr;
      return pr && typeof pr.number === 'number' && typeof pr.url === 'string'
        ? { pr_number: pr.number, pr_url: pr.url }
        : {};
    };

    /**
     * One bead's blockers, read from the snapshot decoration (UI-anna §4.3).
     * 대기 행과 같은 규칙이다: 키가 있으면 문자열만 걸러 배열로 싣고, 키가
     * 없으면 필드를 만들지 않는다 — 부재는 "blocker 없음"이 아니라 "모른다"이고,
     * 그 카드는 칩을 그리지 않는다(fail-quiet).
     *
     * @param {string} bead_id
     * @returns {{ blocked_by?: string[] }}
     */
    const decoratedBlockedBy = (bead_id) => {
      if (!Object.hasOwn(bead_blocked_by, bead_id)) {
        return {};
      }
      return {
        blocked_by: Array.isArray(bead_blocked_by[bead_id])
          ? bead_blocked_by[bead_id].filter(
              (/** @type {unknown} */ blocker_id) =>
                typeof blocker_id === 'string' && blocker_id.length > 0
            )
          : []
      };
    };

    /**
     * Slot 4a's dependency-chip material, merged (선행 대기 계층 §5.1). 큐
     * 장식이 아직 그 엣지를 싣지 않았어도 `waiting` attempt가 증명한 blocker는
     * 칩이 되어야 하고, 둘이 같은 ID를 말하면 칩은 하나다.
     *
     * @param {string} bead_id
     * @param {import('./running-grid.js').WaitTile|null|undefined} wait
     * @returns {{ blocked_by?: string[] }}
     */
    const blockedByFields = (bead_id, wait) => {
      const decorated = decoratedBlockedBy(bead_id);
      const waited = (wait?.blockers || []).map((blocker) => blocker.id);
      if (waited.length === 0) {
        return decorated;
      }
      /** @type {string[]} */
      const merged = [...(decorated.blocked_by || [])];
      for (const id of waited) {
        if (!merged.includes(id)) {
          merged.push(id);
        }
      }
      return { blocked_by: merged };
    };

    /** @type {Set<string>} */
    const claimed = new Set();

    for (const [bead_id, live] of activeByBead(attempts, done_at_by_bead, {
      discard_operations,
      observations,
      bead_timelines
    })) {
      claimed.add(bead_id);
      // 실패 판정은 **attempt 스냅샷**의 `armed_by_lane`에 결속된다 (§5.5): 지금
      // 큐 행이 무엇으로 armed되어 있는지가 아니라 그 실행이 무엇으로 출발했는지가
      // 질문이다. `activeByBead`가 이미 처리되지 않은 마지막 구현 실패만
      // 남기므로(dismiss·완료 해소 제외) 여기 오는 것은 아직 서 있는 실패다.
      const failed_arm =
        live.run_state === 'failed'
          ? armedLaneOfAttempt(attempts, live.attempt_id)
          : null;
      if (failed_arm !== null) {
        failed_by_bead.set(bead_id, failed_arm);
      }
      // Worker 실행 중 타일 전용 필드 (UI-4tud §4.3). 재료가 없으면 키 자체를
      // 만들지 않는다 (fail-quiet) — Monitor 타일 표시는 그대로다.
      const attempt = attempt_by_id.get(live.attempt_id) || null;
      const overlay = overlay_by_key.get(`${root_dir}\u0000${bead_id}`);
      const rollup = overlay && overlay.rollup ? overlay.rollup : null;
      const base_exception = baseException(
        declared_base,
        attempt ? attempt.target_base : null
      );
      const conflict_resolution = attempt
        ? resolvesConflict(attempt, attempt_by_id)
        : false;
      // quick_fix 착지 진행 (`prWaitProgress`): 착지 중인 attempt만 그 줄을 얻고,
      // 나머지 타일에는 키가 없다.
      const quickfix_landing =
        attempt &&
        attempt.quickfix_lane === true &&
        attempt.quickfix_landing &&
        typeof attempt.quickfix_landing === 'object'
          ? attempt.quickfix_landing
          : null;
      const landing_reason =
        quickfix_landing &&
        typeof quickfix_landing.reason === 'string' &&
        quickfix_landing.reason.length > 0
          ? quickfix_landing.reason
          : null;
      const landing = quickfix_landing
        ? prWaitProgress({
            bead_id,
            merge_sha: quickfix_landing.head_sha,
            cleanup_cursor: quickfix_landing.cursor,
            cleanup_failed: landing_reason
              ? { step: quickfix_landing.cursor, reason: landing_reason }
              : null,
            repo_operations
          })
        : null;
      running.push({
        ...base(bead_id),
        lane: 'running',
        ...blockedByFields(bead_id, live.wait),
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
        failure: live.failure || null,
        // 선행 대기의 재료 (선행 대기 계층 §5.1). 실패와 별개 키이므로 타일이
        // 실패 팝오버를 얻지 않고, 없으면 held 본문이 그려지지 않는다.
        wait: live.wait || null,
        // backoff 사실은 실패와 별개 키다 (UI-5ym8 §6): `retry_wait` 타일의
        // 배지가 이것만으로 그려지고, `failed` 타일에서는 팝오버의 재시도 이력
        // 줄이 같은 값을 읽는다.
        retry: live.retry || null,
        exec_chips: {
          orchestration: formatAttemptOrchestrationChip(live),
          // worker 칩은 그 attempt가 기록한 runner를 controller로 삼아 푼다
          // (Worker `attemptExecChips`). 재료가 없는 스냅샷은 `null`이다.
          worker: attemptWorkerChip(
            objectOf(state),
            overlay,
            live.runner || null
          )
        },
        discard: discardProjection(discard_operations, bead_id, {
          attempt_id: live.attempt_id,
          merged:
            live.failure?.confirmation === 'merged' ||
            objectOf(observations[bead_id]).pr?.state === 'MERGED'
        }),
        ...(rollup ? { rollup } : {}),
        ...(conflict_resolution ? { conflict_resolution: true } : {}),
        ...(base_exception ? { base_exception } : {}),
        ...(landing ? { landing } : {}),
        badges:
          live.run_state === 'paused'
            ? ['⏸ 일시정지']
            : live.run_state === 'failed'
              ? ['⚠ 실패']
              : live.run_state === 'parked'
                ? ['⏸ 세션 대기']
                : live.run_state === 'retry_wait'
                  ? ['↻ 재시도 대기']
                  : live.run_state === 'waiting'
                    ? ['⛓ 선행 대기']
                    : [],
        // 경보는 실패의 것이다 (UI-5ym8 §2): 파킹도 backoff 대기도 큐를 세우지
        // 않으므로, 그것들을 붉게 물들이면 "타일이 서면 큐가 멈춘 것"이라는
        // 낡은 읽기를 다시 가르치게 된다.
        alert: live.run_state === 'failed'
      });
    }

    // 돌고 있는 리뷰 세션 (UI-d7fy §5.5). **비점유** 타일이다: `claimed`에
    // 넣지 않으므로 그 bead는 PR 대기 레인의 점유자로 그대로 남고, 여기에는
    // 지금 실제로 돌고 있는 리뷰 세션이 함께 보일 뿐이다. 점유
    // 계산(`activeByBead`)은 구현 attempt만 본다 — 그대로 둔다.
    for (const [bead_id, review] of reviewSessionAttemptStates(attempts)) {
      if (running.some((item) => item.id === bead_id)) {
        continue;
      }
      const a = review.attempt;
      running.push({
        ...base(bead_id),
        lane: 'running',
        kind: 'session',
        // 이 타일은 `non_occupying`이라 PR 대기 점유자와 함께 보인다 (§4.3):
        // 두 카드가 같은 bead의 같은 blocker를 말하는 것은 사실이 어긋나는
        // 것이 아니라 같은 사실이 두 자리에 서는 것이다.
        ...decoratedBlockedBy(bead_id),
        attempt_id: typeof a.attempt_id === 'string' ? a.attempt_id : '',
        run_state: /** @type {const} */ ('running'),
        status: 'running',
        non_occupying: true,
        workflow: /** @type {any} */ (bead_workflow[bead_id] || null),
        // 리뷰 세션은 사람이 재개·일시정지할 대상이 아니다: 큐가 그 lifecycle의
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
        badges: [review.origin === 'auto' ? '리뷰 · 자동' : '리뷰'],
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
        // 세션 정체·transcript 좌표 (UI-4xzk §6.4). 서버가 같은 스캔에서
        // 투영하며, 키가 없거나 전 항목이 malformed면 빈 배열이다.
        session_refs: Array.isArray(entry.session_refs)
          ? entry.session_refs
          : [],
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
      // `post_merge_jobs` is the first closure step (UI-i60a §1), so a job that
      // stopped the cleanup offers the Monitor mirror the same resume the other
      // closure steps do.
      const cleanup_retry =
        !!cleanup &&
        [
          'post_merge_jobs',
          'child_sweep',
          'branch_cleanup',
          'parent_close'
        ].includes(cleanup.step) &&
        !!gate &&
        gate.tier === 'merged';
      const external_cleanup =
        external && !!cleanup && !!gate && gate.tier === 'merged';
      // `review_receipt_undetermined`도 이제 알린다 (UI-qksl §4 1번): 큐가 그
      // 사유에서 보류하고 head당 1회 리뷰 lineage를 띄우며, 소진 뒤의 출구는
      // `[리뷰 후 머지]` 클릭이다 — "다음 관측이 다시 가져가므로 아무도 할 일이
      // 없다"던 UI-32he의 전제가 사라졌다. Worker 카드가 그 행에 보류 뱃지와
      // 버튼을 그리는데 레인 투영만 조용하면 같은 행을 두 화면이 다르게 말한다.
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
      // 회계 잔여 판정 칩의 재료 (UI-h6t1 §4.3). Worker 탭과 같은
      // `receipt_check` 관측에서 오므로 두 탭이 같은 행을 같게 말한다 —
      // hold는 Monitor도 이미 `gate.gate_badge`로 그린다. 코드가 없으면 필드도
      // 없다 (fail-quiet).
      const receipt_badge_codes = receiptBadgeCodesOf(observed.receipt_check);
      pr_wait.push({
        ...base(bead_id),
        lane: 'pr_wait',
        ...decoratedBlockedBy(bead_id),
        ...(receipt_badge_codes.length > 0
          ? { receipt_badge: { codes: receipt_badge_codes } }
          : {}),
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
     * @returns {LaneItem|null}
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
      /** @type {LaneItem} */
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
      const decorated = decoratedBlockedBy(bead_id);
      if (Object.hasOwn(decorated, 'blocked_by')) {
        item.blocked_by = decorated.blocked_by;
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
      // 점유가 실행중 레인보다 오래 산다: ✕로 닫힌 실패는 타일에서 빠지지만 레인은 계속
      // 붙잡는다. 레인 목록만 보면 그 실패를 '실행 중'이라고 부르게 되므로, 타일이 없을
      // 때는 attempt 상태를 직접 읽는다 (Worker `occupantBadge`와 같은 원천).
      const status = live
        ? live.run_state
        : lastImplementationStatus(attempts, bead_id);
      const badge =
        status === 'failed' || status === 'orphaned'
          ? '실패 · 점유 유지'
          : status === 'paused'
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
      const lane_state = objectOf(lane_states[id]);
      const occupied_by = Array.isArray(lane_state.occupied_by)
        ? lane_state.occupied_by.filter(
            (/** @type {any} */ bead_id) => typeof bead_id === 'string'
          )
        : [];
      // 점유 lineage는 ghost 점유 행이 대표한다 (Worker 탭과 같은 문법) — 대기 행으로 또
      // 그리면 같은 일감이 한 레인에 두 번 선다. `claimed`가 실행중 레인만으로는 그것을
      // 막지 못한다: 처리된 실패(✕ dismiss·supersede·done)는 실행중에서 빠지지만 레인
      // 점유는 그것을 해제로 읽지 않는다. `claimed`에는 넣어야 그 bead가 뒤의 후보 레인으로
      // 새어나가지 않는다.
      const ghost_ids = new Set(occupied_by);
      /** @type {LaneItem[]} */
      const items = [];
      for (let i = 0; i < entries.length; i++) {
        const entry_bead_id = entries[i] && entries[i].bead_id;
        if (typeof entry_bead_id === 'string' && ghost_ids.has(entry_bead_id)) {
          claimed.add(entry_bead_id);
          continue;
        }
        const item = waitingItem(entries[i], id, i, entries.length);
        if (!item) {
          continue;
        }
        items.push(item);
        queue.push(item);
      }
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
      // 복잡 판정 (UI-sbum §4): 추천은 `rec`, 권위 키는 `exec_pins`로 따로
      // 오므로 판정 유틸에 둘을 나눠 넘긴다. Worker 카드와 같은 칩·같은 툴팁이고
      // 클릭은 없다.
      const rec = recSettings(entry.rec, entry.exec_pins);
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
      // 자격은 행이 실어 온다 (UI-4tud §4.1). 서버 `runnable`(Monitor)에는 두 키가
      // 없고, 없으면 `eligible=true`·`worker_ineligible=false`로 읽는다 —
      // 서버가 이미 자격 미달을 빼고 보내기 때문이다 (fail-quiet).
      const eligible = entry.eligible !== false;
      const worker_ineligible = entry.worker_ineligible === true;
      // 후보 레인이 드래그 소스인지도 그 재료가 가른다 (UI-d13v §6): 관측용 행을
      // 싣는 어댑터(`eligible`을 실어 오는 쪽)의 후보 레인은 드래그 소스가 아니고,
      // 배치는 `queue_placeable`이 그대로 물려받는다. 그 키가 없는 Monitor 후보
      // 카드는 지금처럼 드래그·배치를 둘 다 유지한다.
      const observation_row = Object.hasOwn(entry, 'eligible');
      /** @type {string[]} */
      const reason_parts = [];
      if (typeof entry.reason === 'string' && entry.reason.length > 0) {
        reason_parts.push(entry.reason);
      }
      const admission_badge = admissionBadge(admission, bead_id);
      if (admission_badge) {
        reason_parts.push(admission_badge);
      }
      // 해제 칩은 후보 행만 얻는다 (UI-d13v §5.3): 대기·실행중·PR 대기 행은 이미
      // 출발해 "왜 이제 갈 수 있나"가 의미 없다. 후속 칩은 반대로 네 레인 전부가
      // 얻으므로 (UI-8x90 §4.4) 여기서는 재료만 실어 보내고 부착은 한 곳에서
      // 한다. 재료가 없는 Monitor 행은 그냥 서지 않는다 (fail-quiet).
      const released = releasedChipsFor(bead_id, entry.release_info, now)?.map(
        (chip) => ({
          ...chip,
          ...openTarget({ id: bead_id, root_dir }, chip.id)
        })
      );
      runnable.push({
        ...base(bead_id),
        title: entry.title || titles[bead_id] || bead_id,
        lane: 'runnable',
        draggable: !observation_row,
        queue_placeable: eligible && !worker_ineligible,
        ...(worker_ineligible ? { worker_ineligible: true } : {}),
        // 세션 권장 advisory (UI-49mc §3). 자격 판정에는 들어가지 않고, 재료를
        // 싣지 않는 서버 `runnable` 행에는 키 자체가 없다 (fail-quiet).
        ...(entry.session_preferred === true
          ? {
              session_preferred: true,
              session_preferred_reason:
                typeof entry.session_preferred_reason === 'string'
                  ? entry.session_preferred_reason
                  : ''
            }
          : {}),
        // 선행이 실행뿐 아니라 설계까지 막는다는 예외 라벨 (UI-svh6 §4.2).
        // 판정은 어댑터가 이미 접었으므로 레인은 값만 옮긴다 — 재료를 싣지 않는
        // 행에는 키 자체가 없다 (fail-quiet).
        ...(entry.spec_after_blocker === true
          ? { spec_after_blocker: true }
          : {}),
        ...(released ? { dependency_chips: { released } } : {}),
        ...(entry.dependents_info && typeof entry.dependents_info === 'object'
          ? { dependents_info: entry.dependents_info }
          : {}),
        reason: reason_parts.join(' · '),
        created_at: entry.created_at ?? undefined,
        updated_at: entry.updated_at ?? undefined,
        status: typeof entry.status === 'string' ? entry.status : undefined,
        labels: Array.isArray(entry.labels) ? entry.labels : [],
        spec_id: typeof entry.spec_id === 'string' ? entry.spec_id : '',
        // 발행 판정은 서버 투영이 소유한다 (UI-vb7u §3) — 레인은 재계산하지
        // 않고 그 필드만 읽는다.
        published: entry.published === true,
        // Phase 1이 `workflow`를 실어 주므로 실행가능 카드도 Worker와 같은
        // stepper를 그린다. 없으면 route 칩만 남는다 (fail-quiet).
        workflow: /** @type {any} */ (
          workflow || (route ? { route, chips: { route } } : null)
        ),
        ...(exec_chips ? { exec_chips } : {}),
        ...(rec ? { rec } : {}),
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
        // 완료 행의 PR 링크 (Worker 완료 행과 같은 재료·같은 모양): stepper와
        // 같은 workflow projection에서 오고, 캐시 미스이거나 bead가 `pr_url`을
        // 핀하지 않았으면 링크만 빠진다 (fail-quiet).
        ...donePrFields(bead_id),
        // 완료 종류 배지 + 이 bead에 섞인 head review·repair 시도 (UI-hk74 §7).
        badges: [
          ...(kind && DONE_KIND_LABELS[kind] ? [DONE_KIND_LABELS[kind]] : []),
          ...reviewSessionAttemptBadges(attempts, bead_id)
        ]
      });
    }

    // 세션이 끝낸 일 (UI-4tud §4.1·§4.3). 재료를 만드는 것은 호출자이고
    // (`get-comments` 조회·캐시), 여기서는 완료 레인에 그대로 합쳐 아래에서
    // `done_at` 내림차순으로 다시 정렬한다. 기간 필터는 호출자가 이미 걸었다.
    for (const row of Array.isArray(workspace.session_done)
      ? workspace.session_done
      : []) {
      const bead_id = row && (row.id || row.bead_id);
      if (typeof bead_id !== 'string' || claimed.has(bead_id)) {
        continue;
      }
      claimed.add(bead_id);
      done.push({
        ...base(bead_id),
        ...row,
        id: bead_id,
        root_dir,
        workspace_name,
        expected_revision,
        lane: 'done',
        done: true
      });
    }
  }

  // Board live store가 아는 이슈 필드를 모든 레인 행에 덧씌운다 (§4.1) — 지금
  // Worker의 `idToPriority`·`idToFromId`·`beadRec`·`beadExecChips`가 하는 일이다.
  // `exec_chips`는 "무엇으로 돌아갈까"에 답하는 레인(후보·대기·직렬)만 얻는다:
  // 실행 중 타일은 그 attempt의 기록값이 진실이고, PR 대기·완료 행은 돌아갈
  // 설정이 없다.
  if (overlay_by_key.size > 0) {
    for (const item of [
      ...runnable,
      ...queue,
      ...running,
      ...pr_wait,
      ...done
    ]) {
      const overlay = overlay_by_key.get(`${item.root_dir}\u0000${item.id}`);
      if (!overlay) {
        continue;
      }
      if (typeof overlay.priority === 'number') {
        item.priority = overlay.priority;
      }
      if (typeof overlay.from_id === 'string' && overlay.from_id.length > 0) {
        item.from_id = overlay.from_id;
      }
      // 이월 후속 (UI-btj6 §3). 완료 행만 이 사실을 묻는다 — 끝난 일이 무엇으로
      // 이어졌나. metadata 검사보다 앞에 서는 이유는 완료 bead가 닫힌 열에
      // 있어 오버레이가 그 metadata를 싣지 않기 때문이다. 재료가 없으면 필드
      // 자체가 없다 (fail-quiet).
      if (
        item.lane === 'done' &&
        Array.isArray(overlay.carried_to) &&
        overlay.carried_to.length > 0
      ) {
        item.carried_to = overlay.carried_to;
      }
      if (!Object.hasOwn(overlay, 'metadata')) {
        continue;
      }
      const metadata = objectOf(overlay.metadata);
      item.rec = recSettings(metadata);
      if (
        item.lane === 'runnable' ||
        item.lane.startsWith('s') ||
        item.lane === 'queue'
      ) {
        const chips = overlayExecChips(
          objectOf(state_by_root.get(item.root_dir)),
          metadata,
          // 오버레이가 이 bead의 route를 알면 그쪽이 원천이다 — 큐 스냅샷의
          // `bead_workflow`는 레인 멤버에게만 실리고, 파생 route를 싣지 않는
          // 구서버도 있다 (fail-quiet).
          typeof overlay.route === 'string' && overlay.route.length > 0
            ? overlay.route
            : objectOf(item.workflow).route
        );
        if (chips) {
          item.exec_chips = chips;
        }
      }
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

  // 슬롯을 점유하는 실행 attempt 수 (§4.3). 세션 타일은 attempt가 아니므로
  // (UI-0a2m) 세지 않고, 일시정지·실패 타일도 슬롯을 놓아 준 상태다.
  /** @type {Map<string, number>} */
  const live_by_root = new Map();
  for (const item of running) {
    if (item.kind === 'session' || item.run_state !== 'running') {
      continue;
    }
    live_by_root.set(item.root_dir, (live_by_root.get(item.root_dir) || 0) + 1);
  }
  /** @type {Map<string, LaneItem[]>} */
  const done_by_root = new Map();
  for (const item of done) {
    const bucket = done_by_root.get(item.root_dir);
    if (bucket) {
      bucket.push(item);
    } else {
      done_by_root.set(item.root_dir, [item]);
    }
  }
  /** @type {LaneMergeQueue} */
  const empty_merge = {
    positions: new Map(),
    resolutions: new Map(),
    continuations: new Map(),
    authorities: new Map(),
    state: { active: null, failures: {}, waiting: null },
    auto_excluded: [],
    running: false
  };

  /** @type {LaneQueueGroup[]} */
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
    // `all`은 대기가 비어도 그룹을 남긴다 (§4.3): 실행 중·PR 대기·완료·저장소
    // 작업만 있는 스냅샷에서도 슬롯·머지 큐·저장소 작업이 살아 있어야 한다.
    if (
      groups_mode !== 'all' &&
      !has_queue &&
      !roots_with_candidates.has(source.root_dir)
    ) {
      continue;
    }
    const slots =
      typeof source.slots === 'number' && source.slots >= MIN_SLOTS
        ? source.slots
        : MIN_SLOTS;
    const live_count = live_by_root.get(source.root_dir) || 0;
    queue_groups.push({
      live_count,
      over_cap: live_count > slots,
      merge: merge_by_root.get(source.root_dir) || empty_merge,
      token_total: doneTokenTotal(done_by_root.get(source.root_dir) || []),
      cleanup_failures: cleanup_failures_by_root.get(source.root_dir) || [],
      declared_base: declared_base_by_root.get(source.root_dir) ?? null,
      repo_operations: repo_operations_by_root.get(source.root_dir) || [],
      root_dir: source.root_dir,
      name: source.name || source.root_dir,
      auto_advance: source.auto_advance === true,
      auto_merge: source.auto_merge === true,
      slots,
      revision: typeof source.revision === 'number' ? source.revision : 0,
      runner_catalog: objectOf(source.runner_catalog),
      items: parallel,
      sublanes: { parallel, serial },
      serial_lane_count: serial_count_by_root.get(source.root_dir) || 0,
      raw_queue_length: raw_queue_length_by_root.get(source.root_dir) || 0
    });
  }

  /** @type {LaneModel} */
  const model = {
    runnable,
    runnable_all: runnable,
    runnable_hidden: { blocked: 0, spec: 0 },
    runnable_sections: [],
    runnable_flat:
      candidate_sort === 'updated_flat' || candidate_sort === 'as_given',
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

  // 네 레인이 같은 경로로 blocker를 읽는다 (UI-anna §4.2). `describeBlocker`와
  // `buildBlockerLocationMap`은 실행중·PR 대기 위치를 이미 알고 있으므로 새
  // 문자열을 발명하지 않는다.
  for (const item of [
    ...model.queue,
    ...model.runnable,
    ...model.running,
    ...model.pr_wait
  ]) {
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
  //
  // 레인 배제는 없다 (UI-anna §4.1): 실행중에서 이 칩은 워커 admission을
  // 우회한 착수나 출발 뒤 추가된 간선을, PR 대기에서는 선행이 닫히기 전에
  // 머지하려는 상황을 드러낸다. 재료가 없는 카드는 그냥 칩이 없다(fail-quiet).
  for (const item of [
    ...model.queue,
    ...model.runnable,
    ...model.running,
    ...model.pr_wait
  ]) {
    // 모니터의 칩은 모두 누를 수 있다 (UI-u6zf §5.1): 모니터는 보이는 레포를
    // 모두 읽으므로 워커 탭과 달리 blocker의 위치를 언제나 안다. 그 클릭은
    // blocker 이슈로 이동하고(UI-lx45 §5), 타 레포면 `root_dir`이 전환 대상을
    // 말한다 — 위치를 모르는 blocker만 그 값 없이 현재 레포로 열린다.
    /** @type {DependencyChip[]} */
    const predecessors = (item.blockers || []).map((blocker) => ({
      ...predecessorChip(item.id, blocker),
      ...openTarget(item, blocker.id, locations)
    }));
    // 후속 칩도 같은 루프에서 붙는다 (UI-8x90 §4.4). 재료는 두 원천의
    // 합집합이다: 큐 장식 `bead_dependents`는 보이는 스냅샷 안의 것만 세고,
    // 후보 행의 `dependents_info`는 그 행에만 실린다 — 어느 쪽의 빈 값도 다른
    // 쪽의 사실을 지우지 않는다. 선행 칩과 각자 재료로 판정하므로 선행이 없다고
    // 후속이 함께 사라지지 않는다.
    const dependents = dependentsChip(
      item.id,
      unionDependents(
        dependents_by_bead.get(item.id),
        item.dependents_info,
        item,
        locations
      )
    );
    if (predecessors.length === 0 && dependents.length === 0) {
      continue;
    }
    // 후보 행이 이미 `released` 칩을 싣고 있을 수 있다 (UI-d13v §5.3) — 이 부착이
    // 그것을 지우면 같은 슬롯의 다른 질문이 조용히 사라진다.
    /** @type {DependencyChips} */
    const chips = {
      ...(item.dependency_chips || {}),
      ...(predecessors.length > 0 ? { predecessors } : {}),
      ...(dependents.length > 0 ? { dependents } : {})
    };
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
    name_by_root,
    { armed_by_bead, failed_by_bead, disarmed_lanes }
  );

  // 소속 칩은 실행가능 카드와 대기 행에만 붙는다 (§5.2a).
  /** @type {Map<string, LaneItem>} */
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
  // 발차 칩 (§5.6). 자리는 카드 문법 §5.1 슬롯 4 "의존·겹침"이며, 재료가 없는
  // 카드에는 칩이 없다 (fail-quiet). 레인 번호는 스냅샷 순서에서 나오고, 그
  // 순서에 없는 lane id는 고아 arm이므로 숨기지 않고 드러낸다 (§5.3 (2)).
  /** @type {Map<string, number>} */
  const lane_number_of = new Map(
    model.chain_lanes.map((lane) => [lane.lane_id, lane.number])
  );
  for (const item of [...model.queue, ...model.running]) {
    const lane_id = armed_by_bead.get(item.id);
    if (typeof lane_id !== 'string' || lane_id.length === 0) {
      continue;
    }
    const number = lane_number_of.get(lane_id);
    item.armed_lane_chip =
      number === undefined
        ? { lane_id, label: '▶ 진행 중 · 레인 없음', orphan: true }
        : { lane_id, label: `▶ 연결 ${number}`, orphan: false };
  }

  /** @type {LaneItem[]} */
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
  /** @param {LaneItem} item */
  const blockedPass = (item) =>
    candidate_filter.show_blocked || item.blocked !== true;
  /** @param {LaneItem} item */
  const specPass = (item) =>
    candidate_filter.spec === 'all' ||
    (candidate_filter.spec === 'with'
      ? item.published === true
      : item.published !== true);
  if (hidden_counts === 'per_control') {
    // Worker 규칙 (UI-ki09 `applyCandidateFilter`): 한 조작이 감춘 수는 "그
    // 조작만 풀면 나타날 행"이다. 두 필터에 **모두** 걸린 행은 어느 수에도
    // 들어가지 않는다 — 한쪽만 풀어도 그 행은 그대로 숨어 있으므로, 세면
    // 지키지 못할 노출을 약속하게 된다.
    /** @type {LaneItem[]} */
    const kept = [];
    let hidden_blocked = 0;
    let hidden_spec = 0;
    for (const item of visible) {
      const by_blocked = blockedPass(item);
      const by_spec = specPass(item);
      if (by_blocked && by_spec) {
        kept.push(item);
      } else if (!by_blocked && by_spec) {
        hidden_blocked += 1;
      } else if (by_blocked && !by_spec) {
        hidden_spec += 1;
      }
    }
    visible = kept;
    model.runnable_hidden = { blocked: hidden_blocked, spec: hidden_spec };
  } else {
    // Monitor 규칙: 두 필터를 차례로 적용하고 각 단계가 줄인 수를 센다 — 두
    // 필터에 모두 걸린 행은 앞 단계인 `blocked`가 가져간다.
    visible = visible.filter(blockedPass);
    const after_blocked = visible.length;
    visible = visible.filter(specPass);
    model.runnable_hidden = {
      blocked: before - after_blocked,
      spec: after_blocked - visible.length
    };
  }

  /**
   * @param {LaneItem} a
   * @param {LaneItem} b
   */
  const byUpdated = (a, b) => {
    const diff = timeOf(b.updated_at) - timeOf(a.updated_at);
    return diff !== 0 ? diff : a.id.localeCompare(b.id);
  };
  /**
   * @param {LaneItem} a
   * @param {LaneItem} b
   */
  const bySpecThenUpdated = (a, b) => {
    const a_spec = a.published === true ? 0 : 1;
    const b_spec = b.published === true ? 0 : 1;
    return a_spec !== b_spec ? a_spec - b_spec : byUpdated(a, b);
  };
  const within = candidate_sort === 'repo_spec' ? bySpecThenUpdated : byUpdated;

  if (candidate_sort === 'as_given') {
    // 정렬을 이미 끝낸 호출자의 값 (§4.3): 순서를 다시 정하지 않고 섹션도
    // 만들지 않는다 — 필터만 걸린 입력 순서가 그대로 화면 순서다.
    model.runnable = visible;
    model.runnable_sections = [];
  } else if (candidate_sort === 'updated_flat') {
    model.runnable = visible.slice().sort(byUpdated);
    model.runnable_sections = [];
  } else {
    /** @type {Map<string, LaneItem[]>} */
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
    /** @type {LaneItem[]} */
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
