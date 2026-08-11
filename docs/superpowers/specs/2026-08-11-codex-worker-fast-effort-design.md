# Codex Worker Fast·max·ultra 지원 설계

- 날짜: 2026-08-11
- 소비자 저장소: `beads-ui`
- canonical provider: `dotfiles/docs/contracts/workflow.{yaml,md}`
- 관련 provider 스펙: `dotfiles/docs/superpowers/specs/2026-08-11-worker-codex-speed-contract-design.md`

## 배경과 목적

beads-ui Worker의 Codex adapter는 모델과 `model_reasoning_effort`만 launch argv에 전달한다. Builtin runner catalog는 Sol·Terra를 `low..xhigh`, Luna만 `low..max`로 제한하며 speed capability를 표현하지 않는다. 반면 설치된 Codex 0.147.0 catalog는 Sol·Terra에 `max`·`ultra`, Luna에 `max`를 광고하고 세 모델 모두 Fast를 지원한다.

목적은 outer Worker session에서만 이 capability를 정확히 선택하고, Bead·workspace 기본값·공용 preset·attempt resume 전체에서 동일한 launch tuple을 재현하는 것이다. 구현 하위 에이전트와 review effort 계약은 넓히지 않는다.

## 확정된 결정

1. 새 exec key는 `orchestration_speed=default|fast`다. `workflow_mode=fast_track`과 별개다.
2. Standard가 기본이며 Fast는 opt-in이다. 명시적 `default`는 상위 Fast 기본값을 이슈 단위로 끌 수 있다.
3. Fast는 per-bead, workspace default, shared preset, attempt snapshot에 모두 포함한다.
4. Outer effort capability와 implementation effort capability를 catalog에서 분리한다.
5. Outer matrix는 Sol/Terra `low..ultra`, Luna `low..max`다. Luna `ultra`는 거부한다.
6. Review effort는 `low|medium|high|xhigh`, `impl_effort`는 현재 model/runtime vocabulary를 그대로 유지한다.
7. Codex adapter는 effective speed가 `default`여도 per-run `service_tier`를 명시해 global/project config drift를 차단한다.
8. Invalid model/effort/speed tuple은 fallback 없이 spawn 전에 실패한다.

## Catalog 설계

`CatalogModel`에 outer 전용 capability를 추가한다.

```js
{
  id: 'gpt-5.6-sol',
  efforts: ['low', 'medium', 'high', 'xhigh'],
  orchestration_efforts: ['low', 'medium', 'high', 'xhigh', 'max', 'ultra'],
  speed_tiers: ['default', 'fast']
}
```

필드 의미는 다음과 같다.

- `efforts`: 기존 implementation target과 legacy catalog consumer가 사용하는 목록
- `orchestration_efforts`: outer Worker 전용 목록. 부재 시 `efforts`로 fallback
- `speed_tiers`: outer Worker가 지원하는 speed 목록. 부재 시 `['default']`

Builtin Codex matrix:

| 모델 | `efforts` 유지값 | `orchestration_efforts` | `speed_tiers` |
| --- | --- | --- | --- |
| `sol` | `low,medium,high,xhigh` | `low,medium,high,xhigh,max,ultra` | `default,fast` |
| `terra` | `low,medium,high,xhigh` | `low,medium,high,xhigh,max,ultra` | `default,fast` |
| `luna` | `low,medium,high,xhigh,max` | `low,medium,high,xhigh,max` | `default,fast` |

Claude builtin models는 기존 `efforts`를 outer 목록으로 재사용하고 speed는 `default`만 허용한다.

`[runner.<name>.models.<model>]` config override도 두 새 string-array 필드를 지원한다. 잘못된 필드는 해당 override만 무시하고 경고하며, builtin/다른 필드는 보존한다. Resolved catalog snapshot이 server policy·adapter·detail UI·Worker dialog·Monitor의 단일 source다.

새 helper 책임:

- `modelOrchestrationEfforts(catalog, model)`
- `catalogOrchestrationEfforts(catalog)`
- `modelSpeedTiers(catalog, model)`
- `catalogSpeedTiers(catalog)`

기존 `modelEfforts`·`catalogEfforts`는 implementation 의미를 유지한다.

구현 entry에서는 `codex debug models --bundled`를 read-only로 다시 실행해 Sol/Terra/Luna의 effort와 Fast 광고값이 이 matrix와 일치하는지 확인한다. 지원 범위가 달라졌으면 builtin 값을 추측하거나 조용히 축소하지 않고 설계 전제 mismatch로 멈춘다.

## Exec 설정과 validation

`EXEC_SETTING_KEYS`는 11개에서 12개가 되며 순서는 다음과 같다.

