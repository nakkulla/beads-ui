# bd JSON v1/v2 전면 호환성과 진단 설계

- Bead: `UI-jl9v`
- route: `full_plan`
- 작성일: 2026-08-12
- 소비자 저장소: `beads-ui`
- 참조 CLI: `bd 1.2.0-fork.1` (`a33863a82c2853eb9f6f595b8f9b68adaf2a0819`)
- 후속 소비자: `UI-k066`

## 1. 배경과 재현

beads-ui의 모든 Beads 데이터는 `server/bd.js`가 실행하는 `bd --json` 출력에서 시작한다.
현재 `runBdJson()`은 subprocess exit 뒤 `JSON.parse`만 수행하고, `bd show`의 bare object와
과거 single-item array 차이만 `unwrapShowJson()`에서 부분적으로 흡수한다. list, ready,
comments, dependency, Worker readback은 각 caller가 서로 다른 object/array 가정을 가진다.

설치된 bd는 현재 legacy bare JSON을 기본으로 내보내며 `BD_JSON_ENVELOPE=1`일 때 다음
schema v2 envelope를 사용한다.

```json
{
  "schema_version": 2,
  "data": "<legacy payload>"
}
```

bd의 `docs/JSON_SCHEMA.md`와 `cmd/bd/output.go`에 따르면 envelope 안의 `data`는 legacy
payload를 그대로 보존한다. legacy bare object는 자기 필드 옆에 `schema_version: 2`를
포함할 수 있고, bare array에는 top-level schema가 없다. 따라서 `schema_version`의 존재만으로
envelope를 판정할 수 없다. 이 저장소가 소비하는 command에는 bare top-level `data` payload가
없으므로 own `data` field가 transport envelope 후보를 표시하고, 그때만 integer
`schema_version`을 필수로 요구한다.

2026-08-12 실측에서 같은 workspace에 대해 다음 차이가 재현됐다.

```text
default:              fetchListForSubscription → ok=true, count=18
BD_JSON_ENVELOPE=1:   fetchListForSubscription → ok=true, count=0
```

현재 `normalizeIssueList()`가 non-array를 빈 배열로 바꾸기 때문에 envelope object가
명시적 오류 없이 빈 Board로 오인된다. 더 심각하게 mutation readback 다수는 JSON syntax
오류도 `code=0`으로 받은 뒤 `undefined` payload를 성공으로 반환할 수 있다. Worker의 엄격한
경로는 같은 envelope를 unreadable payload로 거부해 안전하지만 최신 bd와 호환되지 않고,
display cache 일부는 negative cache로 조용히 숨긴다.

이 Bead는 generic bd JSON 경계와 issue projection을 소유한다. 후속 `UI-k066`은
`bd comments --json`을 포함한 이 경계를 재사용하며 별도 envelope parser를 만들지 않는다.

## 2. 사용자 확정 결정

1. 구현은 `Typed 중앙 Adapter`를 사용한다. generic transport normalization과
   command-specific shape projection을 분리한다.
2. health 호환성은 semantic version floor가 아니라 실제 capability로 판정한다. exact bd
   version은 진단에 표시하지만 허용/거부 비교에는 쓰지 않는다.
3. legacy bare object/array와 schema v2 envelope를 모두 지원한다.
4. 알 수 없는 envelope schema, malformed envelope, invalid JSON, command payload shape
   mismatch는 빈 목록이나 성공으로 오인하지 않고 fail-closed한다.
5. schema v2 payload 내부의 additive unknown field는 보존한다. 최소 container/identity가
   맞지 않을 때만 shape 오류로 거부한다.
6. 현재 `/healthz`의 `checks.bd` boolean은 유지하고 typed 진단을 additive field로 제공한다.
7. disposable central-server smoke는 temp workspace, temp Dolt data dir와 고유 Unix socket만
   사용하며 live DB와 공유 server/port를 사용하지 않는다.

## 3. 범위와 소유권

### 3.1 이 Bead가 소유하는 범위

- v1 bare와 v2 envelope의 shape-preserving transport normalization
- single issue와 issue list의 공통 typed projection
- ready, ready-explain, comments, dependency output의 command-specific shape validation
- 모든 production bd JSON consumer의 공통 경계 사용
- parse/schema/shape/readback 오류의 stable vocabulary
- bd version/capability의 `/healthz` 진단과 readiness 반영
- native/legacy/envelope regression fixture와 disposable central-server smoke
- command/consumer/shape/failure-policy compatibility matrix

### 3.2 다른 owner의 범위

- `issue.spec_id` 우선, `metadata.spec_id` fallback, conflict 판정은 `server/spec-id.js`가
  계속 소유한다. 이 Bead는 normalized issue를 전달할 뿐 의미를 바꾸지 않는다.
