# Worker 구현 가능 이슈 병렬성 분석 설계

- Bead: `UI-04vo`
- route: `full_plan`
- 선행 기능: `UI-nrut` (`worker-serial` 배타 실행과 일괄 설정·드래그 UI)

## 배경

Worker는 `worker-serial` label을 authoritative scheduling intent로 소비해 이슈별
배타 실행을 보장한다. 그러나 어떤 이슈에 이 label이 필요한지는 사용자가 spec과
plan을 직접 비교해 판단해야 한다. 구현 가능한 이슈가 여러 개일 때 shared mutable
state, schema migration, canonical contract, deploy surface 충돌을 놓치기 쉽고, 반대로
같은 repo나 비슷한 파일을 건드린다는 이유만으로 전체를 serial로 두면 처리량이
불필요하게 줄어든다.

분석을 queue 적재나 auto-advance의 hot path에 넣으면 LLM 응답 시간과 실패가 정상
실행을 지연시킨다. 따라서 일반 Worker 동작은 그대로 즉시 수행하고, 사용자가 명시적으로
`병렬성 분석`을 눌렀을 때만 별도 read-only analyzer를 실행한다.

## 사용자 확정 결정

- Worker의 구현 가능한 top-level 이슈 전체를 한 snapshot으로 비교한다.
- 일반 queue 추가, reorder, auto-advance는 LLM을 호출하지 않는다.
- Worker 상단의 `병렬성 분석` 버튼으로만 분석을 시작한다.
- 분석 model과 effort는 Worker 설정에서 사용자가 선택한다.
- spec과 plan을 기본 근거로 사용하고, 문서가 명시한 source/contract 경로만 보조
  근거로 수집한다.
- 강한 근거가 있을 때만 `worker-serial`을 권장한다.
- 결과는 제안이며, 사용자가 확인한 뒤에만 기존 label writer로 적용한다.
- Codex와 Claude를 동시에 실행하거나 장기 reviewer session을 유지하지 않는다.

## 목표

1. 현재 Worker가 구현 가능한 것으로 보는 이슈들과 아직 끝나지 않은 Worker lineage를
   동일한 artifact snapshot에서 비교한다.
2. serial 필요성, 순서만 필요한 관계, 강한 근거 부재, 불확실을 근거와 함께 구분한다.
3. 분석 비용은 명시적 버튼 클릭 때만 발생시키고 동일 snapshot은 cache한다.
4. analyzer가 Bead, label, queue, git worktree, repository file을 변경할 수 없게 한다.
5. 사용자가 승인한 high-confidence serial 권장만 snapshot-bound server apply 경계에서
   재검증한 뒤 현재 generic label writer/readback core로 순차 적용한다.

## 비목표

- queue 적재 전 자동 LLM preflight
- `worker-serial` 자동 부여·제거 또는 controller의 자동 writer
- `parallel_safe` 보증
- queue 자동 적재, 자동 reorder, dependency edge 자동 작성
- 기존 `worker-serial` barrier, attempt snapshot, lineage 의미 변경
- 과거 `worker_parallel`, `worker_parallel_hint*`, `worker_conflicts_with` metadata 부활
- Beads CLI/schema 또는 workflow canonical 계약 변경
- persistent analyzer session, Codex+Claude 합의, 여러 model voting
- spec/plan에 명시되지 않은 repository 전체의 자유 탐색

## 현재 기반과 재사용 경계

- `server/worker/runnable-cache.js`는 workspace snapshot에서 open top-level parent,
  `spec_backed|full_plan`, native-first `spec_id`, 유효한 `spec_review`,
  `worker-ineligible` 부재를 판정한다. 이 qualification 어휘를 분석 대상의 기본값으로
  재사용한다.
- `server/worker/admission.js`는 target base의 spec 존재, review receipt 도달성 등을
  검사한다. 분석은 이 판정을 완화하거나 대체하지 않는다.
