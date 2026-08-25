/**
 * 의존성 패널의 후보 규칙 (UI-j92s §6.1).
 *
 * 실행가능 카드 위에 카드를 떨어뜨려 의존을 만드는 경로는 없어졌다 (사용자 결정
 * 2026-08-25 §3.4). 대신 방향을 먼저 고르고 후보를 고르는데, 두 방향은 대칭이
 * 아니다: **선행**은 이미 진행 중인 이슈여도 정상이지만, **후속**으로 진행 중인
 * 이슈를 고르면 이미 출발한 일에 새 선행을 붙이는 모순이 된다.
 *
 * 순수 함수만 내보낸다 — 후보 목록은 스냅샷 하나에서 나오는 파생값이고, 검색은
 * 그 목록 위의 필터일 뿐이다.
 */
import { isBlockedBy } from './drop-plan.js';

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

/**
 * `← 앞에 (선행 추가)` / `→ 뒤에 (후속 추가)` (§6.1).
 *
 * @typedef {'predecessor'|'successor'} DepDirection
 */

/** 사이클을 닫는 후보의 비활성 사유 (§6.1). */
const REASON_CYCLE = '사이클';

/**
 * 진행 중이라 후속으로 삼을 수 없는 레인 (§6.1).
 *
 * @type {ReadonlyArray<DepCandidateIssue['lane']>}
 */
const IN_FLIGHT_LANES = ['running', 'pr_wait'];

/**
 * The candidates for ONE direction of ONE row's dependency panel (§6.1).
 *
 * 정렬은 같은 레포 먼저, 그 다음 ID 오름차순이다: 레포 간 의존은 예외이고 대개는
 * 자기 레포 안에서 고르기 때문이다.
 *
 * @param {string} this_id - 패널을 연 행의 bead.
 * @param {DepDirection} direction
 * @param {DepCandidateModel} model
 * @returns {DepCandidate[]}
 */
export function depCandidates(this_id, direction, model) {
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
    if (direction === 'successor' && IN_FLIGHT_LANES.includes(issue.lane)) {
      continue;
    }
    const linked =
      direction === 'predecessor'
        ? blockers_of_this.includes(issue.bead_id)
        : (model.blocked_by_map.get(issue.bead_id) || []).includes(this_id);
    if (linked) {
      continue;
    }
    // 선행 추가는 `this ← cand`, 후속 추가는 `cand ← this`다. 각각의 반대
    // 방향이 이미 (전이적으로) 성립하면 그 간선은 사이클을 닫는다.
    const cycle =
      direction === 'predecessor'
        ? isBlockedBy(model.blocked_by_map, issue.bead_id, this_id)
        : isBlockedBy(model.blocked_by_map, this_id, issue.bead_id);
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
