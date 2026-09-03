---
scope:
  - server/worker/queue-store.js
  - server/worker/exec-enums.js
  - server/session-defaults.js
  - server/worker/policy.js
  - server/worker/exec-preset-coordinator.js
  - server/ws/exec-preset-handlers.js
  - server/ws/session-defaults-handlers.js
  - app/protocol.js
  - app/protocol.md
  - app/views/settings-dialog/
  - app/utils/execution-defaults.js
  - app/views/detail-panel/effective-settings-view.js
---

# quick_fix 레인 실행 프로파일 — 큐 `quick_fix_orchestration_*` 키·프리셋 두 번째 적용 슬롯·설정 UI

- Bead: `UI-25ct` (`route=spec_backed`, foreign `blocks` ← `dotfiles-zllu`)
- 날짜: 2026-09-03
- 형제: dotfiles `dotfiles-zllu`가 kv 4키(`quick_fix_impl_dispatch/runtime/effort/speed`)와 selector 사다리를
  정의한다. 그 스펙은 `dotfiles/docs/superpowers/specs/2026-09-03-quick-fix-lane-profile-contract-design.md`이며,
  이 문서는 그 어휘를 **소비**한다(ADR 0012). 사다리·enum·함의 규칙은 그쪽이 정본이고 여기서는 인용만 한다.
- 선행 결정: ADR 0013(세션 기본값 SoT는 dotfiles kv), 0012(계약은 코드 field registry로 복제), 0014(카드 슬롯
  표)를 유지한다. 2026-08-20 스펙(전체 프로필 프리셋)의 "프리셋 = 단일 프로파일, 전역 적용은 교체" 의미와
  2026-08-23 UI-g820 스펙의 `quick_fix_impl_model` 행은 이 스펙이 확장·흡수한다.

## 0. 배경과 목표

### 0.1 배경

Worker 실행 설정은 route 구분 없는 단일 프로파일이다: 큐 저장소의 오케스트레이션 3키(모델·effort·속도)와 kv
`workflow_session_defaults`의 세션 키. quick_fix 전용은 kv `quick_fix_impl_model` 하나뿐이라 (1) quick_fix를
메인으로 두면서 다른 오케스트레이터를 쓰거나 (2) 위임하면서 effort·speed·runtime을 따로 정할 수 없다.
사용자 결정(2026-09-03): 프리셋 어휘는 18키 그대로 두고, 워크스페이스가 프리셋 하나를 **일반**에, 다른 하나를
**quick_fix 레인**에 적용한다. 비어 있는 quick_fix 키는 일반 프로파일로 떨어진다.

### 0.2 목표

- 큐 워크스페이스 값 `quick_fix_orchestration_model/effort/speed` 3키를 두고, route=quick_fix Bead의 dispatch에서
  Bead `orchestration_*` → `quick_fix_orchestration_*` → `orchestration_*` → fallback 순으로 읽는다.
- kv 4키를 어휘 표에 미러하고 설정 다이얼로그에서 편집·표시한다(`quick_fix_impl_model`은 기존 행 흡수).
- `apply-impl-preset-global`에 `lane` 필드를 더해 같은 프리셋을 두 레인 어디에나 교체 방식으로 적용한다.
- quick_fix Bead의 유효 실행 설정 카드가 quick_fix 층을 읽는다.

### 0.3 비목표

- 프리셋 스키마(18키)·프리셋 저장소·비교 탭·클론 실행은 바꾸지 않는다. 클론 실험은 프리셋 서명으로 묶이고
  attempt의 `route`가 레인을 이미 구분한다.
- Bead metadata 키는 늘리지 않는다. Bead별 적용(`apply-impl-preset`)은 변경 없음 — Bead 핀은 이미 route별이다.
- Worker 탭·모니터 덱의 워크스페이스 오케스트레이션 표시 행(`workspace-adapter.js`, `monitor/deck.js`)은 일반
  값을 그대로 보인다. quick_fix 값은 설정 다이얼로그와 Bead 카드에서 본다.
- `receipt-check`의 `main:quick_fix_default` 검사는 바꾸지 않는다(dotfiles 스펙 R3: kv는 영수증 증거가 아니다).
- 하네스 projection(`generated/contracts/execution-defaults.json`) 재핀 없음 — 하네스는 불변.

## 1. 큐 저장소 — `server/worker/queue-store.js`

- 워크스페이스 상태에 `quick_fix_orchestration_model`·`quick_fix_orchestration_effort`·`quick_fix_orchestration_speed`
  (`string|null`, 초기 `null`)를 기존 3키 옆에 둔다. 스냅샷 typedef·초기값·직렬화 목록에 함께 등록한다.