- canonical workflow 계약은 계속 dotfiles의 `docs/contracts/workflow.md`가 소유한다.
  이 변경은 exact `worker-serial` label의 의미나 writer authority를 정의하지 않고,
  beads-ui 안에서 user-confirmed suggestion UI만 추가한다. 따라서 dotfiles 변경 unit은
  없다.
- `server/spec-id.js`의 native `issue.spec_id` 우선과 metadata compatibility fallback을
  그대로 사용한다. dual-value conflict는 분석 대상에서 제외한다.
- `metadata.plan_path`는 full-plan artifact 경로다. path가 없거나 target base에
  도달하지 않으면 spec만 분석하고 해당 이슈의 누락 근거를 `uncertain`에 반영한다.
- `server/worker/runner-catalog.js`의 active runner/model/effort vocabulary는 설정 UI에
  재사용한다. 실제 implementation runner의 write-capable argv는 재사용하지 않는다.
- label 적용의 실제 writer와 `bd show --json` readback은
  `server/ws/mutation-handlers.js`의 generic label mutation core를 재사용한다. 분석 적용
  요청은 이 core 앞에 snapshot/lane precondition을 두는 별도 server handler가 소유한다.
- `UI-nrut`가 구현한 live `worker-serial` projection과 scheduler tick을 그대로 사용한다.

## Architecture

### 1. Analysis target snapshot

server에 `parallel-analysis-targets.js` 경계를 둔다. 한 번의 분석은 다음 값을
immutable snapshot으로 고정한다.

- registered workspace identity
- target base ref와 resolved commit SHA
- sorted target Bead IDs
- 각 Bead의 title, route, native-first `spec_id`, `plan_path`, direct dependencies,
  live labels, Worker lane
- 각 artifact의 target-base blob OID와 byte length
- analyzer prompt schema version

기본 target set은 `runnable-cache` qualification을 통과한 top-level parent 전체다.
여기에 현재 workspace의 `queue`, running/paused attempt, durable `pr_wait`에 있는
top-level completion root를 비교 문맥으로 합친다. active lineage는 future candidate와
충돌할 수 있으므로 분석에는 포함하지만, 결과 적용 대상은 아니다.

다음은 제외한다.

- closed/done Bead
- phase child
- `quick_fix` 또는 route 부재
- native/legacy `spec_id` conflict
- `worker-ineligible`
- spec 또는 `spec_review` authority가 없는 Bead

queue lane 변화 자체는 semantic snapshot을 무효화하지 않는다. target set, target base,
artifact blob, dependency set, analyzer 설정, prompt version 중 하나가 바뀌면 cache key가
바뀐다. live labels와 lane은 적용 가능성을 판단하는 overlay이며 model evidence나
semantic digest에는 들어가지 않는다.

### 2. Artifact bundle

working tree 파일을 직접 신뢰하지 않는다. collector는 pinned commit에서 `git cat-file`
또는 동등한 blob read를 사용해 artifact를 읽는다.

1. native-first `spec_id`를 필수 artifact로 수집한다.
2. `full_plan`이고 safe `docs/**.md` `plan_path`가 pinned commit에 있으면 plan을
   추가한다. `spec_backed`는 plan 부재가 정상이며 spec만으로 complete input이다.
3. spec/plan의 Markdown links와 inline code에서 workspace-relative tracked path를
   추출한다.
4. exact file reference만 보조 source content로 포함한다. directory reference는
   filename manifest만 포함하며 directory 전체 content를 확장하지 않는다.
5. absolute path, `..`, symlink escape, untracked file, `.git/**`, credential/secret
   filename pattern, size/count cap 초과 항목은 제외하고 bundle manifest에 omission
   reason을 남긴다.

