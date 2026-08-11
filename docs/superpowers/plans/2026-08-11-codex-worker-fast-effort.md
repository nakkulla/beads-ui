# UI-03bc: Codex Worker Fast·max·ultra 실행 계획

## Context

승인된 spec은 `docs/superpowers/specs/2026-08-11-codex-worker-fast-effort-design.md` @ `fcf321d6f03b54cfce7db0565ab93f72ead90d26`이고, canonical provider 계약은 dotfiles merge `2885bc9b2fa6b043e1df6d4bb17268e28d9938ae`로 설치까지 끝났다. 이 계획은 beads-ui Worker의 outer launch tuple에만 `orchestration_speed=default|fast`와 모델별 outer effort capability를 추가한다. `impl_effort`, review effort, `workflow_mode=fast_track`, global Codex defaults는 변경하지 않는다.

계획 작성 시 `CODEX_SILENT=1 codex debug models --bundled`를 다시 확인한 결과 Sol/Terra는 `low..ultra`, Luna는 `low..max`, 세 모델 모두 `additional_speed_tiers=[fast]`와 Fast service tier를 광고했다. Phase 1 실행 entry에서 같은 read-only probe를 다시 수행하고 mismatch면 builtin 값을 추측하지 않고 멈춘다.

현재 데이터 흐름은 `runner-catalog.js` → `exec-enums.js`/`policy.js` → Bead/default/preset snapshot → `queue-store.js` Attempt/`exec_values` → `scheduler.js` launch/relaunch → runner adapter와 shared UI다. 새 speed는 이 단일 흐름을 관통하며, legacy Attempt에 speed가 없으면 `default`로 해석한다. 명시적 unknown model, model-specific illegal effort, unsupported speed는 lower precedence나 Claude로 강등하지 않고 spawn 전에 실패한다.

이 Bead는 merged-checkout build 및 process/port/HTTP와 Standard/Fast live smoke가 자동 `[deploy]`로 운반되지 않아 `worker-ineligible`이다. 구현 세션은 PR Delivery에서 멈추고, post-merge live work는 아래 별도 `pr-finish` continuation이 소유한다. Parent는 계획 작성 동안 `open`·unclaimed이고 phase child도 만들지 않는다.

## Phase 1: Catalog capability와 fail-closed 설정 해석

1. 실행 entry에서 bundled Codex catalog를 read-only로 재검증한다. `server/worker/runner-catalog.test.js`에 builtin Sol/Terra/Luna outer effort·speed matrix, `orchestration_efforts`→`efforts` fallback, speed→`['default']` fallback, deep-copy, config override RED를 먼저 추가한다. Unknown speed, `default` 누락, Claude `fast`, malformed array는 해당 필드만 무시하고 다른 builtin/override를 보존해야 한다.
2. `server/worker/runner-catalog.js`의 model/runner schema와 copy/merge validation을 확장하고 `modelOrchestrationEfforts`, `catalogOrchestrationEfforts`, `modelSpeedTiers`, `catalogSpeedTiers`를 추가한다. 기존 `modelEfforts`·`catalogEfforts`는 implementation 의미를 그대로 유지한다.
3. `server/worker/exec-enums.test.js`, `server/worker/policy.test.js`, `server/worker/attach.test.js`에 12-key 순서, outer/impl union 분리, Standard fallback, stale unknown model, Luna+ultra, Claude+fast, raw speed snapshot RED를 추가한다. Review effort와 impl target assertion은 characterization으로 유지한다.
4. `server/worker/exec-enums.js`, `server/worker/policy.js`, `server/worker/attach.js`를 구현한다. Model을 먼저 확정하고 상위 precedence의 명시적 outer model/effort/speed는 invalid여도 lower layer로 내려가지 않게 한다. Invalid reason 순서는 `invalid_orchestration_model` → `illegal_orchestration_effort` → `illegal_orchestration_speed` → 기존 impl validation으로 고정한다.

검증: `npx vitest run server/worker/runner-catalog.test.js server/worker/exec-enums.test.js server/worker/policy.test.js server/worker/attach.test.js`와 `npm run tsc`.

## Phase 2: Durable attempt tuple과 모든 launch 경로

