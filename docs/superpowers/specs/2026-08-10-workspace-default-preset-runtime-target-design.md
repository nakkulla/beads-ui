# 워크스페이스 기본 preset 참조와 구현 runtime UI 설계 (UI-rg4b)

- Bead: `UI-rg4b`
- 선행 Bead: `dotfiles-tnw2`
- 이전 기반: `UI-metq`
- Route: `full_plan`

## 요약

현재 workspace queue가 별도로 저장·편집하는 이름 없는 `exec_defaults`를 제거하고, server-global
실행 preset 하나를 `default_exec_preset_id`로 참조하게 한다. workspace는 preset 값을 복사하지
않으며, dispatch 시점의 최신 preset revision을 사용한다. 따라서 preset을 수정하면 이를 기본으로
선택한 모든 workspace의 이후 dispatch에 자동 반영된다.

dotfiles `dotfiles-tnw2`가 추가하는 `impl_runtime`을 preset과 Bead 실행 설정의 canonical 11번째
키로 소비한다. 구현 runtime을 고르면 구현 model dropdown은 해당 provider의 catalog만 표시한다.
model/effort의 첫 옵션은 자동이며 metadata에는 literal `auto`를 저장하지 않는다. exact model을
고르면 runtime과 model을 함께 원자적으로 저장해 provider 불일치 중간 상태를 만들지 않는다.

Bead 상세에서 preset을 적용하는 기존 UI-metq 동작은 live reference로 바꾸지 않는다. 적용 시
11개 실행 metadata 값을 그대로 복사하고 빠진 키를 unset하므로, 이후 preset 변경은 이미 적용된
Bead에 영향을 주지 않는다. live reference는 workspace default에만 적용한다.

## 배경

UI-metq는 다음 두 계층을 유지한 채 server-global preset과 Bead 전체 적용을 추가했다.

- workspace queue `exec_defaults`: canonical 실행 키 10개의 이름 없는 기본값
- Bead metadata: 같은 10개 키의 issue-level override
- server-global preset: 10개 키의 named value bundle

이 구조에서는 공용 preset을 만들어도 workspace 기본값은 별도 10개 select에서 다시 편집해야
한다. 같은 의미의 값 묶음이 preset store와 각 queue store에 중복되고, preset 변경을 workspace
기본에 반영하려면 사람이 다시 복사해야 한다.

또한 기존 `impl_model`은 Claude와 Codex model을 한 목록에 보여 주지만 provider 선택은 별도
필드가 없다. 사용자는 Codex controller가 Claude implementer에게 위임하는지, Claude controller가
Codex implementer에게 위임하는지 UI만으로 알기 어렵다.

## 목표

- workspace 기본 실행 설정의 source를 named preset reference 하나로 바꾼다.
- preset 수정이 이를 참조하는 workspace의 다음 dispatch에 자동 반영되게 한다.
- `impl_runtime`을 canonical execution setting으로 표시·저장·적용한다.
- runtime 선택에 따라 `impl_model`과 `impl_effort` option을 provider/model catalog로 좁힌다.
- runtime/provider 자동, provider 고정+model 자동, provider+exact model을 모두 표현한다.
- Bead 전체 preset 적용은 기존 copy semantics와 원자 set/unset을 유지한다.
- legacy workspace `exec_defaults`와 기존 model-only preset을 값 손실 없이 migration한다.
- preset reference와 실제 dispatch resolution을 Attempt에 감사 가능한 형태로 기록한다.

## 비목표

- preset을 적용한 Bead와 preset 사이에 live link를 만들지 않는다.
- implementation provider를 phase/unit별로 선택하지 않는다. `impl_runtime`은 Bead 전체 target이다.
- review model UI와 review runtime semantics를 바꾸지 않는다.
- outer Worker runner를 `impl_runtime`으로 선택하지 않는다. controller launch는 계속
  `orchestration_model`이 결정한다.
- provider 실패 시 다른 provider/model로 fallback하지 않는다.
- workspace가 preset 일부를 별도 override하는 두 번째 default layer를 만들지 않는다.
- preset import/export, reorder, sharing ACL, remote catalog discovery를 추가하지 않는다.
- `workflow_mode`를 preset에 포함하지 않는다.
- `dotfiles-tnw2`보다 먼저 임시 consumer key나 독자 semantics를 배포하지 않는다.

