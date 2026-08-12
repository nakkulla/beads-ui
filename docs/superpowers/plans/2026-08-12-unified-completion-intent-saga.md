# UI-f17c 구현 계획: PR부터 배포·정리까지 단일 completion saga

- Bead: `UI-f17c`
- route: `full_plan`
- spec: `docs/superpowers/specs/2026-08-12-unified-completion-intent-saga-design.md` @ `034f1e0e254ac73b9ab7a1a5924ada35de0b9d45`
- plan path: `docs/superpowers/plans/2026-08-12-unified-completion-intent-saga.md`
- 선행 구현: `UI-lbqw` merge·deploy 완료
- target base: 선행 구현 완료 뒤 fetch한 `origin/main`의 exact SHA

## 결과

Worker가 PR 제출 이후 merge, post-merge verify/deploy/readback, cleanup, Bead close,
Done 진입을 하나의 durable completion saga로 끝까지 소유하게 한다. 모든 blocking
operation은 deadline과 authoritative readback으로 유한하게 정산하고, 단순 실패는 같은
operation으로 재시도하며, 판단이 필요한 실패는 current preset recovery session을 자동
시작하거나 재개한다. 안전하게 자동 해결된 credential reuse, Worker-owned permission
repair, external effect reconciliation은 secret 없는 audit badge로 Done 카드에 남긴다.

## 실행 전제와 경계

1. `UI-lbqw`가 자체 PR, merge, post-merge deploy를 완료하기 전에는 `UI-f17c` parent를
   claim하거나 phase child/worktree를 만들지 않는다.
2. 실행 시작 시 `bd show UI-lbqw --json`, `git fetch origin main`, merge commit 포함 여부,
   shared runtime readback을 확인하고 그 `origin/main` SHA를 implementation base로 고정한다.
3. landed UI-lbqw의 current-preset continuation resolver와 attempt provenance API를
   읽고 호출한다. 함수명 이동만 plan 경로에 반영한다. precedence, rollback, session
   lineage 의미가 spec과 다르면 첫 write 전에 중단하고 plan을 재검토한다.
4. workflow label/metadata 계약, `docs/agents/repo-ops.toml` schema, credential source는
   바꾸지 않는다. 새 saga state와 recovery audit의 SoT은 Worker `queue.json`뿐이다.
5. `auto_merge=true`, `auto_advance=false`, 현재 workspace preset/slots 설정은 그대로
   사용한다. 새 사용자 설정은 만들지 않는다.
6. 각 phase는 아래 승인된 test seam에서 RED를 먼저 확인하고 GREEN으로 닫는다. 기존
   UI-lbqw resolver 자체는 이미 GREEN인 선행 계약이므로 재구현하거나 RED 대상으로
   돌리지 않고 completion caller integration regression으로 보호한다.
7. root controller가 phase child, 전체 diff/status, 검증, commit, review gate, PR과 merge를
   소유한다. writable implementation은 한 worktree에서 한 phase씩 진행한다.

## Phase 1: durable saga schema, reducer, migration

### 대상 파일

- `server/worker/queue-store.js`
- `server/worker/queue-store.test.js`
- `server/worker/completion-intent.js`
- `server/worker/completion-intent.test.js`

### 작업

1. completion intent에 schema version, fine phase, effect journal, immutable binding,
   `resume_phase`, stable failure key, recovery lineage, confirmation journal,
   bounded `recovery_audit`를 추가한다.
2. effect를 `prepared → running → settling → observed → consumed`로 prerecord하고 모든
   mutation을 queue revision CAS와 exact `op_id`/binding에 묶는다. retry는 새 effect가
   아니라 같은 `op_id`와 기존 budget을 사용한다.
3. current-version malformed/contradictory binding은 terminal legacy 상태로 바로 내리지
   않는다. operation identity와 unknown-field digest를 보존하고 stable diagnostic failure
   하나로 normalize해 coordinator가 recovery session을 정확히 한 번 시작할 수 있게 한다.
   진단 완료 후 mutation 전에는 `awaiting_confirmation`으로 수렴하며 restart가 새
   `op_id`, failure key, retry budget을 만들지 않게 한다.
4. 기존 `needs_human` 중 exact attempt/session/op lineage와 resumable operation이 있는
   record만 `awaiting_confirmation`으로 adopt한다. lineage 없는 legacy `needs_human`은
   session이나 authority를 발명하지 않고 terminal 상태로 그대로 보존한다.
