# 늦게 완료된 충돌 해소 자동 재진입 구현 계획

## Context

`UI-yup9`는 승인된 스펙
`docs/superpowers/specs/2026-08-11-late-conflict-resolution-reentry-design.md`를 구현한다.
현재 `server/worker/merge-queue.js`의 `waitForResolution()`은 호출 시점의
`now() + 30m`를 deadline으로 만들고, 시간이 지나면 running/paused resolver를 그대로 둔 채
queue item을 `resolution_timeout`으로 dequeue한다. completion-owned item은 같은 결과를
`server/worker/completion-intent.js`가 `needs_human` terminal로 소비한다. 따라서 늦게 성공한
attempt의 head 이동과 terminal event가 이미 제거된 completion 흐름에 다시 결합되지 않는다.

새 authority는 `queue.json.merge_queue[*].resolution`이다. queue store가 exact
`attempt_id + subject_bead_id`, absolute `deadline_at`, `waiting|yielded|ready`와 전이 시각을
journal하고, merge driver가 그 record를 기준으로 queue turn 양보, settlement promotion,
latest authoritative re-gate를 수행한다. completion intent는 계속 root saga와 merge effect를
소유하고, `pr-actions`는 GitHub gate/update/merge/cleanup, scheduler는 attempt lifecycle을
소유한다. 새 lane/button/workflow metadata는 만들지 않고 기존 serial merge driver와
queue-changed coalescing을 유지한다.

구현은 동일 저장소의 순차 결합 단위다. durable schema가 driver보다 먼저, driver의
probe-before-dispatch가 legacy completion adoption보다 먼저 필요하며, UI와 e2e는 server
projection이 안정된 뒤 적용한다. 각 phase는 이전 phase의 커밋을 바탕으로 진행한다.

## Phase 1: Durable resolution journal과 queue ordering

1. `server/worker/queue-store.js`에 valid `ResolutionWait`와 fail-closed
   `InvalidResolutionWait` typedef를 추가하고 `MergeQueueEntry.resolution`을
   `null | valid | invalid`로 정규화한다. legacy entry는 explicit `null`, valid entry는 exact
   identity/deadline/timestamps를 보존하며, malformed non-null input은 no-wait로 지우지 않고
   `resolution_wait_invalid` 판정이 가능한 canonical invalid evidence로 보존한다.
2. store에 atomic `bindResolutionWait`, `yieldResolutionWait`,
   `settleResolutionWait`, `consumeResolutionWait` 계열 API를 추가한다. bind는 exact running
   attempt의 durable `started_at + 30m`를 기록하고 existing `resolution_rounds`를 보존한다.
   yield는 old identity/state CAS 뒤 `state=yielded`와 `yielded_at`을 기록하고 item을 runnable
   FIFO 뒤 deferred suffix로 옮긴다. settle은 exact resume leaf terminal만 `ready`로 바꾸고
   active merge item 바로 뒤로 exactly once promote하며 multiple ready는 `settled_at`과 기존
   order로 안정 정렬한다.
3. 모든 enqueue path가 첫 yielded item 앞에 새 runnable item을 넣고, cancellation/dequeue는
   같은 item의 wait record도 함께 제거하도록 queue mutation을 정합한다. round 증가는
   `ready + DIRTY + exact settled attempt`를 소비하는 store API에서만 한 번 허용해 duplicate
   event가 같은 attempt의 budget을 두 번 쓰지 못하게 한다.
4. `server/worker/queue-store.test.js`에 legacy/valid/malformed normalization, cold-load
   absolute deadline, bind persist failure, waiting→yielded invariants, yielded→ready priority,
   ready FIFO, enqueue-before-yielded, cancellation과 exact-once round consumption을
   RED→GREEN으로 추가한다.

검증: `npm test -- server/worker/queue-store.test.js`와 `npm run tsc`를 통과시킨다.

## Phase 2: Durable wait reconciler와 latest gate

1. `server/worker/merge-queue.js`의 process-local timeout 종료 경로를 durable resolution
   reconciler로 교체한다. successful conflict dispatch는 bind 전에 non-empty exact
   `attempt_id`를 필수 검증하고, identity가 없으면 기존 completion/ordinary fail-closed
   경계로 보내되 `merge()`나 resolver를 재호출하지 않는다. valid dispatch/adopt 응답을 받은
   즉시 wait binding을 persist하고, write throw/`ok:false`면 item을 보존하고 drain을 halt한다.
   `waiting`은 exact running/leaf-paused lineage와 absolute deadline을 관찰하고, deadline 뒤
   session/round/intent/skip을 건드리지 않은 채 `yielded`로 바꿔 다음 runnable item을 처리한다.
