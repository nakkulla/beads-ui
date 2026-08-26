/**
 * The `⛓ blocked` 칩 (UI-eey2 §5.1, 레인 무관 통일은 UI-anna §5.1).
 *
 * 칩의 모양은 두 탭이 공유한다: 모니터 투영(`app/views/monitor/lanes.js`)과
 * 워커 투영(`app/views/worker/index.js`)이 같은 {@link predecessorChip}을
 * 불러 같은 라벨·같은 툴팁 문장 틀을 낸다 — 규칙을 복제하면 한쪽이 반드시
 * 낡는다. 겹침이 같은 문제를 같은 방법으로 풀었다 (`queue-overlaps.js`).
 *
 * 워커 탭이 모니터의 `describeBlocker`를 그대로 쓸 수 없는 이유는 축이다:
 * 그쪽은 `workspaces_state`와 레포 축을 가진 `BlockerLocation`에 묶여 있고,
 * 워커 탭은 워크스페이스 하나만 본다. 그래서 위치는 화면 사실 목록
 * (`LaneMember`)에서 읽고, 그 목록에 없는 blocker는 `미적재`로 접는다 — 두
 * 탭의 괄호 안 위치가 같은 값이 되지 않는 경계는 UI-anna §5.1이 정한다.
 *
 * @import { DependencyChip } from './lanes.js'
 * @import { LaneMember } from './queue-overlaps.js'
 */
import { isForeignBlocker } from '../../utils/blocker-scope.js';

/**
 * One blocker as the chip needs it. 모니터의
 * `import('../monitor/blockers.js').BlockerDisplay`가 이 모양을 만족하므로 두
 * 탭이 같은 함수를 부를 수 있다.
 *
 * @typedef {Object} BlockerFact
 * @property {string} id
 * @property {string} location_label - The 위치 phrase alone, without a glyph.
 */

/**
 * 목록에 없는 blocker의 위치 (UI-anna §5.1). 워커 탭은 다른 워크스페이스의
 * 레인을 볼 수 없으므로, 모니터가 `외부`·`위치 미확인`으로 갈라 내는 것도
 * 여기서는 한 값으로 접힌다 — 모르는 것을 아는 척하지 않는다.
 */
const UNPLACED_LOCATION = '미적재';

/**
 * One blocked chip — Board 카드와 같은 한 벌이다 (`board/card.js`
 * `blockedChips`). 칩이 서 있다는 사실 자체가 "이 이슈는 저것 때문에 못
 * 나간다"이므로 방향어를 다시 적지 않고, blocker가 지금 어느 레인에 있는지는
 * 카드가 아니라 툴팁이 말한다 — 카드 위에서 `(실행가능)`은 이 이슈의 상태로
 * 오독됐다.
 *
 * 타 레포 blocker는 같은 문구에 색만 갈라진다 (`foreign`): 기다린다는 사실은
 * 같고, 그것이 이 레포 밖에 있어 여기서 닫을 수 없다는 것만 다르다.
 *
 * @param {string} owner_id
 * @param {BlockerFact} blocker
 * @returns {DependencyChip}
 */
export function predecessorChip(owner_id, blocker) {
  const foreign = isForeignBlocker(owner_id, blocker.id);
  return {
    id: blocker.id,
    label: `⛓ blocked: ${blocker.id}`,
    title: `이 이슈는 ${blocker.id}가 close될 때까지 출발하지 않는다 (${blocker.location_label})`,
    ...(foreign ? { foreign: true } : {})
  };
}

/**
 * Derive the 워커 탭 blocked 칩 (UI-anna §5.1).
 *
 * 입력 하나(`blockers_by_bead`)는 호출부가 세 원천 — 큐 장식
 * `bead_blocked_by` · 후보의 `blocked_info.blockers`(구서버는 `depends_on_id`
 * 간선) · `session_active.blocked_by` — 을 정규화한 결과다. 한 원천만 읽으면
 * 후보와 세션 타일에서 칩이 조용히 사라지고, 그것이 이 스펙이 없애려는 증상이다.
 *
 * `lane_members`는 겹침 파생이 쓰는 것과 **같은 목록**이다 (§5.2): 두 칩이
 * 같은 화면 사실에서 위치를 읽어야 위치 라벨이 갈리지 않는다. 첫 등장이
 * 이긴다 — 목록이 실행중을 앞에 싣는 것과 같은 dedupe 규칙이다.
 *
 * 재료가 없으면 빈 결과다 (fail-quiet).
 *
 * @param {Map<string, string[]>} blockers_by_bead
 * @param {LaneMember[]} lane_members
 * @returns {Map<string, DependencyChip[]>}
 */
export function deriveWorkerBlockers(blockers_by_bead, lane_members) {
  /** @type {Map<string, DependencyChip[]>} */
  const chips_by_bead = new Map();
  /** @type {Map<string, string>} */
  const location_by_bead = new Map();
  for (const member of lane_members) {
    if (!location_by_bead.has(member.id)) {
      location_by_bead.set(member.id, member.location_label);
    }
  }
  for (const [bead_id, blockers] of blockers_by_bead) {
    if (typeof bead_id !== 'string' || bead_id.length === 0) {
      continue;
    }
    /** @type {DependencyChip[]} */
    const chips = [];
    for (const blocker_id of Array.isArray(blockers) ? blockers : []) {
      if (typeof blocker_id !== 'string' || blocker_id.length === 0) {
        continue;
      }
      chips.push(
        predecessorChip(bead_id, {
          id: blocker_id,
          location_label: location_by_bead.get(blocker_id) || UNPLACED_LOCATION
        })
      );
    }
    if (chips.length > 0) {
      chips_by_bead.set(bead_id, chips);
    }
  }
  return chips_by_bead;
}
