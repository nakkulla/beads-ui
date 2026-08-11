# completion intent 단일 상태기계 — 배포·정리·Parent close 자동 완주

- Bead: `UI-f17c`
- 날짜: 2026-08-12
- route: `full_plan`
- 상태: 설계 승인됨 (사용자, 대화 중)
- 선행 작업: `UI-x9tu` / PR #114, `UI-ckgr` / PR #122

## 배경

`UI-x9tu`는 `auto_merge`를 durable completion intent로 확장해 PR gate,
ownership probe, same-Bead repair, linked repair PR, merge와 post-merge cleanup
replay를 연결했다. `UI-ckgr`는 활성 `[AI 정리]` 표면을 제거하고, beads-ui
self deploy를 exact candidate release, restart journal, runtime identity와 receipt
readback에 결합했다.

두 구현은 각각의 경계에서는 안전하지만 end-to-end authority가 나뉘어 있다.

- `completion-intent.js`는 repair와 merge 전후의 상위 lineage를 소유한다.
- `deployment-reconciler.js`는 candidate materialization부터 managed receipt까지
  소유한다.
- `pr-actions.js`는 verify, deploy 호출 뒤 child sweep, branch cleanup, Parent
  close와 Done 전환을 순서대로 수행한다.
- `merge-queue.js`, `scheduler.js`, startup reconciliation이 각자의 durable
  record를 보고 일부 구간을 재개한다.

이 분산된 authority 때문에 개별 effect는 성공했는데 다음 owner가 이어받기 전
process가 종료되면 root operation이 영구 정지할 수 있다. 현재 코드에서 확인된
대표 경계는 다음과 같다.

1. repair dispatch의 guard/claim effect가 `beginRepairOp` durable prerecord보다
   먼저 일어날 수 있다.
2. `waiting_repair_pr` 재관측에서 이미 `MERGED`인 repair PR이 `OPEN` 경로로
   덮일 수 있다.
3. managed receipt를 `complete`로 기록한 뒤 child sweep, branch cleanup,
   Parent close, Done 전환 전에 종료되면 startup이 complete reconcile을 건너뛴다.
4. Parent close가 성공한 뒤 최종 queue persist가 실패하면 closed Bead와 남은
   `pr_wait`/intent가 모순되며, 재실행 시 duplicate close 가능성이 있다.
5. 수동 discard가 queue lane만 제거하면 durable intent가 고아로 남을 수 있다.
6. 현재 integration fixture는 Reconciler 또는 coordinator를 따로 검증하며,
   실제 startup attachment부터 runtime receipt와 Parent close까지 한 번에
   관통하지 않는다.

이 스펙은 새 복구 supervisor를 추가하지 않는다. root completion intent 하나를
PR 대기부터 runtime 검증, cleanup tail과 Parent close까지의 유일한 orchestration
authority로 확장한다.

## 사용자 결정

1. **단일 orchestration 상태기계**를 사용한다. merge, scheduler, deploy,
   cleanup 구현은 기존 owner에 남기되 다음 phase 결정 권한은 root intent만 가진다.
2. 활성 root에서 사용자가 `[폐기]`를 실행하면 전체 completion intent를
   취소한다. queue entry만 지우거나 자동으로 재큐하지 않는다.
3. 활성 AI cleanup diagnosis session, UI, WS action, scheduler dispatch는
   되살리지 않는다. legacy diagnosis record는 read compatibility와 bounded
   migration 입력으로만 사용한다.

## 목표

1. `auto_merge=true`인 worker-owned root가 `pr_wait`부터 gate/repair, merge,
   post-merge verify, managed deploy, restart/readback, cleanup과 Parent close까지
   같은 durable intent로 완주한다.
2. 수동 `[정리]`도 별도 임시 경로가 아니라 `manual` authorization을 가진 같은
   intent를 생성하거나 재개한다.
3. session, repair Bead, repair PR, merge, restart, receipt, Parent close effect를
   한 root lineage와 budget에 결합한다.
