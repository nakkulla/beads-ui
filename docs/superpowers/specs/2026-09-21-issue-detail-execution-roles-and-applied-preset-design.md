---
scope:
  - app/views/detail-panel/effective-settings-view.js
  - app/views/detail-panel/effective-settings.js
  - app/views/detail-panel/index.js
  - app/views/settings-dialog/session-model.js
  - app/styles.css
  - server/ws/exec-preset-handlers.js
  - server/worker/exec-enums.js
  - app/protocol.md
  - docs/adr/
---

# 이슈 상세 실행 설정 카드를 오케스트레이션·워커 두 역할로 읽히게 하고 적용한 프리셋을 이슈에 기록한다

- 작업: `UI-xq3h`
- 작성: 2026-09-21
- 상태: 사용자 검토용 초안, 구현 미착수
- 조사 기준: `origin/main` / `64e807e68086d1c9b367eac28391f112fe75d4a7`
- 전신: `2026-09-15-issue-preset-pins-orchestration-design.md`(UI-00lf, 이슈별 프리셋
  적용의 17키 교체 규칙), `2026-09-10-settings-ui-restructure-design.md`(UI-7yh2, 프리셋
  컨트롤을 카드 머리로 올린 결정), `2026-08-18-execution-default-values-design.md`(카드의
  `details`/`summary` 접힘 구조)

## 1. 요구와 확인된 현재 동작

사용자가 이슈 상세를 열고 말한 것은 세 가지다. 어느 값이 오케스트레이션이고 어느 값이
워커인지 구분되지 않는다. 이 이슈에 어떤 프리셋이 적용됐는지 보이지 않는다. "유효 실행
설정"이라는 이름이 무슨 뜻인지 모르겠다.

조사 기준 커밋에서 확인한 사실은 다음과 같다.

1. 접힌 요약을 만드는 `summaryLine`(`app/views/detail-panel/effective-settings-view.js:485`)은
   `workflow_mode`, `impl_dispatch`와 `impl_runtime`, `impl_model`, `impl_effort`,
   `impl_speed` 다섯 키만 읽는다. 오케스트레이션 3키는 요약에 한 번도 나오지 않는다. 즉
   접힌 줄의 값은 전부 구현(워커) 쪽인데 그렇게 표시되지 않는다.
2. 펼친 본문의 묶음 제목이 어긋나 있다. `EFFECTIVE_GROUPS`(`app/views/detail-panel/effective-settings.js:54`)에서
   오케스트레이션 3키를 담는 묶음의 `label`이 `Worker`이고, 구현 5키 묶음의 `label`이
   `구현`이다. 화면 어휘상 오케스트레이션과 워커가 뒤집혀 읽힌다.
3. 프리셋 정체성이 이슈에 기록되지 않는다. `buildApplyImplPresetArgs`(`server/ws/exec-preset-handlers.js:79`)는
   `BEAD_PIN_KEYS` 17개의 값만 `--set-metadata`/`--unset-metadata`로 쓴다. 어떤 프리셋에서
   왔는지는 어디에도 남지 않는다.
4. 드롭다운의 선택값은 화면 상태일 뿐이다. `applyImplPreset`은 성공한 뒤에도 그 값을 지우지
   않으므로 적용 직후의 화면에는 고른 프리셋이 남아 있다. 지우는 곳은 `load`의 이슈 전환
   분기와 `clear`·`destroy`다(`app/views/detail-panel/index.js:207`, `3354`). 즉 다른 이슈를
   열거나 상세를 닫았다 다시 여는 순간 `실행 프리셋…` 플레이스홀더로 돌아가고, 그때부터
   이 이슈에 무엇이 적용돼 있었는지 화면에서 사라진다.
5. 어긋남을 판정하는 비교 자체는 이미 서버에 있다. `dispatchPreset`(`server/worker/exec-preset-coordinator.js:188`)이
   Bead 핀과 프리셋 `settings`를 키별로 대조해 `deviated_keys`를 만든다. 다만 그 입력은
   워크스페이스 큐의 `applied_exec_preset`이고 호출 시점이 디스패치라, 이슈 상세 카드가
   쓸 수 있는 경로가 아니다.
