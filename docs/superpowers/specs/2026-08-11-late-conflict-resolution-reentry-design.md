# 늦게 완료된 충돌 해소의 자동 머지 재진입 설계

## Context

`UI-yup9`는 자동 머지 conflict-resolution session이 30분보다 오래 걸렸을 때
정상적으로 늦게 완료돼도 자동 머지 흐름에 돌아오지 못하는 문제를 고친다.

실제 `beads-456` incident에서는 resolver가 약 57분 동안 실행됐다. merge driver는
30분 wait가 끝난 시점에 `resolution_timeout`을 반환했고, completion coordinator는 이를
`needs_human` terminal로 기록했다. 그 뒤 PR head가 바뀌어 GitHub gate가 `CLEAN`이 되고
session도 정상 종료했지만, terminal completion intent는 auto-enroller와 coordinator 양쪽에서
제외되므로 자동 머지가 다시 시작되지 않았다.

문제의 원인은 30분이라는 숫자 자체가 아니라, 하나의 시간을 두 의미로 사용한 데 있다.

- merge queue가 한 resolver를 기다리며 뒤 PR까지 막아 둘 최대 시간
- 해당 resolver와 자동 completion saga를 실패로 판정하는 시간

충돌 해소는 30분을 넘길 수 있다. 따라서 30분은 첫 번째 의미인 **queue-yield deadline**만
가진다. session은 계속 실행되고, 늦게 완료되면 latest PR state를 다시 gate한 뒤 자동
머지에 재진입한다.

## 사용자 확정 결정

- 30분은 유지하되 failure timeout이 아니라 queue-yield deadline으로 바꾼다.
- 30분 뒤에는 다른 merge queue item이 진행할 수 있다.
- resolver가 끝나면 현재 진행 중인 merge 바로 다음 순서로 우선 재진입한다.
- 재진입은 이전 관측을 믿지 않고 latest head/base/checks를 full re-gate한다.
- `CLEAN`은 자동 머지, `BEHIND`는 base update와 checks 뒤 재게이트,
  `DIRTY`는 남은 budget 안에서 다음 resolver round로 이어진다.
- 시간 경과만으로 resolution round를 소비하지 않는다.
- `needs_human`은 lost attempt, lineage mismatch, 증명할 수 없는 상태, 실제 bounded failure
  같은 안전 경계에만 사용한다.
- queue-yield deadline은 process restart마다 다시 30분으로 초기화하지 않는다.

## Goals

1. 30분보다 오래 실행되는 conflict-resolution session을 중단하거나 terminalize하지 않는다.
2. 기다리는 동안 다른 합법적인 merge queue item이 진행할 수 있게 한다.
3. 늦은 settlement를 exactly-once에 가깝게 같은 queue item에 다시 결합한다.
4. 재시작, pause/resume lineage, 중복 queue event에서도 duplicate resolver와 hot loop를
   만들지 않는다.
5. 재진입 시 base drift를 latest authoritative gate로 흡수한다.
6. 기존 `beads-456`의 `needs_human/resolution_timeout` 상태를 안전하게 자동 복구한다.

## Non-goals

- conflict-resolution session 자체의 최대 실행 시간을 새로 정하지 않는다.
- resolution round cap 또는 completion repair-session cap을 없애거나 합치지 않는다.
- CI red, unreadable GitHub state, ownership ambiguity를 우회해 merge하지 않는다.
- 다른 Worker attempt를 병렬로 허용하도록 `worker-serial` launch fence를 약화하지 않는다.
- external GitHub merge의 post-merge cleanup trigger 계약을 바꾸지 않는다.
- `resolution_timeout` historical display vocabulary를 삭제하지 않는다.

## Contract amendment

이 설계는 다음 기존 문구 중 **시간 경과를 terminal failure로 보는 부분만** 대체한다.

- `2026-07-28-pr-wait-merge-queue-design.md`의 30분 timeout → failure/skip 규칙
- `2026-08-11-self-healing-auto-merge-completion-intent-design.md`의
  `resolution_timeout` → `needs_human` 규칙

다음 기존 계약은 그대로 유지한다.

