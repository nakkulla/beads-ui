# UI-orfj provider·role별 token usage 구현 계획

## Context

- 승인된 spec은 `docs/superpowers/specs/2026-08-10-provider-role-token-usage-design.md`이며, 기준 commit은 `72e0967eab27d59bd2ee7c1415b668e9f03557ae`다.
- producer unit `dotfiles-4eav`는 closed 상태다. beads-ui는 `codex-usage-receipt-v1` 계약의 consumer로서 이미 정해진 receipt를 읽고, workflow 계약 키나 producer schema를 새로 정의하지 않는다.
- 현재 outer `Attempt.usage`는 네 공용 token field만 보존하며, `app/utils/token-usage.js`는 runner를 보지 않고 cache field까지 headline에 합산한다. 이 때문에 direct Codex의 subset cache가 이중 집계되고 reasoning breakdown이 유실된다.
- 새 구현은 existing outer usage를 `orchestrator` leg로 투영하고, terminal nested receipt만 `usage_legs`에 저장한다. 과거 mixed attempt backfill, in-progress nested delta, Codex 가격 추정, transcript/시간 heuristic은 범위 밖이다.
- malformed·foreign·unknown receipt는 fail-quiet하게 생략하고 Worker 결과나 Bead/PR lifecycle을 바꾸지 않는다. consumed file은 queue persistence가 성공한 뒤에만 제거한다.
- 이 무인 worker authoring lane에서는 plan commit이 `UI-orfj` branch에 남아 PR로 `main`에 도달한다. session guard 때문에 base 직접 publish는 수행하지 않고 그 예외를 Bead notes에 기록한다.

## Phase 1: direct Codex와 provider projection

- `server/worker/runner/codex.js`, `server/worker/usage-store.js`, replay 경로와 `server/worker/queue-store.js` normalize/persist/reload에서 optional `reasoning_output_tokens`를 lift·round-trip하되 direct Codex headline은 `input_tokens + output_tokens`만 사용하도록 RED→GREEN 회귀 테스트를 추가한다.
- `app/utils/token-usage.js`를 runner-aware provider/role projection으로 확장해 legacy/null/unknown runner는 Claude, `runner === 'codex'`는 Codex로 canonicalize하고 outer usage를 `orchestrator` leg로 만든다.
- Claude subtotal은 input/output/cache read/cache creation, Codex subtotal은 input/output만 합산하며 cached input/cache write/reasoning은 breakdown-only로 보존한다. Claude cost는 합산 대상 Claude outer attempt 모두가 finite cost를 보고한 경우에만 노출한다.
- empty provider/role bucket, usage 미보고 attempt, explicit zero, replayed partial, resume chain, receipt ID dedupe가 공통 projection에서 일관되게 동작하도록 focused utility/adapter tests를 고정한다.

검증: `npx vitest run server/worker/runner/codex.test.js server/worker/usage-store.test.js server/worker/usage-replay.test.js server/worker/queue-store.test.js app/utils/token-usage.test.js`

## Phase 2: attempt-scoped receipt ingest와 durable persistence

- `server/worker/state-paths.js`와 새 receipt reader/store module에 deterministic attempt inbox 경로, non-symlink·current-uid·exact `0700` directory 및 `0600` receipt 검사, v1 schema·filename/receipt ID·attempt/provider/role/thread/turn/model/token 검증, same/different duplicate 처리와 redacted warning을 구현한다.
- `server/worker/scheduler.js` launch env에 `BDUI_ATTEMPT_ID`와 consumer가 다시 resolve한 `BDUI_CODEX_USAGE_RECEIPT_DIR`를 주입하고, 기존 3초 usage fanout 경계에서 terminal receipt를 scan해 live overlay에 반영한다.
- normal completion/pause/stop에서는 outer usage drain 뒤 final inbox scan, queue Attempt patch, atomic persistence, consumed-file 제거 순서를 지키고 persistence 실패 시 file을 남겨 재시도한다.
- restart/dead reconcile은 persisted running attempt의 deterministic inbox를 다시 scan하고, attempt 부재 또는 terminal persistence 후 retention을 넘긴 orphan inbox만 bounded GC한다. `server/worker/queue-store.js`는 legacy absent field를 `usage_legs=[]`로 normalize하고 receipt ID 기준으로 live/durable leg를 idempotent하게 merge한다.
- Worker WebSocket·Monitor snapshot projection은 `usage_legs`, runner/model/session identity를 전달하면서 기존 prompt/system prompt stripping을 그대로 유지한다.