6. 카드 제목 `유효 실행 설정`은 핀·전역·기본 세 층을 겹쳐 이 이슈에 실제 적용될 값이라는
   뜻이다. 오른쪽의 `핀 n`·`전역 n`·`기본 n` 배지가 그 층별 개수다. 화면에 그 설명이 없다.

프리셋 목록 자체는 이미 클라이언트에 있다. `execPresetStore`가 `impl-presets-snapshot`을
구독해 `{ revision, presets }`를 들고 있고, 각 `preset`은 `id`·`name`·`settings`·`compatible`을
가진다. 이슈 metadata는 워크스페이스 스냅샷 세대의 투영으로 통째로 클라이언트에 온다
(ADR 0025, `app/views/detail-panel/index.js:3191`이 `data.metadata`를 그대로 펼친다).
따라서 새 재료를 이슈에 한 번 기록하기만 하면 화면이 읽는 경로는 이미 열려 있다.

## 2. 검토한 접근과 선택

**정체성을 어디에 기록하는가.**

1. **이슈 metadata에 프리셋 id 하나를 쓴다**(선택). 프리셋 적용이 이미 그 이슈에
   `bd update` 한 번을 쓰므로 같은 argv에 키 하나가 더 붙을 뿐이다. 읽기는 기존 metadata
   투영을 탄다. 새 서버 필드도 새 요청도 없다.
2. 워크스페이스 큐의 `applied_exec_preset`을 이슈 카드가 읽는다. 쓰기가 전혀 없지만 그
   값은 *전역* 적용의 기록이라 이슈별 적용과 다른 사실이다. 이슈 A에 프리셋 P를 적용해도
   큐의 값은 바뀌지 않으므로 카드가 거짓을 말한다.
3. 서버가 이슈 상세 투영에 `exec_preset` 객체를 계산해 싣는다. 클라이언트 계산이 사라지는
   대신 스냅샷 투영이 프리셋 저장소를 알아야 하고, ADR 0025가 정한 "상세 전용 read 없음"의
   경계를 새 의존으로 흐린다. 카드 한 줄을 위해 치르는 값이 크다.

**무엇을 기록하는가.** 큐의 `AppliedExecPreset`은 `{ id, name, revision, applied_at }`을
담는다. 이슈에는 **id 하나만** 쓴다.

- `revision`은 프리셋 하나의 개정 번호가 아니라 **목록 전체의 개정 번호**다.
  `resolvePresetForApply`(`server/ws/exec-preset-handlers.js:269`)가 `snapshot.revision`을
  그대로 돌려주고 적용 경로가 그 값을 기록한다. 이슈에 박아두면 남의 프리셋을 고쳐도
  번호가 어긋나므로, "이 프리셋이 그 뒤 수정됐다"는 신호로 쓸 수 없다.
- `name`을 복사해 두면 프리셋 이름을 바꾼 순간 카드가 옛 이름을 말한다. 이름은 언제나
  현재 목록에서 id로 찾는다. 목록에 없으면 이름을 지어내지 않고 삭제됐다고 말한다.

**어긋남을 저장할 것인가.** 저장하지 않는다. 핀과 프리셋 `settings`는 둘 다 읽는 시점에
손에 있으므로 그때 대조하면 항상 현재 사실이다. 저장하면 개별 키 편집·프리셋 수정마다
갱신 책임이 생기고, 갱신을 놓친 값은 조용히 거짓이 된다.

## 3. 접힌 카드

카드 머리는 세 줄이 된다. 첫 줄과 셋째 줄은 지금과 같은 요소를 쓰고, 둘째 줄이 새 값 줄이다.

```
이 이슈 실행 설정   프리셋 페이블 기본 · 2개 변경   [핀 10][전역 0][기본 5] ▸
오케 fable · low        워커 위임 codex · 6-astra · auto
                                  [실행 프리셋… ▾] [이 이슈에 적용]
```

### 3.1 제목

`유효 실행 설정`을 `이 이슈 실행 설정`으로 바꾼다. 세 층을 합성한 결과라는 사실은 같은 줄
오른쪽의 `핀`·`전역`·`기본` 배지가 이미 말하므로 제목이 다시 말하지 않는다.

