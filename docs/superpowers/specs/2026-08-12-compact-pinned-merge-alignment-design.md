# Beads UI compact pinned-head merge와 선택 검증 정합 설계

## 상태

- 최초 설계 승인: 2026-08-12
- 사용자 재설계 승인: 2026-08-13
- route: `spec_backed`
- owning Bead: `UI-x7fi`
- canonical provider: dotfiles `dotfiles-b2yx`
- runtime signal provider: beads-ui `UI-vobi`
- other prerequisites: `UI-lb58`, `UI-f17c`, `UI-lbqw` close
- implementation entry: `dotfiles-b2yx`와 `UI-vobi` close 뒤 final `main`

이 개정은 기존 pinned-head merge, `BEHIND`/`DIRTY` 분리와 single post-merge owner 결정을
보존한다. 바뀌는 것은 merge decision이 받는 verification signal이다. `UI-x7fi`는
`repo-ops.toml`을 다시 parse하거나 no-check를 local verify fallback으로 바꾸지 않고,
`UI-vobi`가 canonical declaration에서 만든 normalized CI/local signal만 소비한다.

## 문제

현재 `[머지]`는 `BEHIND`이면 `gh pr update-branch`로 feature head를 바꾸고 gate와 local verify를
다시 실행한다. 병렬 `main` 전진이 많을수록 implementation receipt와 verification result가
반복해서 stale해진다. 실제 conflict가 없는 base drift 때문에 PR Delivery와 merge가 base-chase
loop에 빠진다.

기존 이 spec은 이를 고치면서도 다음 가정을 담고 있었다.

1. repository마다 required-check allowlist가 항상 존재한다.
2. no-check/pending CI는 local `[verify]` tier로 대체할 수 있다.
3. post-merge tail은 항상 `post_merge_verify` command를 실행한다.
4. `mergeStateStatus=UNSTABLE` 자체가 required CI red다.

새 canonical contract에서는 이 네 가정이 모두 틀리다. `[ci]`는 실제 GitHub checks를 쓰는
repository만 선언하고, local pre/post verify는 각각 explicit boolean이 true일 때만 실행한다.
`[ci]` absence와 local off는 오류가 아니며, post local off는 exact SHA `declared_none` evidence를
남긴다. 따라서 merge adapter도 separated signals를 그대로 보존해야 한다.

## 사용자 결과

1. `[머지]`와 `auto_merge`는 clean/behind PR을 branch update 없이 exact head로 빠르게 merge한다.
2. actual `DIRTY|CONFLICTING`에서만 existing conflict resolver를 한 번 dispatch/adopt한다.
3. `[ci]`가 있는 repository만 declared check의 known red를 차단한다.
4. `[ci]`가 없으면 checks API 결과나 `UNSTABLE`만으로 CI error를 만들지 않는다.
5. local pre verify는 `pre_merge=true`일 때만 별도 required predicate다.
6. current beads-ui의 `[ci]` absence, local pre/post false를 정상 merge/deploy policy로 소비한다.
7. merge 뒤 `local_pass|declared_none` disposition과 external deployment/completion cursor를 한
   logical owner가 재사용한다.

## 목표

1. click과 auto path가 한 pure merge-decision function을 사용한다.
2. `BEHIND` update-branch와 second gate/verification을 제거한다.
3. `DIRTY`만 existing completion resolver로 handoff한다.
4. normalized CI와 local-pre signal을 독립 predicate로 평가한다.
5. checks absence를 local command activation으로 해석하지 않는다.
6. pinned merge/MERGED readback 뒤 `UI-f17c` completion cursor와 `UI-lb58` deployment job을
   claim/adopt한다.
7. post tail에서 verification disposition을 deploy와 분리해 보존한다.

## 비목표

- `repo-ops.toml` schema/parser/cache 재구현 (`dotfiles-b2yx`, `UI-vobi` 소유)
- local verify process runner나 retry/baseline policy 재설계 (`UI-vobi` 소유)
- deployment provider protocol/completion store schema 재설계 (`UI-lb58`, `UI-f17c` 소유)
- GitHub branch protection 우회, force push, rebase, auto-retarget
- `pr-finish --review`의 feedback/AI-review choreography 축소
- advisory workflow result 수집·retry·baseline/debug/repair
- 외부 PR에 workflow receipt를 새로 요구
- historical cleanup failure/log 삭제