- merge effect와 전체 completion saga는 completion intent가 소유한다.
- conflict wait, conflict round, merge queue 순서는 merge driver가 소유한다.
- resolution round cap과 completion repair-session cap은 서로 다른 budget이다.
- merge와 cleanup은 한 시점에 하나의 serial driver만 수행한다.
- authoritative gate가 불명확하면 fail-closed한다.

## Design

### 1. Durable resolution wait record

`server/worker/queue-store.js`의 `MergeQueueEntry`에 optional durable record를 추가한다.

```text
resolution: null | {
  attempt_id: string,
  subject_bead_id: string,
  deadline_at: number,
  state: "waiting" | "yielded" | "ready",
  yielded_at: number | null,
  settled_at: number | null
}
```

- entry의 `bead_id`는 queue ownership ID다. completion intent에서는 root Bead이고,
  ordinary/external conflict에서는 실제 subject Bead다.
- `subject_bead_id`는 resolver가 고친 실제 PR subject다. completion repair PR처럼 root와
  subject가 다른 경우를 구분한다.
- `attempt_id`는 정확한 conflict-resolution attempt와 resume descendant chain의 anchor다.
- `deadline_at`은 absolute epoch ms이며 process uptime이나 새 `now + 30m`가 아니다.
- `yielded_at`과 `settled_at`은 UI/ordering/debug evidence이며 retry budget이 아니다.
- 기존 `resolution_rounds`는 그대로 유지한다. timeout/yield mutation은 이 값을 바꾸지 않는다.

record는 30분이 지난 뒤가 아니라 resolver dispatch/adoption 직후부터 쓴다. fresh attempt는
durable `attempt.started_at + 30m`를 deadline으로 쓰고, legacy running attempt를 boot에서
채택할 때도 유효한 `started_at`을 사용한다. wait binding persist가 실패하면 `merge()`를
재호출하지 않고 drain을 멈춘다.

malformed record를 normalize 과정에서 `null`로 지우면 duplicate resolver가 생길 수 있다.
따라서 invalid record는 queue item과 함께 보존 가능한 canonical invalid evidence로 읽고,
driver가 `resolution_wait_invalid`로 fail-closed한다. 구현 field shape는 달라도 되지만
“malformed wait를 no-wait로 해석하지 않는다”는 invariant를 지켜야 한다.

### 2. State transitions

#### dispatch/adopt → `waiting`

`merge()`가 `conflict_resolution`과 exact `attempt_id`를 반환하거나 boot reconcile이 하나의
running attempt를 명확히 찾으면, driver는 wait record를 먼저 persist한다. 같은 entry에
unsettled resolution record가 있는 동안에는 `merge()`나 두 번째 resolver를 호출하지 않는다.

`waiting`에서는 기존처럼 current queue turn을 유지한다.

- attempt가 `running`이면 deadline 또는 settlement까지 기다린다.
- leaf `paused` attempt는 in-flight로 본다. resume child가 생기면 `resumed_from` chain을 따라
  exact leaf를 기다린다.
- `now < deadline_at`이면 queue head를 유지한다.
- `now >= deadline_at`이면 attempt를 건드리지 않고 `yielded`로 전환한다.

#### `waiting` → `yielded`

deadline 도달 mutation은 한 persist에서 다음을 수행한다.

1. exact `bead_id + attempt_id + subject_bead_id + state=waiting`을 확인한다.
2. `state=yielded`, `yielded_at=now`를 기록한다.
3. `resolution_rounds`와 completion intent를 그대로 둔다.
4. item을 runnable FIFO 뒤의 deferred suffix로 옮긴다.

이 전이는 failure가 아니므로 다음을 하지 않는다.

- `resolution_timeout` failure/skip 기록
- `auto_merge_skips` 생성
- completion intent terminalize
- resolution round 증가
- session stop/pause

merge queue의 durable order는 `[runnable items..., yielded items...]` partition을 유지한다.
새 auto/manual enqueue는 첫 yielded item 앞에 들어가므로 장기 resolver 하나가 나중에 들어온
clean PR을 다시 막지 않는다. runnable item이 없으면 driver는 정상적으로 drain을 끝내고
attempt transition을 기다린다.

#### `yielded` → `ready`

scheduler의 durable attempt transition이 queue-changed event를 보내면 driver는 모든 yielded
record를 검사한다. exact attempt/resume leaf가 terminal이면 한 persist에서 `ready`와
`settled_at`을 기록하고 item을 재배치한다.

