# bd JSON v1/v2 호환성 구현 계획

## Context

- owning Bead는 `UI-jl9v`이고 route는 `full_plan`이다. 승인된 spec은 `docs/superpowers/specs/2026-08-12-bd-json-compatibility-design.md`@`d51bc4762547e01ab10acefe1bfd66fff6af6551`, post-fix spec review receipt는 `self@d51bc4762547e01ab10acefe1bfd66fff6af6551`이다. plan path는 `docs/superpowers/plans/2026-08-12-bd-json-compatibility.md`로 이미 pin되어 있다.
- authoring 기준 `main`과 `origin/main`은 `d51bc4762547e01ab10acefe1bfd66fff6af6551`에서 일치한다. 실행 세션은 saved plan이 dispatch base에 reachable한지 다시 확인한 뒤 parent를 claim하고 `.worktrees/UI-jl9v`와 phase child를 만든다. 이 authoring 세션에서는 parent claim, phase child, implementation edit를 하지 않는다.
- 현재 `server/bd.js`의 `runBdJson()`은 JSON syntax parse만 하고 invalid JSON도 `code=0`으로 남길 수 있다. list/detail/Worker/WS caller는 bare object·array·single-item array를 서로 다르게 해석해 schema v2 envelope를 empty, negative cache, raw success 또는 unreadable payload로 만든다.
- 최종 경계는 순수 `server/bd-json.js`의 transport normalizer와 typed command projection, runner-neutral `server/bd-capability.js`의 workspace-scoped probe/observation store, `server/bd.js`의 discriminated result다. producer observation과 consumer-supported format은 분리하고 semantic version floor는 두지 않는다.
- capability probe는 canonical workspace에서 subprocess env를 복제한다. default leg는 `BD_JSON_ENVELOPE`를 삭제하고 opt-in leg는 `BD_JSON_ENVELOPE=1`을 설정한 뒤, 각 leg에서 `bd version --json`과 read-only `bd list --json --tree=false --limit 1`을 2초 timeout으로 실행한다. global env, operator config, live DB metadata를 mutate하지 않는다.
- protocol failure observation은 `{workspace_key, command_family}`로 격리한다. `/healthz`는 모든 active failure를 operator-facing aggregate로 보고하지만 mutation과 Worker effect gate는 자기 workspace key만 사용한다. raw issue/comment payload, path, database name과 credential-bearing env는 diagnostics에 넣지 않는다.
- 모든 변경은 이 저장소의 한 PR에 포함한다. dotfiles workflow 계약, upstream bd, `UI-k066` report grammar, frontend health UI는 건드리지 않는다. Phase는 spec의 세 phase를 유지해 순차 실행하고, 한 phase/worktree에 writable implementation leaf는 하나만 둔다. 구현 runtime/model/effort는 실행 entry의 workflow selector가 한 번 결정하며 이 plan은 provider를 새로 pin하지 않는다.
- 실제 central-server smoke는 temp root·HOME/XDG/config/runtime·Git workspace·Dolt data dir·Unix socket만 사용한다. 현재 repo `.beads`, shared port `13307`, operator config와 running shared service는 읽기 fallback이나 mutation 대상으로 삼지 않는다.

## Phase 1: Protocol Adapter, result contract, capability state

1. `server/bd.test.js`에 먼저 behavioral RED를 추가하고 새 `server/bd-json.test.js`, `server/__fixtures__/bd-json/` golden fixtures를 만든다.
   - fake spawn의 bare array/object, legacy one-item show array, schema v2 envelope가 같은 inner payload로 귀결되는 expectation을 둔다.
   - own `data`가 있는 malformed envelope, unknown schema, scalar/null, invalid JSON, nonzero exit를 각각 stable failure로 고정한다.
   - 현재 코드에서 envelope가 outer object로 남고 invalid JSON이 top-level `code=0`인 이유로 실패해야 하며, module missing이나 skip은 RED evidence로 인정하지 않는다.
2. 새 `server/bd-json.js`에 input을 mutate하지 않는 transport와 projection 계층을 구현한다.
   - `normalizeBdJsonTransport()`는 own `data` object만 envelope 후보로 보고 integer `schema_version===2`를 요구하며, bare object의 embedded schema marker는 보존한다.
   - issue, issue-list, ready rows, ready-explain, dependency rows, comments, version capability projector는 container와 최소 identity만 검증하고 additive field를 보존한다.
   - failure는 `bd_exit_error`, `bd_json_invalid`, `bd_json_envelope_invalid`, `bd_json_schema_unsupported`, `bd_json_shape_invalid`와 bounded structural detail만 반환한다.
