# 재시작 생존 runner 제어와 통합 폐기 원복 구현 계획 (UI-309b)

- Bead: `UI-309b` (`route=full_plan`, authoring 동안 `open`/unclaimed)
- 승인 spec: `docs/superpowers/specs/2026-08-10-worker-recovered-control-discard-rollback-design.md@31e85e8fe24b5513936ed4668d64a2592b8d623a`
- spec gate: `skipped@31e85e8fe24b5513936ed4668d64a2592b8d623a` (사용자 권한, 독립 리뷰 증거 아님)
- 계획 경로: `docs/superpowers/plans/2026-08-10-worker-recovered-control-discard-rollback.md`
- Target base: `origin/main`

## Context

현재 detached runner는 서버 재시작 뒤에도 실행과 session-log tail이 살아남지만 scheduler의 process-local handle은 복구되지 않는다. 따라서 recovered `running` attempt의 ⏸/■ 제어가 실패하고, pause signal과 child exit 사이 재시작에서는 `paused_done` 소실 때문에 살아 있는 group을 종료됐다고 오판할 수 있다. 실행 tile의 ■와 `pr_wait`의 [폐기]도 서로 다른 단발 경로라 failed/orphaned·merged cleanup failure까지 안전하게 원복하지 못하며, 삭제 전 recovery archive와 restart-safe phase receipt가 없다.

구현은 전역 daemon을 추가하지 않는다. beads-ui 서버가 persisted process identity, attempt control, discard operation을 복구해 driver를 재개하고, 기존 transcript tail은 live를 계속 담당한다. 새 [폐기]는 삭제 전에 검증된 archive를 만들고 unmerged cleanup 또는 human-merged revert PR로 분기한다. Bead에는 기존 `open`/`resolved`/`pr_url`만 사용하므로 dotfiles cross-repo unit은 없다.

실행 진입 규칙:

- 새 실행 세션은 먼저 parent를 `in_progress`로 claim하고, fetched `origin/main`에서 `.worktrees/UI-309b` / branch `UI-309b`를 만든 뒤 phase child를 plan anchor/digest로 생성한다.
- phase는 아래 순서대로 진행한다. queue schema·startup ordering·cleanup pipeline이 이어지므로 병렬 write는 하지 않는다.
- 각 phase는 RED→GREEN seam, focused verification, controller의 full diff/status 검토, intentional Korean commit을 완료한 뒤 다음 phase로 넘어간다.
- runtime/contract 의미가 spec과 달라져야 한다면 구현을 멈추고 spec/plan freshness 경로로 돌아간다.
- identity, archive, GitHub, BD, git ownership, queue persist readback이 불명확하면 정리나 signal을 추측 실행하지 않는다.

## Phase 1: Durable process identity와 pause recovery

권장 실행: `delegated(gpt-5.6-terra/high)` — OS process-group 제어와 scheduler/startup ordering이 결합된 복합 backend 단위. controller가 wiring과 diff를 통합 검토한다.

Write scope:

- `server/worker/process-controller.js` (신설) 및 단위 테스트
- `server/worker/runner/session.js`와 해당 runner/session 테스트
- `server/worker/queue-store.js`, `server/worker/queue-store.test.js`
- `server/worker/scheduler.js`, `server/worker/scheduler.test.js`
- `server/worker/session-monitor.js`, `server/worker/attach.js`와 관련 테스트

Tasks:

1. `owned | gone | recycled | unknown` probe, PID/PGID/start-time 비교, signal 직전 재검증, TERM grace→KILL, process-group 부재 확인을 RED 테스트로 고정한다. detached spawn은 `pid===pgid`를 확인해 `process_identity`를 attempt에 기록하고, legacy PID-only attempt는 모든 관측값이 맞을 때만 제어한다.
2. `queue-store`에 nullable durable `attempt.control` normalize/mutation을 추가한다. pause request가 signal보다 먼저 persist/readback되고 `requested→signaled→terminated→done|failed`가 restart 뒤에도 단조롭게 이어지게 한다.
3. scheduler pause를 in-memory handle 전용 경로에서 process-controller 기반 경로로 바꾼다. live handle과 recovered attempt가 같은 identity/termination/EOF-drain 계약을 쓰고, session/worktree/branch/lane과 resume session id는 보존한다.
4. `attach` startup을 pending control recovery → running usage replay/monitor → ordinary dead-attempt reconcile 순서로 고정한다. pause 도중 각 crash point를 fresh store/attachment로 재현해 `paused` finalize, slot 점유, 중복 replay/dispatch 부재를 검증한다.