## 확정 용어와 사용자 의미

### controller와 implementer

- **controller runtime**: Worker가 `orchestration_model`로 시작한 outer Claude/Codex session
- **implementation runtime**: workflow가 구현 unit을 위임할 Claude/Codex provider
- **implementation model**: 선택 runtime 안에서 실제 구현을 수행할 model

`impl_runtime=inherit`은 controller와 같은 provider를 뜻한다. Claude/Codex 중 작업에 더 맞는
provider를 자동 비교하는 mode가 아니다.

### 자동 model

`impl_model` 미지정은 선택 runtime 안에서 workflow가 unit 난이도에 맞는 harness tier를 고른다는
뜻이다. 예를 들어 runtime이 Codex면 complex/bounded에 따라 Terra/Luna가 달라질 수 있지만 Claude
model로 넘어가지는 않는다. exact model을 선택하면 그 Bead의 모든 implementation unit에 같은
model을 사용한다.

`impl_effort` 미지정은 자동 tier tuple 또는 exact model adapter의 기본 effort를 사용한다.

## canonical key set

dotfiles-tnw2가 merge된 뒤 consumer의 `EXEC_SETTING_KEYS`는 다음 11개다.

```text
orchestration_model
orchestration_effort
spec_review_model
spec_review_effort
plan_review_model
plan_review_effort
impl_review_model
impl_review_effort
impl_runtime
impl_model
impl_effort
```

`workflow_mode`는 계속 Bead-only 별도 key다. preset, workspace default reference, 11-key full apply에
포함하지 않는다.

active writer는 exact `impl_model`을 쓸 때 matching `impl_runtime`도 함께 쓴다. preset과 legacy
metadata reader는 dotfiles contract의 model-only dual-read를 따르되 새 model-only 상태를 만들지
않는다.

## preset schema

기존 server-global store와 revision CAS를 유지하고 settings subset을 11개로 확장한다.

```js
{
  revision: 8,
  presets: [
    {
      id: '4f5b…',
      name: 'Codex 기본 구현',
      settings: {
        orchestration_model: 'sol',
        orchestration_effort: 'xhigh',
        impl_runtime: 'codex',
        impl_model: 'terra',
        impl_effort: 'high'
      },
      origin: { kind: 'user' }
    }
  ]
}
```

- `settings`는 canonical 11개 키의 부분집합이다.
- 키 부재는 preset layer의 `(기본)`이며 lower layer/harness 해석으로 내려간다.
- explicit `impl_runtime=inherit`은 lower layer의 provider default를 막고 controller provider를
  선택한다.
- create/update/apply는 runtime/model/effort coherence를 함께 검증한다.
- catalog에서 사라진 문자열 값은 기존 UI-metq처럼 load 시 보존하고 `(비호환)`으로 표시한다.
- 기존 preset에 known exact `impl_model`이 있고 `impl_runtime`이 없으면 one-time store migration이
  model provider를 runtime으로 추가한다. model이 없으면 runtime도 추가하지 않는다.
- unknown model은 자동 추론하지 않고 비호환으로 남긴다.
- `origin`이 없는 기존 preset은 `{ kind: 'user' }`로 정규화한다.

## workspace durable state

queue snapshot/state에 다음 필드를 둔다.

```js
{
  revision: 17,
  default_exec_preset_id: '4f5b…' // 또는 null
}
```

- `default_exec_preset_id=null`은 workspace preset layer가 없다는 뜻이다.
- queue는 preset settings 사본이나 preset revision을 durable default로 저장하지 않는다.
- queue revision CAS로 selector 변경의 lost update를 막는다.
- 기존 per-key `worker-queue-set-exec-default` active mutation은 migration 완료 후 제거한다.
- 새 mutation은 `worker-queue-set-default-exec-preset`이며
  `{ workspace, preset_id|null, expected_queue_revision, expected_preset_revision }`을 받는다.
- server는 preset 존재·호환성과 사용자가 본 global revision을 검증한 뒤 queue reference를
  저장한다.

