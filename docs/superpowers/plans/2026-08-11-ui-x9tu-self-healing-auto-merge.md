# 자동머지 completion intent 구현 계획

## Context

`UI-x9tu`는 승인된 스펙
`docs/superpowers/specs/2026-08-11-self-healing-auto-merge-completion-intent-design.md`를
구현한다. 목표는 `auto_merge=true`를 단순 자동 편입 토글이 아니라, 저장소 범위에서
수정 가능한 실패를 최대 2회의 repair session으로 복구하고 원 root PR의 merge와
cleanup까지 이어 가는 durable completion intent로 만드는 것이다.

구현의 새 authority는 `queue.json.completion_intents` 하나다. 새
`server/worker/completion-intent.js`는 root lineage, current subject, repair budget,
active operation, pause/terminal 상태만 조정한다. PR merge는 계속
`merge-queue.js`, authoritative gate와 cleanup은 계속 `pr-actions.js`, session
실행은 계속 `scheduler.js`가 소유한다. coordinator는 기존 lane, attempt,
GitHub/Beads 관측을 transition마다 다시 읽으며 그 상태를 복제하지 않는다.

외부 effect는 물리적으로 exactly-once일 수 없으므로 `active_op`를 effect 전에
기록하고, 재시작 뒤 기존 attempt, Bead, PR, merge, cleanup 사실을 조회해 논리적으로
한 번만 소비한다. root queue head는 same-PR repair와 linked repair PR 동안 유지하고,
repair child는 새 root intent나 새 2회 예산을 얻지 않는다. `auto_merge` OFF는 실행 중
session을 죽이지 않지만 새 repair/merge를 시작하지 않고 결과 정산 뒤 intent를
`paused`로 둔다. 새 Beads workflow metadata key는 만들지 않는다.

## Phase 1: Durable journal과 coordinator kernel

목표는 이후 모든 effect가 공유할 fail-closed 저장 형식과 순수 transition 경계를 먼저
고정하는 것이다.

1. `server/worker/queue-store.js`와 `server/worker/queue-store.test.js`에
   `completion_intents` schema, phase/subject/failure-key/active-op/terminal typedef와
   normalization을 추가한다. legacy 파일은 빈 map으로 읽고, malformed phase, budget,
   subject, op는 삭제하거나 예산을 초기화하지 않고
   `needs_human:intent_state_invalid`로 정규화한다.
2. 같은 store에 intent 생성+root queue placement, session op의 attempt preallocation+
   budget 증가+attempt prerecord, op 상태 전진, subject 교체, pause/terminal/complete,
   done-lane prune을 각각 한 persist로 수행하는 atomic API를 추가한다. session budget은
   dispatch 준비에서만 소비하고 linked Bead 생성 자체에는 소비하지 않으며, 2회 cap과
   repair-child membership의 새 root 생성 금지를 store가 강제한다.
3. 새 `server/worker/completion-intent.js`와 unit test에 dependency-injected coordinator를
   구현한다. coordinator는 snapshot을 받아 `gate`, `probe`, `resume_root`,
   `create_repair`, `dispatch_repair`, `merge_subject`, `retry_cleanup`, `pause`,
   `needs_human`, `complete` 중 다음 action만 결정하고, SHA-bound `failure_key`와
   normalized evidence digest를 만든다. 실제 spawn, Bead create, merge, cleanup은 이
   모듈에서 실행하지 않는다.
4. `server/worker/attach.js`와 `server/worker/attach.test.js`에서 workspace별 coordinator를
   scheduler/PR poller/merge queue와 같은 lifecycle로 생성·start·stop하고 기존
   queue-change wakeup을 재사용한다. `auto_merge=false` 또는 intent가 없는 legacy
   workspace의 현행 동작이 바뀌지 않음을 고정한다.

검증: `npm test -- server/worker/queue-store.test.js server/worker/completion-intent.test.js server/worker/attach.test.js`와 `npm run tsc`를 통과시킨다.

## Phase 2: Pinned ownership probe와 repair session dispatch

목표는 red가 원 PR 소유인지 pinned base 소유인지 판정하고, 승인된 resume/fresh 경로를
기존 runner guard 안에서 재사용하는 것이다.