- route, receipt, lifecycle, label, metadata vocabulary는 dotfiles workflow 계약이 소유한다.
- bd의 output schema와 CLI release 자체는 upstream bd가 소유한다.
- `UI-k066`의 report binding은 normalized comments 이후의 grammar만 소유한다.

## 4. Production consumer inventory

구현 시 다음 표를 `docs/bd-json-compatibility.md`에 active compatibility matrix로 게시한다.
표의 command family와 adapter는 테스트의 fixture matrix와 일치해야 한다.

| Command family | 현재 주요 consumer | transport 해제 뒤 payload | 공통 Adapter | protocol 오류 정책 |
|---|---|---|---|---|
| `list --json` | Board columns, runnable cache, Worker child/full scan | issue array | issue-list | fail-closed |
| `show <id> --json` | detail, Worker admission/attach/cache/metadata, mutation readback | issue object 또는 legacy one-item array | issue | fail-closed |
| `ready --json` | Board ready, Worker runnable admission | issue array; legacy `{ready}`/`{issues}` 허용 | ready rows | fail-closed |
| `ready --explain --json` | dependency-blocked Board | `{ready,blocked,summary}` object | ready-explain | fail-closed |
| `dep list ... --json` | discovered-from provenance | single-id issue rows 또는 multi-id edge rows | dependency array | schema/shape는 fail-closed; 일반 CLI 오류만 기존 optional 정책 유지 |
| `comments <id> --json` | detail comments, report prerequisite | comment array | comments array | fail-closed |
| `version --json` | default/opt-in binary capability probe | version object | version capability | fail-closed/503 |
| `list --json --tree=false --limit 1` | workspace capability probe와 effect preflight | issue array | issue-list | fail-closed/503 |
| mutation write command | status/text/priority/labels/deps/comments | exit와 stderr만 소비 | `runBd` 유지 | non-zero fail |
| `create --json` in repair | stdout 미사용, `findIssue`로 별도 readback | 사용하지 않음 | 없음 | readback이 authority |

Production migration 대상은 다음 그룹이다.

- `server/list-adapters.js`
- `server/ws/context.js`, `server/ws/mutation-handlers.js`,
  `server/ws/exec-preset-handlers.js`
- `server/worker/attach.js`, `server/worker/bd-metadata.js`,
  `server/worker/runnable-cache.js`, `server/worker/title-cache.js`,
  `server/worker/revise-parked.js`
- 위 Worker metadata facade를 사용하는 scheduler, verify, PR cleanup, discard, revise,
  completion repair 경로
- `scripts/managed-self-deploy.js`의 merged runtime health/receipt readback

`server/worker/revise-parked.js`는 파일 안의 NUL 문자 때문에 기본 `rg`가 binary로 건너뛸 수
있다. consumer inventory 검증은 `rg --text` 또는 명시 파일 목록을 사용한다.

## 5. Architecture

### 5.1 Module 경계

새 leaf module `server/bd-json.js`가 순수 normalization과 typed projection을 소유한다.
`server/bd-capability.js`는 runner를 주입받아 dual-mode probe, canonical workspace identity,
bounded protocol observation을 소유한다. `server/bd.js`는 process 실행과 JSON syntax parse 뒤
transport normalizer를 호출하고, workspace identity가 있는 결과를 capability store에 관측한다.
caller는 raw stdout이나 raw parsed envelope를 직접 읽지 않는다.

```text
bd subprocess
  → exit/stderr capture
  → JSON.parse
  → normalizeBdJsonTransport
  → command-specific typed projection
  → consumer-owned domain projection/enrichment
```

`server/bd-json.js`의 public 책임은 다음과 같다.

- `normalizeBdJsonTransport(value)`
- `normalizeBdIssue(value, { expected_id })`
- `normalizeBdIssueList(value)`
- `normalizeBdReadyRows(value)`
- `normalizeBdReadyExplain(value)`
- `normalizeBdDependencyRows(value)`
- `normalizeBdComments(value)`
- `normalizeBdVersionCapability(value)`

함수는 input을 mutate하지 않는다. 성공 payload의 additive field를 그대로 보존하고, 실패는
stable code와 bounded structural details를 반환한다. full raw JSON은 error, log, health에
포함하지 않는다.

`server/bd-capability.js`의 public 책임은 다음과 같다.

- `resolveBdWorkspaceIdentity({ root_dir, db_path? })`
- `recordBdProtocolObservation({ workspace_key, command_family, result })`
- `probeBdCapabilities({ workspace, run_json })`
- `requireBdJsonCapability({ workspace, command_family, run_json })`
- `bdHealthSnapshot({ primary_workspace })`

