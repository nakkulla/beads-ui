# 이슈별 Claude·Codex 토큰 사용량 분리 집계 설계

- Bead: `UI-orfj`
- Route: `full_plan`
- Producer dependency: `dotfiles-4eav`
- Producer contract: dotfiles
  `docs/superpowers/specs/2026-08-10-codex-nested-usage-receipt-design.md`

## 요약

Worker의 issue/attempt token usage를 provider별로 정확히 계산하고, Claude
orchestrator가 내부 workflow에서 실행한 Codex implementation 및 review/consult leg를
같은 outer Attempt에 durable하게 결속한다. Worker와 Monitor에는 Claude/Codex provider
subtotal을 분리 표시하고, issue detail에는 `orchestrator`, `implementation`,
`review-consult` role breakdown을 표시한다.

현재 direct Codex attempt는 `turn.completed.usage`를 이미 저장하지만 공용 UI 합계가
Claude semantics로 cache field를 다시 더해 cached input을 이중 집계한다. 또한 mixed
Claude→Codex 실행은 outer Claude Attempt만 존재하고 inner Codex thread/usage는 durable
Attempt 데이터에 없다. 이 설계는 existing `Attempt.runner`와 `Attempt.usage`를 outer
orchestrator leg로 유지하고, versioned producer receipt를 `Attempt.usage_legs`로 ingest해
두 문제를 함께 해결한다.

`dotfiles-4nd4`는 제품 동작을 바꾸지 않고 Codex `full_plan` authoring에서 `/plan`
의존을 제거한 절차 변경이다. 이 spec의 기존 제품 결정은 유지하며 plan authoring만
Default-mode lifecycle을 따른다.

## 확인된 현재 동작

- Claude adapter는 input/output/cache read/cache creation과 final cost를 공용 usage
  tally에 올린다. Claude cache fields는 input/output과 별도의 token usage이므로 headline
  total에 포함한다.
- Codex adapter는 input/output/cached input/cache write를 같은 네 공용 field로
  투영하고 reasoning output은 버린다. Codex cached/cache-write/reasoning은 input/output의
  subset breakdown이므로 headline에 다시 더하면 안 된다.
- usage store와 queue는 Attempt 단위로 tally를 저장하고, live running attempt만 WS
  snapshot에 overlay한다.
- `sumAttemptUsage`는 runner/provider를 보지 않고 한 bead의 모든 attempt와 네 field를
  flat sum한다. Worker, Monitor, detail, KPI가 이 semantics를 공유한다.
- Attempt에는 durable `runner`, `model`, `effort`, outer `session_id`, `resumed_from`이
  있지만 inner workflow leg의 child attempt, role, provider, thread, usage는 없다.
- `impl_model`과 review keys는 outer workflow session 안에서 소비되는 metadata이며 별도
  Worker launch/Attempt를 만들지 않는다. transcript text를 파싱해 provider attribution을
  만들 수 없다.

## 목표

- direct Claude와 direct Codex attempt 모두 provider semantics에 맞는 subtotal을 표시한다.
- newly started mixed attempt에서 completed inner Codex leg receipt를 idempotent하게 ingest,
  persist, replay한다.
- outer Attempt usage는 `orchestrator`, inner receipt는 `implementation` 또는
  `review-consult`로 분류한다.
- Worker와 Monitor aggregate에서 Claude/Codex subtotal을 별도 badge/chip으로 표시한다.
- issue detail에서 attempt별 provider/model/session과 role별 usage breakdown을 보여 준다.
- nested leg는 실행 중 delta가 아니라 terminal receipt가 도착한 뒤부터 표시한다.
- receipt 누락·손상은 Worker 결과를 바꾸지 않고 해당 leg를 fail-quiet하게 생략한다.
- 과거 attempt backfill 없이 new receipt와 existing direct usage만 정확하게 계산한다.

## 비목표

- Claude와 Codex subtotal을 하나의 provider grand total로 합치지 않는다.
- provider pricing을 추정하거나 Codex cost를 계산하지 않는다.
- in-progress inner Codex token delta를 실시간 표시하지 않는다.
- transcript, rollout log, timestamp heuristic으로 mixed attribution을 복원하지 않는다.
- 과거 mixed attempt를 backfill하거나 reasoning usage를 추정하지 않는다.
- `impl_model`/review metadata만 보고 실제 Codex 실행이 있었다고 간주하지 않는다.
- account quota header meter(`/api/claude-usage`, `/api/codex-usage`)와 결합하지 않는다.

## 결정

### 1. Provider-aware subtotal semantics

provider는 outer Attempt에서 `runner==='codex'`면 Codex, 그 외 legacy/null/unknown runner는
현재 adapter fallback과 동일하게 Claude로 canonicalize한다. nested leg는 receipt의
`provider==='codex'`만 v1에서 허용한다.

| provider | headline subtotal | breakdown-only |
| --- | --- | --- |
| Claude | input + output + cache read + cache creation | 없음 |
| Codex | input + output | cached input, cache write, reasoning output |