```text
orchestration_model
orchestration_effort
orchestration_speed
spec_review_model / spec_review_effort
plan_review_model / plan_review_effort
impl_review_model / impl_review_effort
impl_runtime / impl_model / impl_effort
```

`execSettingEnums()`는 key별 vocabulary를 분리한다.

- `orchestration_effort`: `catalogOrchestrationEfforts()` union
- `orchestration_speed`: `catalogSpeedTiers()` union
- `impl_effort`: 기존 `catalogEfforts()` union
- review effort: 고정 `REVIEW_EFFORTS`

`resolveExecSettings()`는 model을 먼저 확정한 뒤 outer effort와 speed를 해당 모델의 capability로 검증한다.

- key 부재: Bead → workspace default → final fallback 순서
- effort final fallback: unset, 기존 CLI/model default 사용
- speed final fallback: `default`
- 명시적으로 선택된 effort가 모델에서 지원되지 않음: `illegal_orchestration_effort`
- 명시적으로 선택된 speed가 모델에서 지원되지 않음: `illegal_orchestration_speed`
- outer invalid reason이 있으면 impl validation보다 먼저 보고하고 scheduler가 spawn 전에 attempt를 실패 처리한다.

기존에 잘못된 `orchestration_effort`가 낮은 precedence 값으로 조용히 내려가던 동작은 종료한다. 명시적 선택과 실제 launch가 달라지는 것보다 사용자가 비호환 값을 수정하도록 막는 것이 우선이다.

Per-key Bead 편집은 현재 mutation API를 유지한다. 모델 변경으로 기존 effort/speed가 비호환이 되면 UI가 `(비호환)`을 표시하고 Worker dispatch를 차단한다. Workspace default와 preset 저장은 현재 full-settings validation 경계를 재사용한다.

## Persistence와 launch data flow

```text
Bead metadata + workspace defaults/preset
  → resolveExecSettings(model, outer effort, speed)
  → 12-key exec_values + stamped_keys
  → Attempt { runner, model, effort, speed }
  → launchSession settings
  → runner adapter argv
```

다음 경로가 effective speed를 보존한다.

- Bead metadata snapshot과 readback
- workspace exec defaults와 shared preset create/update/apply
- dispatch 전 `exec_values` immutable snapshot
- attempt top-level runtime snapshot
- 일반 dispatch
- cleanup diagnosis fresh launch
- external conflict의 prior runner/model/effort/speed 상속
- resume/conflict/disposition relaunch의 prior tuple verbatim 상속
- attempt started event와 운영 로그의 runtime tuple 표시

Resume 시 현재 Bead/default 값을 다시 해석하지 않는다. 기존 attempt의 speed를 model·effort와 함께 사용한다.

Speed 필드가 없는 legacy attempt는 당시 동작과 같은 `default`로 해석한다. 현재 Bead나 workspace의 Fast 값을 새로 끌어오지 않는다.

## Codex adapter

Codex `buildArgv()`는 effective speed에 따라 정확히 하나를 추가한다.

```text
-c service_tier="default"
-c service_tier="fast"
```

metadata에는 `priority`를 저장하지 않는다. Codex config의 user-facing `fast` alias가 provider request의 `priority`로 매핑되는 책임은 Codex CLI에 둔다.

`features.fast_mode`는 argv에 넣지 않는다. 설치된 runtime에서 stable default-on이며, Worker는 catalog capability와 `service_tier` override만 사용한다. Unknown speed가 adapter까지 도달하면 programmer error로 spawn spec 생성을 거부한다.

Claude adapter는 `default`만 허용하며 별도 speed argv를 생성하지 않는다.

## UI

공용 `execSettingRows()`에 orchestration effort 다음으로 speed 행을 추가한다.

- 제목: `워커 실행 속도`
- 보조 key: `orchestration_speed`
- `default` label: `Standard`
- `fast` label: `Fast`
- 도움말: `Fast는 지원 모델을 더 빠르게 실행하며 사용량 비용이 증가합니다.`
- fallback label: `(기본: Standard)`

선택된 모델의 `speed_tiers`만 표시한다. Claude model은 Standard만, Codex Sol/Terra/Luna는 Standard/Fast를 표시한다. 구체적인 속도·credit 배율은 UI에 고정하지 않는다.

상세 panel, workspace default, shared preset editor가 같은 row builder를 재사용한다. 다음 고정 문구와 count를 11→12로 갱신한다.

- preset 지정 개수
- `12개 설정 적용`
- protocol·mutation JSDoc의 canonical key count

Monitor가 전달하는 runner catalog와 preset snapshot도 새 capability를 그대로 보존한다. 별도 Monitor 전용 editor는 추가하지 않는다.