capability module은 `server/bd.js`를 import하지 않고 runner를 주입받아 dependency cycle을 막는다.
`server/bd.js`, WS context와 Worker runtime은 같은 workspace identity helper를 사용한다.

### 5.2 Transport normalization

transport 판정은 다음 순서다.

1. JSON syntax 오류는 `bd_json_invalid`다.
2. non-array object가 own `data`를 가지면 envelope 후보다.
3. envelope 후보에 own integer `schema_version`이 없으면 `bd_json_envelope_invalid`다.
4. envelope schema가 integer `2`가 아니면 `bd_json_schema_unsupported`다.
5. schema v2 envelope의 `data`는 type을 바꾸지 않고 그대로 반환한다. outer additive field는
   무시한다.
6. envelope 후보가 아니면 legacy bare payload로 그대로 반환한다. bare object의
   `schema_version`은 payload field이므로 제거하지 않는다.
7. transport 단계는 `data`의 command-specific object/array 의미를 판단하지 않는다.

성공 protocol 정보는 다음 형태다.

```js
{
  format: 'bare' | 'envelope',
  schema_version: 2 | null
}
```

bare array나 schema marker가 없는 historical object는 `schema_version:null`이다. bare object에
integer schema가 있으면 진단에 보존할 수 있지만 envelope로 해석하지 않는다.

### 5.3 Discriminated result

`runBdJson()`은 더 이상 top-level `code`만으로 성공 여부를 표현하지 않는다.

```js
// success
{
  ok: true,
  data: unknown,
  protocol: { format: 'bare' | 'envelope', schema_version: 2 | null }
}

// failure
{
  ok: false,
  error: {
    code: string,
    message: string,
    details?: {
      exit_code?: number,
      command_family?: string,
      expected?: string,
      actual?: string,
      schema_version?: number,
      phase?: 'write' | 'readback',
      write_applied?: boolean,
      retry_safe?: boolean
    }
  }
}
```

subprocess non-zero, invalid JSON, unsupported schema는 모두 `ok:false`다. JSON protocol failure는
process가 exit 0이어도 성공 result를 만들지 않는다. caller와 injected test double도 이
discriminated contract를 사용한다.

### 5.4 Typed projection

single issue projection은 다음을 요구한다.

- non-array object 또는 정확히 한 row를 가진 legacy array
- non-empty string `id`
- caller가 `expected_id`를 주면 exact id 일치

zero/multi-row array, scalar, null, id 부재/타입 오류, id mismatch는
`bd_json_shape_invalid`다. list projection은 array와 각 row의 object/non-empty string `id`를
요구한다. timestamp coercion, workflow enrichment, filtering 같은 domain logic은 현재
consumer에 남긴다.

ready rows는 current array와 historical `{ready:[...]}`/`{issues:[...]}`를 지원한다.
ready-explain은 object와 `blocked` array를 요구한다. dependency와 comments는 container array와
각 row의 object shape만 검증한 뒤 command-specific field 해석을 기존 consumer에 맡긴다.

## 6. Consumer data flow와 readback

### 6.1 Board와 detail

`fetchListForSubscriptionRaw()`은 모든 list/show payload를 typed Adapter에 통과시킨 뒤에만
filter와 workflow/provenance enrichment를 수행한다. unknown object를 `[object]`로 감싸거나
non-array를 `[]`로 바꾸는 fallback은 제거한다.

blocked subscription의 stored list와 `ready --explain`은 각각 자기 shape를 검증한다. 두
command 중 protocol 오류가 하나라도 있으면 전체 subscription이 structured error를 반환한다.
`resolved` status를 지원하지 않는 legacy CLI의 기존 명시 예외만 해당 consumer에서 빈 목록으로
유지하며 schema/shape 오류에는 적용하지 않는다.

provenance는 일반 `bd dep list` 실행 실패 시 기존 fail-quiet display 정책을 유지할 수 있다.
그러나 parse/schema/shape error는 compatibility failure이므로 삼키지 않고 상위 subscription을
실패시킨다.

### 6.2 Worker

admission, attach, runnable cache, title cache, revise parked cache, metadata readback,
findIssue, listChildren, scanBeads가 같은 Adapter를 사용한다. protocol 오류는 empty/negative cache로
저장하지 않는다. admission과 cleanup처럼 effect를 허가하는 경로는 기존보다 강한 fail-closed
상태를 유지한다.

`createIssue`의 JSON stdout은 계속 authority가 아니다. 생성 뒤 exact-id `findIssue`가 normalized
list를 읽고 absence/exact-one/ambiguous를 판정한다.

### 6.3 Mutation과 comments

status, priority, text, assignee, workflow metadata, labels, dependency, exec preset mutation은 write
exit가 0인 뒤 `show <id> --json`을 single issue Adapter로 확인한다. raw envelope나 undefined를
성공 payload로 반환하지 않는다.

