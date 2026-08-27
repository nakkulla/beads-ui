/**
 * Worker 탭의 scope 겹침 파생 (UI-jbao, UI-qm12 §5.2·§5.4의 워커 탭 투영).
 *
 * 서버가 워커 채널 스냅샷에 실어 보내는 선언 scope 사실(`bead_scope`)에서
 * 클라이언트가 겹침을 pairwise로 파생한다 — 모니터의 `applyScopeOverlaps`와
 * 같은 규칙이되, 워커 탭은 워크스페이스 하나이므로 레포 분기가 없다. 판정
 * 규칙의 SoT은 UI-qm12 스펙이고 이 모듈은 그 규칙의 두 번째 소비자다.
 *
 * @import { OverlapChip } from './lanes.js'
 */
import { overlapPrefixes } from '../../utils/scope-overlap.js';

/**
 * One 화면 사실 항목: 후보·병렬 대기·직렬 레인·실행 중·PR 대기 어딘가에 서 있는
 * bead. 겹침 비교 집합이자 blocked 칩의 위치 사전이므로 (UI-anna §5.2) 이름이
 * 겹침 전용이 아니다 — 두 칩이 같은 목록에서 위치를 읽어야 라벨이 갈리지 않는다.
 * 완료만 밖에 있다.
 *
 * @typedef {Object} LaneMember
 * @property {string} id
 * @property {string} title
 * @property {string} location_label - `실행중` · `#n` · `s1 #n` · `후보` ·
 * `PR 대기`.
 * @property {'parallel'|'serial'|'running'|'candidate'|'pr_wait'} kind -
 * `candidate`는 아직 큐에 없는 후보 행 (UI-f3ma): 배치 대상이라는 점에서 병렬
 * 대기와 같고, 위치만 다르다. `pr_wait`은 이미 출발한 쪽이라 실행 중과 같이
 * 옮길 수 없다 (UI-anna §5.2).
 * @property {'s1'|'s2'|'s3'|'s4'|'s5'|null} lane_id - 직렬 행의 레인, 또는
 * 직렬 레인에서 출발한 실행 중 bead의 출발 레인. 그 외 null.
 * @property {boolean} [queue_placeable] - `candidate`만 싣는다 (UI-d13v §6):
 * 카드의 `[대기로 ↴]`·배치 메뉴와 같은 자격이다. 팝오버 1클릭 배치가 이 값을
 * 읽지 않으면 비활성 버튼을 팝오버로 우회하게 된다. 없거나 false면 옮길 수 없다.
 */

/**
 * Derive 겹침 칩과 `scope 없음` 사실 (UI-qm12 §5.2). 항목 없음 = 아직
 * 안 읽음·스펙 없음, `null` = 읽기 실패 — 둘 다 아무 말도 하지 않는다.
 * `bead_scope`가 없는 구서버 스냅샷은 빈 결과다 (fail-quiet).
 *
 * @param {unknown} bead_scope
 * @param {LaneMember[]} members
 * @returns {Map<string, { overlaps: OverlapChip[], scope_missing: boolean }>}
 */
export function deriveWorkerOverlaps(bead_scope, members) {
  /** @type {Map<string, { overlaps: OverlapChip[], scope_missing: boolean }>} */
  const facts = new Map();
  if (!bead_scope || typeof bead_scope !== 'object') {
    return facts;
  }
  const record = /** @type {Record<string, any>} */ (bead_scope);
  /** @type {Array<{ member: LaneMember, scope: string[] }>} */
  const declared = [];
  /** @type {Set<string>} */
  const seen = new Set();
  for (const member of members) {
    if (seen.has(member.id)) {
      continue;
    }
    seen.add(member.id);
    const entry = record[member.id];
    if (!entry || !Array.isArray(entry.scope)) {
      continue;
    }
    const scope = entry.scope.filter(
      (/** @type {unknown} */ path) =>
        typeof path === 'string' && path.length > 0
    );
    if (scope.length === 0) {
      facts.set(member.id, { overlaps: [], scope_missing: true });
      continue;
    }
    facts.set(member.id, { overlaps: [], scope_missing: false });
    declared.push({ member, scope });
  }
  for (let left = 0; left < declared.length; left += 1) {
    for (let right = left + 1; right < declared.length; right += 1) {
      const prefixes = overlapPrefixes(
        declared[left].scope,
        declared[right].scope
      );
      if (prefixes.length === 0) {
        continue;
      }
      const a = declared[left].member;
      const b = declared[right].member;
      facts.get(a.id)?.overlaps.push({
        id: b.id,
        title: b.title,
        location_label: b.location_label,
        prefixes
      });
      facts.get(b.id)?.overlaps.push({
        id: a.id,
        title: a.title,
        location_label: a.location_label,
        prefixes
      });
    }
  }
  return facts;
}

