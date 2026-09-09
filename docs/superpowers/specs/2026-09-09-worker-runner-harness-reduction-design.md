---
scope:
  - server/worker/runner/preamble.js
  - server/worker/runner/preamble.test.js
  - server/worker/runner/__snapshots__/
  - server/worker/runner/claude.js
  - server/worker/runner/claude.test.js
  - server/worker/runner/session.js
  - server/worker/runner/session.env.test.js
  - server/worker/scheduler.js
  - server/worker/scheduler.test.js
  - server/worker/worktree.js
  - server/worker/worktree.integration.test.js
  - server/worker/failure-class.js
  - server/worker/failure-class.test.js
  - server/worker/policy.js
  - server/worker/execution-defaults.js
  - AGENTS.md
  - app/main.bundle.js
  - app/main.bundle.js.map
---

# Worker 러너 하네스 축소 — 프리앰블 재작성, dispatch 시점 준비, 용량 오류 분류, AGENTS.md 축약

- Bead: `UI-cvwo` (`route=spec_backed`, 사용자 요청 2026-09-09). 형제: `dotfiles-3zsj`(훅·스크립트·계약·스킬·전역 지침), `UI-47y7`(번들 커밋 제거), `dotfiles-60u8`(ADR 파일명).
- 상태: 사용자 승인 전 초안.
- 근거: Worker 세션 73건 정밀 분석(대시보드 `~/tmp/mockups/2026-09-09-worker-harness-audit.html`). 세션이 매번 재발견하는 상수(dotfiles 루트·venv python·스크립트 argv·해소된 selector/리뷰어 값) 62/73, impl-gate "status ≠ in_progress" claim 차단 왕복 15세션(UI-ushh 9턴 오진 포함), 워크트리 node_modules 부재로 `npm ls`→`npm ci` 왕복 31/73, 문체 스킬 `caveman` 오적재 12세션, read-guard 40KB 거부 뒤 sed 15회·heredoc 치환 편집 파손(UI-hhn9·UI-dqg9), Astra 용량 오류 1건에 구현·테스트·ADR·push가 끝난 세션이 `환경` 실패로 사망(UI-hhju-1, $7·15분 → 재개 attempt $2). Codex(Astra) 세션 `01a083d6`의 독립 감사도 같은 결론(가드 삭제 0건, 오판 수리·완화).

## 목표와 비목표

목표: Worker가 이미 아는 사실을 세션에 넘기고 Worker가 할 수 있는 준비(claim·의존성 설치)는 dispatch 시점에 하며, 프리앰블은 Fable 5.1 공식 가이드의 무인 자율 완주 문장으로 재구성한다. 일시적 provider 용량 오류는 실패가 아니라 `env` 재시도로 분류한다. 프로젝트 지침 AGENTS.md는 Worker 세션이 실제로 필요한 것만 남긴다.

비목표: 가드 계약의 세 심각도(kill·거부·허용)와 disposition/quickfix_lane 변형, `gh pr merge` kill, pre-push base 거부, 질문 도구 fail-closed kill, 머지 큐 소유(ADR 0006), impl_review ancestry(ADR 0031), provider outage 보류·재개(ADR 0046)는 바꾸지 않는다. dotfiles 계약 파일을 런타임에 읽지 않는다(ADR 0012) — 프리앰블 사실은 beads-ui 핀 사본과 Worker 자신의 해소값에서만 온다. Fable orchestration effort는 워크스페이스 설정(사용자 관리)이라 대상이 아니다. 라이브 Codex run의 세션 경계 인계는 09-03 dotfiles 대기 규칙 이후 재현 0건이라 다루지 않는다.

## 전제 (유지하는 결정)

beads-ui ADR 0012(계약은 코드 field registry로 소비), 0006(머지는 큐), 0007(머지 금지는 git 수준 예방), 0031(ancestry), 0032(실행 프리셋은 레인 무관 프로파일), 0046(재개는 기록된 provider 보존), 0027(이력 SoT는 events.jsonl), 0048(체계적 정지 해제는 사람 승인 1회). dotfiles ADR 0052(위임 대기는 fresh Agent), 0067(완료 보고서 marker 불변), 0074(리뷰 영수증 결속).