- 현재 active merge item이 durable queue에 남아 있으면 그 바로 뒤
- active item이 없거나 이미 dequeue됐으면 runnable head
- 이미 ready인 item이 여러 개면 `settled_at`, 그다음 기존 queue order로 안정 정렬

동일 mutation은 old state와 identity를 비교한다. duplicate settlement event와 stale ancestor
event는 no-op이며 queue entry를 두 번 만들거나 순서를 뒤집지 않는다.

attempt가 사라졌거나, descendant가 분기됐거나, subject/root가 바뀌었거나,
`conflict_resolution !== true`이면 자동으로 하나를 추측하지 않는다. completion-owned item은
구체적인 lineage reason으로 `needs_human`에 보내고, ordinary item은 기존 durable skip/failure
경계를 사용한다.

#### `ready` → full re-gate

`ready` item 차례에는 resolver 시작 전의 gate/result를 재사용하지 않는다. side-effect 없는
authoritative probe로 latest PR head/base/checks/mergeability를 읽는다.

- `MERGED`: 기존 cleanup/already-merged 경로로 이어간다.
- `CLEAN`: wait record를 소비하고 기존 merge/cleanup 경로를 실행한다.
- `BEHIND`: base update와 required local/check gate를 실행한 뒤 다시 authoritative probe한다.
  wait identity는 판단이 끝날 때까지 유지한다.
- `DIRTY`: 여기서만 방금 끝난 실제 attempt의 round를 한 번 소비한다. 새 count가 cap에
  도달하면 새 resolver를 띄우지 않고 bounded terminal로 끝낸다. budget이 남았으면 exact 한
  개의 다음 resolver를 dispatch하고 새 `waiting` record로 교체한다.
- CI red, closed-unmerged, unreadable/undecidable: 기존 gate와 completion recovery 정책으로
  처리하며 merge를 우회하지 않는다.

현재 `pr-actions.merge()`는 `DIRTY`를 관측하면서 resolver dispatch까지 한 번에 수행한다.
cap을 검사한 뒤에만 다음 resolver를 띄우려면 probe-only re-gate 또는 driver-approved
conflict dispatch seam을 분리해야 한다. “cap을 확인하려고 이미 초과 resolver를 띄우는”
구현은 허용하지 않는다.

### 3. Completion intent ownership

completion-owned item이 기다리는 동안 intent는 새 phase로 이동하지 않는다.

```text
phase = "merging"
active_op.kind = "merge_subject"
```

queue-yield는 merge effect를 완료하거나 실패시킨 것이 아니므로 active operation journal도
그대로 둔다. `completion-intent.js`는 새 live path에서 `resolution_timeout`을 만들거나
terminalize하지 않는다. `resolution_round_cap`, lineage ambiguity, lost attempt처럼 실제로
bounded/undecidable한 결과만 기존 `needs_human` terminal authority에 넘긴다.

coordinator와 merge driver가 같은 queue item을 서로 다른 head로 판단하지 않게 queue-store의
runnable/deferred ordering을 source of truth로 삼는다. completion coordinator는 durable
runnable head만 관찰하고, yielded root는 driver의 resolution reconciler가 settlement 전까지
소유한다.

### 4. Restart and event safety

- `deadline_at`은 absolute 값이라 restart가 30분 clock을 초기화하지 않는다.
- boot에서 `waiting` deadline이 이미 지났으면 즉시 `yielded` mutation을 수행한다.
- `yielded` attempt가 boot 전에 끝났으면 첫 reconciliation에서 `ready`로 승격한다.
- `ready`는 durable하므로 promotion 직후 crash해도 full re-gate부터 다시 시작한다.
- `waiting/yielded` identity가 존재하는 동안 duplicate resolver dispatch를 금지한다.
- queue event마다 무조건 drain하지 않는다. attempt state 검사 결과 durable transition이 실제로
  일어난 경우에만 coalesced kick을 요청한다.
- persist 실패는 같은 item을 보존하고 halt한다. 실패한 half-transition을 추정해 진행하지 않는다.

### 5. Auto-merge OFF and cancellation

