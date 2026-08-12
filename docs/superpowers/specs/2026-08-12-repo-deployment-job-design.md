# repo-level desired-state Deployment Job 설계

## 상태

- 사용자 설계 승인: 2026-08-12
- route: `full_plan`
- owning Bead: `UI-lb58`
- provider dependency: dotfiles `dotfiles-uib7`
- retirement successor: dotfiles `dotfiles-j8e6`
- related incidents: `UI-yjc2`, `UI-9f54`

## 문제

현재 merge cleanup은 PR마다 candidate pin, verify, managed Adapter, self restart handoff,
startup recovery와 receipt를 소유한다. core Implementation은
`deployment-reconciler.js`, `managed-state.js`, `managed-self-deploy.js`만 약 3,659줄이고,
핵심 tests까지 약 6,953줄이다. Interface도 stage·journal·failure mapping·runtime marker로
넓어져 Implementation 복잡성을 숨기지 못한다.

두 incident는 이 결합의 다른 실패 양상이다.

- `UI-yjc2`: detached verify는 cwd만 격리하고 shared `XDG_STATE_HOME`을 상속한다. CLI
  integration test가 임시 server를 띄우면 전역 runtime marker가 temp worktree/port identity로
  바뀌고, 실제 shared runtime이 정상이어도 managed receipt recovery가
  `runtime_identity_mismatch`로 실패한다.
- `UI-9f54`: target-base `git fetch`는 failed exit retry만 있고 process timeout이 없다.
  unresolved shared `base_inflight`가 모든 caller와 persisted reconcile을 영구 정지시킬 수 있다.

배포는 PR별 effect가 아니라 repo target의 desired state다. 여러 merge floor를 포함하는 최신
deployed SHA 하나가 여러 PR cleanup을 만족할 수 있다.

## 사용자 결과

1. PR card에는 `[머지]`만 유지한다.
2. repo 상단에는 배포 대상 SHA, 포함된 merge, pending/running/succeeded/failed 상태 하나를 표시한다.
3. 정상 배포는 자동이며 `[배포]` 클릭을 요구하지 않는다.
4. 실패할 때만 상단에 `[배포 재시도]`가 나타난다.
5. 한 deployed SHA가 여러 merge SHA를 포함하면 해당 PR과 Bead를 함께 완료한다.

## 목표

1. Worker가 deploy effect 대신 verified SHA desired intent와 result observation만 소유하게 한다.
2. merge cleanup과 deployment job lifecycle을 분리하되 Bead Closure는 live deployment 성공 뒤에만 허용한다.
3. repo별 desired SHA를 coalesce하고 one deployment result로 여러 merge floor를 satisfy한다.
4. managed Reconciler, self-restart helper/journal, receipt/failure protocol과 filesystem runtime marker authority를 제거한다.
5. target-base fetch에 bounded timeout과 child cleanup을 추가한다.
6. verify child의 writable runtime/state root를 session-scoped temp path로 격리한다.

## 비목표

- PR별 deploy button
- 사용자가 full/light deploy를 선택하는 UI
- Worker가 external deployer process를 spawn·restart·recover
- generic action/receipt protocol 유지
- repo command 내부 install 정책을 beads-ui가 해석
- multiple environment UI
- historical specs/plans rewrite

## Architecture

### Deep Module: Deployment Job

Worker 안의 `Deployment Job` Module Interface는 다음 의미만 가진다.

```text
requestDeployment(repo, target_base, verified_sha)
deploymentStatus(repo) -> pending | running | succeeded | failed
covers(deployed_sha, merge_sha) -> boolean
retryDeployment(repo)
```

desired/status file grammar는 provider contract가 소유한다. callers는 generation, atomic write와
ancestry coverage를 이 Module을 통해서만 사용한다. 실제 provider seam은 installed
`repo-deployctl request|status|retry --json`이며 Worker는 provider state file을 직접 읽거나 쓰지
않는다. release, deploy command, restart와 health Implementation은 external deployer 및 repo
command 뒤에 있다.

기존 `workspace|managed` Adapter seam은 제거한다. active automatic path는 external deployment
job 하나이고, repo마다 달라지는 구체적 동작은 exact candidate `[deploy].cmd` 한 개가 담당한다.

### Merge and deploy data flow