## 접근 비교

1. 프리앰블 문구만 손본다 — 상수 재발견과 claim 왕복은 Worker가 사실을 넘기지 않으면 사라지지 않는다. 기각.
2. Worker가 dotfiles `impl-selector.py`를 dispatch 시 실행해 결과를 넘긴다 — ADR 0012 위반(런타임 계약 읽기)이고 selector binding은 세션 id가 필요해 dispatch 시점에 만들 수 없다. 기각.
3. Worker가 자기 소유 사실(핀 사본·policy.js 해소값·attempt 기록·워크트리 상태)만 프리앰블에 넣고, claim·설치·스킬 봉인은 dispatch 경로에서 한다(채택).

## 결정

### D1. 프리앰블 재구성 (`runner/preamble.js`, `applyPreamble`)

블록 순서: `## 무인 모드` → `## 시도 사실` → 종점(`PR_SUBMIT`/`QUICKFIX_LANE`/review) → `## PR base` → `## 가드 계약` → `## fix-now` → 프로세스 수명. 각 블록의 변경:

- `## 무인 모드`: 현행 3줄 뒤에 Fable 5.1 가이드 "Finish the whole task"·Fable 5 "audit each claim"의 번역 5문장을 붙인다 — "이 세션은 자율 실행이다. 원 요청에서 따라오는 되돌릴 수 있는 행동은 묻지 않고 진행한다. 파괴적 행동이나 사용자만 결정할 범위 변경에서만 멈춘다. 턴을 끝내기 전 마지막 문단이 계획·질문·다음 단계·약속이면 지금 툴콜로 한다. 진행 보고는 이 세션의 tool result에 결속된 것만 적고 검증되지 않은 것은 그렇게 말한다. 다음 턴에 필요한 독립 호출은 한 응답에 모두 낸다." 결정: 나레이션 억제 문장은 넣지 않는다 — Fable 5.1 가이드가 progress update 회귀의 첫 원인으로 지목한다.
- `## 시도 사실`(신설, `attemptFactsDirective(facts)`): 줄마다 값과 `source`를 적는다. `attempt=<BDUI_ATTEMPT_ID> bead=<id> route=<route> workflow_mode=fast_track`; `base=<remote>/<branch>@<sha>`; `worktree=<abs>`; `dotfiles_root=<abs>`(`readlink -f ~/.claude/skills/workflow`의 상위 3단계, 실패 시 줄 생략); `workflow_python=<dotfiles_root>/.venv/bin/python`(존재할 때만); `node_modules=<ok|failed:<사유>|skipped>`(D3 결과); `origin/<branch> tip=<sha>`(재개·충돌 attempt에서 원격 브랜치가 있을 때); `실행 선택: dispatch=<d> impl_runtime=<r> impl_model=<m> impl_effort=<e|default> impl_speed=<s> (source=<bead|workspace_kv|preset>)`와 `리뷰어: <token> → <model>/<effort> via <transport> (source=…)` — 값은 `policy.js resolveExecSettings`가 이미 해소한 것과 `generated/contracts/execution-defaults.json`의 `review.reviewers`·`runtime_transports` 표에서만 오고, 표의 digest(`execution-defaults.js` provenance)를 한 줄 적는다; 이어서 "이 값은 dispatch 시 해소된 사실이다. 사용자 지시 키(`impl_runtime|impl_model|impl_effort|impl_speed|*_review_model`)가 Bead에 새로 있을 때만 selector를 다시 판정한다. `harness.yaml`·`bd kv`를 찾아 읽지 마라."; `이미 되어 있음: status=in_progress(Worker), route marker 불필요(nudge 침묵), session_ref 불필요, npm ci=<결과>`; 스크립트 호출 줄 4개(`stale-rereview-inputs.py <id> --json`, `impl-selector.py --controller-runtime claude --route <route> --bead <id> --repo <worktree> --json`, `check-completion-report.py <path>`, `land-quick-fix.py …`는 quick_fix 레인만) — dotfiles가 `--template`/`--verdict`를 갖게 되면(dotfiles-3zsj) Worker는 설치본 스크립트의 `--help` 출력에 그 옵션이 있을 때만 해당 줄을 붙인다(fail-quiet); 마지막에 대상 리포 `AGENTS.md`의 `## Worker pitfalls` 절 본문을 그대로 붙인다(절이 없으면 생략). 이 블록은 ADR 0012를 지킨다: dotfiles 파일을 읽지 않고 beads-ui 핀 사본·설치본 스크립트의 존재 여부·Worker 상태만 쓴다.
- `## 가드 계약`(`guardContractDirective`): 세 심각도 제목과 disposition·quickfix_lane 분기, `gh pr merge` 항목, hook 무력화 항목의 첫 문장, `GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null` 대안 한 줄, base push 거부·PR 대안, `git merge origin/<base>` 허용은 유지한다. 삭제: 1회성 재배치 형태 열거(`git -c`/`--config-env`/`GIT_CONFIG_COUNT|KEY_n|VALUE_n|PARAMETERS` 나열), 오답/정답 쌍, 허용 서브커맨드 10개 열거, hook 경로 읽기 허용 항목. 대신 "정확한 판정과 허용 예외는 거부 시 훅 메시지가 안내한다"와 "Claude 세션은 PreToolUse 훅이 먼저 거부하고 계속되지만 훅을 지나 실행되면 종료이고, Codex 런타임은 훅이 없어 명령이 보이는 즉시 종료다"를 남긴다. 목표 크기는 현행 ~350토큰의 절반.
- 종점 블록(`PR_SUBMIT_DIRECTIVE`·`QUICKFIX_LANE_DIRECTIVE`) 끝에 결과 줄 문법을 코드 블록으로 인라인한다: `성공 · <PR #N|push <sha7>|refuted: …|no-delta: …|bench:<run_id>>` / `파킹 · <awaiting_user 값>` / `실패 · <원인>` / `환경 · <오류 문장 원문>` / `대기 · blocks:<ID>[, …]`. 이 문법의 정본은 dotfiles `finishing.md`이며 여기는 사본임을 한 줄로 밝힌다(문법이 바뀌면 dotfiles가 이 사본을 갱신 대상으로 본다 — `workflow-contract.md` Completion report 절이 "Worker preamble carries the rule"이라 이미 그렇다).
- `CLAUDE_LIFETIME_DIRECTIVE`는 한 문장으로: "위임 대기는 새 `Agent` 호출만 프로세스를 붙든다; `SendMessage`·백그라운드 셸·`Monitor`는 붙들지 못하고 턴이 끝나면 프로세스가 죽는다."
- `preamble.test.js` 스냅샷을 갱신하고, 시도 사실 블록은 값이 없는 줄을 생략하는 fail-quiet 케이스(dotfiles_root 부재·node_modules skipped·재개 아님)를 각각 고정한다.