1. `server/worker/pr-actions.js`, `server/worker/pr-observations.js`,
   `server/worker/gh.js`의 기존 gate evidence를 coordinator가 소비할 수 있는 bounded
   result로 노출한다. local verify red는 fetch한 PR head와 target base SHA를 pin한 뒤
   detached base worktree에서 같은 repo-required verify를 실행하고, CI-owned red는
   정확한 base SHA의 GitHub checks만 사용한다. timeout, spawn/auth/config 오류,
   missing/mismatched checks는 ownership을 추측하지 않고 terminal reason으로 보낸다.
2. 새 `server/worker/completion-repair.js`와 tests에 deterministic linked repair Bead
   ID/branch/PR lineage와 idempotent Beads readback/create adapter를 둔다. repair Bead는
   root의 `discovered-from` 관계와 기존 metadata vocabulary만 사용하며, create 뒤
   journal 기록 전 crash가 나도 같은 ID를 조회해 채택한다.
3. `server/worker/scheduler.js`와 `server/worker/scheduler.test.js`에 coordinator 전용
   dispatch API를 추가한다. PR-owned failure는 latest same-Bead leaf attempt의
   `session_id`, worktree, branch, exec lineage를 확인해 `resume`하고, transcript가
   없을 때만 owned worktree/branch proof 뒤 fresh same-Bead attempt로 대체한다. base-owned
   또는 post-merge failure는 preallocated attempt ID와 linked repair Bead의 pinned-base
   worktree로 fresh session을 띄운다.
4. `server/worker/runner/preamble.js`와 provider adapter snapshot tests에 repair 목적,
   pinned failure evidence, 허용된 repo 변경 범위, test 약화 금지, branch push와 PR
   제출까지만 허용한다는 지시를 추가한다. base push, agent merge, credentials/권한/
   외부 서비스/전역 환경 변경을 기존 command guard와 함께 계속 차단한다.
5. scheduler settlement가 attempt 결과, observed session/PR identity, 새 head SHA를
   coordinator에 전달하도록 배선한다. prepared op와 attempt가 이미 존재하는 재시작은
   새 budget을 쓰지 않고 adopt/reconcile하며, pinned SHA나 failure digest가 달라진
   결과는 소비하지 않고 재게이트한다.

검증: `npm test -- server/worker/completion-repair.test.js server/worker/scheduler.test.js server/worker/pr-actions.test.js server/worker/gh.test.js server/worker/runner/preamble.test.js server/worker/runner/claude.test.js server/worker/runner/codex.test.js`와 `npm run lint -- --quiet`를 통과시킨다.

## Phase 3: Pre-merge continuity와 subordinate repair PR

목표는 repairable red도 completion intent에 편입하고 root queue head를 놓지 않은 채
same-PR 또는 linked repair를 거쳐 기존 merge driver로 되돌리는 것이다.

1. `server/worker/merge-candidates.js`, `server/worker/auto-merge.js`와 tests에서
   worker-owned `pr_wait`의 green/conflict뿐 아니라 allowlist의 repairable
   `verify_cmd_failed`와 CI red를 intake 대상으로 분류한다. auto-enroller는 root intent와
   공개 identity가 root Bead인 merge queue entry를 같은 store mutation에서 만들고,
   active intent의 terminal authority를 `auto_merge_skips`에 위임하지 않는다.
2. `server/worker/merge-queue.js`와 tests가 queue head의 root Bead 대신 coordinator가
   정한 current subject를 `prActions.merge(subject.bead_id)`에 넘기도록 확장한다.
   merge queue만 root/repair PR을 merge하며 기존 conflict resolution round cap은 별도
   예산으로 유지한다. repair session/PR 대기 중에는 root entry를 dequeue하거나 뒤
   entry로 진행하지 않는다.
3. root head/base probe 결과가 green이면 기존 merge action, PR-only red면 same-Bead
   resume, base red면 linked repair create/dispatch로 전이한다. repair session이 PR을
   제출하면 subject를 repair child로 바꾸고, repair PR merge·cleanup 성공 뒤 최신 base를
   다시 pin해 subject를 root로 돌려 처음부터 gate한다. base repair 뒤 남은 PR-only
   regression은 남은 shared budget 안에서만 처리한다.
