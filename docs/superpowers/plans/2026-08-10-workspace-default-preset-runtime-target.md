# UI-rg4b — 워크스페이스 기본 preset 참조와 구현 runtime UI 구현 계획

## Context

- 승인된 설계 `docs/superpowers/specs/2026-08-10-workspace-default-preset-runtime-target-design.md`를 `UI-rg4b`의 실행 권한으로 사용한다. 선행 canonical 계약 `dotfiles-tnw2`는 완료됐고, 이 저장소는 그 계약의 11-key consumer만 구현한다.
- 현재 서버는 `server/worker/exec-enums.js`와 `server/worker/policy.js`에서 10개 실행 키를 해석하고, `server/worker/queue-store.js`의 workspace `exec_defaults`를 dispatch 때 Bead metadata에 stamp/revert한다. `server/exec-preset-store.js`는 별도 파일 store이고 `server/ws/exec-preset-handlers.js`가 module-global 인스턴스를 소유한다.
- 상태 권한은 `WorkerRuntime`의 private `execPresetStore`와 public `execPresetCoordinator` façade로 합친다. coordinator가 preset CRUD/CAS, workspace reference CAS, all-durable reference scan, legacy migration, dispatch snapshot을 소유하고, WebSocket과 scheduler는 coordinator의 좁은 API만 사용한다. `exec-preset-store.js`는 queue를 import하지 않는 persistence primitive로 유지한다.
- normalized queue snapshot은 legacy 값이나 손상 여부를 판단하는 근거로 쓰지 않는다. 새 read-only `queue-state-discovery` seam이 `$XDG_STATE_HOME/bdui/*/queue.json`을 raw scan해 absent/unreadable/malformed를 구분하고, reference scan 완전성을 증명하지 못하면 delete를 fail closed한다.
- dispatch 해석은 `Bead metadata > selected workspace preset snapshot > harness fallback` 순서다. coordinator는 첫 상태 변경 전에 `{ preset_id, revision, settings }`를 한 번 clone/freeze하고, scheduler는 그 객체만으로 stamp와 Attempt provenance를 기록한다. resume/relaunch는 최신 preset을 다시 읽지 않고 prior Attempt snapshot을 그대로 상속한다.
- frontend의 semantic option model은 `app/views/detail-panel/exec-settings.js` 한 곳에 유지한다. workspace dialog는 per-key editor를 제거하고 preset selector만 제공하며, Bead detail의 preset apply는 11-key copy semantics를 유지한다. `impl_runtime`/`impl_model`/`impl_effort` manual edit는 한 mutation으로 저장한다.
- 실행 단계는 shared schema와 state transition이 강하게 결합되어 있으므로 병렬 write delegation을 하지 않는다. 각 `## Phase N`을 순차 execution child 하나로 실행하고 root controller가 전체 diff·통합 검증을 소유한다. 실제 implementation runtime/model/effort는 execution entry의 workflow selector가 한 번 확정하며 이 계획은 provider나 exact model을 새로 고정하지 않는다.
- Phase 완료 후 workflow의 implementation gate와 PR Delivery를 따른다. 머지 뒤에는 merged `main`에서 `npm run build`, `bdui-shared restart`, process path·listening port·HTTP response 검증까지 마쳐야 완료다.

## Phase 1: 11-key 계약과 runtime coherence 기반

1. `server/worker/exec-enums.js`와 focused tests를 RED부터 확장한다.
   - `impl_runtime`을 계약 순서의 9번째 키로 넣어 canonical 11-key set을 완성하고 `inherit|claude|codex` enum을 노출한다.
   - runner catalog에서 model provider와 legal effort를 찾는 pure helper, known model-only legacy inference, runtime/model/effort coherence validator를 추가한다.
   - unknown model은 보존 가능한 legacy 값과 active write incompatibility를 구분하고, active exact model writer는 matching runtime을 요구한다.
2. `server/worker/policy.js`와 `server/worker/attach.js`의 `BeadSnapshot`을 11-key contract로 바꾼다.
   - `impl_runtime` absence는 known `impl_model` provider를 read-only inference하고, explicit `inherit`은 lower provider layer를 막는다.
   - preset/default layer의 missing key만 fallback으로 내려가며 provider mismatch·unknown exact model·illegal effort는 dispatch 전 오류로 돌려 silent demotion을 막는다.
   - `stamped_keys` fixed order와 Bead-set key 비덮어쓰기 규칙을 11개로 잠근다.