4. process가 어느 handoff에서 종료돼도 authoritative readback으로 같은 operation을
   채택하거나 fail closed하며 duplicate effect와 budget reset이 없다.
5. exact candidate와 live runtime identity가 증명되기 전에는 deploy success,
   cleanup completion, Parent close를 기록하지 않는다.
6. 자동 수리가 안전하지 않은 실패는 원인을 추측하거나 새 repair session을
   만들지 않고 구체적 evidence와 함께 `needs_human`으로 종료한다.
7. Worker UI는 실제 root progress를 `running`, `recovering`, `paused`,
   `completed`, `cancelled`, `needs_human`으로 일관되게 표시한다.

## 비목표

- GitHub merge, git worktree, Beads, managed Adapter 구현을 coordinator 안에
  복제하는 것.
- credentials, permission, external service, 전역 개발 환경을 자동 수정하는 것.
- agent가 base에 직접 push하거나 `gh pr merge`를 호출하는 것.
- managed pointer rollback, release GC, shared checkout stash/reset/clean을
  자동화하는 것.
- repair session 총 2회 cap 또는 conflict-resolution 별도 cap을 늘리는 것.
- 새 Beads metadata key나 workflow label/status vocabulary를 정의하는 것.
- 물리적 exactly-once를 약속하는 것. 외부 시스템과 `queue.json`은 하나의
  transaction이 아니므로 at-least-once 실행과 logical exactly-once 소비를 쓴다.

## 핵심 불변식

1. **root authority 단일화**: end-to-end phase와 다음 effect 선택은
   `completion_intents[root_bead_id]`만 결정한다.
2. **effect 구현 단일화**: 모든 PR merge는 기존 merge driver, 모든 cleanup은
   기존 `pr-actions` primitive, managed restart는 기존 Adapter journal을 쓴다.
3. **action-before-effect**: session spawn, Bead create, merge handoff, cleanup
   replay, deploy, close 전에 root `active_op`를 durable하게 기록한다.
4. **bound evidence**: 결과는 root, subject, target base, head/merge/candidate SHA,
   attempt와 receipt digest가 모두 일치할 때만 소비한다.
5. **red 우회 금지**: verify/CI/runtime health가 red 또는 unbound인 상태에서
   merge, deploy success, cleanup completion으로 넘어가지 않는다.
6. **root queue 직렬화**: repair session/PR과 post-merge recovery 동안 root가
   같은 merge queue turn을 유지한다.
7. **lineage budget**: root와 모든 repair descendant가 code-repair session
   총 2회를 공유하며 restart, head/base 변경, cancel 재개로 초기화되지 않는다.
8. **readback idempotency**: 외부 effect 뒤 queue persist 전에 crash해도 Bead,
   PR, process, receipt와 filesystem readback으로 이미 한 effect를 다시 쓰지 않는다.
9. **취소 우선**: `cancel_pending` 이후 새 repair, merge, deploy, close effect를
   시작하지 않는다. 이미 commit된 irreversible effect는 readback만 끝낸다.
10. **진단 비활성**: legacy diagnosis evidence 소비는 새 diagnosis attempt,
    resume, retry budget을 만들지 않는다.

## 1. 단일 orchestration 상태

### 1.1 Root record

`queue.json.completion_intents`의 기존 record를 schema v2로 확장한다.

```js
completion_intents[root_bead_id] = {
  schema_version: 2,
  authorization: {
    kind: 'auto', // 'auto' | 'manual'
    granted_at: 1786500000000,
    cancel_requested_at: null
  },
  target_base: 'main',
  phase: 'gating',
  subject: {
    role: 'root', // 'root' | 'repair'
    bead_id: 'UI-abcd',
    pr_url: 'https://github.com/.../pull/123',
    head_sha: '<40-hex>',
    base_sha: '<40-hex>',
    merged_sha: null
  },
  subject_stack: [],
  repair_sessions_used: 0,
  repair_bead_ids: [],
  active_op: null,
  deploy_evidence: null,
  terminal: null
}
```

