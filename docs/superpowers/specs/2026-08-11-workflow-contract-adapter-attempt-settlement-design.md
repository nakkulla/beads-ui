# Workflow Contract Adapter와 Worker attempt 정산 설계

- Bead: `UI-k066`
- route: `full_plan`
- provider: `dotfiles-onx9`
- 작성일: 2026-08-11
- 상위 설계: dotfiles
  `docs/superpowers/specs/2026-08-11-workflow-contract-consumer-export-legacy-governance-design.md`

## 1. 배경

beads-ui는 dotfiles가 소유한 workflow 계약을 소비하지만, 현재 다음 Module이 route,
receipt, report, disposition, runner fallback을 각자 해석한다.

- `server/workflow-enrich.js`
- `server/worker/admission.js`
- `server/worker/scheduler.js`
- `server/worker/revise-disposition.js`
- `app/utils/report-marker.js`
- `server/worker/runner/index.js`
- `server/worker/runner/command-guard.js`
- `server/worker/runner/session.js`
- `server/worker/queue-store.js`
- `server/worker/completion-intent.js`

이 분산 해석은 같은 token을 display에서는 허용하고 dispatch에서는 거부해야 하는
경계를 흐리며, Worker attempt가 실제로 끝났는지 판단하는 증거도 여러 경로에 흩어지게
한다. 현재 실측된 직접 결함은 다음과 같다.

1. `server/worker/scheduler.js`는 usage receipt directory가 만들어진 경우에만
   `BDUI_ATTEMPT_ID`를 주입한다. usage inbox가 없거나 준비에 실패하면 같은 Worker인데도
   exact attempt identity가 subprocess에 전달되지 않는다.
2. `server/worker/queue-store.js`의 generic `appendAttempt`는 같은 map key를 덮어써
   duplicate attempt를 조용히 잃을 수 있다.
3. `app/utils/report-marker.js`는 marker/meta/conclusion만 파싱하며 current attempt binding과
   여섯 section의 완전성을 판단하지 않는다.
4. unknown/missing runner는 `server/worker/runner/index.js`에서 Claude로 조용히
   해석되고, PID 시작 identity의 한쪽이 없으면 monitor가 살아 있는 process를 현재
   attempt 소유로 간주한다.
5. command guard는 typed kind/effect를 계산하지만 durable warning에는
   `reason`, `command`, `at`만 남아 warning과 kill 근거를 나중에 정확히 복원할 수 없다.
6. completion settlement는 exact callback이 도착한 경우에는 안전하지만, process restart나
   endpoint evidence 누락 뒤의 정산을 하나의 durable projection으로 설명하지 못한다.

이 스펙은 dotfiles 의미를 beads-ui에서 다시 정의하지 않는다. provider가 게시한
content-addressed projection을 pin하고, 하나의 deep Adapter와 하나의 Attempt Settlement
Module이 beads-ui의 실행 판단을 소유하게 한다.

## 2. 사용자 확정 결정

- dotfiles `docs/contracts/workflow.{md,yaml}`이 route, receipt, lifecycle,
  completion-report grammar의 유일한 canonical owner다.
- beads-ui는 vendored artifact를 runtime network 없이 exact hash로 검증한다.
- workflow raw literal과 parser는 하나의 Workflow Contract Adapter 뒤로 모은다.
- queue/process/PR/CI/report/Bead 관측의 조합은 Attempt Settlement가 소유한다.
- rollout은 `observe -> enforce -> removal gate` 순서다.
- historical queue, session log, comment, Bead metadata는 rewrite하지 않는다.
- old comment/report 부재를 기존 PR merge의 새 hard blocker로 소급 적용하지 않는다.
- 계획과 구현은 선행 dependency가 모두 충족된 뒤 별도 full_plan으로 진행한다.

## 3. 선행 dependency와 구현 admission

스펙 작성과 review는 지금 수행할 수 있지만 구현 진입은 다음 readback을 모두 요구한다.

| Bead | 소유 범위 | `UI-k066`의 사용 방식 |
|---|---|---|
| `dotfiles-onx9` | consumer artifact/profile/hash/handoff | closed provider commit과 exact artifact/lock을 입력으로 사용 |
| `UI-jl9v` | bd JSON v1/v2 normalization | generic envelope normalizer와 normalized issue projection만 import |
| `UI-309b` | recovered runner control/discard/rollback | 기존 lineage·archive·cleanup state를 settlement 입력으로 사용 |
| `UI-16ep` | merged-SHA deployment reconciliation | 이미 closed인 deploy Adapter를 재사용 |
| `UI-3qtz` | full_plan resume admission/plan receipt decision | Adapter가 grammar를 제공하되 decision table은 이 Bead가 소유 |