3. `server/exec-preset-store.js`, `server/ws/mutation-handlers.js`, `server/ws/exec-preset-handlers.js`가 같은 server-side coherence helper를 소비하도록 validation 경계를 정리한다. load는 catalog에서 사라진 문자열을 `(비호환)` 표시에 쓸 수 있게 보존하고, create/update/apply/atomic edit는 incompatible 조합을 저장하거나 실행하지 않는다.
4. `server/worker/exec-enums.test.js`, `server/worker/policy.test.js`, `server/ws/exec-settings-mutation.test.js`에 canonical order, runtime inference, explicit inherit, provider mismatch, auto/ exact effort, 11-key stamp order를 각각 독립 테스트로 고정한다.

검증: `npx vitest run server/worker/exec-enums.test.js server/worker/policy.test.js server/ws/exec-settings-mutation.test.js && npm run tsc`

## Phase 2: preset authority, workspace reference, 안전 migration

1. `server/worker/queue-state-discovery.js`와 `server/worker/exec-preset-coordinator.js`를 추가하고 `server/worker/runtime.js`가 shared coordinator를 소유하게 한다.
   - raw scanner는 모든 durable `queue.json`의 `exec_defaults`와 `default_exec_preset_id`를 normalization 전에 읽고, 안정적인 state slug와 가능한 workspace display name을 함께 반환한다.
   - coordinator 밖에서는 preset/reference mutation과 delete reference 판정을 수행하지 못하게 하며, WebSocket·attachment·scheduler에는 필요한 narrow method만 주입한다.
2. `server/exec-preset-store.js` schema를 11-key와 `origin`으로 확장한다.
   - 기존 preset은 `{ kind: 'user' }`로 정규화하고 known model-only preset은 matching `impl_runtime`을 one-time 보강한다.
   - migration preset은 `{ kind: 'workspace-exec-defaults', workspace_key, source_digest }`로 create/reuse하며 name collision을 안정적인 workspace suffix로 해결한다.
   - snapshot은 compatibility와 reference count/display summary를 제공하되 migration pending preset은 selector/edit/delete 목록에서 숨긴다. delete는 모든 durable queue scan이 완전하며 reference가 0일 때만 적용한다.
3. `server/worker/queue-store.js`를 `default_exec_preset_id: string|null` authority로 전환한다.
   - queue revision CAS로 set/unset하고 preset settings/revision 사본은 저장하지 않는다.
   - old `exec_defaults`는 coordinator migration이 완료할 때까지 raw legacy input으로 보존하되 active per-key mutation에서는 제거한다.
   - migration은 `preset persist → preset readback → queue reference persist → queue readback → legacy clear → queue readback`을 workspace별 직렬화하고, 어느 단계든 실패하면 원본을 남겨 다음 startup이 같은 origin/digest preset으로 재개한다.
4. `server/index.js`, `server/worker/attach.js`, `server/ws/worker-handlers.js`, `server/ws/exec-preset-handlers.js`, `server/ws/connection.js`, `app/protocol.js`에 startup barrier와 protocol을 연결한다.
   - migration outcome이 확정되기 전 actionable selector/dispatch를 열지 않고, pending legacy workspace는 reference 우선·legacy compatibility read로 값을 두 번 적용하지 않는다.
   - `worker-queue-set-default-exec-preset`은 queue revision과 preset revision을 함께 받고 stale이면 authoritative queue+preset snapshots를 반환하며 자동 retry하지 않는다.
   - preset update는 참조 workspace 영향 정보를 fanout하고, missing/incompatible selector·reference-scan 불완전 상태는 명시적 reason으로 fail closed한다.
5. store/coordinator/WS tests를 RED→GREEN으로 구현해 정상 migration, 각 persist/readback 실패 지점, restart idempotency, unreadable queue delete 차단, referenced delete 차단, selector dual-CAS conflict, active old mutation 제거를 고정한다.