```text
PR merge(M)
  -> target-base fetch with timeout
  -> pin latest candidate D where M is ancestor
  -> detached post-merge verify(D) with isolated state env
  -> repo-deployctl request(D)
  -> PR row: merged · deploy pending

external deployer
  -> deploy exact D
  -> provider status(D, succeeded|failed)

Worker observation
  -> succeeded and M ancestor of deployed D
  -> child sweep -> branch cleanup -> Parent Bead close
```

request가 아직 실행되기 전에 `D+1`이 오면 provider의 새 generation이 D를 대체하고 한 번만 배포한다.
D가 이미 running이면 D를 끝낸 뒤 D+1을 한 번 배포한다. Worker는 deployment status를 기다리는
동안 execution slot을 점유하지 않는다. server restart 뒤에는 desired/status를 다시 읽기만 하며
deploy effect를 재생하지 않는다.

### Repo-owned self deployment command

beads-ui declaration은 provider cutover 뒤 다음 단순 형태가 된다.

```toml
[deploy]
cmd = ["scripts/deploy-self.js"]
timeout_ms = 600000
```

`scripts/deploy-self.js`는 external deployer가 실행하므로 beads-ui restart에 죽지 않는다.

1. cwd `HEAD == BDUI_DEPLOY_TARGET_SHA`, clean tracked status를 확인한다.
2. exact lockfile dependency install을 idempotent하게 수행한다.
3. shared runtime `current` symlink를 exact release로 atomic replace한다.
4. `bdui-shared restart`를 동기 실행한다.
5. `/healthz.runtime.source_sha`와 source realpath가 exact release를 가리킬 때까지 bounded poll한다.
6. 성공하면 exit 0, 실패하면 stderr/log와 nonzero만 반환한다.

restart journal, launch token, detached helper, failure record와 receipt는 없다. retry는 같은 SHA에
대한 전체 command 재실행이며 install·pointer·restart·health가 모두 idempotent하다.

### Runtime identity

`/healthz.runtime`의 process가 계산한 PID/start/instance/source path/SHA/host/port payload는
live readback으로 유지한다. `$XDG_STATE_HOME/bdui/runtime/beads-ui.json` filesystem marker와
marker write failure에 따른 server shutdown, marker-based receipt recovery는 제거한다.

post-merge verify child는 `XDG_STATE_HOME`, `BDUI_RUNTIME_DIR`, config와 임시 port를 verify attempt
전용 temp root로 덮어쓴다. verification이 shared runtime, queue, PID 또는 config state를 쓰지
않는 것을 regression test로 증명한다.

### UI and protocol

repo 상단 deployment strip은 기존 Worker 상태 style을 재사용한다.

- target short SHA
- `배포 대기 | 배포 중 | 배포 완료 | 배포 실패`
- 이 deployment가 cover하는 merged PR 번호
- 실패 reason, log link, `[배포 재시도]`

각 PR card는 `머지됨 · 배포 대기`, `머지됨 · <sha> 배포에 포함됨`, `머지됨 · 배포 완료`를
표시한다. deploy retry action은 repo-level 하나이고 PR별 retry button은 없다. 기존 `[정리]`는
deploy 외 child/branch/Bead cleanup 재진입에만 남긴다.

## Cleanup and compatibility

active code와 tests에서 다음 surface를 제거하거나 새 Module로 교체한다.

- `server/worker/deployment-reconciler.js`
- `server/worker/managed-state.js`
- `server/worker/managed-failure.js`
- managed 전용 `deployment-paths`와 queue stages
- `scripts/managed-self-deploy.js`
- startup persisted reconcile와 marker recovery wiring
- managed failure/progress WebSocket projection과 UI vocabulary

cutover preflight는 durable queue에 nonterminal managed reconcile이 없음을 확인한다. terminal old
fields와 old state files는 historical evidence로 남겨도 active reader/writer가 사용하지 않는다.
unknown JSON fields를 보존하는 generic behavior 외에 managed compatibility reader를 새로 만들지
않는다.

## UI-9f54 bounded fetch

target-base fetch는 각 `git fetch` attempt에 explicit timeout을 전달한다. timeout은 child process
group을 종료하고 ordinary fetch failure category로 durable하게 반환한다. failed exit와 timeout을
합쳐 총 attempt cap을 유지하며, `base_inflight`는 모든 terminal path에서 clear된다. 같은 repo의
caller는 한 inflight resolution을 공유하지만 다른 repo resolution은 독립 진행한다.