workspace snapshot은 selected ID와 현재 preset의 display summary를 제공할 수 있지만 settings의
authority는 global preset snapshot이다. client가 queue snapshot의 stale copy를 dispatch payload로
보내지 않는다.

## live reference 해석

dispatch는 하나의 immutable preset snapshot을 잡고 다음 순서로 resolve한다.

```text
Bead metadata > selected workspace preset settings > worker/workflow harness fallback
```

1. queue의 `default_exec_preset_id`를 읽는다.
2. global store의 한 snapshot에서 preset ID, revision, settings를 찾는다.
3. 현재 runner catalog와 dotfiles-tnw2 coherence 규칙으로 preset을 검증한다.
4. canonical 11개 중 Bead에 없는 key만 preset settings에서 temporary stamp한다.
5. outer controller를 기존 `orchestration_model` resolution으로 launch한다.
6. workflow는 stamped `impl_runtime`/model/effort를 Bead-level preference로 읽는다.
7. attempt 종료 시 기존 stamp-revert 경계로 worker가 쓴 metadata만 되돌린다.

preset에서 빠진 key는 stamp하지 않는다. 따라서 해당 key는 harness fallback으로 내려간다.
Bead가 명시한 값은 preset보다 항상 우선한다.

dispatch 중 preset update가 일어나도 이미 잡은 immutable revision으로 그 Attempt를 끝낸다. 다음
Attempt부터 최신 revision을 사용한다. runtime/model/effort를 실행 중인 session에 소급 변경하지
않는다.

## Attempt provenance

outer Attempt durable state에 최소 다음 값을 기록한다.

```text
exec_default_preset_id
exec_default_preset_revision
exec_stamped_keys
exec_values
```

- `exec_values`에는 실제 outer launch와 workflow에 전달한 11-key resolved/stamped snapshot을 남긴다.
- model 자동 선택의 실제 implementation leaf는 outer Worker가 추론하지 않는다. dotfiles workflow의
  phase execution receipt가 actual implementation provider/model/effort/transport를 기록한다.
- UI는 outer Attempt 값과 inner workflow receipt를 구분하며 `impl_model` metadata만으로 실제 child
  provider 실행을 추정하지 않는다.

## preset 참조 무결성

### 삭제

하나 이상의 workspace가 참조하는 preset은 삭제할 수 없다.

- delete 요청 전에 server가 loaded queue뿐 아니라 authoritative durable workspace queue state 전체를
  조회한다.
- 참조 workspace 목록을 완전하게 확인할 수 없으면 fail closed한다.
- conflict 응답은 참조 workspace 수와 display name을 반환한다.
- 사용자는 각 workspace를 다른 preset 또는 `없음`으로 바꾼 뒤 삭제한다.
- dangling reference를 harness fallback으로 조용히 처리하지 않는다.

### 수정

참조 중인 preset은 수정할 수 있지만 저장 전 “N개 workspace의 다음 실행부터 변경”됨을 표시한다.
수정은 global preset revision CAS를 그대로 쓰고 모든 subscriber에 snapshot을 fanout한다.

workspace selector는 preset이 다른 client에서 삭제·변경된 stale snapshot을 보내면 authoritative
snapshot을 채택하고 자동 retry하지 않는다.

## legacy `exec_defaults` migration

migration은 preset store와 queue store 두 durable 파일을 함께 다루므로 idempotent coordinator가
소유한다. queue-store load 함수가 global store를 직접 변경하지 않는다.

각 workspace에 `exec_defaults`가 있고 `default_exec_preset_id`가 없으면 다음 순서로 한 번 변환한다.

1. known `impl_model`이 있고 `impl_runtime`이 없으면 model provider를 runtime으로 보강한다.
2. 알 수 없는 key/value는 기존 normalization과 동일하게 보존 가능 여부를 판정한다. 안전하게
   표현할 수 없는 값이 있으면 migration을 멈추고 legacy state를 유지한다.
3. global store에 deterministic migration origin
   `{ kind: 'workspace-exec-defaults', workspace_key, source_digest }`을 가진 preset을 create/reuse한다.
4. 이름은 `이전 기본값 · <workspace display name>`으로 만들고 case-insensitive collision 시 안정적인
   short workspace suffix를 붙인다. migration preset도 정상 global 목록에 보여 숨은 두 번째 preset
   scope를 만들지 않는다.