/**
 * @typedef {{ kind: 'note', text: string }
 *   | { kind: 'disabled', title: string }
 *   | { kind: 'ops', title: string, ops: Array<{ bead_id: string, lane: 's1'|'s2'|'s3'|'s4'|'s5', index: number }> }} WorkerPlacementPlan
 */

/**
 * 옮길 수 있는 레인 (UI-anna §5.2). 화이트리스트인 이유는 실패 방향이다 —
 * `kind !== 'running'` 같은 부정 판정은 새 `kind`가 생길 때마다 조용히
 * "옮길 수 있다"로 기울고, 그것이 PR 대기 행에 배치 버튼을 세우는 길이다.
 *
 * @type {ReadonlyArray<LaneMember['kind']>}
 */
const MOVABLE_KINDS = ['parallel', 'serial', 'candidate'];

/**
 * Whether the popover may move this member. 후보는 레인만으로 부족하다 — 카드의
 * `[대기로 ↴]`가 막는 후보(spec 없음·worker-ineligible)를 팝오버가 넣으면
 * 같은 서버 거절을 다른 문으로 만나고, 2 op 계획에서는 상대만 먼저 옮겨져
 * 부분 적용이 남는다.
 *
 * @param {LaneMember} member
 * @returns {boolean}
 */
function isMovable(member) {
  if (!MOVABLE_KINDS.includes(member.kind)) {
    return false;
  }
  return member.kind !== 'candidate' || member.queue_placeable === true;
}

/**
 * The name of a lane that has already departed — 문장이 그 레인의 사실을 말해야
 * 하므로, 실행 중과 PR 대기를 한 단어로 뭉뚱그리지 않는다. Monitor 팝오버도
 * 같은 사실에 같은 이름을 붙여야 하므로 (UI-2htv) 두 탭이 이 값 하나를
 * 공유한다 — 레인 이름을 각자 쓰면 그것이 두 탭이 갈라진 원인이다.
 *
 * @param {string} kind - 그 카드가 선 레인. Worker는 `LaneMember['kind']`를,
 * Monitor는 `MonitorItem['lane']`을 싣는다. 두 어휘가 갈리는 값은 `pr_wait`
 * 하나뿐이고 그 철자는 같다.
 * @returns {string}
 */
export function departedLabel(kind) {
  return kind === 'pr_wait' ? 'PR 대기' : '실행 중';
}

/**
 * The §5.4 decision table, 워커 탭 판. 어느 한쪽에 직렬 레인이 있으면 그
 * 레인을 쓰고(1 op), 둘 다 없을 때만 빈 레인에 둘을 차례로 넣는다(2 op).
 * 이미 출발한 항목(실행 중·PR 대기)은 옮기지 않으므로 그 자리에는 버튼 대신
 * 문장이 선다.
 *
 * @param {string} me_id - 칩을 눌러 팝오버를 연 카드의 bead.
 * @param {string} counterpart_id - 겹치는 상대로 팝오버 행에 선 bead.
 * @param {{ members_by_id: Map<string, LaneMember>, serial_raw_lengths: Record<string, number>, serial_lane_count: number, occupied_lanes: Set<string> }} queue_facts
 * @returns {WorkerPlacementPlan}
 */