### 3.2 값 줄

두 역할 묶음을 나란히 둔다. 묶음 안의 토큰은 `·`로 잇고, **묶음 사이는 구분 기호가 아니라
여백으로 나눈다.** 같은 `·`를 두 위계에 쓰면 어디까지가 한 묶음인지 읽히지 않기 때문이다.

- `오케` 묶음 — `orchestration_model`, `orchestration_effort`, `orchestration_speed`.
- `워커` 묶음 — `impl_dispatch`가 `main`이면 `메인`, `delegated`면 `위임 {impl_runtime 표시값}`.
  이어서 `impl_model`, `impl_effort`, `impl_speed`.

역할 이름 `오케`·`워커`는 값과 구분되도록 흐린 색으로 그린다. 값 자체는 행 렌더러와 같은
표시값(`row.display`)을 쓰므로 한 카드 안에서 같은 값이 두 이름으로 보이는 일이 없다.

### 3.3 값 줄에서 빼는 것

- **속도가 `default`로 해석되면 그 토큰을 생략한다.** `default (일반)`은 "아무것도 고르지
  않았다"는 뜻이라 접힌 줄에서 자리만 차지한다. 펼친 본문의 속도 행에는 그대로 남는다.
  `impl_speed`는 지금처럼 `speedVisible`이 거짓이면 애초에 행이 없고 요약에도 없다.
- **`workflow_mode`는 헤더 칩이 이미 보여줄 때만 뺀다.** 칩 줄은 이슈 metadata에 직접 들어
  있는 값만 본다. `metadata.workflow_mode === 'fast_track'`일 때 칩을 그린다
  (`app/views/detail-panel/effective-settings-view.js:598`). 반면 요약이 쓰는 해석값은
  핀·전역·기본 세 층을 겹친 결과다. 그래서 전역에서 물려받은 `fast_track`은 칩에 없고
  요약에만 있다. 무조건 빼면 그 이슈의 접힌 화면에서 모드가 통째로 사라진다.

  규칙은 하나다. **해석된 모드가 `fast_track`이고 이슈 metadata가 그 값을 직접 담고 있지
  않을 때만** 값 줄 끝에 모드 토큰을 둔다. metadata가 직접 담고 있으면 칩이 이미 말하고
  있으므로 값 줄은 말하지 않는다. `standard`는 어느 경우에도 값 줄에 없다 — 기본값이고,
  펼친 본문의 `워크플로우` 줄이 계속 보여준다. §3의 모형은 `workflow_mode`를 직접 핀한
  이슈라 모드 토큰이 없는 쪽이다.

  결정: 헤더 칩을 해석된 모드로 바꾸지 않는다 — 그 칩의 의미를 바꾸면 `fast_track`
  워크스페이스의 모든 이슈에 칩이 새로 생겨, 이 요청이 줄이려는 카드 상단 혼잡을
  오히려 늘린다.
- **재료가 없는 묶음은 그리지 않는다.** 한 묶음의 키가 전부 해석 불가면 그 묶음을 빼고
  다른 묶음만 그린다. 둘 다 없으면 값 줄 자체가 없다(AGENTS.md fail-quiet).

### 3.4 프리셋 토큰

제목 오른쪽에 프리셋 토큰 하나를 둔다. 드롭다운과 같은 줄이므로 "무엇이 적용돼 있고
무엇으로 바꿀 수 있는가"가 한 자리에서 읽힌다.

| `applied_exec_preset` | 현재 목록 | 토큰 |
| --- | --- | --- |
| 없음 | — | 토큰 없음 |
| 있음 | 아직 도착하지 않음 | 토큰 없음 |
| 있음 | id 있음, 어긋남 0 | `프리셋 {이름}` |
| 있음 | id 있음, 어긋남 n | `프리셋 {이름} · n개 변경` |
| 있음 | id 없음 | `프리셋 삭제됨` |