`authorization.kind='auto'`는 worker-owned root의 `auto_merge=true`에서,
`manual`은 사용자의 merged `[정리]` action에서 온다. authorization은 effect
허용의 출처일 뿐 Beads workflow gate나 GitHub merge 권한을 새로 만들지 않는다.

### 1.2 Phase vocabulary

phase는 다음 값으로 제한한다.

- `gating`: current subject의 authoritative PR/gate/ownership 관측
- `repairing`: same-Bead 또는 linked repair session 준비·실행·정산
- `waiting_repair_pr`: linked repair PR의 exact OPEN/MERGED 상태 대기
- `merging`: 기존 merge driver가 current subject를 처리 중
- `post_merge_verify`: landed root의 base sync와 repository verify
- `deploying`: candidate materialization과 managed Adapter 실행
- `restarting`: durable restart handoff effect 정산
- `runtime_readback`: marker, live `/healthz`, receipt exact binding 검증
- `child_sweep`: plan-anchored execution child close/readback
- `branch_cleanup`: owned head worktree/branch cleanup/readback
- `parent_close`: Parent close와 status readback
- `paused`: auto authorization OFF로 새 operation을 시작하지 않음
- `cancel_pending`: 새 effect를 막고 이미 commit된 effect를 readback 중
- `cancelled`: 사용자 취소 terminal
- `needs_human`: 자동화 불가 terminal
- `completed`: runtime, cleanup, Parent close, Done이 모두 확정된 terminal

기존 `cleaning`은 load 시 evidence에 따라 `post_merge_verify`, `deploying`,
`restarting`, `runtime_readback` 또는 tail phase로 정규화한다. 근거가 부족하면
임의로 처음부터 재실행하지 않고 `needs_human:intent_state_ambiguous`로 둔다.

### 1.3 Active operation

모든 외부 effect는 하나의 `active_op` 형식을 사용한다.

```js
active_op = {
  op_id: '<stable-id>',
  kind: 'dispatch_repair',
  status: 'prepared', // prepared | dispatched | observed | consumed
  failure_key: {
    stage: 'post_merge_verify',
    reason: 'verify_cmd_failed',
    subject_sha: '<40-hex>',
    base_sha: '<40-hex>',
    result_digest: '<sha256>'
  },
  attempt_id: '<preallocated-id>',
  effect_identity: null,
  result: null
}
```

`kind`은 최소한 다음 effect를 표현한다.

- `probe_ownership`
- `resume_root`
- `create_repair`
- `dispatch_repair`
- `merge_subject`
- `retry_cleanup`
- `verify_merged_base`
- `reconcile_deploy`
- `sweep_children`
- `cleanup_branch`
- `close_parent`
- `finish_completion`
- `cancel_completion`

각 effect의 identity는 kind별 validator가 검사한다. unknown kind, phase와 맞지
않는 kind, invalid SHA/attempt/status는 새 effect를 실행하지 않고 fail closed한다.

## 2. Owner와 adapter 경계

상태기계는 orchestration을 단일화하지만 effect owner를 흡수하지 않는다.

| 책임 | effect adapter | coordinator가 받는 결과 |
|---|---|---|
| PR/CI 관측 | `pr-poller.js`, `gh.js` | PR state, bound head/base/merge SHA, CI evidence |
| ownership probe | 기존 completion repair probe | pinned base/head verdict와 digest |
| session dispatch/resume | `scheduler.js` | prerecord된 attempt의 running/terminal readback |
| repair Bead | 기존 bd adapter | deterministic ID, description/dependency identity |
| PR merge | `merge-queue.js` → `pr-actions.merge()` | merged/refused/conflict, merge SHA |
| base sync/verify | `pr-actions` primitive | pinned base SHA, verify result/log |
| candidate deploy | `DeploymentReconciler` | attempt/candidate/receipt 또는 finite failure |
| physical restart | managed Adapter/helper | journal stage와 exact process identity |
| child/Parent close | `pr-actions` Beads primitive | pre-read status, write 여부, status readback |
| branch cleanup | 기존 cleanup primitive | absence/ownership/readback evidence |