기존 `/api/doc`과 같은 `docs/**.md` locality를 spec/plan path에 적용한다. source
reference는 pinned tracked blob만 허용하며 live filesystem의 `.env`, auth/token store,
backup file을 읽지 않는다. `full_plan`의 plan이 아직 없거나 pinned commit에 없거나,
누락된 보조 source 때문에 strong evidence를 검증할 수 없으면 model은 관련 이슈에
`uncertain`을 반환해야 한다.

bundle은 analyzer 전용 임시 directory에 materialize하고 종료 시 제거한다. directory에는
허용된 pinned blobs와 generated manifest만 존재한다. 원본 repository는 analyzer의 cwd로
사용하지 않는다.

### 3. Analyzer settings

analysis 설정은 execution preset과 분리한 server-global XDG state다.

```text
$XDG_STATE_HOME/bdui/parallel-analysis-settings.json
```

```js
{
  revision: number,
  runner: 'codex' | 'claude',
  model: string,
  effort: string
}
```

- `runner_catalog`와 analyzer capability probe가 모두 허용하는 exact model과 그 model의
  effort만 저장할 수 있다. implementation runner로 사용 가능하다는 사실만으로 analyzer
  호환으로 간주하지 않는다.
- initial state는 unconfigured다. 설정 전 버튼은 `분석 모델 설정 필요`를 표시하고
  process를 띄우지 않는다.
  <br>→ 이 항목은
  `docs/superpowers/specs/2026-08-18-parallel-analysis-codex-runner-design.md` §3의
  기본 선택이 대체한다.
- model이 catalog에서 사라지거나 effort가 비호환이면 fail-visible하게 설정 오류를
  표시한다.
- unknown model, provider mismatch, unavailable runner는 자동 fallback하지 않는다.
- CAS revision과 atomic temp-file rename/readback을 사용한다.

### 4. Read-only analyzer adapter

새 `parallel-analysis-runner.js`는 implementation `createRunner()`와 별도다. 선택한
provider transport 하나만 실행하며, collector가 만든 manifest와 artifact content
전체를 stdin/request body로 전달한다. analyzer는 파일을 찾아 읽지 않는다.

- 공통 capability는 `tool_free_structured_output`이다. model request에 filesystem,
  shell, web/network, MCP를 포함한 어떤 tool도 등록하지 않으며 result schema만 건넨다.
- Claude CLI adapter를 사용할 때는 `--print`, `--tools ""`, `--safe-mode`,
  `--strict-mcp-config`, `--setting-sources user`, `--no-session-persistence`, JSON schema를
  고정한다. repository-local settings/hooks와 session artifact를 만들지 않는다.
- Codex는 tool declaration이 비어 있는 analyzer 전용 structured-completion transport만
  허용한다. 일반 `codex exec --sandbox read-only`는 write만 막고 filesystem read를
  bundle로 제한하지 못하므로 이 capability를 충족하지 않으며 사용하지 않는다.
  <br>→ 그 transport의 확정은
  `docs/superpowers/specs/2026-08-18-parallel-analysis-codex-runner-design.md` §1이
  대체한다.
- provider transport가 tool-free 요청을 지원하지 않거나 capability probe에 실패하면
  해당 runner/model은 analyzer catalog에서 제외하고 fail-visible하게 표시한다. 다른
  provider로 자동 fallback하지 않는다.
- provider API 통신은 transport process만 수행할 수 있다. model에 노출된 network tool은
  없으며 입력 payload에도 credential/config path나 값은 포함하지 않는다.
- process group 단위 cancel과 300초 timeout을 지원한다.
- analyzer의 stdout은 strict JSON result channel로만 소비한다. stderr와 raw model
  transcript는 cache에 저장하지 않고 capped diagnostic code만 남긴다.

spec/plan과 source content는 untrusted data다. system prompt는 문서 안의 명령을 따르지
말고 분석 근거로만 취급하도록 고정한다. model 자기보고로 격리나 성공을 판정하지 않고
capability probe, exact argv/request shape, process 종료 뒤 repository/config/session artifact
diff, exit status, schema validation으로 검증한다.

