/**
 * 대기 배치 판정 하나 (UI-6g3t §6.1).
 *
 * 후보 카드의 `[↴ 대기로]`(`workspace-adapter.js` → `lanes.js`)와 이슈 상세 바의
 * 같은 버튼(`views/detail-panel/index.js`)은 같은 재료 — bd 페이로드와
 * `worker-queue` 스냅샷 — 를 보고 같은 답을 내야 한다. 그래서 그 판정과 사유
 * 문장을 이 모듈 하나가 소유한다: 같은 식이 두 벌이 되면 한 벌은 반드시 낡고,
 * 두 표면이 같은 이슈를 두고 다른 말을 한다.
 *
 * admission 자체는 서버(`checkWorkerQueueAdmission`)가 그대로 소유한다 (§6.4).
 * 이 모듈이 정하는 것은 버튼을 활성으로 그릴지와 그 title 문장뿐이다.
 *
 * @import { PlaceMenuEntry } from './lanes.js'
 */
import { resolveSpecEvidence } from '../../../server/spec-id.js';
import { WORKFLOW_ROUTES } from '../../../server/worker/routes.js';
import { isWorkerIneligible } from '../../utils/worker-eligibility.js';
import { runningLaneBeadIds } from './lane-model.js';

/**
 * @typedef {{ lane: 'parallel'|'s1'|'s2'|'s3'|'s4'|'s5', index: number }} QueuedLocation
 * @typedef {{ lane: 'running'|'pr_wait'|'done' }} LaneLocation
 * @typedef {QueuedLocation|LaneLocation} PlacementLocation
 */

/**
 * @typedef {Object} PlacementFacts
 * @property {string} route
 * @property {'published'|'draft'|'none'|'conflict'|'n/a'} spec
 * @property {boolean} has_description
 * @property {boolean} awaiting_user
 * @property {boolean} worker_ineligible
 */

/**
 * @typedef {Object} Placement
 * @property {boolean} placeable - 자격을 갖췄고 `location`이 null인가.
 * @property {boolean} route_ok
 * @property {boolean} worker_ineligible
 * @property {boolean} awaiting_user
 * @property {boolean} missing_description - quick_fix인데 description이 없다.
 * @property {'published'|'draft'|'none'|'conflict'|'n/a'} spec - `n/a`는 spec을
 * 자격 입력으로 쓰지 않는 route(quick_fix)다.
 * @property {PlacementLocation|null} location - 이미 서 있는 레인, 없으면 null.
 */

/** @type {ReadonlySet<string>} */
const ROUTES = new Set(WORKFLOW_ROUTES);

/**
 * 스냅샷 하나당 한 번만 세는 실행중 구성원. 스냅샷은 스토어가 통째로 갈아
 * 끼우는 값이라 객체 정체성이 곧 세대이고, 후보 N개를 판정할 때마다 attempts
 * 전체를 다시 도는 것을 막는다.
 *
 * @type {WeakMap<object, Set<string>>}
 */
const running_ids_cache = new WeakMap();

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
 * @param {Record<string, any>} queue
 * @returns {Set<string>}
 */
function runningIdsOf(queue) {
  const cached = running_ids_cache.get(queue);
  if (cached) {
    return cached;
  }
  const ids = runningLaneBeadIds(queue);
  running_ids_cache.set(queue, ids);
  return ids;
}

/**
 * `bead_id`가 레인 항목 배열의 몇 번째인가. 없으면 `-1`.
 *
 * @param {unknown} entries
 * @param {string} bead_id
 * @returns {number}
 */
function indexOfBead(entries, bead_id) {
  const list = Array.isArray(entries) ? entries : [];
  return list.findIndex(
    (/** @type {any} */ entry) => entry && entry.bead_id === bead_id
  );
}

/**
 * `bead_id`가 지금 서 있는 레인. 우선순위는 레인 모델의 배타 순서
 * (`lane-model.js` 머리말: `running > pr_wait > (queue ∪ serial_lanes) > done`)와
 * 같다 — 실행중인 bead는 대기 레인에 그대로 남으므로, 순서가 다르면 같은 사실을
 * 두 화면이 다른 자리로 부른다.
 *
 * @param {string} bead_id
 * @param {Record<string, any>} queue
 * @returns {PlacementLocation|null}
 */
