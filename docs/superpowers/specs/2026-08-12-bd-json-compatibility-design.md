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
| `version --json` | capability health probe | version object | version capability | fail-closed/503 |
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

`server/worker/revise-parked.js`는 파일 안의 NUL 문자 때문에 기본 `rg`가 binary로 건너뛸 수
있다. consumer inventory 검증은 `rg --text` 또는 명시 파일 목록을 사용한다.

## 5. Architecture

### 5.1 Module 경계

새 leaf module `server/bd-json.js`가 순수 normalization과 typed projection을 소유한다.
`server/bd.js`는 process 실행과 JSON syntax parse 뒤 이 module의 transport normalizer를
호출한다. caller는 raw stdout이나 raw parsed envelope를 직접 읽지 않는다.

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

diagnostic은 command family, expected/actual top-level type, schema number, exit code, 기존
`stderrTail()`의 bounded 한 줄만 포함한다. issue/comment raw payload, description, notes,
credential-bearing env/config는 기록하지 않는다.

기존 fail-quiet 정책은 ordinary optional command failure에만 적용한다. protocol error를 empty,
absent, stale cache, success로 바꾸는 fallback은 금지한다.

## 8. Capability-first health

`server/health.js`에 process-shared `probeBdCapabilities()`를 둔다. probe는 global env를 mutate하지
않고 해당 subprocess에만 `BD_JSON_ENVELOPE=1`을 강제해 `bd version --json`을 실행한다.

- schema v2 envelope와 non-empty string `version`이면 `envelope_v2` capability다.
- env를 무시하는 historical CLI가 valid bare version object를 반환하면 `legacy_bare`
  capability로 인정한다.
- semantic version 문자열의 최소값은 강제하지 않는다.
- invalid JSON, unsupported schema, invalid version shape, timeout/non-zero는 unhealthy다.
- probe timeout은 2초, success cache TTL은 60초다.

runtime protocol observation은 command family별로 마지막 failure를 보관한다. 같은 family의
다음 정상 normalized response가 해당 failure를 지운다. active protocol failure가 있으면
capability probe가 성공해도 bd health는 red다. version/probe failure는 cache를 즉시
무효화한다.

