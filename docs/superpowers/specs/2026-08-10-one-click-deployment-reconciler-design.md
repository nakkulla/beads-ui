# 머지 클릭 Deployment Reconciler 설계

## 상태

- 사용자 설계 승인: 2026-08-10
- owning Bead: `UI-16ep`
- consumer unit: dotfiles `dotfiles-we2r`
- consumer spec: dotfiles `docs/superpowers/specs/2026-08-10-managed-deployment-source-design.md`
- 발견 계기: dotfiles `dotfiles-ur52` PR #362 post-merge cleanup

## 문제

현재 `[머지]` cleanup은 `base_sync → post_merge_verify → deploy → close` 순서다.
`syncBase`는 사용자 작업을 보존하기 위해 dirty/other-branch checkout을 fetch-only 성공으로
처리하고, `postMergeVerify`는 fetched SHA를 detached worktree에서 정확히 검증한다. 그러나
`runDeploy`는 같은 shared checkout이 target branch이고 clean하며 `HEAD == verified SHA`일
것을 다시 요구한다.

두 Interface가 같은 성공을 다르게 정의한다.

- base sync Interface: fetched candidate를 검증할 수 있으면 성공
- deploy Interface: shared checkout 자체가 exact candidate여야 성공

dotfiles처럼 shared `main`이 artifact publication에 계속 사용되는 repo에서는 검증 도중
HEAD가 전진하는 것이 정상이다. 실제 retry에서도 candidate `61c0584f...` 검증 중
`main`이 `5a3e3328...`로 전진해 `head_not_base_sha`가 발생했다. 사용자는 PR을 이미
머지했지만 Bead가 `resolved`에 남고 cleanup을 반복해야 한다.

## 사용자 결과

`[머지]` 한 번으로 다음을 완료한다.

1. PR merge
2. 클릭한 PR merge SHA를 포함하는 candidate의 exact verify
3. repo Adapter가 계산한 required deployment와 readback
4. child/branch cleanup
5. Parent Bead close

검증·배포 candidate가 클릭 PR merge SHA를 포함하면 그 사이 remote base가 더 전진해도
해당 Bead를 닫는다. 새 tip은 다음 reconcile이 맡는다.

## 목표

1. shared checkout concurrency를 cleanup failure가 아니라 정상 입력으로 취급한다.
2. exact candidate verification과 exact candidate deployment evidence를 유지한다.
3. 사용자가 full/light를 선택하지 않아도 repo Adapter가 required action을 계산한다.
4. Worker restart와 같은 transient interruption은 durable state에서 자동 resume한다.
5. 실제 verify/deploy/readback failure만 banner와 `cleanup_failed`에 남긴다.
6. 기존 workspace/detached deploy Adapter는 호환한다.

## 비목표

- shared checkout 자동 stash/reset/commit
- 최신 remote tip이 멈출 때까지 catch-up loop
- 장시간 artifact publication lock 보유
- verify red나 deploy command failure를 성공으로 숨김
- operator-only restart 정책 변경

## Architecture

### Deep Module: Deployment Reconciler

새 Module의 Interface는 다음 의미를 가진다.

```text
reconcile(repo, target_base, merged_floor_sha) -> deployment_receipt
```

caller는 merge floor만 제공한다. candidate pin, verification, Adapter 선택, deployment,
readback, marker/receipt, resume는 Reconciler Implementation 뒤에 숨긴다. 기존처럼 caller가
`syncBase` outcome과 `runDeploy`의 숨은 precondition을 연결하지 않는다.

Reconciler에는 현재 두 Adapter가 존재하므로 seam이 실제다.

- workspace Adapter: 기존 repo-local checkout deploy, backward compatibility
- managed Adapter: deploy-owned source에서 exact candidate deploy
- detached terminal launch는 기존 self-restart 예외를 유지하되 같은 receipt semantics에
  맞춘다.

### Canonical Adapter protocol

beads-ui가 이 protocol과 receipt schema의 canonical owner다. target repo declaration은
사용자별 full/light가 아니라 repo-level Adapter capability를 고정한다.

managed Adapter spawn에는 다음 값을 전달한다.

- source repo absolute path
- resolved target remote/base
- merged floor 40-hex SHA `M`
- pinned candidate 40-hex SHA `D`
- candidate release absolute path
- worker-owned receipt path
- reconcile attempt ID

