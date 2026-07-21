# 러너 인가 기준 전환 — plan_path 존재 → fresh plan_review 영수증 (UI-19yr)

출처: dotfiles-s4nf(PR #277, merge f254e1f9) 3단계 배포의 ②단계. dotfiles ③단계(plan 초안 미러링, dotfiles-w1la)가 배포되면 **미승인 초안**이 `plan_path`에 들어오기 시작한다. 현행 beads-ui는 `plan_path` 존재를 codex/ccx 러너 실행 인가로 쓰므로, 그대로 두면 존재하지 않는 승인에 실행 권한이 열리는 권한 회귀가 된다.

## 현행 (main 8acb391에서 검증)

- `server/worker/runner/index.js:66-78` `assertRunnerAllowed(bead, runner_name)` — `isFullPlan && !hasPlanPath && codex|ccx`일 때만 차단. `plan_path`가 있기만 하면 통과.
- 호출부 2곳: `server/worker/runner/index.js:112`(`spawn(bead, workspace, settings)` — workspace 보유, 가드에 미전달), `server/worker/scheduler.js:279`(`{id, route, plan_path}` 리터럴을 `snap`에서 조립).
- `server/worker/attach.js:156-179` `snapshotBead` 반환에 `plan_review`/`status` 없음.
- `server/workflow-enrich.js:307-313` — plan 스테이지가 `md.plan_path ? 'on' : 'empty'` 인라인 삼항. `specStage()`(`:216-228`)만 영수증 상태기계 보유 — plan 비대칭으로 초안이 승인본으로 오표시된다.
- `server/workflow-enrich.js:105-121` `pathChangedSince()`의 `stale_cache` 키는 `head\0sha\0path` — 작업트리 변경을 반영하지 못한다.
- 클라이언트 `app/views/board/stepper.js`는 상태 일반화(`dim/on/reviewed/skip/stale`)돼 있어 **클라이언트 변경 불필요**.
- `plan_review` 참조는 서버 코드에 아직 0건(신규 키).

## 변경 1 — 영수증 검증·freshness 판정 (`server/workflow-enrich.js`)

`plan_review` 영수증 형식은 `user@<full-40-hex-sha>` (dotfiles `docs/contracts/workflow.yaml`이 canonical). plan 승인에는 skip 경로가 없다.

**plan 전용 엄격 검증** (codex spec 리뷰 지적 1 반영): 기존 `parseReceipt()`는 임의 reviewer 토큰과 7-40자리 SHA를 허용하므로 그대로 쓰면 `codex@<short-sha>`도 인가를 얻는다. plan 영수증의 유효 조건은 reviewer 토큰이 정확히 `user` **그리고** SHA가 정확히 40 hex. 이를 검사하는 plan 전용 검증 함수를 export한다(`parseReceipt` 재사용 후 추가 검사 가능). `skipped@...`·타 reviewer·short SHA·파싱 실패는 전부 **무효 영수증**이다.

fresh의 정의(두 조건 모두):

1. `git log <receipt-sha>..HEAD -- <plan_path>` 출력이 비어 있다 (영수증 이후 커밋 변경 없음).
2. `git status --porcelain -- <plan_path>` 출력이 비어 있다 (작업트리 clean — 미커밋 덮어쓰기는 `git log`가 못 본다).

- 조건 2는 `stale_cache`를 **우회**한다(무캐시 매 호출). 조건 1은 기존 `pathChangedSince` 재사용 가능(HEAD 키 캐시는 유효).
- 판정 함수는 3상으로 export: `'fresh' | 'stale' | 'unknown'`(git 호출 실패·입력 결손 = unknown). 소비자별 해석:
  - **인가(러너 가드): fail-closed** — `fresh`만 허용. `unknown`은 차단.
  - **표시(planStage): fail-quiet** — 기존 관례대로 `stale`만 stale 렌더, `unknown`은 reviewed 유지.

## 변경 2 — 러너 가드 (`server/worker/runner/index.js`)

`assertRunnerAllowed(bead, runner_name, ctx?)`로 확장. `ctx = { workspace?: string, plan_fresh?: boolean }`.

`isFullPlan && (codex|ccx)`일 때 다음 중 하나면 허용, 아니면 `RunnerBlockedError`:

1. **fresh plan_review**: 변경 1의 엄격 검증 통과(`user` + 40 hex) && fresh. freshness 해석 순서: 선계산 boolean(`ctx.plan_fresh`, 없으면 `bead.plan_fresh`) → `ctx.workspace`로 직접 계산 → 판정 불가는 차단(fail-closed).
2. **레거시 폴백**: `plan_review` **키 자체 부재** && `plan_path` 존재 && `status ∈ {resolved, closed}` — 영수증 제도 이전 Bead 승인 취급 (dotfiles 실측: 레거시 `plan_path` 보유 6건 전부 closed, open 0건 → 100% 커버). 무효 영수증이 존재하면 폴백 불가(fail-closed).

- `skipped@<sha>`를 포함한 모든 무효 영수증은 **인가 아님**(차단) — plan에 skip 경로가 없다는 계약의 코드 반영.
- claude 러너는 현행대로 항상 허용(plan-save 훅이 claude 전용이므로 초안 생성 경로 유지).
- 차단 메시지는 사유(영수증 없음/stale/skip/판정 불가)를 구분해 담는다.

## 변경 3 — 호출부 배선

- `server/worker/runner/index.js:112`: `assertRunnerAllowed(bead, name, { workspace })`. spawn 경로의 직접 계산은 spawn이 받은 workspace(스케줄러 경로에서는 워크트리)에서 수행 — 선계산 boolean이 있으면 그것이 우선이므로 워크트리 조상 결손이 정상 실행을 오차단하지 않는다.
- `server/worker/attach.js` `snapshotBead`: 반환에 `plan_review`(md), `status`(issue), `plan_fresh`(boolean|null) 추가. `plan_fresh`는 full_plan + 유효 영수증일 때 workspace root로 선계산, 그 외 null.
- `server/worker/scheduler.js:279`: 가드 호출을 `assertRunnerAllowed({id, route, plan_path: snap.plan_path, plan_review: snap.plan_review, status: snap.status}, runner_name, { plan_fresh: snap.plan_fresh })`로 교체. `BeadSnapshot` typedef 갱신.
- `server/worker/scheduler.js:363-368` (codex spec 리뷰 지적 2 반영): `runner.spawn()`에 전달하는 bead 리터럴에도 `plan_review`/`status`/`plan_fresh`를 포함한다. 이걸 빠뜨리면 `createRunner.spawn()` 내부 2차 가드가 영수증을 못 보고 fresh codex/ccx 실행까지 전부 차단한다(fail-closed의 역효과). 프로덕션 spawn 호출자는 scheduler 단독(`attach.js`는 `createRunner`를 scheduler deps로 배선만 함 — rg로 확인).

## 변경 4 — `planStage()` 신설 (`server/workflow-enrich.js`)

`specStage()` 대칭 상태기계로 `:307-313` 인라인 삼항 교체. `stages.plan`은 현행대로 full_plan 루트에서만 생성.

| 조건 | state |
| --- | --- |
| `plan_path` 없음 | `empty` |
| 유효 영수증(엄격 검증 통과), fresh | `reviewed` |
| 유효 영수증(엄격 검증 통과), stale (커밋 변경 **또는** 작업트리 dirty) | `stale` |
| 무효 영수증 (`skipped@`·타 reviewer·short SHA·파싱 실패) | `dim` (승인 아님; raw receipt는 노출) |
| `plan_review` 키 부재 + `status ∈ {resolved, closed}` | `on` (레거시 승인) |
| `plan_review` 키 부재 + 그 외 | `dim` (초안 대기 = pending 표시) |

`enrichIssueWorkflow`(`:287`)는 이미 `workspace_root`/`head`를 보유 — plan stale 판정도 같은 head 기반으로 계산.

## 범위 밖

- `deriveRoute()`(`:169-177`)의 `plan_path` 폴백 추론 — 명시 `route` 뒤의 폴백일 뿐, 유지.
- `app/views/detail-panel/artifacts.js`의 plan artifact 나열 — 표시용 목록, 유지.
- dotfiles ③단계 자체(PreToolUse 등록)와 프록시 Bead 처리 — dotfiles 워크스페이스 소관.

## 검증

- 단위: `server/worker/runner/index.test.js` — fresh 허용 / 영수증 없음 차단 / stale 차단 / `skipped@` 차단 / **타 reviewer(`codex@<40hex>`) 차단 / short SHA 차단 / 무효 영수증 존재 시 레거시 폴백 불가** / unknown(fail-closed) 차단 / 레거시 closed 허용 / claude 항상 허용 / `plan_fresh` 선계산 우선.
- 단위: `server/workflow-enrich.test.js` — planStage 6상태 + 작업트리 dirty → stale + `stale_cache` 우회 확인.
- 통합: scheduler dispatch가 **실제 `createRunner`** 를 거쳐 fresh 영수증 codex 실행이 spawn 2차 가드까지 통과하는 테스트 (codex spec 리뷰 지적 2의 회귀 방지).
- 갱신: 가짜 `snapshotBead` 3곳 — `server/worker/attach.test.js:67`, `server/worker/scheduler.test.js:118`, `server/e2e/worker-flow.test.js:99`(`plan_review`/`status`/`plan_fresh` 필드).
- 전체: `npm test`(vitest) green + lint/typecheck.

## 완료·배포 기준

canonical 런타임(Mac Studio projectmgr beads-ui) 배포·라이브 확인 후 `bd ship plan-review-runner-authz` → dotfiles 프록시 `dotfiles-ua03` close → `dotfiles-w1la` ready 복귀 (bd 1.0.5 external 의존은 차단 미구현이므로 수동 close 경로).
