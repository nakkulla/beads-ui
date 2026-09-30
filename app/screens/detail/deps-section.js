/**
 * The issue detail's 의존 section (UI-lx45 §4): 선행 (`dependencies` 중
 * `blocks`)·후행 (`dependents` 중 `blocks`)·나머지 chips with their glyph
 * grammar (UI-8x90 §3), the wait badges of a blocking edge, the 선행 대기 참고
 * 줄 (UI-cmx3 §7), and the one editable direction — what blocks THIS issue —
 * through `dep-add`/`dep-remove` (unlink asks first). Another repo's chip
 * navigates with its `root_dir` so the shell switches the workspace first.
 * Moved out of the detail panel closure (UI-dbn6 Phase 2) unchanged; the wait
 * badge is the pipeline card's own (`waitLines`).
 *
 * @import { DetailContext } from './index.js'
 * @import { DepCandidate, DepCandidateModel } from '../../model/dep-candidates.js'
 */
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { formatElapsed } from '../../model/attempt-facts.js';
import {
  depCandidates as depCandidatesOf,
  filterDepCandidates,
  isBeadIdLike
} from '../../model/dep-candidates.js';
import {
  coerceTimestampMs,
  formatTimestampLocal
} from '../../model/relative-time.js';
import {
  isImplementationAttempt,
  latestImplementationAttempts
} from '../../utils/active-attempts.js';
import { showToast } from '../../utils/toast.js';
import { waitLines } from '../pipeline/wait.js';

/**
 * @param {DetailContext} ctx
 */
