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
 * other end" is a property of the room the session is standing in. The
 * background-task warning moved here from the guard contract for the same
 * reason — a headless process dying at turn end is a fact about unattended
 * execution, not a guard verdict.
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
  '- headless 프로세스는 턴이 끝나는 즉시 종료된다. 대기 중인 백그라운드 태스크(예: 비동기 리뷰 브리지)는 함께 kill되고 결과는 유실된다. 결과가 필요한 태스크는 턴 안에서 완료까지 기다려라.',
  '- 현재 사용자가 없으므로 사용자만 쓰는 Bead metadata 키 — `impl_dispatch`, `impl_entry`, `plan_approval`, `workflow_mode_source=user` — 는 이 세션이 쓸 수 없다. Worker는 시도 시작 시 이 키들을 스냅샷하고, 시도 중 값이 바뀌면(부재→기록 포함) 머지 게이트가 영수증 위조로 fail-closed한다. 위임 기본 모델이 이 세션의 모델과 같다는 사실은 main 실행 근거가 아니다 — 실행 형태는 dotfiles workflow 계약의 selector가 정한다.'
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
 * The terminal directive, injected into every session that opens a PR
 * (worker-phase2 §1): the session delivers a PR and records `resolved`, but
 * never merges — the merge is a human click.
 *
 * @type {string}
 */
export const PR_SUBMIT_DIRECTIVE = [
  '## 종점',
  '',
  'PR 제출까지 수행하고 절대 머지하지 말 것. PR 생성·CI 확인·bead `resolved`(pr_url metadata 포함) 기록까지 마친 뒤 종료하라. 머지는 사람의 클릭이다.'
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
  '- 종점은 구현 → 세션 내 implementation review 1회(필수) → base ref 직접 push → push containment 확인 → completion report → bead `resolved` 기록 후 종료다.',
  '- 리뷰 게이트를 `skip`으로 선택하지 마라. `skipped@` 영수증은 Worker landing에서 fail-closed다. `impl_review` 영수증은 실제로 push한 head SHA에 결속되어야 한다. push 후 head가 바뀌었으면 계약의 follow-up 규칙대로 영수증을 새 SHA로 갱신하라.',
  '- 배포 실행·배포 증거·bead `closed`·worktree/브랜치 정리는 Worker가 소유한다. 수행하지 마라. worktree와 브랜치를 보존한 채 `resolved`에서 멈춰라.',
  '- 이 레인의 canonical 문구는 dotfiles `docs/contracts/workflow.md`가 소유한다. 여기서 복제하지 말고 그 계약을 따르라.'
].join('\n');

/**
 * The guard contract, restructured into three SEVERITY tiers (UI-rxp3).
 *
 * The old flat directive named the same prohibitions but offered no legal
 * alternative, so a session that needed hermetic git config invented
 * `GIT_CONFIG_COUNT=…` and was killed for it (External/beads, 2026-08-05). Every
 * prohibition here therefore carries its alternative in the SAME item, and the
 * one that caused the incident carries a wrong/right command pair.
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
        : '  - 대안: 이 세션의 종점은 PR 제출과 bead `resolved` 기록이다. 머지는 사람의 클릭이다.'
  ];
  if (disposition) {
    lines.push(
      '',
      '위 한 항목이 이 세션에 걸리는 즉시 종료 조건의 전부다. hook 무력화 판정은 이 세션에 적용되지 않는다 — 아래 「허용됨」을 보라.'
    );
  } else {
    lines.push(
      '- hook 무력화 **쓰기** — `git push --no-verify`, `git config core.hooksPath <값>` / `git config set|unset core.hooksPath` / `git config --unset core.hooksPath`.',
      '- **1회성 재배치**(`git -c core.hooksPath=…`, `GIT_CONFIG_COUNT`/`GIT_CONFIG_KEY_*`/`GIT_CONFIG_VALUE_*` 접두) 중 뒤따르는 명령이 아래 「허용됨」의 열거 밖인 것 — 명령 없는 할당, git 이 아닌 명령(`go test` 등), 열거 밖 서브커맨드(`push`·`commit`·`diff`·`log`·`show`·`submodule` 등)가 모두 여기 든다.',
      '  - 대안: git 설정을 격리해야 하면 `GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null`을 쓴다. 이 두 변수는 판정 대상이 아니고 hook 경로를 건드리지 않는다.',
      '  - 오답: `GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=core.hooksPath GIT_CONFIG_VALUE_0="" go test ./...`',
      '  - 정답: `GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null go test ./...`'
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
    '- base 를 브랜치로 들이는 `git merge`(예: `git merge origin/main`) — 허용된다. 세션은 종료되지 않고, 발생 사실만 attempt 레코드에 기록된다.',
    '- hook 경로를 **읽는 것**(`git config --get core.hooksPath`, `git config get core.hooksPath`, `git config core.hooksPath`) — 위반이 아니다.',
    '- git 명령 하나에만 붙는 **1회성** 재배치 — 뒤따르는 서브커맨드가 `status`·`rev-parse`·`ls-files`·`ls-tree`·`cat-file`(`--filters`/`--textconv` 제외)·`describe`·`shortlog`·`merge-base`·`for-each-ref`·`config` 열 가지 안에 있고, 재배치가 `core.hooksPath` 하나만 지정하며, 접두에 다른 환경변수 할당이 없으면 위반이 아니다. **다만 붙일 이유도 없다** — 이 명령들은 pre-push 를 타지 않는다.'
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
 * @param {string} base_prompt - The task prompt for the session.
 * @param {{ fast_track?: boolean, pr_submit?: boolean, disposition?: boolean, quickfix_lane?: boolean, review?: boolean, target_base?: string|null }} [options]
 * @returns {{ system_prompt: string, task_prompt: string }}
 */
export function applyPreamble(base_prompt, options = {}) {
  if (options.review === true) {
    // Review mode is not a variation of the writable contract — it IS its own
    // contract (UI-58w8 §3), so none of the writable directives apply.
    return {
      system_prompt: [UNATTENDED_PREAMBLE, REVIEW_PREAMBLE].join('\n\n'),
      task_prompt: String(base_prompt ?? '')
    };
  }
  const pr_submit = options.pr_submit !== false;
  const disposition = options.disposition === true;
  const quickfix_lane = !disposition && options.quickfix_lane === true;
  const parts = [UNATTENDED_PREAMBLE];
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
  return {
    system_prompt: parts.join('\n\n'),
    task_prompt: String(base_prompt ?? '')
  };
}
