/**
 * 의존성 패널의 후보 규칙 (UI-j92s §6.1).
 *
 * 실행가능 카드 위에 카드를 떨어뜨려 의존을 만드는 경로는 없어졌다 (사용자 결정
 * 2026-08-25 §3.4). 패널이 묻는 것은 한 방향뿐이다 — "이 이슈를 무엇이 막는가".
 * 반대 방향은 상대 이슈의 카드에서 같은 문장으로 걸린다: 한 사실을 두 어휘로
 * 말하지 않아야 어느 카드에서 무엇을 만지는지가 흔들리지 않는다.
 *
 * 순수 함수만 내보낸다 — 후보 목록은 스냅샷 하나에서 나오는 파생값이고, 검색은
 * 그 목록 위의 필터일 뿐이다.
 */
import { isBlockedBy } from './drop-plan.js';
import { buildLanes } from './lanes.js';

/**
 * 후보 모집단 한 항목. `lane`은 모니터의 배타 레인 어휘 그대로다 — 같은 사실에
 * 새 이름을 만들지 않는다.
 *
 * @typedef {Object} DepCandidateIssue
 * @property {string} bead_id
 * @property {string} root_dir
 * @property {string} workspace_name - 후보 목록이 그리는 레포 배지 (§6.1)이자
 * 같은 레포 우선 정렬의 기준이다.
 * @property {string} title
 * @property {'runnable'|'queue'|'running'|'pr_wait'|'done'} lane
 */

/**
 * @typedef {Object} DepCandidateModel
 * @property {DepCandidateIssue[]} issues - 보이는 모든 레포의 실행가능·대기
 * (병렬·직렬)·실행중·PR 대기·완료 이슈. 완료는 이 함수가 걸러 내므로 호출자가
 * 미리 뺄 필요는 없다.
 * @property {Map<string, string[]>} blocked_by_map - 열린 blocker만 실린 맵
 * (`app/protocol.md`). 이미 연결된 후보를 빼는 판정과 사이클 판정의 유일한
 * 원천이다.
 */

/**
 * 후보 하나. `disabled`인 항목도 **목록에서 빼지 않는다** — 왜 고를 수 없는지가
 * 사용자가 알아야 하는 사실이다.
 *
 * @typedef {DepCandidateIssue & { disabled: boolean, reason?: string }} DepCandidate
 */

/** 사이클을 닫는 후보의 비활성 사유 (§6.1). */
const REASON_CYCLE = '사이클';

/**
 * The live blocks graph of the aggregated snapshot (UI-lx45 §3.1). 두 원천을
 * 같은 순서로 합친다: 레포별 `bead_blocked_by`가 먼저고, 자기 blocker를 스스로
 * 들고 오는 실행가능·세션 행이 그 위를 덮는다 (UI-yrzu §5).
 *
 * 이 맵은 후보 필터가 아니라 사이클 판정의 원천이므로 `root_dir`로 좁히지
 * 않는다 — 타 레포를 거쳐 닫히는 사이클도 사이클이다.
 *
 * @param {Array<Record<string, any>>|null|undefined} workspaces
 * @returns {Map<string, string[]>}
 */
function blockedByMapOf(workspaces) {
  /** @type {Map<string, string[]>} */
  const graph = new Map();
  /**
   * @param {unknown} value
   * @returns {string[]}
   */
  const idsOf = (value) =>
    Array.isArray(value)
      ? value.filter(
          (/** @type {unknown} */ id) => typeof id === 'string' && id.length > 0
        )
      : [];
  for (const workspace of Array.isArray(workspaces) ? workspaces : []) {
    if (!workspace || typeof workspace !== 'object') {
      continue;
    }
    const declared =
      workspace.bead_blocked_by && typeof workspace.bead_blocked_by === 'object'
        ? workspace.bead_blocked_by
        : {};
    for (const [bead_id, blockers] of Object.entries(declared)) {
      if (Array.isArray(blockers)) {
        graph.set(bead_id, idsOf(blockers));
      }
    }
    for (const entry of [
      ...(Array.isArray(workspace.runnable) ? workspace.runnable : []),
      ...(Array.isArray(workspace.session_active)
        ? workspace.session_active
        : [])
    ]) {
      if (
        entry &&
        typeof entry.bead_id === 'string' &&
        Array.isArray(entry.blocked_by) &&
        entry.blocked_by.length > 0
      ) {
        graph.set(entry.bead_id, idsOf(entry.blocked_by));
      }
    }
  }
  return graph;
}

