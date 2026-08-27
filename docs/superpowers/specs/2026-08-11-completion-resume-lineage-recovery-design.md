# Completion resume lineage 복구 설계

> **부분 은퇴 (UI-8w4t, 2026-08-27).** `## Design` §1~§3과 그에 딸린
> `## Test scope` 항목은
> post-merge 완료 자동 AI 수리 레인에 의존하므로 은퇴했다. 그 레인의 제거
> 근거는 `docs/superpowers/specs/2026-08-27-completion-repair-lane-removal-design.md`
> 이며, 나머지 절은 그대로 유효하다.

## Context

`UI-x9tu`의 자동머지 completion intent는 repair session을 띄울 때
`completion_root_id`, `completion_op_id`, `completion_mode`,
`completion_failure_key`를 attempt에 기록하고, `active_op.attempt_id`와 정확히 일치하는
terminal settlement만 소비한다. 이 결합은 재시작과 중복 callback에서 exactly-once에
가까운 논리적 정산을 제공한다.

하지만 completion-owned attempt가 `paused`된 뒤 Worker의 일반 `▶ 이어하기` 경로를
통과하면 새 child attempt에는 `resumed_from`만 기록된다. completion lineage는 복사되지
않고 `active_op.attempt_id`도 paused ancestor를 계속 가리킨다. child가 PR을 수정하고
정상 종료해도 scheduler settlement hook은 이를 completion attempt로 인식하지 못하며,
coordinator는 paused ancestor를 계속 in-flight로 본다. root merge queue head는
`repairing`에 고정되고 뒤 항목도 진행되지 않는다.

2026-08-11의 실제 incident에서는 `beads-i59` PR #8의 child attempt가 새 head
`baaff68…`를 push하고 CI 47개를 모두 통과했지만, durable intent는 old head
`1de580…`와 paused attempt `completion-8e5a…-attempt`를 계속 가리켰다. 같은 queue의
`beads-456` PR #9는 두 번째 항목이라 자동복구 차례를 받지 못했다.

## Goals

1. completion-owned attempt의 일반 resume가 child attempt로 journal ownership을
   원자적으로 이전한다.
2. 이 수정 이전에 이미 만들어진 `paused ancestor → metadata 없는 descendant` 상태는
   단 하나의 검증 가능한 leaf로 수렴할 때 자동 채택한다.
3. completion phase 전환이 merge drain 도중 발생해도 wakeup이 유실되지 않고 root merge와
   다음 queue 항목까지 계속 진행한다.
4. 일반 attempt의 기존 resume, conflict/disposition/cleanup diagnosis resume, repair session
   2회 예산, failure-key pinning, merge/cleanup 소유권을 바꾸지 않는다.

## Non-goals

- 새 Beads metadata key, queue schema key, UI badge, 버튼을 추가하지 않는다.
- descendant가 분기됐거나 다른 Bead·operation·failure key와 충돌할 때 자동으로 하나를
  고르지 않는다.
- CI red PR을 gate 우회로 머지하거나 test·check를 약화하지 않는다.
- 이미 수행된 외부 effect를 되돌리거나 remote history를 rewrite하지 않는다.

## Design

> **은퇴 (UI-8w4t).** 여기서 말하는 completion-owned attempt는 전부 자동 수리
> 세션이었다. 그 레인이 사라지면서 §1~§3은 실행되지 않는다 — 근거는
> `docs/superpowers/specs/2026-08-27-completion-repair-lane-removal-design.md`
> 이다.

### 1. Atomic completion ownership transfer

`queue-store`가 completion-owned resume의 유일한 durable writer가 된다. 새 store API는
source attempt와 새 child attempt를 받아 다음 조건을 한 snapshot에서 검증한다.

- source가 `completion_root_id`, `completion_op_id`, `completion_mode`,
  `completion_failure_key`를 모두 가진다.
- 해당 root intent의 `active_op`가 source의 operation identity와 attempt ID를 정확히
  가리킨다.
- source를 이미 resume한 다른 child가 없고 새 attempt ID가 비어 있다.
- child의 Bead, repo, target base, runner/session lineage가 source resume 규칙과 같다.

