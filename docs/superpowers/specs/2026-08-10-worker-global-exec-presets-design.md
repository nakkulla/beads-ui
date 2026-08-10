# 워커 공용 실행 프리셋과 이슈 일괄 적용 설계 (UI-metq)

## 배경

워커 실행 설정은 현재 두 계층으로 나뉜다.

- 워크스페이스 큐의 `exec_defaults`: 10개 실행 키의 이름 없는 전역 기본값 한 세트
- Bead metadata: 이슈별 10개 실행 키를 상세 패널에서 하나씩 즉시 저장

10개 키는 `orchestration_model` / `orchestration_effort`, spec·plan·implementation 리뷰의 `*_review_model` / `*_review_effort`, `impl_model` / `impl_effort`다. 같은 조합을 여러 이슈에 반복 적용하려면 매번 10개 select를 각각 바꿔야 한다. 또한 `impl_model`과 `impl_effort`의 미설정 라벨인 “티어 자동”, “리프 기본”은 실제 선택 주체와 기준을 설명하지 않아 의미를 파악하기 어렵다.

이 설계는 모든 워크스페이스에서 공유하는 이름 있는 실행 프리셋을 추가하고, 프리셋을 이슈의 기존 실행 metadata에 한 번에 복사한다. 이 저장소는 dotfiles workflow 계약의 소비자이므로 새 workflow metadata 키를 정의하지 않고 기존 canonical 실행 키 10개만 쓴다.

## 목표와 확정 결정

- 사용자는 공용 실행 프리셋을 생성·수정·삭제할 수 있다.
- 프리셋은 특정 workspace가 아니라 beads-ui 서버 전체에서 공유한다.
- 프리셋은 실행 설정 10개 전체를 표현하며, 각 키는 명시값 또는 `(기본)`(키 부재) 상태를 가진다.
- 이슈 적용은 기존 실행 metadata 10개를 프리셋과 정확히 같게 전체 교체한다.
- 적용은 값 복사다. 이후 프리셋 수정·삭제는 이미 적용된 이슈에 영향을 주지 않는다.
- `workflow_mode`는 프리셋에 포함하지 않는다.
- 현재 workspace별 `exec_defaults`와 그 우선순위는 변경하지 않는다.
- “티어 자동”과 “리프 기본”은 사용자 관점의 구체적인 설명으로 교체한다.

## 상태 소유권과 저장 형식

새 서버 전역 저장소 `exec-preset-store.js`가 다음 파일을 소유한다.

```text
$XDG_STATE_HOME/bdui/exec-presets.json
```

파일은 workspace slug 아래가 아니라 `bdui` 상태 루트에 한 번만 존재한다. `state-paths.js`가 경로를 제공한다.

논리 형식은 다음과 같다.

```js
{
  revision: 3,
  presets: [
    {
      id: '4f5b…',
      name: '기본 개발',
      settings: {
        orchestration_model: 'sol',
        orchestration_effort: 'xhigh',
        spec_review_model: 'codex',
        spec_review_effort: 'xhigh',
        plan_review_model: 'codex',
        plan_review_effort: 'xhigh',
        impl_review_model: 'codex',
        impl_review_effort: 'xhigh',
        impl_model: 'terra',
        impl_effort: 'high'
      }
    }
  ]
}
```

- `id`는 `crypto.randomUUID()`로 만들고 이름을 수정해도 유지한다.
- `name`은 trim 후 비어 있지 않아야 하며, 대소문자를 무시해 중복을 금지한다.
- `settings`는 `EXEC_KEYS` 10개의 부분집합이다. 빠진 키는 프리셋의 `(기본)`이다.
- 구조 정규화는 알 수 없는 키와 비문자열 값을 제거한다. 문자열 값은 load 시 현재 enum에 없더라도 보존한다. catalog 변경으로 과거 값이 사라진 경우를 조용히 삭제하지 않고 UI에서 `(비호환)`으로 보여 주기 위해서다.
- create/update는 현재 `execSettingEnums()`로 10개 값을 검증한다. 비호환 프리셋은 수정해 고치거나 삭제할 수 있지만 그대로 적용할 수 없다.
- 모든 변경은 integer `revision` CAS로 보호한다.
- 파일은 임시 파일에 완성된 JSON을 쓴 뒤 rename한다. persist가 실패하면 메모리 상태와 revision도 이전 값에 남는다.
- snapshot과 mutation 응답은 clone을 반환해 호출자가 store cache를 변경할 수 없게 한다.

