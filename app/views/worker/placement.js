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
 * 같은 모듈이 Worker 탭의 배치 추천 미리보기(UI-izba §4.7)도 소유한다: `[추천 배치]`의
 * 켜짐·title, 근거 상자, 점선 카드, 전체 배치안 표와 그 전송이다. 자리 계산 자체는
 * `app/utils/placement/compute.js`의 순수 함수다.
 *
 * @import { PlaceMenuEntry } from './lanes.js'
 * @import { PlacementStatus } from '../../../server/placement/wire.js'
 * @import { PlacementLane, PlacementPlan, PlacementWarning, PlannedPlacement, RelationLine } from '../../utils/placement/compute.js'
 */
import { html } from 'lit-html';
import { resolveSpecEvidence } from '../../../server/spec-id.js';
import { WORKFLOW_ROUTES } from '../../../server/worker/routes.js';
import {
  placementSendNotice,
  sendPlacement,
  sendPlacementBatch
} from '../../utils/placement/apply.js';
import { computePlacement } from '../../utils/placement/compute.js';
import {
  formatClockLocal,
  formatTimestampLocal
} from '../../utils/relative-time.js';
import { isWorkerIneligible } from '../../utils/worker-eligibility.js';
import { runningLaneBeadIds } from './lane-model.js';

/**
 * @typedef {{ lane: 'parallel'|'s1'|'s2'|'s3'|'s4'|'s5', index: number }} QueuedLocation
 * @typedef {{ lane: 'running'|'pr_wait'|'done' }} LaneLocation
 * @typedef {QueuedLocation|LaneLocation} PlacementLocation
 */

/**
 * @typedef {Object} CandidateFacts
 * @property {string} route
 * @property {'published'|'draft'|'none'|'conflict'|'n/a'} spec_state
 * @property {boolean} has_description
 * @property {boolean} awaiting_user
 * @property {string} [awaiting_user_reason]
 * @property {object} [release_info]
 * @property {object} [dependents_info]
 * @property {Record<string, string>} exec_pins
 * @property {boolean} worker_ineligible
 * @property {string} session_preferred_reason
 * @property {string} [complex_reason] - 서버가 라벨 `complex`와 metadata에서
 * 판정해 더하는 키 (UI-7nhi §2). 표시 전용이라 배치 판정에 쓰지 않는다.
 * @property {boolean} spec_after_blocker
 * @property {true} [observation]
 * @property {true} [blocked_without_ids]
 */

/**
 * @typedef {Pick<CandidateFacts, 'route'|'has_description'|'awaiting_user'|'worker_ineligible'> & { spec: CandidateFacts['spec_state'] }} PlacementFacts
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
  // `worker-ineligible` no longer blocks placement (UI-lbm5 §4.2): such a Bead
  // runs in the session lane, and the flag stays a display fact only.
  const eligible =
    route_ok &&
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
  // 자격 판정은 **핀된** route만 읽는다 (§4.1). `workflow.route`는 표시용 파생값
  // 이라 `metadata.route`가 없으면 `deriveRoute`가 `spec_backed`를 돌려준다
  // (server/workflow-enrich.js) — 그것을 자격 입력으로 읽으면 route 미핀 행이
  // 발행 스펙만으로 자격을 얻어, 서버 admission이 `invalid_route`로 거부하는 행을
  // 화면이 "넣을 수 있다"고 말한다. `route_source: 'explicit'`인 행만 그 값을
  // 신뢰하고, 나머지는 metadata를 직접 읽는다.
  const route =
    (row.workflow?.route_source === 'explicit' &&
      typeof row.workflow.route === 'string' &&
      row.workflow.route) ||
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
    return placement.worker_ineligible
      ? '대기 큐 맨 뒤에 추가 — 세션 레인으로 실행된다'
      : '대기 큐 맨 뒤에 추가';
  }
  if (placement.route_ok === false) {
    return 'route가 정해지지 않아 대기 큐에 넣을 수 없습니다';
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

/**
 * `[추천 배치]`의 켜짐과 title (UI-izba §4.7). `ready`일 때만 켜진다 — 고정 조건만의
 * 기본안은 보여 주지 않는다 (사용자 결정 10).
 *
 * @param {PlacementStatus} status
 * @returns {{ enabled: boolean, title: string }}
 */