### D2. dispatch 시 `in_progress` 선점 (`scheduler.js`)

`dispatch`(구현 attempt 시작) 경로에서만, durable `prerecordAttempt`가 성공한 뒤, 직전 readStatus가 정확히 `open`일 때 `bd update <id> --status in_progress --json`을 1회 쓴다(session_ref는 쓰지 않는다 — 계약 `workflow-contract.md:162`가 Worker runner의 session_ref 기록을 금지). `open`이 아니면 쓰지 않는다(fail-quiet). `dispatchExternalConflict`·`relaunchResolvedAttempt`처럼 `resolved` Bead를 다루는 공유 `installGuardHook` 지점에는 넣지 않는다 — `resolved`를 되돌리면 `lifecycle.transitions.delivery`를 깬다. 그 뒤 모든 실패 exit가 기존 `releaseBeadClaim`에 닿는 경로여야 하며, Worker 시작 시와 tick마다 attempt 기록이 없는 `in_progress` Bead(Worker가 쓴 흔적이 있는 것)를 `open`으로 되돌리는 재조정을 더한다. 세션은 이미 claim된 상태로 시작하므로 impl-gate의 `status ≠ in_progress` 차단이 첫 턴부터 사라진다; readiness 술어(route·spec_review·impl_entry·의존성)는 상태와 무관하게 그대로 판정한다.