## 전역 프리셋 프로토콜

프리셋은 workspace queue snapshot에 복제하지 않고 전용 server-global WebSocket 채널로 전달한다. Monitor처럼 여러 workspace를 보는 화면에서도 동일 목록을 한 번만 구독하게 하기 위해서다.

메시지 표면은 다음과 같다.

- `subscribe-exec-presets` / `unsubscribe-exec-presets`
- push: `exec-presets-snapshot { revision, presets }`
- `exec-preset-create { expected_revision, name, settings }`
- `exec-preset-update { expected_revision, id, name, settings }`
- `exec-preset-delete { expected_revision, id }`
- `apply-exec-preset { id, preset_id, expected_revision }`

CRUD 성공 응답은 authoritative snapshot을 포함하고 모든 구독 클라이언트에 새 snapshot을 fanout한다. revision conflict는 현재 snapshot과 `conflict: true`를 반환한다.

편집 form은 여러 필드를 한꺼번에 저장하므로 conflict를 자동 재시도하지 않는다. 클라이언트는 사용자의 draft를 유지하면서 최신 snapshot을 채택하고, “다른 곳에서 변경됨—확인 후 다시 저장”을 표시한다. 최신 내용을 보지 않은 채 같은 draft를 재전송해 다른 클라이언트의 변경을 덮는 일을 막는다.

## 이슈 적용 동작

상세 패널의 적용 요청은 settings 객체가 아니라 `preset_id`와 사용자가 본 전역 `expected_revision`을 보낸다. 서버가 현재 store에서 프리셋을 다시 찾고 검증하므로 클라이언트가 임의의 설정 묶음을 주입하거나 삭제·수정 전 값을 적용할 수 없다.

서버 적용 순서는 고정한다.

1. payload의 이슈 ID, preset ID, revision을 검증한다.
2. revision과 preset 존재 여부를 확인한다.
3. 현재 `execSettingEnums()`로 preset의 모든 저장값을 다시 검증한다.
4. 기존 `runBdInWorkspace` 경계를 통해 하나의 `bd update <id>`를 실행한다.
   - preset에 값이 있는 키: `--set-metadata key=value`
   - preset에서 빠진 키: `--unset-metadata key`
   - `EXEC_KEYS` 10개 모두에 대해 flag를 만들므로 기존 이슈 override가 남지 않는다.
5. `bd show <id> --json`으로 authoritative readback을 받아 응답한다.
6. 기존 issue mutation refresh를 한 번 트리거한다.

적용 결과로 `preset_id`, preset name, 적용 시각 같은 새 Bead metadata는 쓰지 않는다. durable 결과는 기존 10개 키뿐이다. 따라서 dotfiles의 workflow metadata 계약을 확장하지 않으며, 프리셋 삭제 후에도 이슈 실행 재현성이 유지된다.

프리셋의 `(기본)`은 “현재 유효값을 snapshot하여 저장”한다는 뜻이 아니다. 해당 이슈 metadata 키를 지워, 실행 시 기존 우선순위인 Bead metadata 부재 → workspace `exec_defaults` → worker/workflow fallback을 따르게 한다.

## UI 설계

### 전역 실행 설정 다이얼로그

기존 다이얼로그를 다음 두 편집 영역과 기존 읽기 전용 영역으로 구분한다.

1. **공용 실행 프리셋**
   - `+ 새 프리셋`
   - preset 이름, 핵심 설정 요약, `편집`, `삭제`
   - 같은 dialog 안의 생성/편집 panel
   - 삭제 확인에는 “이미 적용된 이슈는 변경되지 않음”을 표시
2. **현재 워크스페이스 기본값**
   - 기존 `exec_defaults` 10개 select
   - 현재 workspace에만 적용된다는 설명
3. 기존 **검증·배포 설정**, **워커 시스템 프롬프트**
   - 동작과 소유권 변경 없음

