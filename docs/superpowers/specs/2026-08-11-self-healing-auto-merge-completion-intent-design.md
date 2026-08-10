# 자동머지 completion intent — 실패 자동 복구·재검증·재개

- Bead: UI-x9tu
- 날짜: 2026-08-11
- route: `full_plan`
- 상태: 설계 승인됨 (사용자, 대화 중)
- 선행 작업: UI-7u3d / PR #111

## 배경과 문제

현재 `auto_merge`는 merge 가능한 PR을 durable queue에 계속 편입하고, 기존
merge driver가 순차적으로 재게이트·충돌 해소·merge·cleanup을 수행한다.
충돌은 최대 2회의 resolution session 뒤 자동 재머지되지만, 일반 verify/CI
red는 durable skip 후 queue에서 빠지고, post-merge cleanup red는 사람이
`[AI 정리]`를 눌러야 한다. UI-7u3d가 추가한 `[AI 정리]` session도 분류와
bounded cleanup 재시도까지만 수행하며 regression을 직접 수정하지 않는다.

따라서 사용자가 `auto_merge`를 켜도 다음 구간에서 completion intent가 끊긴다.

1. PR head의 local verify 또는 CI가 red다.
2. 실패가 PR 변경이 아니라 target base의 기존 regression이다.
3. merge는 landed됐지만 merged base의 post-merge verify/cleanup이 red다.
4. repair session이나 repair PR 도중 server가 재시작된다.

사용자의 목표는 queue에 넣은 작업을 “가능한 데까지 시도”하는 것이 아니라,
저장소 안에서 안전하게 고칠 수 있는 실패라면 수정 session·재검증·repair PR을
거쳐 merge와 cleanup까지 끊김 없이 완료하는 것이다.

## 목표

1. `auto_merge=true` 자체를 bounded repair와 필요한 repair PR merge까지 허용하는
   durable completion intent로 해석한다.
2. 원 PR가 만든 regression은 최신 same-Bead session을 `resume`하여 같은
   worktree/PR branch에서 수정한다.
3. pinned target base에도 존재하는 failure 또는 merge 뒤 발견된 regression은
   fresh linked repair Bead/branch/PR로 수정한다.
4. root intent 하나가 생성한 모든 repair session은 합계 2회 예산을 공유한다.
5. GitHub·Beads·runner와 process-local state 사이의 crash window에서도 같은
   failure/session/repair PR을 논리적으로 한 번만 소비한다.
6. 모든 PR merge는 기존 merge driver, 모든 gate·cleanup은 기존 `pr-actions`의
   단일 구현을 계속 사용한다.
7. 자동화할 수 없는 실패는 조용히 제외하지 않고 durable terminal reason,
   evidence, 사용 예산, 사람이 다시 확인할 동작을 노출한다.

## 비목표

- credentials·권한·외부 서비스·전역 개발 환경을 agent가 자동 변경하는 것.
- agent의 base 직접 push, `gh pr merge`, guard 완화.
- test 삭제·skip·assertion 약화·threshold 완화로 green을 만드는 것.
- 병렬 merge 또는 root intent가 repair 중인 동안 뒤 PR을 먼저 merge하는 것.
- Beads metadata에 새로운 workflow 계약 key를 추가하는 것.
- 물리적 exactly-once를 약속하는 것. 외부 시스템과 `queue.json`을 하나의
  transaction으로 묶을 수 없으므로 본 설계는 at-least-once 실행과 durable
  logical exactly-once 소비를 사용한다.

## 핵심 불변식

1. **red 우회 금지**: 어떤 repair 경로도 red verify/CI를 안고 merge·deploy로
   넘어가지 않는다.
2. **merge 권한 단일화**: queued root와 repair child의 PR merge는 모두 기존
   merge driver만 호출한다. session은 branch push와 PR 제출까지만 수행한다.
3. **cleanup 구현 단일화**: 최초 cleanup과 repair 뒤 재실행은 모두
   `pr-actions.runCleanup` choreography를 사용한다.
4. **root queue head 유지**: same-PR repair와 linked repair PR 처리 동안 root
   intent가 queue head를 유지한다. base가 중간에 움직이거나 동일 baseline
   repair가 중복 생성되지 않는다.
5. **lineage budget**: repair child는 새 root intent가 아니다. root와 모든
   descendants가 `repair_sessions_used <= 2`를 공유한다.