/**
 * The candidate population every tab reads (UI-lx45 §3.1). 한 스냅샷에서 나오는
 * 순수 파생값이다 — 상세 패널은 이 함수만 부르고 모니터 뷰의 내부 상태를
 * 건드리지 않는다.
 *
 * 레인 순서는 `running → pr_wait → queue → runnable_all`이고 같은 ID가 여러
 * 레인에 나타나면 처음 것만 남는다. 필터 이전 목록이다: `차단됨`·`스펙`·`의존
 * 있음` 토글은 보기를 좁힐 뿐 의존을 걸 수 있는 이슈를 줄이지 않는다.
 *
 * @param {Array<Record<string, any>>|null|undefined} workspaces
 * @param {Array<Record<string, any>>|null|undefined} workspaces_state
 * @param {{ root_dir?: string }} [options] - `root_dir`은 `issues`만 좁힌다.
 * @returns {DepCandidateModel}
 */
export function depCandidateModel(workspaces, workspaces_state, options) {
  const lanes = buildLanes(workspaces, workspaces_state);
  /** @type {DepCandidateIssue[]} */
  const issues = [];
  /** @type {Set<string>} */
  const seen = new Set();
  /**
   * @param {Array<Record<string, any>>} items
   * @param {DepCandidateIssue['lane']} lane
   */
  const push = (items, lane) => {
    for (const item of items) {
      if (seen.has(item.id)) {
        continue;
      }
      seen.add(item.id);
      issues.push({
        bead_id: item.id,
        root_dir: item.root_dir,
        workspace_name: item.workspace_name,
        title: item.title,
        lane
      });
    }
  };
  push(lanes.running, 'running');
  push(lanes.pr_wait, 'pr_wait');
  push(lanes.queue, 'queue');
  push(lanes.runnable_all, 'runnable');

  const root_dir =
    options && typeof options.root_dir === 'string' && options.root_dir.length
      ? options.root_dir
      : null;
  return {
    issues:
      root_dir === null
        ? issues
        : issues.filter((issue) => issue.root_dir === root_dir),
    blocked_by_map: blockedByMapOf(workspaces)
  };
}

/**
 * The candidates that could block ONE row (§6.1) — 이 행의 새 blocker 후보다.
 *
 * 정렬은 같은 레포 먼저, 그 다음 ID 오름차순이다: 레포 간 의존은 예외이고 대개는
 * 자기 레포 안에서 고르기 때문이다.
 *
 * @param {string} this_id - 패널을 연 행의 bead.
 * @param {DepCandidateModel} model
 * @returns {DepCandidate[]}
 */
export function depCandidates(this_id, model) {
  /** @type {Map<string, DepCandidateIssue>} */
  const by_id = new Map();
  for (const issue of model.issues) {
    if (
      !issue ||
      typeof issue.bead_id !== 'string' ||
      issue.bead_id.length === 0
    ) {
      continue;
    }
    if (!by_id.has(issue.bead_id)) {
      by_id.set(issue.bead_id, issue);
    }
  }
  const own_root_dir = by_id.get(this_id)?.root_dir;
  const blockers_of_this = model.blocked_by_map.get(this_id) || [];

  /** @type {DepCandidate[]} */
  const candidates = [];
  for (const issue of by_id.values()) {
    if (issue.bead_id === this_id || issue.lane === 'done') {
      continue;
    }
    if (blockers_of_this.includes(issue.bead_id)) {
      continue;
    }
    // 새 간선은 `this ← cand`다. 반대 방향이 이미 (전이적으로) 성립하면 그
    // 간선은 사이클을 닫는다.
    const cycle = isBlockedBy(model.blocked_by_map, issue.bead_id, this_id);
    candidates.push({
      ...issue,
      disabled: cycle,
      ...(cycle ? { reason: REASON_CYCLE } : {})
    });
  }

  candidates.sort((a, b) => {
    const a_own = own_root_dir !== undefined && a.root_dir === own_root_dir;
    const b_own = own_root_dir !== undefined && b.root_dir === own_root_dir;
    if (a_own !== b_own) {
      return a_own ? -1 : 1;
    }
    return a.bead_id.localeCompare(b.bead_id);
  });
  return candidates;
}

/**
 * The 패널 검색창 (§6.1 3번): ID·제목 부분 일치, 대소문자 무시. 후보 규칙 위의
 * 필터일 뿐이므로 순서도 비활성 여부도 바꾸지 않는다.
 *
 * @param {DepCandidate[]} candidates
 * @param {string} query
 * @returns {DepCandidate[]}
 */
export function filterDepCandidates(candidates, query) {
  const needle = query.trim().toLowerCase();
  if (needle.length === 0) {
    return candidates.slice();
  }
  return candidates.filter(
    (candidate) =>
      candidate.bead_id.toLowerCase().includes(needle) ||
      candidate.title.toLowerCase().includes(needle)
  );
}