5. `recovering`/`awaiting_confirmation` 진입과 같은 durable mutation에서 원래 fine phase를
   `resume_phase`에 기록하고 kind/phase mapping을 검증한다. successful consume은 그 exact
   phase로만 돌아간다.
6. fine phase에서 primary state 하나와 5단계 progress를 만드는 pure projection input을
   정의한다. UI 문구는 Phase 5에서 붙이고 reducer에는 사용자 문자열을 넣지 않는다.

### RED → GREEN 검증

- `npm test -- server/worker/queue-store.test.js server/worker/completion-intent.test.js`

다음 fixture를 추가한다.

- current malformed binding → stable diagnostic lineage 1개 → `awaiting_confirmation`
- 같은 malformed snapshot restart N회 → `op_id`/failure key/budget 증가 0
- lineage 없는 legacy `needs_human` → terminal 보존, spawn authority 0
- recovery/confirmation crash point마다 `resume_phase` 보존과 exact phase 복귀
- prerecord/run/settle/consume crash point마다 duplicate effect 0

### Phase acceptance

- current malformed record와 lineage 없는 legacy record의 경로가 명시적으로 다르다.
- normalize가 unknown field를 버린 뒤 새 authority/budget을 만드는 fail-open 경로가 없다.
- queue snapshot만으로 다음 effect와 원래 사용자 단계가 결정된다.

## Phase 2: bounded effect runner와 partial release recovery

### 대상 파일

- `server/bd.js`
- `server/bd.test.js`
- `server/worker/gh.js`
- `server/worker/gh.test.js`
- `server/worker/process-controller.js`
- `server/worker/process-controller.test.js`
- `server/worker/effect-runner.js` (new)
- `server/worker/effect-runner.test.js` (new)
- `server/worker/deployment-paths.js`
- `server/worker/deployment-paths.test.js`
- `server/worker/deployment-reconciler.js`
- `server/worker/deployment-reconciler.test.js`
- `server/worker/deployment-reconciler.integration.test.js`
- `server/worker/pr-actions.js`
- `server/worker/pr-actions.test.js`

### 작업

1. completion saga가 호출하는 Git/GitHub/Beads/process operation용 opt-in bounded runner를
   만든다. deadline은 promise만 포기하지 않고 owned process group을 terminate한 뒤
   `close`/`error` settlement를 관측해 `completed|timed_out|spawn_failed|settlement_failed`
   outcome을 반환한다. 기존 비-saga caller의 timeout 의미는 바꾸지 않는다.
2. merge, base sync, branch cleanup, Bead status/metadata/close, GitHub mutation처럼 commit
   가능성이 있는 operation마다 effect-specific authoritative readback을 정의한다.
   timeout/crash 후 결과를 `applied|not_applied|unknown`으로 분류해 각각 adopt, 같은
   `op_id` retry, `awaiting_confirmation`으로 보낸다.
3. `materializeRelease()`의 init, remote config, fetch, checkout, HEAD/status/remote readback
   전체를 internal materialization deadline 아래 둔다. timeout은
   `materialize_timeout`으로 기록하고 기존 reconcile attempt/backoff 3회만 소비한다.
4. exact Worker-owned release이며 post-commit evidence와 HEAD가 모두 없는 경우에만 같은
   filesystem의 quarantine으로 atomic rename한다. active runtime pointer, successful
   receipt, 다른 attempt reference가 있으면 effect 0회로 거부한다.
5. bounded runner를 recovery spawn/monitor에서도 사용할 수 있는 injected seam으로 만든다.
   recovery 고유 deadline, slot, lineage 정산은 Phase 4에서 연결한다.
6. stderr/stdout은 bounded sanitized tail만 evidence에 남긴다. auth/container raw output,
   credential value, secret-bearing config는 queue/log/UI에 넣지 않는다.

### RED → GREEN 검증

- `npm test -- server/bd.test.js server/worker/gh.test.js server/worker/process-controller.test.js server/worker/effect-runner.test.js server/worker/deployment-paths.test.js server/worker/deployment-reconciler.test.js server/worker/deployment-reconciler.integration.test.js server/worker/pr-actions.test.js`

다음 matrix를 adapter별로 검증한다.

- hung child → process tree terminate → close settlement → durable timeout
- Git/GitHub/Beads timeout 후 readback `applied` → 호출 반복 없이 adopt
- readback `not_applied` → 같은 `op_id`와 남은 budget으로 retry
- readback `unknown` → effect 반복 0, confirmation 생성
- partial release의 HEAD/post-commit/reference 조합별 quarantine 허용·거부
- timeout 뒤 coordinator loop가 반환되어 다른 runnable intent를 진행