export function recommendButtonState(status) {
  switch (status.state) {
    case 'ready':
      return {
        enabled: true,
        title: '고정 조건과 jev 판정으로 계산한 자리를 대기 열에 미리 보입니다'
      };
    case 'pending':
      return {
        enabled: false,
        title:
          typeof status.total === 'number' && status.total > 0
            ? `jev 판정 중 (${status.total}쌍 중 ${status.done ?? 0}쌍 완료)`
            : 'jev 판정 중'
      };
    case 'unavailable':
      return {
        enabled: false,
        title: status.reason === 'key_missing' ? 'jev 키 없음' : 'jev 응답 없음'
      };
    case 'fixed_only':
      return {
        enabled: false,
        title: '고정 조건만 있음 — ⧉ 칩과 레인 순서로 이미 보임'
      };
    default:
      return { enabled: false, title: '비교할 이슈 없음' };
  }
}

/**
 * Position line — "직렬 2 · #2 — UI-a7f2 뒤". 번호는 그 레인 대기 항목 안의 최종
 * 순번이다 (blocks 정렬 뒤).
 *
 * @param {Pick<PlannedPlacement, 'lane'|'final_index'|'before'>} placement
 * @returns {string}
 */
export function placementPositionText(placement) {
  return `${placeLaneLabel(placement.lane)} · #${placement.final_index + 1} — ${
    placement.before === null ? '맨 앞' : `${placement.before} 뒤`
  }`;
}

/**
 * Source tail of a reason line: `고정(blocks)`·`고정(scope 겹침: a)`·`jev 0.92`.
 *
 * @param {RelationLine} line
 * @returns {string}
 */
function sourceText(line) {
  if (line.source === 'fixed') {
    if (line.basis === 'scope') {
      return `고정(scope 겹침${
        line.overlap && line.overlap.length > 0
          ? `: ${line.overlap.join(', ')}`
          : ''
      })`;
    }
    return 'blocks' === line.basis ? '고정(blocks)' : '고정';
  }
  return `jev ${typeof line.confidence === 'number' ? line.confidence.toFixed(2) : '—'}`;
}

/**
 * @param {string} other
 * @param {string|null} kind
 * @returns {string}
 */
function relationWords(other, kind) {
  switch (kind) {
    case 'c_first':
      return `${other}보다 먼저`;
    case 'x_first':
      return `${other} 다음`;
    case 'conflict':
      return `${other} — 부딪힘`;
    case 'independent':
      return `${other} — 독립`;
    default:
      return `${other} — 관계 모름`;
  }
}

/**
 * One reason line. `참고` 줄(배치에 쓰지 않는 저확신 jev 답)은 jev의 첫 choice를
 * 말한다.
 *
 * @param {RelationLine} line
 * @param {boolean} [reference]
 * @returns {string}
 */
export function relationLineText(line, reference = false) {
  return reference
    ? `참고: ${relationWords(line.other, line.jev_choice)} · ${sourceText(line)}`
    : `${relationWords(line.other, line.relation)} · ${sourceText(line)}`;
}

/**
 * One warning line of the box and the table.
 *
 * @param {PlacementWarning} warning
 * @returns {string}
 */
export function placementWarningText(warning) {
  switch (warning.code) {
    case 'order_cycle':
      return '⚠ 묶음 안 선후가 순환합니다 — 표시 순서대로 둡니다';
    case 'order_unsatisfiable':
      return '⚠ 이 레인 안의 선후 조건을 함께 만족할 수 없어 맨 뒤에 둡니다';
    case 'blocks_reordered':
      return '⚠ blocks 정렬이 자리를 옮겨 선후 조건이 어긋납니다';
    default:
      return `⚠ ${warning.other}(${placeLaneLabel(
        warning.other_lane || 'parallel'
      )})과 동시에 돌 수 있음 — 상대를 직렬 레인으로 옮기면 피할 수 있음`;
  }
}

