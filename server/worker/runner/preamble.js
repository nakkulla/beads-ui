/**
 * beads-ui-owned unattended preamble (spec §5.4, restructured by UI-rxp3).
 *
 * Everything a session is told that is CONSTANT for the session — the
 * unattended contract, the fast_track directive, the PR-submit + PR-base
 * notices, and the guard contract — is composed here into ONE system prompt,
 * which `claude.js` delivers through `--append-system-prompt`. The task prompt
 * carries the work and nothing else. Prompt trust is NOT the enforcement
 * mechanism — the runner adapter fails closed on any question/approval event
 * and `command-guard.js` judges commands independently. The preamble makes the
 * contract explicit so a well-behaved session self-reports instead of hanging,
 * and — since UI-rxp3 — so a session that hits a prohibition has a stated legal
 * alternative instead of inventing a bypass.
 */

/**
 * The canonical unattended-mode preamble.
 *
 * Framed as an ENVIRONMENT FACT rather than a prohibition (UI-rxp3): "no
 * question tools" reads as a rule to be weighed, while "there is nobody on the
 * other end" is a property of the room the session is standing in.
 *
 * What is NOT here since codex-orchestration-parity §3.2 is how a session waits
 * for delegated work: that paragraph names TOOLS, and the tools differ by
 * runtime. It lives in {@link CLAUDE_LIFETIME_DIRECTIVE} and
 * {@link CODEX_LIFETIME_DIRECTIVE}, and exactly one of them is composed in.
 *
 * The closing paragraph is the Fable 5.1 guide's unattended completion rules
 * (harness-reduction spec D1), translated verbatim. A narration-suppression
 * sentence is deliberately NOT among them: that same guide names it as the
 * first cause of the progress-update regression it is trying to remove.
 *
 * @type {string}
 */
export const UNATTENDED_PREAMBLE = [
  '## 무인 모드',
  '',
  '이 세션은 사람 없이 실행된다. 다음은 규칙이 아니라 환경 사실이다.',
  '',
  '- 사용자는 이 세션과 통신할 수 없다. 질문 도구는 응답자가 없어 영원히 대기한다.',
  '- hard-stop 조건은 `blocker` 줄을 출력한 뒤 비정상 종료로 표면화하라. 그것이 이 환경에서 사람에게 도달하는 유일한 경로다.',
  '- 현재 사용자가 없으므로 사용자만 쓰는 Bead metadata 키 — `impl_dispatch`, `impl_entry`, `plan_approval`, `workflow_mode_source=user` — 는 이 세션이 쓸 수 없다. Worker는 시도 시작 시 이 키들을 스냅샷하고, 시도 중 값이 바뀌면(부재→기록 포함) 머지 게이트가 영수증 위조로 fail-closed한다. 위임 기본 모델이 이 세션의 모델과 같다는 사실은 main 실행 근거가 아니다 — 실행 형태는 dotfiles workflow 계약의 selector가 정한다.',
  '',
  '이 세션은 자율 실행이다. 원 요청에서 따라오는 되돌릴 수 있는 행동은 묻지 않고 진행한다. 파괴적 행동이나 사용자만 결정할 범위 변경에서만 멈춘다. 턴을 끝내기 전 마지막 문단이 계획·질문·다음 단계·약속이면 지금 툴콜로 한다. 진행 보고는 이 세션의 tool result에 결속된 것만 적고 검증되지 않은 것은 그렇게 말한다. 다음 턴에 필요한 독립 호출은 한 응답에 모두 낸다.'
].join('\n');

/**
 * How a CLAUDE session holds its process while delegated work runs
 * (codex-orchestration-parity §3.2, reduced to one sentence by
 * harness-reduction spec D1).
 *
 * The long form named the 2 h ceiling, the dotfiles skill that owns the rule
 * and the fire-and-forget prohibition. Only ONE of those changes what a session
 * types: which tool holds the process. The rest is either enforced elsewhere
 * (the ceiling is an env var this adapter sets) or a restatement of the
 * completion contract, so it is gone.
 *
 * @type {string}
 */
export const CLAUDE_LIFETIME_DIRECTIVE = [
  '## 프로세스 수명과 위임 대기',
  '',
  '위임 대기는 새 `Agent` 호출만 프로세스를 붙든다; `SendMessage`·백그라운드 셸·`Monitor`는 붙들지 못하고 턴이 끝나면 프로세스가 죽는다.'
].join('\n');

