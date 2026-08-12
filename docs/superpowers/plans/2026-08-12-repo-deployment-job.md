# repo-level desired-state Deployment Job 구현 계획

## Context

- owning Bead: `UI-lb58`
- approved spec: `docs/superpowers/specs/2026-08-12-repo-deployment-job-design.md` at `e6d0625f769a2b2ac8b0c6ab78486beb86650edc`
- provider prerequisite: dotfiles `dotfiles-uib7` closed, installed `repo-deployctl status --repo <beads-ui> --json`가 `idle`, projectmgr deployer process가 live여야 한다.
- successor: 이 Bead의 exact-SHA external deployment와 Closure 뒤에만 dotfiles `dotfiles-j8e6` retirement가 시작한다.
- 최초 cutover에는 old Worker가 남기는 `deploy_not_detached_for_self` residue를 status-first bootstrap으로 인계해야 하므로 `worker-ineligible`이 의도적으로 유지된다. 구현 session은 managed deploy를 worktree에서 직접 설치하거나 bootstrap하지 않는다.
- `UI-yjc2`는 filesystem runtime marker authority 삭제와 verify state isolation으로, `UI-9f54`는 fetch timeout/process cleanup으로 이 계획 안에서 해결한다.

## Phase 1: provider client와 durable deployment model

1. `server/worker/deployment-job.test.js`에 request/status/retry JSON parsing, `idle|pending|running|succeeded|failed`, wrong repo/base/SHA/generation, malformed output, stale regression과 retry binding RED cases를 만든다.
2. 새 `server/worker/deployment-job.js`가 shell 없이 installed `repo-deployctl`만 호출하고, provider state file을 직접 읽지 않으며, current desired binding과 PR별 merged-floor coverage를 구분하게 구현한다.
3. `server/worker/queue-store.js`의 durable schema에 repo-level current deployment observation과 row별 `merge_sha`, `verified_target_sha`, `deployment_generation`, cleanup cursor를 추가한다. old unknown fields는 보존하지만 managed reader/writer는 추가하지 않고 normalization/migration tests를 갱신한다.

Verification: `npm test -- server/worker/deployment-job.test.js server/worker/queue-store.test.js`

## Phase 2: merge lifecycle, coalescing과 Closure

1. `server/worker/pr-actions.test.js`와 `server/worker/merge-queue.test.js`에 post-merge verify 뒤 durable accepted/no-op request가 merge-driver slot을 해제하고, 첫 deployment pending/running 중 두 번째 merge가 newer desired를 요청하는 RED cases를 만든다.
2. `server/worker/pr-actions.js`의 cleanup을 `base_sync -> post_merge_verify -> deployment_request`와 validated `succeeded`이면서 `covers(deployed_sha, merge_sha)`인 뒤의 `child_sweep -> branch_cleanup -> parent_close`로 분리한다. request/write failure와 `failed`는 coverage에 사용하지 않고 Parent를 `pr_wait/resolved`에 유지한다.
3. succeeded SHA ancestry가 cover하는 각 row를 독립 sweep하고 다른 row failure를 전파하지 않는다. non-ancestor는 close하지 않고 `deployment_not_covering_merge`를 기록하는 RED cases를 `pr-actions.test.js`에 추가한다.
4. `server/worker/pr-poller.js`, `server/worker/attach.js`, `server/worker/merge-queue.js`에 subscriber/execution slot과 무관한 repo-level pending demand를 연결한다. restart 뒤 status observation만 resume하며 external deploy effect를 spawn하지 않는다.
5. old queue fixture의 `deploy_not_detached_for_self`/`cleanup_failed`는 provider success가 authoritative floor를 cover할 때 deploy-stage failure만 지우고 cleanup을 재개한다. 다른 cleanup failure는 보존한다.

Verification: `npm test -- server/worker/deployment-job.test.js server/worker/pr-actions.test.js server/worker/merge-queue.test.js server/worker/pr-poller.test.js server/worker/queue-store.test.js`

## Phase 3: self deployment와 runtime isolation

1. 새 `scripts/deploy-self.test.js`와 `scripts/deploy-self.js`를 추가한다. exact candidate env/clean HEAD를 검증하고 dependency install, shared `current` symlink atomic replace, synchronous `bdui-shared restart`, bounded `/healthz.runtime` SHA/path readback을 같은-SHA 재실행 안전하게 수행한다.
2. `server/runtime-identity.js`, `server/runtime-startup.js`, `server/index.js`, `server/worker/deployment-paths.js`와 tests에서 `$XDG_STATE_HOME/bdui/runtime/beads-ui.json` writer/reader와 marker failure shutdown을 제거하되 process가 계산한 `/healthz.runtime` payload는 유지한다.
3. `server/worker/verify-cmd.js`가 verify attempt별 temp `XDG_STATE_HOME`, `BDUI_RUNTIME_DIR`, config root와 port env를 child에 전달하고 teardown하게 한다. `server/worker/verify-cmd.test.js`와 `server/cli/commands.integration.test.js`가 shared path 무변경을 증명한다.
4. `server/bd.js`, `server/worker/target-base.js`, `server/worker/attach.js`에 fetch attempt timeout과 process-group kill/wait를 연결하고 bounded retry 뒤 모든 terminal path에서 `base_inflight`를 clear한다. `target-base.test.js`는 same-repo caller의 inflight sharing과 다른 repo의 독립 progress도 RED→GREEN으로 고정한다.

Verification: `npm test -- scripts/deploy-self.test.js server/runtime-startup.test.js server/runtime-identity.test.js server/worker/verify-cmd.test.js server/cli/commands.integration.test.js server/worker/target-base.test.js server/worker/attach.test.js`