adapter는 end-to-end terminal을 직접 정하지 않는다. 자기 effect의 결과를 root
coordinator에 전달하고, coordinator가 bound evidence를 소비해 다음 phase를 한
mutation으로 기록한다.

## 3. Authoritative data flow

### 3.1 Intake

Auto intake는 worker-owned `pr_wait` root의 candidate 판정, root merge queue
placement, v2 intent 생성까지 한 store mutation으로 기록한다. linked repair child는
`repair_bead_ids` membership 때문에 새 root intent를 얻지 않는다.

수동 `[정리]`는 merged PR과 Bead identity를 클릭 시점에 다시 읽은 뒤 `manual`
intent를 생성하거나 기존 intent를 재개한다. 이미 terminal인 intent는 같은 receipt와
Parent status를 확인한 evidenced no-op만 허용한다.

### 3.2 Gate와 ownership

Gate 결과는 `OPEN`, `MERGED`, `CLOSED`, `missing/error`를 먼저 분리한 뒤
mergeability와 verify/CI를 판정한다.

- green root/repair subject → `merge_subject`
- conflict → 기존 conflict-resolution; repair budget 불변
- PR verify red + pinned base green → same-Bead resume
- PR/base red → deterministic linked repair
- repair PR `OPEN` → repair subject로 전환
- repair PR `MERGED` → merge를 재호출하지 않고 merge SHA를 채택해 cleanup/readback
- missing/stale SHA/PR → 남은 budget과 previous observation을 대조하고,
  ownership을 증명하지 못하면 `needs_human:repair_pr_unobservable`

repair dispatch는 다음 순서를 지킨다.

1. attempt ID preallocate
2. op, budget 증가, attempt prerecord를 한 store mutation으로 기록
3. guard 설치와 claim
4. spawn/resume
5. process/session/PR/head readback
6. exact result consume

guard/claim 또는 spawn ambiguity 뒤 prerecord가 없던 상태로 돌아가 새 budget을
만드는 경로는 허용하지 않는다.

### 3.3 Merge와 post-merge verify

모든 merge는 root queue head를 유지한 채 기존 merge driver만 호출한다. GitHub에서
이미 merge된 사실이 관측되면 merge command를 반복하지 않고 exact merge SHA를
채택한다.

landed root는 `post_merge_verify`로 이동한다. 기존 repository declaration에서
base sync와 verify를 실행하고, verify red에서는 deploy를 시작하지 않는다.

- built-in flake retry에서 green → failure record 없이 계속
- 최종 red이며 code/config regression이 증명됨 → linked repair
- legacy diagnosis의 bound `flake`/`environment` verdict → diagnosis record를
  수정하지 않고 digest-bound `retry_cleanup` op를 정확히 한 번 실행
- credentials, permission, external service, timeout/spawn ambiguity,
  ownership undecidable → `needs_human`

새 AI diagnosis attempt나 free-form verdict writer는 없다. 새 failure는 finite reason,
failure code와 pinned evidence만 사용한다.

### 3.4 Managed deploy와 receipt

`reconcile_deploy` op는 merged floor와 candidate SHA를 먼저 기록한다.
DeploymentReconciler와 Adapter의 existing journal은 physical restart effect의
하부 fence로 유지한다.

managed receipt success는 다음 네 action을 모두 포함해야 한다. 기존
`queue.reconcile` record는 이 provider effect의 하부 journal/evidence로 남지만,
그 record만으로 end-to-end phase나 cleanup terminal을 결정하지 않는다.

1. `dependency_install`
2. `pointer_cutover`
3. `restart_handoff`
4. `runtime_identity_readback`