Codex `output_tokens`에는 reasoning output이 포함될 수 있고 `input_tokens`에는 cached
input/cache write가 포함될 수 있으므로 breakdown을 다시 더하지 않는다. raw
`total_tokens`가 있더라도 headline source로 사용하지 않는다. 이 규칙은 direct Codex와
nested Codex receipt에 동일하게 적용한다.

existing Codex Attempt의 cache fields는 공용 이름으로 이미 durable하게 저장돼 있으므로
runner-aware formula만으로 과거 direct attempt의 이중 집계를 바로잡을 수 있다. 기존
reasoning 값은 저장되지 않았으므로 `0`으로 꾸미지 않고 breakdown 행을 생략한다.

### 2. Attempt-scoped receipt inbox

새 attempt를 launch할 때 scheduler는 state root 아래 attempt-specific private directory를
만들고 runner env에 다음을 추가한다.

- `BDUI_ATTEMPT_ID=<attempt_id>`
- `BDUI_CODEX_USAGE_RECEIPT_DIR=<absolute-private-dir>`

directory는 symlink가 아닌 owner-only `0700` directory이며 broad workspace path나 prompt를
포함하지 않는다. Claude outer session의 child process가 환경을 상속해 dotfiles producer가
terminal receipt를 쓸 수 있다. direct Codex runner에는 환경이 있어도 bridge producer가
없으므로 별도 receipt가 생기지 않는다.

consumer는 path를 attempt ID로 다시 resolve하고 environment-provided path를 read source로
신뢰하지 않는다. restart recovery는 persisted running attempt에 대해 같은 deterministic
directory를 scan한다.

### 3. Receipt ingest와 lifecycle

`codex-usage-receipt-v1` reader는 schema, filename/receipt ID 일치, attempt ID, provider,
role, thread/turn identity, model, token number를 validate한다. 성공한 receipt는
`receipt_id`로 deduplicate한다.

- running attempt: 기존 3초 usage fanout 경계에서 inbox를 scan해 completed leg를 live
  Attempt overlay에 포함한다.
- normal completion/pause/stop: session monitor/raw usage를 drain한 뒤 final inbox scan,
  queue Attempt patch, atomic queue persistence 순서로 처리한다.
- restart/dead reconcile: raw outer usage replay와 별개로 inbox를 scan하고 같은 dedupe
  path로 terminal Attempt에 persist한다.
- queue persistence가 성공한 뒤 consumed file을 제거한다. persistence 실패 시 file을
  보존해 다음 scan에서 재시도한다.
- orphan inbox는 attempt가 없거나 terminal persistence 뒤 retention을 넘은 경우에만
  bounded GC한다.

malformed, foreign-attempt, unknown-version, duplicate-conflict receipt는 ingest하지 않고
redacted warning만 기록한다. receipt failure는 verdict, exit, Bead status, PR lifecycle을
바꾸지 않는다.

### 4. Durable Attempt schema

existing `Attempt.usage`는 outer runner의 canonical usage로 유지한다. optional
`Attempt.usage_legs`를 추가한다.

```js
usage_legs: [
  {
    receipt_id: '...',
    provider: 'codex',
    role: 'implementation',
    model: 'gpt-5.6-terra',
    session_id: '<thread-id>',
    turn_id: '<turn-id>',
    usage: {
      input_tokens: 100,
      output_tokens: 20,
      cache_read_input_tokens: 60,
      cache_creation_input_tokens: 0,
      reasoning_output_tokens: 8
    },
    completed_at: '...'
  }
]
```

`role`은 v1에서 `implementation|review-consult`만 허용한다. outer `Attempt.usage`는 UI
projection에서 derived `orchestrator` leg로 취급하며 schema에 중복 저장하지 않는다.
따라서 existing queue JSON은 migration 없이 `usage_legs=[]`로 normalize되고, new queue는
role-tagged nested legs만 추가한다.

usage leg에는 prompt, result body, cwd, auth/account data를 저장하지 않는다. WS queue와
Monitor snapshot은 기존 Attempt projection을 통해 optional legs를 전달하되 prompt stripping
규칙을 그대로 적용한다.

### 5. Aggregation API

flat `sumAttemptUsage`를 provider/role-aware projection으로 확장한다. core utility는 최소
다음을 반환한다.

- `providers.claude`: subtotal, breakdown, optional cost, replayed
- `providers.codex`: subtotal, breakdown, cost absent, replayed
- `roles.orchestrator`: provider별 leg list/subtotal
- `roles.implementation`: Codex leg list/subtotal
- `roles.review-consult`: Codex leg list/subtotal

provider subtotal이 없는 bucket은 렌더하지 않는다. Claude cost는 합산 대상 Claude outer
Attempt가 모두 finite cost를 제공할 때만 기존 rule대로 표시한다. nested Codex leg와
Claude cost를 합친 grand cost는 만들지 않는다.

resume chain의 각 Attempt는 자체 outer orchestrator와 자체 nested legs를 가지며 bead-level
aggregate는 모든 Attempts를 provider별로 합산한다. `resumed_from`은 lineage display용이고
usage dedupe key로 사용하지 않는다.

### 6. UI

#### Worker

- running/paused/failed/done/PR-wait tile 및 lane row는 기존 단일 token badge 대신 present
  provider별 badge를 표시한다: `Claude τ…`, `Codex τ…`.