/**
 * The line for a constraint with a candidate outside the chosen set (§4.6).
 *
 * @param {RelationLine} line
 * @returns {string}
 */
export function outsideLineText(line) {
  return `${line.other}(후보)와 부딪힘 — 함께 넣으려면 전체 배치안`;
}

/**
 * The folded 근거 summary of a full-plan row — "근거 6 · 부딪힘 5 · 독립 1": the
 * relation line count, then each nonzero kind. Outside lines count as 부딪힘.
 *
 * @param {Pick<PlannedPlacement, 'reasons'|'references'|'outside'>} placement
 * @returns {string}
 */
export function reasonSummaryText(placement) {
  const kinds = { conflict: 0, order: 0, independent: 0 };
  for (const line of placement.reasons) {
    if (line.relation === 'conflict') {
      kinds.conflict += 1;
    } else if (line.relation === 'independent') {
      kinds.independent += 1;
    } else {
      kinds.order += 1;
    }
  }
  kinds.conflict += placement.outside.length;
  const parts = [
    `근거 ${
      placement.reasons.length +
      placement.references.length +
      placement.outside.length
    }`,
    ...(kinds.conflict > 0 ? [`부딪힘 ${kinds.conflict}`] : []),
    ...(kinds.order > 0 ? [`선후 ${kinds.order}`] : []),
    ...(kinds.independent > 0 ? [`독립 ${kinds.independent}`] : []),
    ...(placement.references.length > 0
      ? [`참고 ${placement.references.length}`]
      : [])
  ];
  return parts.join(' · ');
}

/**
 * The 근거 cell of a full-plan row (UI-7y8h): relation lines folded under a
 * `<details>` summary, warning lines outside it so they stay visible. A row
 * without relation lines draws no fold.
 *
 * @param {PlannedPlacement} placement
 * @returns {import('lit-html').TemplateResult}
 */
function reasonCellTemplate(placement) {
  const lines = [
    ...placement.reasons.map((line) => relationLineText(line)),
    ...placement.references.map((line) => relationLineText(line, true)),
    ...placement.outside.map((line) => outsideLineText(line))
  ];
  return html`${lines.length > 0
    ? html`<details class="worker-plan__reasons">
        <summary>${reasonSummaryText(placement)}</summary>
        ${lines.map(
          (text) => html`<div class="worker-plan__line">${text}</div>`
        )}
      </details>`
    : ''}${placement.warnings.map(
    (warning) =>
      html`<div class="worker-plan__line worker-plan__warn">
        ${placementWarningText(warning)}
      </div>`
  )}`;
}

/**
 * @param {number|null} at
 * @returns {import('lit-html').TemplateResult|string}
 */
function judgedAtTemplate(at) {
  if (typeof at !== 'number') {
    return '';
  }
  return html`<span
    class="worker-recommend__time"
    title=${`jev 판정 ${formatTimestampLocal(at)}`}
    >판정 ${formatClockLocal(at)}</span
  >`;
}

/**
 * The 근거 상자 under a candidate foot (§4.7): position line, reason lines,
 * warnings, `[적용]`, ✕ and the judged-at time.
 *
 * @param {PlannedPlacement} placement
 * @param {{ busy: boolean, notice: string|null }} state
 * @returns {import('lit-html').TemplateResult}
 */