write가 성공했지만 readback이 실패하면 다음 error를 반환한다.

```text
code = bd_readback_failed
details.phase = readback
details.write_applied = true
details.retry_safe = false
```

이는 특히 comment add처럼 재시도 시 중복 side effect가 생길 수 있는 경로에서 중요하다.
comments read와 add 후 comments readback은 normalized comment array만 반환한다.

## 7. 오류 vocabulary와 진단 안전성

active error code는 다음으로 고정한다.

| Code | 의미 |
|---|---|
| `bd_exit_error` | bd process가 non-zero로 종료 |
| `bd_json_invalid` | stdout이 JSON syntax를 만족하지 않음 |
| `bd_json_envelope_invalid` | envelope marker가 있으나 필수 transport 구조가 불완전 |
| `bd_json_schema_unsupported` | 지원하지 않는 envelope schema |
| `bd_json_shape_invalid` | command-specific payload container/identity 불일치 |
| `bd_readback_failed` | write 성공 뒤 authoritative readback 실패 |
| `bd_probe_timeout` | capability subprocess가 bounded timeout 안에 끝나지 않음 |
| `bd_workspace_identity_unresolved` | canonical root/database identity를 안전하게 확정하지 못함 |
| `bd_observation_store_overflow` | bounded workspace failure store의 안전 한도를 초과함 |

diagnostic은 command family, expected/actual top-level type, schema number, exit code, 기존
`stderrTail()`의 bounded 한 줄만 포함한다. issue/comment raw payload, description, notes,
credential-bearing env/config는 기록하지 않는다.

기존 fail-quiet 정책은 ordinary optional command failure에만 적용한다. protocol error를 empty,
absent, stale cache, success로 바꾸는 fallback은 금지한다.

## 8. Capability-first health

### 8.1 Canonical workspace identity와 observation scope

protocol observation key는 process-wide command family가 아니라
`{workspace_key, command_family}`다. `workspace_key`는 symlink를 해제한 canonical
`root_dir`과 `resolveWorkspaceDatabase({cwd: root_dir}).path` 또는 이미 검증된 `db_path`를
정규화한 뒤 만든 process-local digest다. canonical root/database를 확정하지 못하면 effect
preflight는 `bd_workspace_identity_unresolved`로 fail-closed한다. digest, path와 database
name은 HTTP/log에 노출하지 않는다.

failure는 같은 workspace key와 command family의 다음 정상 response만 지운다. 다른 workspace의
성공은 그 failure를 지울 수 없고, 한 workspace의 failure도 다른 workspace의 effect를 막지
않는다. probe cache는 최대 128 workspace의 TTL/LRU map이다. active failure는 같은 key의 성공
또는 workspace deregistration 전에는 만료·evict하지 않으며, 128개를 넘기려 하면 조용히 지우는
대신 `bd_observation_store_overflow`로 aggregate health를 fail-closed한다.

`/healthz`는 server-level operator signal이므로 primary workspace capability와 현재 모든 active
workspace failure를 집계한다. 한 workspace라도 active protocol failure가 있으면
`checks.bd=false`지만, effect gate는 aggregate boolean을 재사용하지 않고 자기 workspace key의
상태만 조회한다. diagnostics에는 workspace count와 command family만 내보내고 identity는 숨긴다.

### 8.2 Dual-mode capability probe

`probeBdCapabilities()`는 global env를 mutate하지 않고 같은 canonical workspace에서 다음 두
invocation mode를 각각 실행한다.

1. `default`: subprocess env에서 `BD_JSON_ENVELOPE`를 제거한다.
2. `envelope_opt_in`: subprocess env에 `BD_JSON_ENVELOPE=1`을 설정한다.

각 mode는 `bd version --json`과 read-only
`bd list --json --tree=false --limit 1`을 실행한다. version은 transport와 version Adapter,
list는 transport와 issue-list Adapter를 모두 통과해야 한다. 빈 workspace의 `[]`도 container
capability를 증명하지만 malformed row를 성공으로 만들지는 않는다. 두 mode가 보고한 non-empty
version은 같아야 한다.

default mode는 supported bare 또는 schema v2 envelope 어느 쪽이든 허용한다. opt-in env를
모르는 historical CLI가 valid bare payload를 반환하면 producer capability는 `legacy_bare`만
기록하고 계속 healthy다. schema v2 envelope를 반환하면 `envelope_v2`를 기록한다. semantic
version 문자열의 최소값은 강제하지 않는다. invalid JSON, unsupported schema, invalid
version/list shape, version mismatch, timeout/non-zero는 unhealthy다.