### D3. 워크트리 의존성 설치 (`worktree.js`, `scheduler.js`)

워크트리 생성 직후 그 워크트리에 `package-lock.json`이 있으면 `npm ci --prefer-offline --no-audit --no-fund`를 실행한다(타임아웃 300초). 결과(`ok|failed:<tail>|skipped`)를 attempt 기록 `worktree_setup`에 저장하고 D1의 `node_modules=` 줄에 싣는다. 실패는 dispatch를 막지 않는다(세션이 지금처럼 복구). `repo-ops/config.toml`에 새 키를 두지 않는다 — `allowed_top_level_keys`는 `[base, verify, deploy]`로 고정(dotfiles `workflow-state.yaml`). 다른 언어 생태계의 설치 훅은 이번 범위 밖 관찰이다.

### D4. Worker 세션 settings·env (`runner/claude.js`, `runner/session.js`)

- argv에 `--settings '{"skillOverrides":{"caveman":"user-invocable-only","humanizer":"user-invocable-only","deck":"user-invocable-only","storyboard":"user-invocable-only","design":"user-invocable-only"}}'`를 더한다(dotfiles `src/claude/settings/base.json`이 `bd-revert`에 쓰는 것과 같은 레버). 플러그인 스킬 `frontend-design:frontend-design`은 skillOverrides가 닿지 않으므로 이번에는 봉인하지 않고 관찰로 남긴다(`permissions.deny`가 `bypassPermissions`에서 유효한지 미측정).
- adapter env에 `CLAUDE_READ_GUARD_MAX_BYTES: '65536'`을 더한다(Worker 세션만; 대화형 기본 40,000B는 그대로). 위임 서브에이전트도 같은 env를 상속한다.
- `session.env.test.js`·`claude.test.js`에 두 값을 고정한다.

### D5. 용량 오류의 `env` 분류 (`failure-class.js`)

`ENV_ERROR_PATTERNS`에 `{group: 'provider_capacity', re: /at capacity|overloaded|API Error: 529|unexpected status 5\d\d/i}`를 더한다. `세션 실패 — 환경 · codex turn failed: Selected model is at capacity` 요약은 `env` tier가 되어 기존 `RETRY_DELAYS_MS`(2·5·15분) 사다리를 탄다. 테스트는 그 문자열 원문과 `overloaded_error`를 고정하고, `individual` 판정이 유지되는 대조 문자열(테스트 실패 보고)도 고정한다. 세션 안의 리뷰 레그 재발화 규칙은 dotfiles-3zsj D11이 소유한다.

### D6. 재개 프롬프트 (`scheduler.js resumePrompt`)

두 번째 문장 앞에 "이전 attempt <id>는 <cause>로 끝났다(exec_receipt=<값|없음>, impl_review=<값|없음>). `git fetch <remote> <branch>` 뒤 `git log HEAD..<remote>/<branch> --oneline`으로 원격이 앞서 있으면 `git merge --ff-only`로 맞춘 뒤 남은 단계만 한다. `workflow_mode=fast_track`은 이미 기록됐다."를 넣는다. 값은 attempt 기록과 `bd show` 결과에서 Worker가 채운다.

### D7. AGENTS.md 축약 (사용자 결정 2026-09-09: 초안 깊이)