구현 admission은 pinned base에서 위 Bead가 모두 `closed`이고, dotfiles
`workflow-consumers.yaml` handoff의 `consumer_bead=UI-k066` 및 `payload_sha256`가 vendored
artifact와 일치할 때만 통과한다. dependency가 open/in_progress/blocked이거나 provider
commit/hash가 모호하면 Bead를 claim하지 않고 fail-closed한다.

`UI-16ep`는 status만으로 충분하지 않다. PR의 merged SHA, deployment reconciler의 pinned
verify/deploy phase, shared service process path/listening port/HTTP response readback이 같은
merged SHA를 가리켜야 한다. 현재 closed record에 그 post-merge evidence가 없으면
`UI-16ep`를 reopen/repair해 continuity를 완료한 뒤에만 `UI-k066` admission을 연다.

report binding은 `bd comments --json` array를 필요로 한다. `UI-jl9v`가 제공하는 generic
envelope normalizer가 comments array에도 shape-preserving하게 적용되는지 prerequisite
readback에서 확인한다. 해당 Interface가 없다면 `UI-jl9v` scope를 조용히 확대하거나
`UI-k066`에 두 번째 generic parser를 만들지 않고, 별도 prerequisite Bead로 disposition한다.
`UI-k066`은 normalized comment record 이후의 report-specific grammar/binding만 소유한다.

`UI-k066`은 독립 phase가 셋 이상이고 queue/schema, adapter migration, settlement가 각각
검증 경계를 가지므로 `full_plan`을 유지한다. 이 스펙은 plan/implementation authority가
아니며 implementation-entry confirmation 전에는 parent claim, phase child, 코드 편집을 하지
않는다.

## 4. 소유권과 비중복 경계

| Concern | Owner | `UI-k066`에서 금지하는 중복 |
|---|---|---|
| route/receipt/report/lifecycle semantic value | dotfiles artifact | Markdown/YAML 값을 JS 상수로 다시 정의 |
| bd object/array/envelope normalization | `UI-jl9v` | 별도 `bd show/list` parser 또는 schema fallback |
| full_plan resume decision | `UI-3qtz` | `plan_stale` 등 새 decision vocabulary |
| runner pause/resume/discard/archive/cleanup | `UI-309b` | 새 control UI, process archive, branch/PR cleanup saga |
| merged SHA deploy/restart/readback | `UI-16ep` | settlement 내부에서 service deploy를 재구현 |
| command classification/effect | command guard | Adapter가 shell command를 다시 분류 |
| completion saga/root-op-failure binding | completion intent | 더 약한 callback matching 또는 별도 merge owner |
| attempt/queue/session/PID observation | beads-ui | dotfiles나 Beads에 queue/process schema 추가 |

## 5. Architecture

### 5.1 Vendored artifact와 lock

consumer-owned 파일은 다음 경계로 둔다.

```text
server/workflow-contract/
  artifacts/current.json
  artifacts/previous.json
  contract-lock.json
  adapter.js
  adapter.test.js
docs/protocol/
  workflow-contract-consumer.md
  workflow-legacy-surfaces.yaml
```

`current.json`과 `previous.json`은 dotfiles exporter의 bytes를 그대로 vendoring한다.
`contract-lock.json`은 다음 최소 항목만 가진다.

```json
{
  "consumer_id": "beads-ui",
  "artifact_format": 1,
  "artifacts": {
    "vendored": {
      "path": "artifacts/current.json",
      "producer_commit": "<full-40-hex-sha>",
      "payload_sha256": "<64-lowercase-hex>"
    },
    "previous": {
      "path": "artifacts/previous.json",
      "producer_commit": "<full-40-hex-sha>",
      "payload_sha256": "<64-lowercase-hex>"
    }
  },
  "required_capabilities": [
    "admission",
    "attempt_identity",
    "dispatch",
    "lifecycle_projection",
    "report_binding"
  ]
}
```

- Adapter는 process 시작 시 config가 선택한 source를 exact `artifacts.<source>` entry에
  매핑하고, 그 entry의 path를 한 번 읽어 immutable snapshot으로 cache한다.
- `consumer_id`, `artifact_format`, selected source의 full producer SHA와 payload hash,
  capability completeness를 모두 검증한다. `current.json`과 `previous.json`은 서로 독립된
  provenance/hash를 가지며 한 entry를 공유하거나 artifact 내부의 self-declared hash를
  신뢰하지 않는다.
- payload hash는 provider가 정한 canonical JSON bytes 규칙으로 재계산한다. 자체 serializer는
  provider golden fixture와 byte-for-byte 교차 검증하며 별도 의미를 추가하지 않는다.
- `producer_commit` reachability는 vendoring/update CI에서 확인한다. runtime은 network나
  dotfiles checkout에 의존하지 않는다.