6. **pinned evidence**: ownership과 repair 결과는 기록된 PR head SHA와 target
   base SHA에만 유효하다.
7. **action-before-effect journal**: session spawn, Bead create, PR merge 요청 등
   외부 effect 전에 operation과 budget 소비를 durable하게 기록한다.

## 1. 아키텍처

새 `server/worker/completion-intent.js`는 워크스페이스별 durable saga
coordinator다. attachment가 scheduler·merge queue·poller와 같은 수명으로 만들고
시작·중지한다.

coordinator는 다음 책임만 가진다.

- root lineage와 current subject 선택
- pinned failure ownership 판정
- repair session 2회 예산
- 다음 operation의 durable prerecord와 결과 소비
- restart reconciliation
- terminal/paused 상태 결정

다음 실행 책임은 기존 owner에 남긴다.

| 책임 | owner |
|---|---|
| session resume/fresh dispatch | `scheduler.js` |
| queued PR의 유일한 merge 실행 | `merge-queue.js` |
| authoritative gate·base sync·cleanup | `pr-actions.js` |
| GitHub PR/CI 관측 | `pr-poller.js` / `gh.js` |
| lane·attempt·intent persistence | `queue-store.js` |
| Beads issue/dependency projection | 기존 bd adapter |

coordinator는 lane, attempt, `cleanup_failed`, PR observation을 자기 schema에
복사하지 않는다. 각 transition 전에 기존 durable state와 GitHub·Beads를 다시
읽어 split-brain을 피한다.

## 2. Durable state

`queue.json`에 root Bead ID를 key로 하는 `completion_intents`를 추가한다.

```js
completion_intents[root_bead_id] = {
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
  repair_sessions_used: 0,
  repair_bead_ids: [],
  subject_stack: [],
  active_op: null,
  terminal_reason: null
}
```

`subject_stack`은 linked repair로 subject를 바꾸기 직전의 subject를 oldest-first로
보존한다. repair PR이 merge되면 top subject를 authoritative하게 다시 gate한 뒤 같은
mutation에서 pop한다. 따라서 repair subject의 base failure로 nested repair가 생겨도
항상 root로 점프하지 않고 직전 repair subject로 돌아간다. legacy record에 이 key가
없으면 빈 stack으로 읽되, current subject가 repair인데 복귀 lineage가 없으면 새
예산을 추측하지 않고 `needs_human:repair_lineage_missing`으로 끝낸다.

`phase` vocabulary는 다음으로 제한한다.

- `gating`: current subject를 authoritative하게 관측·판정 중
- `repairing`: same-PR 또는 linked repair session이 실행/정산 중
- `waiting_repair_pr`: linked repair session 종료 뒤 PR 관측 대기
- `merging`: root 또는 repair subject를 기존 driver가 처리 중
- `cleaning`: landed root의 기존 cleanup 실행 중
- `paused`: `auto_merge` OFF로 새 operation 시작을 멈춤
- `needs_human`: 자동화 terminal
- `completed`: root merge와 cleanup 완료

`active_op`는 외부 effect의 logical exactly-once journal이다.

```js
active_op = {
  op_id: '<stable id>',
  kind: 'resume_root' | 'create_repair' | 'dispatch_repair' |
        'merge_subject' | 'retry_cleanup',
  failure_key: {
    stage: 'merge_gate',
    reason: 'verify_cmd_failed',
    subject_sha: '<40-hex>',
    base_sha: '<40-hex>',
    result_digest: '<sha256>'
  },
  attempt_id: '<preallocated id>', // session op이 아니면 null
  repair_bead_id: null,
  status: 'prepared' // prepared | dispatched | observed | consumed
}
```

`result_digest`는 bounded failure evidence(`reason`, normalized output tail,
check names/conclusions)의 SHA-256이다. 다른 SHA의 결과를 같다고 만드는 용도가
아니라, 한 pinned failure가 중복 소비되는 것을 막는 식별자다.
session operation identity에는 다음 `repair_sessions_used + 1` round도 포함한다. 같은
head와 같은 failure가 다시 관측돼도 이미 terminal인 이전 attempt를 재채택하지 않고
남은 두 번째 budget으로 새 attempt를 prerecord한다.