## Prerequisite contract

### dotfiles `dotfiles-b2yx`

Canonical declaration과 closure semantics를 제공한다.

```toml
[ci]
required_checks = ["stable_check_name"]

[verify]
pre_merge = false
post_merge = false
```

`[ci]`와 `[verify]` absence는 각각 no-CI와 local off다. Active local phase만 `cmd`/timeout을
가진다. Post local off는 exact SHA `verification_disposition=declared_none`을 기록한다.

### beads-ui `UI-vobi`

Pinned declaration을 resolve하고 다음 normalized signal을 제공한다.

```text
ci:
  mode = off | declared | invalid
  state = off | success | known_red | pending_or_missing | invalid

local_pre:
  mode = off | declared | invalid
  state = off | success | failed | pending | missing | stale | invalid
  head_sha = <40-hex | null>
```

`UI-x7fi`는 이 object와 observation binding만 받는다. Declaration blob을 읽거나 check name을
filter하거나 local process를 실행하지 않는다.

Current beads-ui final declaration은 `[ci]` absent와 `[verify]
pre_merge=false, post_merge=false`다. 따라서 normalized result는 `ci=off`, `local_pre=off`이며
이는 verified implementation receipt를 가진 worker-owned PR의 fast merge를 차단하지 않는다.

## Architecture

### Pure merge decision

한 authoritative observation을 mutation 없이 한 action으로 환원한다.

```text
decideFastMerge({
  pr_state, merge_commit_sha, is_draft,
  base_ref, expected_base,
  head_sha, expected_head_sha,
  mergeable, merge_state,
  verification_signals,
  ownership, impl_receipt
})
  -> merge_pinned
   | resolve_conflict
   | wait_local_pre
   | wait_remote_policy
   | wait_merge_confirmation
   | claim_or_adopt_post_merge
   | refuse(reason)
```

Click과 auto path는 같은 decision을 호출한다. Click은 human authorization, completion intent는
automatic authorization source일 뿐 safety predicate는 동일하다. Queue는 outcome을 durable
operation에 prerecord한 뒤 기존 merge driver를 호출한다.

### Decision priority

한 observation은 다음 순서를 정확히 한 번 통과해 한 outcome만 만든다.

1. PR state를 판정한다.
   - `MERGED` + exact merge SHA → `claim_or_adopt_post_merge`
   - `MERGED` + missing SHA → `wait_merge_confirmation`
   - `CLOSED` → `refuse(pr_closed_unmerged)`
2. draft/`DRAFT`, base mismatch, missing/stale head를 fail closed한다.
3. `mergeable=UNKNOWN` 또는 `merge_state=UNKNOWN`을
   `refuse(mergeability_undecidable)`로 보낸다.
4. `mergeable=CONFLICTING` 또는 `merge_state=DIRTY`이면 verification signals보다 먼저
   `resolve_conflict`다. 동일 conflict에 CI/local repair를 중복 생성하지 않는다.
5. `ci.mode=invalid` 또는 `local_pre.mode|state=invalid`를 declaration failure로 거부한다.
6. enabled local pre signal이 current head에 bound되지 않았으면 다음처럼 처리한다.
   - `failed` → `refuse(local_pre_failed)`
   - `pending|missing|stale` → `wait_local_pre`
7. declared CI `known_red`만 `refuse(ci_failed:<conclusion>)`다.
8. `merge_state=BLOCKED`는 branch를 갱신하지 않고 `wait_remote_policy`다.
9. 남은 `CLEAN|BEHIND|HAS_HOOKS|UNSTABLE`에서 CI `off|success|pending_or_missing`와
   local pre `off|success`는 `merge_pinned`이다.

`UNSTABLE`은 undeclared check, pending check 또는 advisory workflow 때문에도 생긴다. 그 enum
값만으로 CI red를 추측하지 않는다. Declared known-red는 normalized CI signal로 이미 7단계에서
차단된다. Pinned command가 unfinished remote-required check 때문에 거절되면 authoritative
re-observation 뒤 `wait_remote_policy`로 남긴다.