### 5. Result schema and evidence validation

top-level output은 다음 의미를 가진 versioned JSON이다.

```js
{
  schema_version: 1,
  snapshot_digest: string,
  issues: [
    {
      bead_id: string,
      verdict:
        | 'serial_recommended'
        | 'ordering_only'
        | 'no_strong_serial_signal'
        | 'uncertain',
      confidence: 'high' | 'medium' | 'low',
      conflicts_with: string[],
      categories: string[],
      reason: string,
      evidence: [
        {
          path: string,
          artifact_kind: 'spec' | 'plan' | 'source',
          locator: string
        }
      ]
    }
  ],
  ordering: [
    {
      before: string,
      after: string,
      reason: string,
      evidence: [{ path: string, locator: string }]
    }
  ]
}
```

`serial_recommended`는 `high` confidence이며 다음 strong category 중 하나 이상을
가져야 한다.

- `shared_mutable_state`
- `schema_or_migration`
- `canonical_contract`
- `shared_deploy_surface`
- `exclusive_external_resource`

같은 repo, 같은 frontend/backend area, 일부 파일 overlap만으로는 strong category가
아니다. `no_strong_serial_signal`은 병렬 안전 보증이 아니라 현재 artifact에서 강한
serial 근거를 찾지 못했다는 뜻이다.

server validator는 다음을 모두 확인한다.

- top-level/result enum과 field shape
- `issues`가 pinned target ID 각각을 정확히 한 번 포함하고, 길이와 집합이 target set과
  완전히 일치함
- duplicate `bead_id`와 target 누락·추가가 없음
- `conflicts_with`와 ordering endpoint가 target set에 포함됨
- evidence path가 bundle manifest에 포함됨
- Markdown heading 또는 source line locator가 pinned content에 존재함
- strong verdict의 confidence/category/conflict evidence 조건
- `serial_recommended` conflict edge의 반대 endpoint도 high-confidence
  `serial_recommended`이고 conflict relation이 대칭임
- result `snapshot_digest`가 request와 일치함

하나라도 어기면 전체 result를 거부한다. server가 model의 약한 verdict를 임의로
strong verdict로 승격하지 않는다.

### 6. Cache and job lifecycle

마지막 성공 result는 workspace XDG state에 저장한다.

```text
$XDG_STATE_HOME/bdui/<workspace-slug>/parallel-analysis.json
```

cache identity는 다음의 digest다.

- workspace identity와 target base SHA
- sorted target IDs
- per-target spec/plan/source blob OIDs
- dependency snapshot
- runner/model/effort
- prompt/schema version

같은 identity에서 버튼을 다시 누르면 process를 띄우지 않고 cache hit를 반환한다.
`재분석`은 동일 identity의 cache를 우회할 수 있지만 새 result가 성공하기 전까지 이전
성공 cache를 지우지 않는다.

workspace당 active analysis job은 하나다. 중복 start는 기존 `job_id`와 snapshot을
반환해 같은 job에 join한다. cancel, timeout, runner failure, invalid JSON은 마지막 성공
cache를 보존하고 fail-visible terminal reason을 publish한다. server restart 뒤 orphan
job을 resume하지 않고 idle로 정산한다.

lane과 current label은 result 위에 live overlay한다. artifact identity가 같아도
running/paused/pr_wait 항목은 `분석 문맥 · 적용 불가`가 되고, 현재 target set에서 빠진
항목이나 artifact identity가 바뀐 result는 stale로 표시해 적용을 막는다.

### 7. WebSocket protocol and client store

analysis state는 queue snapshot에 끼워 넣지 않고 별도 subscription/store로 둔다.

- `subscribe-worker-parallel-analysis { workspace }`
- `unsubscribe-worker-parallel-analysis { workspace }`
- `worker-parallel-analysis-snapshot`
- `worker-parallel-analysis-start { force?: boolean }`
- `worker-parallel-analysis-cancel { job_id }`
- `worker-parallel-analysis-settings-update { expected_revision, runner, model, effort }`
- `worker-parallel-analysis-apply { snapshot_digest, bead_ids }`