각 subprocess timeout은 2초다. dual version probe는 process-shared single-flight, dual list
probe는 workspace별 single-flight다. success cache TTL은 60초, failure cache TTL은 5초다.
failure TTL 뒤 호출은 재검증할 수 있고, active protocol failure는 동일 workspace/family의 정상
관측 전까지 probe success와 별도로 남는다.

mutation write와 Worker dispatch/cleanup effect는 실행 전에 shared
`requireBdJsonCapability({workspace, command_family})`를 통과해야 한다. global binary probe 또는
해당 workspace probe/family observation이 red면 bd write 또는 Worker effect를 시작하지 않는다.
read-only operation은 typed diagnostic을 만들기 위해 실행할 수 있지만 실패를 empty/success로
바꾸지 않는다. 아직 알 수 없던 command shape가 write 뒤 readback에서 처음 드러난 경우에만
§6.3의 `write_applied:true` 경로를 사용한다.

기존 response를 보존하면서 다음 additive diagnostics를 제공한다.

```json
{
  "ok": true,
  "checks": {
    "bd": true,
    "db": true,
    "worker": {
      "auto_advance": false,
      "running_count": 0
    }
  },
  "diagnostics": {
    "bd": {
      "version": "1.2.0-fork.1",
      "producer_observations": {
        "default": { "format": "bare", "schema_version": null },
        "envelope_opt_in": { "format": "envelope", "schema_version": 2 }
      },
      "producer_capabilities": ["legacy_bare", "envelope_v2"],
      "consumer_supported_formats": ["bare", "envelope_v2"],
      "workspace_probe": { "ok": true },
      "active_protocol_failures": { "workspace_count": 0, "families": [] },
      "error": null
    }
  }
}
```

`producer_observations`와 `producer_capabilities`는 실제 CLI에서 관측한 사실이고,
`consumer_supported_formats`는 이 Adapter가 테스트로 지원하는 정적 목록이다. 둘을 같은
`capabilities` field로 합치지 않는다.

bd capability 또는 active protocol observation이 실패하면 `checks.bd=false`, 전체 `ok=false`,
HTTP 503이다. 서버는 `/healthz` 진단을 제공하기 위해 listen 상태를 유지한다. Board read는
typed error를 반환하고, Worker/mutation effect는 자기 workspace-scoped preflight가 red일 때만
진행하지 않는다. frontend health UI는 추가하지 않는다.

## 9. Test scope

이 절의 seam만 `UI-jl9v` 구현의 RED→GREEN authority다.

각 seam의 첫 commit은 아래의 **기존 test target**에 behavioral assertion을 추가해 현재 코드에서
명시된 이유로 실패하게 만든다. 새 test path는 같은 RED phase에서 더 세분화할 수 있지만, module
미존재, executable 미설치, env skip만으로 난 실패는 RED evidence로 인정하지 않는다. 모든
command는 저장소 root에서 실행한다.

### Seam 1 — transport와 result contract

Production: 새 `server/bd-json.js`, `server/bd.js`.

Test targets: 기존 `server/bd.test.js`, 새 `server/bd-json.test.js`, 새
`server/__fixtures__/bd-json/` golden fixture.

- bare array, bare object, legacy single-item array, schema v2 envelope가 원래 payload를 보존한다.
- bare object의 embedded `schema_version`을 envelope로 오인하지 않는다.
- unknown schema, malformed envelope, invalid JSON이 explicit failure다.
- `runBdJson()`은 어떤 failure에서도 `ok:true`나 missing data success를 만들지 않는다.

Deterministic RED: `server/bd.test.js`의 fake spawn이 schema v2 envelope를 반환하면 현재
`stdoutJson`은 outer object이고, invalid JSON도 top-level `code=0`이다. 새 assertion은 각각
inner data와 `ok:false`를 요구한다.

```bash
npx vitest run server/bd.test.js server/bd-json.test.js
```

### Seam 2 — issue와 command projection

Production: `server/bd-json.js`의
issue/list/ready/ready-explain/dependency/comments/version Adapter.

Test targets: `server/bd-json.test.js`, 기존 `server/spec-id.test.js`,
`server/list-adapters.test.js`, `server/worker/attach.test.js`, `server/ws.comments.test.js`.

- native bare issue, metadata-only legacy issue, equal dual spec issue, conflict dual spec issue가
  envelope 유무와 무관하게 기존 `resolveSpecId()` 의미를 유지한다.
- list/show/comments의 bare와 envelope 결과가 deep-equal이다.
- scalar, wrong container, invalid row, missing/mismatched id는 fail-closed한다.
- dependency single-id issue rows와 multi-id edge rows를 보존한다.