3. `server/bd.js`의 JSON 경계를 discriminated `{ok:true,data,protocol}` / `{ok:false,error}` result로 전환한다.
   - bd queue, `--sandbox`, `BEADS_DB` resolution, spawn error와 stderr tail 경계는 유지한다.
   - Phase 1 동안 기존 caller를 깨뜨리지 않기 위해 success의 normalized data를 `stdoutJson`, process status를 numeric `code`에도 넣는 additive compatibility field를 임시로 유지한다. invalid JSON은 compatibility caller도 성공으로 오인하지 않게 nonzero-equivalent field를 준다.
   - 이 bridge는 Phase 2의 마지막 task에서 완전히 제거하며 saved final API나 ownership allowlist에 남기지 않는다.
4. 새 `server/bd-capability.js`와 `server/bd-capability.test.js`에 runner-neutral state primitive를 만든다.
   - realpath를 푼 `root_dir`과 `resolveWorkspaceDatabase()`의 normalized path 또는 검증된 `db_path`를 process-local digest로 만들고 외부에 노출하지 않는다.
   - global dual-version cache와 workspace dual-list cache는 single-flight, success TTL 60초, failure TTL 5초, 최대 128 workspace다.
   - active protocol failure는 same-workspace/same-family success 또는 explicit workspace pruning만 지우며 eviction하지 않는다. 한도 초과는 `bd_observation_store_overflow`, identity 실패는 `bd_workspace_identity_unresolved`로 fail-closed한다.

**Phase verification:** `npx vitest run server/bd.test.js server/bd-json.test.js server/bd-capability.test.js server/spec-id.test.js && npm run tsc`를 통과시키고, Phase 1 commit의 diff에서 compatibility field가 임시임을 명시한다.

## Phase 2: Production consumer migration와 capability health

1. Board/detail과 Worker read consumer를 transport result + typed projector 경계로 옮긴다.
   - `server/list-adapters.js`의 list/show, blocked stored/explain, ready와 provenance를 command family별 projector로 나눈다. ordinary optional dependency CLI failure와 protocol failure를 분리하고, protocol failure는 empty Board로 바꾸지 않는다.
   - `server/worker/attach.js`, `server/worker/bd-metadata.js`, `server/worker/runnable-cache.js`, `server/worker/title-cache.js`, `server/worker/revise-parked.js`의 show/list/ready/find/children/scan을 같은 경계로 옮긴다.
   - cache는 protocol failure를 negative/empty entry로 저장하지 않고, admission·repair·cleanup readback은 기존 fail-closed 의미를 유지한다. NUL-containing `revise-parked.js` inventory는 `rg --text`로 검증한다.
2. WS mutation, exec preset, comments readback을 exact typed result로 바꾼다.
   - `server/ws/context.js`가 connection workspace identity와 command family를 runner 결과에 결합하고, `server/ws/mutation-handlers.js`와 `server/ws/exec-preset-handlers.js`의 모든 show readback은 expected id가 맞는 single issue만 success로 보낸다.
   - write exit 0 뒤 readback 실패는 underlying bounded reason을 포함한 `bd_readback_failed`, `phase=readback`, `write_applied=true`, `retry_safe=false`로 반환한다. raw envelope, `undefined`, scalar와 comments object를 success로 보내지 않는다.
   - comments read/add readback은 array projector를 사용하고, label/dep/status/text/priority/assignee/workflow metadata mutation의 기존 client payload shape는 normalized issue로 유지한다.
3. dual-mode probe, scoped observation과 effect preflight를 runtime에 연결한다.
   - `server/health.js`는 process env 전체 clone에서 default leg의 envelope env를 삭제하고 opt-in leg에만 `1`을 설정한다. 두 leg의 version은 일치해야 하고 version/list result가 모두 typed projector를 통과해야 한다.
   - `server/app.js`와 `server/healthz.test.js`는 `checks.bd` boolean, db/worker/runtime fields를 유지하면서 producer observations, producer capabilities, consumer-supported formats, primary workspace probe와 bounded active failure summary를 `diagnostics.bd`에 additive로 낸다.
   - projection boundary의 protocol failure/success를 same workspace/family store에 기록한다. `/healthz` aggregate red는 다른 healthy workspace effect를 막지 않고, `requireBdJsonCapability({workspace,command_family})`만 mutation과 Worker effect authority가 된다.
   - WS write 전에 preflight하고, Worker는 scheduler dispatch/worktree effect와 PR cleanup 진입 전에 preflight한다. `bd-metadata`의 write/create/status helper도 같은 gate를 사용해 우회 writer를 막는다. read-only command는 diagnostics를 만들 수 있으나 failure를 empty/success로 바꾸지 않는다.
