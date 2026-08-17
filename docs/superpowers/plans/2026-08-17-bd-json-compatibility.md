# bd JSON v1/v2 호환성 구현 계획 (재작업)

## Context

- owning Bead는 `UI-jl9v`, route는 `full_plan`, mode는 `fast_track`이다. 승인 spec은
  `docs/superpowers/specs/2026-08-17-bd-json-compatibility-design.md`@
  `14efda4d2333d67e46707fb9ceaa0bfead12a68a`(origin/main contained),
  `spec_review=self@14efda4d2333d67e46707fb9ceaa0bfead12a68a`이다. plan path는
  `docs/superpowers/plans/2026-08-17-bd-json-compatibility.md`다.
- 실행 세션은 `.worktrees/UI-jl9v`(branch `UI-jl9v`, base `origin/main`≥
  `14efda4d`)에서 두 Phase child를 만들고 순차 실행한다. 두 Phase는 같은
  저장소이지만 **execution-hint가 다르다**: Phase 1은 새 leaf module 두 개와
  `server/bd.js` 계약만 만드는 자족적 단위여서 하나의 bounded packet으로 위임하고,
  Phase 2는 15개 소비자 파일에 걸친 cross-file 통합·health/effect gate·full
  diff·Pre-Handoff verification·delivery 판단이어서 controller가 소유한다(spec
  §2-10의 2026-08-18 사용자 갱신). 이 hint 차이가 두 Phase의 split 사유이며, 그
  밖의 추가 분할은 하지 않는다.
- 현재 결함(spec §1 실측): `runBdJson()`은 invalid JSON을 `code=0`으로 남기고,
  `normalizeIssueList()`는 envelope object를 빈 Board로 오인하며, `kvGetJson()`은
  envelope에서 present key를 absent 성공으로 오인하고, `server/health.js`는 boolean
  `bd --version` probe만 수행한다.
- 최종 경계는 순수 `server/bd-json.js`(transport normalizer + typed projection),
  runner 주입 `server/bd-capability.js`(dual-mode probe, canonical workspace
  identity, bounded observation), `server/bd.js`의 discriminated result와
  projection-aware `runBdJsonProjected()`(protocol observation 단일 owner)다.
  `server/bd-capability.js`는 `server/bd.js`를 import하지 않는다.
- 모든 변경은 이 저장소의 한 PR에 담는다(두 Phase 모두 landing 힌트 없이 누적).
  frontend source, dotfiles 계약, upstream bd, repo operation의 lock/단조성/
  activation 계약 구조는 건드리지 않는다. `repo-ops/script/deploy`는 health probe
  판정만 강화한다.
- disposable smoke는 temp root·HOME/XDG/config/runtime·Git workspace·Dolt data
  dir·고유 Unix socket만 사용한다. 현재 repo `.beads`, shared port `13307`, operator
  config, running shared service는 읽기 fallback이나 mutation 대상이 아니다.
- **Worktree preflight (첫 검증 전 1회, 이미 수행됨)**: `node --version`이
  `package.json#engines`(`>=22`)를 충족하고 `npm ls --depth=0`이 성공해야 한다.
  2026-08-18 이 워크트리에서 `node v24.18.0`과 `npm ci` 후 `npm ls --depth=0`
  exit 0을 확인했다. 다른 checkout의 `node_modules`를 빌리거나 symlink하지 않는다.

## Phase 1: Protocol Adapter, result contract, capability state

1. behavioral RED를 먼저 만든다(production 변경 전).
   - 기존 `server/bd.test.js`에 schema v2 envelope, invalid JSON, envelope kv
     assertion을 추가하고, 새 `server/bd-json.test.js`와
     `server/__fixtures__/bd-json/` golden fixture를 만든다.
   - fake spawn의 bare array/object, legacy one-item show array, schema v2
     envelope가 같은 inner payload로 귀결되는 expectation을 둔다.
   - own `data`만 있는 malformed envelope, unknown schema, scalar/null, invalid
     JSON, nonzero exit를 각각 stable failure로 고정한다.
   - envelope kv fixture에서 현재 `kvGetJson()`이 `{ok:true,value:undefined}`를
     반환하는 것을 present value 요구로 뒤집는다.
   - 현재 코드에서 envelope가 outer object로 남고 invalid JSON이 top-level
     `code=0`인 이유로 실패해야 한다. module missing이나 skip은 RED evidence가
     아니므로, 새 module을 참조하는 assertion은 그 module의 최소 export를 만든
     직후 **동작 이유로** 실패하는지 확인한다.
