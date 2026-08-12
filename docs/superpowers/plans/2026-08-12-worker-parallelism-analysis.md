# Worker 구현 가능 이슈 병렬성 분석 구현 계획

- Bead: `UI-04vo`
- route: `full_plan`
- spec: `docs/superpowers/specs/2026-08-12-worker-parallelism-analysis-design.md`
- spec review: `self@4f693109521376180a3091373fa6e5cb3263206a`
- plan path: `docs/superpowers/plans/2026-08-12-worker-parallelism-analysis.md`

## Context

`UI-nrut`는 exact `worker-serial` label을 durable attempt snapshot과 workspace barrier로
집행하고 Worker UI에서 generic label mutation/readback을 제공한다. 이번 작업은 그
authoritative scheduler를 바꾸지 않고, 사용자가 Worker 상단의 `병렬성 분석`을 눌렀을
때만 현재 구현 가능 이슈와 unfinished lineage의 pinned spec/plan/source bundle을 한 번
비교해 high-confidence serial 제안, ordering-only 관계, 강한 근거 부재, 불확실을
표시한다.

분석기는 queue hot path와 분리한다. 모델에는 sanitized bundle과 result schema만
전달하고 filesystem/shell/network/MCP tool을 등록하지 않는다. Claude는 no-tools와
no-session-persistence가 실측되는 adapter만, Codex는 generic `codex exec --sandbox
read-only`가 아닌 `tool_free_structured_output` capability를 증명하는 transport만
analyzer catalog에 노출한다. capability가 없으면 해당 provider는 fail-visible하게
비호환으로 표시하며 다른 provider로 fallback하지 않는다.

label 적용은 client가 generic writer를 직접 반복하지 않는다. server가
`snapshot_digest`와 선택 ID를 마지막 성공 result에 결합하고, 각 mutation 직전에
artifact identity, target membership, status/eligibility, Worker lane, live label truth를
authoritative하게 재검증한 뒤 existing generic label writer/readback core를 호출한다.

이 변경은 beads-ui 단일 repository unit이다. canonical workflow label 의미는 dotfiles가
계속 소유하고 이번 변경은 그 계약을 수정하지 않는다. 기능 검증은 현재 PR의 registered
disposable workspace E2E가 소유하며, `docs/agents/repo-ops.toml`의 managed deploy가
merge 뒤 install/restart/readback을 운반한다. required no-PR residue가 없으므로
`worker-ineligible`은 사용하지 않는다.

Phase 1부터 Phase 4까지 순서대로 진행한다. 각 phase는 실행 시 plan heading/digest에
묶인 child Bead 하나로 materialize하며, 해당 phase의 controller diff 검토와 focused
verification을 통과한 뒤 다음 phase로 넘어간다.

## Phase 1: Canonical snapshot, artifact bundle, result validator

1. `server/worker/parallel-analysis-targets.test.js`에 RED tests를 추가한다. 기존
   `runnable-cache` qualification을 통과한 top-level candidate와 queue/running/paused/
   `pr_wait` completion root의 stable union, phase child·closed/done·`worker-ineligible`·
   spec conflict/authority 부재 제외, direct dependency 및 target-base identity 고정을
   각각 검증한다.
2. `server/worker/parallel-analysis-bundle.test.js`에 pinned-base/dirty-worktree 분리,
   safe Markdown/source reference, omission reason, cap, cleanup RED tests를 먼저 추가한다.
3. RED를 확인한 뒤 `server/worker/parallel-analysis-targets.js`와
   `server/worker/parallel-analysis-bundle.js`를 구현한다. native-first `spec_id`,
   `full_plan`의 optional `plan_path`, pinned git blob OID를 사용하고, exact tracked source
   reference만 size/count/path cap 아래 수집한다. absolute/`..`/symlink escape, dirty·
   untracked·credential/backup path, directory content expansion은 omission manifest로
   남기고 temp bundle은 성공·실패·cancel 모두 정리해 target/bundle tests를 GREEN으로
   닫는다.
4. `server/worker/parallel-analysis-validator.test.js`와
   `server/worker/parallel-analysis-validator.js`를 RED→GREEN으로 구현한다. `issues`가
   target ID exact set을 중복 없이 정확히 한 번 덮도록 하고, enum/digest/evidence
   locator/strong category/high confidence/symmetric conflict/ordering endpoint를 모두
   검증하며 하나라도 어기면 전체 result를 거부한다.

