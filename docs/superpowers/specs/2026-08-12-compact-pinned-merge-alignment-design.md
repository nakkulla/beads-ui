# Beads UI compact pinned-head merge 정합 설계

## 상태

- 설계 승인: 2026-08-12
- route: `spec_backed`
- owning Bead: `UI-x7fi`
- canonical provider: dotfiles `dotfiles-b2yx`
- prerequisites: `UI-lb58`, `UI-f17c`, `dotfiles-b2yx`
- provenance: `UI-lbqw` delivery에서 반복된 base chase·reverification
- 기존 `UI-lb58`, `UI-f17c` spec/plan은 변경하지 않는다.

## 문제

현재 `[머지]`는 PR이 `BEHIND`이면 `gh pr update-branch`로 base를 feature branch에
merge하고 새 head에 gate와 verification을 다시 수행한다. 병렬 작업으로 `main`이 자주
전진하면 conflict가 없어도 reviewed head가 바뀌고 verification이 반복된다. 구현 session이
review 뒤 base를 다시 통합하는 행동과 결합하면 PR Delivery가 끝나지 않는 base-chase loop가
된다.

반대로 `DIRTY`는 clean merge가 불가능하므로 아무 통합 없이 squash merge할 수 없다.
`BEHIND`와 `DIRTY`를 같은 “base 최신화” 문제로 다루지 않고, fast merge와 conflict
resolution의 소유권을 분리해야 한다.

`UI-lb58`은 deployment effect를 repo-level external job으로 전환하고 `UI-f17c`는 PR부터
post-merge completion까지 root intent continuity를 제공한다. 이 후속은 두 Module을 대체하지
않고 최종 코드 위에서 merge decision과 handoff만 정합한다.

## 사용자 결과

1. `[머지]` 한 번 또는 `auto_merge=true`로 clean/behind PR이 base update 없이 빠르게 머지된다.
2. 실제 conflict일 때만 기존 completion resolver가 자동으로 한 번 해결하고 같은 root intent를
   재개한다.
3. pending/no-check PR을 기다리지 않으며 known-red, draft, stale head/base는 차단한다.
4. merge 뒤 deployment와 cleanup은 `UI-lb58`/`UI-f17c`의 기존 durable state를 그대로 사용한다.

## 목표

1. `[머지]`와 worker-owned `auto_merge`를 한 pure merge-decision function에 결합한다.
2. `BEHIND`에서 `updateBranch`와 second gate/verify를 제거한다.
3. `DIRTY`에서 기존 conflict-resolution completion operation을 정확히 한 번 dispatch/adopt한다.
4. worker-owned PR의 implementation receipt를 exact head와 결합해 fast local verification을 제거한다.
5. GitHub pinned merge와 MERGED readback, existing completion/deployment cursor를 유지한다.

## 비목표

- `UI-lb58` deployment job 또는 `UI-f17c` completion schema 재설계
- 기존 승인 spec/plan 수정
- `pr-finish --review` 구현
- GitHub branch protection 우회, auto-merge 설정, force push, rebase
- 외부 PR에 workflow receipt를 새로 요구
- 새 PR별 deploy action 또는 second cleanup saga

## 선행 조건과 issue 경계

`UI-x7fi` implementation worktree는 다음 세 Bead가 close된 final `main`에서만 만든다.

1. `UI-lb58`: external deployment job, repo-level deployment state와 post-merge cursor
2. `UI-f17c`: single completion authority, durable conflict/repair session continuity
3. `dotfiles-b2yx`: canonical fast decision과 post-merge ownership contract

함수명과 schema는 landed code에서 재탐색하되 의미를 복제하지 않는다. 이 spec은 merge
eligibility와 handoff adapter만 소유한다. prerequisite의 public semantics가 이 문서와 다르면
구현 전에 spec을 다시 검토하며, historical artifact를 backfill하지 않는다.

## Architecture

### Pure merge decision

authoritative observation을 받아 mutation 없이 action을 반환하는 한 function을 둔다.

```text
decideFastMerge({
  pr_state, is_draft, base_ref, expected_base,
  head_sha, expected_head_sha,
  merge_state, checks,
  ownership, impl_receipt
})
  -> merge_pinned
   | resolve_conflict
   | wait_remote_policy
   | refuse(reason)
```

`[머지]`와 `auto_merge`는 같은 decision을 호출한다. UI click은 authorization source이고
completion intent는 automatic authorization source일 뿐 safety semantics는 동일하다. queue는
결정 결과를 durable operation으로 prerecord한 뒤 기존 driver를 호출한다.