function locationOf(bead_id, queue) {
  if (bead_id.length === 0) {
    return null;
  }
  if (runningIdsOf(queue).has(bead_id)) {
    return { lane: 'running' };
  }
  if (indexOfBead(queue.pr_wait, bead_id) >= 0) {
    return { lane: 'pr_wait' };
  }
  const parallel_index = indexOfBead(queue.queue, bead_id);
  if (parallel_index >= 0) {
    return { lane: 'parallel', index: parallel_index };
  }
  for (const lane of Array.isArray(queue.serial_lanes)
    ? queue.serial_lanes
    : []) {
    if (!lane || typeof lane.id !== 'string' || !/^s[1-5]$/.test(lane.id)) {
      continue;
    }
    const index = indexOfBead(lane.entries, bead_id);
    if (index >= 0) {
      return {
        lane: /** @type {'s1'|'s2'|'s3'|'s4'|'s5'} */ (lane.id),
        index
      };
    }
  }
  if (indexOfBead(queue.done, bead_id) >= 0) {
    return { lane: 'done' };
  }
  return null;
}

/**
 * Fold raw eligibility facts into the single queue-placement judgment.
 *
 * @param {PlacementFacts} facts
 * @param {PlacementLocation|null} location
 * @returns {Placement}
 */
export function placementFromFacts(facts, location) {
  const route_ok = ROUTES.has(facts.route);
  const is_quick_fix = facts.route === 'quick_fix';
  const eligible =
    route_ok &&
    !facts.worker_ineligible &&
    !facts.awaiting_user &&
    (is_quick_fix ? facts.has_description : facts.spec === 'published');
  return {
    placeable: eligible && location === null,
    route_ok,
    worker_ineligible: facts.worker_ineligible,
    awaiting_user: facts.awaiting_user,
    missing_description: is_quick_fix && !facts.has_description,
    spec: facts.spec,
    location
  };
}

/**
 * `queue`에 이 이슈를 지금 넣을 수 있는가, 없다면 무엇 때문인가 (§6.1).
 *
 * 필드 부재는 판정하지 않는다 (fail-quiet): `labels`·`description`이 없는 부분
 * 페이로드는 서버 admission이 권위 있게 다시 본다.
 *
 * @param {any} issue - bd 페이로드 (labels·metadata·description·workflow·status).
 * @param {any} queue - `worker-queue` 스냅샷.
 * @returns {Placement}
 */
export function candidatePlacement(issue, queue) {
  const row = objectOf(issue);
  const snapshot = objectOf(queue);
  const evidence = resolveSpecEvidence(row);
  const route =
    (typeof row.workflow?.route === 'string' && row.workflow.route) ||
    (typeof objectOf(row.metadata).route === 'string'
      ? objectOf(row.metadata).route
      : '');
  const is_quick_fix = route === 'quick_fix';
  const has_description =
    !Object.hasOwn(row, 'description') ||
    (typeof row.description === 'string' && row.description.trim().length > 0);
  const worker_ineligible =
    Object.hasOwn(row, 'labels') && isWorkerIneligible(row.labels);
  // 사용자 결정 대기 파킹 (UI-dqg9 §2.2): 서버 admission과 같은 presence 규칙.
  const awaiting_user = Object.hasOwn(objectOf(row.metadata), 'awaiting_user');
  const location = locationOf(
    typeof row.id === 'string' ? row.id : '',
    snapshot
  );
  return placementFromFacts(
    {
      route,
      spec: is_quick_fix
        ? 'n/a'
        : evidence.conflict
          ? 'conflict'
          : evidence.evidence,
      has_description,
      awaiting_user,
      worker_ineligible
    },
    location
  );
}

/**
 * `[↴ 대기로]` 버튼의 title 문장 (§6.1). 후보 카드와 이슈 상세가 같은 문장을 쓰는 것이
 * 이 함수의 목적이므로, 부분 판정(카드가 행 투영에서 되살린 플래그)도 받는다.
 *
 * @param {Partial<Placement>} placement
 * @returns {string}
 */