managed declaration은 repo-level `adapter = "managed"` capability와 candidate release
기준 relative command argv를 제공한다. Reconciler는 shell interpolation 없이 candidate
release를 cwd로 argv/env를 spawn하며 secret 값은 전달하지 않는다. 기존 workspace Adapter의
PATH 기반 argv 의미는 바꾸지 않는다.

managed candidate source는 XDG data home 아래 Worker-owned standalone checkout이다.
`XDG_DATA_HOME`이 비어 있으면 `~/.local/share`를 사용한다.

```text
$XDG_DATA_HOME/bdui/deploy/<repo-id>/
  releases/<candidate-sha>/
  current
```

Reconciler가 resolved remote에서 `D`를 fetch해 독립 checkout을 만들고 `HEAD == D`, clean
status, remote identity를 확인한 뒤 candidate declaration의 Adapter를 실행한다. release는
target Adapter receipt가 live runtime source 참조를 해제했다고 증명하기 전에는 제거하지
않는다. 이 구조는 candidate에 새 Adapter와 declaration이 함께 처음 도입되는 rollout도
installed old Adapter 없이 bootstrap한다.

receipt는 worker-owned path에 원자적으로 기록하며 stdout prose를 authority로 해석하지 않는다.

receipt v1 필수 필드:

- protocol version, repo identity, target remote/base
- attempt ID, merged floor SHA, candidate SHA
- verify binding 또는 Reconciler verify receipt reference
- previous/deployed marker
- action plan digest와 action outcomes
- deployment source identity/HEAD
- exact readback result
- terminal outcome과 timestamp

Worker는 receipt의 attempt/repo/floor/candidate binding과 terminal success를 모두 확인해야
다음 cleanup 단계로 진행한다.

### Candidate와 completion floor

Reconciler는 lease 획득 후 remote target base를 fetch해 candidate `D`를 한 번 pin한다.

- `M`이 `D`의 ancestor가 아니면 merge/source identity failure다.
- `D`는 run 도중 바뀌지 않는다.
- remote가 `D+1`로 전진해도 현재 run은 `D`를 verify/deploy/readback한다.
- deployed marker가 이미 `M`을 포함하는 성공 receipt를 가리키면 idempotent no-op이다.
- 여러 pending floor가 `D`에 포함되면 하나의 receipt를 각 cleanup에서 재사용할 수 있다.

이 의미는 continuously moving base에서 starvation을 없애면서 클릭 PR의 Bead Closure evidence를
정확히 만든다.

### Per-repo single-writer lease

같은 repo의 Reconciler는 하나만 candidate deployment를 수행한다.

- lease는 artifact publish lock과 별개다. shared main publisher를 장시간 막지 않는다.
- 뒤 merge는 durable queue에서 기다리고 앞 receipt가 자기 floor도 포함하는지 먼저 확인한다.
- process가 죽으면 lease는 회수되고 terminal receipt가 없는 attempt를 resume한다.
- lease state, candidate, floor set, stage, receipt path를 queue store에 원자적으로 보존한다.

### Cleanup integration

새 순서:

```text
merge
  -> reconcile_queued
  -> candidate_pinned(D)
  -> post_merge_verify(D)
  -> adapter_deploy(D)
  -> exact_readback(D)
  -> child_sweep
  -> branch_cleanup
  -> parent_close
  -> final_readback
```

기존 `syncBase`의 human convenience fast-forward는 deployment authority에서 분리한다. shared
checkout을 clean하게 fast-forward할 수 있으면 별도 best-effort outcome으로 보고할 수 있지만,
그 실패나 fetch-only outcome은 managed Adapter cleanup을 막지 않는다.

## 상태와 UI

queue store는 repo별 reconcile record를 durable하게 보존한다.

- `merged_floor_sha`
- `candidate_sha`
- `stage`: queued/pinned/verifying/deploying/readback/complete/failed
- Adapter kind와 attempt ID
- receipt path/digest
- retry count와 last retryable reason
- terminal failure code/detail

PR 대기 카드는 정상 단계에서 `정리 중 · 검증`, `정리 중 · 배포`, `정리 중 · readback`을
표시한다. `checkout_dirty`, `checkout_not_on_base`, `head_not_base_sha`는 managed Adapter의
failure vocabulary에서 제거한다. 사용자가 선택할 full/light UI는 추가하지 않는다.

## 오류와 retry

