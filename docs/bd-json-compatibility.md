# bd JSON 호환성 매트릭스

이 문서는 beads-ui가 `bd --json` 출력을 소비하는 경계를 고정한다. 소유 Bead는
`UI-jl9v`이고 설계는
`docs/superpowers/specs/2026-08-17-bd-json-compatibility-design.md`다.
`server/bd-json-ownership.test.js`가 이 문서와 코드의 일치를 강제하므로, 새 bd
JSON 소비자를 추가하면 아래 표에도 함께 올려야 한다.

## 전송 형식

bd는 기본적으로 legacy bare JSON을 출력하고, `BD_JSON_ENVELOPE=1`이면 schema v2
envelope로 감싼다.

```json
{ "schema_version": 2, "data": "<legacy payload>" }
```

`schema_version`만으로는 envelope를 판정할 수 없다. bare object도 자기 필드로
`schema_version`을 가질 수 있기 때문이다(`bd version --json`이 그렇다). 따라서
**own `data` 필드가 있을 때만** envelope 후보로 보고, 그때 integer
`schema_version === 2`를 요구한다.

두 모드의 payload는 **transport marker의 위치를 빼면 동일하다**: bare object는
`schema_version`을 자기 필드로 갖고, envelope는 그 마커를 바깥 wrapper로 옮긴다.
parity 비교는 이 차이를 제외하고 수행한다.

소비자가 지원하는 형식은 `bare`와 `envelope_v2` 둘뿐이다. 그 밖의 schema는
추측해서 해석하지 않고 `bd_json_schema_unsupported`로 fail-closed한다.

## 경계 소유권

| 계층                   | 모듈                                             | 책임                                                                                                                                      |
| ---------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| transport + projection | `server/bd-json.js`                              | 순수 함수. envelope 해제와 command family별 최소 identity 검증. I/O 없음, 입력 mutate 없음                                                |
| observation owner      | `server/bd.js`의 `runBdJsonProjected()`          | 유일한 관측 지점. transport 결과와 projection 결과를 모두 `{workspace_key, command_family}` observation으로 기록한 뒤에만 소비자에게 반환 |
| capability state       | `server/bd-capability.js`                        | canonical workspace identity, dual-mode probe, bounded protocol observation store. `server/bd.js`를 import하지 않는다                     |
| health                 | `server/health.js` → `/healthz` `diagnostics.bd` | producer 관측·consumer 지원 형식·workspace probe·active failure 집계                                                                      |
| effect gate            | `requireBdJsonCapability()`                      | mutation write와 Worker effect의 사전 판정. workspace별로 격리된다                                                                        |

소비자는 `runBdJsonProjected(command_family, args, options)`만 호출한다. command
family가 곧 projector이므로 소비자가 projector를 직접 고르거나 호출하지 않는다.

## Command family 매트릭스

| Command family           | 인자 예                                             | projector                        | 허용 payload                                                                | 주요 consumer                                                                                                                                                                                                                 | 오류 정책                                                                                           |
| ------------------------ | --------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `list`                   | `list --json …`                                     | issue-list                       | issue 배열, 각 행에 non-empty string `id`                                   | `server/workspace-snapshot-coordinator.js`, `server/list-adapters.js`, `server/worker/bd-metadata.js`, `server/worker/runnable-cache.js`                                                                                      | fail-closed                                                                                         |
| `show`                   | `show <id> --json`                                  | issue                            | issue object 또는 legacy 단일 항목 배열, `expected_id` 일치                 | `server/list-adapters.js`, `server/worker/attach.js`, `server/worker/bd-metadata.js`, `server/worker/title-cache.js`, `server/worker/revise-parked.js`, `server/ws/mutation-handlers.js`, `server/ws/exec-preset-handlers.js` | fail-closed                                                                                         |
| `ready`                  | `ready --limit N --json`                            | ready rows                       | issue 배열, historical `{ready}`/`{issues}` 래퍼 허용                       | `server/worker/attach.js`                                                                                                                                                                                                     | fail-closed                                                                                         |
| `ready-explain`          | `ready --explain --json`                            | ready-explain                    | object + `blocked` 배열                                                     | `server/workspace-snapshot-coordinator.js`, `server/list-adapters.js`                                                                                                                                                         | fail-closed                                                                                         |
| `config`                 | `config list --json`                                | config map                       | object. key/value는 추가 호환성을 위해 제한하지 않음                        | `server/ws/monitor-handlers.js`                                                                                                                                                                                               | 조회·shape 실패는 소비자에서 `issue_prefix: null`로 fail-quiet 표시하고 짧은 간격 뒤 재시도         |
| `dep`                    | `dep list <ids> --json`                             | dependency rows                  | 배열. 행마다 edge shape(`issue_id`+`depends_on_id`) 또는 issue shape(`id`)  | `server/workspace-snapshot-coordinator.js`(legacy fallback), `server/list-adapters.js`(provenance)                                                                                                                            | schema/shape는 fail-closed. provenance의 일반 CLI 실패만 기존 fail-quiet 표시 정책 유지             |
| `comments`               | `comments <id> --json`                              | comments                         | 배열. 행마다 non-empty string `id`, string `text`, `expected_issue_id` 일치 | `server/ws/mutation-handlers.js`                                                                                                                                                                                              | fail-closed                                                                                         |
| `version`                | `version --json`                                    | version capability               | object + non-empty string `version`                                         | `server/bd-capability.js`의 dual probe                                                                                                                                                                                        | fail-closed / 503                                                                                   |
| `kv get`                 | `kv get <key> --json`                               | transport 해제 후 kv 도메인 로직 | `{found, key, value}` object. absent key는 valid payload + exit 1           | `server/worker/runtime.js`, `server/ws/context.js`, `server/ws/session-defaults-handlers.js`, `server/ws/exec-preset-handlers.js`                                                                                             | transport/schema는 fail-closed. 값 문자열이 JSON/object가 아닌 경우만 `kv_value_unparsable` warning |
| `kv set` / write command | `update`, `comment`, `label`, `dep add`, `kv set` … | 없음                             | JSON stdout을 소비하지 않는다                                               | 각 mutation handler                                                                                                                                                                                                           | exit/stderr 계약(`runBd`)                                                                           |
| `create --json`          | repair 경로                                         | 없음                             | stdout을 authority로 쓰지 않는다                                            | `server/worker/bd-metadata.js`                                                                                                                                                                                                | 생성 뒤 exact-id readback이 authority                                                               |