export function placementTitle(placement) {
  const location = placement.location;
  if (location) {
    switch (location.lane) {
      case 'running':
        return '실행 중이라 대기 큐에 넣을 수 없습니다';
      case 'pr_wait':
        return 'PR 대기 중이라 대기 큐에 넣을 수 없습니다';
      // 완료 레인에 남아 있는 bead는 status와 무관하게 이 문장이다 (§6.1).
      case 'done':
        return '완료 레인에 있어 대기 큐에 넣을 수 없습니다';
      case 'parallel':
        return `이미 대기 중 · 병렬 #${location.index + 1}`;
      default:
        return `이미 대기 중 · 직렬 ${location.lane.slice(1)} #${
          location.index + 1
        }`;
    }
  }
  if (placement.placeable) {
    return '대기 큐 맨 뒤에 추가';
  }
  if (placement.route_ok === false) {
    return 'route가 정해지지 않아 대기 큐에 넣을 수 없습니다';
  }
  if (placement.worker_ineligible) {
    return 'worker-ineligible label로 워커에서 실행할 수 없습니다';
  }
  if (placement.awaiting_user) {
    return '사용자 리뷰를 기다리는 중이라 대기 큐에 넣을 수 없습니다';
  }
  if (placement.missing_description) {
    return 'description이 없어 대기 큐에 넣을 수 없습니다';
  }
  if (placement.spec === 'conflict') {
    return 'spec 경로가 충돌해 대기 큐에 넣을 수 없습니다';
  }
  return 'spec이 발행되지 않아 대기 큐에 넣을 수 없습니다';
}

/**
 * `[↴ 대기로]`의 레인 선택지 (§6.2). 권위 있는 스냅샷의 `serial_lane_count`·`serial_lanes`만
 * 읽는다. `null`이면 고를 것이 병렬 하나뿐이라 메뉴가 필요 없고, 클릭 한 번이
 * 그대로 맨 뒤 적재다.
 *
 * @param {any} queue - `worker-queue` 스냅샷.
 * @returns {PlaceMenuEntry[]|null}
 */
export function placeMenuLanes(queue) {
  const snapshot = objectOf(queue);
  const serial_lane_count =
    typeof snapshot.serial_lane_count === 'number' &&
    Number.isInteger(snapshot.serial_lane_count) &&
    snapshot.serial_lane_count > 0
      ? Math.min(snapshot.serial_lane_count, 5)
      : 0;
  const serial_lanes = Array.isArray(snapshot.serial_lanes)
    ? snapshot.serial_lanes
    : [];
  /** @type {Array<{ id: 's1'|'s2'|'s3'|'s4'|'s5', label: string, count: number }>} */
  const choices = [];
  for (const lane of serial_lanes) {
    if (choices.length >= serial_lane_count) {
      break;
    }
    if (
      !lane ||
      typeof lane.id !== 'string' ||
      !/^s[1-5]$/.test(lane.id) ||
      !Array.isArray(lane.entries)
    ) {
      continue;
    }
    choices.push({
      id: /** @type {'s1'|'s2'|'s3'|'s4'|'s5'} */ (lane.id),
      label: `직렬 ${lane.id.slice(1)}`,
      count: lane.entries.length
    });
  }
  if (choices.length === 0) {
    return null;
  }
  const queue_entries = Array.isArray(snapshot.queue) ? snapshot.queue : [];
  return [
    { id: 'parallel', label: '병렬', count: queue_entries.length },
    ...choices
  ];
}

/**
 * `lane` 좌표의 사람 라벨 (§6.4의 성공 토스트). 메뉴 항목과 같은 말이어야 사용자가
 * 고른 자리와 결과를 같은 이름으로 읽는다.
 *
 * @param {string} lane
 * @returns {string}
 */
export function placeLaneLabel(lane) {
  return /^s[1-5]$/.test(lane) ? `직렬 ${lane.slice(1)}` : '병렬';
}