snapshot은 `idle|running|succeeded|failed|canceled` phase, cache freshness, progress summary,
settings compatibility, result 또는 terminal reason을 전달한다. raw prompts, artifact
content, process output은 wire로 보내지 않는다.

### 8. Worker UI

Worker control bar에 `병렬성 분석` 버튼을 추가한다. queue play/pause와 독립된
비차단 control이며 분석 중에도 queue는 계속 동작한다.

dialog는 다음을 제공한다.

- 현재 analyzer model/effort와 설정 button
- 대상 수, pinned base short SHA, 분석 시각, cache hit/stale 표시
- running progress, cancel
- `serial 권장`, `순서만 필요`, `강한 근거 없음`, `불확실` group
- issue별 conflict IDs, category, reason, evidence path/locator
- suggested ordering graph의 cycle 검출과 fail-visible 표시
- `재분석`
- `권장 라벨 적용`

`serial_recommended + high` 항목만 기본 선택한다. 다음 항목은 checkbox와 적용을
비활성화한다.

- running/paused/pr_wait
- stale target
- 이미 closed/ineligible가 된 Bead
- live label truth가 unknown

`권장 라벨 적용`은 선택한 ID를 안정적인 Bead ID 순서로 정렬해
`worker-parallel-analysis-apply` 한 번으로 server에 보낸다. server는 요청 digest가
마지막 성공 result와 일치하고 요청 ID가 그 result의 `serial_recommended + high` 정확한
부분집합인지 먼저 확인한다. 이어 각 mutation 직전에 현재 Bead를 authoritative하게
다시 읽고 다음 precondition을 모두 검사한다.

- 현재 artifact identity와 analysis target membership이 snapshot과 동일함
- closed, `worker-ineligible`, phase child가 아니며 spec authority conflict가 없음
- running/paused/pr_wait/done lineage가 아니고 current lane이 적용 가능함
- exact `worker-serial` label truth를 읽을 수 있음

통과한 항목만 기존 generic label writer/readback core를 한 번에 하나씩 호출한다. exact
`worker-serial`이 이미 있으면 no-op 성공이다. precondition 실패는 `stale` 또는
`active_lineage`로 기록하고 writer를 호출하지 않는다. 각 성공은 existing
`bd show --json` readback과 label cache refresh를 거친다. 부분 실패는 나머지 항목을
계속 시도하고 실패 ID만 선택 상태에 남긴다. 이 server-bound 검사는 dialog를 연 뒤
queue나 attempt가 변하는 TOCTOU race에서도 active lineage의 attempt snapshot을
retroactive하게 바꾸지 않는 authority다.

analyzer는 기존 human `worker-serial`을 제거하지 않는다. `ordering_only`는 UI 제안만
표시하고 queue reorder나 `blocks` dependency를 자동 작성하지 않는다. ordering graph에
cycle이 있으면 serial findings는 유지하되 cycle에 포함된 ordering suggestion을
`ordering_conflict`로 표시하고 적용 가능한 순서로 제시하지 않는다.

## Error handling

- target 0건: process를 띄우지 않고 `분석 가능한 이슈 없음`을 표시한다.
- base/spec read 실패: snapshot 생성을 중단하고 기존 cache를 보존한다.
- optional plan/source 누락: 해당 evidence omission을 bundle에 기록하고 관련 verdict를
  `uncertain`으로 제한한다.
- incompatible model/effort: process spawn 전 거부하고 설정 화면으로 연결한다.
- timeout/cancel: process group 종료를 실측하고 새 cache를 쓰지 않는다.
- invalid output/evidence: 전체 result 거부, queue/labels 영향 없음.
- snapshot drift: result는 stale, 적용 disabled, 재분석 안내.
- label partial failure: 성공 readback은 유지하고 실패만 재시도 가능하게 남긴다.