- `setOrchestrationDefaults`는 허용 키를 `ORCHESTRATION_KEYS ∪ QUICK_FIX_ORCHESTRATION_KEYS`로 넓힌다. 값 검증은
  같은 enum(`execSettingEnums()[일반 키 이름]`)을 재사용한다 — quick_fix 키는 자기 enum 항목을 갖지 않고 같은
  이름의 일반 키로 매핑해 검증한다. `null`/빈 문자열은 해제, 하나라도 무효면 전체 거부(현행).
- 구 파일에 키가 없으면 `null`로 읽는다(fail-quiet, 마이그레이션 없음).

## 2. 어휘 미러 — `server/worker/exec-enums.js`·`server/session-defaults.js`·`app/views/settings-dialog/session-model.js`

- `QUICK_FIX_ORCHESTRATION_KEYS = ['quick_fix_orchestration_model', 'quick_fix_orchestration_effort', 'quick_fix_orchestration_speed']`.
- `QUICK_FIX_KV_KEYS = ['quick_fix_impl_dispatch', 'quick_fix_impl_runtime', 'quick_fix_impl_model', 'quick_fix_impl_effort', 'quick_fix_impl_speed']`.
  `WORKSPACE_KV_KEYS`는 `BEAD_APPLY_KEYS − impl_dispatch` + `QUICK_FIX_KV_KEYS` + `bdui_url`(계약 `allowed_keys`
  순서와 같게).
- `sessionDefaultEnums`: `quick_fix_impl_dispatch: ['main','delegated']`, `quick_fix_impl_runtime: ['claude','codex']`
  (`inherit` 없음), `quick_fix_impl_model`: 현행(카탈로그 토큰, `auto` 없음), `quick_fix_impl_effort`: `impl_effort`와
  같은 목록(`auto` 포함), `quick_fix_impl_speed`: `impl_speed`와 같은 목록.
- `PRESET_KV_KEYS`는 현행 정의(`WORKSPACE_KV_KEYS ∩ IMPL_PRESET_KEYS`)라 quick_fix 키를 자동으로 제외한다 — 일반
  레인 적용이 quick_fix 키를 지우지 않는 UI-g820 §4 불변이 유지된다.
- `QUICK_FIX_LANE_MAP`(레인 적용의 키 매핑, §4에서 사용):
  `orchestration_* → quick_fix_orchestration_*`, `impl_dispatch → quick_fix_impl_dispatch`,
  `impl_runtime/model/effort/speed → quick_fix_impl_*`. 리뷰 3×3·`workflow_mode`는 매핑 없음(스킵).
- 클라이언트 `session-model.js`는 서버와 같은 목록을 미러하고 두 테스트 파일에서 동일성을 단언한다(현행 방식).

## 3. Worker 해석 — `server/worker/exec-preset-coordinator.js resolveForDispatch`·`server/worker/policy.js`

- `resolveForDispatch(workspace, bead_snapshot)`가 `defaults`를 만들 때 `bead_snapshot.route === 'quick_fix'`이면
  각 오케스트레이션 키에 대해 `queue.quick_fix_orchestration_<k> ?? queue.orchestration_<k>`를 넣는다.
  `policy.js resolveExecSettings`는 바뀌지 않는다 — Bead 핀 > `defaults` > fallback `opus` 규칙이 그대로 quick_fix
  층을 포함하게 된다. 무효값은 현행처럼 fail-closed(dispatch 거부)다.
- attempt 기록의 `settings`에는 해석에 쓰인 값이 들어가므로 사후에 어느 층이 쓰였는지는 큐 스냅샷과 대조한다.
  새 provenance 필드는 만들지 않는다.
- kv 4키는 Worker가 읽지 않는다. 세션의 selector가 kv를 직접 읽는다(dotfiles 스펙 §4.2) — 현행 세션 12키와 같은
  경로다.

## 4. 프리셋 두 번째 적용 슬롯 — `server/ws/exec-preset-handlers.js`·`app/protocol.md`

- `apply-impl-preset-global` payload에 선택 필드 `lane: 'general' | 'quick_fix'`. 부재는 `general`이고 현행과
  바이트 단위로 같다. 다른 값은 `bad_request`.
- `lane=quick_fix`:
  1. kv: `QUICK_FIX_KV_KEYS` 범위에서 교체 — 프리셋의 `impl_dispatch`·`impl_runtime/model/effort/speed`를
     `QUICK_FIX_LANE_MAP`으로 옮겨 그 값, 프리셋에 없는 키는 unset. read–merge–write + readback은 현행.
     `impl_runtime=inherit`·`impl_model=auto`처럼 quick_fix enum에 없는 값은 그 키를 unset하고 응답 `warnings`에
     `lane_incompatible:<key>`로 담는다. 리뷰 3×3·`workflow_mode`는 응답 `skipped_keys`에 담는다.
  2. 큐: `QUICK_FIX_ORCHESTRATION_KEYS`를 같은 의미로 교체 — `expected_queue_revision` CAS.