### Outcome table

| 관측 | 결과 |
| --- | --- |
| `MERGED` + exact merge SHA | `claim_or_adopt_post_merge` |
| `MERGED` + missing merge SHA | `wait_merge_confirmation` |
| `CLOSED` | `refuse(pr_closed_unmerged)` |
| draft/base/head mismatch | exact `refuse(...)` |
| unknown mergeability | `refuse(mergeability_undecidable)` |
| fresh `DIRTY|CONFLICTING` | `resolve_conflict` |
| invalid CI/local declaration signal | `refuse(verification_config_invalid)` |
| enabled local pre failed | `refuse(local_pre_failed)` |
| enabled local pre pending/missing/stale | `wait_local_pre` |
| declared CI known red | `refuse(ci_failed:<conclusion>)` |
| `BLOCKED` | `wait_remote_policy` |
| `CLEAN|BEHIND|HAS_HOOKS`, signals eligible | `merge_pinned` |
| `UNSTABLE`, no declared known red, signals eligible | `merge_pinned` |
| `[ci]` absent + local pre off | CI/local mutation 0회, ordinary predicates만 평가 |
| CI pending/missing | 기다리지 않고 pinned command에 remote policy 판정 위임 |
| advisory check red | merge input에서 제외 |

### Receipt-bound worker-owned path

Worker-owned PR은 current parent의 `impl_review` receipt와 follow-up self-review lineage를 exact
head에 결합한다. `reviewer@<head>` 또는 `self@<head>`가 current head와 exact match해야 한다.
`skipped@<head>`는 진행 authority지만 review evidence로 승격하지 않는다. Absent/malformed/stale
receipt 또는 ambiguous parent는 auto path에서 fail closed한다.

Explicit external row의 human `[머지]`는 기존 human-authorized pinned semantics를 유지하며 가짜
receipt를 만들지 않는다. 어느 path도 `UI-x7fi` 안에서 local command를 실행하지 않는다.

### `BEHIND`와 `DIRTY`

`BEHIND`는 base-tip drift이지 conflict 증거가 아니다. Exact head를
`gh.mergeSquash(..., head_sha)`에 전달하고 `gh.updateBranch`를 호출하지 않는다. Command 사이 head
drift는 pinned command가 거절하고 다음 pass가 새 head를 다시 관측한다.

Fresh `DIRTY`는 merge command/update-branch 0회다. `UI-f17c` completion coordinator의 existing
conflict operation을 dispatch하거나 동일 key의 operation을 adopt한다. Resolver만 latest base를
merge commit으로 한 번 통합하고 semantic conflict, relevant Test scope, controller self-review,
receipt freshness와 push를 소유한다. Rebase/force push는 금지한다.

Resolution 중 base가 전진해도 result가 `CLEAN|BEHIND`이면 추가 통합하지 않는다. 다시
`DIRTY`일 때만 same failure key/session을 resume한다.

### Remote-policy rejection

Pinned merge command nonzero를 문자열만 보고 update-branch/review/local verify로 바꾸지 않는다.
PR/head/base/mergeability와 normalized signals를 다시 읽는다.

- head/base drift, DIRTY, declared known-red/local failure → corresponding outcome
- remote-required check pending → `wait_remote_policy`
- PR MERGED → post-merge claim/adopt
- outcome undecidable → `merge_unconfirmed`, duplicate merge 금지

Wait state는 merge slot을 놓고 bounded poll demand만 유지한다.

## Queue와 single completion ownership

Queue head는 merge mutual exclusion만 소유한다. `BEHIND` update와 second verification을 제거해 한
driver pass를 observation → pure decision → pinned command → merged readback으로 제한한다.

`merge_unconfirmed`에서는 root operation을 보존하고 MERGED readback 전 cleanup을 시작하지 않는다.
MERGED와 exact SHA가 확인되면 click, auto, poller, startup, linked `pr-finish`가 같은
`claimOrAdoptPostMerge({root_bead_id, pr_number, merge_sha, expected_revision})`를 호출한다.