## Security boundaries

- analyzer는 exact pinned blobs로 만든 sanitized bundle만 입력으로 받는다.
- live repository, untracked file, config directory, backup, credential-bearing path는
  bundle에 포함하지 않는다.
- model request에는 Beads/git/filesystem/shell/network/MCP tool을 하나도 제공하지 않는다.
- generic read-only coding session은 filesystem read 경계를 만족하지 않으므로 analyzer로
  재사용하지 않는다. tool-free capability가 없는 provider는 실행 전에 거부한다.
- Claude adapter는 session persistence를 끄며, 종료 뒤 config/session 경로에 새 artifact가
  없는지 fixture에서 실측한다.
- artifact text의 prompt injection은 data로만 취급한다.
- model stdout은 untrusted input이며 strict schema/evidence validation 전에는 UI result나
  label action source가 아니다.
- cancellation과 timeout 뒤 filesystem diff로 repository 무변경을 검증한다.

## Test scope

| Seam | RED | GREEN | 제외 |
| --- | --- | --- | --- |
| A — target snapshot | runnable candidates와 active lane root의 union, phase child/ineligible/conflicting spec 제외가 한 경계에 없음 | canonical qualification 재사용, stable target/digest, direct dependency snapshot | admission 완화, quick_fix 포함 |
| B — artifact bundle | dirty worktree·absolute/secret path·directory expansion이 분석 입력으로 섞일 수 있음 | pinned blob reader, safe path/size/count caps, omission manifest, temp cleanup | repository 전체 archive, untracked file |
| C — settings/cache | analyzer 설정과 result freshness의 durable owner가 없음 | CAS settings, per-workspace atomic cache, exact identity hit/invalidation, incompatible no-fallback | Bead metadata hint writer |
| D — read-only runners | 기존 runner는 write-capable이거나 read-only여도 live repo/config를 읽을 수 있음 | stdin-only bundle, tool-free capability probe, Claude no-persistence, repository/config escape·session artifact 차단 실측, timeout/cancel process-group 검증 | implementation runner 의미 변경 |
| E — schema/evidence | malformed JSON·target 누락·duplicate/unknown ID·fabricated evidence가 표시될 수 있음 | target ID exact-set/once-only invariant, strict versioned validator, pinned locator validation, strong verdict invariant | free-form prose parser |
| F — job lifecycle | duplicate click/restart/failure가 중복 process나 cache 유실을 만들 수 있음 | workspace single-flight join, last-good preservation, orphan idle settlement | persistent/resumed LLM session |
| G — UI/apply | client overlay 확인 뒤 generic writer를 부르면 active-lineage 전환 race가 생김 | separate store/dialog, snapshot-bound apply request, per-item authoritative identity/lane 재검증, sequential generic writer/readback, partial failure retention | auto remove/reorder/dependency write |
| H — disposable workspace E2E | settings/cache/reanalysis/cancel/dialog/apply가 post-merge 수동 확인에만 남음 | registered disposable workspace와 fake tool-free runner로 settings 저장, cache hit, forced reanalysis, cancel, dialog grouping, apply precondition/readback을 PR 안에서 자동 검증 | shared service나 실제 provider 과금 호출 |

이미 green인 assertion이나 snapshot-only golden은 RED를 대신하지 않는다. 각 seam은
focused unit/integration test를 먼저 추가하고 구현 후 green으로 닫는다.

## Verification

Focused verification:

```bash
npx vitest run \
  server/worker/parallel-analysis-targets.test.js \
  server/worker/parallel-analysis-bundle.test.js \
  server/worker/parallel-analysis-store.test.js \
  server/worker/parallel-analysis-runner.test.js \
  server/worker/parallel-analysis-validator.test.js \
  server/ws/worker-parallel-analysis.test.js \
  app/views/worker/parallel-analysis-dialog.test.js \
  app/main.worker-parallel-analysis.test.js
```