## 오류와 호환성

- Workspace `exec_defaults` normalize는 resolved enum 밖의 speed를 제거한다. Shared preset은 알려진 key의 문자열을 보존하되 비호환으로 표시하고, Bead metadata는 raw 문자열을 진단·UI에 남기되 dispatch에서 invalid reason으로 차단한다.
- Stale Bead metadata/preset의 Luna+ultra, Claude+fast 조합은 spawn 전에 실패하고 정확한 invalid reason을 노출한다.
- Catalog override가 Fast를 제거하면 기존 Fast preset을 Standard로 강등하지 않는다. 사용자가 수정할 때까지 비호환으로 표시한다.
- Codex가 runtime에서 advertised tier를 거부하면 adapter process failure를 기존 attempt 실패 경로로 노출한다. Claude나 Standard로 fallback하지 않는다.
- `fast_track` prompt, workflow review 선택, implementation selector에는 speed를 전달하지 않는다.
- Usage response의 `service_tier`는 비용/품질 receipt가 아니므로 기존 usage normalization처럼 저장하지 않는다.

## Cross-repo 착륙과 배포

이 저장소는 dotfiles provider unit과 별도 Bead·branch·PR을 사용한다. Dotfiles 계약과 runtime install이 완료되기 전에는 beads-ui implementation을 merge/deploy하지 않는다.

착륙 순서:

1. dotfiles contract PR merge와 affected runtime install/readback
2. beads-ui implementation PR merge
3. merged checkout에서 frontend build 포함 full verification 확인
4. `bdui-shared restart`
5. process path·listening port·HTTP response 확인
6. disposable 환경에서 Standard와 Fast Codex launch를 각각 bounded smoke하고 effective argv/정상 종료를 확인

## 수용 기준

- Sol/Terra outer effort selector에 `max`·`ultra`, Luna에 `max`가 나타나며 Luna에는 `ultra`가 나타나지 않는다.
- `impl_effort`와 review effort option은 변경 전과 동일하다.
- Codex 모델은 Standard/Fast를, Claude 모델은 Standard만 선택할 수 있다.
- `orchestration_speed`가 Bead·workspace default·preset·12-key `exec_values`에 왕복한다.
- 모든 relaunch가 prior attempt의 runner/model/effort/speed를 함께 상속한다.
- Standard와 Fast 모두 explicit `service_tier` override를 사용한다.
- Invalid model/effort/speed tuple은 spawn 전에 실패하고 다른 모델·effort·speed로 강등되지 않는다.
- UI가 Fast의 추가 사용량 비용을 설명하고 stale capability를 비호환으로 표시한다.
- shared service가 merged checkout에서 재시작되고 process·port·HTTP 검증과 bounded Codex smoke를 통과한다.

## 비-목표

- `impl_effort=ultra`
- review effort `max|ultra`
- implementation/review speed key
- `implement-codex`, `codex-runner-bridge`, native `spawn_agent` schema 변경
- Ductor·Thalamus 설정 변경
- global Codex effort·speed default policy 변경 또는 검증(별도 dotfiles runtime authority)
- `workflow_mode=fast_track` 의미 변경
- API usage의 service tier receipt 저장
- app-server JSON-RPC 전환

## Test scope

다음 seam은 구현 전 실패하는 RED→GREEN 대상이다.

1. **Catalog seam**: builtin outer effort/speed matrix, legacy `efforts` fallback, config override merge/validation, implementation effort 목록 불변.
2. **Enum/policy seam**: 12-key enum, outer/impl effort union 분리, speed union, Standard fallback, invalid Luna+ultra와 Claude+fast의 deterministic reason.
3. **Persistence seam**: Bead snapshot, defaults, preset create/update/apply, stamped key revert, queue normalize, 12-key `exec_values`, attempt speed 왕복.
4. **Scheduler seam**: 일반 dispatch, cleanup, external conflict, resume/conflict/disposition relaunch가 올바른 speed를 launch settings에 전달하거나 prior tuple을 상속.
5. **Adapter seam**: Codex Standard/Fast argv, unknown speed 거부, Claude default-only 동작, 기존 model/effort/resume argv 회귀 없음.
6. **UI seam**: model별 outer effort/speed narrowing, 비호환 표시, Fast 비용 문구, detail/default/preset 공용 row, 12-count 문구.
7. **Snapshot seam**: Worker와 Monitor의 resolved catalog serialization이 새 capability를 보존.
8. **Runtime seam**: merged shared service process·port·HTTP와 bounded Standard/Fast Codex smoke.

Pre-handoff 회귀 검증은 `npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`, `npm run build`를 수행하며 frontend bundle과 source map을 implementation commit에 포함한다.