16,194B를 약 5KB로 줄인다. 삭제: Beads 타입·우선순위·의존성 어휘 재서술(`bd-usage` 소유; `related` 권장은 bd-usage 금지와 모순), 존재하지 않는 `beads/quickstart` 포인터, "5. Close the issue with `bd close`"(Worker 세션은 훅이 막고 계약이 Worker 소유로 정함), 정리 cursor·실패 사다리 내부 서술(dotfiles 정본 포인터로), GitHub Actions 절의 머지 게이트 내부 판정(세션 행동은 "`gh pr checks`를 호출하지 않는다" 한 문장), 카드 배치 문법의 결정 나열(스펙 세 개 포인터 한 문단). 유지: ADR 포인터, 계약 소비자 선언(ADR 0012), 코딩·테스트 표준, Pre-Handoff(순서 prettier→build 함정 포함), Post-Merge(배포 완료 정의·`bdui-shared`·live 모드), PR 대상. 변경: Pre-Handoff의 `npm ls --depth=0` 문장을 "Worker 워크트리는 설치 결과 줄이 증거; 직접 만든 워크트리는 `npm ci`"로, `prettier:write`는 변경 파일 한정(`npx prettier --write <changed files>`)으로, 그리고 신설 `## Worker pitfalls` 절(zsh 글롭 인용 `--include='*.js'`, `set -o pipefail`, 한글 JSDoc 설명에 ASCII 토큰 하나, 큰 파일은 Read offset/limit 400~800줄, vitest는 `npx vitest run --reporter=dot` timeout 120초)을 둔다 — D1이 이 절을 프리앰블에 그대로 싣는다. 최종 본문은 `## 부록 A`가 초안이며 spec_review 전에 사용자에게 diff로 보인다.

## 구현 unit 후보

한 패킷. 순서: D5(독립·소형) → D3·D2(dispatch 경로) → D1·D4·D6(프리앰블·argv·재개) → D7(AGENTS.md) → 스냅샷·빌드.

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 다른 저장소 — 훅·스크립트·계약·스킬·전역 지침 | 없음 | dotfiles-3zsj |
| 형제 | beads-ui | user_request | 독립 착지 가능한 검증 묶음 — 번들 미커밋은 배포·dev 경로 공개 동작 변경 | 없음 | UI-47y7 |
| 형제 | dotfiles | user_request | 독립 착지 가능한 검증 묶음 — adr 스킬 식별자 규칙 | 없음 | dotfiles-60u8 |

- 관찰: 플러그인 스킬(`frontend-design`) 봉인 — `permissions.deny`의 bypassPermissions 유효성 미측정이라 이번 범위 밖.
- 관찰: Node 외 생태계(Python venv 등)의 워크트리 설치 — 대상 리포가 생기면 그때.

## Test scope

```bash
npx vitest run --reporter=dot server/worker/runner/preamble.test.js server/worker/runner/claude.test.js server/worker/runner/session.env.test.js server/worker/failure-class.test.js server/worker/scheduler.test.js server/worker/worktree.integration.test.js
npm run tsc && npm run lint && npx prettier --write <changed files> && npm run build
npx vitest run --reporter=dot   # 전체, timeout 120초
```

회귀 사례: D1 스냅샷(writable·disposition·quickfix_lane·review 네 변형)과 fail-quiet 줄 생략; D2 `open`→선점, `resolved`에서는 미기록, prerecord 실패 시 미기록, 고아 in_progress 재조정; D3 lock 파일 없음→skipped, 설치 실패→dispatch 계속·`failed:` 기록; D4 argv/env 고정; D5 용량 문자열→`env`/`provider_capacity`, 테스트 실패 문장→`individual`; D6 재개 문장 채움. 실제 실행 확인: 배포 뒤 Worker attempt 1건 transcript에서 첫 턴에 `## 시도 사실`이 있고 impl-gate claim 차단이 0건, `npm ls` 호출이 0건임을 확인한다.

## 실행·인도

한 저장소·한 Bead·한 패킷의 `spec_backed`. PR 하나로 `resolved` 인도, 머지 뒤 `repo-ops/config.toml [deploy]`가 `bdui-shared`를 재시작하고 프로세스 경로·포트·HTTP 응답을 확인한다. 프리앰블 변경은 배포 뒤 첫 dispatch부터 적용된다. 이 스펙 단계에서는 워크트리·커밋·구현을 하지 않는다.