각 action은 protocol, repo, attempt, merged floor, candidate SHA와 release realpath에
결합된다. 최종 runtime action은 marker와 live `/healthz`의 protocol, PID, OS start,
instance, source realpath/SHA, host, port, health를 exact candidate와 비교한다.
nonempty success 배열이나 stdout 문구만으로 receipt를 승인하지 않는다.

restart pre-commit failure만 같은 attempt의 bounded provider retry를 허용한다.
post-commit effect는 exact runtime identity로 receipt-only recovery하거나,
증명할 수 없으면 `needs_human:restart_effect_ambiguous`다. 새 restart를 추측하지
않는다.

### 3.5 Cleanup tail과 completion

receipt consume 뒤 다음 tail도 root phase로 durable하게 진행한다.

1. `child_sweep`
2. `branch_cleanup`
3. `parent_close`
4. `finish_completion`

각 단계는 op prerecord → effect → authoritative readback → consume 순서다.

- child/Parent close 전에 현재 status를 읽는다.
- 이미 `closed`이면 close write를 생략하고 readback을 evidence로 채택한다.
- branch/worktree가 이미 없으면 absence와 ownership을 확인한 evidenced no-op이다.
- Parent close 뒤 `finish_completion`은 Done, intent `completed`, tail completion을
  가능한 한 같은 store mutation으로 기록한다.
- 최종 persist가 실패하면 `close_parent` 또는 `finish_completion` op를 남겨
  startup이 Parent `closed` readback 뒤 queue mutation만 재시도한다.

`receipt complete`와 `tail complete`는 같은 의미가 아니다. startup과 poller는
receipt가 complete여도 terminal intent 또는 tail completion이 없으면 남은 tail을
재개한다.

## 4. 취소와 pause

### 4.1 Auto OFF

`auto_merge` OFF는 새 repair/session/merge operation 시작을 멈춘다. 실행 중 effect는
kill하지 않고 결과를 기록한 뒤 `paused`로 둔다. 이미 landed된 root의 현재
idempotent readback은 끝낼 수 있지만 새 code repair나 deploy effect는 ON까지
시작하지 않는다. ON 시 pinned evidence를 다시 gate하며 budget을 초기화하지 않는다.

### 4.2 수동 폐기

활성 root의 `[폐기]`는 전체 intent 취소다.

1. `cancel_completion` op와 `cancel_requested_at`을 먼저 기록한다.
2. 새 session, merge, deploy, close effect를 차단한다.
3. 아직 commit되지 않은 prepared effect는 fenced cancellation로 정산한다.
4. 이미 merge/restart가 commit됐으면 rollback하지 않고 PR/runtime readback만 한다.
5. owned temporary execution state는 기존 discard primitive로 정리한다.
6. `cancelled` terminal과 evidence를 기록하고 queue에서 제거한다.

취소는 Bead 성공이나 `closed` 증거가 아니다. Bead status 변경은 기존 discard
계약이 소유하며 coordinator가 임의로 completion status로 승격하지 않는다.

## 5. Restart와 migration reconciliation

startup과 queue change마다 모든 nonterminal root intent를 검사한다. merge queue에
있는 첫 항목만 보는 것으로 끝내지 않고, lane과 intent가 어긋난 고아 record도
정산한다.

| durable state | authoritative readback | 처리 |
|---|---|---|
| prepared session op | 같은 attempt 존재 | dispatched로 채택 |
| prepared repair create | deterministic Bead identity 일치 | 기존 Bead 채택 |
| waiting repair PR | PR OPEN | repair subject 전환 |
| waiting repair PR | PR MERGED | merge SHA 채택, merge command 생략 |
| merging | PR MERGED | post-merge phase로 전환 |
| deploy journal pre-commit | restart 0회 증명 | 같은 attempt provider retry |
| deploy journal post-commit | exact live runtime | receipt-only recovery |
| receipt complete, tail incomplete | Parent/child/branch 상태 | 남은 tail 재개 |
| Parent closed, finish op 남음 | closed readback | queue/Done mutation만 재시도 |
| root queue entry 없음, cancel evidence 있음 | owned effects settled | cancelled |
| root queue entry 없음, cancel evidence 없음 | 복구 authority 불명 | needs_human |
| 어떤 상태든 SHA/attempt binding 불일치 | stale/contradictory | needs_human |