Queue-revision CAS winner만 next effect를 실행한다. Loser는 같은 cursor resume/evidenced no-op만
요청한다. Holder crash 뒤 새 actor도 same cursor/merge SHA를 adopt하므로 새 cleanup/retry budget을
만들지 않는다. Linked root가 없는 explicit external PR만 existing session-owned tail을 유지한다.

## Post-merge tail

`UI-vobi`가 제공하는 active logical order를 재사용한다.

```text
base_sync
  -> verification disposition(local_pass | declared_none)
  -> external deployment request/status binding
  -> child_sweep
  -> branch_cleanup
  -> parent_close
  -> final_readback
```

`post_merge_verify`는 historical durable row compatibility identifier로만 읽을 수 있다. New logic은
`verification_disposition`을 사용한다.

- post local true + success → `local_pass`
- post local false → command 0회 + exact SHA `declared_none`
- local command failure → same cursor stop, automatic retry/baseline/repair child 0회
- deploy status는 independent provider binding으로 평가
- legacy verify failure/log는 보존하고 `UI-q1hs` explicit recovery가 current declaration에 따라
  safe resume

Merge 뒤 failure는 rollback/rewrite 사유가 아니다. Existing cursor와 exact evidence에서 재개한다.

## UI

새 visual vocabulary를 만들지 않고 existing badge/style을 재사용한다.

- `BEHIND`: `base 변경 · 머지 가능`
- `DIRTY`: `충돌 해결 중`
- declared CI known red: existing CI failure
- CI declared pending: current remote check progress
- `[ci]` absent: CI badge/error 없음
- local pre off: local verification badge 없음
- local pre waiting/failed: explicit local state
- post `declared_none`: `머지 후 local 검증 사용 안 함`
- advisory check red: row/progress에서 제외

Legacy `last_deploy` failure가 current provider terminal success를 가리지 않는다. Deployment
projection authority는 `UI-vobi`가 정합한 provider state다.

## Error handling

- observation/declaration invalid 또는 mergeability unknown: mutation 0회, fail closed
- head drift: pinned command refusal, next pass re-observe
- command success but PR still OPEN: cleanup 0회, `merge_unconfirmed`
- DIRTY resolver crash: same operation/session adopt
- resolver success but receipt stale: queue re-entry 금지
- enabled local pre incomplete: `wait_local_pre`, merge slot 해제
- CI pending/remote rejection: `wait_remote_policy`, branch update 0회
- post verification/deploy failure: merge 유지, existing cursor resume
- malformed completion/deployment binding: 새 saga를 추측하지 않음

## Implementation surface

Landed final `main`에서 exact callers를 다시 inventory한다.

- new pure `server/worker/fast-merge-decision.js`와 focused test
- click handler, `merge-gate.js`, `merge-queue.js`, `auto-merge.js` adapters
- `UI-vobi` normalized signal consumer; repo-ops parser duplication 금지
- conflict handoff와 completion-intent CAS adapter
- queue/protocol/UI projection과 legacy row compatibility
- existing `gh.updateBranch` fast-path caller 제거
- affected Worker UI bundle/map

`UI-vobi`가 구현한 runner, retry removal, provider projection을 이 Bead가 다시 고치지 않는다.

## Test scope

### Seam A — pure decision priority

- new target: `server/worker/fast-merge-decision.test.js`
- 현재 pure decision module이 없으므로 RED다.
- state → identity → UNKNOWN → DIRTY → invalid/local pre → declared CI red → BLOCKED → eligible
  priority와 exactly-one outcome을 고정한다.

### Seam B — separated signal consumption

- `[ci]` absent/local off에서 checks/local process adapter call 0회와 pinned eligibility를 고정한다.
- CI known-red only, local-pre only, CI+local-pre combinations를 고정한다.
- CI pending/missing은 fast merge를 기다리지 않고 local pre pending/missing/stale는 기다린다.
- `UNSTABLE` only는 undeclared CI failure가 아니며 pinned remote-policy path로 간다.

### Seam C — BEHIND/DIRTY effects