검증: `npx vitest run server/exec-preset-store.test.js server/worker/queue-store.test.js server/worker/exec-preset-coordinator.test.js server/ws.exec-presets.test.js server/ws.worker-queue.test.js && npm run tsc`

## Phase 3: immutable dispatch resolution과 Attempt provenance

1. `server/worker/scheduler.js`의 normal dispatch와 external-conflict dispatch가 coordinator의 `resolveForDispatch(workspace, bead_snapshot)` 결과를 첫 상태 변경 전에 한 번만 받게 한다.
   - selected ID missing은 `default_exec_preset_missing`, incompatibility는 `default_exec_preset_incompatible`로 worktree 생성·metadata write·runner launch 전에 거부한다.
   - Bead override를 제외한 preset present key만 stamp하고, preset missing key는 harness fallback으로 내려가되 stamp하지 않는다.
2. `server/worker/queue-store.js`의 `Attempt`에 `exec_default_preset_id`, `exec_default_preset_revision`, 11-key `exec_values` snapshot을 추가한다.
   - `exec_stamped_keys`는 실제 worker-written metadata subset만 담고, `exec_values`는 outer launch와 inner workflow에 전달한 resolved values를 담는다.
   - Attempt pre-record는 첫 metadata stamp보다 먼저 durable하게 쓰며, stamp/readback 실패는 기존 부분 성공 cleanup과 동일하게 정확한 subset만 revert한다.
3. pause/resume, failed-attempt relaunch, external conflict, restart reconcile 경로가 prior Attempt의 preset ID/revision/values/stamped keys를 그대로 상속하게 한다. preset이 그 사이 수정·삭제되어도 같은 Attempt lineage는 pinned snapshot으로 끝내고 다음 fresh dispatch부터 최신 revision을 사용한다.
4. `server/worker/scheduler.test.js`, `server/worker/queue-store.test.js`, queue snapshot tests에 Bead>preset>fallback precedence, immutable revision, next-Attempt live update, missing/incompatible no-launch, 11-key stamp/revert, provenance round-trip, resume inheritance를 RED→GREEN으로 추가한다.

검증: `npx vitest run server/worker/scheduler.test.js server/worker/queue-store.test.js server/ws.worker-queue.test.js && npm run tsc`

## Phase 4: workspace selector와 runtime-aware Bead UI

1. `app/data/exec-preset-store.js`, `app/main.js`, `app/views/monitor/index.js`, `app/views/monitor/lanes.js`가 origin/reference/compatibility 필드와 workspace `default_exec_preset_id`를 잃지 않고 전달하게 한다. global preset subscription은 workspace 전환과 무관하게 유지하고 queue snapshot의 workspace guard는 그대로 둔다.
2. `app/views/detail-panel/exec-settings.js`를 11-key shared option model로 확장한다.
   - `impl_runtime=claude|codex`는 matching provider model만, `inherit`은 effective orchestration provider model만 표시한다.
   - preset 자체에서 `inherit`이면서 orchestration provider를 알 수 없으면 exact model을 비활성화하고 auto만 허용한다.
   - runtime 변경으로 incompatible해진 model/effort는 local draft에서 함께 auto로 reset하고, unknown stored 값은 `(비호환)`으로 보존한다.
3. `app/views/worker/exec-defaults-dialog.js`의 workspace per-key editor를 `[없음 — harness 기본값] + global preset` selector와 selected 11-key summary로 교체한다.
   - queue+preset dual-CAS conflict에서는 두 authoritative snapshots를 채택하되 사용자 selection/draft를 유지하고 자동 retry하지 않는다.
   - preset card/editor는 `n/11`, reference count, update impact, referenced delete block, incompatible 상태를 표시하고 migration pending preset 자체는 노출하지 않는다.
4. Bead detail과 server mutation을 원자화한다.
   - `server/ws/mutation-handlers.js`와 protocol에 implementation target 전용 atomic mutation을 추가해 runtime/model/effort 세 key를 하나의 `bd update` set/unset + `bd show --json` readback으로 처리한다.
   - `app/views/detail-panel/index.js`는 linked controls를 한 optimistic group으로 다루고, preset apply는 11-key exact copy 후 11개 local override만 제거하며 `workflow_mode`는 보존한다.
   - default label은 selected workspace preset name/value를 source로 명시하고 missing/incompatible reference를 fail-quiet하게 표시하되 저장·dispatch 가능하다고 오인시키지 않는다.
