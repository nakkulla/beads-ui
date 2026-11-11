---
scope:
  - server/worker/exec-enums.js
  - server/exec-preset-store.js
  - server/worker/exec-preset-coordinator.js
  - server/ws/exec-preset-handlers.js
  - server/session-defaults.js
  - server/worker/attempt-facts.js
  - app/views/settings-dialog/
  - app/views/detail-panel/effective-settings.js
  - app/utils/exec-settings-chip.js
  - app/utils/execution-defaults.js
---

# 실행 설정을 워커·quick fix·세션 리뷰 하위 탭으로 나누고 quick fix 구현 리뷰를 따로 둔다 (UI-2mvi)

- 작성: 2026-11-12 · r0
- 기준: beads-ui `7e3635d3`, dotfiles `ca2f44c5`

## 1. 목표

설정 창 `실행` 탭은 Worker가 쓰는 값과 세션만 쓰는 값을 한 프리셋에 섞어 담는다. 사용자 지적(2026-11-12)은 셋이다.

- 사양 리뷰와 계획 리뷰는 세션에서 끝나는 게이트인데 일반 프리셋에 들어 있어, Worker용 프리셋을 바꾸면 세션의
  리뷰어가 같이 바뀐다.
- quick fix의 구현 리뷰어를 일반 값과 따로 정할 길이 없다.
- quick fix 블록이 접혀 있어 값을 확인하기 어렵다.

목표:

- `실행` 탭을 `워커 | quick fix | 세션 리뷰` 세 하위 탭으로 나눈다(사용자 선택 2026-11-12).
- 실행 프리셋은 두 계열 모두 오케스트레이션·구현·구현 리뷰만 담는다. 사양·계획 리뷰는 프리셋 밖 저장소 값이다.
- quick fix 하위 탭과 quick fix 프리셋이 quick fix 전용 구현 리뷰 값을 갖는다.
- 여러 저장소 일괄 편집은 세 하위 탭 모두에서 유지한다.

비목표:

- 이슈 상세의 개별 실행 설정 편집은 그대로다(사양·계획 리뷰 핀 포함).
- 리뷰어를 고르는 규칙 자체는 dotfiles 소유다. 이 스펙은 값을 저장하고 보이는 쪽만 바꾼다.
- 세션 전용 프리셋 계열은 만들지 않는다.

## 2. 검증된 전제

- 일반 프리셋 키 집합은 이슈 핀 17키와 같고, 그 안에 리뷰 9키(사양·계획·구현 각 model·effort·speed)가 든다 —
  server/worker/exec-enums.js:132, server/worker/exec-enums.js:213, server/worker/exec-enums.js:301
- quick fix 프리셋은 오케스트레이션 3키와 구현 5키, 8키다. 리뷰 키는 없다 — server/worker/exec-enums.js:310,
  server/worker/exec-enums.js:323
- 저장소 kv에 저장할 수 있는 키는 20개이고 quick fix 전용은 구현 5키뿐이다 — server/worker/exec-enums.js:164,
  server/worker/exec-enums.js:194
- 화면 쪽은 같은 키 집합을 복제해 쓴다 — app/views/settings-dialog/session-model.js:20,
  app/views/settings-dialog/session-model.js:215, app/views/settings-dialog/session-model.js:231
- 프리셋 적용은 계열 키 집합 전체를 교체한다. 프리셋에 없는 키는 이슈에서는 unset, 저장소 kv에서는 null이다 —
  server/ws/exec-preset-handlers.js:130, server/ws/exec-preset-handlers.js:432, server/ws/exec-preset-handlers.js:722
- 계열 키 집합 밖의 키를 가진 프리셋은 구형으로 판정돼 숨는다. 파일을 읽을 때는 그 키를 지우지 않는다 —
  server/worker/exec-preset-coordinator.js:88, server/exec-preset-store.js:151
- 프리셋 파일에는 완료 표식으로 한 번만 도는 이행 장치가 이미 있다 — server/exec-preset-store.js:738,
  server/worker/exec-preset-coordinator.js:592
- 저장된 일반 프리셋 셋(`오퍼스 high`·`오퍼스 → 소넷 (실험)`·`오퍼스 오토`)이 사양·계획 리뷰 값을 갖는다 —
  `~/.local/state/bdui/exec-presets.json`을 읽어 확인(2026-11-12)
- 단일 저장소 `실행` 탭은 워커 블록 아래에 quick fix를 `<details>`로 접어 그린다. 리뷰 게이트 세 행은 워커 블록에
  있다 — app/views/settings-dialog/execution-pane.js:1999, app/views/settings-dialog/execution-pane.js:2224