### Phase acceptance

- completion 경로의 Git/GitHub/Beads/process call에 무기한 promise가 없다.
- timeout은 exit code로 뭉개지지 않고 settlement와 three-way readback evidence를 가진다.
- `dotfiles-3vb8` 형태의 HEAD 없는 partial release를 삭제 없이 안전하게 격리할 수 있다.

## Phase 3: single authority startup과 automation 설정 경계

### 대상 파일

- `server/worker/attach.js`
- `server/worker/attach.test.js`
- `server/worker/completion-intent.js`
- `server/worker/completion-intent.test.js`
- `server/worker/auto-merge.js`
- `server/worker/auto-merge.test.js`
- `server/worker/merge-queue.js`
- `server/worker/merge-queue.test.js`
- `server/worker/pr-actions.js`
- `server/worker/pr-actions.test.js`
- `server/worker/deployment-reconciler.js`
- `server/worker/deployment-reconciler.test.js`

### 작업

1. startup에서 queue와 completion intents를 먼저 복원하고 coordinator reducer를 시작한
   뒤 persisted reconcile/merge/cleanup record를 하위 effect로 schedule한다. startup이
   unresolved reconcile promise를 먼저 await하는 순서를 제거한다.
2. merge queue, PR observation, deployment reconciler, cleanup owner는 fact와 result만
   coordinator에 제출한다. 다음 phase/effect를 독자적으로 시작하는 경로를 제거하고 live와
   startup 모두 같은 reducer를 통과시킨다.
3. `auto_merge=false`가 되면 이미 시작한 effect를 유한하게 settle한 다음 checkpoint에서
   `paused`로 멈추고 새 effect를 시작하지 않는다. OFF → ON은 동일 intent, `op_id`, retry
   count, recovery lineage를 보존해 재개한다.
4. `auto_advance=false`는 최초 candidate dispatch만 막고 PR 이후 completion/recovery는
   멈추지 않게 축을 분리한다.
5. merge mutual exclusion과 root ordering은 유지하되 repair child를 별도 completion
   authority로 만들지 않는다.

### RED → GREEN 검증

- `npm test -- server/worker/attach.test.js server/worker/completion-intent.test.js server/worker/auto-merge.test.js server/worker/merge-queue.test.js server/worker/pr-actions.test.js server/worker/deployment-reconciler.test.js`

추가 fixture는 다음을 증명한다.

- startup 중 hung reconcile 하나가 다른 intent reducer를 막지 않음
- `auto_merge` ON → OFF: safe checkpoint pause, 새 effect 0
- OFF → ON: 같은 intent/op/budget으로 이어짐
- `auto_advance=false`, `auto_merge=true`: PR 이후 merge/reconcile/recovery 계속 진행
- crash/restart 후 merge, restart, Bead close, Done logical effect 각각 1회

### Phase acceptance

- `completion_intents[root_bead_id]`만 다음 action을 결정한다.
- automation 두 switch의 의미가 섞이지 않는다.
- startup과 live event가 같은 idempotent state transition을 만든다.

## Phase 4: automatic recovery, current-preset continuation, confirmation, audit

### 대상 파일

- landed UI-lbqw resolver/provenance module (read-only contract consumer; exact path는 실행
  preflight에서 고정)
- `server/worker/completion-repair.js`
- `server/worker/completion-repair.test.js`
- `server/worker/completion-intent.js`
- `server/worker/completion-intent.test.js`
- `server/worker/queue-store.js`
- `server/worker/queue-store.test.js`
- `server/worker/scheduler.js`
- `server/worker/scheduler.test.js`
- `server/worker/session-monitor.js`
- `server/worker/session-monitor.test.js`

### 작업

1. 모든 finite failure에 stable failure key 하나와 recovery lineage 하나를 배정한다.
   attempt prerecord와 budget 소비를 한 queue mutation으로 수행하고 existing scheduler
   `slots`를 점유한다. slot이 없으면 `recovering:waiting_slot`에서 기다리며 slot cap을
   우회하지 않는다.
