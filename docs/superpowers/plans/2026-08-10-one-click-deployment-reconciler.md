# 머지 클릭 Deployment Reconciler 구현 계획

## Context

`UI-16ep`는 PR merge 자체가 아니라 merge 후 cleanup의 deployment source가 shared checkout에 묶여 생기는 경합을 제거한다. 현재 `syncBase`는 사용자 작업을 보존하기 위해 dirty/other-branch checkout을 fetch-only 성공으로 처리하지만, 뒤의 `runDeploy`는 같은 checkout이 clean하고 `HEAD == verified SHA`이기를 요구한다. 그래서 정상적인 artifact publication이나 사람의 checkout 이동이 `checkout_dirty` 또는 `head_not_base_sha`로 바뀌고, 이미 머지된 Bead가 `resolved`에 남는다.

승인된 spec은 `reconcile(repo, target_base, merged_floor_sha) -> deployment_receipt`를 canonical Interface로 둔다. Reconciler는 클릭한 PR merge SHA `M`을 포함하는 candidate `D`를 한 번 pin하고, exact `D` verification·deployment·readback이 성공하면 remote가 `D+1`로 전진해도 해당 cleanup을 계속 닫는다. managed Adapter는 Worker-owned durable release에서 실행하고, 기존 workspace Adapter와 beads-ui의 detached self-restart는 호환한다.

이 계획은 provider repo인 beads-ui만 구현한다. dotfiles의 candidate-local Adapter, runtime symlink migration, 실제 `dotfiles-ur52` 재정리는 dependency 뒤의 consumer Bead `dotfiles-we2r`가 소유한다. shared checkout stash/reset, 사용자용 full/light 선택, operator-only restart 정책 변경, release GC는 이번 범위가 아니다.

## Phase 1: Protocol과 durable state 확정

목표는 managed Adapter를 fail-closed로 해석하고, process restart 뒤에도 같은 deployment attempt를 이어갈 수 있는 저장 형식을 먼저 만드는 것이다.

1. `server/worker/repo-ops.js`와 `server/worker/repo-ops.test.js`에서 `[deploy] adapter = "managed"`를 canonical capability로 추가한다. 선언이 없으면 기존 `workspace` semantics를 유지하고 config fallback은 항상 workspace로 해석한다. managed command는 candidate release 내부 relative argv만 허용하며 absolute path, `..` escape, 빈 argv, `detached = true` 조합은 invalid로 거부한다. 기존 workspace declaration, unknown additive key, pinned-blob precedence는 그대로 회귀 테스트한다.
2. `server/worker/gh.js`와 tests에서 PR detail에 nullable `merge_sha`를 추가하고, `MERGED` fact는 유효한 40-hex merge commit SHA가 없으면 `gh_bad_json`으로 fail-closed한다. click 직후 재조회와 poller 관측이 동일한 merge floor `M`을 cleanup에 전달하도록 type contract를 고정한다.
3. 새 `server/worker/deployment-paths.js`와 tests에 `$XDG_DATA_HOME/bdui/deploy/<repo-id>/releases/<sha>` release 경로와 `$XDG_STATE_HOME` 아래 private receipt 경로를 둔다. `repo-id`는 기존 workspace slug 규칙을 재사용하고, path component와 attempt ID를 sanitize하며 candidate 경로 containment를 검사한다. `server/worker/locks.js`에는 single-instance topology에 맞는 repo-keyed `deployLock(repo)`를 추가하되 topology/service lock과 중첩 보유하지 않는다.
4. `server/worker/queue-store.js`와 tests에 workspace-level reconcile state를 추가한다. state는 lease owner attempt, bead별 merged floor, fixed candidate, Adapter kind, `queued/pinned/verifying/deploying/readback/complete/failed` stage, receipt path/digest, retry count·retry-at·last retryable reason, terminal failure를 보존한다. 모든 advance/complete/fail mutation은 `(bead_id, attempt_id)` binding을 확인하고 기존 atomic temp-file rename을 사용한다. legacy `queue.json`은 빈 reconcile state로 normalize하며 `last_deploy`에는 optional receipt binding을 additive하게 보존한다.

검증: `npm test -- server/worker/repo-ops.test.js server/worker/gh.test.js server/worker/deployment-paths.test.js server/worker/locks.test.js server/worker/queue-store.test.js`와 `npm run tsc`를 통과시킨다.