2. 새 `server/bd-json.js`에 input을 mutate하지 않는 transport와 projection 계층을
   구현한다.
   - `normalizeBdJsonTransport()`는 own `data` object만 envelope 후보로 보고
     integer `schema_version===2`를 요구하며, bare object의 embedded schema
     marker를 보존한다.
   - issue, issue-list, ready rows, ready-explain, dependency rows, comments,
     version capability projector는 spec §5.4의 최소 identity를 검증하고 additive
     field를 보존한다. dependency는 row별 edge/issue shape 판별과
     `issue_id`/`depends_on_id`/`id` identity, comments는 `id`/`text`와 optional
     `expected_issue_id` 일치를 요구한다.
   - failure는 `bd_exit_error`, `bd_json_invalid`, `bd_json_envelope_invalid`,
     `bd_json_schema_unsupported`, `bd_json_shape_invalid`와 bounded structural
     detail만 반환한다.
3. 새 `server/bd-capability.js`와 `server/bd-capability.test.js`에 runner-neutral
   state primitive를 만든다(RED 먼저, 그다음 구현).
   - realpath를 푼 `root_dir`과 `resolveWorkspaceDatabase()`의 normalized path
     또는 검증된 `db_path`로 process-local digest를 만들고 외부에 노출하지 않는다.
   - global dual-version cache와 workspace dual-list cache는 single-flight,
     success TTL 60초, failure TTL 5초, 최대 128 workspace다.
   - active protocol failure는 same-workspace/same-family success 또는 explicit
     workspace pruning만 지우며 eviction하지 않는다. 한도 초과는
     `bd_observation_store_overflow`, identity 실패는
     `bd_workspace_identity_unresolved`로 fail-closed한다.
4. `server/bd.js`의 JSON 경계를 discriminated result로 전환하고 observation owner를
   만든다.
   - `runBdJson()`은 `{ok:true,data,protocol}` / `{ok:false,error}`를 반환한다. bd
     queue, `--sandbox`, `BEADS_DB` resolution, spawn error와 stderr tail 경계는
     유지한다.
   - `runBdJsonProjected(command_family, args, projector, options)`를 추가해
     transport 결과와 typed projection 결과를 모두 같은
     `{workspace_key, command_family}` observation으로 기록한 뒤에만 반환한다.
     workspace identity는 기존 `options.cwd`(없으면 process cwd)에서
     `resolveBdWorkspaceIdentity()`로 해석한다. `bd version --json` 같은
     process-global probe는 workspace key 없이 process-shared observation으로
     기록한다.
   - `kvGetJson()`은 exit 판정 전에 parsed stdout을 transport normalizer에
     통과시키고, transport 실패를 `ok:false`로 fail-closed하며 exit-1-absent와
     `kv_value_unparsable` 도메인 warning 의미는 유지한다.
   - Phase 2가 소비자를 옮기기 전까지 기존 caller가 깨지지 않도록 additive
     compatibility field(`stdoutJson`, numeric `code`)를 임시 유지하되, invalid
     JSON이 성공으로 읽히지 않는 값을 준다. 이 bridge는 Phase 2 마지막 task에서
     완전히 제거하며 최종 API나 ownership allowlist에 남기지 않는다.

**Phase verification:**
`npx vitest run server/bd.test.js server/bd-json.test.js server/bd-capability.test.js server/spec-id.test.js && npm run tsc && npm test`
를 통과시킨다. 이 Phase는 `runBdJson()`의 반환 shape를 바꾸면서 미이행 소비자를
compatibility field로 지탱하므로, 그 bridge가 실제로 유효한지는 focused test가 아니라
전체 `npm test`만이 증명한다. Phase 1 commit diff에서 compatibility field가 임시임을
명시하고, controller는 위임 결과 diff를 직접 검토한 뒤 Phase를 seal한다.

## Phase 2: Consumer migration, capability health, 통합 증거와 delivery