자동 retry/resume:

- per-repo lease 대기
- Worker process restart
- candidate materialization 전 fetch/spawn의 transient failure
- terminal receipt가 없는 idempotent Adapter interruption

실제 blocker:

- merged floor가 candidate history에 없음
- required post-merge verification red
- Adapter terminal failure
- candidate/attempt/repo binding이 틀린 receipt
- exact deployed marker/source/readback 불일치
- credential 또는 source-of-truth conflict

실제 blocker만 `cleanup_failed`에 기록하며 Parent Bead는 `resolved`에 남는다. retryable state는
failure banner를 만들지 않고 queue 단계로 남긴다. lease 대기와 process restart resume는
attempt budget을 소비하지 않는다. fetch/spawn transient failure는 같은 candidate에서 최대
3회 bounded backoff로 재시도하고, 세 번째 실패 뒤 terminal infrastructure failure로 전환해
attempt evidence를 보존한다.

## Backward compatibility

- declaration에 managed capability가 없는 repo는 기존 workspace Adapter를 사용한다.
- 기존 `detached=true` self-restart terminal launch를 유지한다.
- 기존 deploy output/log 보존과 `last_deploy` readback은 receipt를 보강하는 방식으로 유지한다.
- legacy `cleanup_failed(deploy_base_not_synced)` record는 UI에서 계속 읽을 수 있으나 새 managed
  attempt가 시작되면 current stage/receipt가 authority다.

## Cross-repo rollout

1. provider `UI-16ep`가 protocol·Reconciler·queue/UI와 fake managed Adapter integration을
   구현·land·deploy한다.
2. consumer `dotfiles-we2r`가 candidate-local managed Adapter와 declaration을 구현한다.
3. dotfiles merge candidate의 새 Adapter가 같은 candidate release에서 처음 실행되어 runtime
   source를 managed release로 이관한다.
4. `dotfiles-ur52` cleanup을 재실행한다.
5. candidate receipt가 PR #362 merge SHA를 포함하고 Parent Bead가 `closed`가 되는지 확인한다.

consumer `dotfiles-we2r`가 provider Bead `UI-16ep`에 foreign `blocks` dependency를 가진다.
provider가 먼저 land해야 candidate-local managed Adapter protocol을 안전하게 활성화할 수 있다.

## Test scope

RED-GREEN seam은 `Deployment Reconciler` Interface와 managed Adapter receipt binding이다.

- `server/worker/pr-actions.test.js`
  - dirty/not-on-base shared checkout에서도 managed reconcile 성공
  - verify 중 shared main이 전진해도 pinned `D`로 성공·close
  - floor `M` ancestry와 deployed marker containment
  - workspace Adapter 기존 guard 회귀
- Reconciler/queue store tests
  - per-repo single writer, pending floor coalescing
  - crash/restart resume와 terminal receipt idempotency
  - retryable vs terminal failure state
  - receipt attempt/repo/floor/candidate binding 거부
- real git integration fixture
  - dirty shared checkout + 독립 deploy source
  - candidate `D` verify 중 source `main`을 `D+1`로 전진
  - deployed marker `D`, clicked floor 포함, shared checkout 무변경
  - candidate에 처음 추가된 relative Adapter entry를 installed old command 없이 실행
- UI tests
  - progress stages
  - actual failure만 banner
  - managed lane에서 retired checkout guard detail 미표시

## Acceptance criteria

1. `[머지]` 클릭 후 shared checkout dirt나 HEAD drift를 사람이 정리하지 않아도 된다.
2. 클릭 PR merge SHA `M`을 포함하는 candidate `D`가 verify/deploy/readback되면 remote가 더
   전진해도 Parent Bead가 닫힌다.
3. verification과 deployment receipt가 같은 exact `D`에 bind된다.
4. managed Adapter run은 shared checkout을 변경하지 않는다.
5. full/light는 internal action plan이며 사용자 선택지가 아니다.
6. Worker restart 후 같은 attempt가 durable state에서 자동 resume된다.
7. verify/deploy/readback의 실제 실패는 marker/Bead close를 전진시키지 않는다.
8. fake managed Adapter를 사용한 provider integration에서 merge floor를 포함하는 exact
   receipt로 child/branch/Parent close가 완료된다. 실제 dotfiles rollout acceptance는
   consumer `dotfiles-we2r`가 소유한다.