## Phase 2: Deployment Reconciler deep module 구현

목표는 candidate pin, exact verification, Adapter 실행, receipt validation, retry/resume를 caller에서 숨기는 단일 Module을 만드는 것이다.

1. 새 `server/worker/deployment-reconciler.js`와 unit tests에 dependency-injected `createDeploymentReconciler(...).reconcile({ bead_id, target_base, merged_floor_sha })`를 구현한다. 호출 즉시 floor를 durable state에 enqueue하고 `deployLock(repo)` 안에서 기존 successful receipt가 현재 `M`을 포함하는지 먼저 판정한다. reuse 시에도 receipt 자체의 repo/attempt/original-floor/candidate binding을 검증하고, 별도로 `git merge-base --is-ancestor M D`를 증명해 현재 floor를 같은 receipt digest에 bind한다.
2. fresh run은 target-base resolver가 fetch한 remote/ref와 candidate `D`를 한 번 고정하고 `M` ancestry를 확인한다. managed lane은 독립 release를 init하고 resolved remote URL의 target branch를 fetch한 뒤 detached `D`를 checkout한다. spawn 전 `HEAD == D`, clean status, remote identity, realpath containment를 재검증하며 shared checkout의 branch, index, worktree file은 변경하지 않는다.
3. exact `D` post-merge verification이 green일 때만 candidate declaration의 relative Adapter argv를 release cwd에서 shell 없이 실행한다. Reconciler가 전달하는 `BDUI_DEPLOY_*` bindings는 protocol version, source repo, target remote/base, floor, candidate, release, receipt, attempt ID의 비-secret 값으로 제한한다. receipt v1 validator는 크기 제한과 regular-file check 뒤 protocol/repo/remote/base/attempt/floor/candidate/verify binding, previous·deployed marker, action-plan digest와 outcomes, deployment source path·HEAD, exact readback, terminal outcome·timestamp를 확인하고 SHA-256 digest를 durable state와 `last_deploy`에 기록한다.
4. `queued/pinned/verifying/deploying/readback`에서 process가 끝나고 terminal receipt가 없으면 같은 attempt/candidate를 idempotently resume한다. lease 대기와 restart resume는 retry budget을 쓰지 않고, materialization/fetch/spawn의 retryable failure만 persisted `retry_at` 기반 bounded backoff로 최대 3회 소비한다. 세 번째 동일 계열 실패, verify red, ancestry failure, malformed receipt, source/readback mismatch는 terminal failure로 전환한다. terminal success receipt가 없는 상태에서는 deployed marker나 cleanup floor를 전진시키지 않는다.
5. legacy workspace Adapter는 기존 `syncBase -> postMergeVerify -> runDeploy`를 Reconciler의 workspace adapter callback으로 감싼다. 따라서 `runCleanup` caller는 더 이상 숨은 checkout precondition을 조립하지 않지만, managed capability가 없는 repo의 `base_ff_diverged`, checkout guard, synchronous deploy log, detached terminal launch ordering과 `last_deploy` 의미는 유지된다. managed lane의 best-effort local fast-forward/fetch-only outcome은 진단으로만 남기고 deployment success를 막지 않는다.

검증: `npm test -- server/worker/deployment-reconciler.test.js server/worker/repo-ops.integration.test.js server/worker/pr-actions.test.js`와 `npm run lint -- --quiet`를 통과시킨다.

## Phase 3: Cleanup·resume·UI 통합과 real-git 증명

목표는 `[머지]`와 externally observed merge가 같은 Reconciler를 사용하고, 정상 진행은 자동 수렴하며 실제 failure만 사람이 보는 상태로 만드는 것이다.

