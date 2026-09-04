/**
 * The `⛓ <ID>` 칩 (UI-eey2 §5.1, 레인 무관 통일은 UI-anna §5.1, 글리프+ID 라벨은
 * UI-8x90 §3).
 *
 * 칩의 모양은 두 탭이 공유한다: 모니터 투영(`app/views/worker/lane-model.js`)과
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
 * @import { DependencyChip, DependentsChip, ReleasedChip } from './lanes.js'
 * @import { LaneMember } from './queue-overlaps.js'
 */
import { isForeignBlocker } from '../../utils/blocker-scope.js';
import { formatTimestampLocal } from '../../utils/relative-time.js';

/**
 * One blocker as the chip needs it. 모니터의
 * `import('../monitor/blockers.js').BlockerDisplay`가 이 모양을 만족하므로 두
 * 탭이 같은 함수를 부를 수 있다.
 *
 * @typedef {Object} BlockerFact
 * @property {string} id
 * @property {string} location_label - The 위치 phrase alone, without a glyph.
 * @property {string} [workspace_name] - foreign blocker owner의 화면 이름.
 */

/**
 * 목록에 없는 blocker의 위치 (UI-anna §5.1). 워커 탭은 다른 워크스페이스의
 * 레인을 볼 수 없으므로, 모니터가 `외부`·`위치 미확인`으로 갈라 내는 것도
 * 여기서는 한 값으로 접힌다 — 모르는 것을 아는 척하지 않는다.
 */
const UNPLACED_LOCATION = '미적재';

/**
 * @param {string} glyph
 * @param {string} id
 * @param {boolean} foreign
 * @param {string|undefined} workspace_name
 */
function blockerLabel(glyph, id, foreign, workspace_name) {
  if (!foreign) {
    return `${glyph} ${id}`;
  }
  const owner =
    typeof workspace_name === 'string' && workspace_name.length > 0
      ? workspace_name
      : '외부';
  return `${glyph} ${owner}/${id}`;
}

/**
 * @param {string} label
 * @param {string} sentence
 * @param {boolean} foreign
 */
function blockerTitle(label, sentence, foreign) {
  return `${label} — ${sentence}${
    foreign ? ' · 다른 저장소의 이슈라 여기서 닫을 수 없다' : ''
  }`;
}

/**
 * @param {unknown} root_dir
 * @returns {string|undefined}
 */
function workspaceNameFromRoot(root_dir) {
  if (typeof root_dir !== 'string' || root_dir.length === 0) {
    return undefined;
  }
  const trimmed = root_dir.replace(/\/+$/, '');
  const cut = trimmed.lastIndexOf('/');
  const name = trimmed.slice(cut + 1);
  return name.length > 0 ? name : undefined;
}

/**
 * One blocked chip — Board 카드와 같은 한 벌이다 (`board/card.js`
 * `blockedChips`). 칩이 서 있다는 사실 자체가 "이 이슈는 저것 때문에 못
 * 나간다"이므로 방향어를 다시 적지 않고, blocker가 지금 어느 레인에 있는지는
 * 카드가 아니라 툴팁이 말한다 — 카드 위에서 `(실행가능)`은 이 이슈의 상태로
 * 오독됐다.
 *
 * 타 레포 blocker는 owner workspace 이름을 ID 앞에 쓰고 `foreign` 색도
 * 유지한다. owner를 모르면 `외부`로 접어 추론하지 않는다.
 *
 * @param {string} owner_id
 * @param {BlockerFact} blocker
 * @returns {DependencyChip}
 */
export function predecessorChip(owner_id, blocker) {
  const foreign = isForeignBlocker(owner_id, blocker.id);
  const label = blockerLabel('⛓', blocker.id, foreign, blocker.workspace_name);
  return {
    id: blocker.id,
    label,
    title: blockerTitle(
      label,
      `선행 — close될 때까지 출발하지 않는다 (${blocker.location_label})`,
      foreign
    ),
    ...(foreign ? { foreign: true } : {})
  };
}