auto-merge OFF는 resolver process를 강제로 종료하지 않지만 후속 자동 merge를 멈춘다.

- active `waiting` item은 deadline에 도달하면 `yielded` evidence까지 기록할 수 있다.
- attempt가 끝나면 `ready`까지 정산할 수 있지만 `auto_merge=false` 동안 merge/update/새 resolver
  effect는 실행하지 않는다.
- auto-merge를 다시 켜면 durable `ready`/`yielded` state에서 이어간다.
- 사용자가 허용된 cancel/discard 경로로 queue item을 제거했다면 late settlement만으로 item을
  부활시키지 않는다.

completion intent action lock과 기존 cancel contract는 유지한다. queue entry 제거와 completion
pause/resume가 필요한 경우 기존 auto-merge toggle의 원자 경계를 사용한다.

### 6. `worker-serial` compatibility

queue-yield는 merge FIFO의 장기 wait를 완화할 뿐 Worker launch reservation을 바꾸지 않는다.

- active `worker-serial` lineage의 same-Bead resume/repair/conflict-resolution은 계속 허용한다.
- 다른 Bead의 새 Worker attempt는 기존 `worker_serial_pending` /
  `worker_serial_active` guard를 그대로 통과해야 한다.
- clean PR의 merge/cleanup 자체는 기존 worker-serial spec처럼 scheduler launch contract 밖에 있다.
- 뒤 PR도 conflict/repair session이 필요하면 그 **session launch**는 기존 serial fence를 우회하지
  않는다.
- 전역 `pr_wait_holds_slot` 의미도 바꾸지 않는다.

즉 이 설계는 “30분 뒤 merge queue가 양보 가능해진다”만 추가하며, 양보받은 item이 실행할
수 있는 side effect의 합법성은 기존 scheduler/merge gate가 계속 결정한다.

### 7. Legacy `resolution_timeout` recovery

새 코드가 배포되기 전에 기록된 terminal state를 그대로 두면 `beads-456`은 고쳐지지 않는다.
startup completion reconciliation은 다음 strict one-time adoption을 수행한다.

대상 조건:

- intent phase가 `needs_human`
- terminal reason/stage가 `resolution_timeout` / `conflict_resolution`
- active operation이 root/subject의 `merge_subject` lineage와 모순되지 않음
- authoritative PR observation을 읽을 수 있음

판정:

- current PR이 `MERGED`, `CLEAN`, 또는 안전하게 update 가능한 `BEHIND`이면 terminal reason을
  지우고 intent를 `merging`으로 되돌린다. 보존된 `merge_subject` active operation을 유지한 채
  root를 merge queue에 exactly once 재진입시켜 driver가 다시 authoritative gate를 수행한다.
  이 분기는 새 resolver budget이 필요 없으므로 old conflict attempt를 추측하지 않는다.
- exact conflict attempt가 아직 running/paused이고 하나의 resume leaf로 수렴하면 intent를
  `merging`으로 복구하고 durable wait record를 재구성한다.
- current PR이 `DIRTY`인데 prior `resolution_rounds`를 증명할 queue entry가 없으면 새 budget을
  0으로 리셋하지 않는다. 현재 attempt를 최대 마지막 허용 round로 보수적으로 채택하거나,
  그 attempt조차 특정할 수 없으면 `resolution_lineage_ambiguous`로 `needs_human`을 유지한다.
- unrelated `needs_human`, `resolution_round_cap`, malformed intent는 자동 복구하지 않는다.

legacy adoption store mutation은 terminal reason clear, `merging/merge_subject` 정합,
queue entry와 필요한 wait record 생성을 한 persist에서 수행한다. 성공한 adoption은 같은
terminal evidence로 다시 실행되지 않는다.

ordinary `auto_merge_skips[bead].reason === "resolution_timeout"`은 historical record로 남을 수
있다. 기존 head-SHA exclusion 규칙대로 head가 움직이면 자동 해제되므로 별도 global migration은
하지 않는다.

## Data flow

1. merge driver가 PR을 gate하고 conflict resolver 하나를 dispatch한다.
2. queue-store가 exact attempt와 absolute deadline을 `waiting`으로 journal한다.
3. 30분 안에 끝나면 바로 `ready` 처리로 이어지고, 30분을 넘기면 `yielded`로 queue turn만
   양보한다.