- 여러 저장소 `실행` 탭도 같은 접힘이고, 일괄 폼은 계열별 키 집합으로 행을 세우며 리뷰 세 행을 일반 폼에 그린다 —
  app/views/settings-dialog/bulk-pane.js:1684, app/views/settings-dialog/bulk-worker-form.js:112,
  app/views/settings-dialog/bulk-worker-form.js:1015
- 세그먼트 그룹은 디자인 시스템 부품이다(상자 역할 규칙 + `.op-btn`, 켜진 버튼 `is-active`) — docs/design-system.md:136
- Worker 안내문의 `리뷰어 프리셋` 줄과 실행 설정 칩의 구현 리뷰 줄은 route와 무관하게 `impl_review_model`만 읽는다
  — server/worker/attempt-facts.js:589, app/utils/exec-settings-chip.js:261
- 서버는 목록 밖 kv 키 쓰기를 거부한다 — server/session-defaults.js:144
- Worker는 사양·계획 리뷰를 돌리지 않는다. Worker 배치는 `spec_review` 영수증(full_plan은 `plan_approval`)이 이미
  있어야 하고, Worker 안의 재검토 정정은 총괄 자기 검토다 — dotfiles
  src/shared/skills/flow/workflow/references/execution-worker-lane.md:20, dotfiles docs/contracts/workflow-contract.md:100
- 계약의 quick fix 전용 kv 키는 구현 5키뿐이고 리뷰어 선택기는 게이트마다 같은 이름의 Bead 키와 kv 키만 읽는다 —
  dotfiles docs/contracts/workflow-state.yaml:631, dotfiles docs/contracts/workflow-state.yaml:633, dotfiles
  src/shared/skills/flow/workflow/scripts/review-selector.py:18, dotfiles
  src/shared/skills/flow/workflow/scripts/review-selector.py:116
- dotfiles 선택기는 kv 객체에서 아는 키만 이름으로 읽으므로 모르는 키가 있어도 실패하지 않는다 — dotfiles
  src/shared/skills/flow/workflow/scripts/impl-selector.py:329(kv 객체를 키 거름 없이 그대로 돌려준다)
- Worker의 정책 계산과 이슈 스냅샷은 리뷰 키를 이슈 핀에서만 읽는다 — server/worker/policy.js:297,
  server/worker/attach.js:681
- 화면의 유효값 해석기는 route가 `quick_fix`일 때 구현 키만 quick fix 전용 kv 값을 먼저 읽는다 —
  app/utils/execution-defaults.js:571
- 닫히지 않은 Bead 가운데 사양·계획 리뷰 핀을 가진 것은 없다 — `bd list --all --limit 0 --json`으로 확인(2026-11-12,
  10건 중 0건)

## 3. 설계

### 3.1 키 집합

| 집합 | 지금 | 바뀐 뒤 |
| --- | --- | --- |
| 일반 프리셋 | 17키 | 11키: 오케스트레이션 3 · 구현 5 · 구현 리뷰 3 |
| quick fix 프리셋 | 8키 | 11키: 오케스트레이션 3 · 구현 5 · 구현 리뷰 3 |
| 저장소 kv | 20키 | 23키: `quick_fix_impl_review_model`, `quick_fix_impl_review_effort`, `quick_fix_impl_review_speed` 추가 |
| 이슈 개별 편집 | 14키 + 오케스트레이션 3 | 그대로 |

- 결정: 프리셋 키 집합과 이슈 개별 편집 키 집합을 가른다. 지금은 일반 프리셋이 이슈 핀 목록을 그대로 쓰지만, 바뀐 뒤
  프리셋은 11키이고 이슈 스냅샷·개별 편집이 다루는 핀 키는 줄지 않는다.
- quick fix 프리셋은 구현 리뷰를 다른 키와 같이 정규 이름(`impl_review_model`, `impl_review_effort`,
  `impl_review_speed`)으로 담는다. 저장소에 적용할 때만 quick fix 전용 kv 이름으로 바꿔 쓴다(구현 5키와 같은 규칙).
- quick fix 전용 구현 리뷰 값의 선택지는 일반 구현 리뷰와 같다(model은 리뷰어 여섯, effort·speed는 리뷰 어휘). 비어
  있으면 일반 값으로 떨어진다.
- 서버는 새 kv 3키를 저장 가능한 키로 받고 같은 어휘로 검증한다.

### 3.2 프리셋 적용

- 저장소 적용: 일반 프리셋은 저장소의 사양·계획 리뷰 kv 6키를 건드리지 않는다. quick fix 프리셋은 quick fix 전용 kv
  8키(구현 5 + 구현 리뷰 3)와 quick fix 오케스트레이션을 교체한다. 프리셋에 구현 리뷰 값이 없으면 그 kv 키는 비워져
  일반 값으로 떨어진다.