구버전 `queue.json`에 key가 없으면 `{}`로 정규화한다. 알 수 없는 phase,
invalid budget, malformed subject/op은 자동 실행하지 않고 해당 record를
`needs_human:intent_state_invalid`로 정규화한다. 잘못된 상태를 삭제해 새 예산을
주는 fail-open은 금지한다.

session op의 `attempt_id`는 spawn 전에 coordinator와 scheduler가 함께
preallocate하고, op prerecord·budget 증가·attempt prerecord를 하나의 queue-store
mutation으로 기록한다. create/merge/cleanup op만 `attempt_id: null`을 허용한다.

`completed` intent는 root의 `moveToDone`과 같은 mutation에서 기록한다. root가
bounded `done` lane에서 prune될 때 completed intent와 repair-child membership도
함께 제거한다. active·paused·`needs_human` record를 시간만으로 삭제하지 않는다.

## 3. Intake와 queue 직렬화

현재 auto-enroller는 gate가 이미 merge 가능한 행만 `merge_queue`에 넣는다.
completion intent에서는 auto mode가 켜진 worker-owned `pr_wait` 행 중 다음도
intake 대상이다.

- 현재 gate green인 root
- 기존 conflict-resolution 대상
- repairability classifier가 저장소 범위 failure로 판정한 red root
- already-merged + repairable cleanup failure root

intake는 root intent와 queue entry를 같은 store mutation에서 생성한다. 기존
`auto_merge_skips`는 repair budget이 없는 단순 skip과 수동 경로 호환을 위해
남기되, active completion intent의 terminal authority로 사용하지 않는다.

merge queue entry의 공개 identity는 root Bead로 유지한다. driver가 처리할 실제
Bead는 coordinator의 `subject.bead_id`다. linked repair가 필요하면 subject만
repair child로 바뀌며 새 독립 queue entry를 만들지 않는다. repair child가
완료되면 subject가 root로 돌아간다.

이 구조는 repair 중 뒤 PR을 기다리게 한다. 기존 conflict-resolution이 queue
head를 유지하는 것과 같은 이유다: base의 연속적인 이동, stale ownership,
동일 baseline repair의 중복 생성을 막는 안전성이 throughput보다 우선한다.

## 4. Authoritative data flow

### 4.1 Gate green

driver는 current subject를 `prActions.merge(subject.bead_id)`로 처리한다.

- subject가 root면 기존 merge·cleanup 성공 후 intent를 `completed`로 소비한다.
- subject가 repair child면 repair child의 merge·cleanup을 끝낸 뒤
  `subject_stack` top을 다시 pin해 직전 subject로 복귀한다. 직전 subject가 landed
  root면 `cleaning`, 아니면 `gating`으로 이어 간다.

### 4.2 Conflict

worker-owned root/repair child의 conflict는 기존 latest-session resume 경로와
`RESOLUTION_ROUND_CAP = 2`를 그대로 사용한다. conflict budget은 본 spec의
repair-session budget과 별도다. resolution 종료 뒤 current subject의 새 head를
관측하고 다시 gate한다.

### 4.3 Local verify red ownership probe

UI-7u3d의 flake retry까지 실패한 `verify_cmd_failed`를 대상으로 한다.

1. PR head와 target base tip을 다시 fetch·pin한다.
2. repo-required verify를 pinned base SHA의 detached worktree에서 실행한다.
3. base green이면 PR-owned regression으로 판정한다.
4. base도 repairable red면 base 자체가 independently broken이므로 linked repair를
   먼저 수행한다. head/base의 failure text가 완전히 같을 필요는 없다. base를
   green으로 만든 뒤 root를 재게이트하면 PR-only failure는 남은 1회 예산으로
   처리된다.
5. base probe가 timeout·spawn/auth/worktree/관측 오류처럼 source ownership을
   확정하지 못하면 `needs_human:ownership_undecidable`이다.

### 4.4 CI red ownership probe

CI가 merge tier를 소유하면 pinned base SHA의 GitHub check 결과로만 ownership을
판정한다.

- base checks green → PR-owned regression
- base checks red → linked base repair
- base checks absent/error/pending 또는 head/base binding 불일치 →
  `needs_human:ownership_undecidable`

local verify가 따로 존재해도 CI-only failure의 base ownership을 대신 증명하지
않는다. 서로 다른 signal을 같은 것으로 간주하는 fail-open을 막는다.

