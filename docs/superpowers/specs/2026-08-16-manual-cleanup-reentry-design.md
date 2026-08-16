# needs_human cleanup 재진입과 post-merge SHA identity 수정 설계

## 문서 상태

- owning Bead: `UI-bwpk`
- route: `full_plan`
- workflow mode: `standard`
- 사용자 설계 승인: 2026-08-16
- 기준 브랜치/SHA: `main` / `308ba69cb0fe460a0c386919b8a2006241585ff7`
- cross-repo companion: Beads `beads-iov`

## 배경과 판정

durable queue에 남은 네 행을 현재 코드와 배포 상태에 대조한 결과, 과거 failure
reason 자체와 현재 행 고착 원인은 구분해야 한다.

| 행 | 과거 failure | 현재 코드 재현성 | 현재 상태 |
|---|---|---|---|
| `UI-f17c` | `verify_cmd_failed` | stale | 이미 Done이며 현재 `repo-ops/config.toml`에는 `[verify]`가 없다. legacy verify fallthrough writer는 제거됐다. |
| `UI-cfzq` | `repo_ops_fetch_failed` | stale | 이미 Done이며 deploy target을 별도로 fetch하던 경로는 제거됐다. 현재는 synced target SHA를 사용한다. |
| `dotfiles-3vb8` | `verify_candidate_mismatch` | failure reason은 stale, 고착은 재현 가능 | `pr_wait`, `cleanup_failed`, `completion_intent.phase=needs_human`가 남아 있다. 최신 successful deploy는 merge SHA를 descendant-cover한다. |
| `beads-yvf` | `verify_cmd_failed` | failure reason은 stale, 고착은 재현 가능 | `pr_wait`, `cleanup_failed`, `completion_intent.phase=needs_human`가 남아 있다. 현재 저장소에는 `repo-ops/config.toml`이 없다. |

`UI-f17c`와 `UI-cfzq`의 원래 producer는 현재 main에서 제거됐으므로 같은 입력으로
신규 failure를 만들지 않는다. 반면 나머지 두 행은 아래 두 active defect 때문에 현재
코드에서도 deterministic하게 고착된다.

1. UI의 `[정리 재개]`가 cleanup 전용 action이 아니라
   `worker-merge-queue-add`를 전송한다. merge queue driver는
   `completion_intent.phase !== merging`이면 의도적으로 중단하므로
   `needs_human` 행은 클릭해도 cleanup에 도달하지 않는다.
2. scheduler의 completion repair admission은 post-merge failure key의
   `subject_sha`를 completion intent의 pre-merge `head_sha`와 비교한다. merge SHA가
   별도로 존재하는 정상 intent에서도 두 값이 달라
   `completion_subject_sha_stale`를 만든다.

따라서 stale failure를 삭제하는 migration이 아니라, 이미 존재하는 canonical cleanup
entry를 명시적 mutation으로 연결하고 post-merge identity 비교를 바로잡아야 한다.

## 사용자 결과

1. `cleanup_failed`가 있는 `pr_wait` 행의 `[정리 재개]`는 merge queue에 넣지 않고
   멈춘 cleanup 단계부터 한 번 재실행한다.
2. stale UI snapshot의 클릭은 revision conflict로 거부되며 cleanup side effect를
   만들지 않는다.
3. cleanup이 성공하면 기존 closure choreography가 `cleanup_failed`, `pr_wait`,
   completion terminal reason을 정리하고 행을 Done으로 이동한다.
4. 현재 config에 `[verify]`가 없으면 manual cleanup은 verify command나 verify operation을
   새로 만들지 않는다.
5. post-merge completion repair는 merge SHA를 canonical subject로 사용해 정상 intent를
   stale로 오판하지 않는다.
6. 실제 failure가 다시 발생하면 삭제하거나 성공으로 위장하지 않고 현재 단계와 reason을
   durable evidence로 남긴다.

## 목표

1. cleanup retry를 위한 명시적 WebSocket mutation을 추가한다.
2. transport handler는 revision CAS와 payload validation만 소유하고 실제 cleanup은 기존
   `prActions.retryCleanup()`에 위임한다.
3. scheduler의 completion subject 비교를 merge-aware하게 수정한다.
4. no-verify, descendant deploy coverage, completion intent settlement를 실제 stranded row와
   같은 fixture로 고정한다.
5. 변경을 공유 beads-ui 서비스에 배포한 뒤 `dotfiles-3vb8`과 `beads-yvf`를 같은 UI action
   경로로 정리한다.