Repository verification:

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
npm run build
git diff --check
```

runner isolation은 argv assertion만으로 끝내지 않는다. adapter fixture에서 tool
registration을 요구하거나 bundle 밖 repository/config/credential path 접근을 요청하는
payload를 실행해 tool-free 거부를 확인한다. Claude fixture는 session persistence 차단을
확인한다. 전후 filesystem inventory로 repository/config/session artifact 무변경을
실측한다.

pre-handoff repository verification에는 registered disposable workspace E2E를 포함한다.
fake tool-free runner와 fixture Beads adapter를 사용해 settings 저장, cache hit, forced
reanalysis, cancel, result dialog grouping, snapshot drift 중 apply 거부, 성공 label
apply/readback을 모두 현재 PR에서 자동 검증한다. shared service나 실제 provider 호출은
이 테스트의 전제 조건이 아니다.

## Post-merge 적용과 runtime 검증

이 저장소의 `docs/agents/repo-ops.toml` `[deploy]` managed adapter가 install, pointer
cutover, restart handoff, runtime readback을 소유한다. PR merge 뒤 merged checkout 기준으로
frontend bundle이 최신인지 확인하고 managed deploy receipt를 읽은 뒤 다음 runtime
readback만 검증한다.

1. shared process가 merged release path에서 실행 중이다.
2. configured shared port가 listening 중이다.
3. basic HTTP response가 성공한다.

settings/cache/reanalysis/cancel/dialog/apply의 기능 검증은 위 disposable workspace E2E가
PR 안에서 소유한다. post-merge interactive 작업이나 no-PR residue는 완료 조건이 아니다.
이 unit은 현재 repository의 한 PR에서 종료되고 managed `[deploy]` adapter가 배포와
readback을 운반하므로 `worker-ineligible` label이 필요하지 않다.

## 예상 구현 범위

- `server/worker/parallel-analysis-targets.js`
- `server/worker/parallel-analysis-bundle.js`
- `server/worker/parallel-analysis-store.js`
- `server/worker/parallel-analysis-runner.js`
- `server/worker/parallel-analysis-validator.js`
- `server/ws/worker-parallel-analysis-handlers.js`
- `server/worker/state-paths.js`
- `app/data/worker-parallel-analysis-store.js`
- `app/views/worker/parallel-analysis-dialog.js`
- `app/views/worker/index.js`
- `app/protocol.js`, `app/protocol.md`
- 대응 unit/integration/e2e tests
- frontend bundle과 source map

plan authoring에서 기존 WS handler/module ownership에 맞춰 파일 경계는 조정할 수 있지만,
read-only adapter 분리, Bead metadata 비사용, hot-path LLM 부재, user-confirmed label apply
경계는 변경하지 않는다.

## 완료 조건

1. 일반 queue add/reorder/auto-advance가 analyzer를 호출하지 않는다.
2. 버튼 클릭은 canonical target snapshot을 만들고 configured provider 하나만 read-only로
   실행한다.
3. 동일 identity는 cache hit, 변경된 base/artifact/scope/dependency/model/prompt는 stale로
   판정된다.
4. strong evidence가 검증된 high-confidence 항목만 serial 권장으로 표시된다.
5. 사용자 승인 전에는 Bead/label/queue/dependency/repository state가 변하지 않는다.
6. 승인된 항목만 server의 digest/identity/lane 재검증을 통과한 뒤 existing generic
   label writer/readback으로 수렴하고 기존 label은 자동 제거되지 않는다.
7. cancel, timeout, invalid output, prompt injection, partial failure가 queue 진행을
   막거나 last-good cache를 손상하지 않는다.
8. disposable workspace E2E와 full repository verification, frontend build, managed
   deploy, process path·port·HTTP readback이 모두 통과하며 post-merge 수동 기능 확인이
   남지 않는다.