4. head/base drift, manual PR close/merge, external row, unreadable ownership, non-repo
   failure, budget cap을 fail-closed로 정산한다. `auto_merge` OFF는 새 action을 막고 queue
   position을 비울 수 있게 하되, 재활성화 시 fresh queue position과 새 pinned gate를
   요구한다. 이미 landed된 idempotent cleanup 외에는 OFF 상태에서 새 repair PR을 만들지
   않는다.
5. `server/worker/auto-merge.test.js`, `server/worker/merge-queue.test.js`,
   `server/worker/pr-actions.test.js`에 root-head hold, subordinate child, driver-only merge,
   stale result rejection, conflict-budget 독립, pause/re-enable 순서를 RED→GREEN으로
   추가한다.

검증: `npm test -- server/worker/auto-merge.test.js server/worker/merge-queue.test.js server/worker/pr-actions.test.js server/worker/completion-intent.test.js`를 통과시킨다.

## Phase 4: Post-merge repair와 restart reconciliation

목표는 merge가 이미 landed된 뒤의 repairable verify/cleanup failure도 linked repair로
복구하고 모든 crash window에서 같은 intent로 수렴시키는 것이다.

1. `server/worker/pr-actions.js`가 기존 `runCleanup` choreography를 유일한 cleanup
   구현으로 유지하면서 coordinator에 단계별 bounded failure/result를 돌려주도록 한다.
   `post_merge_verify`의 repairable red만 linked repair로 보내고, config/spawn/timeout,
   deploy, Beads close/restore, branch cleanup과 operator action 실패는 기존 evidence를
   보존한 `needs_human`으로 보낸다. retry verify가 red면 deploy와 detached launch를
   호출하지 않는다.
2. merged-base repair child가 기존 merge queue와 cleanup을 통과하면 root subject의
   authoritative merge SHA를 다시 읽고 `prActions.retryCleanup(root_bead_id)`가 아니라
   그 내부의 동일 `runCleanup` 전체를 idempotently 재실행하는 public entry를 사용한다.
   detached self-deploy 전에는 root completion/active-op handoff를 durable하게 기록해
   서버 재시작 뒤 완료 또는 남은 cleanup을 판정할 수 있게 한다.
3. coordinator start/reconcile가 `queue.json`, attempts, Beads issue/dependency/metadata,
   GitHub PR state/head/merge SHA, `pr_wait`/`done`/`cleanup_failed`를 다시 읽는다. op
   prerecord 뒤 spawn 전, spawn 뒤 adoption 전, Bead create 뒤 journal 전, repair PR open
   뒤 subject 전, merge landing 뒤 transition 전, cleanup 기록 뒤 terminal consume 전,
   detached launch 뒤의 각 crash window를 기존 effect adopt 또는 safe replay로 수렴시킨다.
4. manual/external 변화가 journal과 모순되거나 ownership/worktree를 증명할 수 없으면
   자동으로 새 lineage를 만들지 않는다. 2회 session 소진, malformed state, ambiguous
   spawn은 root card와 queue에 `needs_human` evidence를 남기고 다른 root intent로 예산을
   리셋하지 않는다.
5. `server/e2e/worker-flow.test.js`와 fake runner/real-git fixture에 PR-owned resume,
   base-owned linked repair, post-merge repair+cleanup replay, 두 번 red terminal,
   coordinator/store 재생성 crash cases를 추가한다. duplicate session, Bead, PR merge,
   deploy launch와 budget reset이 없음을 assert한다.

검증: focused coordinator/scheduler/pr-actions integration tests와 `npm test -- server/e2e/worker-flow.test.js`를 통과시킨다.

## Phase 5: UI projection, 문서 정합과 rollout

목표는 root intent 하나만 운영 표면에 보이게 하고, 구현 전체를 실제 shared runtime까지
검증하는 것이다.

1. `server/ws/worker-handlers.js`와 server WS tests가 durable intent를 root 기준의
   bounded projection으로 snapshot에 추가한다. phase, current repair link, 사용/전체
   budget, paused/terminal reason, evidence/log path만 내보내고 repair child를 독립 root
   row로 중복 표시하지 않는다. optional field 부재는 fail-quiet하되 malformed intent는
   terminal로 표시한다.