/**
 * How a CODEX session holds its process while delegated work runs
 * (codex-orchestration-parity §3.2). It states codex's OWN tools —
 * `spawn_agent` and the native wait tool — and deliberately names none of
 * claude's: the `Agent`/`SendMessage` rules, the 2 h ceiling and the
 * background-shell process-death semantics are properties of the claude
 * transport (dotfiles ADR 0052), not of a native codex child.
 *
 * @type {string}
 */
export const CODEX_LIFETIME_DIRECTIVE = [
  '## 프로세스 수명과 위임 대기',
  '',
  '- 하위 에이전트 위임은 native `spawn_agent`로 만들고, 기다리기는 native 대기 도구(`wait_agent`)로 한다.',
  '- 위임한 자식의 종료와 결과를 확인한 뒤에 controller가 검증하고 종료한다.',
  '- 위임을 던져 놓고 결과를 확인하지 않은 채 구현 완료를 보고할 수 없다.'
].join('\n');

/**
 * The fix-now directive (dotfiles fix-now-over-scope-fence §8.1): an approved
 * spec's `scope:` and 경계/비목표 sections bound the DESIGN, not what the
 * session is allowed to repair, so an adjacent item of the same defect class
 * gets fixed here instead of split into a follow-up Bead.
 *
 * Kept out of `UNATTENDED_PREAMBLE` because that block is framed as
 * environment fact (UI-rxp3) while this one states a contract rule.
 *
 * @type {string}
 */
export const FIX_NOW_DIRECTIVE = [
  '## fix-now',
  '',
  '승인 스펙의 front-matter `scope:`와 `경계`/`비목표` 절은 설계 범위이지 fix-now 흡수의 금지 목록이 아니다. scope 안 변경과 같은 결함·드리프트 클래스의 닫힌 인접 항목은 dotfiles workflow 계약 Follow-ups (a)의 세 조건으로 이 세션에서 같이 고치고, 완료 보고서 `세션 중 흡수한 발견 항목`에 앵커와 함께 적어라. 후속 Bead로 넘기는 것은 gate가 거부한 항목뿐이다.'
].join('\n');

/**
 * The fast_track directive injected when the dispatch runs in fast_track mode.
 * Mirrors the `workflow_mode=fast_track` bead metadata the Worker records +
 * reads back before launch (spec §5.2) so the mode is double-delivered
 * (metadata + prompt).
 *
 * @type {string}
 */
export const FAST_TRACK_DIRECTIVE = [
  '## fast_track',
  '',
  '게이트는 기본값으로 자동 디스패치하고 영수증만 남긴다. 질문 없이 기본값으로 진행하라.'
].join('\n');

/**
 * The five result-line forms a Worker session's last line may take.
 *
 * CANONICAL SOURCE is dotfiles `finishing.md`; this is a copy (harness-reduction
 * spec D1), inlined because the line is the ONE thing the failure classifier
 * reads and a session that invents its own shape is classified by accident. The
 * copy is declared as a copy in the block itself, which is what makes dotfiles
 * treat this file as an update target when the grammar moves.
 *
 * @type {string}
 */
const RESULT_LINE_GRAMMAR = [
  '마지막 줄은 결과 줄 하나다.',
  '',
  '```',
  '성공 · <PR #N|push <sha7>|refuted: …|no-delta: …|bench:<run_id>>',
  '파킹 · <awaiting_user 값>',
  '실패 · <원인>',
  '환경 · <오류 문장 원문>',
  '대기 · blocks:<ID>[, …]',
  '```',
  '',
  '이 문법의 정본은 dotfiles `finishing.md`이고 위는 사본이다.'
].join('\n');

/**
 * Format the facts a Worker attempt already resolved (harness-reduction spec
 * D1). PURE FORMATTING: every value arrives decided in `facts`, which
 * `server/worker/attempt-facts.js` collects at dispatch.
 *
 * FAIL-QUIET BY OMISSION. A fact the Worker could not observe leaves its field
 * null and produces NO line, because a session cannot tell an absent fact from
 * a wrong one, and would act on either. That is also why nothing here has a
 * fallback value: `dotfiles_root` guessed from a path depth would be wrong for
 * the deployed skill layout, and one wrong root costs more than one absent
 * line.
 *
 * @param {import('../attempt-facts.js').AttemptFacts} facts
 * @returns {string}
 */