중첩 native dialog는 사용하지 않는다. 생성/편집 panel은 현재 dialog body 안에서 열고 `저장` / `취소`로 돌아온다. 10개 option 구성은 기존 `execSettingRows`를 재사용해 runner별 model optgroup, effort narrowing, self/skip effort 비활성, `(비호환)` 표시가 세 표면에서 갈라지지 않게 한다.

### 이슈 상세 실행 설정

기존 10개 개별 select 위에 다음 control을 추가한다.

```text
실행 프리셋  [ 기본 개발 ▾ ]  [10개 설정 적용]
              적용하면 현재 이슈 실행 설정 전체를 교체합니다
```

- preset을 선택하지 않으면 적용 버튼은 비활성이다.
- 현재 catalog와 비호환인 preset은 목록에서 상태를 표시하고 적용 버튼을 비활성한다.
- 버튼 클릭 자체가 전체 교체의 명시적 사용자 동작이므로 별도 confirm dialog를 추가하지 않는다.
- 성공하면 `bd show` readback으로 기존 10개 select를 즉시 다시 렌더하고 성공 toast를 표시한다.
- 적용 후 preset 연결 표시는 남기지 않는다. 각 select의 개별 수정 동작도 그대로 유지한다.
- preset 목록이 비어 있으면 “전역 실행 설정에서 프리셋을 추가하세요”와 해당 dialog를 여는 동작을 제공한다.

### 사용자 문구

행은 raw key만 제목으로 쓰지 않고 한국어 의미를 먼저, code key를 보조 표기로 보여 준다. 최소 매핑은 다음과 같다.

- 워커 실행 모델 — `orchestration_model`
- 워커 reasoning effort — `orchestration_effort`
- 스펙 리뷰어 / reasoning effort
- 계획 리뷰어 / reasoning effort
- 구현 리뷰어 / reasoning effort
- 구현 모델 / reasoning effort

모호한 fallback 라벨은 다음으로 교체한다.

- `impl_model`: `(기본: 작업 성격에 따라 구현 모델 자동 선택)`
- 도움말: “워크플로가 복잡 구현인지, 범위가 한정된 구현인지 판단해 현재 runtime의 구현용 모델을 선택합니다.”
- `impl_effort`: `(기본: 선택된 구현 에이전트의 reasoning effort 사용)`
- 도움말: “자동 선택이면 workflow tier에 선언된 effort를, 모델만 직접 지정했으면 해당 하위 에이전트 호출의 기본 effort를 사용합니다.”

작업 분류 전에는 실제 구현 모델 하나를 확정할 수 없으므로 특정 모델명을 하드코딩해 오해를 만들지 않는다. 사용자 문구에서는 내부 용어 `leaf`를 “구현을 맡는 하위 에이전트”로 풀어 쓴다.

## 오류와 동시성

- create/update payload의 알 수 없는 키, 잘못된 enum, 빈 이름, 중복 이름은 전체 요청을 거부한다.
- stale revision은 저장·적용 전에 거부하고 authoritative snapshot을 돌려준다.
- 삭제된 preset, 비호환 preset, 잘못된 이슈 ID는 `bd`를 실행하기 전에 거부한다.
- preset persist 실패는 cache와 revision을 바꾸지 않고 `internal_error`로 응답한다.
- `bd update`가 non-zero이면 성공 toast를 표시하지 않는다.
- `bd update` 성공 뒤 `bd show` readback이 실패하면 적용 성공을 주장하지 않고 “적용 여부 확인 필요” 오류로 표시하며 issue refresh를 요청한다. 이미 수행된 metadata write를 임의로 되돌리지 않는다.
- preset 삭제는 confirm을 거치지만 이슈 값은 복사본이므로 cascade나 참조 무결성 처리가 없다.
- 서버 재시작은 전역 파일에서 presets와 revision을 복구한다.

## 수용 기준