Verification: `npx vitest run server/worker/process-controller.test.js server/worker/queue-store.test.js server/worker/scheduler.test.js server/worker/session-monitor.test.js server/worker/attach.test.js server/worker/runner/claude.test.js`와 `npm run tsc`를 통과시킨다.

## Phase 2: Recovery archive와 durable discard store

권장 실행: `delegated(gpt-5.6-terra/high)` — binary-safe git snapshot과 atomic durable state를 한 safety boundary로 구현한다.

Write scope:

- `server/worker/recovery-archive.js` (신설) 및 단위/real-git 테스트
- `server/worker/state-paths.js`, `server/worker/state-paths.test.js`
- `server/worker/queue-store.js`, `server/worker/queue-store.test.js`
- 필요 시 archive fixture/helper (해당 테스트 전용 경로)

Tasks:

1. `discard_operations` schema와 bead별 active uniqueness, immutable source snapshot, phase/error/receipt transition, active fence, final atomic lane removal API를 RED 테스트로 먼저 고정한다. legacy queue에는 빈 map을 부여하고 historical `stopped`는 읽기만 유지한다.
2. `discard-backups/<operation-id>` 경로와 temp→final atomic publish를 구현한다. manifest/COMPLETE SHA-256, commit bundle, staged/unstaged binary patch, modified/untracked/symlink byte copy, optional session log를 생성한다.
3. archive 검증은 `git bundle verify`, 모든 file checksum/mode/type, manifest hash를 확인한다. ignored output은 manifest에 제외 규칙을 남기고 dirty submodule·special file·partial temp·corruption·write failure는 success receipt를 만들지 않는다.
4. live runner archive seam은 durable fence → owned group SIGSTOP → topology lock snapshot → verified receipt까지만 구현한다. 실패 시 process/artifact를 보존하고 같은 operation id로 retry 가능함을 crash/reload 테스트한다. kill/PR/ref/Bead mutation은 이 phase에서 아직 실행하지 않는다.

Verification: `npx vitest run server/worker/recovery-archive.test.js server/worker/state-paths.test.js server/worker/queue-store.test.js`와 recovery-archive real-git integration test, `npm run tsc`를 통과시킨다.

## Phase 3: Unmerged 통합 폐기 coordinator와 startup resume

권장 실행: `delegated(gpt-5.6-terra/high)` — scheduler, PR action, poller, WS를 관통하는 durable orchestration 단위.

Write scope:

- `server/worker/discard-coordinator.js` (신설) 및 테스트
- `server/worker/scheduler.js`, `server/worker/attach.js`, `server/worker/pr-actions.js`, `server/worker/pr-poller.js`와 관련 테스트
- `server/worker/worktree.js`와 integration test (필요한 관측 primitive만)
- `server/ws/worker-handlers.js`, `server/ws/connection.js`, `server/ws.worker-queue.test.js`
- `app/protocol.js`, `app/protocol.md`의 backend wire 계약

Tasks:

1. `worker-discard {bead_id, attempt_id?, expected_revision}` 진입을 구현한다. latest/leaf attempt 또는 worker-owned PR row, revision, worktree/branch ownership을 검증하고 operation+dispatch/external-adoption/merge fence를 한 store mutation으로 만든다. duplicate click은 active operation을 반환한다.
2. archive receipt 뒤 quiesced group을 TERM+CONT, 필요 시 identity 재검증 후 KILL하고 group 부재·EOF drain·base-drift/guard settlement를 확인한다. running/paused/failed/orphaned가 같은 coordinator로 들어가며 active discard bead는 slot/외부 registry 보호 집합에 남는다.
3. 기존 PR discard를 authoritative observe/close/branch cleanup primitive로 분리한다. PR 없음, OPEN close+CLOSED readback, CLOSED-unmerged skip을 처리하고 exact worktree→local ref→remote ref→Bead open/pr_url unset→final store mutation 순서를 receipt로 전진시킨다.
4. startup에서 active discard operation을 ordinary scheduler reconcile/poller보다 먼저 복구하고 phase별 observation으로 재개한다. PR close, BD write, worktree/local/remote delete, queue persist 직후 crash를 각각 주입해 duplicate side effect 없이 완료되는지 검증한다.
5. poller CLOSED 관측, OPEN→MERGED race, remote auto-delete, `ls-remote` 오류, two-browser CAS를 검증한다. MERGED는 실패나 unmerged cleanup으로 소비하지 않고 Phase 4가 받을 `merged_revert` mode로 persist한다.

Verification: `npx vitest run server/worker/discard-coordinator.test.js server/worker/pr-actions.test.js server/worker/pr-poller.test.js server/worker/scheduler.test.js server/worker/worktree.integration.test.js server/ws.worker-queue.test.js`와 `npm run tsc`를 통과시킨다.

## Phase 4: Merged exact-delta revert PR lifecycle

권장 실행: `delegated(gpt-5.6-terra/high)` — merge 방식별 integrated-range 증명과 post-merge deploy 연계가 필요한 고위험 git/GitHub 단위.

Write scope:

- `server/worker/revert-builder.js` (신설) 및 real-git 테스트
- `server/worker/gh.js`, `server/worker/gh.test.js`
- `server/worker/discard-coordinator.js`, `server/worker/pr-actions.js`, `server/worker/pr-poller.js`와 관련 테스트
- `server/worker/repo-ops.js`/verify seam은 기존 API로 충분하지 않을 때만 최소 수정

Tasks:

1. GitHub adapter에 PR base/head/merge OID, merge 방식, commit/file 목록 조회와 revert PR create/readback을 추가한다. fetch할 ref/OID와 target base를 operation snapshot에 고정하며 observation 실패는 fail closed한다.
2. current fetched target base에서 basename==branch인 `revert-<bead-id>-<operation-id>` 임시 worktree를 만들고 exact integrated delta를 증명한다: merge commit은 first-parent delta, squash는 parent delta+PR file 대조, rebase는 target-base first-parent의 contiguous patch-id/path 일치 range만 허용한다.
3. 증명된 aggregate binary diff를 reverse 3-way apply하고 repo-declared pre-merge verification을 통과한 경우에만 commit/push/revert PR create를 진행한다. empty/unproven/conflict/binary·submodule 복원 불가/verify 실패는 remote mutation 없이 operation failure로 남긴다.
4. revert PR을 human-merge-only `pr_wait` rollback row로 기록하고 Bead `resolved`/`pr_url=<revert>` readback을 수행한다. merge 관측 뒤 기존 base-sync/post-merge verify/detached deploy/branch cleanup seam을 재사용하되 child/parent close/ship 대신 Bead open/pr_url unset/final operation done으로 끝낸다.
5. GitHub 직접 merge, close-without-merge, existing `cleanup_failed`, cleanup retry와 discard 경쟁, detached deploy 상태 불명확을 restart 포함 테스트로 검증한다. 원본/revert PR과 archive receipt는 audit state에 남긴다.

Verification: `npx vitest run server/worker/revert-builder.test.js server/worker/gh.test.js server/worker/discard-coordinator.test.js server/worker/pr-actions.test.js server/worker/pr-poller.test.js server/worker/repo-ops.test.js`와 revert-builder real-git integration test, `npm run tsc`를 통과시킨다.

## Phase 5: Worker/Monitor UX 통합과 전체 검증

권장 실행: `delegated(gpt-5.6-luna/max)`로 bounded UI/protocol 변환을 수행하고, controller가 backend projection과 전체 bundle/diff를 통합 검토한다. backend contract drift가 발견되면 Terra 수정으로 되돌린다.

Write scope:

- `app/views/worker/index.js`, `app/views/worker/running-grid.js`, `app/views/worker/lanes.js`와 테스트
- `app/views/monitor/index.js`, `app/views/monitor/lanes.js`와 테스트
- `app/styles.css`, `app/protocol.js`, `app/protocol.md`
- `server/ws/worker-handlers.js`의 UI-safe discard projection/response
- `app/main.bundle.js`, `app/main.bundle.js.map` (canonical build output)
- recovery archive 운영 문서 또는 기존 worker 문서의 최소 보강

Tasks:

1. ■와 active `worker-attempt-stop`/`worker-pr-discard` 호출을 제거하고 Worker/Monitor를 `worker-discard` 하나로 연결한다. stale old action은 `action_retired` error를 표시하고 silent false를 허용하지 않는다.
2. running=`⏸+[폐기]`, paused=`▶+[폐기]`, latest failed/orphaned=`↻+[폐기]+✕`, worker-owned pr_wait/cleanup_failed=`[폐기]` eligibility를 동일 helper/projection으로 렌더한다. external PR과 Done은 제외한다.
3. unmerged/merged 확인 문구, `백업 중→runner 종료→PR 정리→revert PR 대기→원복 배포` progress, stable error와 같은-operation [재시도], archive/PR receipt를 Worker와 Monitor에서 검증한다. merge/정리와 discard 동시 operation은 disabled reason을 보여 준다.
4. archive 수동 복구/checksum 절차와 legacy `stopped`/protocol migration을 문서화하고 `npm run build`로 bundle/map을 갱신한다.
5. focused frontend tests 뒤 `npm run prettier:write`, `npm run lint`, `npm run tsc`, `npm test`, `npm run build`를 순서대로 실행한다. controller가 `git status`, base..HEAD full diff, generated bundle만의 예상 diff를 검토한 뒤 implementation gate와 PR Delivery로 넘긴다.

Verification: `npx vitest run app/views/worker/index.test.js app/views/monitor/index.test.js app/views/monitor/lanes.test.js server/ws.worker-queue.test.js` 후 전체 `npm run prettier:write && npm run lint && npm run tsc && npm test && npm run build`; 마지막 `git diff --check`와 clean owned-path status를 확인한다.

## Test scope

RED→GREEN seam mapping:

- Phase 1: process ownership four-state probe, PGID drift, TERM→KILL/group absence, durable pause crash recovery, startup replay/slot invariants.
- Phase 2: discard schema/phase CAS, archive bundle/patch/file/checksum completeness, partial/corrupt/unsupported input fail-closed, quiesce-before-backup crash recovery.
- Phase 3: unified operation uniqueness/fence, every unmerged external side-effect crash point, PR/poller races, exact branch cleanup and CAS.
- Phase 4: merge/squash/rebase actual integrated-range proof, reverse apply, unproven/conflict failure, revert PR lifecycle and post-merge verify/deploy finalization.
- Phase 5: Worker/Monitor eligibility and confirmation/progress/error UX, retired protocol behavior, frontend bundle integration.

Characterization/regression checks:

- existing session id resume, runner adapter selection, usage replay boundary, workflow/exec stamp rollback
- recovered running slot accounting, base-drift/guard settlement, `pr_wait_holds_slot`
- ordinary merge cleanup order, external merged [정리], merge queue/auto-merge
- legacy queue without new fields and historical `stopped` rendering

Explicit exclusions:

- external PR branch/worktree deletion, Done-lane historical rollback, automatic revert merge, force-push/base reset, archive expiration UI, dotfiles workflow vocabulary changes는 테스트/구현하지 않는다.

## Completion and handoff

- implementation gate는 모든 phase commit이 통합되고 전체 검증이 green인 exact head에서 한 번 실행한다.
- PR은 writable `origin`의 `main`을 대상으로 만들고 workflow의 PR Delivery stop을 따른다. 이 fork에서 GitHub checks가 비어 있으면 vacuous pass이고 로컬 full verification이 CI 증거다.
- merge 뒤 `docs/agents/repo-ops.toml [deploy]`의 `bdui-shared restart`가 실행돼야 하며, merged checkout process path·port·HTTP 응답과 startup recovery가 확인되기 전에는 완료로 선언하지 않는다.