Deterministic RED: 기존 list adapter의 envelope fixture는 issue count를 0으로 만들고, attach의
envelope show/ready는 unreadable로 실패하며, comments handler는 envelope object를 array 대신
전달한다. 같은 golden payload에 bare/envelope deep equality를 요구한다.

```bash
npx vitest run server/bd-json.test.js server/spec-id.test.js server/list-adapters.test.js server/worker/attach.test.js server/ws.comments.test.js
```

### Seam 3 — Board/detail/Worker consumer migration

Production: `server/list-adapters.js`, `server/worker/attach.js`,
`server/worker/bd-metadata.js`, `server/worker/runnable-cache.js`,
`server/worker/title-cache.js`, `server/worker/revise-parked.js`.

Test targets: 기존 `server/list-adapters.test.js`, `server/worker/attach.test.js`,
`server/worker/bd-metadata.test.js`, `server/worker/runnable-cache.test.js`,
`server/worker/title-cache.test.js`, `server/worker/revise-parked.test.js`.

- Board/detail의 envelope 결과가 bare 결과와 같은 issue data/count를 만든다.
- blocked stored/explain 중 malformed payload가 empty Board 성공이 되지 않는다.
- Worker admission/cache/attach/metadata/find/children/scan이 envelope를 정상 소비한다.
- protocol failure가 negative cache, empty child set, absent metadata로 바뀌지 않는다.

Deterministic RED: list adapter의 known 18-row fixture를 envelope로 감싸면 현재 count가 0이고,
각 Worker test의 bare success payload를 같은 envelope로 감싸면 throw 또는 negative/empty cache로
바뀐다. protocol failure가 cache write를 호출하지 않는 assertion도 현재 실패한다.

```bash
npx vitest run server/list-adapters.test.js server/worker/attach.test.js server/worker/bd-metadata.test.js server/worker/runnable-cache.test.js server/worker/title-cache.test.js server/worker/revise-parked.test.js
```

### Seam 4 — mutation/readback/comments

Production: `server/ws/mutation-handlers.js`, `server/ws/exec-preset-handlers.js`,
`server/ws/context.js`, comments handler.

Test targets: 기존 `server/ws.mutations.test.js`, `server/ws.comments.test.js`,
`server/ws.labels.test.js`, `server/ws/exec-preset-apply.test.js`.

- 모든 show readback은 normalized single issue와 exact id를 반환한다.
- invalid JSON/envelope/shape가 undefined 또는 raw envelope success로 전송되지 않는다.
- write success/readback failure는 `bd_readback_failed`, `write_applied:true`,
  `retry_safe:false`다.
- comments read와 add readback은 array shape를 보존한다.

Deterministic RED: 기존 successful write fixture의 show/comments readback을 envelope 또는 invalid
JSON result로 바꾸면 현재 handler가 raw envelope, `undefined`, 또는 `[]`를 success로 전송한다.
새 assertion은 normalized issue/array 또는 typed `bd_readback_failed`를 요구한다.

```bash
npx vitest run server/ws.mutations.test.js server/ws.comments.test.js server/ws.labels.test.js server/ws/exec-preset-apply.test.js
```

### Seam 5 — health capability

Production: 새 `server/bd-capability.js`, `server/health.js`, `server/app.js`, effect preflight,
`scripts/managed-self-deploy.js`.

Test targets: 새 `server/bd-capability.test.js`, 기존 `server/healthz.test.js`,
`scripts/managed-self-deploy.test.js`, `server/worker/deployment-reconciler.integration.test.js`.

- env를 제거한 default와 opt-in envelope의 version/list probe가 모두 typed Adapter를 통과한다.
- fixture의 version 문자열을 바꿔도 한 probe 안의 두 mode가 서로 일치하고 capability가 같으면
  healthy다.
- unknown schema, invalid version shape, timeout/non-zero는 stable reason과 503이다.
- 기존 `checks.bd` boolean과 worker/db fields는 유지되고 diagnostics만 additive다.
- runtime protocol failure와 same-workspace/same-family recovery가 health에 반영되고 다른
  workspace의 성공이 이를 지우지 않는다.
- 해당 workspace preflight가 red인 동안 mutation write와 Worker effect가 시작되지 않지만
  healthy workspace는 aggregate health red만으로 차단되지 않는다.
- managed deploy는 identity가 맞아도 bd diagnostics가 없거나 red면 receipt를 쓰지 않는다.

Deterministic RED: `server/healthz.test.js`의 structured dual-mode probe expectation은 현재 boolean
`bd --version` 결과 때문에 실패한다. `scripts/managed-self-deploy.test.js`는 현재
`{ok:true,runtime}`만으로 health를 승인하므로 diagnostics 누락 거부 assertion이 실패한다.

```bash
npx vitest run server/bd-capability.test.js server/healthz.test.js scripts/managed-self-deploy.test.js server/worker/deployment-reconciler.integration.test.js
```