Verification: `npx vitest run server/worker/parallel-analysis-targets.test.js
server/worker/parallel-analysis-bundle.test.js
server/worker/parallel-analysis-validator.test.js && npm run tsc`

## Phase 2: Settings, tool-free runner, cache and job lifecycle

1. `server/worker/parallel-analysis-store.test.js`에 unconfigured/incompatible 설정,
   CAS conflict, atomic persistence, exact identity cache hit, force bypass, artifact/base/
   dependency/model/prompt drift invalidation, failed run의 last-good 보존 RED tests를 먼저
   추가한다.
2. RED를 확인한 뒤 `server/worker/state-paths.js`에 server-global settings와
   per-workspace result cache path를 추가하고,
   `server/worker/parallel-analysis-store.js`에서 revision CAS, atomic temp-file
   rename/readback, last-good cache 보존을 구현한다. settings는 `runner-catalog`와
   analyzer capability 교집합의 exact runner/model/effort만 허용해 store tests를
   GREEN으로 닫는다.
3. `server/worker/parallel-analysis-runner.test.js`에 exact provider request/argv,
   tool-free capability rejection, duplicate start join, timeout/process-group cancel,
   restart orphan settlement RED tests를 추가한다. malicious spec/plan prompt-injection
   fixture도 추가해 artifact 명령이 실행되지 않고 zero tool/no mutation을 유지하며
   invalid result가 last-good cache를 바꾸지 않는지 먼저 실패로 고정한다.
4. RED를 확인한 뒤 `server/worker/parallel-analysis-runner.js`와 workspace single-flight
   job coordinator를 구현한다. stdin/request-body bundle, strict output schema,
   untrusted artifact를 data로만 취급하는 versioned system prompt를 고정한다. Claude
   adapter exact argv는 `--print`, `--tools ""`, `--safe-mode`,
   `--strict-mcp-config`, `--setting-sources user`, `--no-session-persistence`를
   포함한다. Codex는 tool-free structured completion을 증명하는 transport만 등록하고
   generic `codex exec --sandbox read-only`는 거부한다. 300초 timeout, capped
   diagnostic, strict validation 뒤 cache publish를 구현하고 repository/config escape,
   session artifact, filesystem inventory 무변경 tests까지 GREEN으로 닫는다.

Verification: `npx vitest run server/worker/state-paths.test.js
server/worker/parallel-analysis-store.test.js
server/worker/parallel-analysis-runner.test.js && npm run tsc`

## Phase 3: WebSocket ownership and snapshot-bound label apply

1. `server/ws/worker-parallel-analysis.test.js`에 connection workspace binding, target 0건,
   single-flight join, cache hit/force, cancel/failure, settings CAS, disconnect cleanup,
   stale snapshot publish RED tests를 먼저 추가한다.
2. RED를 확인한 뒤 `server/ws/worker-parallel-analysis-handlers.js`와
   `server/ws/context.js`에 workspace별 subscription registry/snapshot emitter를 추가하고
   `server/ws/connection.js`, `app/protocol.js`, `app/protocol.md`에
   subscribe/unsubscribe/start/cancel/settings/apply message를 연결해 WS tests를
   GREEN으로 닫는다. raw prompt, artifact content, process output은 wire에 싣지 않는다.
3. `server/ws/mutation-handlers.test.js`와
   `server/ws/worker-parallel-analysis.test.js`에 기존 label add/remove behavior와 apply
   RED tests를 먼저 추가한다. dialog-open 뒤 queue→running 전환, artifact drift, closed/
   ineligible/spec conflict, unknown label truth를 writer-before 거부하고, already-present
   no-op, stable ID order, partial failure continuation/retention을 고정한다.
4. RED를 확인한 뒤 `server/ws/mutation-handlers.js`의 label writer,
   `bd show --json` readback, `worker-serial` projection refresh/scheduler tick을 shared
   generic mutation core로 추출하되 기존 message behavior를 보존한다. analysis apply
   handler는 digest와 high-confidence result subset을 확인하고 각 ID 직전에
   authoritative Bead/artifact/lane precondition을 재검증한 뒤 core를 순차 호출해
   successful readback/tick과 partial result tests를 GREEN으로 닫는다.