## 비목표

- queue load 시 stale-looking failure를 자동 삭제하는 migration
- startup sweeper 또는 background row cleanup
- cleanup을 merge queue나 자동 repair budget으로 다시 우회시키는 compatibility path
- `needs_human` authorization을 자동화하거나 재시도 횟수를 늘리는 변경
- `script_retry → auto_repair_session → user_triggered_session` 사다리 변경
- `[verify]`가 없는 저장소에서 legacy `postMergeVerify` 호출
- dotfiles source 또는 workflow 계약 어휘 변경
- Beads shard runner의 Bash portability 수정; 이는 `beads-iov`가 별도로 소유한다.
- `UI-f17c`와 `UI-cfzq`처럼 이미 Done인 행의 history 삭제

## 소유권과 영향 표면

### Canonical owner

cleanup 실행과 상태 전이는 `server/worker/pr-actions.js`의 기존
`retryCleanup()` / `runCleanup()` / `closeCoveredRow()` / `moveToDone()`가 소유한다.
새 handler에 cleanup step, deploy coverage, verify 판정 또는 Bead close 로직을 복제하지
않는다.

completion repair의 failure-key admission은 `server/worker/scheduler.js`가 소유한다.
이번 변경은 subject SHA 선택만 바로잡고 base SHA, result digest, active operation,
collision guard는 유지한다.

### Active consumers와 transport

- `app/views/worker/index.js`: `[정리 재개]` 클릭을 전용 mutation으로 전송
- `app/protocol.js`: 새 message type 등록
- `server/ws/connection.js`: authenticated dispatch 연결
- `server/ws/worker-handlers.js`: payload validation, revision CAS, reply/fanout
- `server/worker/attach.js`: workspace attachment에서 `prActions.retryCleanup()`을 노출하는
  얇은 adapter

### Runtime/generated copies와 checker

frontend source 변경은 `app/main.bundle.js`와 `app/main.bundle.js.map`에 함께 반영한다.
focused protocol/handler/UI/attachment/pr-actions/scheduler tests와 전체 tsc/test/lint/build가
active checker다. workflow contract와 durable JSON schema는 변경하지 않는다.

## 선택한 설계

### 1. 명시적 cleanup mutation

새 request type은 다음으로 고정한다.

```text
worker-cleanup-retry { bead_id, expected_revision }
```

`bead_id`는 non-empty string, `expected_revision`은 현재 queue revision이어야 한다.
workspace targeting과 authentication은 다른 Worker mutation과 같은 공통 경계를 사용한다.

handler는 action 전에 queue snapshot을 읽고 revision을 비교한다. mismatch면 다음 의미의
success envelope를 반환하고 즉시 종료한다.

```text
{
  bead_id,
  retried: false,
  conflict: true,
  pending: false,
  cleanup_step: null,
  reason: null,
  queue: <current decorated snapshot>
}
```

이 경로에서는 attachment lookup, `retryCleanup()`, queue write, repo operation 또는 Bead
mutation이 발생하지 않는다. client는 current snapshot을 adopt하며 자동으로 같은 cleanup
effect를 재전송하지 않는다. 사용자가 최신 상태에서 다시 명시적으로 클릭할 수 있다.

revision이 맞으면 attachment adapter를 통해 `prActions.retryCleanup(bead_id)`을 정확히 한 번
호출한다. reply는 다음 필드를 가진다.

```text
{
  bead_id,
  retried: <result.ok>,
  conflict: false,
  pending: <result.pending === true>,
  cleanup_step: <result.step || null>,
  reason: <result.ok ? null : result.reason || null>,
  queue: <latest decorated snapshot>
}
```

throw는 `retried:false`, `reason:error`로 축약하고 credential-bearing command output을 wire나
queue에 복사하지 않는다. outcome과 무관하게 latest snapshot을 reply하고 subscriber에
fanout해 closure 또는 새 failure를 즉시 반영한다.

UI는 cleanup retry 동안 해당 행의 버튼을 중복 제출하지 않도록 local pending state를
사용한다. `conflict`, `action_in_flight`, `not_in_pr_wait`, `cleanup_failed_missing`,
`no_attachment`와 실제 cleanup failure는 성공으로 표시하지 않는다.

### 2. canonical cleanup 재사용

`prActions.retryCleanup()`의 현재 계약을 바꾸지 않는다.