- current load 실패 시 자동으로 previous를 선택하지 않는다. source 전환은 명시적 local
  config와 diagnostic을 요구하며, 전환된 source도 자기 lock entry와 exact path/provenance/hash를
  모두 통과해야 한다.
- malformed/tampered artifact는 queue/session/Bead data를 수정하지 않는다.

config surface는 기존 `~/.config/bdui/config.toml`의 Worker 영역에 다음 enum을 추가한다.

```text
workflow_contract_mode = "observe" | "enforce"
workflow_contract_source = "vendored" | "previous"
```

초기 기본값은 `observe + vendored`다. `legacy`나 runtime URL source는 만들지 않는다.

### 5.2 Workflow Contract Adapter

`server/workflow-contract/adapter.js`는 다음 Interface를 제공한다.

- artifact provenance와 capability observation
- route enum, live/historical label, receipt grammar lookup
- spec/plan/review/disposition receipt parsing
- completion report grammar와 identity/section validation
- lifecycle projection과 display glyph input
- guard kind/effect lookup
- display fail-quiet와 execution fail-closed 판정
- compatibility hit와 contract mismatch telemetry

Adapter는 raw payload object를 caller에게 넘기지 않는다. caller는 typed accessor/result만
받고 payload path나 regex를 재구성하지 않는다. parsing 결과는 최소한
`ok | unavailable | malformed | unsupported`를 구분하고 safety-critical accessor의
`unavailable/malformed/unsupported`는 실행 허가가 될 수 없다.

caller migration 순서는 다음과 같다.

1. `server/workflow-enrich.js`의 display-only route/receipt projection
2. `server/worker/admission.js`의 safety-critical admission grammar
3. `server/worker/scheduler.js`의 dispatch/attempt identity
4. `server/worker/revise-disposition.js`의 receipt/readback grammar
5. server report binding과 WS projection
6. `app/utils/report-marker.js`의 historical rendering fallback

artifact integrity, lock/hash, required capability, safety-critical parse failure는 mode보다
먼저 판정하고 `observe/enforce` 모두 admission/dispatch를 fail-closed한다. 기존 queue는
보존하고 이미 실행 중인 attempt를 kill하지 않는다.

observe mode에서 legacy decision authority를 유지할 수 있는 경우는 artifact가 완전히
유효한데 Adapter와 legacy caller의 **semantic result만** 다른 때뿐이다. 이 mismatch는
structured counter를 남기고 기존 result를 사용한다. enforce mode에서는 유효 artifact의
safety-critical 결정을 Adapter가 소유한다. display-only unknown additive field는
ignore/fail-quiet한다.

### 5.3 Attempt identity

- queue map key `attempt_id`가 durable canonical identity다.
- `BDUI_ATTEMPT_ID`는 usage receipt directory의 성공/부재와 무관하게 모든 새
  launch/resume/disposition-safe Worker subprocess에 주입한다.
- usage receipt directory env는 준비된 경우에만 별도로 주입한다.
- env에 caller가 다른 `BDUI_ATTEMPT_ID`를 제공하면 spawn 전에 conflict로 거부한다.
- session/thread ID는 resume lineage 증거이고 attempt ID를 대체하지 않는다.
- generic `appendAttempt`는 이미 존재하는 map key를 덮어쓰지 않고
  `attempt_id_conflict`를 반환하며 durable data를 바꾸지 않는다. 기존 attempt 갱신은
  `updateAttempt` 또는 기존 specialized completion operation을 사용한다.
- historical missing attempt field는 migration하지 않고 `legacy_unbound`로 normalize한다.

### 5.4 Completion report binding

report writer와 endpoint 의무는 workflow session이 소유한다. beads-ui server는 normalized
comment 목록을 읽어 current attempt와 bind하고 다음 상태를 projection한다.

| state | 조건 | effect |
|---|---|---|
| `verified` | marker/meta, `worker · attempt <exact-id>`, 결론, 고정 여섯 section/order가 모두 일치 | settlement evidence로 사용 |
| `marker_only` | marker/meta는 유효하지만 section completeness가 부족 | historical display만, 새 attempt는 repair candidate |
| `mismatch` | 다른 attempt ID, wrong lane, duplicate conflicting report | fail-closed evidence, 자동 추측 금지 |
| `unbound` | historical attempt에 expected identity가 없음 | legacy badge, control/merge authority 없음 |
| `absent` | report 없음 | obligated new endpoint만 bounded repair candidate |

여섯 section의 이름과 순서는 artifact에서 가져온다. parser는 section을 로컬 상수로
복사하지 않는다. 같은 attempt의 exact report가 둘 이상이면 가장 최신 것을 고르지 않고
conflict로 처리한다.