두 번째 줄이 따로 있는 이유는 빈 목록과 미도착이 같은 모양이기 때문이다. 구독이 아직
`impl-presets-snapshot`을 받지 못한 동안 목록은 비어 있고, 그 상태에서 id를 찾으면 멀쩡한
프리셋이 `삭제됨`으로 보인다. `execPresetState()`가 `null`을 돌려주는 동안에는 토큰을
그리지 않는다. 스냅샷이 도착하면 목록이 비어 있다는 사실 자체가 판정 재료가 된다.

`n개 변경` 토큰의 `title`에 어긋난 키를 줄바꿈으로 나열한다. 한 줄의 형식은
`{한글 라벨}: {이슈 값} (프리셋 {프리셋 값})`이고, 라벨은 `SETTING_LABELS`를 쓴다. 프리셋이
그 키를 비워 둔 경우 `(프리셋 비움)`, 이슈 쪽이 비어 있으면 값 자리에 `없음`을 쓴다.
`프리셋 삭제됨`일 때는 비교할 상대가 없으므로 변경 개수도 툴팁도 없다.

### 3.5 배치

`.detail-effective__head`는 지금도 `flex-wrap: wrap`이다. 값 줄은 `flex-basis: 100%`로
자기 줄을 차지하고, 그 안에서 두 묶음이 다시 `flex`로 서서 좁은 폭에서는 묶음 단위로
접힌다. 프리셋 토큰은 제목 바로 뒤, 개수 배지(`margin-left: auto`) 앞에 들어간다.
드롭다운과 적용 버튼을 담은 `.detail-effective__preset`은 지금처럼 마지막 줄에 남는다.

## 4. 펼친 본문

묶음 제목을 접힌 줄의 어휘와 맞춘다.

| 지금 `label` | 담긴 키 | 바꾼 뒤 |
| --- | --- | --- |
| `워크플로우` | `workflow_mode` | `워크플로우` |
| `리뷰` | 리뷰 9키 | `리뷰` |
| `구현` | 구현 5키 | `워커 구현` |
| `Worker` | 오케스트레이션 3키 | `오케스트레이션` |

순서도 `워크플로우` → `오케스트레이션` → `워커 구현` → `리뷰`로 바꾼다. 접힌 줄이 오케를
먼저 읽으므로 펼친 본문이 같은 순서를 따른다. 행 렌더러(`rowTemplate`), 층 레일, 편집
드롭다운은 건드리지 않는다.

결정: 행의 키 라벨(`SETTING_LABELS`)은 바꾸지 않는다 — 묶음 제목이 역할을 말하면 행
이름까지 역할을 반복할 필요가 없고, 같은 라벨을 쓰는 다른 표면과 어긋난다.

## 5. 적용 프리셋 정체성

### 5.1 키

`applied_exec_preset` — 값은 프리셋 id 한 토큰이다. 형식은 프리셋 저장소가 발급하는 id를
그대로 담으므로 이 설계가 별도 형식을 정의하지 않는다.

### 5.2 쓰기

`buildApplyImplPresetArgs`가 만드는 **같은 `bd update` argv**에
`--set-metadata applied_exec_preset={id}`를 더한다. 17키 교체 규칙(ADR UI-00lf)은 그대로다.
이 키는 `BEAD_PIN_KEYS`의 원소가 아니므로 그 순회 밖에서 한 번 붙는다. 한 argv이므로 핀과
정체성이 따로 착지하는 중간 상태가 없다.

이 키를 쓰는 경로는 `apply-impl-preset` 하나다. 다음은 이 키를 건드리지 않는다.

- 개별 키 편집(`update-exec-settings`) — 편집 뒤에도 출처는 그 프리셋이고, 달라진 사실은
  `n개 변경`이 말한다. 이것이 사용자가 고른 동작이다.
- 전역 적용(`apply-impl-preset-global`) — 이슈가 아니라 워크스페이스에 쓰는 조작이다.
- 프리셋 삭제 — Bead를 훑어 지우지 않는다. 전 저장소의 모든 Bead를 여는 비용을 치르는
  대신 읽는 쪽이 fail-quiet한다(§3.4의 `프리셋 삭제됨`).

### 5.3 읽기