export function recommendBoxTemplate(placement, state) {
  return html`<div class="worker-recommend" data-bead-id=${placement.id}>
    <div class="worker-recommend__pos">${placementPositionText(placement)}</div>
    ${placement.reasons.map(
      (line) =>
        html`<div class="worker-recommend__line">
          ${relationLineText(line)}
        </div>`
    )}${placement.references.map(
      (line) =>
        html`<div class="worker-recommend__line worker-recommend__line--ref">
          ${relationLineText(line, true)}
        </div>`
    )}${placement.outside.map(
      (line) =>
        html`<div class="worker-recommend__line">${outsideLineText(line)}</div>`
    )}${placement.warnings.map(
      (warning) =>
        html`<div class="worker-recommend__warn">
          ${placementWarningText(warning)}
        </div>`
    )}${state.notice
      ? html`<div class="worker-recommend__notice">${state.notice}</div>`
      : ''}
    <div class="worker-recommend__actions">
      <button
        type="button"
        class="op-btn op-btn--primary worker-recommend__apply"
        data-bead-id=${placement.id}
        ?disabled=${state.busy}
        title="이 자리에 넣습니다"
      >
        적용
      </button>
      ${judgedAtTemplate(placement.judged_at)}
      <button
        type="button"
        class="op-btn op-btn--ghost op-btn--icon worker-recommend__close"
        data-bead-id=${placement.id}
        title="미리보기 닫기"
        aria-label="미리보기 닫기"
      >
        ✕
      </button>
    </div>
  </div>`;
}

/**
 * One dotted preview card (§4.7): number, id, title. An overlay, not a lane
 * member — no `data-bead-id`, no drag coordinates.
 *
 * @param {PlannedPlacement} placement
 * @param {string} title
 * @returns {import('lit-html').TemplateResult}
 */
export function previewCardTemplate(placement, title) {
  return html`<div
    class="worker-card worker-card--static worker-card--preview"
    data-preview-id=${placement.id}
    aria-label=${`추천 자리 ${placement.number}: ${placement.id}`}
  >
    <div class="worker-card__head">
      <span class="worker-card__preview-no">#${placement.number}</span>
      <span class="worker-card__preview-id">${placement.id}</span>
    </div>
    ${title ? html`<div class="worker-card__title">${title}</div>` : ''}
  </div>`;
}

/**
 * Lay the dotted cards of one lane among its drawn rows. A lane the plan puts
 * a candidate in is drawn in the plan's final lane order (`plan.layout`, the
 * order after the store's blocks correction), so the preview shows the lane as
 * `[적용]` will leave it; drawn rows the layout does not name keep their place
 * at the end. A lane without a dotted card is drawn as it is.
 *
 * @param {Array<{ id: string, template: import('lit-html').TemplateResult }>} rows
 * @param {PlacementLane} lane
 * @param {PlacementPlan|null} plan
 * @param {(id: string) => string} titleOf
 * @returns {import('lit-html').TemplateResult[]}
 */
export function interleavePreview(rows, lane, plan, titleOf) {
  const previews = new Map(
    (plan ? plan.order : [])
      .filter((item) => item.lane === lane)
      .map((item) => [item.id, item])
  );
  if (!plan || previews.size === 0) {
    return rows.map((row) => row.template);
  }
  const by_id = new Map(rows.map((row) => [row.id, row]));
  /** @type {Set<string>} */
  const placed = new Set();
  /** @type {import('lit-html').TemplateResult[]} */
  const out = [];
  for (const id of plan.layout[lane] || []) {
    const preview = previews.get(id);
    const row = by_id.get(id);
    if (preview) {
      out.push(previewCardTemplate(preview, titleOf(id)));
    } else if (row && !placed.has(id)) {
      placed.add(id);
      out.push(row.template);
    }
  }
  for (const row of rows) {
    if (!placed.has(row.id)) {
      out.push(row.template);
    }
  }
  return out;
}

/**
 * Whether the plan draws a dotted card in this lane.
 *
 * @param {PlacementPlan|null} plan
 * @param {PlacementLane} lane
 * @returns {boolean}
 */
export function planTargetsLane(plan, lane) {
  return !!plan && plan.order.some((item) => item.lane === lane);
}