2. queue-changed event와 boot pass가 yielded item의 exact terminal resume leaf만 `ready`로
   promote한다. settlement leaf는 `conflict_resolution === true`와 exact subject/ancestor
   identity를 모두 만족해야 하며, unrelated terminal attempt는 기존 fail-closed 경계로 보내고
   resolver를 추측하거나 재호출하지 않는다. 실제 durable transition이 있을 때만 coalesced
   kick을 요청하고, yielded item만 남으면 timer/event watcher만 유지한 채 drain은 hot loop 없이
   끝낸다. missing attempt, forked descendants, subject mismatch, malformed wait도
   `resolution_wait_invalid` 또는 구체 lineage reason으로 fail-closed한다.
3. `server/worker/pr-actions.js`에 side-effect 없는 latest mergeability probe와
   driver-approved conflict dispatch seam을 분리한다. ready item은 latest head/base/checks를
   다시 읽어 `MERGED/CLEAN`은 기존 merge/cleanup, `BEHIND`는 base update·required gate 뒤
   재-probe, `DIRTY`는 store의 exact-once round/cap 판정 뒤에만 resolver 하나를 dispatch한다.
   cap 도달 path는 resolver를 먼저 띄우지 않는다.
4. `auto_merge=false`에서는 waiting의 deadline journal과 yielded/ready settlement는 허용하되
   merge/update/new resolver effect는 실행하지 않는다. 다시 켜면 durable state에서
   이어가고, 명시적으로 dequeue/cancel된 item은 late event로 부활시키지 않는다.
5. `server/worker/merge-queue.test.js`, `server/worker/pr-actions.test.js`,
   `server/worker/auto-merge.test.js`에 30분 queue-yield, next clean merge, late priority
   reentry/full re-gate, restart deadline, duplicate/stale event, no hot loop, persist failure,
   invalid wait, identity 없는 successful dispatch, `conflict_resolution`이 아닌 terminal leaf,
   CLEAN/MERGED/BEHIND/DIRTY, cap-before-dispatch, OFF/ON을 각 approved seam에서
   RED→GREEN으로 추가한다.

검증: `npm test -- server/worker/merge-queue.test.js server/worker/pr-actions.test.js server/worker/auto-merge.test.js`와 `npm run tsc`를 통과시킨다.

## Phase 3: Completion lineage와 restart recovery

1. `server/worker/completion-intent.js`가 live queue-yield에서
   `resolution_timeout` terminal을 만들지 않고 `phase=merging`,
   `active_op.kind=merge_subject`를 유지하도록 result/reconcile 경계를 조정한다.
   `resolution_round_cap`, lost attempt, forked/mismatched lineage, unreadable gate처럼 실제
   bounded/undecidable 결과만 기존 `needs_human` authority에 남긴다.
2. startup reconciliation에 historical
   `needs_human + resolution_timeout/conflict_resolution` one-time adoption을 추가한다.
   adoption은 `active_op`가 root/subject의 `merge_subject` lineage와 모순되지 않고 authoritative
   PR observation을 읽을 수 있을 때만 허용한다. latest `MERGED/CLEAN/BEHIND`는 terminal
   evidence를 지우고 같은 root queue item과 `merging/merge_subject`를 한 persist로 복구한다.
   exact running/paused resume leaf가 하나면 wait record를 재구성하며, `DIRTY`인데 prior
   round/attempt budget을 증명하지 못하면 0으로 reset하지 않고 보수적 last-round 또는
   `resolution_lineage_ambiguous`를 유지한다. unrelated `needs_human`, malformed intent,
   mismatched root/subject는 terminal 상태를 그대로 둔다.
3. `server/worker/scheduler.js`와 `server/worker/attach.js`의 기존 terminal
   `notifyChanged`/boot order를 resolution reconciliation에 연결한다. duplicate terminal event,
   stale ancestor event, restart 직전/후 settlement는 store CAS에 의해 no-op 또는 same ready
   state로 수렴하고, persist 실패 뒤 다음 boot가 exact running attempt의 bind부터 재개한다.
4. `server/worker/completion-intent.test.js`, `server/worker/scheduler.test.js`,
   `server/e2e/worker-flow.test.js`에 live nonterminal yield, unique resume leaf,
   ambiguous/lost lineage, one-time legacy CLEAN/BEHIND adoption, unprovable DIRTY budget,
   unrelated `needs_human`, malformed intent, mismatched root/subject의 adoption 거부,
   long resolver→next clean merge→late reentry→root merge/cleanup, persisted `beads-456` fixture의
   startup recovery를 RED→GREEN으로 추가한다.

검증: `npm test -- server/worker/completion-intent.test.js server/worker/scheduler.test.js server/e2e/worker-flow.test.js`와 `npm run tsc`를 통과시킨다.

