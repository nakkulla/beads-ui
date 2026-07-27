# 워커 세션 실행 지점 차단: gh PATH shim + pre-push 훅 (UI-p4c7)

## 배경

머지 가드는 UI-2o4z(argv 기반 재작성, PR #44)로 오탐이 줄었지만 여전히 세션
stdout **스트림 관측 후 kill**이다 — 실제 명령 실행과 레이스가 있고,
`git push origin $BR`(변수에 base가 든 경우)처럼 확장 전 argv로는 판정할 수
없는 케이스가 남는다. base를 영구 오염시키는 두 행위(`gh pr merge`, base
브랜치 push)를 **실행 전에** 차단하는 층을 추가하고, 스트림 argv 가드는 최후
보루(tripwire)로 강등한다. 위협 모델은 혼동한 협조적 세션이지 적대자가
아니다.

확정된 설계 결정(사용자 승인 2026-07-27):

1. 범위 = gh shim + pre-push 훅. git shim 없음 — `git merge`는 로컬·복구
   가능이므로 기존 스트림 tripwire(conflict-resolution 예외 게이트 포함)에
   남긴다.
2. 훅 주입 = spawn env `GIT_CONFIG_*`(git ≥ 2.31). 대상 리포에 설정을 남기지
   않고, 효과가 워크트리 경계가 아니라 **세션 프로세스 트리 경계**이며, 세션
   종료와 함께 소멸한다. `extensions.worktreeConfig` 방식(리포 공유 config
   영구 변이)은 기각.
3. 가드 자산 미비 시 fail-closed — dispatch 거부.
4. shim/훅 거부 발동은 엔진이 tool_result 마커로 감지해 blocker + kill.
5. 훅 거부 착지 = `refs/heads/main` + `refs/heads/master` + 해당 attempt의
   `target_base`.

## 변경

### ① exec-guard 모듈 (신규 `server/worker/exec-guard.js`)

shim·훅 스크립트를 **JS 템플릿 리터럴 상수로 내장**한다(패키지에 별도 스크립트
파일을 싣지 않아 실행권한·패키징 문제를 원천 차단). 제공 표면:

- `ensureGuardAssets()` — 서버 기동(워커 기능 초기화) 시
  `$XDG_STATE_HOME/bdui/exec-guard/bin/gh`와 `…/exec-guard/hooks/pre-push`를
  mode `0o755`로 기록한다. 매 기동 무조건 재작성(idempotent, 업그레이드 자동
  반영). 자산은 워크스페이스 공용 1벌 — attempt별 데이터(`target_base`)는
  파일이 아니라 env로 전달되므로 per-attempt 자산이 필요 없다.
  **실패 비치명**: mkdir/write/chmod 실패는 `initWorkerRuntime`의 기존
  start 계열과 같은 try/catch + 로그 패턴으로 삼켜 워커 attachment 생성을
  막지 않는다 — dispatch 거부의 최종 권위는 spawn 직전
  `verifyGuardReady()`이며, 초기 기록이 실패했으면 그 검증이
  `exec_guard_unavailable` 정리 경로로 떨어진다.
- `guardEnv({ target_base })` — spawn env 조각을 반환:
  `PATH`(shim `bin` 디렉터리를 현재 `process.env.PATH` 앞에 prepend),
  `GIT_CONFIG_COUNT=1` / `GIT_CONFIG_KEY_0=core.hooksPath` /
  `GIT_CONFIG_VALUE_0=<hooks 디렉터리>`, `BDUI_GUARD_BASE=<target_base>`.
- `verifyGuardReady()` — 두 자산 파일 각각에 대해 regular file 여부 +
  실행권한(`X_OK`) + **내용이 내장 상수와 바이트 단위로 일치**하는지 확인
  (파일이 작으므로 그대로 비교). truncated/corrupt 자산은 실행권한이
  남아 있어도 거부된다 — "broken asset도 fail-closed" 요구의 실체.
- `EXEC_GUARD_MARKER` — 거부 메시지의 고유 마커 상수(예:
  `bdui-exec-guard: refused`). 스크립트 본문과 엔진 감지가 이 상수 하나를
  공유한다.

**gh shim 동작** (`bin/gh`, `#!/bin/sh`): argv에 **인접한 별도 토큰 쌍
`pr` `merge`**가 있으면 `EXEC_GUARD_MARKER`를 포함한 사유를 stderr에 찍고
exit 1. 아니면 자신의 디렉터리를 PATH에서 제거한 값으로
`PATH=<제거된 PATH> exec gh "$@"` — 실제 gh에 위임한다. 인용 문자열 인자
(`--body "pr merge"`)는 한 토큰이므로 구조적으로 매치되지 않고,
`gh -R x pr merge`류 플래그 삽입은 잡는다. `-R <value>`의 값 토큰이 우연히
`pr`인 극단 케이스의 오판은 수용한다(발동해도 cause_detail로 즉시 진단
가능).

**pre-push 훅 동작** (`hooks/pre-push`, `#!/bin/sh`): stdin의 각 행
`<local ref> <local oid> <remote ref> <remote oid>`에서 remote ref가
`refs/heads/main`, `refs/heads/master`, `refs/heads/$BDUI_GUARD_BASE`
(변수 비어 있으면 앞 둘만) 중 하나면 `EXEC_GUARD_MARKER` 포함 사유를 stderr에
찍고 exit 1; 모든 행이 통과하면 exit 0. git이 해석을 끝낸 ref를 받으므로
변수 확장·refspec 축약(`git push` 맨몸)·삭제 푸시(`--delete main` = 같은
remote ref)까지 정확히 거부하며 오탐이 구조적으로 불가능하다. 로컬 ref는
검사하지 않는다(bead 브랜치·태그 push는 통과).

### ② dispatch 배선 (`server/worker/scheduler.js`)

- 워커 기능 초기화 경로에서 `ensureGuardAssets()` 1회 호출.
- `launchSession`: `runner.spawn` 직전 `verifyGuardReady()` — 실패 시 spawn
  없이 기존 spawn 실패 정리 경로(스탬프 revert·workflow_mode revert·claim
  해제)를 그대로 타되 attempt `cause: 'exec_guard_unavailable'`로 기록한다.
- 통과 시 `settings.env = guardEnv({ target_base: input.target_base })`.
  `session.js:156`의 기존 merge 지점(`...settings?.env`)을 그대로 쓰므로 엔진
  코어 변경이 없다. **attempt 모드와 무관하게 항상 주입** —
  conflict-resolution attempt도 base 착지는 못 한다.

### ③ 마커 감지 → blocker (`session.js` + `runner/claude.js`)

- `AdapterSpec`에 `extractToolResultText(raw)` 추가. **claude 스트림 실제
  스키마 기준**(fixture `server/worker/__fixtures__/claude-tools.jsonl` 실측):
  tool_result는 최상위 이벤트가 아니라 `raw.type === 'user'` 행의
  `raw.message.content[]` 안에 `{ type: 'tool_result', content }`로 중첩되고,
  Bash의 stderr는 최상위 `raw.tool_use_result.stderr`로도 별도 제공된다.
  shim/훅 마커는 **stderr**에 찍히므로 추출기는 (a) 중첩 tool_result의
  `content`(문자열, 또는 text 블록 배열의 text 연결)와 (b)
  `raw.tool_use_result.stderr`(문자열일 때)를 모두 이어붙여 반환한다.
  해당 없음은 null.
- 엔진 `onLine`: 추출 텍스트에 `EXEC_GUARD_MARKER`가 포함되면 기존 blocker
  경로로 SIGTERM. durable 전파를 위해 **`blocked_detail =
  { reason: 'exec_guard_refused', command: <마커가 있는 행, 512자 truncate> }`
  를 명시적으로 채운다** — 기존 플럼빙은 `blocked_detail.command`만
  `cause_detail.command`로 복사하므로, message에만 담으면 attempt 기록·배너·
  알림에서 마커 행이 유실된다. blocker 이벤트 message에도 같은 행을 담는다.
- 기존 merge 가드(스트림 argv 검사)는 판정 로직 변경 없이 유지 — 우회 잔존면
  (절대경로 `gh`, `--no-verify`, env 초기화)의 최후 보루.

### ④ 프리앰블 고지 (`runner/preamble.js`)

`GUARD_CONTRACT_DIRECTIVE`에 한 줄 추가: `gh pr merge`와 base 브랜치 push는
실행 지점에서 거부되며, 거부를 만나면 우회를 시도하지 말고 blocker로 종료할
것.

## 구현 순서

③이 UI-2o4z의 `blocked_detail`/`cause_detail` 플럼빙에 의존하므로 **PR #44
머지 이후**에 구현을 시작한다.

## 비목표

- git shim(`git merge`의 실행 지점 차단) — L3 스트림 가드 유지.
- `gh api` 머지 REST 엔드포인트(`PUT /repos/…/pulls/N/merge` 등) 차단 — 양쪽
  층 모두 비범위(스트림 가드도 현행 미커버, 협조적 위협 모델).
- `--no-verify`·절대경로 gh·env 초기화 우회의 실행 지점 차단 — tripwire
  담당.
- 서버 자신의 git 작업(`pr-actions.js` base sync, `push --delete <branch>`)
  경로 변경 없음 — guard env는 세션 spawn에만 주입된다.

## 알려진 제약

- `core.hooksPath` env 덮어쓰기로 세션 안에서는 대상 리포 자체의 훅이
  실행되지 않는다. 현재 관리 대상 리포(beads-ui·dotfiles)에 활성 훅이 없음을
  실측 확인(2026-07-27); 대상 리포가 훅을 도입하면 재평가.
- 세션이 `EXEC_GUARD_MARKER` 문자열을 우연히 출력하면 오탐 kill이 되지만,
  cause_detail에 해당 행이 남아 즉시 진단 가능하다(무진단 사망 아님).

## 수용 기준

1. shim: `gh pr merge 311`, `gh -R nakkulla/beads-ui pr merge 311` 거부(마커
   포함 stderr, exit ≠ 0); `gh pr view 1`, `gh issue comment 1 --body
   "pr merge"` 통과 및 **실제 gh로 exec 위임**(테스트는 가짜 `gh`를 PATH에
   두고 위임 도달을 검증). node 테스트에서 `sh`로 스크립트를 실제 실행해
   검증한다.
2. 훅: stdin ref 조합별 — `refs/heads/main`·`refs/heads/master`·
   `refs/heads/<BDUI_GUARD_BASE>` 착지 거부, bead 브랜치·`refs/tags/*` 통과.
   삭제 푸시는 **실제 pre-push 프로토콜 형태**(`(delete)` local ref +
   zero-OID local oid + base remote ref)로 입력해 거부를 검증한다.
   `BDUI_GUARD_BASE`가 **unset인 경우와 명시적 빈 문자열인 경우를 각각**
   테스트하며 둘 다 main/master만 거부한다.
3. 실측 git 통합: 임시 리포 2개(로컬 remote)에서 guard env를 적용한
   `git push origin HEAD:main`이 훅에 의해 실패하고, `git push origin
   HEAD:refs/heads/<bead-branch>`는 성공한다. `git push origin $BR`(BR=main)
   도 거부된다 — 스트림 가드가 못 보는 변수 확장 케이스의 실행 지점 차단
   증명.
4. 엔진: **실제 스트림 형태의 fixture**(중첩 tool_result의 content에는
   마커 없음 + `tool_use_result.stderr`에만 마커 + exit 1) 재생 시 blocker
   (`exec_guard_refused`) + group-kill + `blocked_detail.command`에 마커 행
   포함(기존 fixture-spawn 하네스). 중첩 content에 마커가 실리는 변형도
   감지된다.
5. 스케줄러: `verifyGuardReady` 실패 주입 시 spawn 미발생·attempt
   `exec_guard_unavailable` 기록·스탬프/claim 정리 완료. `guardEnv`가
   `settings.env`로 전달되어 spawn env에 PATH 선두 shim 디렉터리와
   `GIT_CONFIG_*`·`BDUI_GUARD_BASE`가 실리는 것을 spawn_impl 주입 테스트로
   검증. blocker 사망 시 `blocked_detail`이 attempt `cause_detail`로
   보존되는 round-trip도 검증한다.
6. `ensureGuardAssets` idempotency(재기동 재작성)와 mode `0o755` 검증.
   truncated/corrupt 자산(내용 불일치)이 `verifyGuardReady`에서 거부되는
   케이스, 그리고 초기 기록 실패(쓰기 불가 주입) 후에도 attachment는 살아
   있고 dispatch만 `exec_guard_unavailable`로 거부되는 케이스를 포함한다.
7. Pre-Handoff Validation 전체 green(tsc/test/lint/prettier) +
   `npm run build` 번들(`app/main.bundle.js`(.map)) 포함.