export function workerPlacementPlan(me_id, counterpart_id, queue_facts) {
  const me = queue_facts.members_by_id.get(me_id);
  const other = queue_facts.members_by_id.get(counterpart_id);
  if (!me || !other) {
    return { kind: 'note', text: '상대의 현재 위치를 알 수 없습니다' };
  }
  const my_lane = me.lane_id;
  const other_lane = other.lane_id;
  if (my_lane !== null && my_lane === other_lane) {
    return { kind: 'note', text: '이미 같은 직렬 레인 — 순서가 있습니다' };
  }
  const my_move = isMovable(me);
  const other_move = isMovable(other);
  // 자격 없는 후보가 끼면 계획을 만들지 않는다 — 어느 쪽이든 서버가 거절할
  // op를 팝오버가 요청하지 않는다.
  if (me.kind === 'candidate' && !my_move) {
    return {
      kind: 'disabled',
      title: `${me_id}는 대기 큐에 넣을 수 없습니다 (spec 없음 또는 worker-ineligible)`
    };
  }
  if (other.kind === 'candidate' && !other_move) {
    return {
      kind: 'disabled',
      title: `${counterpart_id}는 대기 큐에 넣을 수 없습니다 (spec 없음 또는 worker-ineligible)`
    };
  }
  if (my_move && other_lane !== null) {
    return {
      kind: 'ops',
      title: `${other_lane} 끝에 ${me_id}를 넣습니다`,
      ops: [
        {
          bead_id: me_id,
          lane: other_lane,
          index: queue_facts.serial_raw_lengths[other_lane] || 0
        }
      ]
    };
  }
  if (my_lane !== null && other_move && other_lane === null) {
    return {
      kind: 'ops',
      title: `${my_lane} 끝에 ${counterpart_id}를 넣습니다`,
      ops: [
        {
          bead_id: counterpart_id,
          lane: my_lane,
          index: queue_facts.serial_raw_lengths[my_lane] || 0
        }
      ]
    };
  }
  if (my_move && my_lane === null && other_move && other_lane === null) {
    const empty = firstEmptySerialLane(queue_facts);
    if (empty === null) {
      return {
        kind: 'disabled',
        title: '빈 직렬 레인 없음 — 직렬 레인 수를 조절하세요'
      };
    }
    // 상대가 먼저다 — 겹침 칩은 순서를 주장하지 않지만, 이미 자리를 잡은
    // 쪽을 앞에 두는 것이 사용자가 방금 본 화면과 어긋나지 않는다.
    return {
      kind: 'ops',
      title: `${empty} 레인에 ${counterpart_id} → ${me_id} 순서로 넣습니다`,
      ops: [
        { bead_id: counterpart_id, lane: empty, index: 0 },
        { bead_id: me_id, lane: empty, index: 1 }
      ]
    };
  }
  if (!my_move && !other_move) {
    return { kind: 'note', text: '둘 다 이미 출발 — 순서를 만들 수 없습니다' };
  }
  if (!my_move) {
    return {
      kind: 'note',
      text: `${departedLabel(me.kind)} — 순서를 만들려면 상대를 직렬 레인에 두세요`
    };
  }
  return {
    kind: 'note',
    text: `${departedLabel(other.kind)} — 종료 후 출발하려면 직렬 레인에 두세요`
  };
}

/**
 * The first EMPTY 직렬 레인 (§5.4): 서버 배열에 entry가 없고 점유자도 없는
 * 레인. 설정만 있고 비어 있는 레인도 후보다.
 *
 * @param {{ serial_raw_lengths: Record<string, number>, serial_lane_count: number, occupied_lanes: Set<string> }} queue_facts
 * @returns {'s1'|'s2'|'s3'|'s4'|'s5'|null}
 */
function firstEmptySerialLane(queue_facts) {
  for (let index = 0; index < queue_facts.serial_lane_count; index += 1) {
    const id = /** @type {'s1'|'s2'|'s3'|'s4'|'s5'} */ (`s${index + 1}`);
    if (
      (queue_facts.serial_raw_lengths[id] || 0) === 0 &&
      !queue_facts.occupied_lanes.has(id)
    ) {
      return id;
    }
  }
  return null;
}