- 이슈 적용: 계열 11키만 교체한다. 이슈에 이미 있는 사양·계획 리뷰 핀은 남는다. quick fix 프리셋을 quick fix 이슈에
  적용하면 구현 리뷰도 정규 이름으로 핀된다.
- 프리셋 대조(적용 기록의 어긋남, 판정 칩의 `diverged`, 칩 복원 보관)는 새 계열 키 집합을 따른다. 그래서 사양·계획
  리뷰 값이 달라도 프리셋에서 어긋났다고 보이지 않는다.

### 3.3 저장된 프리셋 이행

- 서버 시작 때 한 번, 일반 프리셋에서 사양·계획 리뷰 6키를 지운다. 기존 이행과 같이 완료 표식을 같은 파일 쓰기에
  남겨 다시 돌지 않는다.
- 지운 값은 프리셋 이름과 함께 서버 로그 한 줄로 남긴다.
- 저장소 kv와 이슈 핀은 이행하지 않는다. 적용돼 있던 사양·계획 리뷰 값은 그대로 저장소 값으로 남는다(사용자 승인
  2026-11-12).
- 이행 전에 구형으로 숨어 있던 프리셋(다른 이유의 계열 밖 키)은 이 이행이 드러내지 않는다. 지우는 것은 6키뿐이다.

### 3.4 설정 창 `실행` 탭

- `실행` 탭 맨 위에 세그먼트 그룹 `워커 | quick fix | 세션 리뷰`를 둔다. 처음은 `워커`이고, 창이 열려 있는 동안 고른
  하위 탭을 기억한다. 접힘(`<details>`)과 한 줄 요약은 없앤다.
- 하위 탭을 바꿔도 보내지 않은 입력은 남는다. 버리는 시점은 지금과 같이 대상 전환과 창 닫기다.
- `워커`: 일반 프리셋 바 · 오케스트레이션 · 구현 · 구현 리뷰 한 행 · 시스템 프롬프트.
- `quick fix`: quick fix 프리셋 바 · 오케스트레이션 · 구현 · 구현 리뷰 한 행. 구현 리뷰 행의 빈 값은 다른 행과 같이
  일반 값을 가리키는 문구로 보인다. quick fix 레인을 모르는 서버에서는 지금의 잠금 문구 그대로 하위 탭 전체가 잠긴다.
- `세션 리뷰`: 프리셋 바 없이 사양 리뷰 · 계획 리뷰 두 행. 머리에 "Worker는 이 두 리뷰를 돌리지 않습니다 · 이
  저장소에서 여는 세션이 씁니다" 안내를 둔다.
- 여러 저장소 대상도 같은 세 하위 탭이다. `세션 리뷰`는 사양·계획 리뷰 6키의 일괄 폼이고, 관측 상태(같음·갈림·읽지
  못함)와 적용 규칙은 지금 일반 폼의 그 행들과 같다. 일반 일괄 폼은 그 6키를 더 다루지 않는다.
- 하위 탭 버튼은 디자인 시스템의 세그먼트 그룹 부품으로 그린다. 새 원시 값은 쓰지 않는다.

### 3.5 quick fix 구현 리뷰를 보이는 다른 표면

`route=quick_fix` 이슈에서 구현 리뷰 값을 보이거나 알리는 곳은 같은 순서로 읽는다: 이슈 핀 `impl_review_model` →
저장소 `quick_fix_impl_review_model` → 저장소 `impl_review_model` → 기본값. effort·speed도 같다.

바뀌는 곳:

- 화면의 유효값 해석기(`app/utils/execution-defaults.js`) — 실행 설정 칩의 구현 리뷰 줄과 이슈 상세의 유효값 표시가
  이 해석기를 따른다.
- Worker 안내문의 `리뷰어 프리셋` 줄(`server/worker/attempt-facts.js`)

바뀌지 않는 곳:

- Worker 정책 계산(`server/worker/policy.js`)과 이슈 스냅샷(`server/worker/attach.js`) — 이슈 핀만 읽고, 핀 이름은
  quick fix에서도 정규 이름이다.
- 이슈 상세의 개별 편집(`app/views/detail-panel/exec-settings.js`) — 이슈 핀을 쓰는 화면이라 저장소 값과 무관하다.
- 리뷰 세션 기동(`server/worker/review-session.js`) — 리뷰어 선택에 관여하지 않는다.