## 오류 처리

- verify failure: desired를 쓰지 않고 기존 verify failure handling으로 남는다.
- desired write failure: deployment을 요청하지 않았으므로 cleanup을 닫지 않는다.
- pending/running: failure banner 없이 repo-level progress만 표시한다.
- deploy failed: merge는 유지하고 Parent는 `pr_wait/resolved`, 상단 retry를 제공한다.
- stale status: generation/SHA가 current desired와 다르면 terminal success로 사용하지 않는다.
- deployed SHA가 merge floor를 포함하지 않음: close하지 않고 `deployment_not_covering_merge`로 표시한다.
- fetch timeout: bounded retry 뒤 target-base failure로 terminalize하며 다른 repo를 막지 않는다.

## Rollout

1. `dotfiles-uib7` close와 installed external deployer readback을 확인한다.
2. cutover 전 nonterminal managed reconcile 0개와 shared runtime health를 확인한다.
3. desired-state Module, UI, self deploy command, simplified `[deploy]`, fetch timeout과 verify
   isolation을 한 PR에 land한다.
4. old Worker가 PR을 merge하고 exact candidate D의 post-merge verify를 마친 뒤, simplified
   declaration을 해석하지 못해 남긴 cleanup failure를 merge/verify evidence와 함께 보존한다.
5. controller가 installed provider의
   `repo-deployctl request --repo <beads-ui> --base <base> --verified-sha D --json`을 한 번 실행한다.
   이 bootstrap은 deploy effect가 아니라 이미 검증된 desired SHA 제출이며, current service를
   내리지 않는다.
6. external deployer가 candidate command를 실행하고 새 server `/healthz` exact SHA를 확인한다.
7. 새 Worker가 provider status를 관측해 current PR과 `UI-lb58`을 close하는지 확인한다.
8. managed active writer/reader와 declaration이 0개임을 확인해 `dotfiles-j8e6`을 unblock한다.

## Test scope

RED-GREEN seam은 `Deployment Job` Interface, merge-floor coverage, fetch timeout과 verify isolation이다.

- provider control CLI request/status/retry parsing, pending derivation, stale/malformed response rejection
- latest desired coalescing, running deploy 뒤 one follow-up deployment
- one deployed SHA가 여러 merge floor/Parent close를 cover
- unrelated/newer non-ancestor status가 close하지 않음
- Worker restart는 desired/status observation만 resume하고 deploy spawn 없음
- repo-level retry는 generation을 증가시키며 PR별 retry action 없음
- exact self deploy install/pointer/restart/health success와 idempotent same-SHA replay
- global runtime marker file writer/reader가 active code에서 없음
- verify command env가 isolated XDG/runtime/config root를 사용하고 shared path 무변경
- hung git fetch timeout, child cleanup, bounded retry, `base_inflight` clear
- managed modules/protocol/stages/UI strings의 active reference scan
- focused Worker/UI tests, `npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`, `npm run build`, `npm run all`

## Acceptance criteria

1. 정상 전환 뒤 `[머지]` 한 번으로 deployment request가 자동 제출되지만 effect는 external deployer만 수행한다.
2. repo 상단 deployment 상태와 실패 시 retry 하나만 있으며 PR별 deploy button은 없다.
3. latest deployed SHA가 포함하는 모든 merge floor가 한 번에 cleanup/close된다.
4. Worker restart와 beads-ui self restart가 deploy execution을 중단하거나 재생하지 않는다.
5. managed Reconciler/helper/journal/receipt/failure/runtime-marker active surface가 제거된다.
6. `UI-yjc2` marker 오염 경로가 사라지고 verify state isolation test가 통과한다.
7. `UI-9f54` hung fetch가 bounded timeout 뒤 종료되어 shared inflight를 해제한다.
8. live process path, port, HTTP 200, `/healthz.runtime.source_sha`, external status와 Bead Closure가 exact candidate에 정합한다.
9. 최초 breaking cutover는 old Worker의 verified candidate D를 installed `repo-deployctl`로 한 번만
   bootstrap하며 runtime outage나 managed declaration 잔재를 남기지 않는다.