completion report presence는 canonical 계약상 수집 대상이지만 기존 PR merge의 blocker는
아니다. 따라서 historical `marker_only/unbound/absent`를 이유로 이미 합법적인 PR merge를
막지 않는다. 새 Worker의 obligated endpoint에서만 Attempt Settlement가
`completion_report` repair를 한 번 journal하고, 구현을 재실행하지 않는 기존
completion repair session으로 넘긴다.

### 5.5 Runner/PID resolution

새 attempt는 다음 additive provenance를 가진다.

```text
runner_resolution = {
  requested,
  resolved,
  source,
  legacy_fallback
}
pid_owner_state = "owned" | "gone" | "recycled" | "unknown"
pid_identity_state = "known" | "dead" | "recycled" | "unknown"
```

- 새 non-null unknown runner/model/effort는 Claude로 fallback하지 않고 pre-start 실패한다.
- historical null/missing runner는 UI display에만 `legacy_fallback=true`로 보일 수 있다.
  settlement, resume, signal, kill authority로 쓰지 않는다.
- `pid_owner_state`는 `UI-309b` recovered-control의 raw authority다. Adapter display
  projection은 `owned -> known`, `gone -> dead`, 나머지는 같은 이름으로 매핑한다.
- pre-record의 `pid=null`은 queue status와 함께 아직 spawn identity가 없는 `unknown`으로
  읽고 spawn 결과 전에는 dead settlement를 만들지 않는다.
- PID 한쪽의 start identity가 없으면 `unknown`, start가 다르면 `recycled`, process가
  확실히 없으면 `gone`, exact identity가 맞으면 `owned`다.
- `unknown`에는 signal, resume, discard, archive, cleanup effect를 실행하지 않는다.
- `recycled`에는 signal을 보내지 않지만 `UI-309b`가 소유한 archive proof와 cleanup
  precondition이 충족되면 그 기존 discard/cleanup choreography는 실행할 수 있다.
- transport unknown은 같은 run을 reconcile하며 새 provider/runner dispatch를 만들지 않는다.

이 변경은 `UI-309b`의 recovered-control choreography를 대체하지 않는다. 그 Module이 effect를
실행하기 전에 소비할 더 정확한 observation을 제공한다.

### 5.6 Guard taxonomy

command guard의 현재 kind/effect 표를 authority로 사용한다.

| guard kind | effect |
|---|---|
| `base_merge` | `warn` |
| `git_push_base` | `warn` |
| `gh_pr_merge` | `kill` |
| `hook_bypass` | `kill` |

새 durable warning/block record에는 `kind`, `effect`, `reason`, `command`, `at`을 남긴다.
legacy record는 exact `reason`으로 알려진 kind를 추론하되 원문 command로 재분류하지 않는다.
알 수 없는 safety guard는 fail-closed하고 effect를 추측하지 않는다. command 전문은 기존
bounded/redacted 저장 규칙을 유지한다.

### 5.7 Attempt Settlement

새 `server/worker/attempt-settlement.js`는 다음 authoritative observation만 조합한다.

- exact attempt ID와 runner/session/thread/PID identity
- process/session terminal state
- completion intent의 exact root/op/attempt/failure-key binding
- normalized Bead status/metadata/children
- PR URL/base/head/current-head CI
- report binding state
- guard effect, deploy/cleanup observation

출력은 `live | awaiting_evidence | repair_required | settled | blocked_unknown |
legacy_unbound` 중 하나와 stable reason set이다. Module은 PR merge, deploy, kill을 직접
실행하지 않고 기존 owner에게 bounded action을 요청한다.

새 attempt record에는 mandatory durable settlement journal을 둔다. legacy record만 journal
부재를 허용하며 read-only `legacy_unbound`로 normalize한다.

```text
settlement = {
  state,
  evidence_digest,
  repair_kind,
  repair_attempt_id,
  observed_at
}
```

- normalized evidence가 같으면 같은 repair를 두 번 시작하지 않는다.
- restart 뒤 journal을 읽어 미완료 repair만 재조정한다.
- stale/mismatched callback은 현행처럼 no-op이며 더 약한 ID로 채택하지 않는다.
- missing report처럼 보정 가능한 endpoint evidence만 한 번 보정한다.
- CI red, unknown PID, contract mismatch, conflicting report, ownership ambiguity는 repair로
  우회하지 않고 기존 hard-stop/needs-human 경계를 유지한다.
- child execution receipt를 beads-ui가 새 parser로 재정의하지 않는다. controller가 만든
  child disposition을 normalized Bead projection으로 소비하고, evidence가 없는 child를
  무조건 close하는 현재 sweep은 별도 canonical decision 없이는 강화하지 않는다.

#### Settlement decision table

아래 표는 위에서 아래 순서로 적용한다. 먼저 일치하는 row가 state/reason/action을
결정하며 caller가 별도 우선순위를 만들지 않는다.