`scripts/bd-json-smoke.js`는 이 경계의 소비자가 아니라 검증 도구다. 실제 bd를 두
producer 모드로 돌려 원시 payload를 직접 대조하는 것이 목적이므로 projector를
스스로 호출하며, 그래서 ownership guard의 명시 예외에 올라 있다.

`server/worker/revise-parked.js`는 파일 안에 NUL 문자가 있어 일부 도구가
binary로 건너뛴다. 인벤토리 검증은 Node로 파일을 직접 열거하거나 `rg --text`를
쓴다.

## 오류 어휘

| Code                               | 의미                                                             |
| ---------------------------------- | ---------------------------------------------------------------- |
| `bd_exit_error`                    | bd process가 non-zero로 종료(타임아웃 포함, `details.timed_out`) |
| `bd_json_invalid`                  | stdout이 JSON syntax를 만족하지 않음                             |
| `bd_json_envelope_invalid`         | envelope marker가 있으나 transport 구조가 불완전                 |
| `bd_json_schema_unsupported`       | 지원하지 않는 envelope schema                                    |
| `bd_json_shape_invalid`            | command family의 container/identity 불일치                       |
| `bd_readback_failed`               | write는 적용됐으나 authoritative readback 실패                   |
| `bd_probe_timeout`                 | capability subprocess가 bounded timeout 안에 끝나지 않음         |
| `bd_workspace_identity_unresolved` | canonical root/database identity 확정 실패                       |
| `bd_observation_store_overflow`    | bounded workspace failure store 한도 초과                        |

진단에는 command family, expected/actual top-level type, schema 번호, exit code,
bounded stderr 한 줄만 담는다. issue/comment payload, description, notes,
credential을 담은 env/config는 기록하지 않는다.

`bd_json_*` 계열은 protocol failure다. 이를 빈 목록·absent·성공·stale cache로
바꾸는 fallback은 금지한다. 일반 CLI 실패에만 기존 optional/fail-quiet 정책이
적용된다.

## write 뒤 readback 실패

write가 exit 0으로 끝난 뒤 readback이 실패하면 재시도가 side effect를 중복시킬
수 있다(특히 comment 추가). 이때의 오류는 다음을 함께 싣는다.

```text
code = bd_readback_failed
details.phase = readback
details.write_applied = true
details.retry_safe = false
```

## spec_id 의미

native `issue.spec_id` 우선, `metadata.spec_id` fallback, 두 값이 충돌할 때의
판정은 계속 `server/spec-id.js`가 소유한다. 이 경계는 normalized issue를 전달할
뿐 의미를 바꾸지 않으며, envelope 유무와 무관하게 동일한 결과를 낸다
(`server/bd-json.test.js`의 `spec_id semantics through the adapter`).

## 검증

- `server/bd-json.test.js` — transport와 projector, golden fixture
- `server/bd-capability.test.js` — workspace identity, observation store, dual
  probe
- `server/bd-json-ownership.test.js` — 이 문서와 코드 인벤토리의 일치
- `npm run smoke:bd-json` — 실제 bd + disposable Dolt 서버로 두 모드 parity 확인
- `repo-ops/script/deploy.test.js` — 배포 health probe가 `diagnostics.bd`
  green을 요구