<!-- prettier-ignore -->
실행: main(cross-file 통합·full diff·Pre-Handoff verification·delivery 판단은 controller 소유 범위)

1. **RED wave를 production 변경 전에 먼저 기록한다.** 아래 세 RED는 모두 현재
   미이행 소비자 상태에서 실패해야 하며, migration 뒤에는 재현되지 않으므로 이
   순서가 계약이다.
   - 새 `server/bd-json-ownership.test.js`를 exact production allowlist와
     `rg --text` 기반으로 먼저 작성한다. 현재 inventory가 raw `stdoutJson`,
     `unwrapShowJson`, ad-hoc first-row/object unwrap을 allowlist 밖에서 쓰므로
     실패한다. NUL-containing `revise-parked.js`도 scan count에 포함한다.
   - 새 `scripts/bd-json-smoke.js`, `scripts/bd-json-smoke.test.js`와
     `package.json`의 `smoke:bd-json`을 먼저 추가해 **아직 미이행인** Board
     adapter/Worker metadata에 대해 실행한다. disposable issue의 default Board
     count와 envelope Board count가 달라 equality assertion에서 실패해야 하고,
     executable/env 조건 skip은 RED evidence가 아니다.
   - `repo-ops/script/deploy.test.js`에 **실제 embedded probe**를 fixture health
     body(runtime identity green이지만 `diagnostics.bd` 부재/red)에 대해 실행해
     non-`ok` 출력을 요구하는 assertion을 추가한다. 현재 probe는 identity만 보고
     `ok`를 출력하므로 실패한다.
   - 이어서 Seam 3·4·5의 소비자별 behavioral assertion을 각 기존 test target에
     추가한다: snapshot coordinator/list adapter의 known-row fixture를 envelope로
     감싸면 count 0이나 invalid payload가 되고, Worker test의 bare success payload를
     envelope로 감싸면 throw 또는 negative/empty cache가 되며, kv defaults fixture는
     silent absent가 되고, WS show/comments readback을 envelope나 invalid JSON으로
     바꾸면 raw envelope·`undefined`·`[]`가 success로 전송되며,
     `server/healthz.test.js`의 structured dual-mode probe expectation은 현재
     boolean `bd --version` 결과 때문에 실패한다.
2. Board snapshot과 read consumer를 transport result + typed projector 경계로
   옮긴다(위 RED를 GREEN으로).
   - `server/workspace-snapshot-coordinator.js`의 list/ready-explain/dep 소비를
     `runBdJsonProjected` 경계로 옮기고, protocol 오류가 empty snapshot 성공이
     되지 않게 structured error로 전파한다.
   - `server/list-adapters.js`의 show/detail, blocked stored/explain, provenance를
     command family별 projector로 나눈다. ordinary optional dependency CLI failure와
     protocol failure를 분리하고, protocol failure는 empty Board로 바꾸지 않는다.
     `resolved` status 미지원 legacy CLI의 기존 명시 예외만 유지한다.
   - `server/worker/attach.js`, `server/worker/bd-metadata.js`,
     `server/worker/runnable-cache.js`, `server/worker/title-cache.js`,
     `server/worker/revise-parked.js`의 show/list/ready/find/children/scan과
     `server/worker/runtime.js`의 kv defaults를 같은 경계로 옮긴다. cache는
     protocol failure를 negative/empty entry로 저장하지 않는다.
3. WS mutation, exec preset, session defaults, comments readback을 exact typed
   result로 바꾼다.
   - `server/ws/context.js`가 connection workspace identity와 command family를
     runner 결과에 결합하고, `server/ws/mutation-handlers.js`와
     `server/ws/exec-preset-handlers.js`의 모든 show readback은 expected id가 맞는
     single issue만 success로 보낸다.
   - `server/ws/session-defaults-handlers.js`와 exec preset 통합 설정의 kv
     read/write/readback이 envelope에서 값을 유실하지 않고, kv transport 실패가
     absent defaults 성공이 되지 않게 한다.
   - write exit 0 뒤 readback 실패는 `bd_readback_failed`, `phase=readback`,
     `write_applied=true`, `retry_safe=false`로 반환한다. raw envelope,
     `undefined`, scalar를 success로 보내지 않는다.
   - comments read/add readback은 array projector를 사용하고 기존 client payload
     shape는 normalized issue로 유지한다.