- 동일 bead action이 in-flight면 `action_in_flight`로 거부한다.
- row가 `pr_wait`가 아니거나 `cleanup_failed`가 없으면 fail closed한다.
- failure step이 `child_sweep`, `branch_cleanup`, `parent_close`면
  `closeCoveredRow(bead_id, true)`로 이어간다.
- 그 외 단계는 `runCleanup(bead_id)`을 호출해 현재 pinned config와 repo operation evidence를
  다시 판정한다.
- 별도 retry policy, budget, queue enrollment 또는 completion phase precondition을 추가하지
  않는다.

`runCleanup()`이 성공하면 기존 `moveToDone()`이 closure cursor를 끝내고 completion intent를
`completed`로 전환한다. 따라서 handler가 `cleanup_failed`, `pr_wait`, terminal reason 또는
completion intent를 직접 지우지 않는다.

cleanup이 실패하면 기존 `recordCleanupFailure()`가 현재 실행에서 관측한 exact step/reason을
덮어쓴다. 과거 `verify_cmd_failed`나 `verify_candidate_mismatch`를 무조건 보존하지도,
무조건 삭제하지도 않는다.

### 3. no-verify와 deploy coverage

manual retry도 기존 pinned-base config 해석을 그대로 사용한다.

- `[verify]`가 없으면 verify script path가 존재하지 않으므로 verify operation과 log를 만들지
  않는다.
- `[deploy]`가 있고 현재 successful deployed SHA가 merge SHA의 descendant면 기존
  `descendant_success_covers_ancestor_rows` evidence로 실제 재배포 없이 coverage를 채택한다.
- config가 없으면 verify/deploy 단계를 새로 발명하지 않고 남은 closure 단계로 진행한다.
- config가 malformed이거나 coverage/operation evidence가 부족하면 fail closed하고 current
  failure를 기록한다.

이 설계는 `dotfiles-3vb8`의 descendant deploy coverage와 `beads-yvf`의 no-config closure를
같은 canonical path로 처리한다.

### 4. post-merge subject identity

scheduler가 completion operation의 failure key를 intent와 비교할 때 expected subject는 다음
순서로 선택한다.

```text
intent.subject.merged_sha || intent.subject.head_sha
```

merge SHA가 존재하는 post-merge intent에서는 merge SHA가 canonical subject다. 아직 merge되지
않아 merge SHA가 없는 intent만 head SHA로 fallback한다. 선택된 expected subject가 존재하고
failure key와 다를 때에만 기존 `completion_subject_sha_stale`을 반환한다.

`base_sha`, `result_digest`, attempt identity, active operation collision과 completion root anchor
검사는 그대로 유지한다. 이 변경은 stale guard를 제거하는 것이 아니라 lifecycle phase에 맞는
SHA를 비교하도록 복원하는 것이다.

## 실패와 concurrency 처리

- stale revision: side effect 없이 current snapshot 반환
- action already in flight: 기존 per-bead action lock으로 거부
- missing attachment/row/failure: fail closed, durable row 임의 변경 없음
- verify/deploy/repo operation 실패: 현재 exact failure evidence 기록
- closure 후속 단계 실패: 성공한 척 Done으로 이동하지 않고 실패한 cursor에서 중단
- concurrent queue mutation after CAS: cleanup owner가 latest snapshot과 per-bead lock을 다시
  확인하며, reply는 action 종료 후 최신 snapshot을 사용
- process restart: 새 protocol 자체는 durable state를 추가하지 않는다. 기존 queue와 repo
  operation adoption 계약으로 다시 관측한다.

새 lock, rollback state, backup file 또는 synchronization database는 추가하지 않는다.

## Test scope

RED-GREEN seam은 다음으로 고정한다.

### UI와 protocol

- `[정리 재개]` 클릭이 `worker-cleanup-retry`와 current `expected_revision`을 전송하고
  `worker-merge-queue-add`를 전송하지 않는다.
- protocol request type과 authenticated connection dispatch가 새 mutation을 수용한다.
- duplicate click은 local pending 동안 두 번째 mutation을 만들지 않는다.

### Handler와 attachment

- stale `expected_revision`은 `conflict:true`와 current queue를 반환하며 attachment adapter와
  `prActions.retryCleanup()`을 호출하지 않는다.
- current revision은 adapter를 통해 canonical retry를 한 번만 호출하고 latest queue를 reply와
  fanout에 사용한다.
- no attachment와 thrown action은 fail-closed response로 남는다.