| 우선순위 | 관측 | state | stable reason | owner action |
|---|---|---|---|---|
| 1 | artifact integrity/capability/safety parse 실패 | `blocked_unknown` | `contract_unavailable` | 새 admission/dispatch 차단, 기존 attempt no-kill |
| 2 | legacy record에 exact identity/journal 없음 | `legacy_unbound` | `legacy_identity_absent` | display-only, effect authority 없음 |
| 3 | attempt/root/op/failure-key lineage mismatch | `blocked_unknown` | `lineage_mismatch` | 자동 채택·repair 금지 |
| 4 | `pid_owner_state=unknown` | `blocked_unknown` | `pid_unknown` | control/archive/cleanup 금지 |
| 5 | `pid_owner_state=recycled`이고 archive/cleanup proof 부족 | `blocked_unknown` | `pid_recycled_unproven` | signal 금지, `UI-309b` proof 대기 |
| 6 | exact runner/process/session이 live | `live` | `process_live` | 관측만 계속 |
| 7 | current-head CI red | `blocked_unknown` | `ci_red` | hard stop, repair 우회 금지 |
| 8 | PR/base/head state unreadable 또는 ownership 모호 | `blocked_unknown` | `pr_state_unreadable` | merge/cleanup 추측 금지 |
| 9 | report가 conflicting duplicate/wrong identity | `blocked_unknown` | `report_conflict` | report 자동 선택 금지 |
| 10 | cleanup/deploy owner가 합법적으로 진행 중 | `awaiting_evidence` | `cleanup_pending` | 기존 owner completion 대기 |
| 11 | terminal의 required non-report evidence 또는 report observation이 unreadable/pending이고 row 7–9 hard-stop은 아님. report가 이미 absent/marker-only로 확정된 경우도 다른 evidence가 pending이면 이 row | `awaiting_evidence` | `terminal_evidence_pending` | bounded re-observe |
| 12 | 새 obligated endpoint report가 absent/marker-only이고 그 밖의 required terminal identity/evidence는 모두 readable·완료 | `repair_required` | `completion_report_missing` | one-shot completion report repair |
| 13 | required evidence와 owner effects가 모두 완료 | `settled` | `settlement_complete` | terminal readback |

report presence가 merge blocker가 아닌 historical/PR row에는 row 12를 적용하지 않고 row 2
또는 기존 merge authority를 유지한다. row 12는 canonical obligated new Worker endpoint에만
적용한다.

#### Journal transition과 CAS

- prerecord가 성공할 때 journal을 `live` 또는 `awaiting_evidence` 초기값으로 함께 쓴다.
- transition write는 `(attempt_id, prior_state, prior_evidence_digest)` CAS를 요구하고
  authoritative post-write attempt를 readback한다.
- 허용 transition은 `live -> awaiting_evidence|repair_required|blocked_unknown|settled`,
  `awaiting_evidence -> live|repair_required|blocked_unknown|settled`,
  `repair_required -> awaiting_evidence|blocked_unknown|settled`다.
- `blocked_unknown`은 새로운 authoritative evidence가 digest를 바꾼 경우에만 decision table을
  다시 적용해 `live|awaiting_evidence|repair_required|blocked_unknown|settled`로 전이할 수
  있다. 같은 `blocked_unknown` state라도 reason 또는 evidence digest가 바뀌면 CAS write와
  readback을 수행한다.
- `settled`는 terminal immutable이며 stale callback이나 old digest가 되돌릴 수 없다.
- `legacy_unbound`는 write transition이 없는 read-only projection이다.
- CAS conflict는 새 repair를 띄우지 않고 latest journal을 다시 관측한다.

### 5.8 UI와 observability

WS projection은 prompt/comment body/command argv를 추가 노출하지 않고 다음 safe field만
전달한다.

- artifact producer/hash/mode/source와 capability status
- `report_binding_state`
- `runner_resolution.source`, `legacy_fallback`
- `pid_identity_state`
- guard `kind/effect/reason`
- settlement state/reason

UI는 `verified`, `mismatch`, `unbound`, `contract unavailable`을 낮은 소음의 badge/detail로
보인다. legacy field가 아예 없는 record는 새 경고를 대량 생성하지 않는다.

structured counter는 최소한 다음을 가진다.

- `contract_mismatch_total`
- `compatibility_hit_total`
- `fail_closed_total`
- `report_binding_state_total{state}`
- `runner_resolution_total{source}`
- `pid_identity_state_total{state}`

## 6. Rollout과 removal gate

### Phase 1 — artifact/Adapter observe

- provider artifact/lock과 current/previous fixture를 vendoring한다.
- Adapter를 로드하되 decision authority는 기존 caller에 둔다.
- provenance/hash/capability/mismatch telemetry를 검증한다.