export function attemptFactsDirective(facts) {
  /** @type {string[]} */
  const lines = [
    '## 시도 사실',
    '',
    'Worker가 이 attempt를 준비하며 이미 확인한 값이다. 다시 탐색하지 말고 그대로 쓰라. 빠진 줄은 Worker가 확인하지 못한 것이니 필요하면 세션이 직접 확인한다.',
    ''
  ];
  const identity = [
    `attempt=${facts.attempt_id}`,
    `bead=${facts.bead_id}`,
    ...(facts.route ? [`route=${facts.route}`] : []),
    'workflow_mode=fast_track'
  ].join(' ');
  lines.push(`- ${identity} (source=attempt 기록)`);
  if (facts.base) {
    lines.push(`- base=${facts.base} (source=dispatch 시 base 재해소)`);
  }
  if (facts.worktree) {
    lines.push(`- worktree=${facts.worktree} (source=attempt 기록)`);
  }
  if (facts.dotfiles_root) {
    lines.push(
      `- dotfiles_root=${facts.dotfiles_root} (source=설치된 workflow 스킬의 git 루트)`
    );
  }
  if (facts.workflow_python) {
    lines.push(
      `- workflow_python=${facts.workflow_python} (source=경로 존재 확인)`
    );
  }
  if (facts.node_modules) {
    lines.push(
      `- node_modules=${facts.node_modules} (source=dispatch 시 npm ci)`
    );
  }
  if (facts.remote_tip) {
    lines.push(
      `- origin/${facts.remote_tip.branch} tip=${facts.remote_tip.sha} (source=git ls-remote)`
    );
  }
  const selector_inputs = (facts.selector_inputs || [])
    .map(
      (entry) =>
        `${entry.key}=${entry.value ?? '없음'} (source=${entry.source ?? '없음'})`
    )
    .join(', ');
  if (selector_inputs.length > 0) {
    lines.push(`- 선택 입력: ${selector_inputs}`);
  }
  if (facts.reviewer_preset) {
    const digest = facts.reviewer_preset.digest
      ? `, digest=${facts.reviewer_preset.digest}`
      : '';
    lines.push(
      `- 리뷰어 프리셋: ${facts.reviewer_preset.token} → ${facts.reviewer_preset.model}/${facts.reviewer_preset.effort} (source=핀 사본 review.reviewers${digest})`
    );
  }
  lines.push('', '이미 되어 있음:', '');
  if (facts.bead_status) {
    lines.push(
      `- status=${facts.bead_status}(선점: ${facts.claimed_by_worker ? 'Worker' : '없음'})`
    );
  }
  lines.push(
    '- route marker: Worker attempt는 마커 없이 진행한다 — route-nudge 리마인더가 보이면 무시한다(dotfiles-3zsj D1 설치 뒤에는 나오지 않는다).',
    '- session_ref 불필요'
  );
  if (facts.node_modules) {
    lines.push(`- npm ci=${facts.node_modules}`);
  }
  if ((facts.scripts || []).length > 0) {
    lines.push('', '스크립트 호출:', '');
    for (const call of facts.scripts) {
      lines.push(`- \`${call.command}\`${call.note ? ` — ${call.note}` : ''}`);
    }
  }
  if (facts.pitfalls) {
    lines.push('', '### Worker pitfalls (대상 저장소 AGENTS.md)', '');
    lines.push(facts.pitfalls);
  }
  return lines.join('\n');
}

/**
 * The terminal directive, injected into every session that opens a PR
 * (worker-phase2 §1): the session delivers a PR and records `resolved`, but
 * never merges — the queue owns the merge. It closes with
 * {@link RESULT_LINE_GRAMMAR}.
 *
 * @type {string}
 */
export const PR_SUBMIT_DIRECTIVE = [
  '## 종점',
  '',
  '저장소가 요구하는 검증과 리뷰를 마친 뒤 PR을 생성하고 bead `resolved`와 `pr_url`을 기록한 후 종료하라. 세션에서 머지하지 마라. 머지는 큐가 소유한다.',
  '',
  RESULT_LINE_GRAMMAR
].join('\n');

/**
 * The terminal directive for a Worker-dispatched quick_fix lane. It opens no
 * PR and hands deployment, close, and cleanup back to the Worker after the
 * reviewed base push is recorded as `resolved`.
 *
 * @type {string}
 */