### 4.5 PR-owned repair

1. scheduler가 attempt ID를 preallocate하고, `beginRepairOp`가
   `active_op=resume_root`, `repair_sessions_used + 1`, attempt prerecord를 같은
   mutation으로 기록한다.
2. scheduler는 해당 Bead의 session ID가 있는 가장 최신 attempt를 선택해 같은
   worktree에서 resume한다.
3. transcript가 사라졌지만 worker-owned 전용 worktree와 branch ownership을
   증명할 수 있으면 fresh same-Bead attempt를 허용한다.
4. session은 failure evidence와 pinned head/base를 받고 저장소 변경·검증·feature
   branch push를 수행한다. PR을 merge하지 않는다.
5. 종료 뒤 새 PR head가 관측되면 기존 gate로 돌아간다. head가 움직이지 않았거나
   PR이 사라졌으면 남은 예산이 있을 때 새 failure로 다시 판정하고, 없으면
   `needs_human`이다.

### 4.6 Base-owned linked repair

1. `prepareCreateRepair`가 `create_repair` op를 먼저 기록한다. Bead 생성 자체는
   repair-session budget을 소비하지 않는다.
2. repair Bead ID는 `op_id`와 workspace prefix에서 결정론적으로 만든다.
   `bd create --id` 재시도는 같은 ID의 title/description/dependency를 readback해
   동일 operation임을 증명한다. 충돌하는 기존 Bead면 fail-closed다.
3. repair Bead는 Korean title/description, root에 대한 `discovered-from`, root가
   기다려야 할 때 기존 `blocks` dependency를 사용한다. 새 metadata key는 쓰지
   않는다.
4. Bead identity readback 뒤 scheduler가 attempt ID를 preallocate한다.
   `beginRepairOp`는 `dispatch_repair` op, `repair_sessions_used + 1`, attempt
   prerecord를 한 mutation으로 기록한다. 그 다음 pinned base SHA에서 fresh
   worktree/branch와 special repair dispatch를 시작한다. 이 dispatch는 root
   `auto_merge` authorization을 durable 근거로 삼되, ordinary runner guard와
   target-base contract를 그대로 사용한다.
5. repair session은 필요한 workflow route/spec/plan/review를 `fast_track`으로
   수행하고 PR 제출·Bead `resolved`까지 끝낸다. raw provider fallback이나
   guard 예외는 없다.
6. PR이 관측되면 current subject를 repair Bead로 바꾸고 기존 driver가 같은 root
   queue head에서 repair PR을 merge·cleanup한다.
7. repair child가 새 auto-enroller scan에서 보이더라도 독립 root intent를 만들지
   않는다. `repair_bead_ids`와 current subject membership이 그 판정의 SoT다.

### 4.7 Post-merge repair

root PR이 landed된 뒤 `post_merge_verify` 또는 저장소-owned cleanup command가
실패하면 원 branch를 다시 열지 않는다. merged base가 소유자이므로 fresh linked
repair Bead/PR을 만든다.

repair PR merge·cleanup 성공 뒤 root의 기존 `runCleanup` 전체를 처음부터 다시
실행한다. 각 step은 기존 idempotency를 유지해야 하며, 별도 cleanup step machine을
복제하지 않는다. 재실행 중 verify가 red면 red 상태를 보존하고 deploy/detached
launch로 넘어가지 않는다.

`base_fetch_failed`, credentials/permission, external service, bd restore/close,
branch cleanup처럼 저장소 PR로 안전하게 고칠 수 없는 cleanup failure는 자동
repair하지 않는다.

## 5. Session 계약

모든 repair session은 다음을 지킨다.

- 제공된 failure log/check와 pinned SHA를 먼저 재현한다.
- root 또는 linked repair Bead가 소유한 worktree 밖을 수정하지 않는다.
- 저장소의 코드·테스트·tracked config·lockfile·generated artifact는 필요하면
  수정할 수 있다.
- credentials·권한·외부 서비스·전역 환경은 변경하지 않는다.
- test 삭제·skip·assertion/threshold 약화는 금지한다.
- relevant verification과 repository-required verification을 수행한다.
- feature branch push와 PR 제출까지만 수행하고 merge하지 않는다.
- 질문이 필요한 hard stop은 무인 runner 계약대로 blocker로 종료한다.