- 비원자성·실패 처리(`queue_applied:false`)·`root_dir` 처리·`session_defaults` 캐시 무효화·`worker-queue-snapshot`
  fanout은 일반 레인과 같다.
- 응답에 `lane`을 되돌려 클라이언트가 어느 레인 초안을 갱신할지 안다.

## 5. 설정 다이얼로그 — `app/views/settings-dialog/execution-pane.js`·`session-model.js`

- 실행 탭에 **`quick_fix 레인`** 그룹을 일반 그룹들 뒤에 둔다. 8행: 오케스트레이션 모델·effort·속도(큐 초안 →
  `buildOrchestrationPatch`가 `QUICK_FIX_ORCHESTRATION_KEYS`까지 diff), 실행 방식(`quick_fix_impl_dispatch`),
  runtime·모델·effort·속도(kv 초안 → `buildSessionDefaultsPatch`). 기존 `구현` 그룹의 `quick_fix 구현 모델` 행은
  이 그룹으로 옮긴다.
- 각 행의 미설정 라벨은 `기본값 사용 — <일반 프로파일의 유효값>`이다. 일반 유효값은 같은 화면의 일반 행 해석
  결과(`resolveExecutionSettings`의 `global`에 세션 초안 + 큐 초안을 합친 것)에서 가져온다. dispatch 행만 일반
  층이 없으므로 `기본값 사용 — 메인 (하네스)`이며, `quick_fix_impl_model`이 설정돼 있고 dispatch가 비어 있으면
  `기본값 사용 — 위임 (모델 함의)`로 읽는다(dotfiles 스펙 §4.2 3열).
- 그룹 hint: `비어 있는 값은 일반 프로파일로 떨어집니다. 이슈 핀이 있으면 핀이 우선합니다.`
- 프리셋 컨트롤: 기존 `[적용]`을 `[일반에 적용]`으로 이름 바꾸고 `[quick_fix 레인에 적용]`을 옆에 둔다. 두 버튼은
  `.op-btn` 토큰이다. `현재 → 프리셋` diff 미리보기는 선택한 레인 기준으로 그린다 — quick_fix 레인은
  `QUICK_FIX_LANE_MAP`의 8키만 비교하고, 프리셋에 없는 키는 `기본(해제 → 일반 프로파일)`로 표시한다. 레인 선택은
  미리보기 위의 두 탭(일반 / quick_fix)이며 마지막 선택은 `localStorage`에 남긴다(없으면 일반).
- 저장(`impl-preset-create/update`)은 현행대로 **일반** 행의 현재 값으로 프리셋을 만든다. quick_fix 행에서
  프리셋을 만드는 경로는 두지 않는다 — 프리셋은 레인 무관 프로파일이고, 필요하면 일반 행에 같은 값을 놓고
  저장한다.

## 6. 유효 실행 설정 — `app/utils/execution-defaults.js`·`effective-settings-view.js`

- `EXECUTION_SETTING_KEYS`에 `quick_fix_impl_dispatch/runtime/effort/speed`와 `quick_fix_orchestration_*`를 추가한다.
  이 키들은 설정 다이얼로그 전용 행이며 `EFFECTIVE_GROUPS`·`SETTING_LABELS`(Bead 카드)에는 넣지 않는다(UI-g820
  §5.4와 같은 원칙).
- `route === 'quick_fix'`일 때 dispatch·runtime·model·effort·speed 행의 `global` 층 해석을 dotfiles 스펙 §4.2 표로
  바꾼다: 핀 → `global.quick_fix_impl_<k>` → (dispatch 3열·runtime 3열 함의/유도) → `global.impl_<k>` → 하네스.
  기존 `quick_fix_delegated` 분기(모델 함의)는 이 사다리의 3열로 흡수한다. 라벨: quick_fix 층에서 온 값은
  `<값> (quick_fix)`, 함의는 `위임 (모델 함의)`, 유도는 `<runtime> (유도)`.
- 오케스트레이션 행: route=quick_fix이면 `global.quick_fix_orchestration_<k>` → `global.orchestration_<k>` → 하네스
  fallback. 호출자(`effective-settings-view.js`)는 큐 스냅샷의 6키를 모두 `global`에 합쳐 넘긴다.
- route가 없거나 quick_fix가 아니면 현행과 바이트 단위로 같다.

## 7. 오류 처리