- `CLEAN|BEHIND|HAS_HOOKS|UNSTABLE` eligible click/auto는 same pinned decision과
  `gh.updateBranch`/second gate/local verify 0회를 고정한다.
- Fresh DIRTY는 merge command 0회, existing resolver dispatch/adopt 1회다.
- Restart/repeated observation은 same conflict operation을 adopt한다.

### Seam D — single post-merge owner

- 동일 root/PR/merge SHA에서 click/auto/poller/startup/linked pr-finish가 경쟁할 때 CAS winner만
  effect를 실행한다.
- Post local off는 `declared_none` 뒤 deploy로 진행한다.
- Legacy `post_merge_verify` row를 읽되 new verify runner/retry를 만들지 않는다.

### Regression coverage

- current receipt exact/stale/malformed/ambiguous-parent matrix
- pinned head race와 remote-policy wait
- conflict merge commit 뒤 Test scope/self-review/receipt freshness
- MERGED readback 전 cleanup 금지
- provider success vs legacy deploy residue projection
- existing UI snapshots and bundle build

Focused verification:

```text
npm test -- server/worker/fast-merge-decision.test.js \
  server/worker/merge-gate.test.js \
  server/worker/pr-actions.test.js \
  server/worker/merge-queue.test.js \
  server/worker/auto-merge.test.js \
  server/worker/completion-intent.test.js \
  app/views/worker/index.test.js
npm run tsc
npm run lint
npm run prettier:write + clean diff confirmation
npm run build
git diff --check
```

## Cross-repo disposition과 Worker eligibility

- canonical provider: `split + bead:dotfiles-b2yx`
- runtime provider: `bead:UI-vobi`
- merge consumer: `bead:UI-x7fi` own PR

`UI-x7fi`는 두 provider에 `blocks` dependency가 있고 close 뒤 final runtime contract를 소비한다.
Foreign provider와 enclosed repository rollout을 이 Bead에 중복시키지 않는다. Own change는 current
PR과 beads-ui `[deploy]` external job이 운반하므로 required no-PR residue가 없다.
`worker-ineligible`은 formal spec gate에서 absent/removal readback한다.

## Rollout

1. `dotfiles-b2yx` canonical contract PR이 merge/deploy/install되고 close된다.
2. `UI-vobi`가 beads-ui consumer를 direct `main`에 배포하고 train_bot/TRACE-ICI enclosed rollout과
   follow-up self-review를 마친 뒤 close된다.
3. `UI-x7fi` spec freshness를 final provider commits에 대해 controller full-artifact self-review한다.
4. Final beads-ui `main`에서 exact callers를 inventory하고 pure decision을 먼저 도입한다.
5. Click/auto adapters를 pure decision에 연결하고 BEHIND update/reverify를 제거한다.
6. DIRTY를 existing resolver, MERGED를 existing completion cursor에 연결한다.
7. Focused verification과 implementation gate 뒤 own PR을 Delivery한다.
8. Pinned merge 뒤 `declared_none`, exact deployment terminal success와 live runtime readback으로
   close한다.

## Acceptance criteria

1. 모든 active PR/mergeability/normalized signal 조합이 ordered one-outcome decision을 만든다.
2. `[머지]`와 auto path는 `BEHIND`에서 update-branch 없이 exact head를 merge한다.
3. Actual `DIRTY`만 existing resolver로 가고 duplicate conflict session이 없다.
4. `[ci]` absent는 CI query/error/badge를 만들지 않으며 no-check를 local fallback으로 바꾸지 않는다.
5. Declared CI known red만 차단하고 pending/missing/undeclared `UNSTABLE`은 pinned remote policy에
   맡긴다.
6. Local pre는 explicit enabled state일 때만 current-head success를 요구한다.
7. Fast decision code는 local command를 실행하거나 repo-ops declaration을 parse하지 않는다.
8. Post local off는 exact SHA `declared_none` evidence 뒤 independent deploy를 진행한다.
9. Same root/PR/merge SHA의 post-merge effect는 CAS winner 한 명만 실행한다.
10. `UI-vobi`/`dotfiles-b2yx` ownership을 복제하지 않고 historical cleanup evidence를 보존한다.