5. preset persist 성공을 readback한 뒤 queue에 `default_exec_preset_id`를 저장한다.
6. queue reference readback 뒤에만 legacy `exec_defaults`를 제거한다.

preset persist 뒤 queue write가 실패하면 다음 시작에서 같은 origin/digest preset을 재사용한다.
queue reference write 뒤 legacy clear가 실패하면 resolver는 reference를 우선해 값을 두 번 적용하지
않고 다음 시작에서 clear를 재시도한다. 원본 값은 전체 변환 성공 전 삭제하지 않는다.

migration coordinator가 queue reference와 legacy clear를 readback하기 전의 preset은
`migration_pending`으로 취급해 UI edit/delete에서 숨긴다. 이 구간에 사용자가 값을 바꿔 idempotent
retry가 다른 settings를 재사용하는 race를 허용하지 않는다. migration 완료 후에는 사용자가 이름과
값을 수정할 수 있다. `origin`은 idempotency/audit용으로 유지하며 권한이나 별도 visibility를 만들지
않는다. 참조 중 삭제 방지는 일반 preset과 같다.

## runtime별 model UI

### 구현 target control

구현 관련 세 행을 하나의 연동 group으로 렌더한다.

1. **구현 runtime — `impl_runtime`**
   - `(기본: workspace preset 또는 controller runtime)`
   - `controller와 동일 — inherit`
   - `Claude`
   - `Codex`
2. **구현 model — `impl_model`**
   - `(자동: 선택 runtime이 작업 난이도에 맞게 선택)`
   - resolved provider에 속한 exact models만 표시
3. **구현 reasoning effort — `impl_effort`**
   - `(자동: 선택 tier/model의 기본값)`
   - auto model이면 provider-wide legal effort union
   - exact model이면 해당 model이 허용하는 effort만 표시

`impl_runtime=claude`면 Claude models만, `codex`면 Codex models만 표시한다.
`inherit`은 현재 화면에서 effective `orchestration_model`이 결정하는 controller provider를 사용한다.

global preset editor에서 `inherit`인데 preset 자체의 `orchestration_model`도 `(기본)`이면 controller
provider를 알 수 없다. 이 경우 exact model selector는 비활성하고 `자동`만 허용한다. 사용자가 exact
model을 고르려면 runtime을 Claude/Codex로 명시하거나 preset의 orchestration model을 먼저
지정해야 한다.

### 연동 변경의 원자성

runtime 변경으로 현재 exact model이 incompatible해지면 UI는 model을 `자동`으로 reset할 것임을
같은 control에서 보여 준다.

- preset editor는 local draft에서 runtime/model/effort 세 값을 함께 바꾸고 한 CRUD save로 검증한다.
- Bead detail의 immediate edit는 새 atomic mutation으로 세 key를 한 `bd update`에서 set/unset한다.
- runtime만 먼저 저장해 invalid intermediate metadata를 만들지 않는다.
- effort가 새 model에서 legal하지 않으면 effort도 자동으로 reset한다.
- server response의 `bd show` readback으로 세 control을 다시 렌더한다.

stored incompatible 값은 option에서 `(비호환)`으로 보존하지만 새 save/apply/dispatch는 차단한다.

## 전역 실행 설정 dialog

UI-metq의 두 영역을 다음처럼 바꾼다.

1. **공용 실행 preset**
   - 기존 create/edit/delete와 11-key editor
   - preset별 참조 workspace 수 표시
   - 참조 중 수정 영향 안내, 참조 중 삭제 차단
2. **현재 workspace 기본 preset**
   - `[없음 — harness 기본값]` + 공용 preset 목록 selector
   - selected preset의 11-key summary와 global revision
   - “preset 수정은 이 workspace의 다음 실행부터 자동 반영” 설명
   - 별도 per-key `exec_defaults` editor 없음
3. 기존 **검증·배포 설정**, **Worker system prompt**
   - 동작 변경 없음

selector는 incompatible preset을 상태와 함께 보여 주되 선택·저장을 차단한다. 현재 reference가 catalog
변경으로 incompatible해졌다면 그대로 표시하고 dispatch를 fail closed하며, 사용자가 preset을
수정하거나 다른 preset을 선택해야 한다.