/**
 * The slot material a Worker candidate card draws `[추천 배치]` from. Only the
 * Worker tab hands it to `candidateCard` (사용자 결정 6).
 *
 * @typedef {Object} RecommendSlot
 * @property {boolean} enabled
 * @property {string} title
 * @property {boolean} open
 * @property {import('lit-html').TemplateResult|string} box
 */

/**
 * @typedef {Object} PlacementPreviewOptions
 * @property {((type: string, payload?: unknown) => Promise<any>)|undefined} transport
 * @property {() => any} getQueue - The current `worker-queue` snapshot.
 * @property {() => string} rootDir
 * @property {() => Array<{ id: string, title?: string }>} candidates - The
 * candidate lane in its sort order.
 * @property {() => void} requestRender
 * @property {(queue: any, root_dir: string) => void} adopt - Adopt a reply's
 * queue for the workspace the send went to (captured at send time, so a reply
 * that lands after a workspace switch cannot overwrite the new workspace).
 * @property {(message: string, kind?: 'error'|'success'|'info'|'warning', ms?: number) => void} showToast
 */

/**
 * The Worker tab's placement preview (UI-izba §4.7): the open box, the full
 * plan, their sends and the controls that drive them. Every render recomputes
 * from the current snapshot; nothing here is stored across reloads.
 *
 * @param {PlacementPreviewOptions} options
 */