### Decision table

| 관측 | 결과 |
| --- | --- |
| OPEN, non-draft, correct base/head, `CLEAN`, no known red | `merge_pinned` |
| 위와 같고 `BEHIND` | `merge_pinned` |
| fresh observation에서도 `DIRTY`/conflicting | `resolve_conflict` |
| mergeability `UNKNOWN`/missing/error | `refuse(mergeability_undecidable)` |
| draft | `refuse(pr_draft)` |
| base mismatch | `refuse(base_mismatch)` |
| head drift | `refuse(head_drift)` |
| known red | `refuse(ci_failed:<conclusion>)` |
| pending/queued/in_progress/missing/skipped checks | merge eligibility 유지 |
| GitHub가 unfinished required checks로 merge 거절 | `wait_remote_policy` |

`BEHIND`는 base tip drift이지 conflict가 아니다. `gh.updateBranch`를 호출하지 않고 최초
gate가 승인한 exact head를 `gh.mergeSquash(..., head_sha)`에 전달한다. branch가 merge command
사이에 바뀌면 `--match-head-commit`이 거절하고 다음 driver pass가 새 head를 다시 판정한다.

### Receipt-bound worker-owned fast path

worker-owned PR에는 current parent의 `impl_review` receipt와 follow-up self-review lineage가
있다. receipt가 `reviewer@<head>` 또는 `self@<head>`이고 current PR head와 exact match할 때
fast path는 그 head를 implementation-gated로 취급한다. `skipped@<head>`는 workflow가 허용한
진행 authority이지만 review evidence로 승격하지 않는다. canonical contract가 worker merge에
요구하는 정확한 eligibility를 그대로 따른다.

receipt가 absent, malformed, stale하거나 parent를 한 개로 결합할 수 없으면 worker-owned
auto path는 fail closed한다. explicit external row의 human `[머지]`는 기존 human-authorized
pinned merge semantics를 유지하며 가짜 receipt를 만들지 않는다.

Fast gate는 current head를 위해 local `[verify]` command를 새로 실행하지 않는다. pending/no-CI를
local verify tier로 바꾸지 않고 GitHub pinned merge에 넘긴다. known red는 그대로 차단한다.

### DIRTY conflict handoff

`DIRTY` 관측 직후 한 번 fresh PR/base/head observation을 수행한다. 동일 head/base에서 여전히
DIRTY이면 merge command와 `updateBranch`는 0회이고 `UI-f17c` completion coordinator의 기존
conflict-resolution operation을 dispatch하거나 이미 prerecord된 operation을 adopt한다.

resolver packet은 root/subject Bead, exact head, target base, failure key와 owned worktree를
결합한다. resolver는 fetched latest target base를 feature branch에 merge commit으로 한 번
통합하고 semantic conflict를 해결한다. rebase와 force push는 금지한다. relevant tests,
controller self-review, receipt freshness, push가 모두 끝나야 root intent가 merge queue에
재진입한다.

resolution 중 base가 다시 전진해도 GitHub가 `CLEAN|BEHIND`이면 추가 integration 없이 pinned
merge한다. 다시 DIRTY이면 같은 failure key/op/session을 resume하며 duplicate resolver 또는 새
budget을 만들지 않는다.

### Remote policy rejection

`gh pr merge --match-head-commit` nonzero를 문자열 추측만으로 branch update로 전환하지 않는다.
PR/head/base/check를 authoritative하게 다시 읽는다.

- head/base drift 또는 DIRTY: 해당 decision으로 돌아간다.
- current head의 required check가 pending: durable `remote_policy_requires_checks`로 대기한다.
- known red/draft/closed: exact refusal로 terminalize한다.
- outcome undecidable: `merge_unconfirmed`/needs-human evidence를 남기고 duplicate merge를 금지한다.

remote policy wait는 `updateBranch`, review mode, local verify loop를 자동 시작하지 않는다.

## Queue와 completion ownership

queue head는 merge mutual exclusion만 소유한다. `BEHIND` branch update와 second verification이
사라져 한 driver pass는 observation → decision → pinned command → merged readback으로 제한된다.

`merge_unconfirmed`이면 queue/root operation을 보존하고 poller가 authoritative MERGED를 관측할
때까지 cleanup을 시작하지 않는다. MERGED를 확인하면 `UI-f17c` root completion cursor가
`UI-lb58`의 shared tail을 한 번 실행한다.

```text
base_sync
  -> post_merge_verify
  -> external deployment request/status
  -> child_sweep
  -> branch_cleanup
  -> parent_close
  -> final_readback
```