### Seam 6 — ownership과 inventory

Production/doc: `docs/bd-json-compatibility.md`와 production consumer imports.

Test target: 새 `server/bd-json-ownership.test.js`.

- production code의 raw `runBdJson`/raw parsed payload 접근은 승인된 bridge/Adapter 파일로
  제한한다.
- 새 bd JSON caller가 typed Adapter와 compatibility matrix 없이 추가되면 test가 실패한다.
- NUL-containing `revise-parked.js`도 inventory에 포함된다.

Deterministic RED: static test는 `rg --text`와 명시 production allowlist를 사용해 현재
`unwrapShowJson`, raw `stdoutJson`, ad-hoc array/object unwrap 위치를 보고한다. 현재 inventory가
allowlist 밖 접근을 포함하므로 assertion이 실패하며 NUL file도 scan count에 포함한다.

```bash
npx vitest run server/bd-json-ownership.test.js
```

### Seam 7 — disposable central-server smoke

Production/test targets: 새 `scripts/bd-json-smoke.js`, 새 `scripts/bd-json-smoke.test.js`,
`package.json`의 `smoke:bd-json` script.

새 `npm run smoke:bd-json`은 다음 절차를 수행한다.

1. `mkdtemp` 아래 temp root, temp Git workspace, temp HOME/XDG/config/runtime을 만든다.
2. inherited `BEADS_DB`, bd server/socket/port override, `BD_JSON_ENVELOPE`를 제거하고 `BD_BIN`과
   `dolt` executable을 read-only로 resolve한다.
3. temp data dir와 temp Unix socket으로 `dolt sql-server --port=-1`을 시작하고 bounded
   readiness를 확인한다. shared port `13307`과 live `.beads/metadata.json`은 읽거나 사용하지
   않는다.
4. temp workspace 안에서만 explicit
   `bd init --server --external --server-socket <socket> --non-interactive --skip-agents --skip-hooks`
   를 실행한다.
5. disposable issue와 comment를 생성하고 bare/envelope의 list/show/comments, Board adapter,
   Worker metadata, `/healthz` normalized result를 대조한다.
6. `finally`에서 exact child PID를 TERM 후 bounded KILL하고 exact temp root만 제거한다.
7. 시작/종료 시 본 저장소 HEAD와 porcelain snapshot이 동일한지 확인한다.

preflight가 executable, temp ownership, socket path, cwd isolation 중 하나라도 확인하지 못하면
live fallback 없이 smoke를 거부한다.

Deterministic RED: 먼저 test-only smoke harness와 package command를 추가해 current production
adapter를 실행한다. disposable issue의 default Board count와 envelope Board count가 달라 equality
assertion에서 실패해야 하며, executable/env 조건으로 skip한 결과는 RED evidence가 아니다.

```bash
npx vitest run scripts/bd-json-smoke.test.js
npm run smoke:bd-json
```

## 10. 구현 phase

### Phase 1 — Adapter와 fixture

- `server/bd-json.js`와 discriminated `runBdJson()` contract
- `server/bd-capability.js`의 canonical workspace identity와 bounded observation store
- native/legacy/envelope/unknown regression fixture
- transport, projection, error vocabulary tests
- raw consumer ownership guard의 초기 allowlist

### Phase 2 — consumer와 health migration

- Board/detail/Worker/WS mutation/comments/exec preset 전체 migration
- protocol failure와 existing optional error policy 분리
- dual-mode capability probe, workspace-scoped protocol observation, `/healthz` diagnostics
- focused consumer/health regression

### Phase 3 — integration과 문서

- disposable central-server smoke와 package script
- `docs/bd-json-compatibility.md` inventory/matrix
- managed deploy의 bd diagnostics validation과 durable receipt outcome
- full verification, PR delivery, merged runtime validation

각 phase는 앞 phase의 reviewed contract를 입력으로 사용하는 순차 phase다. 구현 계획은 phase별
파일, RED test, migration order와 verification command를 더 세분화한다.

## 11. Verification과 delivery

pre-handoff 순서는 다음과 같다.

1. Adapter와 migrated consumer focused tests
2. `npm run smoke:bd-json`
3. `npm run tsc`
4. `npm test`
5. `npm run lint`
6. `npm run prettier:write`
7. `git diff --check`
8. owned diff와 `git status --short` 전체 확인

frontend source를 변경하지 않으므로 `npm run build`와 bundle update는 이 구현 범위에 없다.
구현 중 frontend를 건드리게 되면 scope mismatch로 re-plan하고 build/bundle 검증을 추가한다.