1. `server/worker/pr-actions.js`에서 click/already-merged/poller 경로가 authoritative `merge_sha`를 `runCleanup`에 전달하게 하고, 기존 `base_sync -> verify -> deploy` 연결을 Reconciler 호출 하나로 교체한다. managed result가 retryable/pending이면 `cleanup_failed`를 쓰거나 child/branch/Parent cleanup을 시작하지 않고 PR-wait에 남긴다. exact receipt success 뒤에만 child sweep, branch cleanup, parent close, capability ship을 기존 순서로 진행한다. terminal managed failure만 기존 `failCleanup` evidence path로 들어간다.
2. `server/worker/attach.js`, `server/worker/runtime.js`, `server/worker/pr-poller.js`에서 shared queue store, locks, target-base resolver, verify runner, repo-ops resolver, spawn seam을 Reconciler에 주입한다. restart 뒤 poller가 durable nonterminal reconcile record를 발견하면 같은 attempt를 다시 구동하고, 동시 floors는 repo lock 뒤 기존 candidate receipt coverage를 검사해 가능한 경우 deployment를 재실행하지 않는다. beads-ui `detached=true` self-restart는 downstream cleanup durable write 후 terminal launch하는 기존 예외를 유지한다.
3. `server/ws/worker-handlers.js`, `app/views/worker/index.js`, `app/views/worker/lanes.js`와 tests에서 durable reconcile stage를 PR activity로 project한다. managed sequence는 `정리 중 · 검증`, `정리 중 · 배포`, `정리 중 · readback`을 Adapter kind에 맞는 progress sequence로 표시하고, 사용자 full/light 선택은 추가하지 않는다. managed lane에서는 `checkout_dirty`, `checkout_not_on_base`, `head_not_base_sha`가 banner detail로 나타나지 않으며 verify/deploy/receipt/readback terminal failure만 기존 cleanup banner를 사용한다.
4. 새 `server/worker/deployment-reconciler.integration.test.js`에 bare remote, dirty shared checkout, candidate `D`, candidate에 처음 추가된 executable fake managed Adapter를 갖는 real-git fixture를 만든다. verify callback 중 remote/shared `main`을 `D+1`로 전진시키고도 release `HEAD == D`, deployed marker `D`, `M` ancestry, exact receipt, shared checkout status·HEAD 불변을 검증한다. 두 floor가 `D`에 포함될 때 single writer와 receipt reuse, process store 재생성 뒤 resume, 잘못 bind된 receipt 거부도 증명한다.
5. `server/e2e/worker-flow.test.js`, `server/ws.worker-queue.test.js`, `app/views/worker/index.test.js`, `app/views/monitor/lanes.test.js`에서 merge click부터 progress, success close, actual failure banner까지 provider acceptance를 묶는다. frontend source 변경 후 `npm run build`로 `app/main.bundle.js`와 map을 재생성하고 전체 suite를 실행한다.

검증: focused integration/UI tests, `npm run build`, 마지막으로 `npm run all`을 통과시킨다. controller는 phase별 commit/diff를 검토한 뒤 provider branch의 full diff와 generated bundle을 최종 확인한다.

## Test scope

- Phase 1 RED -> GREEN: managed declaration의 default/invalid matrix, MERGED `merge_sha` 필수성, XDG path containment, repo deploy lock serialization, reconcile state atomic persistence·legacy normalization을 먼저 실패 테스트로 고정한다.
- Phase 2 RED -> GREEN: fixed candidate ancestry, receipt binding, successful receipt reuse, per-repo single writer, restart resume, 3회 bounded retry, workspace Adapter regression을 dependency-injected unit tests로 고정한다.
- Phase 3 RED -> GREEN: dirty shared checkout과 verify 중 `D+1` drift를 포함한 real-git fixture, candidate-local first-rollout Adapter, exact close evidence, durable progress/UI banner 구분을 integration/E2E tests로 고정한다.
- 제외: dotfiles 실제 install/restart/readback, live runtime symlink migration, operator-only service 조작, 지원하지 않는 다중 beads-ui server process 사이의 cross-process lock, 자동 release GC. 이 항목들은 provider fake Adapter acceptance를 확장하지 않는다.

## Completion and rollout boundary

provider implementation의 완료 조건은 fake managed Adapter를 사용한 exact `D` receipt로 worker-owned Bead cleanup이 `closed`까지 가고, legacy workspace/detached Adapter tests와 전체 suite가 green인 것이다. 이 PR이 merge·deploy된 뒤에만 consumer `dotfiles-we2r` 계획을 작성·실행한다. 실제 dotfiles managed declaration과 runtime source migration이 land하기 전에는 기존 workspace Adapter가 계속 적용되므로, `dotfiles-ur52`의 현재 cleanup failure를 provider만으로 성공 처리했다고 주장하지 않는다.