이슈 metadata에 실려 워크스페이스 스냅샷 투영으로 온다(ADR 0025). 새 요청도 새 구독도
없다. `app/protocol.md`의 `apply-impl-preset` 항목에 이 키를 함께 쓴다는 한 문장을 더한다.

## 6. 어긋남 판정

클라이언트가 계산한다. 자리는 `app/views/detail-panel/effective-settings.js`이고, 입력은
이슈 `metadata`, 프리셋 `settings`, 이슈 `route` 셋이다.

1. **route 투영.** 서버 `presetSettingsForIssue`(`server/ws/exec-preset-handlers.js:329`)가
   쓰는 규칙을 그대로 쓴다. 그 함수가 쓰는 값이 곧 이슈에 박히는 값이므로, 기대값은 그
   투영 결과여야 한다. 축마다 규칙이 다르므로 한 줄로 줄이지 않고 그대로 적는다.

   1. 프리셋의 17키 중 문자열인 것을 그대로 담는다.
   2. `route`가 `quick_fix`가 아니면 여기서 끝난다.
   3. `quick_fix`면 오케스트레이션 3키를 `preset[QUICK_FIX_LANE_MAP[key]] ?? preset[key]`로
      덮는다.
   4. 이어서 `impl_dispatch`·`impl_model`·`impl_effort`·`impl_speed`는 **레인 값이 있을 때만**
      덮는다. 레인 값이 없으면 1단계에서 담은 일반 값이 남는다.
   5. `impl_runtime`은 `quick_fix_impl_runtime` → `quick_fix_impl_model`에서 유도한 provider →
      일반 `impl_runtime` 순으로 정한다. 셋 다 없으면 **그 키를 지운다**, 즉 기대값이 부재다.
      유도는 클라이언트에 이미 있는 `modelRunnerOf`(`app/views/detail-panel/exec-settings.js:283`)로
      한다. 서버가 쓰는 `inferImplRuntime`과 같은 카탈로그 조회이고, 다른 세 표면이 이미 이
      함수로 provider를 읽는다.

   `QUICK_FIX_LANE_MAP`은 `app/views/settings-dialog/session-model.js`에 이미 미러돼 있다.
   `validateOrchestrationPin`과 `validateImplSettings`는 **투영에 포함하지 않는다** — 그 둘은
   쓰기를 막는 검사이고 기대값을 바꾸지 않는다.
2. **대칭 비교.** `BEAD_PIN_KEYS` 17개를 돈다. 투영된 프리셋에 그 키가 있으면 그 값이
   기대값이고, 없으면 **부재**가 기대값이다(적용이 그 키를 `--unset-metadata`하기 때문).
   이슈 metadata의 실제값과 다르면 한 건이다. 양쪽 모두 키가 없거나 값이 `null` 또는 빈
   문자열이면 부재로 읽는다. 부재와 부재는 일치이고, 부재와 값은 한 건이다.
3. 결과는 `{ count, entries }`이고 `entries`의 각 원소는
   `{ key, actual, expected }`다. 카드는 `count`로 토큰을, `entries`로 툴팁을 만든다.

서버 `dispatchPreset`의 `deviated_keys`와 규칙이 다르다. 그쪽은 **존재하는 핀만** 세고
비어 있는 핀은 건너뛴다. 두 함수는 다른 질문에 답한다.

- `dispatchPreset` — 이 attempt가 실제로 들고 간 값 중 무엇이 프리셋과 달랐는가.
- 카드 — 이 이슈가 아직 그 프리셋을 그대로 서술하는가.

결정: 두 계산을 한 구현으로 합치지 않는다 — 질문이 다르고, 합치면 한쪽의 규칙 변경이
다른 쪽의 기록 의미를 조용히 바꾼다. 대신 두 규칙의 차이를 양쪽 테스트가 각각 못박는다.

## 7. 소유권과 계약

`applied_exec_preset`은 beads-ui가 쓰고 beads-ui가 읽는다. dotfiles 스킬은 이 키를 읽지
않는다. dotfiles `docs/contracts/workflow-state.yaml`의 `metadata.out_of_registry` `rule`이
그런 키를 beads-ui 소유로 두고 계약에 열거하지 않는다고 정한다. 따라서 이 설계는 계약
표면을 넓히지 않으며 dotfiles 변경도 선행 의존도 없다.