## Phase 4: repo-level UI와 wire protocol

1. `server/ws/worker-handlers.js`가 validated deployment structure와 covered PR rows를 workspace snapshot에 fail-closed projection하고, retry handler가 failed current desired만 `retryDeployment`하게 한다.
2. `app/views/worker/index.js`, `app/views/worker/running-grid.js`와 관련 styles에 repo 상단 deployment strip, target SHA, covered PR, progress/failure reason/log link와 실패 시 `[배포 재시도]` 하나를 추가한다. PR card에는 포함/대기/완료만 표시하고 PR별 deploy action은 두지 않는다.
3. 기존 managed stage/receipt/failure UI vocabulary와 `last_deploy` 중심 projection을 새 repo-level model로 교체하고 `app/views/worker/index.test.js`, `app/views/worker/running-grid.test.js`, WebSocket/monitor tests를 갱신한 뒤 bundle을 다시 만든다.

Verification: `npm test -- app/views/worker/index.test.js app/views/worker/running-grid.test.js server/ws.worker-queue.test.js app/views/monitor/lanes.test.js && npm run build`

## Phase 5: managed implementation 삭제와 통합 검증

1. `server/worker/deployment-reconciler.js`, `managed-state.js`, `managed-failure.js`, `deployment-paths.js`, `scripts/managed-self-deploy.js`와 전용 unit/integration tests를 삭제한다. startup persisted reconcile, managed queue stages, failure record, receipt와 runtime marker import를 모두 제거한다.
2. `server/worker/repo-ops.js`, `docs/agents/repo-ops.toml`을 정확히 `[deploy] cmd=["scripts/deploy-self.js"], timeout_ms=600000`으로 전환하고 `adapter|detached` parsing/managed environment projection을 제거한다. active automatic path는 external deployment job만 남긴다.
3. 새 `scripts/check-managed-deploy-retired.js`가 `server/`, `app/`, `scripts/`, `docs/agents/repo-ops.toml`의 active source와 colocated tests를 scan한다. 기본 mode는 current tree를 읽고, retirement prerequisite용 `--repo <abs> --ref <git-ref>` mode는 working tree가 아니라 해당 git tree blob만 읽는다. scan script 자체와 historical `docs/superpowers/specs|plans|reviews|handoffs`, inert persisted state는 제외한다. `deployment-reconciler|managed-state|managed-failure|managed-self-deploy|deployment_reconcile|managed_failure|BDUI_DEPLOY_PROTOCOL_VERSION|BDUI_DEPLOY_RECEIPT_PATH`와 filesystem runtime marker writer/path가 0인지 검사하되 unrelated generic `managed`는 금지하지 않는다.
4. type/lint/test/prettier/build 전체 검증을 수행하고 삭제 후 dead compatibility shim은 추가하지 않는다.

Verification: `node scripts/check-managed-deploy-retired.js && npm run tsc && npm test && npm run lint && npm run prettier:write && npm run build && npm run all`

## Test scope

- Phase 1 RED→GREEN: provider response binding, current desired와 row generation 분리, durable schema normalization.
- Phase 2 RED→GREEN: pending 중 후속 merge, 무구독 restart polling, request failure와 deploy failed no-close, non-ancestor `deployment_not_covering_merge`, ancestry coverage, independent sweep, legacy residue handoff.
- Phase 3 RED→GREEN: exact self deploy idempotency, filesystem marker 부재, verify temp-state isolation, hung fetch timeout/process cleanup, same-repo inflight sharing과 cross-repo independence.
- Phase 4 RED→GREEN: repo-level strip/retry와 PR별 deploy action 부재, wire fail-closed behavior.
- Phase 5 RED→GREEN: named active-source scan, exact simple declaration/timeout, full Worker/UI/build suite.
- focused command: `npm test -- server/worker/deployment-job.test.js server/worker/pr-actions.test.js server/worker/merge-queue.test.js server/worker/pr-poller.test.js server/worker/target-base.test.js server/worker/attach.test.js server/worker/verify-cmd.test.js server/cli/commands.integration.test.js scripts/deploy-self.test.js app/views/worker/index.test.js app/views/worker/running-grid.test.js`
- 제외: external deployer implementation, dotfiles Workflow Contract retirement, historical queue/state file 삭제, multiple environment UI.

## Delivery gate

1. cutover preflight에서 provider live/idle, shared runtime health, nonterminal managed reconcile 0을 확인한 뒤 PR을 old Worker로 merge하고 exact candidate D의 verify 및 expected `deploy_not_detached_for_self` residue를 readback한다.
2. `repo-deployctl status --repo <beads-ui> --json` 결과에 다음 결정표를 적용한다: `idle`이면 D를 request하고, current desired가 D이면 기존 binding을 재사용하며, current desired가 D의 descendant로 D를 ancestry-cover하면 그 newer generation을 관측한다. 다른 base 또는 D를 cover하지 않는 non-idle desired이면 fail closed하고 D를 덮어쓰지 않는다. request한 경우 returned base/SHA/generation을 status로 즉시 재확인하며 interruption 후에도 이 status-first 절차만 반복한다.
3. validated terminal `succeeded`의 deployed SHA가 D를 cover하고 live process path/port/HTTP `/healthz.runtime.source_sha`도 그 deployed SHA와 일치하는지 확인한다. 새 Worker의 deploy-stage residue-only handoff, child/branch/Parent Closure 뒤 `UI-yjc2`와 `UI-9f54`를 evidence와 함께 disposition한다. `dotfiles-j8e6`을 unblock하는 같은 cross-repo write에 canonical beads-ui repo absolute path, merged SHA, live runtime SHA/path를 prerequisite note로 기록하고 readback한다.