다른 route의 이슈는 지금과 같다. beads-ui는 이 순서를 보이기만 하고, 실제 선택은 dotfiles 리뷰어 선택기가 한다.

### 3.6 dotfiles 계약 (크로스 리포 unit)

quick fix 전용 구현 리뷰 키의 정의자는 dotfiles다(ADR UI-jlov). dotfiles unit이 정할 내용:

- `workspace_kv_defaults.allowed_keys`와 `route_scoped`에 `quick_fix_impl_review_model`, `quick_fix_impl_review_effort`,
  `quick_fix_impl_review_speed`를 더한다. 일반 키는 각각 `impl_review_model`, `impl_review_effort`,
  `impl_review_speed`이고 어휘도 같다.
- 리뷰어 선택기는 `route=quick_fix` Bead의 구현 게이트에서 저장소 kv 층을 quick fix 전용 키 → 일반 키 순서로 읽는다.
  현재 사용자와 Bead 층, 기본값 층은 그대로다. 사양·계획 게이트와 다른 route는 바뀌지 않는다.
- 계약 체커와 계약 사본, 계약 산문이 함께 움직인다.

beads-ui는 dotfiles unit이 닫힌 뒤에 구현에 들어간다. 새 키를 모르는 dotfiles 설치본은 그 키를 읽지 않을 뿐이라, 값이
있어도 일반 구현 리뷰어로 동작한다.

### 3.7 ADR UI-7gv4 대체 순서

- 결정: UI-v4cc의 열린 스펙도 UI-7gv4를 다시 쓴다. 그 스펙은 provider 대기의 시간 기반 재개 조항을 더하고, 이 문서는
  설정 창 `실행` 탭 조항과 프리셋 키 집합 조항만 바꾼다. 바꾸는 조항이 겹치지 않으므로 순서만 맞춘다.
  - Finish의 ADR 단계에서 `docs/adr/README.md` 현재 표를 다시 읽는다.
  - UI-v4cc의 ADR이 먼저 착지했으면 그 ADR을 supersede 대상으로 삼고, 그 ADR이 더한 조항까지 승계하며, 아래 summary의
    승계 부분을 그 ADR id로 바꾼다.
  - 대상 id가 바뀌면 후보 줄을 정정해 재게시한다(staleness 재검토 경로).
  - 이 문서가 먼저 착지하면 UI-v4cc가 같은 규칙으로 이 ADR을 대체한다.

## 4. 오류와 호환

- 이행이 파일 쓰기에 실패하면 표식을 남기지 않고 경고를 적는다. 그 사이 6키를 가진 일반 프리셋은 구형으로 숨고, 다음
  시작에서 이행을 다시 시도한다.
- 일반 프리셋 생성·수정 요청이 사양·계획 리뷰 키를 실으면 지금의 계열 밖 키 거부와 같은 사유로 거부한다. 열려 있던
  옛 화면이 보낸 요청이 여기에 해당한다.
- 새 kv 키에 어휘 밖 값이 저장돼 있으면 다른 kv 키와 같이 그 키만 경고와 함께 건너뛴다.

## 5. 테스트

서버:

- `keeps eleven keys in each preset profile`
- `rejects a general preset carrying a spec or plan review key`
- `strips spec and plan review keys from stored general presets once`
- `leaves workspace kv review values untouched by the preset migration`
- `preserves spec and plan review kv on a general workspace apply`
- `writes quick fix review kv keys on a quick fix workspace apply`
- `clears quick fix review kv keys when the quick fix preset omits them`
- `keeps existing spec and plan review pins on an issue apply`
- `accepts the three quick fix review kv keys with the review vocabulary`
- `resolves the quick fix reviewer preset from the quick fix kv key first` (attempt-facts)

화면:

- `renders three execution sub tabs with the worker tab first`
- `renders no quick fix fold`
- `renders spec and plan review rows only in the session review sub tab`
- `renders one implementation review row in the quick fix sub tab`
- `keeps unsent input across a sub tab switch`
- `renders the session review bulk form over six keys`
- `omits spec and plan review rows from the general bulk form`
- `reads the quick fix review value first on a quick fix issue` (exec-settings-chip, effective-settings)
- 디자인 시스템 부품 렌더 검사와 폭 넘침 탐침에 세 하위 탭 상태를 더한다. 390px 폭 스크린샷으로 확인한다.

## 6. 구현 unit 후보

- `preset-keys`: 키 집합 분리, 저장 kv 3키, 적용·대조, 프리셋 이행 — `server/worker/exec-enums.js`,
  `server/exec-preset-store.js`, `server/worker/exec-preset-coordinator.js`, `server/ws/exec-preset-handlers.js`,
  `app/views/settings-dialog/session-model.js`