legacy v1 intent/reconcile은 다음 순서로 읽는다.

1. Parent `closed` 또는 root Done이 확인되면 `completed`로 채택한다.
2. exact managed receipt와 Parent `resolved`가 있으면 완료되지 않은 tail로 채택하고
   child/branch/Parent readback부터 재개한다.
3. nonterminal reconcile은 같은 attempt와 candidate binding으로 phase를 복원한다.
4. legacy diagnosis verdict는 current cleanup failure와 source attempt에
   unambiguously join될 때만 digest-bound retry operation의 입력으로 읽는다.
   attempt/failure binding이 없거나 둘 이상이면 소비하지 않는다.
5. identity, receipt, Parent status가 부족하거나 서로 모순되면
   `needs_human:legacy_tail_ambiguous`다.

unknown field를 삭제해 fresh budget이나 새 operation을 만드는 fail-open migration은
금지한다.

## 6. Failure policy

| stage/evidence | disposition |
|---|---|
| conflict | 기존 conflict-resolution, repair budget 불변 |
| PR verify/CI red, base green | same-Bead repair |
| base 또는 post-merge code/config regression | linked repair Bead/PR |
| bound `adapter_regression`, non-retryable | linked repair |
| legacy bound `flake`/`environment` verdict | 같은 failure digest의 cleanup replay 1회 |
| retryable pointer/helper pre-commit failure | 같은 deploy attempt의 bounded retry |
| runtime/marker/receipt mismatch | needs_human |
| credentials/auth/permission/external service | needs_human |
| unknown/malformed/unbound failure or receipt | needs_human |
| repair session 총 2회 소진 | needs_human |
| manual cancel | cancelled |

terminal record는 `reason`, `stage`, failure/effect key, subject, used budget,
evidence/log path, exact SHA/attempt, timestamp를 유지한다.

## 7. Worker와 UI projection

fine-grained phase는 유지하고 client에 coarse state를 함께 투영한다.

| coarse state | phase |
|---|---|
| `running` | `gating`, `merging`, `post_merge_verify` |
| `recovering` | `repairing`, `waiting_repair_pr`, `deploying`, `restarting`, `runtime_readback`, `child_sweep`, `branch_cleanup`, `parent_close` |
| `paused` | `paused` |
| `completed` | `completed` |
| `cancelled` | `cancel_pending`, `cancelled` |
| `needs_human` | `needs_human` |

root card 하나에 phase, repair budget, current subject/repair PR, deploy attempt,
candidate SHA, retry count와 terminal evidence를 표시한다. repair child는 독립 root
card로 중복 표시하지 않는다.

active `running`/`recovering` 상태에서는 generic cleanup banner의 “사람이
마무리해야 함”과 “자동 재시도 없음” 문구를 표시하지 않는다. durable retry count가
0이면 재시도했다고 말하지 않는다. `needs_human`일 때만 사람이 확인할 action과
구체적 evidence를 표시한다.

`[AI 정리]`, diagnosis spinner/result/action, diagnosis WS/scheduler dispatch는
추가하지 않는다. legacy diagnosis fields와 historical evidence chip은 read-only로
남길 수 있지만 completion 성공이나 active 해결 surface로 투영하지 않는다.

## 8. Test scope

### RED-GREEN seam 1 — schema, reducer, classifier purity

1. v2 phase/op/authorization/terminal schema valid/invalid normalization
2. v1 `cleaning`/reconcile/diagnosis migration과 fail-closed ambiguity
3. intake의 root queue + intent single mutation
4. `beginRepairOp`의 budget + attempt + op single mutation
5. cancel prerecord와 orphan intent terminal reconciliation
6. classifier와 `observe()` 호출 전후 queue deep snapshot와 revision 불변
7. `completed` reducer action의 실제 consume 경로