- KPI/top summary도 provider별 total로 분리한다. Claude+Codex grand token 수치는 표시하지
  않는다.
- tooltip은 provider subtotal 공식을 명시하고 exact breakdown을 보여 준다. Codex tooltip은
  cached/cache-write/reasoning을 `subtotal에 포함되지 않는 subset`으로 표시한다.

#### Monitor

- cross-workspace total과 각 lane card에 같은 provider subtotal semantics를 사용한다.
- Monitor projection은 현재 runner를 버리는 곳에서도 aggregation 전에 Attempt runner를
  사용하고 provider badge result만 item에 실어 provider attribution을 잃지 않는다.

#### Issue detail/session history

- issue heading은 provider subtotal을 분리 표시한다.
- 각 outer Attempt row는 existing runner/model/session metadata와 `orchestrator` usage를
  표시한다.
- nested receipt는 parent Attempt 아래 `implementation` 또는 `review-consult` row로
  provider/model/thread short ID, completed time, subtotal, breakdown을 표시한다.
- receipt가 없는 configured `impl_model`/review key에는 `0` 또는 미실행 row를 만들지 않는다.

badge/chip은 existing token usage visual vocabulary를 재사용하고 새 color taxonomy를 만들지
않는다.

## 오류·호환 처리

- legacy/null/unknown runner: Claude fallback semantics
- existing direct Codex Attempt: runner-aware subtotal 적용, reasoning breakdown absent
- usage-only zero fields: existing explicit `τ0` behavior 유지
- cost-only tally: existing UI rule대로 token badge 없음
- receipt unknown schema/role/provider: leg 생략
- duplicate same receipt bytes: idempotent no-op
- duplicate same ID different bytes: first durable value 유지, warning
- live overlay와 durable queue 양쪽에 같은 leg: receipt ID dedupe
- restart replayed outer usage: existing partial marker 유지; receipt leg는 terminal cumulative
  value라 별도 partial로 표시하지 않음

## 개인정보와 cleanup

receipt directory는 state root 아래 attempt-scoped `0700`, files는 `0600`이다. server log와
WS에는 token 숫자 및 non-sensitive identity만 허용한다. prompt, raw output, review body,
reasoning text, command, auth/account identifier를 receipt/Attempt/WS에 싣지 않는다.
durable queue write 전에 staging receipt를 삭제하지 않는다.

## Test scope

이 spec은 `full_plan` plan의 RED-GREEN seam을 승인한다.

### Seam A — provider subtotal

- RED: Claude cache는 subtotal에 포함하고 Codex cache/reasoning은 제외하는 direct/mixed
  utility tests. current Codex fixture의 old flat sum이 아니라 input+output을 기대한다.
- GREEN: provider-aware normalization, subtotal, tooltip breakdown utility.

### Seam B — receipt reader와 persistence

- RED: valid v1, malformed/unknown/foreign, duplicate same/different bytes, live scan, final drain,
  restart recovery, persistence-before-cleanup tests.
- GREEN: attempt-scoped receipt reader/store와 scheduler/session-monitor/reconcile integration.

### Seam C — queue/WS compatibility

- RED: `usage_legs` cold reload, terminal persistence, running overlay, prompt stripping, Monitor
  snapshot projection, legacy absent field tests.
- GREEN: optional Attempt schema와 existing WS decoration propagation.

### Seam D — Worker/Monitor/detail UI

- RED: provider badges, no grand total, Codex subset tooltip, three role groups, absent receipt
  fail-quiet, resume-chain aggregation tests.
- GREEN: Worker lanes/grid/KPI, Monitor lanes/top total, detail session history renderers.

### Seam E — direct Codex regression

- Codex adapter는 `reasoning_output_tokens`를 optional breakdown으로 lift하고 live/replay/store/
  queue roundtrip에서 보존한다.
- existing Claude message-ID replacement, authoritative result, cost, replay partial behavior는
  변하지 않는다.

## 구현 후 검증

- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:write`
- frontend source 변경 후 `npm run build`, bundle/map 포함
- `git diff --check` 및 clean owned diff 확인
- dotfiles producer deployed 상태에서 mixed smoke 1건:
  Claude orchestrator + Codex implementation + Codex review/consult receipt, provider subtotal,
  role detail, restart persistence 확인
- direct Codex smoke 1건: cache가 subtotal에 재가산되지 않고 reasoning은 breakdown-only인지
  확인
- merge 후 `docs/agents/repo-ops.toml` deploy 경로로 `bdui-shared restart`, merged checkout
  process path·port·HTTP response 검증

## Cross-repo sequencing

1. dotfiles `dotfiles-4eav` producer spec/plan/implementation/review/deploy 완료
2. foreign `blocks` edge 해소 확인
3. beads-ui `UI-orfj` consumer implementation
4. 두 deployed runtime을 함께 사용하는 mixed smoke

두 repo는 split unit이다. spec/plan/Bead/commit/review/verification을 독립적으로 유지하고,
beads-ui `spec_id`나 `plan_path`에 foreign path를 기록하지 않는다.