## 결정 (ADR 후보)

- 전제: ADR 0012 — 계약은 코드 field registry로 소비; D1의 사실 카드는 핀 사본과 Worker 해소값만 쓴다.
- 전제: ADR 0007·0006 — 머지 금지는 git 수준 예방과 큐 소유; 가드 블록 축소는 강제 코드를 건드리지 않는다.
- 전제: ADR 0046 — 재개는 기록된 provider 보존; D6은 문장만 더한다.
- Worker가 구현 attempt dispatch 시점에 `in_progress`를 선점하고 attempt 종료·재조정에서 되돌린다: 되돌림 어려움=충족(dotfiles impl-gate 전제·프리앰블 문구·재조정 경로가 함께 움직임), 맥락 없으면 의외=충족(계약은 세션의 구현 진입 claim을 말한다 — Worker dispatch가 그 진입이라는 설명 필요), 실제 대안=충족(세션이 claim / 훅에서 status 검사 제거). `summary`: "Worker는 구현 attempt를 dispatch할 때 durable attempt 기록 뒤 open인 Bead만 in_progress로 선점하고 attempt 종료와 시작 시 재조정으로 되돌린다; session_ref는 쓰지 않고 resolved Bead를 다루는 경로는 제외한다" → ADR
- 프리앰블 사실 카드·가드 블록 축소·skillOverrides·READ_GUARD env·npm ci·용량 오류 env 패턴·AGENTS.md 축약: 각각 한 파일 수준에서 되돌릴 수 있고 기존 결정의 적용이라 첫째 조건이 성립하지 않는다 → ADR 아님

## 부록 A. AGENTS.md 축약 초안

````markdown
# Agents

## 설계 결정 기록 (ADR)
- 정본: `docs/adr/README.md` "현재 유효한 결정". 충돌 시 supersede ADR 필요(`adr` 스킬; 인덱스는 생성물이라 직접 편집 금지).

## Beads (bd)
- 사용법·타입·우선순위·의존성 어휘는 `bd-usage`/`bd-runtime` 스킬이 정본이다. `CHANGES.md`는 갱신하지 않는다.
- 이 저장소가 읽고 표시하는 workflow 계약 표면(라벨·metadata 키·`status` 어휘)의 정본은 dotfiles `docs/contracts/workflow-contract.md`/`workflow-state.yaml`이다(ADR 0012). beads-ui는 소비자이며 정의자가 아니다 — 계약 키 부재를 관측하면 표시를 생략(fail-quiet)하고 계약 쪽 정정을 별도로 제기한다.

## Coding Standards
- ESM. `PascalCase`: 클래스·인터페이스. `camelCase`: 함수·메서드·콜러블 변수. `lower_snake_case`: 그 외 변수·매개변수. `UPPER_SNAKE_CASE`: 상수. `kebab-case`: 파일·디렉터리.
- 런타임 코드는 JSDoc 타입 주석 `.js`; 타입 전용 정의만 `.ts`(런타임 코드·부작용 금지). 필요하면 파일 상단에 `@import` JSDoc 블록.
- 모든 함수·메서드에 `@param`; `@returns`는 반환 타입이 자명하지 않을 때만. 빈 컬렉션으로 초기화되거나 타입이 바뀔 수 있는 지역 변수는 `@type` 명시.
- 모든 제어문에 중괄호. `?.`/`??`는 값이 의도적으로 nullable할 때만.

## 워커·모니터 카드 배치 문법
`candidateCard`·`miniRow`·`runningTile`을 건드리기 전에 정본을 읽는다: `docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md`(§2 줄 순서, §5.1 슬롯 표), `2026-08-28-chip-grammar-unify-design.md`(칩 클릭 의미), `2026-09-02-worker-operation-surface-unify-design.md`(§3.2 `.op-btn`). 슬롯이 없는 새 라벨·칩·버튼은 스펙을 먼저 갱신해 슬롯을 정한 뒤 단다(ADR 0014). 재료가 없는 줄은 그리지 않는다(fail-quiet).