1. `server/worker/queue-store.test.js`, `server/worker/exec-preset-coordinator.test.js`, `server/ws/exec-preset-apply.test.js`에 speed의 default/preset/apply/cold-reload, 12-key immutable `exec_values`, Attempt top-level round-trip, stale incompatible preset, legacy missing speed RED를 추가한다. `EXEC_SETTING_KEYS` 기반 generic persistence를 확장하되 현재 impl/review vocabulary는 보존한다.
2. `server/worker/runner/codex.test.js`와 Claude adapter focused test에 explicit Standard/Fast argv, unknown speed 거부, resume 회귀, Claude default-only RED를 추가한다. `server/worker/runner/codex.js`는 매 launch에 정확히 하나의 `-c service_tier="default|fast"`를 넣고 `priority`/`features.fast_mode`를 저장하거나 전달하지 않는다. Claude는 speed argv를 만들지 않는다.
3. `server/worker/scheduler.test.js`에 normal dispatch, cleanup fresh resolve, external conflict prior tuple, resume/conflict/disposition 및 completion-repair relaunch의 speed capture RED를 추가한다. Workspace/preset에서 온 speed가 `exec_stamped_keys`에 기록되고 Bead metadata에 stamp된 뒤 cleanup에서 unset되는 global-only stamp/revert RED도 포함한다. `queue-store.js` Attempt `{runner,model,effort,speed}`, scheduler의 pre-recorded 12-key `exec_values`, `launchSession` settings, 모든 fresh/prior 분기를 구현한다. Prior lineage는 current Bead/default를 재해석하지 않고 speed를 verbatim 상속하며 legacy missing speed만 `default`로 해석한다.
4. `server/worker/notify.js`와 focused tests에 attempt-start runtime tuple의 speed를 추가한다. Adapter 도달 전 tuple validation을 유지하고 usage의 `service_tier`는 저장하지 않는다. 이 spec과 무관한 `BDUI_ATTEMPT_ID`, duplicate attempt settlement, runner registry 재설계는 건드리지 않는다.

검증: `npx vitest run server/worker/queue-store.test.js server/worker/exec-preset-coordinator.test.js server/ws/exec-preset-apply.test.js server/worker/runner/codex.test.js server/worker/runner/claude.test.js server/worker/scheduler.test.js server/worker/notify.test.js`와 `npm run tsc`.

## Phase 3: Shared UI, protocol, catalog snapshot

1. `server/ws/worker-handlers.runner-catalog.test.js`, `server/ws/monitor-handlers.test.js`, `app/views/monitor/lanes.test.js`에 resolved catalog의 nested `orchestration_efforts`·`speed_tiers` JSON 보존 RED를 추가한다. Worker/Monitor는 같은 runtime catalog를 pass-through하고 별도 speed schema를 만들지 않는다.
2. `app/views/detail-panel/exec-settings.test.js`, `app/views/detail-panel/index.test.js`, `app/views/worker/exec-defaults-dialog.test.js`에 Sol outer ultra/impl non-ultra, Luna non-ultra, Claude Standard-only, Codex Standard/Fast, stale `(비호환)`, 비용 도움말, `1/12` 및 12-key apply RED를 추가한다.
3. 공용 `execSettingRows()`와 detail/default/preset consumers를 구현한다. `orchestration_speed` 행은 effort 바로 뒤에 놓고 label은 `Standard|Fast`, fallback은 `(기본: Standard)`로 한다. Outer effort는 `orchestration_efforts`, impl effort는 기존 `efforts`를 사용한다. Protocol/JSDoc/count 문구를 11→12로 갱신하고 speed를 atomic impl-target API에 섞지 않는다.
4. Frontend source 변경이 끝난 뒤 `npm run build`로 `app/main.bundle.js`와 `.map`을 생성한다. Generated bundle은 직접 편집하지 않고 source diff와 함께 검토한다.

검증: `npx vitest run server/ws/worker-handlers.runner-catalog.test.js server/ws/monitor-handlers.test.js app/views/monitor/lanes.test.js app/views/detail-panel/exec-settings.test.js app/views/detail-panel/index.test.js app/views/worker/exec-defaults-dialog.test.js`와 `npm run lint`, `npm run tsc`, `npm run build`.

## Phase 4: 통합 검증, implementation gate, PR Delivery