export function createDepsSection(ctx) {
  // 의존성 절의 인라인 편집 상태 (UI-lx45 §4.2). 목록은 포커스가 들어왔거나
  // 검색어가 남아 있을 때만 펴진다.
  let dep_query = '';
  let dep_list_open = false;

  /**
   * Normalize a bd dependency edge to a target id.
   *
   * @param {any} edge
   * @returns {string}
   */
  function edgeId(edge) {
    if (typeof edge === 'string') {
      return edge;
    }
    if (edge && typeof edge === 'object') {
      return String(
        edge.id || edge.to || edge.issue_id || edge.depends_on || ''
      );
    }
    return '';
  }

  /**
   * The bd edge type of one dependency entry.
   *
   * @param {any} edge
   * @returns {string}
   */
  function edgeType(edge) {
    return edge && typeof edge === 'object'
      ? String(edge.dependency_type || edge.type || '')
      : '';
  }

  /**
   * The 글리프 and 관계명 of a `나머지` chip (UI-8x90 §3). 라벨은 글리프+ID뿐이고
   * 관계명은 툴팁 첫 줄로 간다 — 같은 관계가 카드와 상세에서 같은 기호로 읽히는
   * 것이 그 표의 목적이다. 모르는 종류는 기호를 지어내지 않고 그 type 문자열을
   * 그대로 라벨에 쓰므로, 그 문자열이 곧 이 간선의 관계명이다.
   *
   * @param {string} type
   * @returns {{ glyph: string, relation: string }}
   */
  function otherEdgeGrammar(type) {
    switch (type) {
      case 'discovered-from':
        return { glyph: '↩ ', relation: '발견' };
      case 'parent-child':
        return { glyph: '⌸ ', relation: '상위' };
      case 'related':
        return { glyph: '↔ ', relation: '관련' };
      default:
        return type.length > 0
          ? { glyph: `${type} `, relation: type }
          : { glyph: '', relation: '' };
    }
  }

  /**
   * One dependency chip's tooltip (UI-8x90 §3): 관계명 첫 줄, 그 다음에 아는
   * 만큼의 `status · title`. 라벨에서 뺀 방향어가 여기로 왔으므로, 관계명이
   * 없는 간선(type을 못 읽은 문자열 간선)만 예전처럼 나머지 한 줄이다.
   *
   * @param {string} relation
   * @param {any} edge
   * @returns {string|undefined}
   */
  function depTitle(relation, edge) {
    const rest = edgeTitle(edge);
    /** @type {string[]} */
    const lines = [];
    if (relation.length > 0) {
      lines.push(relation);
    }
    if (rest) {
      lines.push(rest);
    }
    return lines.length > 0 ? lines.join('\n') : undefined;
  }

  /**
   * `status · title` for a chip's tooltip. 둘 다 있을 때만 말한다 — 반쪽짜리
   * 사실을 툴팁으로 주장하지 않는다.
   *
   * @param {any} edge
   * @returns {string|undefined}
   */
  function edgeTitle(edge) {
    if (!edge || typeof edge !== 'object') {
      return undefined;
    }
    const status = typeof edge.status === 'string' ? edge.status : '';
    const title = typeof edge.title === 'string' ? edge.title : '';
    return status.length > 0 && title.length > 0
      ? `${status} · ${title}`
      : undefined;
  }

  /** @returns {string} */
  function depWorkspacePath() {
    return ctx.workspace().trim();
  }

  /** @returns {DepCandidateModel|null} */
  function candidateModel() {
    return ctx.options.depCandidates ? ctx.options.depCandidates() : null;
  }

  /**
   * One dependency op (UI-lx45 §3.3). `a`는 언제나 이 이슈다 — 상세 패널이
   * 편집하는 방향은 "이 이슈를 무엇이 막는가" 하나뿐이고, `root_dir`은 그
   * 피차단 이슈의 레포이므로 활성 워크스페이스와 같다.
   *
   * @param {'dep-add'|'dep-remove'} type
   * @param {string} b
   * @param {string} fail_message
   * @returns {Promise<void>}
   */
  async function sendDepOp(type, b, fail_message) {
    const this_id = ctx.id();
    const root_dir = depWorkspacePath();
    const a = this_id;
    if (!a) {
      return;
    }
    if (root_dir.length === 0) {
      showToast('레포를 알 수 없어 의존을 바꿀 수 없습니다', 'error');
      return;
    }
    const result = await ctx.sendMutation(
      type,
      { a, b, view_id: a, root_dir },
      fail_message
    );
    // 저장된 간선마다 정확히 한 번 (§3.3): 확인 읽기만 실패한 경우도 쓰기는
    // 반영됐으므로 자동 교정이 이 사실을 놓치면 안 된다.
    const saved =
      result === true || (result !== false && result.saved === true);
    if (saved && ctx.options.onDepChanged) {
      ctx.options.onDepChanged({ type, a, b });
    }
    if (type === 'dep-add' && saved) {
      dep_query = '';
      dep_list_open = false;
    }
    ctx.render();
  }

  /**
   * @param {string} blocker_id
   */
  function unlinkDep(blocker_id) {
    const this_id = ctx.id();
    if (!this_id) {
      return;
    }
    const ask = globalThis.confirm;
    if (
      typeof ask === 'function' &&
      !ask(`${blocker_id}가 ${this_id}를 막는 연결을 끊을까요?`)
    ) {
      return;
    }
    void sendDepOp('dep-remove', blocker_id, '의존 해제 실패');
  }

  /**
   * @param {DepCandidate} candidate
   */
  function addDep(candidate) {
    if (candidate.disabled) {
      return;
    }
    addDepId(candidate.bead_id);
  }

  /**
   * @param {string} bead_id
   */
  function addDepId(bead_id) {
    void sendDepOp('dep-add', bead_id, '의존 추가 실패');
  }

  /**
   * The 직접 추가 행의 ID (UI-k9e9), 없으면 `null`. 후보 그래프는 보이는
   * 워크스페이스의 레인 이슈뿐이라 다른 rig의 ID는 애초에 들어올 수 없다.
   * 그러니 형태만 보고 제출 경로를 열고, 존재·사이클 판정은 bd에 맡긴다.
   *
   * @param {DepCandidate[]} shown - `filterDepCandidates`가 남긴 후보. 정확히
   * 일치하는 항목이 있으면 그 행이 이미 같은 제출을 하므로 그리지 않는다.
   * @param {string[]} blocker_ids - 이미 이 이슈를 막는 `blocks` 선행 ID.
   * @returns {string|null}
   */
  function directDepId(shown, blocker_ids) {
    const this_id = ctx.id();
    const typed = dep_query.trim();
    if (!isBeadIdLike(typed) || typed === this_id) {
      return null;
    }
    if (blocker_ids.includes(typed)) {
      return null;
    }
    return shown.some((candidate) => candidate.bead_id === typed)
      ? null
      : typed;
  }

  /**
   * @param {Event} ev
   */
  function onDepInput(ev) {
    dep_query = /** @type {HTMLInputElement} */ (ev.target).value;
    dep_list_open = true;
    ctx.render();
  }

  function onDepFocus() {
    if (!dep_list_open) {
      dep_list_open = true;
      ctx.render();
    }
  }

  /**
   * @param {KeyboardEvent} ev
   * @param {DepCandidate[]} shown
   * @param {string|null} direct_id
   */
  function onDepKeydown(ev, shown, direct_id) {
    if (ev.key === 'Escape') {
      // 패널 자체의 Escape(닫기)보다 먼저 잡는다 — 라벨 입력과 같은 문법이다.
      ev.stopPropagation();
      dep_query = '';
      dep_list_open = false;
      ctx.render();
      return;
    }
    if (ev.key === 'Enter') {
      ev.preventDefault();
      // 후보 하나가 남았을 때의 자동완성 문법이 먼저다 — 부분 입력으로 좁힌
      // 후보를 Enter로 넣던 경로가 직접 추가 때문에 바뀌면 안 된다.
      if (shown.length === 1 && !shown[0].disabled) {
        addDep(shown[0]);
      } else if (direct_id !== null) {
        addDepId(direct_id);
      }
    }
  }

  /**
   * @param {DepCandidate[]} shown
   * @param {string|null} direct_id
   */
  function depAddTemplate(shown, direct_id) {
    return html`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${dep_query}
        @focus=${onDepFocus}
        @input=${onDepInput}
        @keydown=${(/** @type {KeyboardEvent} */ ev) =>
          onDepKeydown(ev, shown, direct_id)}
      />
      ${dep_list_open || dep_query.length > 0
        ? html`<div class="detail-dep-add__list">
            ${shown.length === 0 && direct_id === null
              ? html`<div class="detail-dep-add__empty">후보 없음</div>`
              : shown.map(
                  (candidate) =>
                    html`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${candidate.bead_id}
                      ?disabled=${candidate.disabled}
                      title=${ifDefined(candidate.reason)}
                      @click=${() => addDep(candidate)}
                    >
                      <span class="detail-dep-add__repo"
                        >${candidate.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${candidate.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${candidate.title}</span
                      >
                    </button>`
                )}
            ${direct_id === null
              ? ''
              : html`<button
                  type="button"
                  class="detail-dep-add__cand"
                  data-dep-cand=${direct_id}
                  data-dep-direct="1"
                  @click=${() => addDepId(direct_id)}
                >
                  <span class="detail-dep-add__id">${direct_id}</span>
                  <span class="detail-dep-add__title">직접 추가</span>
                </button>`}
          </div>`
        : ''}
    </div>`;
  }

  /**
   * One chip of the 의존성 절.
   *
   * @param {{ id: string, label: string, kind: 'pred'|'succ'|'other', title: string|undefined }} chip
   * @param {Map<string, string>} root_by_id
   */
  function depChipTemplate(chip, root_by_id) {
    const onNavigate = ctx.options.onNavigate;
    const root_dir = root_by_id.get(chip.id);
    const body = onNavigate
      ? html`<button
          type="button"
          class="detail-dep__link"
          title=${ifDefined(chip.title)}
          @click=${() =>
            root_dir === undefined
              ? onNavigate(chip.id)
              : onNavigate(chip.id, root_dir)}
        >
          ${chip.label}
        </button>`
      : html`<span class="detail-dep__link" title=${ifDefined(chip.title)}
          >${chip.label}</span
        >`;
    return html`<span
      class=${`detail-dep detail-dep--${chip.kind}${
        onNavigate ? ' detail-dep--link' : ''
      }`}
      >${body}${chip.kind === 'pred'
        ? html`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${chip.id}
            aria-label=${'의존 해제: ' + chip.id}
            @click=${() => unlinkDep(chip.id)}
          >
            ✕
          </button>`
        : ''}</span
    >`;
  }

  /**
   * Material for the 선행 대기 참고 줄 (UI-cmx3 §7). 조건이 거짓이면 `null`이고 줄 자체가
   * 그려지지 않는다. 재료는 `queueStore` 스냅샷(`attempts`·`admission`·
   * `bead_blocked_by`)과 이슈 구독의 `dependencies` 간선뿐이라 새 조회가 없다.
   *
   * @param {any} data
   * @returns {{ t0: number|null, t1: number|null, elapsed_ms: number|null }|null}
   */
  function prerequisiteWaitRef(data) {
    const this_id = ctx.id();
    if (!this_id) {
      return null;
    }
    const q = ctx.queue();
    const attempts =
      q && q.attempts && typeof q.attempts === 'object' ? q.attempts : {};
    // 이미 재개된 일시정지는 현재 실행이 아니라 이력이다: 재개 attempt가
    // `resumed_from`으로 가리키는 부모는 `paused`로 보존되므로 (`active-attempts.js`와
    // 같은 규칙) 여기서 제외하지 않으면 옛 일시정지 하나가 참고 줄을 영구히 지운다.
    const resumed_from_ids = new Set(
      Object.values(attempts)
        .map((entry) => /** @type {any} */ (entry)?.resumed_from)
        .filter((attempt_id) => typeof attempt_id === 'string')
    );
    for (const entry of Object.values(attempts)) {
      const attempt = /** @type {any} */ (entry);
      if (
        attempt &&
        attempt.bead_id === this_id &&
        isImplementationAttempt(attempt) &&
        (attempt.status === 'running' ||
          (attempt.status === 'paused' &&
            !resumed_from_ids.has(attempt.attempt_id)))
      ) {
        return null;
      }
    }
    const latest = latestImplementationAttempts(attempts).get(this_id);
    const waiting =
      latest &&
      latest.status === 'waiting' &&
      latest.cause === 'prerequisite_unmet'
        ? latest
        : null;
    const admission_record =
      q && q.admission && typeof q.admission === 'object'
        ? q.admission[this_id]
        : null;
    const admission =
      admission_record && admission_record.reason === 'prerequisite_unmet'
        ? admission_record
        : null;
    if (!waiting && !admission) {
      return null;
    }
    const t0 = coerceTimestampMs(
      waiting ? waiting.finished_at : admission ? admission.at : null
    );
    /** @type {string[]} */
    const frozen = [];
    const raw_blockers = waiting
      ? waiting.cause_detail && Array.isArray(waiting.cause_detail.blockers)
        ? waiting.cause_detail.blockers
        : []
      : admission && Array.isArray(admission.blockers)
        ? admission.blockers
        : [];
    for (const blocker of raw_blockers) {
      const id = blocker && typeof blocker === 'object' ? blocker.id : blocker;
      if (typeof id === 'string' && id.length > 0) {
        frozen.push(id);
      }
    }
    // 해제 판정의 재료는 큐 스냅샷의 `bead_blocked_by`다. 키가 없으면 (재시작
    // 직후 등) 아무것도 해제됐다고 주장하지 않는다 (fail-quiet, §10).
    const blocked_map =
      q && q.bead_blocked_by && typeof q.bead_blocked_by === 'object'
        ? q.bead_blocked_by
        : null;
    /** @type {number|null} */
    let t1 = null;
    if (blocked_map && Object.hasOwn(blocked_map, this_id)) {
      const open = Array.isArray(blocked_map[this_id])
        ? blocked_map[this_id]
        : [];
      const deps = Array.isArray(data.dependencies) ? data.dependencies : [];
      for (const edge of deps) {
        const id = edgeId(edge);
        if (
          edgeType(edge) !== 'blocks' ||
          !frozen.includes(id) ||
          open.includes(id)
        ) {
          continue;
        }
        const closed_at = coerceTimestampMs(
          edge && typeof edge === 'object' ? edge.closed_at : null
        );
        if (closed_at !== null && (t1 === null || closed_at > t1)) {
          t1 = closed_at;
        }
      }
    }
    const since = t1 ?? t0;
    const elapsed_ms = since === null ? null : Math.max(0, Date.now() - since);
    if (t0 === null && t1 === null) {
      return null;
    }
    return { t0, t1, elapsed_ms };
  }

  /**
   * One reference line under the dependency chips — 재료가 없는 조각은 빼고
   * (fail-quiet), 판정 글리프·색·임계·툴팁·클릭은 없다 (UI-cmx3 §7).
   *
   * @param {any} data
   */
  function prerequisiteRefTemplate(data) {
    const ref = prerequisiteWaitRef(data);
    if (!ref) {
      return '';
    }
    /** @type {string[]} */
    const parts = [];
    if (ref.t0 !== null) {
      parts.push(`선행 대기 시작 ${formatTimestampLocal(ref.t0)}`);
    }
    if (ref.t1 !== null) {
      parts.push(`해제 ${formatTimestampLocal(ref.t1)}`);
    }
    if (ref.elapsed_ms !== null) {
      parts.push(
        ref.t1 !== null
          ? `해제 후 ${formatElapsed(ref.elapsed_ms)}`
          : `${formatElapsed(ref.elapsed_ms)} 경과`
      );
    }
    if (parts.length === 0) {
      return '';
    }
    return html`<div class="detail-dep__ref">${parts.join(' · ')}</div>`;
  }

  /**
   * The 의존성 절 (UI-lx45 §4). 선행(`dependencies` 중 `blocks`)·후행
   * (`dependents` 중 `blocks`)·나머지(`dependencies` 중 그 외)를 한 절에 두고,
   * 종류는 글리프(UI-8x90 §3)와 색 티어로 구분한다. 편집은 선행 한 방향뿐이다.
   *
   * @param {any} data
   */
  function depsTemplate(data) {
    const this_id = ctx.id();
    const wait_reasons = ctx
      .waitReasons()
      .filter((reason) => reason.subject.bead_id === this_id);
    const deps = Array.isArray(data.dependencies) ? data.dependencies : [];
    const dependents = Array.isArray(data.dependents) ? data.dependents : [];
    /** @type {Array<{ id: string, label: string, kind: 'pred'|'succ'|'other', title: string|undefined }>} */
    const chips = [];
    for (const edge of deps) {
      const id = edgeId(edge);
      if (id.length > 0 && edgeType(edge) === 'blocks') {
        chips.push({
          id,
          label: `⛓ ${id}`,
          kind: 'pred',
          title: depTitle('막는', edge)
        });
      }
    }
    // 역방향 관계 중 `blocks`만 싣는다 (§4.1): 나머지는 같은 간선이
    // `dependencies` 쪽에도 있어 중복되고, 역방향 말머리가 정의돼 있지 않다.
    for (const edge of dependents) {
      const id = edgeId(edge);
      if (id.length > 0 && edgeType(edge) === 'blocks') {
        chips.push({
          id,
          label: `→ ${id}`,
          kind: 'succ',
          title: depTitle('막히는', edge)
        });
      }
    }
    for (const edge of deps) {
      const id = edgeId(edge);
      const type = edgeType(edge);
      if (id.length > 0 && type !== 'blocks') {
        const grammar = otherEdgeGrammar(type);
        chips.push({
          id,
          label: `${grammar.glyph}${id}`,
          kind: 'other',
          title: depTitle(grammar.relation, edge)
        });
      }
    }

    const model = candidateModel();
    /** @type {Map<string, string>} */
    const root_by_id = new Map();
    if (model) {
      // 칩 이동은 다른 레포 이슈의 레포도 안다 — 좁힌 후보 모집단이 아니라 좁히기
      // 전 목록에서 찾는다 (UI-dbn6 §3.2).
      for (const issue of model.all_issues || model.issues) {
        if (!root_by_id.has(issue.bead_id)) {
          root_by_id.set(issue.bead_id, issue.root_dir);
        }
      }
    }
    const shown =
      model && this_id
        ? filterDepCandidates(depCandidatesOf(this_id, model), dep_query)
        : [];
    const direct_id = directDepId(
      shown,
      chips.filter((chip) => chip.kind === 'pred').map((chip) => chip.id)
    );
    return html`
      <div class="detail-section-label">의존성</div>
      ${chips.length === 0
        ? html`<div class="detail-empty">의존성 없음</div>`
        : html`<div class="detail-deps">
            ${chips.map(
              (chip) =>
                html`${depChipTemplate(chip, root_by_id)}${chip.kind === 'pred'
                  ? wait_reasons
                      .filter((reason) =>
                        reason.targets.some((target) => target.id === chip.id)
                      )
                      .map(
                        (reason) =>
                          html`<span class="detail-dep__wait"
                            >${waitLines(reason, { now: Date.now() })
                              .badge}${reason.headline
                              ? html`<span>${reason.headline}</span>`
                              : ''}</span
                          >`
                      )
                  : ''}`
            )}
          </div>`}
      ${prerequisiteRefTemplate(data)}
      ${model === null
        ? html`<div class="detail-empty">후보를 불러올 수 없음</div>`
        : depAddTemplate(shown, direct_id)}
    `;
  }

  return {
    reset() {
      dep_query = '';
      dep_list_open = false;
    },
    template: depsTemplate
  };
}