export function createPlacementPreview(options) {
  const { transport, getQueue, rootDir, candidates, requestRender, adopt } =
    options;
  /** @type {string|null} */
  let open_id = null;
  let full_open = false;
  /** @type {Map<string, boolean>} */
  const checks = new Map();
  /** @type {{ id: string, text: string }|null} */
  let box_notice = null;
  /** @type {string|null} */
  let plan_notice = null;
  let busy = false;

  /** @returns {Record<string, PlacementStatus>|null} */
  function statusMap() {
    const status = getQueue()?.placement_status;
    return status && typeof status === 'object' ? status : null;
  }

  /** @returns {string[]} */
  function displayOrder() {
    return candidates().map((item) => item.id);
  }

  /**
   * @param {string} id
   * @returns {string}
   */
  function titleOf(id) {
    const row = candidates().find((item) => item.id === id);
    return row && typeof row.title === 'string' ? row.title : '';
  }

  /**
   * @param {any} queue
   * @param {string[]} chosen
   * @returns {PlacementPlan}
   */
  function planOn(queue, chosen) {
    return computePlacement({
      queue,
      relations: queue?.placement_relations,
      display_order: displayOrder(),
      chosen
    });
  }

  /**
   * @param {any} queue
   * @returns {string[]}
   */
  function readyIds(queue) {
    const status = queue?.placement_status;
    if (!status || typeof status !== 'object') {
      return [];
    }
    return Object.keys(status).filter((id) => status[id]?.state === 'ready');
  }

  /**
   * The full plan on a snapshot: every ready candidate starts checked —
   * warnings and low-confidence rows included, since the table shows them and
   * a person presses `[전체 적용]` — the reader's checks override that, and the
   * plan itself is computed with the checked set only. `base` is the plan of
   * every ready candidate: an unchecked row still shows its reasons and
   * warnings from it.
   *
   * @param {any} queue
   * @returns {{ plan: PlacementPlan, base: PlacementPlan, ready: string[], checked: Set<string> }}
   */
  function fullPlanOn(queue) {
    const ready = readyIds(queue);
    const base = planOn(queue, ready);
    const checked = new Set(
      ready.filter((id) => !checks.has(id) || checks.get(id) === true)
    );
    return { plan: planOn(queue, [...checked]), base, ready, checked };
  }

  /**
   * The open single preview, or null when its candidate is no longer ready.
   *
   * @returns {PlannedPlacement|null}
   */
  function openPlacement() {
    if (open_id === null || statusMap()?.[open_id]?.state !== 'ready') {
      return null;
    }
    return planOn(getQueue(), [open_id]).by_id[open_id] || null;
  }

  /**
   * The plan whose dotted cards the waiting lanes draw now.
   *
   * @returns {PlacementPlan|null}
   */
  function activePlan() {
    if (!statusMap()) {
      return null;
    }
    if (full_open) {
      return fullPlanOn(getQueue()).plan;
    }
    if (openPlacement()) {
      return planOn(getQueue(), [/** @type {string} */ (open_id)]);
    }
    return null;
  }

  /** @param {string} id */
  async function applyOne(id) {
    const queue = getQueue();
    const plan = planOn(queue, [id]);
    const placement = plan.by_id[id];
    if (!transport || !placement || busy) {
      return;
    }
    busy = true;
    box_notice = null;
    requestRender();
    const root_dir = rootDir();
    const result = await sendPlacement({
      transport,
      root_dir,
      placement,
      revision: plan.revision,
      recompute: (next) => planOn(next, [id]),
      adopt: (next) => adopt(next, root_dir)
    });
    busy = false;
    if (result.status === 'applied') {
      open_id = null;
    } else if (result.status === 'moved') {
      box_notice = { id, text: '자리가 바뀌었습니다' };
    } else {
      const notice = placementSendNotice(result);
      if (notice) {
        options.showToast(notice, 'error');
      }
    }
    requestRender();
  }

  async function applyAll() {
    const queue = getQueue();
    const shown = fullPlanOn(queue).plan.order;
    if (!transport || shown.length === 0 || busy) {
      return;
    }
    busy = true;
    plan_notice = null;
    requestRender();
    const root_dir = rootDir();
    const result = await sendPlacementBatch({
      transport,
      root_dir,
      shown,
      queue,
      recompute: planOn,
      adopt: (next) => adopt(next, root_dir),
      snapshot: getQueue
    });
    busy = false;
    if (result.stopped === null) {
      full_open = false;
      checks.clear();
      options.showToast(`${result.placed.length}건을 넣었습니다`, 'success');
    } else {
      const why =
        result.stopped.cause === 'moved'
          ? '자리가 바뀌었습니다'
          : placementSendNotice(result.stopped.result) || '';
      plan_notice = `${result.placed.length}건 넣음 — ${result.stopped.id}에서 멈춤: ${why}`;
    }
    requestRender();
  }

  async function rejudge() {
    if (!transport) {
      return;
    }
    const root_dir = rootDir();
    try {
      await transport('worker-placement-rejudge', root_dir ? { root_dir } : {});
      options.showToast('jev 판정을 다시 요청했습니다', 'info', 2000);
    } catch (error) {
      const message =
        error && typeof error === 'object' && 'message' in error
          ? String(/** @type {any} */ (error).message)
          : String(error);
      options.showToast(`다시 판정하지 못했습니다: ${message}`, 'error');
    }
  }

  return {
    /**
     * `[추천 배치]` material of one candidate card, or null when the snapshot
     * carries no placement judgment (older server) or the candidate has no
     * status entry (fail-quiet).
     *
     * @param {{ id: string }} item
     * @returns {RecommendSlot|null}
     */
    cardSlot(item) {
      const status = statusMap()?.[item.id];
      if (!status || typeof status !== 'object') {
        return null;
      }
      const state = recommendButtonState(status);
      const placement =
        !full_open && open_id === item.id ? openPlacement() : null;
      return {
        enabled: state.enabled,
        title: state.title,
        open: placement !== null,
        box: placement
          ? recommendBoxTemplate(placement, {
              busy,
              notice:
                box_notice && box_notice.id === item.id ? box_notice.text : null
            })
          : ''
      };
    },
    /**
     * The drawn rows of one waiting lane with this render's dotted cards.
     *
     * @param {Array<{ id: string, template: import('lit-html').TemplateResult }>} rows
     * @param {PlacementLane} lane
     * @param {PlacementPlan|null} plan
     * @returns {import('lit-html').TemplateResult[]}
     */
    laneRows(rows, lane, plan) {
      return interleavePreview(rows, lane, plan, titleOf);
    },
    activePlan,
    /**
     * Waiting column header controls (§4.7): `[전체 배치안]`·`[↻ 다시 판정]` and
     * the latest judged-at time. Nothing without placement material.
     *
     * @returns {import('lit-html').TemplateResult|string}
     */
    headerControls() {
      const queue = getQueue();
      if (!statusMap()) {
        return '';
      }
      const any_ready = readyIds(queue).length > 0;
      const progress = objectOf(queue.placement_progress);
      const judging =
        typeof progress.done === 'number' &&
        typeof progress.total === 'number' &&
        progress.done < progress.total;
      let latest = null;
      for (const raw of Object.values(queue.placement_relations || {})) {
        const at = /** @type {any} */ (raw)?.judged_at;
        if (typeof at === 'number' && (latest === null || at > latest)) {
          latest = at;
        }
      }
      return html`<span class="worker-plan-controls">
        <button
          type="button"
          class="op-btn worker-plan__open${full_open ? ' is-active' : ''}"
          aria-pressed=${full_open ? 'true' : 'false'}
          ?disabled=${!any_ready}
          title=${any_ready
            ? 'jev 판정이 끝난 후보 전부의 배치안을 봅니다'
            : 'jev 판정이 끝난 후보가 없습니다'}
        >
          전체 배치안
        </button>
        ${judging
          ? html`<span
              class="worker-plan__progress"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax=${String(progress.total)}
              aria-valuenow=${String(progress.done)}
              style=${`--progress: ${Math.floor(
                (progress.done / progress.total) * 100
              )}%`}
            >
              <span class="worker-plan__progress-track" aria-hidden="true">
                <span class="worker-plan__progress-fill"></span>
              </span>
              <span class="worker-plan__progress-text"
                >jev 판정 ${progress.done}/${progress.total}</span
              >
            </span>`
          : ''}
        <button
          type="button"
          class="op-btn worker-plan__rejudge"
          title="이 저장소 후보의 jev 쌍 판정을 지우고 다시 받습니다"
        >
          ↻ 다시 판정
        </button>
        ${typeof latest === 'number'
          ? html`<span
              class="worker-plan__time"
              title=${`마지막 jev 판정 ${formatTimestampLocal(latest)}`}
              >판정 ${formatClockLocal(latest)}</span
            >`
          : ''}
      </span>`;
    },
    /**
     * The full plan table below the waiting column, or nothing while closed.
     *
     * @returns {import('lit-html').TemplateResult|string}
     */
    planTemplate() {
      const status = statusMap();
      if (!full_open || !status) {
        return '';
      }
      const { plan, base, checked } = fullPlanOn(getQueue());
      const rows = Object.keys(status).sort((a, b) => {
        const order = displayOrder();
        const ra = order.indexOf(a);
        const rb = order.indexOf(b);
        if (ra !== rb) {
          return (ra < 0 ? Infinity : ra) - (rb < 0 ? Infinity : rb);
        }
        return a < b ? -1 : 1;
      });
      return html`<section class="worker-plan">
        <table class="worker-plan__table">
          <thead>
            <tr>
              <th>#</th>
              <th>후보</th>
              <th>배치안</th>
              <th>근거</th>
              <th>포함</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((id) => {
              const ready = status[id]?.state === 'ready';
              const item = plan.by_id[id];
              // An unchecked ready row keeps the reasons and warnings of the
              // all-ready plan, so the reader sees why it was left out; only
              // checked rows get a number, a dotted card and a send.
              const explained = item || (ready ? base.by_id[id] : undefined);
              return html`<tr
                class="worker-plan__row${ready
                  ? ''
                  : ' worker-plan__row--pending'}"
                data-bead-id=${id}
              >
                <td>${item ? item.number : ''}</td>
                <td>
                  <span class="worker-plan__id">${id}</span>
                  ${titleOf(id)}
                </td>
                <td>
                  ${!ready
                    ? '판정 전'
                    : item
                      ? placementPositionText(item)
                      : '포함 안 함'}
                </td>
                <td>
                  ${explained
                    ? reasonCellTemplate(explained)
                    : ready
                      ? ''
                      : recommendButtonState(status[id]).title}
                </td>
                <td>
                  <input
                    type="checkbox"
                    class="worker-plan__include"
                    data-bead-id=${id}
                    aria-label=${`${id} 포함`}
                    .checked=${checked.has(id)}
                    ?disabled=${!ready || busy}
                  />
                </td>
              </tr>`;
            })}
          </tbody>
        </table>
        ${plan_notice
          ? html`<div class="worker-plan__notice">${plan_notice}</div>`
          : ''}
        <div class="worker-plan__actions">
          <button
            type="button"
            class="op-btn op-btn--primary worker-plan__apply"
            ?disabled=${plan.order.length === 0 || busy}
            title="체크한 후보를 번호 순서대로 하나씩 넣습니다"
          >
            전체 적용 (${plan.order.length})
          </button>
          <button
            type="button"
            class="op-btn op-btn--ghost op-btn--icon worker-plan__close"
            title="전체 배치안 닫기"
            aria-label="전체 배치안 닫기"
          >
            ✕
          </button>
        </div>
      </section>`;
    },
    /**
     * Handle a click inside the Worker tab. True when this module took it.
     *
     * @param {HTMLElement|null} target
     * @returns {boolean}
     */
    handleClick(target) {
      if (!target || typeof target.closest !== 'function') {
        return false;
      }
      const recommend = /** @type {HTMLButtonElement|null} */ (
        target.closest('.worker-card__recommend')
      );
      if (recommend) {
        const id = recommend.dataset.beadId || '';
        if (id && !recommend.disabled) {
          open_id = open_id === id ? null : id;
          full_open = false;
          box_notice = null;
          requestRender();
        }
        return true;
      }
      const apply = /** @type {HTMLButtonElement|null} */ (
        target.closest('.worker-recommend__apply')
      );
      if (apply) {
        const id = apply.dataset.beadId || '';
        if (id && !apply.disabled) {
          void applyOne(id);
        }
        return true;
      }
      if (target.closest('.worker-recommend__close')) {
        open_id = null;
        box_notice = null;
        requestRender();
        return true;
      }
      const open_plan = /** @type {HTMLButtonElement|null} */ (
        target.closest('.worker-plan__open')
      );
      if (open_plan) {
        if (!open_plan.disabled) {
          full_open = !full_open;
          open_id = null;
          checks.clear();
          plan_notice = null;
          requestRender();
        }
        return true;
      }
      if (target.closest('.worker-plan__close')) {
        full_open = false;
        plan_notice = null;
        requestRender();
        return true;
      }
      const apply_all = /** @type {HTMLButtonElement|null} */ (
        target.closest('.worker-plan__apply')
      );
      if (apply_all) {
        if (!apply_all.disabled) {
          void applyAll();
        }
        return true;
      }
      if (target.closest('.worker-plan__rejudge')) {
        void rejudge();
        return true;
      }
      // The box and the table are not the card: a click inside them must not
      // fall through to the card's open-detail default.
      return !!target.closest('.worker-recommend, .worker-plan');
    },
    /**
     * Handle a change event (the full plan's include checkboxes).
     *
     * @param {HTMLElement|null} target
     * @returns {boolean}
     */
    handleChange(target) {
      const box = /** @type {HTMLInputElement|null} */ (
        target && typeof target.closest === 'function'
          ? target.closest('.worker-plan__include')
          : null
      );
      if (!box) {
        return false;
      }
      const id = box.dataset.beadId || '';
      if (id) {
        checks.set(id, box.checked);
        plan_notice = null;
        requestRender();
      }
      return true;
    },
    /**
     * Esc closes the open box and the full plan. True when something closed.
     *
     * @returns {boolean}
     */
    handleEscape() {
      if (open_id === null && !full_open) {
        return false;
      }
      open_id = null;
      full_open = false;
      box_notice = null;
      plan_notice = null;
      requestRender();
      return true;
    }
  };
}
