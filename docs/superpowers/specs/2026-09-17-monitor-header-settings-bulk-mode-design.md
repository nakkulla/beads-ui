---
scope:
  - app/main.js
  - app/views/settings-dialog/index.js
  - app/views/settings-dialog/index.test.js
  - app/views/settings-dialog/bulk-pane.js
  - app/views/settings-dialog/bulk-pane.test.js
  - app/views/settings-dialog/account-catalog.js
  - app/views/settings-dialog/execution-pane.js
  - app/views/settings-dialog/execution-pane.test.js
  - app/views/monitor/deck.js
  - app/views/monitor/deck.test.js
  - app/views/monitor/adopted-queue.js
  - app/views/monitor/bulk-preset-apply.js
  - app/views/monitor/bulk-preset-apply.test.js
  - app/views/monitor/bulk-account-apply.js
  - app/views/monitor/bulk-account-apply.test.js
  - app/styles.css
  - docs/superpowers/specs/2026-08-23-monitor-redesign-design.md
  - docs/superpowers/specs/2026-09-10-settings-ui-restructure-design.md
  - docs/adr/
---

# 모니터 탭의 상단 설정은 여러 저장소 일괄 적용 창이다 — 레포 카드 ⚙는 그 저장소만

## 문서 상태

- Bead: `UI-nu43`
- 경로: `spec_backed`. beads-ui 안에서 구현·검증·인도를 한 묶음으로 처리한다.
- 기준: `main` / `3950034c365aac94533a163944125f00fa8ddefd`
- 상태: 사용자 검토용 완성 초안. 스펙 게이트 승인 전이다.
- 선행 설계: `2026-09-16-monitor-bulk-preset-apply-design.md`(UI-8ncz, #302 착지).
  이 스펙은 그 설계의 **진입점**(결정 2·4)과 **계정 절의 원본**(§2.2 선택 1)을
  대체한다. 순차 클라이언트 호출, 기본 선택, 저장소별 결과·재적용, 프리셋 적용
  판정 규칙, 모니터 행의 `provider_limit_policy` 투영은 그대로 이어받는다.
- 사용자 결정(2026-09-16):
  1. 레포 카드 ⚙는 그 저장소만 설정한다. 일괄 적용은 **모니터 탭에서 상단 ⚙를
     눌렀을 때만** 뜬다. 워커 탭 등 다른 탭의 상단 ⚙는 지금처럼 연결된 저장소
     하나의 설정 창이다.
  2. 일괄 모드의 `워커` 탭은 **프리셋 적용만** 한다.
  3. 일괄 모드에는 `워커`·`계정` 두 탭만 있다. 모니터 탭은 선택된 저장소가 없는
     화면이므로 단일 저장소 편집(세션·표시 포함)을 두지 않는다.
  4. 계정은 **일괄 편집 폼**으로 바꾼다. 원본 저장소를 복사하지 않는다. 모든 항목의
     초기값은 `변경 안 함`이고, 바꾼 항목만 선택한 저장소에 쓴다.

## 1. 문제와 확인한 사실

- UI-8ncz는 `여러 저장소에 적용` 절을 모니터 덱 레포 카드 ⚙ 패널
  (`app/views/monitor/deck.js` `openPanel`, `.mon2-deck__bulk`)에 두었다. 저장소
  하나를 고르고 여는 패널이 여러 저장소를 바꾸는 조작을 함께 품는다. 사용자가
  말한 "모니터 탭의 ⚙"는 헤더의 ⚙(`#display-settings-btn`)였다.
- 헤더 ⚙는 탭과 무관하게 `settings_dialog.open()`을 부르고
  (`app/main.js`), 다이얼로그는 실행 pane을 **연결된 저장소**
  (`root_dir: null`)에 묶는다(`app/views/settings-dialog/index.js`).
- 모니터 탭에서는 선택기가 `프로젝트 선택`을 보이지만
  (`app/views/workspace-picker.js` `selecting_from_monitor`), 연결 상태
  `workspace.current`는 직전 저장소 그대로다. 그래서 지금 모니터 탭의 헤더 ⚙는
  화면에 보이지 않는 저장소를 편집한다. 2026-09-16 스크린샷의 계정 탭 문구
  `이 저장소의 실행 계정과 한도 대응 정책입니다`가 어느 저장소인지 알 수 없는 것이
  이 때문이다.
- 계정 카탈로그는 서버 기계 하나의 것이다(`/api/claude-usage`·`/api/codex-usage`,
  pane `fetchAccountProvider`). 같은 서버의 모든 저장소에서 같은 계정 키가
  유효하다(UI-8ncz §1.2). 저장소마다 계정 목록이 다른 경우는 없다.
- `set-workspace-accounts`는 보낸 키만 얕게 병합한다. `null`은 키 삭제(기본값
  사용)다. `worker-provider-limit-policy-set`의 `patch`는 `mode?`·`accounts?`·
  `preempt_pct?` 가운데 있는 필드만 검사하고 쓴다
  (`server/ws/worker-handlers.js`). `accounts`를 보내면 집합 전체를 바꾼다.
- 모니터 파이프라인 스토어는 보이는 저장소의 `workspaces_state` 행을 들고 있다.
  행에는 `root_dir`·`name`·`auto_advance`·`revision`·
  `quick_fix_orchestration_model`·`provider_limit_policy`가 있다(UI-8ncz §5).

## 2. 검토한 접근과 선택

- **선택 — 다이얼로그가 열릴 때의 탭으로 모드를 정하고, 일괄 모드는 별도 pane을
  마운트한다.** 헤더 ⚙ 클릭 핸들러가 현재 view가 `monitor`인지 보고
  `open(undefined, { scope: 'monitor' })`를 부른다. 다이얼로그는 그 모드에서 실행
  pane(`createExecutionPane`)을 만들지 않는다. 대신 `createBulkPane`을 마운트하고
  탭을 `워커`·`계정` 둘로 줄인다. 단일 저장소 편집기와 일괄 편집기의 상태가 섞이지
  않고, 모니터 탭에서 숨은 연결 저장소를 건드릴 길이 사라진다.
- 기각 — 모니터 탭 전용 새 다이얼로그: 레일·탭·닫기·포커스 처리가 두 벌이 된다.
- 기각 — 설정 다이얼로그 안에서 단일 pane과 일괄 절을 함께 그림: 결정 3과 어긋나고,
  숨은 연결 저장소 편집이 그대로 남는다.
- 계정 폼 기각안 — 원본 저장소 복사(UI-8ncz 방식): 결정 4. 첫 선택 저장소 값으로
  채우기: 결정 4(`변경 안 함` 초기값).

## 3. 화면

### 3.1 모드와 진입

- `main.js`의 헤더 ⚙ 핸들러: `store.getState().view === 'monitor'`이면
  `settings_dialog.open(undefined, { scope: 'monitor' })`, 아니면 지금처럼
  `open()`을 부른다. 다른 호출부(`onOpenExecPresets`의 `open('execution')`)는
  바꾸지 않는다. 그 경로는 단일 모드로 열린다.
- 모드는 `open` 때 정해지고 닫힐 때까지 유지된다. 모달이 열린 동안 view가 바뀌어도
  모드를 바꾸지 않는다.
- 일괄 모드의 레일은 `워커`·`계정` 두 탭(글리프·라벨은 `SETTINGS_TABS`와 같음)이다.
  머리 제목은 `여러 저장소 설정`이다. 탭 부제는 다음과 같다.
  - 워커: `선택한 저장소에 실행 프리셋을 적용합니다.`
  - 계정: `선택한 저장소의 실행 계정과 한도 대응을 바꿉니다. 바꾸지 않은 항목은
    저장소마다 그대로 둡니다.`
- 단일 모드는 지금과 같다(네 탭, 연결 저장소).

### 3.2 공통 — 대상 저장소

```text
┌ 설정  [◆ 워커] [◎ 계정]                                        [닫기] ┐
│ 여러 저장소 설정 · 선택한 저장소에 실행 프리셋을 적용합니다.              │
│ 적용 대상  ☑ dotfiles ☑ beads-ui ☐ Cortex ☐ ops …                        │
│ (탭 본문)                                                                │
│ ── 결과 ── ✓ dotfiles 적용됨 · ✕ beads-ui 실패 — …                        │
│ [실패·부분 적용 저장소만 다시 적용]                                       │
```

- `적용 대상` fieldset은 모니터 행 순서대로 보이는 저장소를 나열한다. 라벨은
  `name`, `title`은 `root_dir`다. 초기 선택은 `auto_advance === true`인 행이다
  (`defaultSelectedRoots`). 선택은 두 탭이 공유하고 다이얼로그가 열려 있는 동안만
  유지한다. 다시 열면 초기 선택으로 돌아간다. 행이 사라지면 선택에서도 빠진다.
- 모니터 행이 아직 없으면 fieldset 자리에 `저장소 목록을 불러오는 중입니다`를
  그리고 적용 버튼을 비활성으로 둔다.
- 결과 줄, `[실패·부분 적용 저장소만 다시 적용]`, `적용 중 k/n`, 실행 중 입력
  비활성, 새 실행 때 이전 결과 제거는 UI-8ncz §3.1·§4를 따른다. 결과는 탭마다 마지막
  실행 것을 따로 유지한다. 탭을 바꾸거나 다이얼로그를 닫으면 진행 중인 실행은 남은
  대상을 보내지 않고 끝낸다.
- 640px 이하에서 가로 넘침이 없다. 체크박스는 줄바꿈하고 select·버튼은 부모 폭에
  묶인다. 색·서체는 `.settings-dialog__*`·`.op-btn` 토큰을 쓰고 새 색은 없다.
  클래스는 `.settings-dialog__bulk*`로 옮기고 `.mon2-deck__bulk*`는 지운다.

### 3.3 워커 탭 — 프리셋 적용

- `[실행 프리셋 ▾] [선택 n곳에 적용]` 한 줄이다. select·비호환 option 비활성·
  `title`, 버튼 비활성 사유(프리셋 미선택, 0곳, 비호환, 구 서버, 실행 중)는
  UI-8ncz §3.1과 같다. 프리셋 저장·삭제·편집은 여기 없다. 그런 관리는 단일 모드의
  프리셋 바가 맡는다.

### 3.4 계정 탭 — 일괄 편집 폼

```text
실행 계정
  Claude  [변경 안 함 ▾]      Codex  [변경 안 함 ▾]
Claude 한도 대응
  대응 방식   [변경 안 함 | 기다림 | 자동 전환]
  전환 허용 계정  ☐ 바꾸기   (켜면) ☐ a@… ☐ b@… ☐ c@…
  선제 전환   [변경 안 함 ▾]  (사용량 기준 선택 시) [80] % 이상이면 미리 전환
Codex 한도 대응
  (같은 세 줄)
바꿀 항목 3개                                   [선택 n곳에 적용]
```

- **실행 계정 select** 두 개. option 순서는 `변경 안 함`(기본),
  `기본값 사용 — 현재 로그인(<라벨>)`, 카탈로그 계정(pane과 같은
  `claudeLabel`/`codexLabel`)이다. 카탈로그를 읽지 못하면 앞의 두 option만 두고
  라벨은 `현재 로그인(확인 불가)`이다.
- **대응 방식** 세그먼트: `변경 안 함`(기본) · `기다림`(`wait`) ·
  `자동 전환`(`switch`).
- **전환 허용 계정**: `바꾸기` 체크박스(기본 꺼짐 = 변경 안 함)를 켜면 그 러너의
  카탈로그 계정 체크박스가 모두 해제된 상태로 활성화된다. 켜진 동안 고른 집합이
  `accounts` 전체가 되고, 아무것도 고르지 않으면 빈 집합이다. 대응 방식 값과
  무관하게 편집할 수 있다. 대상 저장소마다 대응 방식이 다를 수 있기 때문이다.
- **선제 전환** select: `변경 안 함`(기본) · `끔`(`null`) · `사용량 기준`. 셋째를
  고르면 숫자 입력(1–99 정수, 기본 80)이 활성화된다. 범위 밖이거나 정수가 아니면
  버튼을 비활성으로 두고 `title`에 `선제 전환 기준은 1–99 정수입니다`를 단다.
- **바꿀 항목 k개**는 `변경 안 함`이 아닌 필드 수다. 러너별 필드는 따로 센다.
  k=0이면 버튼은 비활성이고 `title`은 `바꿀 항목을 고르세요`다.
- 폼 값은 다이얼로그가 열려 있는 동안 유지하고, 다시 열면 모두 `변경 안 함`이다.
  적용 뒤에도 폼 값은 남는다. 실패 저장소를 같은 값으로 다시 적용할 수 있어야 하기
  때문이다.
- 모든 입력은 폼 상태가 소유하고, 숫자 입력은 `input` 이벤트마다 폼 상태에
  기록한다. 모니터 행 구독이 다시 그려도 입력 중인 값이 되돌아가지 않아야 한다
  (레포 카드 pane의 선제 전환 입력이 1초 재렌더에 80으로 되돌아간 결함과 같은
  함정이다).

### 3.5 레포 카드 ⚙ 패널

- 패널은 머리(제목 · `[워커|세션|계정]` · 닫기)와 pane 몸체만 가진다.
  `panel_bulk`, 일괄 선택·결과·실행 상태, `bulk-*` import, `.mon2-deck__bulk` 스타일을
  지운다. pane의 단일 저장소 편집은 그대로다.
- 모니터 행의 `provider_limit_policy` 투영은 유지한다. pane `limitPolicyOf`가 이
  값으로 저장된 정책을 그린다(UI-8ncz §1.2 결함 수정분).

## 4. 모듈과 흐름

### 4.1 `app/views/settings-dialog/bulk-pane.js` (신설)

`createBulkPane(host, { transport, rows, subscribeRows, implPresetStore })` →
`{ render(section: 'worker'|'account'), destroy() }`.

- `rows()`는 모니터 파이프라인 스토어의 `workspaces_state`다. 다이얼로그가
  `main.js`에서 받은 accessor를 넘긴다. `subscribeRows`로 행이 바뀌면 다시 그리고
  선택을 정리한다.
- 적용 응답의 `queue`는 모듈 안 `adopted` 맵에 채택한다. 계획은
  `mergeQueue(row, adopted)`로 최신 revision을 읽고, 행이 따라잡으면 그 항목을
  지운다. 덱과 같은 규칙이다. `mergeQueue`는 `deck.js`에서
  `app/views/monitor/adopted-queue.js`로 옮겨 export하고 덱과 이 모듈이 함께
  import한다.
- 워커 탭은 `planBulkApply`·`runBulkApply`·`formatBulkResult`·`retryRootsOf`를 그대로
  쓴다.
- 계정 카탈로그는 열 때 한 번 읽는다. pane의 `fetchAccountProvider`를
  `app/views/settings-dialog/account-catalog.js`의 `loadAccountCatalog()`로 옮기고,
  pane과 이 모듈이 함께 쓴다.

### 4.2 `app/views/monitor/bulk-account-apply.js` 일반화

- `planBulkAccountApply({ rows, selected_roots, edit, running })`. `edit`는
  `{ values: Partial<Record<'claude_account'|'codex_account', string|null>>,
  patches: { claude?: Partial<LimitPatch>, codex?: Partial<LimitPatch> } }`이며
  바꾼 필드만 담는다. 대상은 선택한 행 전부다(원본 제외 규칙 없음). 비활성 사유:
  선택 0곳, 바꿀 항목 0개, 선제 기준 범위 밖, 실행 중, 한도 정책 필드를 바꾸는데
  어느 선택 행에도 `provider_limit_policy` 키가 없음(구 서버,
  `서버가 한도 정책을 싣지 않습니다`).
- `runBulkAccountApply`는 저장소마다 다음 순서로 보낸다.
  1. `values`가 비어 있지 않을 때만 `set-workspace-accounts { root_dir, values }`.
     실패하면 이 저장소의 정책 요청을 보내지 않는다.
  2. `patches.claude`가 있을 때만 claude 정책 요청, 이어서 `patches.codex`가 있을
     때만 codex 정책 요청. `conflict:true`면 응답 revision으로 한 번 재시도한다.
     두 번째 요청은 첫 응답의 revision을 쓴다(현행).
- 판정: 보낸 요청이 모두 성공하면 `applied`, 하나도 성공하지 못하면 `failed`,
  일부만 성공하면 `partial`이다. `partial` 문구는 실패한 부분을 적는다
  (`실행 계정`, `claude 한도 정책`, `codex 한도 정책`을 `·`로 잇는다). 계정 응답이
  `state:'unusable'`이면 그 단계는 실패로 센다.
- 원본 복사 입력(`source_root`·`source_accounts`·`source_policy`)과
  `accountValuesOf`는 지운다. `normalizeLimitPatch`는 폼 값 검증에 다시 쓰거나,
  쓰지 않으면 지운다.

### 4.3 다이얼로그·pane

- `createSettingsDialog`는 `monitorRows`·`subscribeMonitorRows` 옵션을 더 받는다.
  `open(tab, { scope })`에서 `scope === 'monitor'`이면 일괄 모드다. 일괄 모드는
  실행 pane을 만들거나 `load()`하지 않는다. 닫을 때 bulk pane을 `destroy()`한다.
- 실행 pane의 `accountSettings()` seam과 `onAccountSettingsChange` 통지는 소비자가
  없어지므로 지운다(UI-8ncz가 계정 복사 원본용으로 더한 것).
- `onOpenChange` 통지는 두 모드에서 같다. 닫힐 때 Worker의 세션 기본값을 다시
  읽는다(현행).

### 4.4 서버·프로토콜

바꾸지 않는다. 세 op의 payload·응답·CAS와 모니터 행 투영은 현행이다.

## 5. 정본 반영

- `2026-08-23-monitor-redesign-design.md` §4.4의 `정정(UI-8ncz)` 인용 뒤에
  `정정(UI-nu43)`을 더한다: 레포 카드 ⚙ 패널에는 일괄 절이 없고 그 저장소만
  편집한다. 여러 저장소 적용은 모니터 탭에서 연 헤더 ⚙의 일괄 모드가 맡는다.
- `2026-09-10-settings-ui-restructure-design.md` §3 결정 1 뒤에 `정정(UI-nu43)`을
  더한다: 헤더 ⚙는 모니터 탭에서 열리면 `워커`·`계정` 두 탭의 일괄 모드이고,
  연결 저장소를 편집하지 않는다.
- `2026-09-16-monitor-bulk-preset-apply-design.md`는 게시된 이력이라 고치지 않는다.
- 이 다이얼로그와 패널은 카드가 아니므로 ADR 0014 슬롯 표의 대상이 아니다.

## 6. 테스트 범위와 인도 조건

- `app/views/settings-dialog/index.test.js`
  - `scope:'monitor'`로 열면 탭이 `워커`·`계정` 둘이고 실행 pane의 `load`
    요청(연결 저장소 kv 읽기)이 나가지 않는다.
  - 인자 없이 열면 네 탭과 기존 요청이 그대로다.
- `app/views/settings-dialog/bulk-pane.test.js`
  - 초기 선택이 `auto_advance:true` 행이고, 다시 열면 초기화된다.
  - 워커 탭에서 저장소 n곳에 `apply-impl-preset-global`이 순서대로 나가고 결과 줄이
    선다.
  - 계정 탭 폼이 모두 `변경 안 함`이면 버튼이 비활성이고 `바꿀 항목 0개`다.
  - Claude 실행 계정만 바꾸면 저장소마다 `set-workspace-accounts`가
    `{ claude_account }` 한 키로만 나가고 정책 요청은 없다.
  - `기본값 사용`은 `null`로 나간다.
  - 허용 계정 `바꾸기`를 켜고 아무것도 고르지 않으면 `accounts: []`가 나간다.
    켜지 않으면 `accounts` 키가 없다.
  - 선제 기준 0·100·소수는 버튼을 비활성으로 둔다.
  - 선제 기준을 입력하는 도중 행 구독이 다시 그려도 입력값이 유지된다.
  - 행이 없으면 불러오는 중 문구와 비활성 버튼이 선다.
- `app/views/monitor/bulk-account-apply.test.js`
  - 요청 순서와 생략(값 없음·러너 patch 없음), 충돌 1회 재시도를 확인한다.
  - `applied`/`partial`/`failed` 판정과 partial 문구를 확인한다.
  - 계정 실패 시 정책 요청이 0회다.
  - 구 서버 비활성 사유를 확인한다.
  - 원본 복사 테스트는 지운다.
- `app/views/monitor/deck.test.js`: ⚙ 패널에 `.mon2-deck__bulk`와 `적용 대상`
  fieldset이 없고 세그먼트·pane 몸체는 그대로다.
- `app/views/settings-dialog/execution-pane.test.js`: `accountSettings` 관련
  테스트를 지운다. 계정 카탈로그 로드는 공유 모듈로 옮긴 뒤에도 같은 라벨을 낸다.
- `main.js` 진입 분기는 다이얼로그 테스트의 `scope` 계약과 배포 뒤 확인으로
  검증한다.
- Pre-Handoff Validation 묶음(`npm run tsc`, `npm run lint`, prettier, vitest)이
  통과해야 한다. 배포 뒤 공유 서버에서 두 가지를 확인한다. 모니터 탭 헤더 ⚙가
  두 탭의 일괄 창으로 열리는지, 레포 카드 ⚙에 일괄 절이 없는지. 390px 캡처(iframe
  래퍼)로 가로 넘침이 없음을 남긴다.

## 결정 (ADR 후보)

- 전제: ADR 0052 — 한도 자동 전환은 러너별 허용 계정 집합 안에서만 일어난다. 일괄
  폼의 `accounts`는 그 집합 전체를 바꾼다.
- 헤더 설정 버튼의 의미가 탭에 따라 갈린다: 모니터 탭에서는 보이는 저장소
  일괄 적용 창(워커 프리셋·계정 일괄 편집)이고 연결 저장소를 편집하지 않는다.
  레포 카드 ⚙는 그 저장소만 편집한다. 세 조건 판단은 다음과 같다. 되돌림 비용이
  있다(다이얼로그 모드·일괄 pane·계정 적용 모듈 계약·덱 패널·pane seam 제거).
  배경 없이 보면 의외다(같은 ⚙ 버튼이 탭에 따라 다른 창을 연다. UI-8ncz는 일괄 절을
  레포 카드에 두었다). 실재 대안이 있다(레포 카드에 일괄 절 유지, 모니터 전용 새
  다이얼로그, 원본 저장소 복사). `summary`: "모니터 탭의 헤더 설정은 연결 저장소를
  편집하지 않는 여러 저장소 일괄 적용 창(워커 프리셋·계정 일괄 편집 폼)이고, 레포
  카드 설정은 그 저장소만 편집한다" → ADR

## 경계·후속

다른 저장소에서 할 필수 작업과 형제 Bead는 없다. 서버 op, 프리셋 적용 의미,
자동화·동시 실행·직렬 레인·워크플로우 모드의 일괄 적용(UI-7yh2·ADR 0011),
`비교`·`ADR` 탭의 헤더 ⚙ 동작은 바꾸지 않는다. 자동 진행 꺼짐 표시 정리
(`UI-3pu9`)와는 표면이 겹치지 않는다.