2. `app/data/worker-queue-store.js`, `app/views/worker/index.js`, 필요 시
   `app/views/worker/lanes.js`와 `app/styles.css`에 root card의 복구 중/repair PR 대기/
   재게이트/정리 재시도/paused/needs-human badge와 detail을 추가한다. OFF 상태와
   re-enable의 queue-position semantics, 사람이 확인할 link/action을 UI tests로
   고정한다.
3. 이전 auto-merge/merge-queue 설계 문서에 이 spec의 supersession 범위를 링크하고,
   새 Beads workflow metadata key가 없으며 `docs/agents/repo-ops.toml`의 기존 deploy
   declaration과 post-merge verification 책임이 유지됨을 기록한다. generated
   `AGENTS.md`는 canonical generator source가 이 repo에서 확인되지 않으면 직접
   편집하지 않는다.
4. frontend 변경 후 `npm run build`로 `app/main.bundle.js`와
   `app/main.bundle.js.map`을 갱신한다. `npm run prettier:write`, `npm run lint`,
   `npm run tsc`, `npm test`, `npm run build`와 최종 `npm run all`을 실행하고 generated
   bundle을 포함한 full diff를 검토한다.
5. implementation review와 PR merge 뒤 merged `main` checkout에서
   `docs/agents/repo-ops.toml`의 `[deploy]`를 재확인하고 `bdui-shared restart`를 실행한다.
   실제 process command가 merged workspace를 가리키는지, 의도한 tailnet port가
   listen하는지, `/healthz`가 응답하는지를 확인한 뒤에만 완료로 선언한다.

검증: `npm test -- server/ws.worker-queue.test.js server/ws/worker-handlers.workspace-target.test.js app/views/worker/index.test.js server/e2e/worker-flow.test.js`, `npm run build`, `npm run all`과 post-merge runtime 검증을 통과시킨다.

## Test scope

- Phase 1 RED → GREEN: legacy/valid/malformed intent normalization, atomic root intake,
  action-before-effect op+attempt+budget prerecord, 2회 cap, repair-child membership,
  completed/done prune를 store/coordinator 단위 테스트로 고정한다.
- Phase 2 RED → GREEN: pinned local/CI ownership matrix, latest same-session resume,
  transcript-missing owned fresh fallback, deterministic linked Bead adoption, preallocated
  attempt의 restart adoption, repair prompt/guard snapshot을 고정한다.
- Phase 3 RED → GREEN: repairable-red intake, root queue head hold, current subject만 기존
  merge driver가 처리함, child merge 뒤 root re-gate, conflict budget 독립, OFF/ON fresh
  queue position과 stale SHA 거부를 통합 테스트로 고정한다.
- Phase 4 RED → GREEN: pre-merge/base/post-merge 세 복구 happy path, 두 session 소진
  terminal, 7개 crash boundary, duplicate effect 부재, cleanup retry red에서 deploy 미호출을
  fake-runner E2E로 고정한다.
- Phase 5 RED → GREEN: root-only UI projection, phase/budget/repair link/paused/terminal
  badge, optional-field fail-quiet, malformed-state terminal 표시와 generated bundle을
  고정한다.
- 제외: credentials/permissions/external service/global environment 자동 수정, test
  삭제·skip·assertion/threshold 약화, agent의 merge/base push, guard 완화, repair session
  2회 cap과 별개인 conflict cap 변경, 병렬 merge, 새 workflow metadata key, physical
  exactly-once 보장.

## Completion boundary

완료 조건은 원 PR regression, pinned-base regression, post-merge regression의 세 경로가
동일 root intent와 합계 2회 budget 안에서 fake-runner E2E로 merge+cleanup 완료까지
수렴하고, 불가하거나 소진된 경로는 durable `needs_human` evidence로 남는 것이다. 모든
PR merge는 merge queue, 모든 cleanup은 `pr-actions`, 모든 session은 scheduler를 통했다는
테스트 증거가 있어야 한다. PR merge만으로 완료 처리하지 않으며 merged checkout의
shared server restart와 process/path/port/health 확인까지 마감 범위에 포함한다.