PR은 writable `origin`의 `nakkulla/beads-ui`를 대상으로 한다. 이 fork의 GitHub checks가
비어 있으면 repository 계약에 따라 vacuous pass로 처리하되 local verification evidence를 PR과
Bead에 남긴다.

merge 뒤 실행 순서는 다음으로 고정한다.

1. pinned merged SHA에서 `docs/agents/repo-ops.toml`의
   `adapter="managed"`, `cmd=["scripts/managed-self-deploy.js"]` 선언을 읽는다.
2. Worker deployment reconciler가 그 exact candidate release의 managed Adapter를 실행해 dependency
   install, pointer cutover와 restart handoff를 수행한다.
3. Adapter는 private runtime marker의 source path/SHA/PID/start time/instance/host/port와 같은
   address의 `/healthz` runtime identity를 비교한다.
4. 같은 health body의 `diagnostics.bd`에서 non-empty exact version, healthy default/opt-in
   producer observations, `bare`와 `envelope_v2` consumer support, primary workspace probe green,
   active protocol failure 0을 확인한다.
5. 위 identity와 bd diagnostics가 모두 green일 때만 bounded diagnostic digest와
   `bd_capability_readback: success` action outcome을 terminal deploy receipt에 기록한다.
6. controller는 receipt와 live process path·port·HTTP body가 merged SHA와 일치하는지 read-only로
   확인한 뒤 완료를 선언한다.

중단이 receipt 전이면 같은 attempt의 managed Adapter 재호출이 journal/marker/pointer를 읽고
restart 중복 없이 3단계부터 복구한다. identity 또는 bd diagnostics가 red면 receipt를 쓰지 않고
`awaiting_runtime`/typed managed failure로 남아 재호출 가능하다. 직접 `bdui-shared restart`와 수동
diagnostics 확인은 required delivery transport가 아니며 별도 운영 recovery가 명시적으로 선택한
경우에만 사용한다.

세 phase의 code, managed Adapter 보강과 test는 모두 현재 UI-jl9v PR에 포함되고 post-merge work는
위 `[deploy]` declaration과 receipt가 운반한다. required no-PR residue가 없으므로
`worker-ineligible` label은 추가하지 않는다.

## 12. 수용 기준

- 기본 bare와 `BD_JSON_ENVELOPE=1`의 list/show/comments가 같은 normalized data를 만든다.
- unknown schema/shape/invalid JSON은 empty/absent/success로 오인되지 않고 stable error로
  fail-closed한다.
- Board/detail/Worker admission/cache/attach/metadata/mutation/comments가 한 transport 경계와
  typed projection을 사용한다.
- native `issue.spec_id`, legacy metadata fallback, equal/conflict dual semantics가 유지된다.
- `/healthz`가 exact bd version과 observed capability/schema를 진단하고 incompatible protocol에
  503을 반환한다.
- workspace protocol failure는 canonical workspace/family로 격리되고 다른 workspace 성공으로
  지워지거나 effect gate에 전파되지 않는다.
- disposable central-server smoke가 live DB, shared port, operator config를 사용하지 않고
  bare/envelope 핵심 경로를 검증한다.
- `docs/bd-json-compatibility.md`와 ownership test가 production consumer inventory를 고정한다.
- focused tests, smoke, tsc, full tests, lint, formatter, diff check가 통과한다.
- merge 뒤 managed deploy receipt가 exact runtime identity와 green bd diagnostics를 함께 증명하고,
  controller process path·port·HTTP readback이 통과한다.

## 13. 비-목표

- bd binary upgrade, fork release 또는 upstream JSON schema 변경
- dotfiles workflow 계약·label·metadata vocabulary 변경
- `spec_id` precedence 또는 conflict semantics 변경
- frontend health banner/card 추가
- live Beads DB migration, repair, sync, pull, push
- runtime에서 `BD_JSON_ENVELOPE=1`을 모든 command에 강제
- unsupported future schema를 추측해 best-effort로 해석
- raw JSON/JSONL streaming command (`bd export` 등)의 새 지원

## 14. 검토한 대안

### Envelope 해제만 중앙화

diff는 작지만 caller별 shape 검사, mutation false-success, optional failure와 protocol failure 혼합이
남는다. 전체 consumer 정합과 fail-closed 수용 기준을 충족하지 못해 채택하지 않는다.

### v2 envelope 강제

미래 default와 가까워지지만 legacy bare 지원을 약화하고 shared wrapper를 우회하는 command까지
같은 형식이라고 가정하게 된다. 이 Bead는 producer mode를 강제하지 않고 두 format을 동일한
consumer contract로 흡수한다.

### semantic version floor

단순하지만 fork/backport build를 오탐하고 실제 JSON capability를 증명하지 못한다. version은
진단으로만 보고하고 동일 Adapter를 통한 capability probe를 authority로 사용한다.