- `settings-subtabs`: 하위 탭, 세션 리뷰 폼, quick fix 구현 리뷰 행, 다른 표면의 읽기 순서 —
  `app/views/settings-dialog/`, `app/utils/exec-settings-chip.js`, `app/views/detail-panel/effective-settings.js`,
  `server/worker/attempt-facts.js`

## 7. 경계·후속

- 크로스 리포 unit: dotfiles — §3.6 계약 변경 quick_fix dotfiles-vz3le(target rig Bead, 이 Bead의 구현 진입을 `blocks`로 막음).
  - route 근거: 키 이름·어휘·읽는 순서를 §3.6이 정하고 이 스펙의 승인과 리뷰가 그 설계를 덮는다. dotfiles에 남는 일은
    이미 있는 quick fix 전용 kv 프로파일과 리뷰어 선택기에 같은 모양의 키 셋을 더하는 닫힌 작업이다(선례: dotfiles-0d42i).
  - 그 Bead의 ADR 절은 ADR dotfiles/dotfiles-o7y9-9의 "quick fix 전용 kv는 다섯 평면 키" 조항을 고쳐 적는 supersede를
    지명하고, 사용자 ADR 승인을 받은 뒤에 Worker로 넘긴다.
- 관찰: 이슈 상세의 사양·계획 리뷰 핀 편집 — 계약의 Bead 층이 살아 있어 그대로 둔다.

## 8. 결정 (ADR 후보)

- 전제: ADR UI-jlov — 계약 키의 정의자는 dotfiles이고 beads-ui는 필요한 subset을 코드 registry로 복제한다. 새 kv
  3키도 dotfiles가 정의한 뒤에 복제한다.
- 전제: ADR dotfiles/dotfiles-o7y9-9 — quick fix는 kv의 quick fix 전용 키로 일반 값을 덮는 오버라이드 프로파일이다. 구현
  리뷰 3키는 그 프로파일에 더해지는 키다.
- 실행 프리셋은 두 계열 모두 오케스트레이션·구현·구현 리뷰 11키만 담고 사양·계획 리뷰는 프리셋 밖 저장소 값이며,
  설정 창 `실행` 탭은 워커·quick fix·세션 리뷰 하위 탭이다.
  - 뒤집는 조항: UI-7gv4의 "(신설, UI-32oq) 대상 저장소 묶음: `실행`(워커 블록과 quick fix 블록, 계열별 프리셋 바는
    블록마다 따로)". 더하는 조항: 계열 키 집합의 구성(UI-7gv4는 "계열 키 집합"이라고만 적고 구성을 적지 않았다).
  - 되돌리기 어려움: 서버 키 registry(`server/worker/exec-enums.js`)와 화면 복제본(`session-model.js`), 프리셋 파일
    (`exec-presets.json`, 6키를 지우는 이행은 되돌릴 값이 없다), 이슈·저장소 적용 경로(`exec-preset-handlers.js`),
    일괄 폼, dotfiles 계약의 kv 키 목록이 함께 움직인다.
  - 맥락 없이는 의외: 리뷰 게이트 셋 중 구현 리뷰만 프리셋에 남고, 프리셋 하나로 저장소의 리뷰어를 모두 맞출 수 없다.
    Worker가 사양·계획 리뷰를 돌리지 않는다는 사실을 알아야 이해된다.
  - 실제 절충: 프리셋 하나로 모든 게이트를 맞추는 편리함을 버리고 Worker 프리셋 교체가 세션 리뷰어를 바꾸지 않게
    한다. 기각한 대안은 세션 전용 프리셋 계열(두 행에 프리셋 장치는 과하다), `저장소` 탭 묶음(여러 저장소 일괄 편집을
    잃는다), `세션` 탭 되살리기(UI-32oq가 없앤 탭이고 일괄 편집을 새로 만들어야 한다)다.
  - `summary`: "실행 프리셋은 두 계열 모두 오케스트레이션·구현·구현 리뷰 11키만 담고 사양·계획 리뷰는 프리셋 밖 저장소 값이며, 설정 창 실행 탭은 워커·quick fix·세션 리뷰 하위 탭이고 quick fix 구현 리뷰는 dotfiles가 정의한 quick fix 전용 kv 키로 저장한다 — 나머지 조항은 UI-7gv4 그대로다"
  → ADR, supersede UI-7gv4
- 하위 탭 이름·순서·안내 문구와 세그먼트 부품 선택 — 화면 배치와 문구 → ADR 아님
- 이행에서 지운 값을 로그 한 줄로만 남기는 것 — 한 파일 안의 구현 선택 → ADR 아님