### Phase 2 — caller migration과 exact identity

- display -> admission -> dispatch -> disposition -> report 순서로 caller를 Adapter 뒤로
  옮긴다.
- `BDUI_ATTEMPT_ID`, duplicate attempt, runner/PID/guard durable evidence를 정합한다.
- 각 단계에서 legacy/result equivalence와 safety-negative test를 통과한 뒤 다음 단계로 간다.

### Phase 3 — Attempt Settlement와 enforce-ready

- durable settlement journal과 bounded repair를 기존 completion intent에 연결한다.
- config는 여전히 observe가 기본이며 operator가 enforce를 명시 선택할 수 있게 한다.
- current -> previous -> current rollback probe가 queue/session/Bead bytes를 바꾸지 않음을
  확인한다.

### Runtime enable와 compatibility removal

enforce enable은 코드 merge와 분리된 operator action이다. 최소 7일과 새 attempt 20건을
모두 충족하고, Claude/Codex attempt가 각각 한 건 이상 있으며, safety mismatch와
unknown new runner/PID가 0이고 rollback probe가 성공한 뒤에만 수행한다.

delayed enforce는 별도 후속 Bead로 넘기지 않고 `UI-k066`의 required endpoint로 유지한다.
observe PR Delivery와 첫 deploy 뒤에도 parent는 open/resolved 상태로 남고 observation window와
아래 checkpoint를 모두 끝내기 전에는 closed로 전이하지 않는다.

1. merged/deployed SHA, observe config, counters/sample, current/previous rollback artifact를
   같은 checkpoint record로 readback한다.
2. 현재 config bytes와 selected source를 snapshot하고 rollback source를 exact lock entry로 pin한다.
3. config를 `enforce`로 atomic replace하고 durable readback한다.
4. detached `bdui-shared restart`를 실행한다.
5. config, process path, listening port, HTTP response와 positive/negative admission probe,
   mismatch/fail-closed counter가 같은 deployed SHA와 enforce mode를 가리키는지 확인한다.
6. 성공하면 exact evidence를 completion record에 남기고 parent를 닫는다. 실패하면 config를
   observe로 atomic restore하고 다시 restart한 뒤 동일 readback을 수행한다. rollback 결과가
   unknown이면 hard stop한다.

중단 시 config write 전에는 다시 preflight부터 시작한다. write 후 restart 전이면 exact config를
읽고 restart 또는 rollback checkpoint에서 재개하며, restart 뒤에는 service/readback부터
재개한다. checkpoint를 추측하거나 동일 restart/enforce write를 무조건 반복하지 않는다.

raw duplicate literal과 dead fallback은 같은 PR에서 제거할 수 있지만 old durable data의
compatibility reader는 current/previous 두 release 또는 30일 중 긴 기간 동안 유지한다.
그 기간 compatibility hit가 0이고 static caller 0, replacement test, rollback 검증을 모두
만족한 뒤에만 별도 removal Bead/PR로 삭제한다. historical artifacts와 records는 삭제하지
않는다.

`docs/protocol/workflow-legacy-surfaces.yaml`은 각 compatibility/dead surface의 owner,
replacement, active readers, new-write 금지, hit counter, removal gate를 기록한다.

## 7. Test scope

이 절의 seam만 `UI-k066` 구현의 TDD authority다. 선행 Bead가 제공할 Module을 수정하는
테스트는 그 동작을 재정의하지 않고 integration fixture로만 사용한다.

### Seam 1 — artifact loader와 Adapter

대상: `server/workflow-contract/adapter.js`와 vendored fixture.

- exact artifact/hash/schema/capability는 한 번 로드되고 typed accessor를 제공한다.
- tamper, unsupported format, missing safety key/capability, lock mismatch는 명시적으로 실패한다.
- unknown additive display field는 fail-quiet하고 safety-critical unknown은 fail-closed한다.
- current/previous 선택은 명시 config만 따르며 자동 fallback하지 않는다.
- 선택한 source가 자기 lock entry의 path/full producer SHA/payload hash와 일치하며 current와
  previous가 서로 다른 provenance를 독립적으로 검증한다.
- provider golden bytes와 JS hash 재계산이 byte-identical하다.

RED 소재: 현재 artifact, lock, loader, Adapter가 없다.

### Seam 2 — caller equivalence와 ownership

대상: `workflow-enrich`, `admission`, `revise-disposition`, report projection.

- observe mode에서 기존 정상/legacy fixture와 Adapter 결과가 동일하다.
- route/receipt/report regex 또는 live label raw literal이 migrated caller에 남으면 contract
  test가 실패한다.