검증이 통과하면 한 persist에서 child attempt를 append하고 source의 completion 필드 네
개를 child에 복사하며 `active_op.attempt_id`를 child ID로 바꾼다. `op_id`, failure key,
repair budget, phase는 바꾸지 않는다. persist가 실패하면 child launch와 metadata stamp를
시작하지 않는다.

completion-owned source가 아닌 일반 resume는 기존 `prerecordAttempt` 경로를 그대로
사용한다. scheduler는 source의 completion 필드 존재 여부로 두 store 경로를 선택하지만
journal 의미를 직접 수정하지 않는다.

### 2. Legacy descendant adoption

coordinator reconciliation은 active completion attempt가 `paused`이고 자신을 resume한
descendant가 있을 때 legacy adoption을 시도한다. 탐색은 `resumed_from` 방향으로만 하며,
다음 조건을 모두 만족하는 단 하나의 leaf만 채택한다.

- active attempt에서 시작하는 chain이고 모든 node가 같은 root Bead에 속한다.
- 각 node가 정확히 하나의 child만 가지며 cycle과 분기가 없다.
- descendant에 다른 non-null completion identity가 있으면 active operation과 정확히
  일치한다.
- leaf가 `running`, `paused`, 또는 terminal attempt 상태 중 하나로 정상화 가능하다.

store는 검증된 leaf에 누락된 completion 필드를 backfill하고
`active_op.attempt_id`를 leaf로 옮기는 작업을 한 persist로 수행한다. running/paused leaf는
그대로 기다리고 terminal leaf는 기존 `onAttemptSettled`에 전달한다. 이 실제 incident처럼
terminal child가 새 PR head를 push했다면 authoritative PR gate를 다시 읽어 subject를
갱신한 뒤 `gating`으로 전환한다.

분기, cycle, Bead mismatch, conflicting completion identity, 사라진 leaf는 자동 채택하지
않고 기존 fail-closed terminal 경로로 `needs_human` evidence를 남긴다. descendant 추론은
legacy 복구에만 사용하며, 새 resume는 항상 atomic transfer를 통과해야 한다.

### 3. Merge drain wakeup latch

현재 merge driver의 `kick()`은 drain 중이면 즉시 반환한다. completion result handoff가
drain 안에서 phase를 `merging`으로 바꾸고 같은 call stack에서 kick할 경우, subscriber도
`draining=true` 때문에 재진입하지 않아 후속 drain이 유실될 수 있다.

merge queue는 `drain_requested` latch를 둔다. start, explicit kick, 그리고 halted condition을
해소하는 queue event는 latch를 세운다. drain은 단일 실행을 유지하되 종료 직전에 latch를
다시 확인하여 새 요청이 있으면 다음 pass를 예약한다. 같은 unreadable head를 무한
재시도하지 않도록 기존 `halted_on_head`·`halted_on_completion` 조건이 요청 생성 여부를
계속 결정한다.

이 변경은 parallel merge를 도입하지 않는다. 한 시점에 하나의 drain만 실행하고 항상
durable queue head를 다시 읽는다.

## Data flow

1. 사용자가 paused completion attempt에 `▶ 이어하기`를 요청한다.
2. scheduler가 fresh Bead admission과 worktree/session ownership을 검증한다.
3. queue-store가 child prerecord와 `active_op.attempt_id` 이전을 원자적으로 persist한다.
4. scheduler가 기존 resume runner를 실행한다.
5. child settlement가 자신의 completion identity로 coordinator에 전달된다.
6. coordinator가 GitHub PR head/base/checks를 다시 읽고 intent를 `gating`으로 전환한다.
7. green gate는 intent를 `merging`으로 전환하고 merge queue를 kick한다.
8. drain latch가 root merge, cleanup, dequeue, 다음 root 처리까지 wakeup을 보존한다.

legacy queue는 3번 대신 coordinator가 단일 descendant를 채택한 뒤 5번부터 같은 경로를
사용한다.

## Error handling and safety