5. `app/views/detail-panel/session-history.js`와 detail Attempt mapping에 outer preset ID/revision/resolved values를 audit 정보로 추가한다. outer Attempt snapshot과 notes/transcript의 inner workflow execution receipt를 다른 label로 표시하고, outer `impl_model`만으로 실제 child provider/model을 추정하지 않는다. 필요한 최소 CSS를 `app/styles.css`/`app/styles/base.css`에 추가한다.

검증: `npx vitest run app/data/exec-preset-store.test.js app/main.exec-presets.test.js app/views/detail-panel/exec-settings.test.js app/views/detail-panel/index.test.js app/views/detail-panel/session-history.test.js app/views/worker/exec-defaults-dialog.test.js app/views/worker/index.test.js server/ws/exec-preset-apply.test.js server/ws/exec-settings-mutation.test.js && npm run tsc`

## Phase 5: 통합 회귀, bundle, 전달 준비

1. cross-workspace integration tests에서 한 preset을 두 workspace가 참조하고, preset update가 queue revision bump 없이 다음 fresh dispatch에 반영되며 active Attempt는 pinned revision을 유지하는지 검증한다.
2. legacy fixtures로 model-only preset, per-workspace `exec_defaults`, name collision, preset persist 뒤 queue write 실패, queue reference 뒤 legacy clear 실패, unreadable durable queue를 각각 재시작해 값 손실·중복 preset·unsafe delete가 없는지 확인한다.
3. review controls, `workflow_mode`, orchestration runner selection, global preset CRUD, Bead copy apply, Monitor/Worker shared store, session resume가 회귀하지 않는지 전체 suite로 확인하고 `npm run build`로 `app/main.bundle.js`와 `app/main.bundle.js.map`을 갱신한다.
4. formatter가 만든 기계적 변화와 generated bundle을 포함해 `git status`, 전체 `git diff`, `git diff --check`를 root controller가 검토하고 implementation gate에 전달할 단일 integrated diff와 verification evidence를 확정한다.

검증: `npm run tsc && npm test && npm run lint && npm run prettier:write && npm run build && git diff --check`

## Test scope

| Phase | RED → GREEN seam | 관찰 가능한 동작 |
| --- | --- | --- |
| Phase 1 | 11-key contract consumer | canonical order, `impl_runtime` enum, model-only inference, explicit inherit, runtime/model/effort coherence, Bead>preset>fallback, fixed stamp order |
| Phase 2 | preset store와 reference integrity | origin normalization, 10→11 migration, revision CAS, reference summary, referenced/unreadable delete fail-closed |
| Phase 2 | workspace reference와 legacy coordinator | ID-only queue state, dual CAS, ordered persist/readback/clear, 모든 중간 실패의 원본 보존과 restart idempotency |
| Phase 3 | dispatch/Attempt | immutable preset snapshot, missing/incompatible no-launch, 11-key stamp/revert, ID/revision/values round-trip, resume inheritance |
| Phase 4 | workspace dialog | per-key editor 제거, selector/none, selected summary, reference impact/delete block, stale pair에서 draft/selection 보존 |
| Phase 4 | runtime/model controls | Claude/Codex/inherit narrowing, auto/exact effort, incompatible reset, exact model+runtime atomic save |
| Phase 4 | Bead apply와 Attempt audit | 11-key one-command set/unset, readback/refresh 1회, copy semantics, outer preset snapshot과 inner execution receipt 구분 |
| Phase 5 | bundle/regression | existing review/workflow/runner/preset/session behavior 유지와 static bundle 반영 |

RED→GREEN에서 제외하는 작업은 generated `app/main.bundle.js`/`.map`, 순수 CSS 배치, formatter-only 변화, merged shared service restart다. 이들은 build 결과, visual DOM assertions, post-merge process path·port·HTTP smoke로 검증한다.

범위 밖으로 유지할 것은 Bead-preset live link, phase별 implementation provider, outer Worker runner 선택 변경, provider fallback, workspace partial override layer, preset import/export/reorder/ACL, `workflow_mode` preset 포함이다.