검증: `npx vitest run server/worker/state-paths.test.js server/worker/usage-receipts.test.js server/worker/queue-store.test.js server/worker/scheduler.test.js server/worker/session-monitor.test.js server/ws/worker-handlers.overlay.test.js server/ws/worker-handlers.prompt.test.js server/ws/monitor-handlers.test.js`

## Phase 3: Worker·Monitor·detail provider/role UI

- Worker running/paused/failed/done/PR-wait tile·lane·KPI를 present provider별 `Claude τ…`/`Codex τ…` badge로 바꾸고 provider grand total을 만들지 않는다.
- Monitor cross-workspace total과 lane card에 동일 projection을 적용해 aggregation 전에 attempt runner를 보존하고 present provider subtotal만 렌더한다.
- issue heading과 session history는 outer attempt의 runner/model/session 및 `orchestrator` usage를 표시하고, nested `implementation`/`review-consult` row에 provider/model/thread short ID, completed time, subtotal, breakdown을 표시한다.
- tooltip은 Claude 포함식과 Codex subset 제외식을 명시하고 exact cached/cache-write/reasoning breakdown을 보여 주며, receipt가 없거나 invalid인 configured metadata에는 `0` 또는 미실행 row를 만들지 않는다.
- 기존 token usage class와 visual vocabulary를 재사용하고, frontend tests를 갱신한 뒤 canonical bundle과 source map을 다시 생성한다.

검증: `npx vitest run app/views/worker/index.test.js app/views/worker/lanes.test.js app/views/monitor/usage.test.js app/views/monitor/lanes.test.js app/views/detail-panel/session-history.test.js app/main.worker-detail.e2e.test.js`; 이어서 `npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`, `npm run build`, `git diff --check`, `git status --short`를 실행한다. deployed dotfiles producer로 Claude orchestrator + Codex implementation + Codex review/consult mixed smoke와 direct Codex cache/reasoning smoke를 각각 1건 확인한다. PR Delivery 뒤 이 session은 merge하지 않으며, 사람의 merge click 또는 `pr-finish`가 base integration 후 `bdui-shared restart`와 merged checkout process path·port·HTTP response를 검증해야 parent를 `closed`로 전환한다.

## Test scope

- Seam A — provider subtotal (Phase 1): RED에서 Claude cache 포함, direct/mixed Codex cache·reasoning 제외, empty bucket·cost rule을 실패시키고 GREEN에서 provider-aware projection을 구현한다.
- Seam B — receipt reader와 persistence (Phase 2): RED에서 valid v1, malformed/unknown/foreign, same/different duplicate, non-symlink/current-uid/`0700` dir·`0600` file 검사, live scan, final drain, restart recovery, persistence-before-cleanup, retention 이후 bounded orphan GC를 각각 고정한 뒤 GREEN으로 reader/store와 lifecycle integration을 구현한다.
- Seam C — queue/WS compatibility (Phase 2): RED에서 `usage_legs` cold reload, terminal persistence, running overlay, prompt stripping, Monitor snapshot, legacy absent field를 고정한 뒤 GREEN으로 optional schema와 projection propagation을 구현한다.
- Seam D — Worker/Monitor/detail UI (Phase 3): RED에서 provider badge, no grand total, Codex subset tooltip, 세 role group, missing receipt fail-quiet, resume-chain aggregate를 고정한 뒤 GREEN으로 renderer를 변경한다.
- Seam E — direct Codex regression (Phase 1): RED에서 reasoning의 live/replay/store/queue normalize·persist·reload round-trip과 Codex subset headline을 고정하고 GREEN으로 adapter/store/replay/queue를 확장한다. Claude message-ID replacement, authoritative result, cost, replay partial 동작은 변경하지 않는다.
- 제외: 과거 mixed attempt backfill, nested live delta, provider pricing, account quota meter 결합, transcript/rollout log parsing, 새 visual taxonomy는 test-first 구현 범위가 아니다.