- atomic transfer의 CAS 또는 persist 실패는 resume를 거부하고 ancestor ownership을
  유지한다.
- child launch 실패는 completion identity를 가진 terminal attempt로 기록되어 기존
  settlement/repair budget 규칙으로 정산된다.
- legacy adoption이 모호하면 새 attempt나 새 PR을 만들지 않는다.
- stale callback은 current `op_id + attempt_id + failure_key` 전부가 맞지 않으면 계속
  무시한다.
- merge queue의 후속 pass는 이전 pass와 병렬 실행되지 않으며, stop 이후 예약하지 않는다.
- PR #9처럼 CI가 red인 root는 직접 merge하지 않고 기존 ownership probe와 최대 2회의
  repair session 규칙을 그대로 따른다.

## Rollout and runtime recovery

코드가 `main`에 merge된 뒤 canonical shared service를 재시작한다. startup reconciliation이
`beads-i59`의 unique terminal descendant를 채택하고 current PR #8 head를 재게이트해야
한다. PR #8이 여전히 green/mergeable이면 기존 merge queue가 이를 merge·cleanup하고 첫
항목을 dequeue한다. 이후 PR #9가 queue head가 되어 CI red ownership probe와 자동복구를
시작해야 한다.

runtime 검증은 process path, listening port, HTTP response뿐 아니라 다음 durable/live
상태까지 확인한다.

- `beads-i59` intent가 `repairing/dispatched`에 남지 않는다.
- merge queue에서 `beads-i59`가 제거되거나 terminal evidence로 명시적으로 정산된다.
- `beads-456`이 새 head로 진행하며, CI red 상태에서 gate를 우회해 merge되지 않는다.
- service restart 후 duplicate repair attempt, duplicate merge, budget 추가 소비가 없다.

## Test scope

### RED-GREEN seams

1. `server/worker/queue-store.test.js`
   - completion-owned resume가 child append와 active-op rebind를 한 persist로 수행한다.
   - mismatch, duplicate child, stale revision은 아무 state도 바꾸지 않는다.
   - legacy unique leaf adoption은 identity를 backfill/rebind하고 분기·cycle은 거부한다.
2. `server/worker/scheduler.test.js`
   - paused completion attempt의 일반 resume child가 completion identity를 보존한다.
   - ordinary resume와 conflict/disposition resume의 기존 record shape는 유지된다.
   - child launch failure도 coordinator settlement에 도달한다.
3. `server/worker/completion-intent.test.js`
   - legacy terminal descendant를 채택한 뒤 fresh PR subject로 `gating`에 진입한다.
   - ambiguous descendant는 `needs_human`으로 fail-closed한다.
4. `server/worker/merge-queue.test.js`
   - drain 중 completion phase가 `merging`으로 바뀌고 kick되어도 후속 pass가 실행된다.
   - root dequeue 뒤 다음 queue item이 같은 serial driver에서 진행된다.
5. `server/e2e/worker-flow.test.js`
   - pause → generic resume → PR update/green → root merge/cleanup → next root advance를 한
     root intent와 한 repair budget으로 완료한다.
   - persisted legacy incident fixture를 store/coordinator 재생성 후 자동 복구한다.

### Verification bundle

- 위 focused test files
- `npm run tsc`
- `npm run lint`
- `npm run prettier:write`
- `npm test`
- `npm run build`
- `npm run all`
- merged checkout의 `bdui-shared restart` 후 process/path/port/HTTP 및 External/beads
  completion/merge queue live readback

## Completion boundary

완료는 테스트 통과만으로 선언하지 않는다. 새 resume가 원자 journal transfer를 사용하고,
legacy incident가 모호성 없이 자동 채택되며, merge wakeup이 root merge와 다음 item 진행을
보존하고, merged `main`의 shared service에서 실제 `beads-i59`/`beads-456` queue가 위 rollout
조건대로 수렴해야 한다. 외부 CI red나 ownership 불명확으로 진행이 멈추면 gate를 우회하지
않고 concrete evidence와 함께 `needs_human` 또는 기존 failure 상태를 보고한다.