/**
 * 해제 칩이 서는 창 (UI-d13v §5.3). 정렬 키 `released`는 이 창과 무관하게
 * `last_released_at`을 쓴다 — 오래 전에 풀린 이슈는 정렬로 여전히 잡히지만,
 * 칩까지 계속 서면 `🔓 해제`가 "방금"이라는 뜻을 잃는다.
 */
const RELEASED_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * One closed blocker as the 해제 칩 needs it (UI-d13v §3.3). 서버가
 * `release_info.released_by`에 싣는 항목 모양 그대로다.
 *
 * @typedef {Object} ReleasedFact
 * @property {string} id
 * @property {number} closed_at
 * @property {string} [root_dir] - owner workspace. 같은 레포이거나 owner를
 * 모르면 없다.
 * @property {string} [workspace_name] - foreign owner의 화면 이름.
 */

/**
 * One `🔓 <ID>` 칩 (UI-d13v §5.3, 라벨은 UI-8x90 §3). `⛓`가 "왜 못 가나"에 답한다면
 * 이 칩은 "왜 이제 갈 수 있나"에 답한다 — 같은 슬롯 4의 같은 질문 계열이라
 * blocked 칩과 같은 파일에 두고, Monitor 투영도 나중에 같은 함수를 부른다.
 *
 * 7일 창은 여기서 닫힌다: 창 밖이거나 `closed_at`이 숫자가 아니면 `null`이다
 * (fail-quiet). `openable` 규칙은 blocked 칩과 같다 (UI-u6zf §5.1) — 같은
 * 레포는 그냥 열리고, 타 레포는 owner를 아는 것만 열린다.
 *
 * @param {string} owner_id - 이 칩이 서는 카드의 bead.
 * @param {ReleasedFact} released
 * @param {number} now - 7일 창을 재는 기준 시각. 모델 조립당 한 번 읽어
 * 같은 화면의 카드가 같은 창을 본다.
 * @returns {ReleasedChip|null}
 */
export function releasedChip(owner_id, released, now) {
  const closed_at = released.closed_at;
  if (typeof closed_at !== 'number' || !Number.isFinite(closed_at)) {
    return null;
  }
  if (closed_at < now - RELEASED_WINDOW_MS) {
    return null;
  }
  const foreign = isForeignBlocker(owner_id, released.id);
  const root_dir =
    typeof released.root_dir === 'string' ? released.root_dir : '';
  const label = blockerLabel(
    '🔓',
    released.id,
    foreign,
    released.workspace_name
  );
  /** @type {ReleasedChip} */
  const chip = {
    id: released.id,
    label,
    title: blockerTitle(
      label,
      `해제 — ${formatTimestampLocal(closed_at)}에 close되어 이 이슈가 풀렸다`,
      foreign
    ),
    ...(foreign ? { foreign: true } : {})
  };
  if (!foreign) {
    chip.openable = true;
  } else if (root_dir.length > 0) {
    chip.openable = true;
    chip.root_dir = root_dir;
  }
  return chip;
}

/**
 * One resolved blocker chip. 서버가 현재 열린 선행 목록에서 빠졌다는 것만
 * 말하고 close 시각은 주장하지 않으며, owner를 아는 foreign 칩만 열 수 있다.
 *
 * @param {string} owner_id
 * @param {string} id
 * @param {string} [workspace_name]
 * @param {string} [root_dir]
 * @returns {ReleasedChip}
 */
export function resolvedBlockerChip(owner_id, id, workspace_name, root_dir) {
  const foreign = isForeignBlocker(owner_id, id);
  const label = blockerLabel('🔓', id, foreign, workspace_name);
  /** @type {ReleasedChip} */
  const chip = {
    id,
    label,
    title: blockerTitle(
      label,
      '해제 — 더 이상 이 이슈를 막지 않는다 · 복귀 대기',
      foreign
    ),
    ...(foreign ? { foreign: true } : {})
  };
  if (!foreign) {
    chip.openable = true;
  } else if (typeof root_dir === 'string' && root_dir.length > 0) {
    chip.openable = true;
    chip.root_dir = root_dir;
  }
  return chip;
}