ADR 0012(beads-ui는 계약의 소비자이고 정의자가 아니다)와도 어긋나지 않는다. 그 ADR이
막는 것은 beads-ui가 *계약 키*를 정의하는 일이고, 여기서 만드는 것은 beads-ui 자신의
키다. 어휘 정본은 `server/worker/exec-enums.js`에 상수 하나로 둔다.

## 8. 검증

단위 테스트(`npx vitest run --reporter=dot`).

- 요약 줄이 두 역할 묶음을 만든다. 오케 묶음이 모델·effort를, 워커 묶음이 실행 방식과
  위임 대상·모델·effort를 담는다.
- 속도가 `default`면 토큰이 없고, `fast`면 토큰이 있다.
- 이슈 metadata가 `workflow_mode=fast_track`을 직접 담으면 요약 줄에 모드 토큰이 없다.
- 같은 값이 전역에서만 오면 요약 줄 끝에 모드 토큰이 있다.
- 해석된 모드가 `standard`면 두 경우 모두 모드 토큰이 없다.
- 오케 3키가 전부 해석 불가면 오케 묶음 없이 워커 묶음만 그린다.
- 묶음 제목과 순서가 `워크플로우`·`오케스트레이션`·`워커 구현`·`리뷰`다.
- `buildApplyImplPresetArgs`가 17키와 함께 `applied_exec_preset`을 한 argv에 담는다.
- 어긋남 판정: 방금 적용한 상태는 0건, 키 하나를 손으로 바꾸면 1건, 프리셋이 비운 키를
  이슈가 채우고 있으면 1건, 이슈가 비우고 프리셋이 채우고 있으면 1건.
- `route=quick_fix` 이슈에서 프리셋의 quick_fix 축이 기대값이 된다.
- quick_fix 투영의 런타임 사다리. 프리셋이 `quick_fix_impl_runtime`을 담으면 그 값이,
  안 담고 `quick_fix_impl_model`만 담으면 그 모델의 provider가, 둘 다 없으면 일반
  `impl_runtime`이 기대값이다. 셋 다 없으면 부재가 기대값이다.
- 일반 런타임과 quick_fix 모델의 provider가 다른 프리셋을 quick_fix 이슈에 적용한 직후
  변경 개수가 0이다. 모델 유도를 빠뜨리면 1이 되므로 이 사례가 회귀를 잡는다.
- quick_fix 이슈에서 프리셋이 구현 4축의 레인 값을 비워 두면 일반 값이 기대값으로 남는다.
- 프리셋 토큰: 키 없으면 토큰 없음, id가 목록에 없으면 `프리셋 삭제됨`이고 변경 개수 없음.

화면 확인. 공유 서버(`bdui-shared`)에서 이 카드를 헤드리스로 캡처해 세 줄 배치와 좁은 폭
접힘을 눈으로 본다. 390px 폭은 헤드리스 Chrome의 최소 뷰포트(500px)에 걸리므로 `iframe`
래퍼 문서를 `file://`로 열어 잰다.

## 경계·후속

없음. 별도 Bead로 뗄 항목을 찾지 못했다.

- 관찰: `UI-7nhi`가 `app/views/detail-panel/effective-settings-view.js`를 범위에 함께
  둔다. 그쪽이 건드리는 것은 헤더 칩 줄의 복잡 칩 재료(`recSettings`)이고 이 설계가
  건드리는 것은 카드 머리와 요약 줄이라 겹치는 줄이 없다. 경로만 겹치므로 선행 의존이
  아니다.

## 결정 (ADR 후보)

- 전제: ADR UI-00lf — 이슈별 프리셋 적용이 `BEAD_PIN_KEYS` 17키를 교체 핀하는 규칙과
  quick_fix route의 역매핑·검증을 그대로 따른다. 정체성 키는 그 17키 밖에 두고 같은 argv에
  실어 교체 규칙을 바꾸지 않는다. 다만 같은 ADR의 "적용 결과 표시는 기존 층 모델로
  충분하며 새 표시 요소는 없다" 한 조항은 아래 첫 후보가 뒤집는다.