export const QUICKFIX_LANE_DIRECTIVE = [
  '## 종점',
  '',
  '이 세션은 Worker가 dispatch한 quick_fix 레인이다. PR을 열지 않는다.',
  '',
  '- 종점은 구현 → 계약에 따른 implementation review 게이트 1회 → base ref 직접 push → push containment 확인 → completion report → bead `resolved` 기록 후 종료다.',
  '- 리뷰 선택은 정본 계약을 따른다. `skipped@`는 진행 권한이며 실제 리뷰 증거가 아니다. `impl_review` 영수증은 실제로 push한 head SHA에 결속되어야 한다. push 후 head가 바뀌었으면 계약의 follow-up 규칙대로 영수증을 새 SHA로 갱신하라.',
  '- 배포 실행·배포 증거·bead `closed`·worktree/브랜치 정리는 Worker가 소유한다. 수행하지 마라. worktree와 브랜치를 보존한 채 `resolved`에서 멈춰라.',
  '- 이 레인의 canonical 문구는 dotfiles `docs/contracts/workflow-contract.md`가 소유한다. 여기서 복제하지 말고 그 계약을 따르라.',
  '',
  RESULT_LINE_GRAMMAR
].join('\n');

/**
 * The guard contract, restructured into three SEVERITY tiers (UI-rxp3) and
 * halved by harness-reduction spec D1.
 *
 * Every prohibition still carries its legal alternative in the SAME item — a
 * session that needed hermetic git config once invented `GIT_CONFIG_COUNT=…`
 * and was killed for it (External/beads, 2026-08-05). What is GONE is the
 * enumeration: the exact spellings of a one-shot relocation, the ten
 * subcommands exempted from it, the wrong/right command pair, and the
 * hook-path-read allowance. That enumeration was a second copy of
 * `command-guard.js`'s judgment table, and a copy of a table is what a session
 * reads as the boundary of the rule. The refusal message names the exception at
 * the moment it matters, which no preamble sentence can do.
 *
 * The tiers exist because the three effects are genuinely different and a
 * session cannot tell them apart from the inside: `gh pr merge` and hook
 * disabling end the session from argv alone, a base push is merely refused by
 * the per-attempt pre-push hook, and a base merge is allowed outright. A
 * session told "your base push kills you" cannot distinguish that from "your
 * base push is refused", and only the second is true.
 *
 * The disposition variant matches ENFORCEMENT rather than restating it: a
 * REVISE-disposition session publishes the resolved base as its job, so
 * `command-guard.js` skips the hook-bypass and base-push judgments for it
 * (`disposition` in `runMergeGuard`). Telling such a session that a base push
 * is refused would be false.
 *
 * @param {{ disposition?: boolean, quickfix_lane?: boolean }} [options]
 * @returns {string}
 */