4. driver는 다음 runnable PR을 serial하게 merge/cleanup한다.
5. resolver settlement가 durable attempt state와 queue event를 남긴다.
6. resolution reconciler가 identity를 검증하고 root를 current active merge 다음으로 promote한다.
7. promoted item은 latest head/base/checks를 full re-gate한다.
8. CLEAN/MERGED는 merge/cleanup, BEHIND는 update/recheck, DIRTY는 bounded next round로 간다.
9. root가 merge·cleanup되면 기존 completion intent가 `completed`되고 queue에서 제거된다.

## Error handling and safety

- exact attempt ID 없는 successful dispatch 응답은 기다림을 추측하지 않고 fail-closed한다.
- missing attempt, ambiguous resume descendants, subject mismatch는 wall time과 다른 구체 reason을
  기록한다.
- deadline/yield는 round와 repair budget 어느 것도 소비하지 않는다.
- `ready + DIRTY`만 resolution round를 한 번 소비하며, 같은 attempt identity로 두 번 소비하지
  않는다.
- cap 도달을 확인한 뒤에는 새 resolver를 dispatch하지 않는다.
- late event가 이미 cancel/dequeue된 item을 재생성하지 않는다.
- base drift는 stale success가 아니라 full re-gate input이다.
- CI/check/mergeability가 불명확하면 기존 fail-closed gate를 유지한다.
- `auto_merge_skips`는 terminal same-head exclusion 전용이며 nonterminal yield marker로 재사용하지
  않는다.

## UI and observability

새 버튼이나 별도 lane은 만들지 않는다. existing attempt tile의 `충돌 해소 중` /
`충돌 해소 일시정지`, merge queue position, completion badge를 재사용한다.

queue snapshot은 `resolution.state`, `deadline_at`, `yielded_at`, `settled_at`을 그대로 제공한다.
Worker view는 최소한 다음을 구분해 표시한다.

- `waiting`: `충돌 해소 중`
- `yielded`: `충돌 해소 계속 중 · 완료 후 우선 머지`
- `ready`: `충돌 해소 완료 · 재검증 대기`

`yielded`/`ready`는 alert나 `needs_human`으로 그리지 않는다. historical
`resolution_timeout` text mapping은 과거 record 표시를 위해 유지한다.

## Test scope

### RED-GREEN seams

1. `server/worker/queue-store.test.js`
   - legacy entry는 새 schema에서 explicit `resolution=null`로 normalize된다.
   - wait binding이 attempt identity, absolute deadline, existing rounds를 기록한다.
   - waiting→yielded가 round/intent/attempt를 바꾸지 않고 deferred suffix로 이동한다.
   - yielded→ready가 active item 바로 뒤에 exactly once promote한다.
   - multiple ready item은 `settled_at` FIFO를 유지한다.
   - enqueue는 yielded suffix 앞에 들어간다.
   - malformed wait는 no-wait로 normalize되지 않는다.
   - cold load 뒤 deadline과 ordering이 유지된다.
2. `server/worker/merge-queue.test.js`
   - 30분 뒤 session을 running으로 둔 채 timeout failure/skip 없이 다음 item을 처리한다.
   - late done event는 현재 active merge 다음으로 promote하고 full re-gate한다.
   - duplicate queue event와 stale ancestor settlement가 duplicate merge/resolver를 만들지 않는다.
   - restart 전후 동일 absolute deadline을 사용한다.
   - yielded item만 남았을 때 hot loop 없이 drain을 끝낸다.
   - CLEAN/MERGED, BEHIND, DIRTY 분기와 cap-before-dispatch를 각각 검증한다.
   - yield는 round를 소비하지 않고 timeout failure를 만들지 않으며, ready+DIRTY만 같은
     attempt identity에 대해 한 번 소비한다.
   - wait-binding store write가 throw 또는 `ok:false`이면 item/attempt를 보존하고 `merge()`를
     재호출하지 않은 채 drain을 halt한다. cold restart는 exact running attempt를 다시 채택해
     wait binding부터 이어간다.
   - malformed/invalid wait record를 읽으면 `resolution_wait_invalid`로 fail-closed하고
     `merge()`나 resolver dispatch를 호출하지 않는다.