same-Bead resume는 source attempt의 runner/model/effort/exec settings lineage를
상속한다. 여기서 same-Bead는 root에 한정되지 않고 현재 PR-owned
`subject.bead_id`다. fresh linked repair는 현재 workspace의 정상 runtime selector와 exec
resolution을 한 번만 적용하고 attempt에 기록한다. provider/model failure는 다른
provider로 fallback하지 않는다.

## 6. Budget과 중단 정책

- root lineage의 자동 code-repair session 상한은 총 2회다.
- budget은 spawn 전에 소비한다. spawn 성공 여부가 불명확해도 환불하지 않는다.
- restart, server deploy, PR head 변경, base 변경, repair child 생성은 budget을
  초기화하지 않는다.
- 기존 conflict-resolution 2회 cap과 verify flake 1회 retry는 code-repair budget을
  소비하지 않는다.
- `auto_merge`를 OFF로 바꾸면 새 repair/session/merge operation을 시작하지 않는다.
  실행 중 session은 kill하지 않고 결과를 기록한 뒤 intent를 `paused`로 둔다.
- 명시적 OFF는 기존 중단 의미대로 pending queue entry를 비울 수 있다. paused
  intent는 남으며, 다시 ON일 때 새 queue position으로 들어가 pinned state를
  재게이트한다. 사용자가 중단한 경계를 넘어 기존 position을 보존한다고
  약속하지 않는다.
- 이미 landed된 merge의 현재 idempotent cleanup step은 끝까지 수행한다. 실패 뒤
  새 repair PR이 필요하면 auto mode를 다시 켤 때까지 시작하지 않는다.
- `[다시 확인]`은 현 상태를 재관측·재게이트할 뿐 budget을 리셋하지 않는다.
  추가 AI session은 사람이 명시적으로 별도 승인해야 한다.

## 7. Restart reconciliation

process start와 queue change마다 coordinator는 `active_op`를 다음처럼 재조정한다.

| durable 상태 | 재관측 | 처리 |
|---|---|---|
| `prepared` repair op | 동일 `attempt_id` 존재 | `dispatched`로 채택 |
| `prepared` create op | deterministic Bead 존재·identity 일치 | `repair_bead_id` 채택 |
| `dispatched` session | attempt running/paused | 기다림 |
| `dispatched` session | attempt terminal | PR/head/result 재관측 후 `observed` |
| `waiting_repair_pr` | repair PR OPEN | repair subject로 전환 |
| `merging` | PR MERGED | 기존 cleanup state 재조정 |
| `cleaning` | root `done`/closed | `completed` |
| 어떤 상태든 pinned SHA 변경 | operation 결과 stale | 결과 미적용, 새 gate |

외부 effect 뒤 durable transition 전에 crash가 날 수 있으므로 event 수신만으로
완료를 판정하지 않는다. deterministic `op_id`, attempt record, Bead identity,
GitHub PR state, queue lane을 함께 읽는다. 관측이 모순되면 새 operation을 만들지
않고 `needs_human:reconciliation_ambiguous`로 멈춘다.

자기 저장소 repair PR의 detached deploy가 server를 재시작해도 동일 규칙으로
root head와 budget을 복구한다.

## 8. External PR과 수동 race

- worker-owned PR는 latest session resume가 기본이다.
- session ID가 없어도 전용 worktree·branch ownership을 증명할 수 있으면 fresh
  same-Bead attempt를 허용한다.
- external row에 소유 worktree가 없으면 PR-owned 자동 repair를 거부한다.
- manual merge/cleanup과 coordinator가 동시에 같은 subject를 실행하지 않도록
  기존 action-in-flight lock과 intent `active_op`을 함께 확인한다.
- 사람이 먼저 PR을 merge했다면 coordinator는 merge를 재호출하지 않고 기존
  observed-merge cleanup 경로를 채택한다.
- 사람이 head를 push하면 stale session 결과는 적용하지 않고 새 head를
  authoritative하게 gate한다.

## 9. Beads와 workflow 계약 경계

workflow metadata vocabulary의 canonical owner는 dotfiles 계약이다. 이 기능은
새 Beads metadata key를 정의하지 않는다.