2. `resume_root`와 `dispatch_repair`를 포함한 모든 completion relaunch caller가 landed
   UI-lbqw resolver를 통과하게 한다. caller별로 다음 matrix를 적용한다.
   - same provider: prior session/worktree를 current effective tuple로 resume
   - provider mismatch: prior transcript를 변환하지 않고 같은 owned worktree에
     current-preset fresh session 1개 생성
   - invalid/unavailable preset: spawn, fallback, attempt/Bead metadata mutation 0;
     saga CAS만 `awaiting_confirmation:current_preset_unavailable`로 전환
3. recovery spawn에 deadline을 두고 prerecord된 process identity의 spawn/attach 여부를
   readback한다. attempt monitor에는 heartbeat/absolute deadline을 두어 owned process만
   terminate하고 finite settlement를 기록한다. bounded recovery budget이 끝나거나 monitor
   outcome이 unknown이면 같은 failure key를 늘리지 않고 `awaiting_confirmation`으로
   수렴한다.
4. current malformed diagnostic lineage도 같은 launch path를 써 session을 정확히 한 번
   시작한다. session은 sanitized evidence를 진단하고 mutation 전에 confirmation proposal을
   제출한다.
5. session output을 allowlisted structured disposition으로 제한한다:
   `retry_original_effect`, `repair_worker_owned_mode`, `adopt_external_effect`,
   `request_confirmation`. coordinator가 source attempt, failure key, op/binding,
   exact target ownership/digest를 검증하고 좁은 adapter만 실행한다.
6. 자동 mutation은 existing valid credential reuse, exact Worker-owned mode repair,
   authoritative external-effect adopt/not-applied retry로 한정한다. credential 생성/회전,
   `sudo`, `chown`, broad/unknown path, outcome unknown은 effect 0회로 confirmation에 멈춘다.
7. confirmation journal을 `pending → approved → consumed`로 구현한다. 승인 action은 queue
   revision, op/failure key, `resume_phase`, proposal/target digest, attempt/session을 CAS로
   검증한다. `세션 이어하기`는 승인으로 취급하지 않는다. 승인 뒤 crash도 readback
   `applied|not_applied|unknown`으로 정산한다.
8. 성공한 자동 조치만 bounded audit(max 16 + folded summary)에 append한다. category는
   `credential_reuse`, `worker_owned_permission_repair`,
   `ambiguous_effect_reconciled`이며 secret/raw auth output은 저장하지 않는다.

### RED → GREEN 검증

- `npm test -- server/worker/completion-repair.test.js server/worker/completion-intent.test.js server/worker/queue-store.test.js server/worker/scheduler.test.js server/worker/session-monitor.test.js`

필수 parameterized matrix:

- caller `resume_root|dispatch_repair` × same provider → current tuple resume 1회
- caller `resume_root|dispatch_repair` × provider mismatch → same-worktree fresh current 1회
- caller `resume_root|dispatch_repair` × invalid preset → spawn/attempt/Bead metadata mutation 0
- relaunch caller 목록 전체가 resolver spy를 정확히 1회 호출하고 우회 caller 0
- recovery prerecord 뒤 crash, spawn timeout, attach timeout, monitor heartbeat timeout,
  process outcome unknown 각각 finite settlement와 duplicate budget/session 0
- slots full → spawn 0, slot free → 같은 prerecord lineage로 launch
- credential/permission/external disposition의 허용·거부와 three-way readback
- confirmation CAS drift, 승인 뒤 crash, audit append/final seal crash에서 민감 effect와
  badge 중복 0

### Phase acceptance

- 모든 finite failure가 bounded retry 또는 automatic recovery로 이어지고 recovery 자체도
  유한하게 settle한다.
- 사람이 필요한 경우에도 같은 op/session/worktree/resume phase에서 이어갈 수 있다.
- agent self-report만으로 민감 mutation, 성공 판정, audit가 생기지 않는다.
- recovery attempt가 scheduler slot cap을 우회하지 않는다.

## Phase 5: server projection, Worker/Monitor UI, confirmation protocol

### 대상 파일

- `server/ws/worker-handlers.js`
- `server/ws/worker-handlers.last-event.test.js`
- `server/ws.worker-queue.test.js`
- `server/ws.monitor-pipeline.test.js`
- `server/ws/connection.js`
- `app/views/worker/index.js`
- `app/views/worker/index.test.js`
- `app/views/worker/lanes.js`
- `app/views/worker/lanes.test.js`
- `app/views/monitor/index.js`
- `app/views/monitor/index.test.js`
- `app/views/monitor/lanes.js`
- `app/views/monitor/lanes.test.js`

### 작업