## Phase 4: Worker projection, bundle과 delivery 검증

1. queue snapshot/protocol type에 optional resolution projection을 전달하고
   `app/views/worker/index.js`가 `waiting=충돌 해소 중`,
   `yielded=충돌 해소 계속 중 · 완료 후 우선 머지`,
   `ready=충돌 해소 완료 · 재검증 대기`를 기존 PR-wait tile/badge vocabulary로 표시하게 한다.
   yielded/ready는 failure alert나 `needs_human`으로 표시하지 않으며 field 부재는 기존 화면으로
   fail-quiet한다. historical `resolution_timeout` text mapping은 보존한다.
2. `app/views/worker/index.test.js`와 필요한 protocol/store snapshot tests에 세 상태 badge,
   failure-alert 부재, merge queue position, optional-field compatibility를 RED→GREEN으로
   추가한다. frontend 변경 뒤 `npm run build`로 `app/main.bundle.js`와 map을 갱신한다.
3. 승인된 focused test 전체를 다시 실행하고 `npm run prettier:write`, `npm run lint`,
   `npm run tsc`, `npm test`, `npm run build`, `npm run all`을 통과시킨다. controller가
   `git status`, full `git diff`, generated bundle을 검토한 뒤 implementation gate를 실행하고
   feature branch를 push하여 `gh pr create --base main`으로 PR만 제출한다.
4. PR Delivery에서는 CI check가 0개면 저장소 계약대로 vacuous pass로 기록하고 Bead에
   `pr_url`, `impl_review`, completion report를 남겨 `resolved`로 handoff한다. 이 세션은
   merge하지 않는다. 사람의 merge 뒤 `main` checkout에서 `docs/agents/repo-ops.toml`,
   `bdui-shared restart`, process path/port/HTTP를 확인하고, startup adoption이 `beads-456`의
   time-only terminal을 제거했는지와 PR #9의 latest head/base/checks를 다시 관측한다. CLEAN이면
   실제 merge/cleanup 완료까지 수렴해야 하며, durable queue/attempt readback으로 duplicate
   resolver, duplicate merge, resolution-round reset이 없음을 확인한 뒤에만 runtime 완료다.

검증: focused tests, `npm run build`, `npm run all`, `git diff --check`, PR baseRefName=`main` readback을 통과시킨다.

## Test scope

- Phase 1 RED→GREEN: `server/worker/queue-store.test.js`의 resolution schema,
  malformed fail-closed, bind/yield/settle/consume atomicity, deadline/order cold load,
  persist-failure와 duplicate-event invariants.
- Phase 2 RED→GREEN: `server/worker/merge-queue.test.js`,
  `server/worker/pr-actions.test.js`, `server/worker/auto-merge.test.js`의 queue-yield,
  priority reentry, latest gate, probe-before-dispatch, identity 없는 successful dispatch,
  unrelated terminal leaf, cap, restart, hot-loop, OFF/ON seams.
- Phase 3 RED→GREEN: `server/worker/completion-intent.test.js`,
  `server/worker/scheduler.test.js`, `server/e2e/worker-flow.test.js`의 live nonterminal yield,
  resume lineage, strict startup legacy adoption, long-resolution completion saga.
- Phase 4 RED→GREEN: `app/views/worker/index.test.js`와 protocol/store snapshot tests의
  waiting/yielded/ready badge, failure-alert 부재, optional-field fail-quiet 및 generated bundle.
- 회귀/characterization 전용: 30분 전 head wait, paused leaf adoption,
  `resolution_round_cap`, same-head historical skip, worker-serial guard, historical
  `resolution_timeout` 문구.
- 제외: credentials/permissions/external service/global environment 자동 수정, test 삭제·skip·
  assertion/threshold 약화, merge/base push, guard/worker-serial 완화, resolution/repair budget 통합,
  병렬 merge, 새 workflow metadata, external merge cleanup trigger 변경, physical exactly-once 보장.

## Completion boundary

PR 제출 전 검증은 30분 경과가 terminal/skip/round 소비 없이 queue turn만 양보하고, exact late
settlement가 current active merge 다음에 exactly once 재진입해 latest gate를 통과하며, restart
후에도 absolute deadline/round/attempt lineage가 유지되는 focused unit·e2e 증거다. PR Delivery는
implementation review가 binding된 feature branch와 base `main` PR, CI readback, Bead
`resolved + pr_url + completion report`까지다. merge와 merged shared-runtime recovery 검증은
사람의 merge 클릭 뒤 후속 finish lane이 수행하며, time-only terminal 제거, PR #9의 latest gate,
실제 merge/cleanup 수렴, duplicate effect 및 round reset 부재의 durable readback까지 통과해야
runtime 완료를 선언한다.