3. `server/worker/completion-intent.test.js`
   - live timeout/yield가 `needs_human`을 만들지 않고 `merging/merge_subject`를 유지한다.
   - historical `needs_human/resolution_timeout` + CLEAN/BEHIND는 one-time adoption된다.
   - historical DIRTY + unprovable budget은 새 budget을 받지 않는다.
4. `server/worker/pr-actions.test.js`
   - probe-only latest mergeability 판정은 resolver를 dispatch하지 않는다.
   - driver 승인을 받은 DIRTY만 conflict resolver 하나를 dispatch한다.
   - cap 도달 path는 resolver를 dispatch하지 않는다.
5. `server/worker/auto-merge.test.js`
   - new candidate는 yielded suffix 앞에 들어간다.
   - auto-merge OFF에서는 ready item의 effect가 실행되지 않고 ON에서 재개된다.
6. `server/worker/scheduler.test.js`
   - resolution attempt terminal transition이 exact yielded marker reconciliation을 깨운다.
   - pause→resume descendant chain이 marker의 exact leaf로 수렴한다.
7. `app/views/worker/index.test.js`
   - waiting/yielded/ready badge가 failure alert 없이 표시된다.
8. `server/e2e/worker-flow.test.js`
   - long resolver → queue yield → next clean PR merge → late resolver completion → priority reentry
     → full re-gate → root merge/cleanup 흐름을 재생한다.
   - persisted `beads-456` 형태의 terminal fixture가 startup에서 CLEAN PR로 자동 복구된다.

위 RED는 current implementation에 없는 `resolution` journal/state, nonterminal yield,
priority re-entry, probe-before-dispatch, legacy adoption을 직접 관측하므로 변경 전 실패해야 한다.
환경 gate나 존재하지 않는 fixture 때문에 실행되지 않는 RED는 허용하지 않는다.

### Regression and characterization

다음 항목은 이미 성립하는 계약이므로 RED 증거로 세지 않고 회귀 보호로 유지한다.

- 30분 전에는 current queue head와 running/leaf-paused resolver를 기다린다.
- `resolution_round_cap`은 completion intent를 terminalize하고 새 budget을 만들지 않는다.
- terminal `needs_human`과 same-head historical `auto_merge_skips` filtering은 유지한다.
- normal conflict attempt를 completion settlement로 오인하지 않는다.
- yielded root가 있어도 다른-Bead Worker session은 기존 `worker-serial` guard를 우회하지 않는다.
- historical `resolution_timeout` failure text mapping은 과거 record 표시를 위해 유지한다.

### Verification bundle

- 위 focused test files
- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:write`
- `npm run build`
- `npm run all`

frontend source가 바뀌므로 generated `app/main.bundle.js`와 map을 함께 검증·커밋한다.

## Rollout and runtime recovery

코드가 `main`에 merge된 뒤 canonical shared service에서 다음을 수행한다.

1. `docs/agents/repo-ops.toml`과 `~/.config/bdui/config.toml` 정합을 확인한다.
2. merged checkout에서 frontend bundle을 확인하고 `bdui-shared restart`를 실행한다.
3. process path, listening port, HTTP response를 확인한다.
4. startup legacy adoption이 `beads-456`의 time-only terminal을 제거했는지 확인한다.
5. PR #9의 latest head/base/checks가 다시 관측되고 CLEAN이면 merge/cleanup으로 진행하는지
   확인한다.
6. duplicate resolver, duplicate merge, resolution round reset이 없는지 durable queue와 attempt
   readback으로 확인한다.

## Completion boundary

완료는 단위 테스트만 통과한 상태가 아니다. 30분을 넘긴 resolver가 terminal failure 없이
queue turn만 양보하고, late settlement가 latest gate를 거쳐 우선 재진입하며, restart 후에도
deadline/round/attempt identity가 유지돼야 한다. merged shared service에서 historical
`beads-456`이 time-only `needs_human`에서 자동으로 빠져 실제 merge·cleanup까지 수렴한 것을
확인한 뒤에만 runtime 완료를 선언한다. authoritative gate가 red/undecidable이거나 legacy
lineage가 모호하면 그 concrete evidence를 보고하고 merge를 강행하지 않는다.