### RED-GREEN seam 2 — repair journal과 PR observation

1. prerecord 뒤/spawn 전 crash
2. spawn 뒤/attempt adoption 전 crash
3. repair Bead create 뒤/identity consume 전 crash
4. repair PR OPEN 뒤/subject 전환 전 crash
5. repair PR MERGED 관측에서 merge command 0회, cleanup/readback 1회
6. missing/stale PR과 head/base drift의 retry 또는 needs_human 수렴
7. guard/claim이 prerecord보다 먼저 발생하지 않음

### RED-GREEN seam 3 — managed receipt와 restart

1. 네 required action 누락, duplicate, unknown, unbound receipt 거부
2. exact install/pointer/restart/runtime action과 digest 승인
3. helper spawn 전, prerecord 전, commit 전 crash의 restart 0회
4. commit 뒤/receipt rename 전 crash의 receipt-only recovery 또는 ambiguity
5. marker/live PID/start/instance/source/path/SHA/host/port mismatch 거부
6. 같은 attempt에서 restart와 receipt consume의 추가 호출 0회

### RED-GREEN seam 4 — cleanup tail

1. receipt complete 직후 old process 종료
2. child sweep effect 전/후 종료
3. branch cleanup effect 전/후 종료
4. Parent close effect 전/후 종료
5. Parent close 뒤 final queue persist 실패
6. closed pre-read가 duplicate close write를 막음
7. restart를 두 번 반복해도 Done, close, budget reset 중복 없음
8. external merged manual intent도 non-persistent registry와 무관하게 tail 재개

### RED-GREEN seam 5 — UI와 WS

1. 모든 phase의 coarse state mapping
2. root-only projection과 repair child suppression
3. active recovery와 cleanup failure가 함께 있을 때 coordinator progress 우선
4. retry count 0/N 문구 정합
5. malformed intent의 visible `needs_human`
6. legacy diagnosis read-only와 active action/transport 0건
7. cancel pending/terminal button lock과 evidence

### Integrated startup/crash fixture

fixture는 reducer나 Reconciler를 직접 호출하는 데서 끝나지 않는다. real git
repository와 fake runner/GitHub/Beads/project manager를 사용하고 실제
`startWorkerAttachment`, `createPrActions`, merge queue, managed Adapter를 통과한다.

다음 end-to-end 경로를 검증한다.

1. PR-owned red → same-Bead repair → 새 head green → merge/deploy/close
2. base-owned red → linked repair PR → root re-gate → completion
3. post-merge regression → linked repair PR → cleanup 전체 replay → completion
4. legacy flake/environment verdict → 같은 failure/attempt cleanup replay 정확히 1회
5. 두 repair 모두 red → budget 2 유지 + `needs_human`
6. manual cleanup → managed deploy → tail completion
7. manual discard → cancel → restart 뒤 비재생성

각 crash window는 duplicate session, repair Bead, PR merge, restart, receipt,
Parent close, Done이 없고 root budget이 초기화되지 않음을 호출 횟수와 durable
readback으로 검증한다.

### Regression coverage

- existing conflict-resolution cap과 queue serialization
- existing PR-only/base ownership probe
- existing managed Adapter journal/restart integration
- legacy diagnosis round-trip와 orphan retirement
- legacy workspace deploy guards
- ordinary non-auto/manual merge path
- board/monitor/worker existing card behavior

### Verification bundle