export function guardContractDirective(options = {}) {
  const disposition = options.disposition === true;
  // The two shapes are mutually exclusive in dispatch. Keep disposition first
  // defensively because its hook-bypass exemption is intentionally broader.
  const quickfix_lane = !disposition && options.quickfix_lane === true;
  const lines = [
    '## 가드 계약',
    '',
    '이 세션 위에는 세션이 안에서 볼 수 없는 가드 층이 있다. 심각도는 셋으로 갈린다.',
    '',
    '### 즉시 종료 — 세션이 kill된다',
    '',
    '- `gh pr merge` — argv만으로 판정되어 즉시 종료된다.',
    disposition
      ? '  - 대안: 이 세션의 종점은 스펙 수정 커밋과 영수증 기록이다. 머지는 물론 PR도 이 세션의 일이 아니다.'
      : quickfix_lane
        ? '  - 대안: 이 세션의 종점은 리뷰드 base push와 bead `resolved` 기록이다. 머지 클릭도 PR도 이 세션의 일이 아니다.'
        : '  - 대안: 이 세션의 종점은 PR 제출과 bead `resolved` 기록이다. 머지는 큐가 소유한다.'
  ];
  if (disposition) {
    lines.push(
      '',
      '위 한 항목이 이 세션에 걸리는 즉시 종료 조건의 전부다. hook 무력화 판정은 이 세션에 적용되지 않는다 — 아래 「허용됨」을 보라.'
    );
  } else {
    lines.push(
      '- hook 무력화 **쓰기** — `git push --no-verify`, `git config core.hooksPath <값>` / `git config set|unset core.hooksPath` / `git config --unset core.hooksPath`.',
      '  - 대안: git 설정을 격리해야 하면 `GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null`을 쓴다. 이 두 변수는 판정 대상이 아니고 hook 경로를 건드리지 않는다.',
      '- 정확한 판정과 허용 예외는 거부 시 훅 메시지가 안내한다.',
      '- Claude 세션은 PreToolUse 훅이 먼저 거부하고 계속되지만 훅을 지나 실행되면 종료이고, Codex 런타임은 훅이 없어 명령이 보이는 즉시 종료다.'
    );
  }
  lines.push('', '### 거부만 됨 — 세션은 계속된다', '');
  if (disposition) {
    lines.push(
      '- 이 세션에 걸리는 거부 판정은 없다. base push 판정이 이 세션에는 적용되지 않기 때문이다(아래 「허용됨」).'
    );
  } else if (quickfix_lane) {
    lines.push(
      '- 이 세션에 걸리는 거부 판정은 없다. 리뷰드 base push가 이 레인의 임무이기 때문이다(아래 「허용됨」).'
    );
  } else {
    lines.push(
      '- base 브랜치 직접 랜딩 금지 — 이 attempt 가 맡은 저장소의 base 로 향하는 `git push` 는 attempt 전용 pre-push hook 이 거부한다. 세션은 종료되지 않고 push 만 실패한다. 다른 저장소의 base 로 향하는 push 는 hook 의 판정 대상이 아니다(통과).',
      '  - 대안: feature branch 로 push 하고 `gh pr create --base <target_base>` 로 PR 을 연다.',
      '- 사후 판정 — 이 attempt 가 자기 base 로 push 한 기록이 있고 그 커밋이 원격 base 에서 도달 가능하면 attempt 가 `base_landing_detected` 로 실패 처리된다.'
    );
  }
  lines.push('', '### 허용됨 — 오해하지 말 것', '');
  if (disposition) {
    lines.push(
      '- 이 세션은 REVISE 처분 세션이다. resolved base 에 스펙 수정을 게시하는 것이 임무이므로 base 로의 `git push` 와 hook 무력화 판정이 **적용되지 않는다**. 그렇다고 hook 을 무력화할 이유는 없다 — 설치된 hook 자체가 없다.'
    );
  } else if (quickfix_lane) {
    lines.push(
      '- 이 세션은 Worker-dispatched reviewed quick_fix 레인이다. base 로의 `git push`가 임무이며 attempt 전용 pre-push hook도 설치되지 않는다. hook 무력화 판정은 그대로 적용된다.'
    );
  }
  lines.push(
    '- base 를 브랜치로 들이는 `git merge`(예: `git merge origin/main`) — 허용된다. 세션은 종료되지 않고, 발생 사실만 attempt 레코드에 기록된다.'
  );
  return lines.join('\n');
}

/**
 * The PR base directive (worker-base-scope-alignment §4).
 *
 * beads-ui has no `gh pr create` — the PR is opened by the SESSION — and the
 * merge follows whatever `baseRefName` GitHub reports. A session that omits
 * `--base` therefore opens against the GitHub DEFAULT branch, and the merge
 * click lands the whole branch there; in a repo whose base is not `main` that
 * means every commit of the branch goes to `main`.
 *
 * Prompt trust is not the enforcement mechanism here either — §5's pre-merge
 * comparison is. This directive exists so the session can get it right in the
 * first place instead of being stopped at the gate.
 *
 * @param {string} target_base
 * @returns {string}
 */
export function prBaseDirective(target_base) {
  return [
    '## PR base',
    '',
    `이 저장소의 target_base 는 \`${target_base}\` 다. PR 은 반드시 \`gh pr create --base ${target_base}\` 로 열어라. \`--base\` 를 빼면 GitHub 기본 브랜치로 열리고, 머지 클릭이 그대로 그 브랜치에 랜딩한다. 머지 직전 게이트가 PR 의 baseRefName 을 이 값과 대조해 불일치면 fail-closed 로 멈춘다(자동 재타겟 없음).`
  ].join('\n');
}

/**
 * The read-only review contract (UI-58w8 §3). A review-mode session replaces
 * the writable Worker contract entirely: no PR-submit directive, no guard
 * exemptions — reading and one structured verdict are the whole task.
 */
export const REVIEW_PREAMBLE = [
  '## read-only review 세션',
  '',
  '- 이 세션은 implementation review 전용이다. 파일 수정·commit·push·PR 생성·머지·Beads 쓰기를 모두 금지한다.',
  '- 허용되는 것은 읽기(git fetch/diff/log, 파일 읽기)와 요구된 구조화 verdict 판정뿐이다.',
  '- 결론은 지시된 구조화 verdict 라인으로만 반환하라.'
].join('\n');

/**
 * The default task prompt for a first dispatch: the bead id plus the instruction
 * to run it through the contract-native flow. It lives here rather than only in
 * the adapter because the scheduler builds ON it when a dispatch carries extra
 * observed facts (the stale-receipt block, UI-dlim §3.2) — one source keeps the
 * two from drifting apart.
 *
 * @param {string} bead_id
 * @returns {string}
 */