/**
 * The 후속 재료 both sources hand in (UI-8x90 §4.4). `count` survives only for
 * the 후보 정렬 체인; the chips read `ids`, and `root_dirs` names the workspace
 * that owns an id — same meaning as `release_info.released_by[].root_dir`.
 *
 * @typedef {Object} DependentsInfo
 * @property {number} [count]
 * @property {string[]} [ids] - Open follow-ups, 사전순.
 * @property {Record<string, string>} [root_dirs]
 */

/**
 * The `→ <ID>` 칩 한 벌 (UI-8x90 §3·§4.2): "내가 먼저 가야 풀리는 이슈". 선행
 * 칩과 같은 마크업·같은 클릭이므로 라벨도 같은 문법 하나다 — 관계명은 툴팁 첫
 * 줄이 말한다.
 *
 * `openable` 규칙은 {@link releasedChip}과 같되 `root_dir`을 아는 id는 같은
 * 레포라도 그 값을 싣는다: 레인에 없는 후속은 위치를 스스로 말하지 못하므로,
 * 값이 빠지면 다른 레포가 활성인 상태에서 현재 레포로 잘못 열린다 (§4.4).
 *
 * 재료가 없으면 빈 배열이다 (fail-quiet).
 *
 * @param {string} owner_id - 이 칩이 서는 카드의 bead.
 * @param {DependentsInfo} info
 * @returns {DependentsChip[]}
 */
export function dependentsChip(owner_id, info) {
  const ids = Array.isArray(info.ids)
    ? info.ids.filter(
        (/** @type {unknown} */ id) => typeof id === 'string' && id.length > 0
      )
    : [];
  const root_dirs =
    info.root_dirs && typeof info.root_dirs === 'object' ? info.root_dirs : {};
  /** @type {DependentsChip[]} */
  const chips = [];
  for (const id of [...new Set(ids)].sort()) {
    const foreign = isForeignBlocker(owner_id, id);
    const root_dir = typeof root_dirs[id] === 'string' ? root_dirs[id] : '';
    /** @type {DependentsChip} */
    const chip = {
      id,
      label: `→ ${id}`,
      title: '후속 — 이 이슈가 close되면 풀린다',
      ...(foreign ? { foreign: true } : {})
    };
    if (root_dir.length > 0) {
      chip.openable = true;
      chip.root_dir = root_dir;
    } else if (!foreign) {
      chip.openable = true;
    }
    chips.push(chip);
  }
  return chips;
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
 * 칩마다 열 수 있는지도 여기서 정한다 (UI-u6zf §5.2). 판정은 세 갈래다: 같은
 * 레포 blocker는 현재 workspace에서 그냥 열리고, 타 레포 blocker는 서버가
 * `blocker_workspaces`로 owner를 실어 준 것만 열리며, owner를 모르는 것은 표시
 * 전용으로 남는다 — 누를 수 없는 대상에 버튼을 만들지 않는다.
 *
 * 재료가 없으면 빈 결과다 (fail-quiet).
 *
 * @param {Map<string, string[]>} blockers_by_bead
 * @param {LaneMember[]} lane_members
 * @param {Record<string, string>} [blocker_workspaces] - blocker id → 그것을
 * 소유한 workspace root. 없는 키는 모름이고, 추론하지 않는다.
 * @returns {Map<string, DependencyChip[]>}
 */
export function deriveWorkerBlockers(
  blockers_by_bead,
  lane_members,
  blocker_workspaces = {}
) {
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
      const owner_root = blocker_workspaces[blocker_id];
      const workspace_name = workspaceNameFromRoot(owner_root);
      const chip = predecessorChip(bead_id, {
        id: blocker_id,
        location_label: location_by_bead.get(blocker_id) || UNPLACED_LOCATION,
        ...(workspace_name ? { workspace_name } : {})
      });
      if (chip.foreign !== true) {
        chip.openable = true;
      } else if (typeof owner_root === 'string' && owner_root.length > 0) {
        chip.openable = true;
        chip.root_dir = owner_root;
      }
      chips.push(chip);
    }
    if (chips.length > 0) {
      chips_by_bead.set(bead_id, chips);
    }
  }
  return chips_by_bead;
}