- durable orchestration SoT: `queue.json.completion_intents`
- 사용자에게 보이는 lineage: 기존 `discovered-from` / `blocks` dependency
- evidence: Bead description/notes와 PR URL
- repair session의 route/spec/plan/review receipts: 기존 workflow key만 사용

Beads dependency는 가시성과 ready gating을 제공하지만 external effect journal을
대신하지 않는다. queue mutation·GitHub merge·session budget과 원자적으로 묶을
수 없기 때문이다.

## 10. UI와 관측성

root pr-wait card 하나에 coordinator 상태를 표시한다.

- `자동복구 1/2 · 원 PR 수정 중`
- `자동복구 1/2 · repair PR 준비 중`
- `repair PR #N 대기` / `repair PR #N 머지 중`
- `root 재검증 중`
- `정리 복구 중`
- `자동복구 일시정지`
- `사람 확인 필요 · <terminal_reason>`

repair child를 독립 root card로 중복 표시하지 않는다. 상세에는 pinned head/base,
failure stage/reason, log/check evidence, active attempt, repair Bead/PR 링크,
사용 budget을 노출한다. contract key나 optional evidence가 없으면 fail-quiet하되,
intent state 자체가 malformed면 조용히 숨기지 않고 terminal badge를 표시한다.

기존 `[AI 정리]`와 수동 `[머지]` 경로는 보존한다. auto mode OFF 또는 terminal
상태에서 사람이 진단·재확인할 수 있는 보완 경로다.

## 11. Error policy

### 자동 repair 후보

repairability는 free-form agent 판단이 아니라 다음 allowlist로 시작한다.

| 단계 | reason | 자동 처리 |
|---|---|---|
| merge gate | `verify_cmd_failed` | pinned base verify로 ownership 판정 |
| merge gate | `ci_failed` | pinned base checks로 ownership 판정 |
| merge gate | conflict | 기존 conflict-resolution |
| post-merge verify | `verify_cmd_failed` | merged-base linked repair |
| deploy | `deploy_config_invalid`, `deploy_missing_for_self`, `deploy_not_detached_for_self`, `deploy_verify_missing` | merged-base linked repair |
| deploy | `deploy_failed` | linked repair session이 repo 변경으로 재현·수정; repo 밖 원인이면 blocker 종료 |

`verify_config_invalid`는 tracked declaration 문제여도 자동 repair 대상이 아니다.
target base의 verify declaration이 merge gate를 소유하므로, 그 declaration을
고치는 repair PR도 같은 invalid base gate를 통과할 수 없는 bootstrap
순환이 생긴다. 별도 안전한 bootstrap gate가 승인되기 전에는 사람에게 넘긴다.

### 즉시 사람 인계

- credentials, authentication, permission
- external service/global environment mutation 필요
- base/head SHA 또는 CI binding 관측 불가
- source ownership undecidable
- `verify_config_invalid`, `verify_cmd_timeout`, `verify_cmd_spawn_error`
- `deploy_timeout`, `deploy_spawn_error`, `deploy_self_check_failed`,
  `deploy_base_not_synced`
- worktree/branch ownership 증명 실패
- spawn ambiguity 뒤 남은 budget 없음
- bd close/restore, branch cleanup, irreversible/manual operator action
- repair session 2회 소진
- malformed or contradictory durable state

모든 terminal record는 `reason`, `stage`, `failure_key`, `evidence/log_path`,
`repair_sessions_used`, `active subject`, `at`을 유지한다.

## 12. Test scope

### Queue store

1. legacy `queue.json`이 빈 `completion_intents`로 로드된다.
2. valid/invalid intent와 op normalization이 fail-closed한다.
3. intent 생성 + root queue placement가 한 mutation이다.
4. `beginRepairOp`가 budget 증가 + op prerecord를 한 mutation으로 수행한다.
5. 2회 cap을 넘는 mutation이 거부된다.
6. repair child membership이 새 root intent 생성을 막는다.

### Coordinator unit

1. green → existing merge action.
2. conflict → existing resolution action, repair budget 불변.
3. PR red + base green → latest same-Bead resume.
4. PR red + base red → deterministic linked repair create/dispatch.
5. repair PR OPEN → repair subject 전환; merge 완료 → root subject 복귀.
6. post-merge verify red → merged-base linked repair → root cleanup retry.
7. head/base 변경 → stale result 미적용 + re-gate.
8. `auto_merge` OFF → new action 없음 + active session 결과 기록 후 paused.
9. external worktree 부재·ownership undecidable·budget cap → terminal.