export function defaultTaskPrompt(bead_id) {
  return `Bead ${bead_id} 작업을 계약 네이티브 흐름으로 완료하라.`;
}

/**
 * Split the session's prompt into the two CHANNELS it is delivered through
 * (UI-rxp3): the session-constant contract, which rides
 * `--append-system-prompt`, and the task, which stays the positional user
 * prompt. Returning both rather than one concatenated string is what lets the
 * adapter place each on its own channel — and what lets the spawn path record
 * exactly what was sent without reassembling it.
 *
 * `pr_submit: false` drops the PR-submit directive. `disposition: true`
 * independently selects the REVISE-disposition guard contract, whose base-push
 * and hook-bypass exemption is much broader than merely opening no PR. Cleanup
 * diagnosis is another no-PR shape: it keeps the ordinary guard contract and
 * must never inherit the disposition exemption. `quickfix_lane: true` is the
 * third no-PR shape: it receives its own terminal directive and only the
 * base-push exemption, never disposition's hook-bypass exemption.
 *
 * `target_base` rides ALONGSIDE the PR-submit directive (§4): the session that
 * must open a PR is exactly the session that must know which base to open it
 * against, so a shape that opens none is told no base either.
 *
 * `runtime` selects the process-lifetime paragraph (§3.2): the two runtimes
 * wait for delegated children through different tools, so each is told only its
 * own. An absent value keeps claude's, which is what every pre-existing caller
 * meant.
 *
 * `attempt_facts` is the dispatch-time facts card (harness-reduction spec D1).
 * It is OPTIONAL: a caller with no facts to hand over — every relaunch path
 * that carries no dispatch snapshot, and every test — emits no `## 시도 사실`
 * block at all rather than an empty one full of `없음`.
 *
 * BLOCK ORDER (spec D1): 무인 모드 → 시도 사실 → fast_track → 종점 → PR base →
 * 가드 계약 → fix-now → 프로세스 수명. The facts sit second because everything
 * after them is a rule about how to act on them, and the lifetime paragraph is
 * last because it is the one thing that matters only at the very end of a turn.
 *
 * @param {string} base_prompt - The task prompt for the session.
 * @param {{ runtime?: 'claude'|'codex', fast_track?: boolean, pr_submit?: boolean, disposition?: boolean, quickfix_lane?: boolean, review?: boolean, target_base?: string|null, attempt_facts?: import('../attempt-facts.js').AttemptFacts|null }} [options]
 * @returns {{ system_prompt: string, task_prompt: string }}
 */
export function applyPreamble(base_prompt, options = {}) {
  const lifetime =
    options.runtime === 'codex'
      ? CODEX_LIFETIME_DIRECTIVE
      : CLAUDE_LIFETIME_DIRECTIVE;
  if (options.review === true) {
    // Review mode is not a variation of the writable contract — it IS its own
    // contract (UI-58w8 §3), so none of the writable directives apply. The
    // lifetime paragraph is not a writable directive: a review session
    // delegates too, and it must be told its OWN runtime's wait tools.
    return {
      system_prompt: [UNATTENDED_PREAMBLE, lifetime, REVIEW_PREAMBLE].join(
        '\n\n'
      ),
      task_prompt: String(base_prompt ?? '')
    };
  }
  const pr_submit = options.pr_submit !== false;
  const disposition = options.disposition === true;
  const quickfix_lane = !disposition && options.quickfix_lane === true;
  const parts = [UNATTENDED_PREAMBLE];
  if (options.attempt_facts) {
    parts.push(attemptFactsDirective(options.attempt_facts));
  }
  if (options.fast_track) {
    parts.push(FAST_TRACK_DIRECTIVE);
  }
  if (quickfix_lane) {
    parts.push(QUICKFIX_LANE_DIRECTIVE);
  } else if (pr_submit) {
    parts.push(PR_SUBMIT_DIRECTIVE);
    const target_base =
      typeof options.target_base === 'string' ? options.target_base.trim() : '';
    if (target_base.length > 0) {
      parts.push(prBaseDirective(target_base));
    }
  }
  parts.push(guardContractDirective({ disposition, quickfix_lane }));
  parts.push(FIX_NOW_DIRECTIVE);
  parts.push(lifetime);
  return {
    system_prompt: parts.join('\n\n'),
    task_prompt: String(base_prompt ?? '')
  };
}