4. 모든 production caller가 migrated된 뒤 Phase 1 compatibility field, `unwrapShowJson()`과 ad-hoc first-row/object fallback을 제거한다.
   - final `runBdJson()`은 discriminated result만 반환하고 injected runner test double도 그 contract를 사용한다.
   - 새 `server/bd-json-ownership.test.js`는 `rg --text` 기반 exact production allowlist로 raw `stdoutJson`, raw parsed payload access, direct bd JSON `JSON.parse`, retired unwrap과 matrix 없는 새 caller를 차단한다.
   - current `resolved` status compatibility 예외와 ordinary optional provenance failure만 consumer-owned fail-quiet로 남기고 schema/shape failure는 allowlist 예외로 만들지 않는다.

**Phase verification:** `npx vitest run server/bd.test.js server/bd-json.test.js server/bd-capability.test.js server/list-adapters.test.js server/worker/attach.test.js server/worker/bd-metadata.test.js server/worker/runnable-cache.test.js server/worker/title-cache.test.js server/worker/revise-parked.test.js server/ws.mutations.test.js server/ws.comments.test.js server/ws.labels.test.js server/ws/exec-preset-apply.test.js server/healthz.test.js server/bd-json-ownership.test.js && npm run tsc`를 통과시키고 `rg --text`로 temporary compatibility symbol과 retired unwrap이 0건인지 확인한다.

## Phase 3: Disposable central smoke, managed deploy evidence, delivery

1. 새 `scripts/bd-json-smoke.js`, `scripts/bd-json-smoke.test.js`와 `package.json`의 `smoke:bd-json` command를 RED→GREEN으로 구현한다.
   - Node `mkdtemp` 아래에 temp HOME/XDG/config/runtime, Git workspace, Dolt data dir와 고유 Unix socket을 만들고 inherited DB/server/envelope override를 제거한다.
   - resolved `dolt`를 `sql-server --data-dir <temp> --socket <temp> --port=-1`로 spawn하고 exact child PID와 `net.createConnection(socket)`으로 bounded readiness를 확인한 뒤에만 temp cwd에서 `bd init --server --external --server-socket <socket> --non-interactive --skip-agents --skip-hooks`를 한 번 실행한다.
   - disposable issue/comment를 만든 뒤 default와 opt-in의 list/show/comments, Board adapter, Worker metadata와 `/healthz` result를 비교한다. first RED는 current adapter의 default/envelope Board count 불일치여야 하며 executable/env skip은 허용하지 않는다.
   - `finally`는 exact child만 TERM 후 bounded KILL하고 exact temp root만 제거한다. 시작/종료 repository HEAD와 porcelain snapshot이 같지 않거나 cwd/socket/temp ownership preflight가 실패하면 live fallback 없이 실패한다.
2. `docs/bd-json-compatibility.md`에 command family, production consumer, accepted transport/payload, projector와 failure policy matrix를 게시한다.
   - static ownership allowlist와 문서 matrix가 list/show/ready/ready-explain/dep/comments/version/create-readback family를 모두 열거하도록 test로 고정한다.
   - native `issue.spec_id`, metadata fallback, equal/conflicting dual semantics가 envelope 유무와 무관하게 `server/spec-id.js`에 계속 위임되는 것을 문서와 fixture로 확인한다.
3. `scripts/managed-self-deploy.js`의 live health validation과 receipt evidence를 bd diagnostics까지 확장한다.
   - pure bounded validator는 `/healthz`의 exact non-empty version, healthy default/opt-in producer observations, `bare`와 `envelope_v2` consumer support, primary workspace probe green, active protocol failure 0을 요구한다.
   - `readRuntimeHealth()`는 runtime identity가 맞아도 diagnostics가 missing/red/malformed면 `runtime_health_red`로 receipt를 거부한다. 성공 때만 bounded summary digest와 `bd_capability_readback: success` action outcome을 terminal receipt에 넣는다.
   - `scripts/managed-self-deploy.test.js`와 `server/worker/deployment-reconciler.integration.test.js`는 missing/red diagnostics, identity mismatch, exact recovery, receipt rename 전 crash와 same-attempt receipt-only recovery를 검증한다. 기존 install/pointer/restart idempotency를 약화하지 않는다.