### Scheduler and runner

1. resume가 latest session/worktree/exec lineage를 사용한다.
2. transcript 부재 fresh fallback은 ownership proof가 있을 때만 허용된다.
3. linked repair가 deterministic Bead identity와 pinned base worktree를 사용한다.
4. concurrent/restart dispatch가 같은 attempt/Bead를 중복 생성하지 않는다.
5. repair prompt와 runner preamble이 PR-submit·no-merge·guard 계약을 보존한다.
6. test weakening과 external/global mutation 금지 문안 snapshot.

### Merge and cleanup integration

1. root queue head가 repair session/PR 동안 유지된다.
2. driver만 root/repair PR의 `merge()`를 호출한다.
3. repair child가 새 root budget을 얻지 않는다.
4. repair child cleanup의 self-deploy restart 뒤 root intent가 복구된다.
5. post-merge repair 뒤 동일 `runCleanup` 전체가 idempotent하게 재실행된다.
6. retry verify red가 deploy/detached launch를 호출하지 않는다.

### Crash boundary

다음 각 지점 직후 process 종료·재시작을 주입한다.

1. op prerecord 뒤 / spawn 전
2. spawn 뒤 / attempt adoption 전
3. Bead create 뒤 / `repair_bead_id` 기록 전
4. repair PR open 뒤 / subject 전환 전
5. GitHub merge landing 뒤 / local transition 전
6. root cleanup record 뒤 / terminal consume 전
7. detached self-deploy launch 뒤

각 테스트는 중복 session, duplicate Bead, duplicate PR merge, budget reset이 없음을
검증한다.

### Fake-runner E2E

1. PR-owned failure → resume → new head green → root merge/cleanup 완료.
2. base-owned failure → linked repair PR merge → root 재검증 → 완료.
3. post-merge failure → linked repair PR merge → cleanup 재실행 → 완료.
4. 두 repair 모두 red → `needs_human`, queue와 UI에 durable evidence 유지.

### UI

root 카드의 phase/budget/repair link/paused/terminal badge와 button 상태를 각각
검증한다. optional field 부재는 미렌더, malformed intent는 terminal 표시다.

## 13. 구현 단계

1. **Durable journal**: queue schema·atomic APIs·coordinator skeleton·migration tests.
2. **Repair dispatch**: base probe, same-session resume, deterministic linked repair
   Bead/worktree/session.
3. **Pre-merge continuity**: auto-enroller intake 확장, root head/current subject,
   repair PR subordinate merge, re-gate.
4. **Post-merge continuity**: merged-base repair, cleanup replay, restart reconciliation.
5. **UI·E2E·문서 전파**: badges/detail/actions, fake-runner E2E, bundle, runtime docs.

각 단계는 독립 RED→GREEN seam을 갖지만, root queue entry와 intent schema가 먼저
land되어야 뒤 단계가 같은 durable authority를 사용한다. 따라서 구현은
`full_plan`에서 phase child와 exact test seam으로 분해한다.

## 14. 마감 조건

- spec/plan/implementation review gate 영수증이 현재 SHA에 fresh하다.
- `npm run lint`, `npm run tsc`, `npm test`, `npm run prettier:check`가 통과한다.
- frontend 수정 뒤 `npm run build` 결과인 `app/main.bundle.js`와 map을 포함한다.
- fake-runner E2E가 원 PR/base/post-merge/budget terminal 네 경로를 통과한다.
- PR merge 뒤 merged checkout에서 `bdui-shared restart`를 실행한다.
- 실제 process path, listening port, `/healthz` 응답을 확인한다.
- root intent와 linked repair Bead/PR/attempt lineage가 UI와 durable state에서
  일치한다.

## 관련

- `docs/superpowers/specs/2026-07-28-pr-auto-merge-toggle-design.md`
- `docs/superpowers/specs/2026-07-28-pr-wait-merge-queue-design.md`
- `docs/superpowers/specs/2026-08-06-post-merge-verify-retry-design.md`
- `server/worker/auto-merge.js`
- `server/worker/merge-queue.js`
- `server/worker/pr-actions.js`
- `server/worker/scheduler.js`
- `server/worker/queue-store.js`