Verification: `npx vitest run server/ws/worker-parallel-analysis.test.js
server/ws/mutation-handlers.test.js server/ws/worker-handlers.overlay.test.js && npm run tsc`

## Phase 4: Worker dialog, disposable workspace E2E, build and delivery

1. `app/views/worker/parallel-analysis-dialog.test.js`와
   `app/views/worker/index.test.js`에 idle/running/succeeded/failed/canceled, settings
   compatibility, cache hit/stale, grouped verdict/evidence, ordering cycle, live
   applicability, selection/partial failure UI RED tests를 먼저 추가한다.
2. `app/main.worker-parallel-analysis.test.js`에 singleton subscribe/reconnect/
   workspace-switch와 queue hot-path non-invocation RED tests를 추가한다. registered
   disposable workspace와 fake tool-free runner/fixture Beads adapter를 사용한 automated
   E2E도 먼저 세워 settings 저장, cache hit, forced reanalysis, cancel, dialog grouping,
   snapshot drift apply 거부, successful label readback이 구현 전 실패함을 확인한다.
3. RED를 확인한 뒤 `app/data/worker-parallel-analysis-store.js`,
   `app/views/worker/parallel-analysis-dialog.js`, `app/main.js`,
   `app/views/worker/index.js`, `app/styles.css`를 구현한다. singleton workspace
   subscription, control-bar button, model/effort settings, start/reanalysis/cancel/apply를
   연결하고 queue play/pause·place·reorder·auto-advance에는 analyzer 호출을 넣지 않는다.
   active/stale/closed/ineligible/unknown 항목을 비활성화해 UI와 disposable E2E를
   GREEN으로 닫는다.
4. frontend bundle/source map을 재생성하고 focused/full verification을 실행한다. 모든
   phase child evidence를 정리한 뒤 implementation gate와 PR delivery를 진행한다.
   merge 후에는 managed deploy receipt, merged release process path, listening port,
   basic HTTP response만 readback하며 수동 기능 확인을 잔여물로 남기지 않는다.

Verification: `npx vitest run app/views/worker/parallel-analysis-dialog.test.js
app/views/worker/index.test.js app/main.worker-parallel-analysis.test.js && npm run tsc &&
npm test && npm run lint && npm run prettier:write && npm run build && git diff --check`

## Test scope

| Seam | Phase | RED → GREEN | Exclusions |
| --- | --- | --- | --- |
| A — target snapshot | Phase 1 | runnable candidate+active root union과 exclusion/digest RED → canonical qualification 기반 stable snapshot | admission 완화, quick_fix 포함 |
| B — artifact bundle | Phase 1 | dirty/unsafe/secret/directory expansion RED → pinned blob, caps, omission, cleanup | repository archive, untracked file |
| C — settings/cache | Phase 2 | missing CAS/freshness/last-good RED → global settings와 per-workspace atomic cache | Bead metadata hint |
| D — read-only runner | Phase 2 | live repo/config read·session persistence·prompt injection 가능 RED → versioned prompt, stdin-only tool-free adapters, exact argv와 filesystem inventory 실측 | implementation runner 변경 |
| E — schema/evidence | Phase 1 | target omission/duplicate/unknown/fabricated evidence RED → exact-set once-only strict validator | free-form prose parser |
| F — job lifecycle | Phase 2 | duplicate/restart/failure cache loss RED → single-flight, cancel/timeout, orphan settlement | persistent LLM session |
| G — UI/apply | Phase 3–4 | client-only overlay TOCTOU와 적용 상태 부재 RED → server-bound revalidation, dialog/store, sequential writer/readback | auto remove/reorder/dependency write |
| H — disposable workspace E2E | Phase 4 | post-merge manual-only 기능 검증 RED → PR-local fake-runner settings/cache/cancel/dialog/apply automation | shared service·실제 provider 과금 call |

각 RED는 해당 phase의 implementation 전에 추가하고, 이미 green인 assertion이나
snapshot-only golden으로 대체하지 않는다. arbitrary `related`/`discovered-from` lineage
확장, external PR FIFO, separate serial lane, automatic `worker-serial` inference/writer,
parallel safety 보증은 이 계획의 test와 implementation 범위 밖이다.