## Bead 상세

- preset selector와 “전체 설정 적용”은 기존 UI-metq copy semantics를 유지한다.
- apply는 preset ID와 사용자가 본 global revision을 보내며 server가 current preset을 다시 읽는다.
- 하나의 `bd update`가 canonical 11개를 모두 처리한다.
  - preset present key → `--set-metadata`
  - preset missing key → `--unset-metadata`
- `workflow_mode`와 optimistic local workflow-mode change는 건드리지 않는다.
- 성공 후 `bd show --json` readback으로 11개 control을 갱신한다.
- 적용 후 preset link/name metadata는 Bead에 남기지 않는다.
- 구현 target manual edit는 runtime별 narrowing과 atomic three-key mutation을 사용한다.

preset의 `(기본)`을 적용해 Bead key를 unset하면 workspace가 참조하는 최신 preset layer가 다시
보일 수 있다. UI label은 `(기본: <값> — workspace preset <name>)`으로 실제 live source를 명시한다.

## protocol과 store 변경

### global preset channel

- 기존 subscribe/CRUD/apply message shape와 revision CAS를 유지한다.
- settings validator와 apply builder를 canonical 11개로 확장한다.
- snapshot preset에 `origin`과 reference count summary를 포함한다.
- delete는 durable workspace reference check를 통과해야 한다.

### workspace queue channel

- queue snapshot에 `default_exec_preset_id`를 포함한다.
- `worker-queue-set-default-exec-preset` mutation을 추가한다.
- 성공 응답은 authoritative queue snapshot과 selected preset summary를 반환한다.
- stale queue/preset revision 중 하나라도 있으면 저장하지 않고 두 authoritative snapshot을 반환한다.
- legacy `worker-queue-set-exec-default`는 migration 완료 뒤 active UI에서 호출하지 않으며 server
  removal 시점은 plan이 compatibility caller inventory를 확인해 정한다.

## 오류 처리

- missing/deleted workspace preset reference는 dispatch에서 `default_exec_preset_missing`으로 실패하고
  harness fallback하지 않는다.
- incompatible reference는 `default_exec_preset_incompatible`로 실패한다.
- runtime/model/effort mismatch는 preset save, workspace select, Bead atomic edit/apply, dispatch에서
  동일 validator로 거부한다.
- global preset update와 queue selection CAS가 동시에 stale이면 client는 두 최신 snapshot을
  채택하고 사용자 선택을 유지하되 자동 retry하지 않는다.
- preset update 도중 active Attempt는 pinned immutable revision을 계속 쓰고 다음 Attempt부터 새 값을
  사용한다.
- migration의 어느 persist/readback이 실패해도 legacy 원본을 삭제하거나 완료를 주장하지 않는다.
- reference scan completeness를 증명할 수 없으면 preset delete를 거부한다.
- `bd update` 성공 뒤 `bd show`가 실패하면 적용 성공을 표시하지 않고 refresh를 요청한다. 자동
  rollback은 하지 않는다.

## 수용 기준

- workspace dialog에 per-key 기본값 editor가 없고 default preset selector 하나만 있다.
- workspace 선택은 `default_exec_preset_id`로 durable하며 preset settings 사본을 queue에 저장하지
  않는다.
- preset 수정이 참조 workspace의 다음 dispatch에 workspace queue revision bump 없이 반영된다.
- Bead metadata가 workspace preset보다 우선하고 preset missing key는 harness fallback으로 내려간다.
- referenced preset 삭제는 모든 durable workspace reference를 검사해 차단된다.
- `impl_runtime`이 preset/create/update/apply, workspace resolution, Bead detail, Attempt snapshot에
  canonical 11번째 key로 포함된다.
- runtime 선택에 따라 model dropdown에 matching provider models만 표시된다.
- `inherit` + unknown controller provider에서는 exact model 선택이 비활성이다.
- runtime 변경 시 incompatible model/effort reset이 한 atomic mutation으로 저장된다.
- exact model 선택은 matching runtime을 함께 저장하고 model-only active state를 만들지 않는다.
- 기존 preset과 `exec_defaults`가 값 손실 없이 idempotent migration된다.
- Bead preset 적용은 11-key exact copy이며 이후 preset 수정의 영향을 받지 않는다.
- outer Attempt는 workspace preset ID/revision과 resolved exec snapshot을 기록하고 inner model 실행을
  추정하지 않는다.