4. dual-mode probe, scoped observation, effect preflight를 runtime에 연결한다.
   - `server/health.js`는 process env clone에서 default leg의 envelope env를
     삭제하고 opt-in leg에만 `1`을 설정해 `bd version --json`과
     `bd list --json --tree=false --limit 1`을 각 leg에서 2초 timeout으로
     실행한다. 두 leg version은 일치해야 하고 모든 결과가 typed projector를
     통과해야 한다.
   - `server/app.js`와 `server/healthz.test.js`는 `checks.bd` boolean,
     db/worker/runtime fields를 유지하면서 producer observations, producer
     capabilities, consumer supported formats, primary workspace probe와 bounded
     active failure summary를 `diagnostics.bd`에 additive로 낸다.
   - Phase 1의 observation 기록을 health aggregate와 effect gate에 연결한다.
     `bd_json_shape_invalid`도 `checks.bd=false`/503과 workspace-scoped preflight
     red를 만들며, 같은 workspace/family 정상 projection만 해제한다.
   - WS write 전에 preflight하고, Worker는 dispatch/worktree effect와 PR cleanup
     진입 전에 preflight한다. `bd-metadata`의 write/create/status helper도 같은
     gate를 사용한다. read-only command는 diagnostics를 만들 수 있으나 failure를
     empty/success로 바꾸지 않는다.
5. `repo-ops/script/deploy`의 health probe를 bd diagnostics까지 확장한다(task 1의
   deploy RED를 GREEN으로).
   - probe는 같은 `/healthz` body에서 runtime identity에 더해 `diagnostics.bd`의
     non-empty exact version, healthy default/opt-in producer observations,
     `bare`+`envelope_v2` consumer support, primary workspace probe green, active
     protocol failure 0을 요구하고, 어긋나면 stable reason을 출력한다. 스크립트의
     self-flock/HEAD/tracked-clean 계약 구조는 바꾸지 않는다.
6. 모든 production caller가 migrated된 뒤 Phase 1 compatibility field,
   `unwrapShowJson()`과 ad-hoc first-row/object fallback을 제거한다.
   - final `runBdJson()`은 discriminated result만 반환하고 injected runner test
     double도 그 contract를 사용한다.
   - ownership test의 allowlist를 최종 상태로 좁혀 `runBdJsonProjected` 우회
     projector 호출과 matrix 없는 새 caller도 차단한다.
   - `resolved` status compatibility 예외와 ordinary optional provenance failure만
     consumer-owned fail-quiet로 남긴다.
7. `docs/bd-json-compatibility.md`에 command family, production consumer, accepted
   transport/payload, projector와 failure policy matrix를 게시한다.
   - static ownership allowlist와 문서 matrix가
     list/show/ready/ready-explain/dep/comments/version/kv/create-readback family를
     모두 열거하도록 test로 고정한다.
   - native `issue.spec_id`, metadata fallback, equal/conflicting dual semantics가
     envelope 유무와 무관하게 `server/spec-id.js`에 계속 위임되는 것을 문서와
     fixture로 확인한다.
8. controller가 focused verification 뒤 전체 Pre-Handoff bundle과 owned diff를
   검토한다.
   - frontend source를 건드리지 않았는지 확인하고 `app/main.bundle.js`와 `.map`은
     수정하지 않는다. frontend scope가 생기면 구현을 멈추고 re-plan한다.
   - formatter가 만든 기계적 변화까지 전체 `git status`, full diff,
     generated/untracked 목록으로 확인하고 unrelated user work를 포함하지 않는다.

**Phase verification:**
`npx vitest run server/bd.test.js server/bd-json.test.js server/bd-capability.test.js server/bd-json-ownership.test.js server/workspace-snapshot-coordinator.test.js server/list-adapters.test.js server/worker/attach.test.js server/worker/bd-metadata.test.js server/worker/runnable-cache.test.js server/worker/title-cache.test.js server/worker/revise-parked.test.js server/worker/runtime.test.js server/ws.mutations.test.js server/ws.comments.test.js server/ws.labels.test.js server/ws/exec-preset-apply.test.js server/ws/exec-settings-mutation.test.js server/healthz.test.js scripts/bd-json-smoke.test.js repo-ops/script/deploy.test.js && npm run smoke:bd-json && npm run tsc && npm test && npm run lint && npm run prettier:write && git diff --check`
를 모두 통과시키고, `rg --text`로 temporary compatibility symbol과 retired unwrap이
0건인지 확인한다. 실제 smoke는 current repo `.beads`와 shared port를 사용하지
않았다는 temp-root/socket evidence를 남긴다.