- plan decision table은 `UI-3qtz`, bd JSON shape는 `UI-jl9v` fixture를 그대로 사용한다.
- malformed safety input은 빈 목록/성공으로 오인되지 않는다.

RED 소재: 각 caller가 현재 자체 enum/regex를 가진다.

### Seam 3 — unconditional attempt identity와 duplicate CAS

대상: scheduler env, queue store.

- usage inbox 성공/부재/준비 실패, fresh/resume/disposition-safe launch 모두 exact
  `BDUI_ATTEMPT_ID`를 가진다.
- caller env의 conflicting attempt ID는 spawn 전에 실패한다.
- occupied map key append는 기존 record를 byte-for-byte 보존하고 conflict를 반환한다.
- historical missing field는 rewrite 없이 `legacy_unbound`로 읽힌다.

RED 소재: env 주입이 receipt directory에 조건부이고 generic append가 overwrite한다.

### Seam 4 — report binding

대상: server report binder, `app/utils/report-marker.js`, comments/WS projection.

- exact attempt와 여섯 section/order는 `verified`다.
- wrong lane/ID와 conflicting duplicate는 `mismatch`다.
- old marker/meta만 있는 report는 `marker_only`, expected ID 없는 old attempt는 `unbound`다.
- 새 obligated endpoint의 absent/marker-only만 one-shot completion repair candidate다.
- historical absence가 merge gate를 새로 막지 않는다.

RED 소재: 현재 parser는 current attempt와 section completeness를 모른다.

### Seam 5 — runner/PID/guard evidence

대상: runner registry/session monitor/command guard/queue normalization.

- new unknown runner/model/effort는 pre-start fail이고 Claude fallback하지 않는다.
- legacy null은 display-only provenance를 가지며 control effect를 실행하지 않는다.
- PID known/unknown/dead/recycled matrix가 signal/resume/settlement 허가를 구분한다.
- guard kind/effect가 warning과 kill record에 round-trip되고 legacy reason inference가
  deterministic하다.
- unknown guard는 fail-closed하며 command 원문 재분류를 하지 않는다.

RED 소재: unknown runner fallback, one-side-unknown PID ownership, dropped guard kind.

### Seam 6 — durable settlement와 restart repair

대상: `attempt-settlement.js`, scheduler/completion-intent/e2e harness.

- exact root/op/attempt/failure digest가 일치할 때만 settlement transition을 수행한다.
- callback 전후 crash, duplicate event, stale ancestor, resume descendant가 같은 repair를
  두 번 만들지 않는다.
- decision table의 모든 row와 stable reason, 허용/금지 transition, stale CAS가 table-driven
  fixture로 고정된다.
- decision overlap fixture는 exact first-match 결과를 고정한다: `ci_red + missing report`는
  row 7, PR ownership/read failure + missing report는 row 8, conflicting report + pending
  evidence는 row 9, cleanup in progress + missing report는 row 10, known missing report + 다른
  evidence pending 및 report observation 자체가 pending인 경우는 row 11, 모든 다른 evidence가
  완료된 missing/marker-only report만 row 12다.
- 새 attempt는 prerecord부터 journal이 존재하고 legacy-only nullable row는 write되지 않는다.
- changed authoritative digest가 `blocked_unknown`에서 `live`, `repair_required`, 다른
  `blocked_unknown` reason, `awaiting_evidence`, `settled` 각각으로 가는 row를 만들고 같은-state
  reason/digest update도 CAS/readback한다.
- missing report는 구현 재실행 없이 bounded endpoint repair로 간다.
- CI red, contract mismatch, conflicting report, unknown PID는 settled로 승격되지 않는다.
- rollback source 선택과 observe/enforce 변경은 queue/session/Bead durable bytes를 수정하지
  않는다.

RED 소재: 현재 settlement callback은 durable combined evidence journal이 없다.

### Seam 7 — rollout/legacy registry

대상: config parser, telemetry, local legacy registry contract test.

- mode/source enum 외 값은 startup diagnostic과 execution fail-closed를 만든다.
- observe mismatch는 decision을 바꾸지 않고 counter만 증가시킨다.
- observe에서도 tamper/hash/capability/safety parse 실패는 no-write/no-kill 상태로 새
  admission/dispatch를 막는다.
- enforce safety mismatch는 새 dispatch를 막되 기존 attempt를 kill하지 않는다.
- unregistered raw literal/fallback과 removal-gate 미충족 삭제는 CI에서 실패한다.
- observe -> enforce config write, detached restart, exact readback, failure rollback과 각
  interruption checkpoint가 table-driven fixture로 고정된다.

RED 소재: 현재 mode/source/registry/counter가 없다.

## 8. Verification

focused test 뒤 canonical bundle을 실행한다.

```bash
npm run tsc
npm run lint
npm test
npm run prettier:check
npm run build
npm run all
```