- 큐 쓰기: quick_fix 키의 무효값은 전체 거부(현행 규칙). 구 큐 파일의 키 부재는 `null`.
- kv 읽기: 계약 `invalid_value: ignore_key_and_warn`. `normalizeSessionDefaults`가 새 5키를 enum으로 판정하고 무효는
  경고로 떨어뜨린다.
- 레인 적용의 큐 CAS 실패: kv는 적용된 채 `queue_applied:false`(현행 비원자성 원칙).
- 서버가 구버전이라 응답에 `lane`이 없으면 클라이언트는 일반 레인 응답으로 취급하고 quick_fix 초안을 건드리지
  않는다(fail-quiet).

## 8. 테스트

- `queue-store.test.js`: 6키 set/unset/무효 거부, 구 파일 읽기 `null`.
- `exec-enums.test.js`·`session-defaults.test.js`·`session-model.test.js`: 키 목록·enum 미러 동일성, `PRESET_KV_KEYS`가
  quick_fix 키를 제외.
- `exec-preset-coordinator.test.js`: route=quick_fix에서 `quick_fix_orchestration_*` 우선, 부재 시 일반, Bead 핀 우선;
  route≠quick_fix에서 quick_fix 값 무시.
- `exec-preset-apply.test.js`: `lane` 부재=현행 바이트 동일, `lane=quick_fix` 매핑·unset·`lane_incompatible`·
  `skipped_keys`·CAS 실패 경로.
- `execution-defaults.test.js`: dotfiles 스펙 §4.2 시나리오 표의 각 행을 `global` 입력으로 재현; route 없음은 현행
  스냅샷과 동일.
- `execution-pane.test.js`: 그룹 8행 렌더, 미설정 라벨의 일반 유효값 반영, 두 적용 버튼 payload의 `lane`.
- Pre-Handoff: `npm run tsc`, `npx vitest run --reporter=dot`, `npm run lint`, `npm run prettier:write`,
  `npm run build`. 배포 후 설정 다이얼로그 스크린샷과 quick_fix Bead 카드 스크린샷.

## 구현 unit 후보

1. 서버: 큐 6키·어휘 미러·coordinator route별 해석·`lane` 적용 핸들러·프로토콜 문서 — 앵커
   `server/worker/queue-store.js`, `server/worker/exec-enums.js`, `server/session-defaults.js`,
   `server/worker/exec-preset-coordinator.js`, `server/ws/exec-preset-handlers.js`, `app/protocol.md`.
2. 클라이언트: 설정 다이얼로그 그룹·적용 버튼·diff 미리보기, 유효 설정 해석 — 앵커
   `app/views/settings-dialog/`, `app/utils/execution-defaults.js`, `app/views/detail-panel/effective-settings-view.js`.

## 결정 (ADR 후보)

- **프리셋은 레인 무관 프로파일이고 워크스페이스는 같은 프리셋 어휘를 일반과 quick_fix 두 레인에 각각 교체
  방식으로 적용한다** — 되돌리기 어려움: 성립(프리셋에 route 키를 넣는 대안으로 바꾸면 저장소·비교 탭 서명·
  적용 의미가 함께 바뀐다) / 맥락 없이 놀라움: 성립("왜 quick_fix 값으로 프리셋을 못 만드나", "왜 프리셋에
  quick_fix 키가 없나") / 실제 트레이드오프: 성립(프리셋 26키 안은 편집 UI가 두 배가 되고 비교 서명이 8키를 더
  알아야 한다). `summary`: "실행 프리셋은 레인 무관 18키 프로파일이며 워크스페이스는 그것을 일반 레인과 quick_fix
  레인에 각각 교체 방식으로 적용하고, quick_fix 레인의 durable 값은 큐 `quick_fix_orchestration_*`와 kv
  `quick_fix_impl_*`다" → ADR
- 설정 다이얼로그의 그룹 위치·라벨 문구·레인 탭의 `localStorage` 기억 — 되돌리기 어려움: 불성립 / 맥락 없이
  놀라움: 불성립 / 실제 트레이드오프: 불성립 → ADR 아님

## 경계·후속

| 종류(형제\|발견) | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | awaited_by_consumer | different_repository — kv 4키 어휘·selector 사다리·`main:quick_fix_default` 술어·checker | 없음 | dotfiles-zllu |

- 관찰: Worker 탭·모니터 덱의 워크스페이스 오케스트레이션 표시에 quick_fix 값을 병기하는 것 — 슬롯 표(ADR 0014)
  갱신이 먼저라 이번엔 빼고, 설정 다이얼로그와 Bead 카드로 충분한지 본 뒤 정한다.
- 관찰: 비교 탭에서 레인별 필터 — attempt `route`로 이미 가능하며 요청 없음.