## Test scope

| Phase | RED → GREEN seam (spec §9) | 관찰 가능한 동작 |
| --- | --- | --- |
| Phase 1 | Seam 1 transport/result | bare와 envelope inner deep equality, malformed/unknown/invalid JSON explicit failure, kv present-key 보존과 exit-1-absent 유지 |
| Phase 1 | Seam 2 typed projection | issue/list/ready/explain/dep/comments/version container·identity validation, dependency edge/issue row 판별, comments id/text/expected_issue_id, spec semantics 유지 |
| Phase 1 | Seam 5 capability state 부분 | canonical root+database key, same-key recovery, cross-workspace isolation, TTL/single-flight/overflow fail-closed |
| Phase 2 | Seam 6 ownership (**RED 최우선**) | migration 전에 작성해 현재 raw payload/unwrap 사용으로 실패하고, migration 후 GREEN |
| Phase 2 | Seam 7 disposable smoke (**RED 최우선**) | migration 전 default/envelope Board count 불일치로 실패하고, migration 후 parity·exact cleanup |
| Phase 2 | Seam 5 deploy probe (**RED 최우선**) | 실제 embedded probe가 diagnostics 부재/red fixture body에 non-`ok`, green body에 `ok` |
| Phase 2 | Seam 3 snapshot/Board/Worker | snapshot coordinator·Board·Worker의 envelope parity, protocol failure의 non-empty/non-cache 전파, kv defaults 유지 |
| Phase 2 | Seam 4 mutation/comments | exact issue/readback, `write_applied=true`·`retry_safe=false`, comments array 보존, session defaults kv, preflight 이전 write 0회 |
| Phase 2 | Seam 5 health/effect | dual version/list probe, additive diagnostics, projection failure의 observation 기록과 503/preflight red, workspace 격리 |

각 seam은 해당 Phase 안에서 RED→GREEN을 완결한다. Phase 2의 ownership·smoke·deploy
seam은 소비자 migration이 그 RED를 소멸시키므로 반드시 migration 이전에 실패를
기록한다.

RED→GREEN에서 제외하는 것은 frontend bundle/visual work, formatter-only 배치, live
shared service restart다. test 삭제·완화·skip, current repo `.beads`나 operator
config fallback, shared port 사용, semantic version floor, unsupported future schema
best-effort, upstream bd/dotfiles 수정, deploy script lock/HEAD 계약 변경은 허용하지
않는다.

## Delivery and live verification

- Phase 2 green 뒤 root가 integrated diff와 verification evidence를 확인하고
  workflow implementation gate를 한 번 수행한다. feature branch를 push하고
  writable fork `origin`의 `nakkulla/beads-ui`를 base로 PR Delivery에서 멈춘다.
  merge 자격 판정은 checks를 보지 않으므로 `gh pr checks`를 폴링하지 않는다.
- merge 뒤에는 Worker repo operation이 pinned base SHA의 `repo-ops/config.toml`
  `[deploy]`를 읽고 `.worktrees/.repo-ops-deploy`를 merged SHA로 정렬한 뒤
  `repo-ops/script/deploy`를 실행한다. 확장된 probe가 runtime identity와
  `diagnostics.bd` green을 함께 요구한다. 실패 해결은 기존 v2 사다리를 따르고 새
  receipt 표면을 만들지 않는다.
- 완료 선언 전 controller는 deploy operation terminal success, live process module
  path, listening port, `/healthz` HTTP 200, runtime identity, `diagnostics.bd`의
  version/dual observations/consumer support/workspace probe/active failure 0을
  read-only로 대조한다. phase children은 이 검증 뒤 leaves-first로 close하고 parent
  `UI-jl9v`를 마지막에 close한다.