- focused coordinator/store/scheduler/merge/pr-actions/reconciler/WS/UI tests
- real-git + fake runner/GitHub/Beads/project manager startup fixture
- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:write`
- `npm run build`
- `npm run all`
- `git diff --check`

## 9. 구현 경계

`full_plan`은 다음 semantic phase로 나눈다.

1. **State authority**: v2 schema, migration, reducer, cancel/orphan reconciliation
2. **Repair continuity**: action-before-effect dispatch와 repair PR state 분기
3. **Post-merge continuity**: verify, managed receipt, cleanup tail의 root phase 편입
4. **Projection**: coarse state, banner precedence, legacy diagnosis purity
5. **Crash E2E와 rollout**: actual startup fixture, generated bundle, live readback

phase 1이 뒤 phase의 canonical state를 먼저 제공한다. state machine과 queue/reconciler
transition을 동시에 수정하는 phase는 병렬 writable unit으로 나누지 않는다.

## 10. Rollout과 live verification

한 PR에서 v2 reader/writer와 모든 active consumer를 함께 전환한다. queue load는
v1 dual-read를 지원하지만 active write는 v2만 만든다. dotfiles workflow 계약과
External/beads는 수정하지 않는다.

PR merge 뒤 managed Adapter가 exact candidate release를 준비하고 pointer cutover와
`bdui-shared restart`를 handoff한다. 완료 선언 전 다음을 모두 readback한다.

1. runtime pointer target과 process module realpath
2. candidate/source SHA
3. marker와 `/healthz.runtime`의 protocol, PID, OS start, instance, host, port
4. listening socket과 HTTP 200
5. managed receipt path/digest/attempt/floor
6. root intent `completed`, Parent/children `closed`, Done projection
7. shared checkout HEAD와 porcelain 불변
8. restart/receipt/close/Done 중복 0

runtime identity나 receipt가 불일치하면 journal, pointer, process manager log와
queue evidence를 보존하고 명시 승인 없는 rollback을 하지 않는다.

## 11. Acceptance criteria

1. auto root와 manual cleanup이 PR 대기부터 runtime 검증, tail, Parent close까지
   같은 v2 completion intent로 진행한다.
2. conflict, PR-owned red, base/post-merge regression, bound adapter regression이
   각각 기존 bounded resolver/repair 경로를 사용하고 모든 merge는 기존 driver만
   수행한다.
3. exact managed candidate와 live runtime identity에 결합된 four-action receipt 전에는
   deploy success나 cleanup completion이 기록되지 않는다.
4. session, Bead, repair PR, merge, restart, receipt, close, Done crash boundary에서
   duplicate effect와 budget reset이 없다.
5. receipt complete 뒤 어떤 cleanup tail 단계에서 종료돼도 startup이 같은 root
   operation을 재개해 Parent close와 Done까지 끝낸다.
6. pointer/runtime/permission/external/malformed/ambiguous state는 repair session을
   추측 생성하지 않고 exact terminal evidence를 남긴다.
7. classifier와 observation은 queue/legacy diagnosis를 mutate하지 않으며 effect는
   coordinator action 단계에서만 발생한다.
8. legacy flake/environment verdict는 같은 digest/attempt에서 정확히 한 번 cleanup을
   replay하고, regression은 linked repair PR merge 뒤 root cleanup으로 복귀한다.
9. Worker는 진행 중 root를 `running`/`recovering`/`paused`로, terminal을
   `completed`/`cancelled`/`needs_human`으로 정확히 표시한다.
10. 수동 discard는 root intent 전체를 cancel하고 restart 뒤 재큐·재실행되지 않는다.
11. actual startup/crash E2E와 repository-required verification, generated bundle,
    live managed runtime readback이 모두 통과한다.

## 관련 문서와 코드

- `docs/superpowers/specs/2026-08-11-self-healing-auto-merge-completion-intent-design.md`
- `docs/superpowers/specs/2026-08-11-managed-self-deploy-cleanup-recovery-design.md`
- `docs/superpowers/plans/2026-08-11-ui-x9tu-self-healing-auto-merge.md`
- `docs/superpowers/plans/2026-08-11-managed-self-deploy-cleanup-recovery.md`
- `server/worker/completion-intent.js`
- `server/worker/queue-store.js`
- `server/worker/merge-queue.js`
- `server/worker/scheduler.js`
- `server/worker/pr-actions.js`
- `server/worker/deployment-reconciler.js`
- `scripts/managed-self-deploy.js`
- `server/ws/worker-handlers.js`
- `server/e2e/worker-flow.test.js`