mutation write와 Worker dispatch/cleanup effect는 실행 전에 shared
`requireBdJsonCapability()`를 통과해야 한다. capability probe나 active protocol observation이
red면 bd write 또는 Worker effect를 시작하지 않는다. read-only operation은 typed diagnostic을
만들기 위해 실행할 수 있지만 실패를 empty/success로 바꾸지 않는다. 아직 알 수 없던 command
shape가 write 뒤 readback에서 처음 드러난 경우에만 §6.3의 `write_applied:true` 경로를 사용한다.

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
      "observed_format": "envelope",
      "schema_version": 2,
      "capabilities": ["legacy_bare", "envelope_v2"],
      "error": null
    }
  }
}
```

`observed_format`은 probe가 실제로 받은 CLI transport이고, `capabilities`는 현재 consumer가
검증해 지원하는 format 목록이다.

bd capability 또는 active protocol observation이 실패하면 `checks.bd=false`, 전체 `ok=false`,
HTTP 503이다. 서버는 `/healthz` 진단을 제공하기 위해 listen 상태를 유지하지만 Board, Worker,
mutation은 typed error로 effect를 진행하지 않는다. frontend health UI는 추가하지 않는다.

## 9. Test scope

이 절의 seam만 `UI-jl9v` 구현의 RED→GREEN authority다.

### Seam 1 — transport와 result contract

대상: `server/bd-json.js`, `server/bd.js`, golden fixture.

- bare array, bare object, legacy single-item array, schema v2 envelope가 원래 payload를 보존한다.
- bare object의 embedded `schema_version`을 envelope로 오인하지 않는다.
- unknown schema, malformed envelope, invalid JSON이 explicit failure다.
- `runBdJson()`은 어떤 failure에서도 `ok:true`나 missing data success를 만들지 않는다.

RED 소재: 현재 envelope unwrap이 없고 invalid JSON도 top-level `code=0`이다.

### Seam 2 — issue와 command projection

대상: issue/list/ready/ready-explain/dependency/comments/version Adapter.

- native bare issue, metadata-only legacy issue, equal dual spec issue, conflict dual spec issue가
  envelope 유무와 무관하게 기존 `resolveSpecId()` 의미를 유지한다.
- list/show/comments의 bare와 envelope 결과가 deep-equal이다.
- scalar, wrong container, invalid row, missing/mismatched id는 fail-closed한다.
- dependency single-id issue rows와 multi-id edge rows를 보존한다.

RED 소재: 현재 각 caller가 array/object를 서로 다르게 해석한다.

### Seam 3 — Board/detail/Worker consumer migration

대상: list adapters와 모든 Worker consumer group.

- Board/detail의 envelope 결과가 bare 결과와 같은 issue data/count를 만든다.
- blocked stored/explain 중 malformed payload가 empty Board 성공이 되지 않는다.
- Worker admission/cache/attach/metadata/find/children/scan이 envelope를 정상 소비한다.
- protocol failure가 negative cache, empty child set, absent metadata로 바뀌지 않는다.

RED 소재: Board count 18 대 0 재현과 Worker별 상이한 실패 의미가 존재한다.

### Seam 4 — mutation/readback/comments

대상: WS mutation handlers, exec preset handler, comments handler.

- 모든 show readback은 normalized single issue와 exact id를 반환한다.
- invalid JSON/envelope/shape가 undefined 또는 raw envelope success로 전송되지 않는다.
- write success/readback failure는 `bd_readback_failed`, `write_applied:true`,
  `retry_safe:false`다.
- comments read와 add readback은 array shape를 보존한다.

RED 소재: 다수 mutation이 `code`만 검사하고 raw `stdoutJson`을 성공으로 반환한다.

### Seam 5 — health capability

대상: `server/health.js`, `server/app.js`, `/healthz` tests.

- envelope v2와 valid legacy bare version probe는 healthy다.
- semantic version 문자열만 달라도 capability가 같으면 healthy다.
- unknown schema, invalid version shape, timeout/non-zero는 stable reason과 503이다.
- 기존 `checks.bd` boolean과 worker/db fields는 유지되고 diagnostics만 additive다.
- runtime protocol failure와 same-family recovery가 health에 반영된다.
- health가 red인 동안 mutation write와 Worker effect가 시작되지 않는다.

RED 소재: 현재 `bd --version` exit 0만 확인하고 version/schema/capability를 버린다.

### Seam 6 — ownership과 inventory

대상: `docs/bd-json-compatibility.md`, static ownership test.

- production code의 raw `runBdJson`/raw parsed payload 접근은 승인된 bridge/Adapter 파일로
  제한한다.
- 새 bd JSON caller가 typed Adapter와 compatibility matrix 없이 추가되면 test가 실패한다.
- NUL-containing `revise-parked.js`도 inventory에 포함된다.

RED 소재: 현재 generic parser와 ad-hoc unwrap이 여러 파일에 분산돼 있다.

### Seam 7 — disposable central-server smoke

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

## 10. 구현 phase

### Phase 1 — Adapter와 fixture

- `server/bd-json.js`와 discriminated `runBdJson()` contract
- native/legacy/envelope/unknown regression fixture
- transport, projection, error vocabulary tests
- raw consumer ownership guard의 초기 allowlist

### Phase 2 — consumer와 health migration

- Board/detail/Worker/WS mutation/comments/exec preset 전체 migration
- protocol failure와 existing optional error policy 분리
- capability probe, runtime protocol observation, `/healthz` diagnostics
- focused consumer/health regression

### Phase 3 — integration과 문서

- disposable central-server smoke와 package script
- `docs/bd-json-compatibility.md` inventory/matrix
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

merge 뒤 merged checkout에서 `docs/agents/repo-ops.toml`의 `[deploy]` 선언을 확인하고
`bdui-shared restart`를 실행한다. 실제 process path, listening port, `/healthz` HTTP response와
bd diagnostics가 merged SHA의 코드와 일치해야 완료다. 자동 deploy가 실행됐어도 이 readback은
생략하지 않는다.

## 12. 수용 기준

- 기본 bare와 `BD_JSON_ENVELOPE=1`의 list/show/comments가 같은 normalized data를 만든다.
- unknown schema/shape/invalid JSON은 empty/absent/success로 오인되지 않고 stable error로
  fail-closed한다.
- Board/detail/Worker admission/cache/attach/metadata/mutation/comments가 한 transport 경계와
  typed projection을 사용한다.
- native `issue.spec_id`, legacy metadata fallback, equal/conflict dual semantics가 유지된다.
- `/healthz`가 exact bd version과 observed capability/schema를 진단하고 incompatible protocol에
  503을 반환한다.
- disposable central-server smoke가 live DB, shared port, operator config를 사용하지 않고
  bare/envelope 핵심 경로를 검증한다.
- `docs/bd-json-compatibility.md`와 ownership test가 production consumer inventory를 고정한다.
- focused tests, smoke, tsc, full tests, lint, formatter, diff check가 통과한다.
- merge 뒤 shared service가 merged checkout에서 재시작되고 process path·port·HTTP readback이
  통과한다.

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