- static bundle이 새 selector, runtime/model labels, migration/reference 상태를 포함한다.

## 구현 경계

- canonical consumer key/validation: `server/worker/exec-enums.js`, `server/worker/policy.js`
- preset persistence/reference check/migration: `server/exec-preset-store.js`, queue-state discovery helper,
  migration coordinator
- queue durable reference: `server/worker/queue-store.js`
- dispatch snapshot/stamp/attempt provenance: `server/worker/scheduler.js`, attempt schema/readback
- WebSocket handlers/protocol: `server/ws/exec-preset-handlers.js`, worker handlers/connection,
  `app/protocol.js`
- shared option model: `app/views/detail-panel/exec-settings.js`
- workspace dialog: `app/views/worker/exec-defaults-dialog.js`
- Bead detail apply/atomic target edit: `app/views/detail-panel/index.js`
- client stores/subscriptions: exec preset store, queue snapshot wiring, `app/main.js`
- style/static output: `app/styles.css`, `app/main.bundle.js`, `app/main.bundle.js.map`

구체 파일 분리는 plan에서 current import graph와 queue-store construction order를 확인해 조정할 수
있지만, global preset authority, queue ID reference, dispatch-time immutable resolution, migration
coordinator 책임은 유지한다.

## Test scope

계획은 다음 seam을 RED-GREEN 단계와 1:1로 매핑한다.

1. **11-key contract consumer seam**
   - `impl_runtime` enum과 canonical order
   - model-only legacy inference, runtime/model/effort coherence
   - worker policy의 Bead > preset > fallback precedence
2. **preset store seam**
   - 10→11 key normalization과 existing preset migration
   - origin idempotency, revision CAS, incompatible preservation
   - referenced delete rejection과 reference scan fail-closed
3. **workspace reference seam**
   - queue CAS set/unset, no settings copy
   - selected preset stale/missing/incompatible 처리
   - immutable dispatch revision과 next-Attempt live update
4. **legacy migration seam**
   - preset persist → readback → queue reference → readback → legacy clear ordering
   - 각 중간 실패에서 원본 보존과 next-start idempotent resume
   - model provider inference와 collision-safe migration preset naming
5. **dispatch/Attempt seam**
   - Bead override 우선, missing key stamp 생략, 11-key stamp/revert
   - preset ID/revision/values durable round-trip
   - missing/incompatible reference에서 launch 미호출
6. **workspace dialog seam**
   - per-key default editor 제거, preset selector/none 상태
   - live-update 설명, reference count, update impact, delete block
   - stale queue/global conflict에서 draft/selection 유지
7. **runtime/model control seam**
   - Claude/Codex/inherit별 model option narrowing
   - auto/exact model과 effort narrowing
   - runtime change의 incompatible model/effort atomic reset
8. **Bead apply seam**
   - preset present/missing을 11개 set/unset flag 한 command로 구성
   - server-side revision/coherence validation, `bd show` readback, refresh 1회
   - apply 이후 preset 변경과 Bead metadata 독립
9. **bundle/regression seam**
   - review controls, `workflow_mode`, orchestration runner selection, existing preset CRUD 회귀 없음
   - `npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`, `npm run build`
   - generated `app/main.bundle.js`와 source map 포함

## rollout 순서

1. `dotfiles-l1cf`를 먼저 완료한다.
2. `dotfiles-tnw2` spec/plan/implementation을 완료하고 Claude/Codex live matrix를 검증한다.
3. 이 spec을 최종 dotfiles key enum, harness alias, receipt format에 대해 delta-review한다.
4. preset 11-key reader compatibility와 migration coordinator를 먼저 구현한다.
5. workspace reference persistence와 dispatch-time resolution을 구현한다.
6. runtime/model UI와 atomic Bead mutation을 구현한다.
7. full local verification, PR merge, merged checkout build를 수행한다.
8. `bdui-shared restart` 후 process path, listening port, HTTP response를 검증한다.