4. root controller가 focused verification 뒤 전체 Pre-Handoff bundle과 owned diff를 검토한다.
   - frontend source를 건드리지 않았는지 확인하고 `app/main.bundle.js`와 `.map`은 수정하지 않는다. frontend scope가 생기면 implementation을 멈추고 re-plan한다.
   - formatter가 만든 기계적 변화까지 전체 `git status`, full diff, generated/untracked file 목록으로 확인하고 unrelated user work를 포함하지 않는다.

**Phase verification:** `npx vitest run scripts/bd-json-smoke.test.js scripts/managed-self-deploy.test.js server/worker/deployment-reconciler.integration.test.js server/bd-json-ownership.test.js && npm run smoke:bd-json && npm run tsc && npm test && npm run lint && npm run prettier:write && npm run all && git diff --check`를 모두 통과시킨다. 실제 smoke는 current repo `.beads`와 shared port를 사용하지 않았다는 temp-root/socket evidence를 남긴다.

## Test scope

| Phase | RED → GREEN seam | 관찰 가능한 동작 |
| --- | --- | --- |
| Phase 1 | transport/result | bare와 envelope inner deep equality, malformed/unknown/invalid JSON explicit failure, bare embedded schema 보존 |
| Phase 1 | typed projection | issue/list/ready/explain/dep/comments/version container와 identity validation, native/legacy/equal/conflicting spec semantics 유지 |
| Phase 1 | capability state | canonical root+database key, same-key recovery, cross-workspace isolation, cache TTL/single-flight/overflow fail-closed |
| Phase 2 | Board/detail | envelope가 bare와 같은 count/data를 만들고 blocked/provenance protocol error가 empty success가 되지 않음 |
| Phase 2 | Worker | admission/cache/attach/metadata/find/children/scan envelope support와 protocol failure non-caching |
| Phase 2 | mutation/comments | exact issue/readback, `write_applied=true`·`retry_safe=false`, comments array preservation, preflight 이전 write 0회 |
| Phase 2 | health/effect | dual version/list probe, additive diagnostics, workspace/family observation recovery, healthy workspace effect isolation |
| Phase 2 | ownership | final discriminated contract만 남고 raw payload/ad-hoc unwrap/matrix 없는 caller가 static test에서 실패 |
| Phase 3 | disposable central smoke | temp Unix socket DB에서 default/envelope list/show/comments/Board/Worker/health parity와 exact cleanup |
| Phase 3 | managed deploy | exact runtime identity와 green bd diagnostics가 함께 있어야 receipt가 생기고 same-attempt recovery는 restart를 중복하지 않음 |

RED→GREEN에서 제외하는 것은 frontend bundle/visual work, formatter-only 배치, live shared service restart다. test 삭제·완화·skip, current repo `.beads`나 operator config fallback, shared port 사용, semantic version floor, unsupported future schema best-effort, upstream bd/dotfiles 수정은 허용하지 않는다.

## Delivery and live verification

- Phase 3 green 뒤 root가 integrated diff와 verification evidence를 확인하고 workflow implementation gate를 한 번 수행한다. feature branch를 push하고 writable fork `origin`의 `nakkulla/beads-ui`를 base로 PR Delivery에서 멈춘다. 이 fork의 checks가 비어 있으면 저장소 계약대로 vacuous pass로 기록하되 local verification을 생략하지 않는다.
- merge 뒤 pinned merged SHA의 `docs/agents/repo-ops.toml`에서 `adapter="managed"`, `cmd=["scripts/managed-self-deploy.js"]`를 읽고 Worker deployment reconciler가 exact candidate release Adapter를 실행하게 한다. 직접 `bdui-shared restart`는 required transport가 아니며 별도 운영 recovery가 명시적으로 선택한 경우에만 사용한다.
- managed Adapter는 install → pointer cutover → restart handoff → marker/live runtime identity → green `diagnostics.bd` → terminal receipt 순서를 지킨다. receipt 전 중단은 same-attempt journal/marker readback으로 3단계부터 복구하고, diagnostics가 red면 receipt를 쓰지 않는다.
- 완료 선언 전 controller는 deploy receipt의 candidate SHA와 `bd_capability_readback`, 실제 process module path, listening port, `/healthz` HTTP 200, runtime identity, exact version/default+opt-in observations/consumer support/workspace probe/active failure 0을 read-only로 대조한다. phase children은 target-base integration과 이 검증 뒤 leaves-first로 close하고 parent `UI-jl9v`를 마지막에 close한다.