동일 SHA의 중복 full suite는 receipt로 재사용할 수 있지만 base merge, generated bundle,
safety-critical caller가 바뀌면 무효화한다. skipped runtime probe는 pass로 기록하지 않고
reason과 next check를 남긴다.

## 9. Publish·deploy·readback

1. `UI-k066` branch의 integrated diff를 review하고 PR을 `main` 대상으로 연다.
2. PR lane은 self-merge하지 않고 PR Delivery에서 멈춘다.
3. merge 뒤 `UI-16ep` deployment reconciler가 merged SHA를 pin하고
   `docs/agents/repo-ops.toml`의 `[verify] npm run all`을 실행한다.
4. 모든 durable cleanup/readback이 끝난 뒤 `[deploy] bdui-shared restart`를 detached terminal
   action으로 실행한다.
5. merged checkout에서 service process path, config, listening port, HTTP response가 같은
   merged SHA를 반영하는지 확인한다.
6. artifact producer/hash/mode/source, current/previous rollback probe, mismatch counters를
   readback한다.
7. observe 배포 완료는 enforce enable과 구분해 completion report에 기록한다.
8. observation window 뒤 §6의 checkpoint 순서로 enforce를 적용하고, 성공 또는 observe rollback의
   config/process/path/port/HTTP/admission/counter evidence를 readback한다.

restart 또는 readback 실패는 Bead를 open/resolved 상태로 유지하며 service가 반영됐다고
추측하지 않는다. deploy action 전 세션이 끊기면 deployment reconciler의 durable phase에서
재개하고, terminal restart 뒤에는 process/port/HTTP readback부터 재개한다.

### 9.1 Spec-gate disposition

- seam soundness는 §7의 일곱 RED 소재와 target test가 소유한다.
- live apply order는 observe 배포의 merged SHA pin -> pinned verify -> durable cleanup -> detached
  restart -> process/path/port/HTTP readback 뒤, observation window -> config snapshot/rollback pin
  -> enforce atomic write -> detached restart -> config/process/path/port/HTTP/admission/counter
  readback -> 성공 기록 또는 observe restore/restart/readback 순서로 고정한다.
- target deploy/notify는 `docs/agents/repo-ops.toml [deploy]`와 closed `UI-16ep`가 소유하지만,
  observation window 뒤 enforce config 전환·restart·readback은 current Bead의 별도 required
  operator endpoint다.
- provider와 local prerequisite는 dependency-backed Bead로 disposition됐다.
- compatibility reader의 장래 removal은 observation gate가 충족될 때 새 Bead로 승격하는
  조건부 후속이다. 반면 delayed enforce는 이번 spec이 요구하는 interactive-only no-PR residue로
  current Bead에 남는다.
- 따라서 `UI-k066`의 formal spec receipt write에서는 `worker-ineligible`을 같은 logical write에
  추가하고 exact label set을 readback한다. enforce endpoint가 dependency-backed Bead+PR/notify로
  재설계된 후속 spec revision이 생길 때만 이 label을 제거할 수 있다.

## 10. 비범위

- dotfiles canonical contract 또는 exporter 수정
- runtime network contract fetch
- bd JSON v1/v2 normalization 재구현
- full_plan plan authority/decision table 변경
- runner discard/archive/branch/PR cleanup 재구현
- deployment reconciler 또는 service restart choreography 재구현
- command guard의 shell classification 변경
- completion report 부재를 기존 PR merge의 새 blocker로 승격
- child execution receipt grammar의 beads-ui 복제
- old queue/session/comment/Bead metadata bulk migration
- unknown runner를 alternate provider로 fallback

## 11. 완료 조건

1. beads-ui가 exact provider artifact/hash/capability를 offline으로 검증한다.
2. active workflow raw caller가 단일 Adapter 뒤로 이동하고 ownership contract test가 이를
   고정한다.
3. 모든 새 Worker subprocess가 exact attempt ID를 받고 duplicate map key overwrite가
   불가능하다.
4. report binding, runner/PID, guard effect, PR/CI/Bead observation이 Attempt Settlement의
   durable evidence로 조합된다.
5. unknown safety state는 fail-closed하고 historical null/legacy data는 rewrite 없이
   display-only compatibility로 남는다.
6. restart 뒤 repair가 idempotent하며 기존 completion lineage invariant를 약화하지 않는다.
7. observe 배포, rollback probe, canonical verification, merged service readback이 통과한다.
8. compatibility/dead surface는 owner·counter·removal gate를 가지며 historical evidence는
   보존된다.
9. observation window 뒤 enforce checkpoint가 성공하거나 실패 시 observe rollback의 exact
   service/readback이 완료되고, 그 결과가 current Bead의 durable evidence로 남는다.