1. 모든 phase commit을 통합한 뒤 `npm run prettier:write`, `npm run tsc`, `npm test`, `npm run lint`, `npm run build`를 실행한다. Formatting/build 후 owned diff와 generated bundle/map만 남는지 root가 전체 `git status`와 `git diff`를 검토하고, 변경 범위와 관련 없는 failure는 pinned base에서 동일 재현할 때만 baseline으로 분류한다.
2. 최신 base를 fetch하고 안전하게 동기화한 뒤 focused/full verification을 다시 확인한다. Integrated final diff와 green evidence를 대상으로 implementation gate를 한 번 실행하고, REVISE면 finding을 한 batch로 고친 뒤 controller self-review와 영향 범위 verification으로 receipt를 갱신한다.
3. 각 phase child에 commit·verification·execution receipt를 기록하고 모두 `resolved`로 만든다. Parent는 아직 `in_progress`로 유지하고 completion report나 PR metadata를 미리 쓰지 않는다.
4. `origin`의 writable fork를 base `main`으로 PR을 만든다. 실제 URL과 pinned head를 확인한 뒤 completion report를 기록하고, 같은 closing bundle에서 `pr_url`과 gate receipt를 readback하며 parent를 `resolved`로 전환한다. Worker-ineligible 이유와 post-merge cursor를 보고하고 PR Delivery에서 멈춘다. Parent를 close하거나 worktree/branch를 제거하거나 shared service를 재시작하지 않는다.

검증: `npm run all`, `npm run build`, `git diff --check`, clean tracked build readback, PR head/base와 completion report·`pr_url`·`impl_review`·parent `resolved` readback.

## Post-merge continuation (`pr-finish`, phase child 아님)

1. 명시적 `pr-finish`가 pinned PR을 merge하고 merge SHA의 `main` 포함과 base sync를 확인한다.
2. merged checkout에서 `npm run build`와 `npm run all`을 실행하고 bundle/map 포함 worktree가 clean인지 확인한다.
3. 선언된 `bdui-shared restart`를 실행한 뒤 실제 process가 merged checkout을 가리키는지, listening port와 HTTP 응답이 정상인지 확인한다.
4. 격리된 임시 cwd와 bounded trivial prompt로 Standard/Fast Codex launch를 각각 한 번 실행해 effective `service_tier` argv와 정상 종료를 확인한다. 실패 시 fallback하지 않고 parent를 `resolved`로 남긴다.
5. 모든 live 검증이 green일 때 phase children을 leaves-first로 close하고 `worker-ineligible`을 제거한 뒤 parent를 마지막에 close한다. 중단된 `pr-finish`는 merged PR·durable Bead 상태에서 마지막 미확인 단계부터 재개한다.

## Test scope

RED→GREEN seam과 phase 매핑:

- Phase 1 / Catalog: 새 fields·helpers·builtin matrix·override validation은 현재 schema에 없어 RED다. 기존 implementation `efforts`와 review vocabulary assertion은 GREEN characterization이며 확장하지 않는다.
- Phase 1 / Enum-policy: 12번째 key와 speed/outer union은 없고, current policy는 stale unknown model·invalid explicit effort를 lower layer 또는 `opus`로 강등하므로 fail-closed RED가 성립한다.
- Phase 1 / Bead snapshot: raw `orchestration_speed`가 `snapshotBead`에 없어 RED다.
- Phase 2 / Persistence: defaults/preset/Attempt/12-key `exec_values`가 speed를 저장하지 않아 RED다. Workspace/preset speed의 `exec_stamped_keys` stamp→cleanup unset도 현재 key가 없어 RED이며, legacy missing speed는 current Fast를 상속하지 않는 regression case다.
- Phase 2 / Scheduler: launch settings와 prior relaunch tuple에 speed가 없어 모든 named path capture가 RED다.
- Phase 2 / Adapter: Codex argv에 explicit Standard/Fast `service_tier`가 없고 unknown speed guard가 없어 RED다. Claude no-speed는 characterization과 default-only guard로 남긴다.
- Phase 3 / UI: speed row, outer effort 분리, 12-count, help/incompatible state가 없어 RED다.
- Phase 3 / Snapshot: catalog copy/serialization이 새 nested fields를 보존하지 않아 RED다.
- Phase 4 / Runtime: pre-change adapter는 explicit service tier를 생성하지 않으므로 Phase 2 argv test가 RED 증거다. Live merged-service checks는 unit RED를 가장하지 않고 post-merge acceptance evidence로 기록한다.

명시적 제외: `impl_effort=ultra`, review effort `max|ultra`, implementation/review speed, `implement-codex`, bridge/spawn schema, Ductor·Thalamus, global Codex defaults, `workflow_mode=fast_track`, usage service-tier receipt, app-server 전환, unrelated attempt-settlement work.