## Unit Testing Standards
- 한 테스트는 한 동작만; 이름은 능동 동사("should…" 금지); setup → execution → assertion을 빈 줄로 구분.
- 테스트를 통과시키려고 구현을 고치지 않는다.

## Pre-Handoff Validation
- 새 워크트리 첫 검증 전 `node --version`이 `package.json#engines`를 만족하는지 확인한다. Worker 워크트리는 Worker의 설치 결과 줄(`node_modules=ok`)이 의존성 증거이고, 직접 만든 워크트리는 `npm ci`한다(다른 체크아웃의 `node_modules` 차용·심링크 금지 — 소스맵이 경로 독립적이어야 한다).
- `npm run tsc`, `npm run lint`, `npx prettier --write <변경 파일>`, `npx vitest run --reporter=dot`(timeout 120초; fork-pool이 드물게 교착하면 죽이고 재실행; `| tail`로 진행을 가리지 않는다).
- 프런트엔드 소스 수정 후 `npm run build`를 prettier **뒤에** 실행하고 갱신된 `app/main.bundle.js`/`.map`을 포함한다(순서가 반대면 소스맵이 낡아 배포 tracked-clean 검사가 실패한다).

## Worker pitfalls
- zsh: 글롭은 따옴표 — `grep -rn 'x' --include='*.js' server`; `app/main.bundle.js`는 grep에서 제외.
- 파이프 뒤 exit code는 마지막 명령의 것이다 — `set -o pipefail` 또는 `cmd >log 2>&1; echo rc=$?`.
- 한글 JSDoc 설명은 `jsdoc/match-description`에 걸린다 — ASCII 토큰(식별자·`false` 등) 하나를 넣는다.
- 큰 파일은 `Read`를 offset/limit 400~800줄로 나눠 읽고, 편집은 `Edit`로 한다(heredoc 치환 편집 금지).
- vitest 출력은 ANSI 색을 포함한다 — 개수를 셀 때 `--reporter=dot`과 `grep -a`.

## Post-Merge Runtime Validation
- 머지는 완료가 아니다: 이 저장소는 공유 서비스 배포까지 마쳐야 완료다. 배포 선언은 핀된 base SHA의 `repo-ops/config.toml` `[deploy]`(ADR 0010)이고, Worker가 추적하는 Bead PR 머지는 관측 후 Worker가 배포·정리한다. 실패 사다리·자동 처리 범위의 정본은 dotfiles이며 이 저장소는 핀 사본 `generated/contracts/repo-operation-policy.json`만 읽는다.
- Worker가 추적하지 않는 quick_fix ref push나 세션 직접 머지는 배포 실행과 증거 확인까지 그 세션이 소유한다: 정본 런타임은 `.worktrees/.repo-ops-deploy`, 외부 executor는 `.worktrees/.repo-ops-deploy.lock`의 `fcntl.flock` 계약을 쓴다.
- 공유 서버는 `bdui-shared restart` 뒤 프로세스 경로·포트·HTTP 응답을 확인한다. `bdui`(로컬 개발은 `npm link`)는 다른 포트의 ad-hoc 개발 서버 전용이다. 최신 소스를 즉시 반영하려면 `BDUI_FRONTEND_MODE=live`(아니면 정적 번들이 서빙되므로 `npm run build` 선행).

## GitHub Actions
- `.github/workflows/`는 비어 있고 재추가하면 테스트가 실패한다. 머지 자격은 checks를 보지 않는다(ADR 0003) — `gh pr checks`를 호출하지 않는다.
- 머지 전 검증은 Pre-Handoff Validation이 맡고, `[verify]`(`repo-ops/script/verify`)는 머지 직전 candidate에서 도는 별개 안전망이다.

## Pull Request Target
- PR은 fork `origin`(`nakkulla/beads-ui`)이 기본 대상이다. `upstream`은 사용자가 명시적으로 요청할 때만.
````