1. server가 fine phase/effect/recovery를 primary state 하나, 5단계 progress, sanitized recent
   action, expandable evidence, Done audit badges로 projection한다. raw
   `completion_intents`는 계속 client에 노출하지 않는다.
2. Worker와 Monitor가 같은 projected vocabulary를 소비하게 한다. `머지됨`, `root 머지 중`,
   `candidate_pinned`, cleanup/recovery badge를 서로 경쟁하는 top-level 상태로 조합하지
   않는다.
3. primary 문구는 `진행 중|자동 복구 중|확인 필요|완료` 중 하나만 표시하고 원래 단계는
   `resume_phase`에서 유지한다. repair child는 root card evidence/link로만 나타낸다.
4. confirmation용 별도 WS action을 추가한다. `세션 이어하기`와 `승인하고 계속` 또는
   `외부 해결 확인`을 분리하고 expected revision과 full confirmation identity를 server에서
   재검증한다.
5. Done 카드에 다음 badge를 restart 후에도 보존한다.
   - `자동복구 · 자격증명 재사용`
   - `자동복구 · 권한 복구`
   - `자동복구 · 외부 결과 확인`
   사람이 mutation한 경우나 diagnosis-only 결과에는 badge를 만들지 않는다.
6. unknown optional projection field는 fail-quiet하고 malformed current durable intent는
   visible diagnostic/confirmation evidence로 표시한다.

### RED → GREEN 검증

- `npm test -- server/ws.worker-queue.test.js server/ws/worker-handlers.last-event.test.js server/ws.monitor-pipeline.test.js app/views/worker/index.test.js app/views/worker/lanes.test.js app/views/monitor/index.test.js app/views/monitor/lanes.test.js`

필수 UI/protocol fixture:

- 모든 fine phase → primary state 정확히 1개 + progress 1개
- `merging` + merged PR + pinned reconcile → top-level 상태 중복 0
- active recovery / confirmation / completed audit 문구의 상호 배타성
- Worker와 Monitor의 label/progress 동일성
- stale confirmation revision/identity → effect 0회와 fresh snapshot
- Done range/restart 후 audit badge 유지, Bead label/metadata write 0회

### Phase acceptance

- 카드 한 장만 보고 현재 단계, 막힌 operation, 자동 조치, 사용자에게 남은 일을 알 수 있다.
- 민감 자동복구 audit가 사용자가 요청한 이슈 카드 badge로만 표시된다.
- Worker와 Monitor가 같은 state를 다르게 설명하지 않는다.

## Phase 6: end-to-end migration, regression, PR, merge, post-merge proof

### 대상 파일

- `server/e2e/worker-flow.test.js`
- `server/worker/deployment-reconciler.integration.test.js`
- Phase 1–5에서 변경한 source/test
- generated `app/main.bundle.js`
- generated `app/main.bundle.js.map`

### 작업

1. secret과 machine-specific 절대경로를 제거한 `dotfiles-3vb8` queue/release fixture를 만든다.
   merged PR #378, prepared merge op, pinned reconcile attempt/retry count, HEAD 없는 partial
   release를 재현한다.
2. startup이 GitHub merged SHA를 adopt하고 existing attempt/budget을 보존한 채 receipt와
   runtime pointer를 먼저 읽는지 검증한다. post-commit evidence 없음 + HEAD 없음일 때만
   atomic quarantine하고 deadline 있는 rematerialization을 수행한다.
3. 각 effect boundary에 crash/restart를 주입해 merge, materialization, verify, deploy,
   runtime restart, readback, child sweep, branch cleanup, Bead close, Done이 logical 1회인지
   검증한다.
4. settings E2E matrix를 실행한다: `auto_merge` OFF safe pause/ON same-intent resume,
   `auto_advance=false` completion 지속, recovery attempt slot 점유.
5. UI-lbqw manual provider-mismatch dialog, prior attempt immutability, current-preset resolver
   regression suite가 그대로 GREEN인지 확인한다.
6. full validation과 impl review gate를 통과한 뒤 owned paths만 stage하고 의도적인 한국어
   commit을 만든다. `origin`의 writable fork를 대상으로 PR을 제출한다.
7. 이 저장소는 GitHub checks가 비어 있는 것이 정상이라 local validation을 merge gate로
   사용한다. PR head를 pin하고 Worker의 `[머지]`/auto-merge 경로로 merge해 post-merge
   saga를 실제로 통과시킨다.