click handler, poller, startup recovery가 각각 새 cleanup을 만들지 않는다. 같은 root/merge SHA에
existing cursor가 있으면 resume하고 terminal이면 evidenced no-op한다.

## UI

새 visual vocabulary는 만들지 않는다. 기존 badge/style을 재사용한다.

- mergeable `BEHIND`: blocker 대신 `base 변경 · 머지 가능` advisory
- `DIRTY`: `충돌 해결 중` 또는 existing completion recovery primary state
- remote policy pending: current check progress
- known red/draft/base mismatch: existing refused/error display

사용자에게 update-branch나 재검증 반복을 별도 progress step으로 노출하지 않는다. 해당 effect가
더 이상 존재하지 않기 때문이다.

## 오류 처리

- observation error/UNKNOWN: mutation 0회, fail closed
- head changes before command: pinned command refusal, next pass re-observe
- merge command success but PR OPEN: cleanup 0회, `merge_unconfirmed`
- DIRTY resolver crash: same completion op/session adopt
- resolver success but receipt stale: merge queue 복귀 금지
- pending required remote check: slot을 점유하지 않고 poll demand만 유지
- post-merge verify/deploy failure: merge 유지, existing root cursor에서 recovery/resume
- malformed completion/deployment binding: 새 saga를 추측 생성하지 않고 existing needs-human policy

## Test scope

RED-GREEN seam은 pure decision, queue effect count, existing resolver/deployment integration이다.

1. `CLEAN|BEHIND` × click/auto_merge가 같은 `merge_pinned`을 반환한다.
2. `BEHIND`에서 `gh.updateBranch` 0회, second gate 0회, local verify 0회다.
3. pending/missing/skipped/no-check에서 pinned merge를 시도하고 known red는 0회다.
4. draft/base mismatch/head drift/UNKNOWN이 fail closed한다.
5. worker-owned current receipt exact match/stale/malformed/ambiguous parent matrix가 정확히 갈린다.
6. fresh DIRTY가 merge command 0회, resolver prerecord/dispatch 1회이며 restart가 같은 op를 adopt한다.
7. conflict merge commit 뒤 verification/self-review/receipt가 하나라도 없으면 재큐잉하지 않는다.
8. resolution 뒤 BEHIND는 추가 update 없이 merge하고, 재-DIRTY는 same lineage를 resume한다.
9. pinned merge race와 remote-policy rejection이 branch update/review/local-verify loop를 만들지 않는다.
10. MERGED readback 전 cleanup 0회, 이후 deployment request와 parent close가 logical 1회다.
11. poller/startup/click이 same post-merge cursor를 resume하고 duplicate deploy/close가 없다.
12. existing UI snapshot/bundle이 advisory/conflict/policy 상태를 같은 semantics로 표시한다.

Focused verification은 landed file layout에 맞춰 최소한 다음 active suites를 포함한다.

```text
merge decision/gate tests
pr-actions tests
merge-queue and auto-merge tests
completion-intent conflict/restart tests
deployment-job and post-merge cleanup tests
Worker UI tests
tsc, lint, prettier, build, full test
```

## Rollout

1. `UI-lb58`, `UI-f17c`, `dotfiles-b2yx` close와 installed runtime readback을 확인한다.
2. final main에서 exact consumer seam과 historical `updateBranch` callers를 다시 map한다.
3. pure decision을 먼저 도입하고 click/auto path를 같은 function에 연결한다.
4. `BEHIND` update/reverify branch를 제거하고 DIRTY를 existing completion resolver에 연결한다.
5. focused/full regression과 generated bundle을 검증해 PR Delivery한다.
6. canonical fast path로 이 PR 자체를 merge하고 shared post-merge tail/runtime readback을 확인한다.

## Acceptance criteria

1. `[머지]`와 `auto_merge`는 `BEHIND`에서 update-branch 없이 exact head를 pinned squash한다.
2. fast path는 feedback/AI review/local full verification을 실행하지 않는다.
3. `DIRTY`만 existing resolver가 merge commit으로 통합하며 duplicate resolution이 없다.
4. known red, draft, base mismatch, head drift, unknown mergeability는 차단된다.
5. pending/missing checks는 기다리지 않고 remote policy 거절만 durable wait로 남는다.
6. resolver 결과는 verification과 controller self-review/receipt freshness 뒤에만 재머지된다.
7. `UI-lb58` deployment job과 `UI-f17c` completion cursor가 post-merge tail을 logical 1회 수행한다.
8. 기존 승인 spec/plan bytes와 receipts는 변경되지 않는다.