### Cleanup lifecycle

- `pr_wait + cleanup_failed + completion_intent.phase=needs_human` fixture에서 manual mutation이
  merge queue driver를 통하지 않고 cleanup을 실행해 Done, intent `completed`,
  `cleanup_failed`/`pr_wait` 제거에 도달한다.
- `[verify]`가 없는 fixture는 신규 verify repo operation, verify process 또는 verify log를
  만들지 않는다.
- successful deployed descendant coverage fixture는 deploy request를 재실행하지 않고 merge SHA
  coverage로 closure한다.
- 실제 cleanup failure fixture는 current step/reason을 남기고 Done으로 이동하지 않는다.
- 기존 merge queue driver는 `intent.phase !== merging`에서 계속 중단한다. manual mutation이
  이 guard를 약화시키지 않는다.

### Completion SHA

- intent의 `head_sha`와 `merged_sha`가 다른 post-merge fixture에서 failure key subject가 merge
  SHA면 admission이 성공한다.
- 같은 fixture에서 failure key가 neither merge nor fallback head이면
  `completion_subject_sha_stale`로 거부한다.
- merge SHA가 없는 pre-merge fixture는 head SHA 비교를 유지한다.
- base SHA와 digest mismatch regression test는 그대로 fail closed한다.

### Verification bundle

focused tests는 수정된 UI, protocol/connection/handler, attachment, pr-actions, scheduler seam을
직접 실행한다. pre-handoff에는 다음을 모두 수행한다.

```bash
node --version
npm ls --depth=0
npm run tsc
npm test
npm run lint
npm run prettier:write
npm run build
git diff --check
```

`prettier:write`와 build 이후 전체 diff를 다시 확인하고 generated bundle과 source가 같은
동작을 운반하는지 검증한다.

## Rollout과 durable row 정리

### Current-Bead Worker eligibility

beads-ui의 `[deploy]`는 merged service deployment와 restart를 커버하지만, 배포 뒤
`dotfiles-3vb8`과 `beads-yvf`에 보내야 하는 두 explicit cleanup mutation은 수행하지 않는다.
이 두 mutation과 durable readback은 현재 Bead에 남는 required no-PR residue다.

따라서 spec gate close 시 `UI-bwpk`에 `worker-ineligible`을 기록한다. shared runtime 배포와
두 행의 Done 수렴까지 모두 검증한 뒤에만 label을 제거한다. 이를 별도 background worker,
startup sweep 또는 deploy script 안의 cross-workspace mutation으로 바꾸지 않는다.

### 적용 순서

1. non-empty PR을 만들고 현재 head에 결속된 required review receipts를 기록한다.
2. `pr-finish`로 merge한 뒤 repo operation이 terminal success에 도달할 때까지 기다린다.
3. 공유 detached deploy worktree가 merged SHA를 포함하는지 확인하고 `bdui-shared restart` 후
   process path, listening port, HTTP response를 검증한다.
4. active repo operation이 없는 시점에 실제 UI mutation으로 `dotfiles-3vb8`과
   `beads-yvf`를 각각 한 번 재시도한다.
5. 각 workspace에서 retry 전후 repo operation/log inventory를 비교해 새 verify operation과
   verify log가 없음을 확인한다.
6. `dotfiles-3vb8`은 latest successful deploy SHA가 merge SHA를 포함한다는 ancestry evidence를
   확인한다.
7. 두 행 모두 `cleanup_failed`와 `pr_wait`에서 사라지고 Done으로 이동하며 completion intent가
   completed인지 durable `queue.json`과 Beads readback으로 확인한다.

`UI-f17c`와 `UI-cfzq`는 이미 Done이므로 mutation을 재실행하지 않는다. 새 verify/fetch failure가
생기지 않았다는 현재 evidence와 회귀 test로 stale 판정을 마감한다.

## 완료 조건

1. `[정리 재개]`가 merge queue가 아닌 명시적 CAS-protected cleanup mutation을 사용한다.
2. transport에 cleanup logic이 복제되지 않고 canonical `retryCleanup()`이 실행된다.
3. post-merge completion admission이 merge SHA를 사용하며 다른 stale guards는 유지된다.
4. no-verify와 descendant coverage가 focused tests에서 증명된다.
5. 전체 validation과 shared runtime deployment가 통과한다.
6. `dotfiles-3vb8`과 `beads-yvf`가 새 verify log 없이 Done으로 수렴한다.