- 전제: ADR 0012 — beads-ui는 dotfiles 계약의 소비자다. 새 키는 dotfiles가 읽지 않는
  beads-ui 자신의 키이므로 계약 정의가 아니며, 어휘 정본은 코드 상수로 둔다.
- 전제: ADR 0025 — 이슈 상세는 워크스페이스 스냅샷 세대에서 투영한다. 새 키는 기존
  metadata 투영을 타고, 상세 전용 read나 새 서버 필드를 만들지 않는다.

- 이슈에 적용한 프리셋의 정체성은 id 하나를 `applied_exec_preset`에 기록하고, 프리셋과의
  어긋남은 저장하지 않고 읽을 때 현재 프리셋과 대칭 비교해 계산한다. 이 결정이 UI-00lf의
  "적용 결과 표시는 기존 층 모델로 충분하며 새 표시 요소는 없다" 조항을 뒤집는다. 그 ADR이
  그렇게 정한 것은 폐기하려던 `skipped_orchestration_keys` 힌트가 층 모델로 대체 가능했기
  때문이고, 지금 더하는 프리셋 토큰은 층 모델이 답할 수 없는 다른 사실 — 이 값들이 어느
  프리셋에서 왔는가 — 을 말한다. 17키 교체·quick_fix 역매핑·오케스트레이션 검증·응답 형식은
  그대로 승계한다. 되돌리기 어렵다 — 프리셋을 적용한 모든 Bead에 키가 남으므로 은퇴에 일괄
  정리가 따르고, ADR 한 조항의 복원도 함께 필요하다. 맥락 없이는 놀랍다 — 큐가
  `{ id, name, revision }`을 저장하는데 이슈는 id만 저장하는 비대칭의 이유가 `revision`이
  목록 전체의 번호라는 사실에 있고, 코드만 보면 드러나지 않는다. 진짜 트레이드오프가 있다 —
  큐와 같은 세 필드를 복사하는 대안이 실재했고 위 사실과 이름 변경 시의 거짓 표시 때문에
  버렸다. `summary`: "이슈에 적용한 프리셋의 정체성은 id 하나를 metadata `applied_exec_preset`에 기록하고 프리셋과의 어긋남은 저장하지 않고 읽을 때 현재 프리셋과 대칭 비교해 계산한다 — UI-00lf의 '새 표시 요소는 없다' 조항만 뒤집고 17키 교체·역매핑·검증은 승계한다" → ADR, supersede UI-00lf
- 접힌 카드의 제목·역할 어휘·값 줄 구성과 펼친 본문의 묶음 제목·순서. 되돌리기 어렵지
  않다 — 문자열과 배열 순서의 편집이고 데이터도 계약도 따라 움직이지 않는다. 맥락 없이도
  놀랍지 않다 — 역할 이름을 값 앞에 붙이는 것은 화면을 보면 이유가 바로 읽힌다. 진짜
  트레이드오프는 있었다 — §3의 세 배치 중 하나를 골랐다. 세 조건 중 둘이 떨어진다.
  → ADR 아님
- 카드의 어긋남 판정과 서버 `dispatchPreset`의 `deviated_keys`를 한 구현으로 합치지 않고
  두 규칙으로 둔다. 되돌리기 어렵지 않다 — 두 함수는 서로를 부르지 않으므로 나중에
  합치려면 한쪽을 지우고 호출을 바꾸면 된다. 맥락 없이는 다소 놀랍지만 두 질문의 차이를
  주석과 테스트가 그 자리에서 말하므로 기록 없이도 읽힌다. 진짜 트레이드오프가 있다 —
  공유 헬퍼 하나로 합치는 대안을 질문이 다르다는 이유로 버렸다. 첫 조건에서 떨어진다.
  → ADR 아님

## 구현 unit 후보

분할하지 않고 한 unit으로 본다. 서버의 키 쓰기 한 줄과 클라이언트의 읽기·표시가 같은
사실 하나를 놓고 움직이므로, 따로 리뷰하면 양쪽 다 상대의 부재를 전제로 읽힌다.