8. merged checkout의 pinned `[deploy] scripts/managed-self-deploy.js`가 terminal launch된
   뒤 shared service의 process path, listening port, HTTP response를 확인한다. 구 runtime이
   새 코드를 deploy하기 전에 멈추는 bootstrap 문제가 생기면 그 사실과 exact state를
   기록하고 merged checkout에서 `bdui-shared restart`를 한 번 수행한 뒤, 새 startup이
   동일 intent를 adopt하는지 확인한다. 이 예외는 성공 판정이 아니라 migration 진입
   수단이며 아래 `dotfiles-3vb8` 자동 완주가 continuity proof다.
9. 실제 `dotfiles-3vb8`에서 merged op와 pinned reconcile을 adopt하고 quarantine,
   rematerialization, verify/deploy/readback/cleanup/close/Done까지 추가 click 없이 완주하는지
   확인한다. stale `root 머지 중`/`candidate_pinned` badge와 partial release reference가
   사라졌는지 readback한다.

### 전체 검증

1. `npm run prettier:write`
2. `npm run tsc`
3. `npm test`
4. `npm run lint`
5. `npm run build`
6. `git status --short`
7. `git diff --check`
8. generated bundle/map과 owned source의 전체 diff 검토
9. PR head SHA, local validation receipt, impl review receipt 확인
10. merge 후 `~/.config/bdui/config.toml`은 raw credential을 읽지 않고 workspace key
    존재/type과 repo declaration 우선순위만 redacted readback
11. `bdui-shared` process가 merged workspace를 가리키는지 확인
12. configured listening port와 basic HTTP response 확인
13. Worker snapshot에서 `UI-f17c`와 `dotfiles-3vb8` completion/Done/audit 상태 확인

### Phase acceptance

- PR 제출부터 merge 후 shared runtime과 `dotfiles-3vb8` Done까지 continuity evidence가 있다.
- full validation, generated frontend bundle, implementation review, PR receipt가 모두 남는다.
- pre-existing unrelated work를 stage/modify하지 않는다.

## Test scope

| 구분 | seam | 실행 기대 |
| --- | --- | --- |
| RED-GREEN 1 | schema/migration/restart | current malformed는 diagnostic session 후 confirmation, lineage 없는 legacy는 terminal 보존 |
| RED-GREEN 2 | bounded effect/settlement | materialization과 Git/GitHub/Beads control timeout이 terminate/settle되고 readback 3분기 |
| RED-GREEN 3 | single authority/settings | startup/live reducer 일치, `auto_merge` pause/resume, `auto_advance` 독립 |
| RED-GREEN 4 | recovery/confirmation/audit | spawn·monitor 유한 정산, slot 점유, 민감 adapter/CAS/audit exactly-once |
| RED-GREEN 5 | UI/protocol | primary 상태 하나, 5단계 progress, Worker/Monitor 동일 projection, Done badge |
| RED-GREEN 6 | `dotfiles-3vb8` fixture | merged/pinned/partial state adopt 후 crash-safe Done 완주 |
| 기존 GREEN 보존 | UI-lbqw continuation | 모든 completion caller가 landed resolver 사용; same/mismatch/invalid preset matrix 유지 |

## 완료 조건

1. `UI-lbqw` landed/deployed SHA 위에서만 구현된다.
2. confirmation hard stop이 아니면 PR 제출 뒤 사용자 click 없이 Done까지 진행한다.
3. 모든 completion subprocess/control operation/recovery spawn·monitor가 deadline 또는
   authoritative readback을 갖고 coordinator loop로 반환한다.
4. `auto_merge=false`는 safe checkpoint pause, ON은 같은 intent resume이며
   `auto_advance=false`는 completion을 멈추지 않는다.
5. `resume_root`와 `dispatch_repair`를 포함한 모든 relaunch caller가 current-preset resolver를
   사용하고 invalid preset은 spawn/attempt/Bead metadata를 바꾸지 않는다.
6. 안전한 credential/permission/external-effect 자동 해결만 durable audit와 Done 카드
   badge를 만들며 secret은 queue/log/UI/Bead에 남지 않는다.
7. 판단이 필요한 경우 exact session/op/worktree/resume phase를 보존하고 별도 confirmation
   뒤 같은 흐름으로 복귀한다.
8. UI는 primary 상태 하나와 5단계 progress만 top-level에 표시한다.
9. 실제 `dotfiles-3vb8`이 duplicate merge/restart 없이 `completed`/Done으로 수렴한다.
10. merge 후 managed deploy와 merged shared runtime의 process/port/HTTP readback을 통과한다.