- 한 workspace에서 만든 preset이 다른 workspace의 전역 설정 dialog와 이슈 상세에 동일하게 나타난다.
- 생성·수정·삭제가 서버 재시작 후에도 유지되고, 다른 구독 클라이언트에 fanout된다.
- 같은 이름의 대소문자 변형을 중복 생성할 수 없다.
- stale 편집은 자동 덮어쓰지 않고 draft와 최신 snapshot을 함께 보존한다.
- preset 적용은 하나의 `bd update`에서 10개 키를 모두 set/unset하고 `bd show --json` readback을 반환한다.
- preset에서 `(기본)`인 키는 기존 이슈 metadata에서 제거된다.
- 적용 뒤 preset을 수정·삭제해도 이슈 metadata는 바뀌지 않는다.
- 적용 결과에 새 workflow metadata 키가 생기지 않는다.
- 기존 workspace `exec_defaults` 편집, Bead > workspace > fallback 해석, individual setting 편집은 회귀하지 않는다.
- catalog에서 사라진 값은 preset 목록에서 `(비호환)`으로 보이며 수정 전 적용할 수 없다.
- “티어 자동”, “리프 기본” 문구가 사용자 표면에서 사라지고 선택 주체와 기준이 설명된다.
- static frontend bundle이 새 UI와 문구를 포함한다.

## 비-목표

- preset과 이슈의 live link 또는 preset 수정의 자동 전파
- preset별 workspace 제한, 공용+workspace 이중 preset 계층
- `workflow_mode` preset 포함
- preset 복제, drag reorder, import/export, built-in preset seed
- 현재 `exec_defaults`를 preset으로 자동 마이그레이션
- runner catalog 또는 dotfiles workflow model-tier 계약 변경
- 실행 중인 session의 launch argv를 소급 변경
- 새 Bead metadata 키 또는 workflow 계약 표면 추가

## 구현 경계

- 서버 상태: `server/exec-preset-store.js`, `server/worker/state-paths.js`
- protocol/구독: `server/ws/`, `server/ws/context.js`, `server/ws/connection.js`, `app/protocol.js`
- Bead 적용: `server/ws/mutation-handlers.js`의 기존 `runBdInWorkspace`·readback·refresh 패턴
- 공용 option model: `app/views/detail-panel/exec-settings.js`
- 전역 관리 UI: `app/views/worker/exec-defaults-dialog.js`
- 상세 적용 UI: `app/views/detail-panel/index.js`
- app-wide preset store/배선: 기존 client store와 subscription lifecycle 패턴을 따르되 worker/monitor workspace snapshot에 preset 목록을 중복 싣지 않는다.
- style과 static output: `app/styles.css`, `app/main.bundle.js`, `app/main.bundle.js.map`

파일명과 모듈 분리는 계획 단계에서 현재 import graph를 다시 확인해 조정할 수 있지만, 전역 store·전용 구독·원자 Bead apply의 책임 경계는 유지한다.

## Test scope

다음 seam은 구현 전 실패하는 RED 대상으로 계획에 1:1 매핑한다.

1. **전역 store seam**
   - create/update/delete, 대소문자 무시 이름 중복, revision CAS, atomic persistence, restart 복구
   - catalog에서 제거된 문자열 값 보존과 `incompatible` 판정
2. **전역 protocol seam**
   - subscribe snapshot, CRUD 성공 fanout, stale conflict, persistence failure, 잘못된 payload
3. **원자 적용 seam**
   - preset의 명시값은 repeated `--set-metadata`, 부재값은 repeated `--unset-metadata`로 한 command에 구성
   - 10개 전체 교체, server-side revision/preset/enum 검증, `bd show` readback, mutation refresh 1회
   - validation 실패 시 `bd` 미호출, readback 실패 시 성공 미표시
4. **전역 dialog seam**
   - 공용 preset 목록과 workspace 기본값 범위 구분
   - create/edit/delete, delete confirm, stale conflict 시 draft 유지, 비호환 적용 차단
5. **상세 panel seam**
   - preset selector/전체 적용 payload, authoritative readback 반영, 빈 목록 안내, 개별 select 회귀 없음
6. **용어 seam**
   - `티어 자동` / `리프 기본` 제거
   - 구현 모델 자동 선택과 하위 에이전트 effort 도움말 렌더

회귀 검증은 `npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`, `npm run build`를 수행한다. frontend source 변경이므로 생성된 `app/main.bundle.js`와 `app/main.bundle.js.map`을 구현 커밋에 포함한다.
